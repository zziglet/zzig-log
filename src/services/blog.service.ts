import { cache } from 'react';
import { NotionToMarkdown } from 'notion-to-md';
import { isFullPage, notion, parseBlogPost } from '@/utils/notion';
import { BlogPostDetail } from '@/types/blog';

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getBlogPost = cache(async (id: string): Promise<BlogPostDetail | null> => {
  if (!id) throw new Error('Post ID is required');

  try {
    const [pageResponse, mdBlocks] = await Promise.all([notion.pages.retrieve({ page_id: id }), n2m.pageToMarkdown(id)]);

    if (!isFullPage(pageResponse)) {
      return null;
    }

    const metaData = parseBlogPost(pageResponse);
    const mdString = n2m.toMarkdownString(mdBlocks);

    return {
      ...metaData,
      content: mdString.parent,
    };
  } catch (error) {
    console.error(`[BlogService] Failed to fetch post ${id}:`, error);
    return null;
  }
});
