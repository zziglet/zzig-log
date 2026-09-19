import { NotionToMarkdown } from 'notion-to-md';
import { MdBlock } from 'notion-to-md/build/types';

type MarkdownSerializer = Pick<NotionToMarkdown, 'toMarkdownString'>;

export function toMarkdownContent(markdownClient: MarkdownSerializer, blocks: MdBlock[]): string {
  return markdownClient.toMarkdownString(blocks).parent ?? '';
}
