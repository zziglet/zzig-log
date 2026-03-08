import { unstable_cache } from 'next/cache';
import { NotionToMarkdown } from 'notion-to-md';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { BLOG_DB_ID, getDataSourceId, isFullPage, notion, parseBlogPost } from '@/utils/notion';
import { BlogPost, BlogPostDetail } from '@/types/blog';
import { REVALIDATE_DETAIL, REVALIDATE_LIST } from '@/constants/cache';

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getBlogPosts = unstable_cache(
  async (): Promise<BlogPost[] | null> => {
    const dbResponse = await notion.databases.retrieve({
      database_id: BLOG_DB_ID,
    });

    const dataSourceId = getDataSourceId(dbResponse);

    if (!dataSourceId) {
      return null;
    }

    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
    });

    return response.results.filter(isFullPage).map((post: PageObjectResponse) => parseBlogPost(post));
  },
  ['blog-list'],
  { revalidate: REVALIDATE_LIST },
);

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
