import { getNotionClient } from '@/utils/notion';
import { isValidNotionId } from '@/utils/notion-image';
import { resolveBlockImageUrl, serveNotionImage } from '@/services/notion-image.service';

interface NotionBlockImageRouteProps {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: NotionBlockImageRouteProps) {
  const { id } = await params;
  if (!isValidNotionId(id)) {
    return Response.json({ error: 'Invalid Notion block ID' }, { status: 404, headers: { 'Cache-Control': 'no-store' } });
  }

  return serveNotionImage(() => resolveBlockImageUrl(getNotionClient(), id));
}
