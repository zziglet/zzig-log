import { afterEach, describe, expect, it, vi } from 'vitest';
import { NotionImageClient, resolveBlockImageUrl, resolvePageThumbnailUrl, serveNotionImage } from '../notion-image.service';
import { NOTION_IMAGE_CACHE_CONTROL } from '@/utils/notion-image';

const ALLOWED_DATABASE_ID = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';

function createClient(): NotionImageClient {
  return {
    blocks: { retrieve: vi.fn() },
    pages: { retrieve: vi.fn() },
  };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Notion image resolution', () => {
  it('resolves the latest URL from an image block', async () => {
    const notion = createClient();
    vi.mocked(notion.blocks.retrieve).mockResolvedValue({
      type: 'image',
      image: { type: 'file', file: { url: 'https://notion.example/new-block-url' } },
      parent: { type: 'page_id', page_id: 'page-id' },
    });
    vi.mocked(notion.pages.retrieve).mockResolvedValue({
      parent: { type: 'data_source_id', database_id: ALLOWED_DATABASE_ID },
    });

    await expect(resolveBlockImageUrl(notion, 'block-id', [ALLOWED_DATABASE_ID])).resolves.toBe('https://notion.example/new-block-url');
  });

  it('resolves the latest thumbnail URL from a page', async () => {
    const notion = createClient();
    vi.mocked(notion.pages.retrieve).mockResolvedValue({
      parent: { type: 'data_source_id', database_id: ALLOWED_DATABASE_ID },
      properties: {
        thumbnail: {
          type: 'files',
          files: [{ type: 'file', file: { url: 'https://notion.example/new-thumbnail-url' } }],
        },
      },
    });

    await expect(resolvePageThumbnailUrl(notion, 'page-id', [ALLOWED_DATABASE_ID])).resolves.toBe('https://notion.example/new-thumbnail-url');
  });

  it('returns null for non-image resources', async () => {
    const notion = createClient();
    vi.mocked(notion.blocks.retrieve).mockResolvedValue({ type: 'paragraph' });
    vi.mocked(notion.pages.retrieve).mockResolvedValue({ properties: {} });

    await expect(resolveBlockImageUrl(notion, 'block-id', [ALLOWED_DATABASE_ID])).resolves.toBeNull();
    await expect(resolvePageThumbnailUrl(notion, 'page-id', [ALLOWED_DATABASE_ID])).resolves.toBeNull();
  });

  it('rejects images outside the configured content databases', async () => {
    const notion = createClient();
    vi.mocked(notion.blocks.retrieve).mockResolvedValue({
      type: 'image',
      image: { type: 'file', file: { url: 'https://notion.example/private-block-url' } },
      parent: { type: 'page_id', page_id: 'private-page-id' },
    });
    vi.mocked(notion.pages.retrieve).mockResolvedValue({
      parent: { type: 'data_source_id', database_id: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' },
      properties: {
        thumbnail: {
          type: 'files',
          files: [{ type: 'file', file: { url: 'https://notion.example/private-thumbnail-url' } }],
        },
      },
    });

    await expect(resolveBlockImageUrl(notion, 'block-id', [ALLOWED_DATABASE_ID])).resolves.toBeNull();
    await expect(resolvePageThumbnailUrl(notion, 'private-page-id', [ALLOWED_DATABASE_ID])).resolves.toBeNull();
  });

  it('walks nested block parents before authorizing an image', async () => {
    const notion = createClient();
    vi.mocked(notion.blocks.retrieve)
      .mockResolvedValueOnce({
        type: 'image',
        image: { type: 'file', file: { url: 'https://notion.example/nested-image-url' } },
        parent: { type: 'block_id', block_id: 'parent-block-id' },
      })
      .mockResolvedValueOnce({ parent: { type: 'page_id', page_id: 'page-id' } });
    vi.mocked(notion.pages.retrieve).mockResolvedValue({
      parent: { type: 'database_id', database_id: ALLOWED_DATABASE_ID.replaceAll('-', '') },
    });

    await expect(resolveBlockImageUrl(notion, 'block-id', [ALLOWED_DATABASE_ID])).resolves.toBe('https://notion.example/nested-image-url');
  });
});

describe('serveNotionImage', () => {
  it('proxies fresh image bytes with a bounded cache policy', async () => {
    const fetcher = vi.fn().mockResolvedValue(
      new Response(new Uint8Array([1, 2, 3]), {
        status: 200,
        headers: { 'Content-Type': 'image/png' },
      }),
    );

    const response = await serveNotionImage(() => Promise.resolve('https://notion.example/fresh-url'), fetcher);

    expect(fetcher).toHaveBeenCalledWith('https://notion.example/fresh-url', { cache: 'no-store' });
    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('image/png');
    expect(response.headers.get('cache-control')).toBe(NOTION_IMAGE_CACHE_CONTROL);
    expect(new Uint8Array(await response.arrayBuffer())).toEqual(new Uint8Array([1, 2, 3]));
  });

  it('returns 404 when the Notion resource has no image', async () => {
    const response = await serveNotionImage(() => Promise.resolve(null), vi.fn());

    expect(response.status).toBe(404);
    expect(response.headers.get('cache-control')).toBe('no-store');
  });

  it('returns 502 for upstream failures and non-image responses', async () => {
    const failedResponse = await serveNotionImage(
      () => Promise.resolve('https://notion.example/failed'),
      vi.fn().mockResolvedValue(new Response(null, { status: 403 })),
    );
    const invalidResponse = await serveNotionImage(
      () => Promise.resolve('https://notion.example/not-image'),
      vi.fn().mockResolvedValue(new Response('text', { status: 200, headers: { 'Content-Type': 'text/plain' } })),
    );

    expect(failedResponse.status).toBe(502);
    expect(invalidResponse.status).toBe(502);
  });

  it('returns 502 when Notion resolution fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    const response = await serveNotionImage(() => Promise.reject(new Error('Notion unavailable')), vi.fn());

    expect(response.status).toBe(502);
    expect(response.headers.get('cache-control')).toBe('no-store');
  });
});
