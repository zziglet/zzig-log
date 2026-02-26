import { cache } from 'react';
import { NotionToMarkdown } from 'notion-to-md';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { isFullPage, notion, parsePortfolioPage } from '@/utils/notion';
import { PortfolioDetail } from '@/types/portfolio';

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getPortfolioPost = cache(async (id: string): Promise<PortfolioDetail | null> => {
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
});
