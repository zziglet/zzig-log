import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { PortfolioPost } from '@/types/portfolio';
import { BlogPost } from '@/types/blog';
import { formatDate } from './format';

if (!process.env.NOTION_API_KEY) {
  throw new Error('NOTION_API_KEY environment variable is required');
}

if (!process.env.NOTION_DB_BLOG_ID) {
  throw new Error('NOTION_DB_BLOG_ID environment variable is required');
}

if (!process.env.NOTION_DB_PORTFOLIO_ID) {
  throw new Error('NOTION_DB_PORTFOLIO_ID environment variable is required');
}

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: '2025-09-03',
  timeoutMs: 120_000,
});

export const BLOG_DB_ID = process.env.NOTION_DB_BLOG_ID || '';
export const PORTFOLIO_DB_ID = process.env.NOTION_DB_PORTFOLIO_ID || '';

export function getDataSourceId(dbResponse: unknown): string | undefined {
  const record = dbResponse as Record<string, unknown>;
  const dataSources = record.data_sources;
  if (Array.isArray(dataSources) && dataSources.length > 0) {
    return (dataSources[0] as Record<string, unknown>)?.id as string | undefined;
  }
  return undefined;
}

export function isFullPage(response: unknown): response is PageObjectResponse {
  return (
    typeof response === 'object' &&
    response !== null &&
    'object' in response &&
    'properties' in response &&
    (response as Record<string, unknown>).object === 'page'
  );
}

type NotionProperties = PageObjectResponse['properties'];

function getTitle(props: NotionProperties, key: string, fallback: string): string {
  const prop = props[key];
  if (prop?.type !== 'title') return fallback;
  const text = prop.title.map((t) => t.plain_text).join('');
  return text || fallback;
}

function getRichText(props: NotionProperties, key: string): string {
  const prop = props[key];
  if (prop?.type !== 'rich_text') return '';
  return prop.rich_text.map((t) => t.plain_text).join('');
}

function getSelect(props: NotionProperties, key: string, fallback: string): string {
  const prop = props[key];
  return prop?.type === 'select' ? (prop.select?.name ?? fallback) : fallback;
}

function getMultiSelect(props: NotionProperties, key: string): string[] {
  const prop = props[key];
  return prop?.type === 'multi_select' ? prop.multi_select.map((item) => item.name) : [];
}

function getDate(props: NotionProperties, key: string): { start: string; end: string | null } | null {
  const prop = props[key];
  return prop?.type === 'date' && prop.date ? { start: prop.date.start, end: prop.date.end } : null;
}

function getUrl(props: NotionProperties, key: string): string | null {
  const prop = props[key];
  return prop?.type === 'url' ? prop.url : null;
}

function getFileThumbnail(props: NotionProperties, key: string): string | null {
  const prop = props[key];
  if (prop?.type !== 'files' || !prop.files[0]) return null;
  const file = prop.files[0];
  return file.type === 'file' ? file.file.url : file.type === 'external' ? file.external.url : null;
}

export function parseBlogPost(post: PageObjectResponse): BlogPost {
  const props = post.properties;
  const date = getDate(props, 'date');

  return {
    id: post.id,
    title: getTitle(props, 'content', '제목 없음'),
    subtitle: getRichText(props, 'subtitle'),
    category: getSelect(props, 'category', 'Uncategorized'),
    tags: getMultiSelect(props, 'tags'),
    thumbnail: getFileThumbnail(props, 'thumbnail'),
    date: formatDate(date?.start ?? post.created_time),
  };
}

export function parsePortfolioPage(post: PageObjectResponse): PortfolioPost {
  const props = post.properties;
  const date = getDate(props, 'date');

  return {
    id: post.id,
    title: getTitle(props, 'content', '프로젝트명 없음'),
    description: getRichText(props, 'description'),
    thumbnail: getFileThumbnail(props, 'thumbnail'),
    category: getSelect(props, 'category', 'Etc'),
    tags: getMultiSelect(props, 'tags'),
    githubUrl: getUrl(props, 'github'),
    webUrl: getUrl(props, 'web'),
    startDate: date?.start ?? post.created_time,
    endDate: date?.end ?? null,
  };
}
