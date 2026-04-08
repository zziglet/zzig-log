import { NotionToMarkdown } from 'notion-to-md';
import { ListBlockChildrenResponseResult } from 'notion-to-md/build/types';

type ImageBlock = ListBlockChildrenResponseResult & {
  type: 'image';
  image: {
    type: 'file' | 'external';
    file?: { url: string };
    external?: { url: string };
    caption: Array<{ plain_text: string }>;
  };
};

const WIDTH_PATTERN = /width:(\d+%)/;

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function isImageBlock(block: ListBlockChildrenResponseResult): block is ImageBlock {
  return 'type' in block && block.type === 'image';
}

function getImageUrl(block: ImageBlock): string {
  if (block.image.type === 'file') {
    return block.image.file?.url ?? '';
  }
  return block.image.external?.url ?? '';
}

function parseCaption(block: ImageBlock): { text: string; width: string | null } {
  const fullCaption = block.image.caption.map((c) => c.plain_text).join('');
  const widthMatch = fullCaption.match(WIDTH_PATTERN);
  const width = widthMatch ? widthMatch[1] : null;
  const text = fullCaption.replace(WIDTH_PATTERN, '').trim();
  return { text, width };
}

export function registerImageTransformer(n2m: NotionToMarkdown) {
  n2m.setCustomTransformer('image', (block: ListBlockChildrenResponseResult) => {
    if (!isImageBlock(block)) return false;

    const url = getImageUrl(block);
    if (!url) return false;

    const { text, width } = parseCaption(block);
    const alt = escapeHtml(text || 'image');

    if (width) {
      return `<img src="${url}" alt="${alt}" style="width:${width};border-radius:12px" />`;
    }

    return `![${alt}](${url})`;
  });
}
