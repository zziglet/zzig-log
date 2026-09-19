import { getNotionClient } from '@/utils/notion';
import { isValidNotionId } from '@/utils/notion-image';
import { resolvePageThumbnailUrl, serveNotionImage } from '@/services/notion-image.service';

interface NotionPageThumbnailRouteProps {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: NotionPageThumbnailRouteProps) {
  const { id } = await params;
  if (!isValidNotionId(id)) {
    return Response.json({ error: 'Invalid Notion page ID' }, { status: 404, headers: { 'Cache-Control': 'no-store' } });
  }

  return serveNotionImage(() => resolvePageThumbnailUrl(getNotionClient(), id));
}
