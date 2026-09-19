export const NOTION_IMAGE_CACHE_CONTROL = 'public, max-age=300, s-maxage=300, stale-while-revalidate=60';

export function getNotionBlockImagePath(blockId: string): string {
  return `/api/notion/images/block/${encodeURIComponent(blockId)}`;
}

export function getNotionPageThumbnailPath(pageId: string): string {
  return `/api/notion/images/page/${encodeURIComponent(pageId)}/thumbnail`;
}

export function isValidNotionId(id: string): boolean {
  return /^(?:[0-9a-f]{32}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i.test(id);
}
