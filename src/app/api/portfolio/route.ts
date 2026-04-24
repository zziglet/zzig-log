import { NextResponse } from 'next/server';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { getDataSourceId, getNotionClient, getPortfolioDbId, isFullPage, parsePortfolioPage } from '@/utils/notion';
import { unstable_cache } from 'next/cache';
import { REVALIDATE_LIST } from '@/constants/cache';

const getCachedPortfolioList = unstable_cache(
  async () => {
    const notion = getNotionClient();
    const portfolioDbId = getPortfolioDbId();
    const dbResponse = await notion.databases.retrieve({
      database_id: portfolioDbId,
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

export async function GET() {
  try {
    const portfolios = await getCachedPortfolioList();

    if (!portfolios) {
      return NextResponse.json({ error: 'Data Source ID not found in Portfolio DB' }, { status: 404 });
    }

    return NextResponse.json(portfolios);
  } catch (error) {
    console.error('Portfolio List API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
