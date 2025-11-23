import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { BlogPost } from '@/types/blog';

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const DATABASE_ID = process.env.NOTION_DB_ID || '';

export function isFullPage(response: unknown): response is PageObjectResponse {
  return typeof response === 'object' && response !== null && 'properties' in response && 'object' in response && (response as any).object === 'page';
}

export function parseNotionPage(post: PageObjectResponse): BlogPost {
  const props = post.properties as any;

  const title = props.content?.title?.[0]?.plain_text ?? '제목 없음';
  const subtitle = props.subtitle?.rich_text?.[0]?.plain_text ?? '';
  const category = props.category?.select?.name ?? 'Uncategorized';
  const tags = props.tag?.multi_select?.map((tag: { name: string }) => tag.name) ?? [];

  const thumbnailFile = props.thumbnail?.files?.[0];
  const thumbnail = thumbnailFile?.file?.url ?? thumbnailFile?.external?.url ?? null;

  const date = props.date?.created_time ?? post.created_time;

  return {
    id: post.id,
    title,
    subtitle,
    category,
    tags,
    thumbnail,
    date,
  };
}
