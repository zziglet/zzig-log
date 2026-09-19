import { APIErrorCode, isNotionClientError } from '@notionhq/client';
import { NOTION_IMAGE_CACHE_CONTROL } from '@/utils/notion-image';

export interface NotionImageClient {
  blocks: {
    retrieve: (args: { block_id: string }) => Promise<unknown>;
  };
  pages: {
    retrieve: (args: { page_id: string }) => Promise<unknown>;
  };
}

type ImageFetcher = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getFileUrl(value: unknown): string | null {
  if (!isRecord(value)) return null;

  if (value.type === 'file' && isRecord(value.file) && typeof value.file.url === 'string') {
    return value.file.url;
  }

  return null;
}

function normalizeNotionId(id: string): string {
  return id.replaceAll('-', '').toLowerCase();
}

function belongsToAllowedDatabase(page: unknown, allowedDatabaseIds: readonly string[]): boolean {
  if (!isRecord(page) || !isRecord(page.parent)) return false;
  const { parent } = page;

  if ((parent.type !== 'data_source_id' && parent.type !== 'database_id') || typeof parent.database_id !== 'string') {
    return false;
  }

  const databaseId = normalizeNotionId(parent.database_id);
  return allowedDatabaseIds.some((allowedId) => normalizeNotionId(allowedId) === databaseId);
}

async function resolveParentPage(notion: NotionImageClient, block: unknown): Promise<unknown | null> {
  let current = block;
  const visitedBlockIds = new Set<string>();

  while (isRecord(current) && isRecord(current.parent)) {
    const { parent } = current;

    if (parent.type === 'page_id' && typeof parent.page_id === 'string') {
      return notion.pages.retrieve({ page_id: parent.page_id });
    }

    if (parent.type !== 'block_id' || typeof parent.block_id !== 'string' || visitedBlockIds.has(parent.block_id)) {
      return null;
    }

    visitedBlockIds.add(parent.block_id);
    current = await notion.blocks.retrieve({ block_id: parent.block_id });
  }

  return null;
}

export async function resolveBlockImageUrl(notion: NotionImageClient, blockId: string, allowedDatabaseIds: readonly string[]): Promise<string | null> {
  const block = await notion.blocks.retrieve({ block_id: blockId });

  if (!isRecord(block) || block.type !== 'image') return null;
  const parentPage = await resolveParentPage(notion, block);
  if (!belongsToAllowedDatabase(parentPage, allowedDatabaseIds)) return null;

  return getFileUrl(block.image);
}

export async function resolvePageThumbnailUrl(notion: NotionImageClient, pageId: string, allowedDatabaseIds: readonly string[]): Promise<string | null> {
  const page = await notion.pages.retrieve({ page_id: pageId });

  if (!belongsToAllowedDatabase(page, allowedDatabaseIds) || !isRecord(page) || !isRecord(page.properties)) return null;
  const thumbnail = page.properties.thumbnail;
  if (!isRecord(thumbnail) || thumbnail.type !== 'files' || !Array.isArray(thumbnail.files)) return null;

  return getFileUrl(thumbnail.files[0]);
}

function errorResponse(message: string, status: number): Response {
  return Response.json({ error: message }, { status, headers: { 'Cache-Control': 'no-store' } });
}

export async function serveNotionImage(resolveUrl: () => Promise<string | null>, fetcher: ImageFetcher = fetch): Promise<Response> {
  try {
    const sourceUrl = await resolveUrl();
    if (!sourceUrl) return errorResponse('Notion image not found', 404);

    const upstream = await fetcher(sourceUrl, { cache: 'no-store' });
    if (!upstream.ok) return errorResponse('Failed to fetch Notion image', 502);

    const contentType = upstream.headers.get('content-type');
    if (!contentType?.toLowerCase().startsWith('image/')) {
      return errorResponse('Invalid Notion image response', 502);
    }

    return new Response(await upstream.arrayBuffer(), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': NOTION_IMAGE_CACHE_CONTROL,
      },
    });
  } catch (error) {
    if (isNotionClientError(error) && error.code === APIErrorCode.ObjectNotFound) {
      return errorResponse('Notion image not found', 404);
    }

    console.error('[NotionImageService] Failed to serve image:', error);
    return errorResponse('Failed to resolve Notion image', 502);
  }
}
