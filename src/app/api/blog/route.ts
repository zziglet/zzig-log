import { NextResponse } from 'next/server';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { BLOG_DB_ID, getDataSourceId, isFullPage, notion, parseBlogPost } from '@/utils/notion';
import { unstable_cache } from 'next/cache';
import { REVALIDATE_LIST } from '@/constants/cache';

const getCachedBlogList = unstable_cache(
  async () => {
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

export async function GET() {
  if (!BLOG_DB_ID) {
    return NextResponse.json({ error: 'Missing NOTION_DATABASE_ID' }, { status: 500 });
  }

  try {
    const posts = await getCachedBlogList();

    if (!posts) {
      return NextResponse.json({ error: 'Data Source ID not found' }, { status: 404 });
    }

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
