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

  if (value.type === 'external' && isRecord(value.external) && typeof value.external.url === 'string') {
    return value.external.url;
  }

  return null;
}

export async function resolveBlockImageUrl(notion: NotionImageClient, blockId: string): Promise<string | null> {
  const block = await notion.blocks.retrieve({ block_id: blockId });

  if (!isRecord(block) || block.type !== 'image') return null;
  return getFileUrl(block.image);
}

export async function resolvePageThumbnailUrl(notion: NotionImageClient, pageId: string): Promise<string | null> {
  const page = await notion.pages.retrieve({ page_id: pageId });

  if (!isRecord(page) || !isRecord(page.properties)) return null;
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
    console.error('[NotionImageService] Failed to serve image:', error);
    return errorResponse('Failed to resolve Notion image', 502);
  }
}
