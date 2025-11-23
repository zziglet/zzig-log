import { NextResponse } from 'next/server';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { DATABASE_ID, isFullPage, notion, parseNotionPage } from '@/utils/notion';

export async function GET() {
  if (!DATABASE_ID) {
    return NextResponse.json({ error: 'Missing NOTION_DATABASE_ID' }, { status: 500 });
  }

  try {
    const dbResponse = await notion.databases.retrieve({
      database_id: DATABASE_ID,
    });

    const dataSourceId = (dbResponse as any).data_sources?.[0]?.id;

    if (!dataSourceId) {
      return NextResponse.json({ error: 'Data Source ID not found' }, { status: 404 });
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

    const posts = response.results.filter(isFullPage).map((post: PageObjectResponse) => parseNotionPage(post));

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
