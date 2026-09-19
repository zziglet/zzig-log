import { describe, expect, it } from 'vitest';
import { GET as getBlockImage } from '../block/[id]/route';
import { GET as getPageThumbnail } from '../page/[id]/thumbnail/route';

describe('Notion image routes', () => {
  it('rejects invalid block IDs without querying Notion', async () => {
    const response = await getBlockImage(new Request('http://localhost/api/notion/images/block/invalid'), {
      params: Promise.resolve({ id: 'invalid' }),
    });

    expect(response.status).toBe(404);
    expect(response.headers.get('cache-control')).toBe('no-store');
  });

  it('rejects invalid page IDs without querying Notion', async () => {
    const response = await getPageThumbnail(new Request('http://localhost/api/notion/images/page/invalid/thumbnail'), {
      params: Promise.resolve({ id: 'invalid' }),
    });

    expect(response.status).toBe(404);
    expect(response.headers.get('cache-control')).toBe('no-store');
  });
});
