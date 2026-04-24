import { NextResponse } from 'next/server';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { getBlogDbId, getDataSourceId, getNotionClient, isFullPage, parseBlogPost } from '@/utils/notion';
import { unstable_cache } from 'next/cache';
import { REVALIDATE_LIST } from '@/constants/cache';

const getCachedBlogList = unstable_cache(
  async () => {
    const notion = getNotionClient();
    const blogDbId = getBlogDbId();
    const dbResponse = await notion.databases.retrieve({
      database_id: blogDbId,
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
