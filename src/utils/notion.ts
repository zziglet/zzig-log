import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { PortfolioPost } from '@/types/portfolio';
import { BlogPost } from '@/types/blog';

if (!process.env.NOTION_API_KEY) {
  throw new Error('NOTION_API_KEY environment variable is required');
}

if (!process.env.NOTION_DB_BLOG_ID) {
  throw new Error('NOTION_DB_BLOG_ID environment variable is required');
}

if (!process.env.NOTION_NOTION_DB_PORTFOLIO_ID) {
  throw new Error('NOTION_NOTION_DB_PORTFOLIO_ID environment variable is required');
}

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: '2025-09-03',
});

export const BLOG_DB_ID = process.env.NOTION_DB_BLOG_ID || '';
export const PORTFOLIO_DB_ID = process.env.NOTION_DB_PORTFOLIO_ID || '';

export function isFullPage(response: unknown): response is PageObjectResponse {
  return typeof response === 'object' && response !== null && 'properties' in response && 'object' in response && (response as any).object === 'page';
}

export function parseBlogPost(post: PageObjectResponse): BlogPost {
  const props = post.properties as any;

  return {
    id: post.id,
    title: props.content?.title?.[0]?.plain_text ?? '제목 없음',
    subtitle: props.subtitle?.rich_text?.[0]?.plain_text ?? '',
    category: props.category?.select?.name ?? 'Uncategorized',
    tags: props.tags?.multi_select?.map((tag: any) => tag.name) ?? [],
    thumbnail: props.thumbnail?.files?.[0]?.file?.url ?? props.thumbnail?.files?.[0]?.external?.url ?? null,
    date: props.date?.created_time ?? post.created_time,
  };
}

export function parsePortfolioPage(post: PageObjectResponse): PortfolioPost {
  const props = post.properties as any;

  const title = props.content?.title?.[0]?.plain_text ?? '프로젝트명 없음';
  const description = props.description?.rich_text?.[0]?.plain_text ?? '';

  const thumbnailFile = props.thumbnail?.files?.[0];
  const thumbnail = thumbnailFile?.file?.url ?? thumbnailFile?.external?.url ?? null;

  const category = props.category?.select?.name ?? 'Etc';
  const tags = props.tags?.multi_select?.map((tag: any) => tag.name) ?? [];

  const githubUrl = props.github?.url ?? null;
  const webUrl = props.web?.url ?? null;

  const dateProperty = props.date?.date;
  const startDate = dateProperty?.start ?? post.created_time;
  const endDate = dateProperty?.end ?? null;

  return {
    id: post.id,
    title,
    description,
    thumbnail,
    category,
    tags,
    githubUrl,
    webUrl,
    startDate,
    endDate,
  };
}
