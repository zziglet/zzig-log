import { unstable_cache } from 'next/cache';
import { NotionToMarkdown } from 'notion-to-md';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { PORTFOLIO_DB_ID, getDataSourceId, isFullPage, notion, parsePortfolioPage } from '@/utils/notion';
import { PortfolioDetail, PortfolioPost } from '@/types/portfolio';
import { REVALIDATE_DETAIL, REVALIDATE_LIST } from '@/constants/cache';
import { registerImageTransformer } from '@/utils/notion-transformers';

const n2m = new NotionToMarkdown({ notionClient: notion });
registerImageTransformer(n2m);

const fetchPortfolioPosts = unstable_cache(
  async (): Promise<PortfolioPost[]> => {
    const dbResponse = await notion.databases.retrieve({
      database_id: PORTFOLIO_DB_ID,
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
        sorts: [{ property: 'date', direction: 'descending' }],
        ...(cursor ? { start_cursor: cursor } : {}),
      });

      results.push(...response.results.filter(isFullPage));
      cursor = response.has_more && response.next_cursor ? response.next_cursor : undefined;
    } while (cursor);

    return results.map((post) => parsePortfolioPage(post));
  },
  ['portfolio-list'],
  { revalidate: REVALIDATE_LIST },
);

export async function getPortfolioPosts(): Promise<PortfolioPost[] | null> {
  try {
    return await fetchPortfolioPosts();
  } catch (error) {
    console.error('[PortfolioService] Failed to fetch posts:', error);
    return null;
  }
}

export const getPortfolioPost = unstable_cache(
  async (id: string): Promise<PortfolioDetail | null> => {
    if (!id) throw new Error('Portfolio ID is required');

    try {
      const [pageResponse, mdBlocks] = await Promise.all([notion.pages.retrieve({ page_id: id }), n2m.pageToMarkdown(id)]);

      if (!isFullPage(pageResponse)) {
        return null;
      }

      const metaData = parsePortfolioPage(pageResponse as PageObjectResponse);
      const mdString = n2m.toMarkdownString(mdBlocks);

      return {
        ...metaData,
        content: mdString.parent,
      };
    } catch (error) {
      console.error(`[PortfolioService] Failed to fetch post ${id}:`, error);
      return null;
    }
  },
  ['portfolio-detail'],
  { revalidate: REVALIDATE_DETAIL },
);
