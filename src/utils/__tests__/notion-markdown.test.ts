import { describe, expect, it, vi } from 'vitest';
import { MdBlock } from 'notion-to-md/build/types';
import { toMarkdownContent } from '../notion-markdown';

const blocks: MdBlock[] = [];

describe('toMarkdownContent', () => {
  it('returns the parent markdown content', () => {
    const markdownClient = {
      toMarkdownString: vi.fn().mockReturnValue({ parent: '# Portfolio\n\n- item' }),
    };

    expect(toMarkdownContent(markdownClient, blocks)).toBe('# Portfolio\n\n- item');
    expect(markdownClient.toMarkdownString).toHaveBeenCalledWith(blocks);
  });

  it('returns an empty string when parent content is missing', () => {
    const markdownClient = {
      toMarkdownString: vi.fn().mockReturnValue({ child: 'child page content' }),
    };

    expect(toMarkdownContent(markdownClient, blocks)).toBe('');
  });
});
