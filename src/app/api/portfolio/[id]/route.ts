import { NextRequest, NextResponse } from 'next/server';
import { NotionToMarkdown } from 'notion-to-md';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { notion, isFullPage, parsePortfolioPage } from '@/utils/notion';

const n2m = new NotionToMarkdown({ notionClient: notion });

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: 'Missing Portfolio ID' }, { status: 400 });
  }

  try {
    const [pageResponse, mdBlocks] = await Promise.all([notion.pages.retrieve({ page_id: id }), n2m.pageToMarkdown(id)]);

    if (!isFullPage(pageResponse)) {
      throw new Error('Invalid Page Response');
    }

    const metaData = parsePortfolioPage(pageResponse as PageObjectResponse);

    const mdString = n2m.toMarkdownString(mdBlocks);

    return NextResponse.json({
      ...metaData,
      content: mdString.parent,
    });
  } catch (error) {
    console.error('Portfolio Detail Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
