import { unstable_cache } from 'next/cache';
import { NotionToMarkdown } from 'notion-to-md';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { PORTFOLIO_DB_ID, getDataSourceId, isFullPage, notion, parsePortfolioPage } from '@/utils/notion';
import { PortfolioDetail, PortfolioPost } from '@/types/portfolio';
import { REVALIDATE_DETAIL, REVALIDATE_LIST } from '@/constants/cache';

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getPortfolioPosts = unstable_cache(
  async (): Promise<PortfolioPost[] | null> => {
    const dbResponse = await notion.databases.retrieve({
      database_id: PORTFOLIO_DB_ID,
    });

    const dataSourceId = getDataSourceId(dbResponse);

    if (!dataSourceId) {
      return null;
    }

    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      sorts: [
        {
          property: 'date',
          direction: 'descending',
        },
      ],
    });

    return response.results.filter(isFullPage).map((post: PageObjectResponse) => parsePortfolioPage(post));
  },
  ['portfolio-list'],
  { revalidate: REVALIDATE_LIST },
);

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
