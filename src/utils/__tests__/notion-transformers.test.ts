import { describe, expect, it, vi } from 'vitest';
import { NotionToMarkdown } from 'notion-to-md';
import { CustomTransformer, ListBlockChildrenResponseResult } from 'notion-to-md/build/types';
import { registerImageTransformer } from '../notion-transformers';

function getImageTransformer(): CustomTransformer {
  const setCustomTransformer = vi.fn();
  registerImageTransformer({ setCustomTransformer } as unknown as NotionToMarkdown);
  return setCustomTransformer.mock.calls[0][1] as CustomTransformer;
}

function imageBlock(image: Record<string, unknown>): ListBlockChildrenResponseResult {
  return {
    id: '12345678-1234-1234-1234-1234567890ab',
    type: 'image',
    image,
  } as unknown as ListBlockChildrenResponseResult;
}

describe('registerImageTransformer', () => {
  it('replaces expiring Notion file URLs with a stable internal path', async () => {
    const transformer = getImageTransformer();
    const result = await transformer(
      imageBlock({
        type: 'file',
        file: { url: 'https://prod-files-secure.s3.us-west-2.amazonaws.com/expired-url' },
        caption: [{ plain_text: 'diagram' }],
      }),
    );

    expect(result).toBe('![diagram](/api/notion/images/block/12345678-1234-1234-1234-1234567890ab)');
    expect(result).not.toContain('expired-url');
  });

  it('keeps external image URLs and applies caption width', async () => {
    const transformer = getImageTransformer();
    const result = await transformer(
      imageBlock({
        type: 'external',
        external: { url: 'https://example.com/image.png' },
        caption: [{ plain_text: 'architecture width:60%' }],
      }),
    );

    expect(result).toBe('<img src="https://example.com/image.png" alt="architecture" style="width:60%;border-radius:12px" />');
  });
});
