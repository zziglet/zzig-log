import { describe, expect, it } from 'vitest';
import { getNotionBlockImagePath, getNotionPageThumbnailPath, isValidNotionId } from '../notion-image';

describe('Notion image paths', () => {
  it('builds stable same-origin paths', () => {
    expect(getNotionBlockImagePath('block-id')).toBe('/api/notion/images/block/block-id');
    expect(getNotionPageThumbnailPath('page-id')).toBe('/api/notion/images/page/page-id/thumbnail');
  });

  it('accepts hyphenated and compact Notion IDs', () => {
    expect(isValidNotionId('123456781234123412341234567890ab')).toBe(true);
    expect(isValidNotionId('12345678-1234-1234-1234-1234567890ab')).toBe(true);
    expect(isValidNotionId('not-a-notion-id')).toBe(false);
  });
});
