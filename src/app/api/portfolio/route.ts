import { NextResponse } from 'next/server';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { notion, PORTFOLIO_DB_ID, isFullPage, parsePortfolioPage } from '@/utils/notion';
import { REVALIDATE_LIST } from '@/constants/cache';

export const revalidate = REVALIDATE_LIST;

export async function GET() {
  if (!PORTFOLIO_DB_ID) {
    return NextResponse.json({ error: 'Missing NOTION_PORTFOLIO_DB_ID' }, { status: 500 });
  }

  try {
    const dbResponse = await notion.databases.retrieve({
      database_id: PORTFOLIO_DB_ID,
    });

    const dataSourceId = (dbResponse as any).data_sources?.[0]?.id;

    if (!dataSourceId) {
      return NextResponse.json({ error: 'Data Source ID not found in Portfolio DB' }, { status: 404 });
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

    const portfolios = response.results.filter(isFullPage).map((post: PageObjectResponse) => parsePortfolioPage(post));

    return NextResponse.json(portfolios);
  } catch (error) {
    console.error('Portfolio List API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
