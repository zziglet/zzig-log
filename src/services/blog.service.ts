import { unstable_cache } from 'next/cache';
import { NotionToMarkdown } from 'notion-to-md';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { BLOG_DB_ID, getDataSourceId, isFullPage, notion, parseBlogPost } from '@/utils/notion';
import { BlogPost, BlogPostDetail } from '@/types/blog';
import { REVALIDATE_DETAIL, REVALIDATE_LIST } from '@/constants/cache';

const n2m = new NotionToMarkdown({ notionClient: notion });

const fetchBlogPosts = unstable_cache(
  async (): Promise<BlogPost[]> => {
    const dbResponse = await notion.databases.retrieve({
      database_id: BLOG_DB_ID,
    });

    const dataSourceId = getDataSourceId(dbResponse);

    if (!dataSourceId) {
      return [];
    }

    const results: PageObjectResponse[] = [];
    let cursor: string | undefined;

    do {
      const response = await notion.dataSources.query({
        data_source_id: dataSourceId,
        sorts: [{ timestamp: 'created_time', direction: 'descending' }],
        ...(cursor ? { start_cursor: cursor } : {}),
      });

      results.push(...response.results.filter(isFullPage));
      cursor = response.has_more && response.next_cursor ? response.next_cursor : undefined;
    } while (cursor);

    return results.map((post) => parseBlogPost(post));
  },
  ['blog-list'],
  { revalidate: REVALIDATE_LIST },
);

export async function getBlogPosts(): Promise<BlogPost[] | null> {
  try {
    return await fetchBlogPosts();
  } catch (error) {
    console.error('[BlogService] Failed to fetch posts:', error);
    return null;
  }
}

export const getBlogPost = unstable_cache(
  async (id: string): Promise<BlogPostDetail | null> => {
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
  },
  ['blog-detail'],
  { revalidate: REVALIDATE_DETAIL },
);
