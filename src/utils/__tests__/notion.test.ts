import { afterEach, describe, expect, it } from 'vitest';
import { getBlogDbId, getNotionClient, getPortfolioDbId } from '../notion';

const originalApiKey = process.env.NOTION_API_KEY;
const originalBlogDbId = process.env.NOTION_DB_BLOG_ID;
const originalPortfolioDbId = process.env.NOTION_DB_PORTFOLIO_ID;

afterEach(() => {
  if (originalApiKey === undefined) {
    delete process.env.NOTION_API_KEY;
  } else {
    process.env.NOTION_API_KEY = originalApiKey;
  }

  if (originalBlogDbId === undefined) {
    delete process.env.NOTION_DB_BLOG_ID;
  } else {
    process.env.NOTION_DB_BLOG_ID = originalBlogDbId;
  }

  if (originalPortfolioDbId === undefined) {
    delete process.env.NOTION_DB_PORTFOLIO_ID;
  } else {
    process.env.NOTION_DB_PORTFOLIO_ID = originalPortfolioDbId;
  }
});

describe('notion env access', () => {
  it('does not require env values until a getter is used', () => {
    expect(typeof getNotionClient).toBe('function');
    expect(typeof getBlogDbId).toBe('function');
    expect(typeof getPortfolioDbId).toBe('function');
  });

  it('throws when NOTION_API_KEY is missing at access time', () => {
    delete process.env.NOTION_API_KEY;

    expect(() => getNotionClient()).toThrow('NOTION_API_KEY environment variable is required');
  });

  it('throws when database ids are missing at access time', () => {
    delete process.env.NOTION_DB_BLOG_ID;
    delete process.env.NOTION_DB_PORTFOLIO_ID;

    expect(() => getBlogDbId()).toThrow('NOTION_DB_BLOG_ID environment variable is required');
    expect(() => getPortfolioDbId()).toThrow('NOTION_DB_PORTFOLIO_ID environment variable is required');
  });

  it('returns configured values when env vars are present', () => {
    process.env.NOTION_API_KEY = 'test-api-key';
    process.env.NOTION_DB_BLOG_ID = 'blog-db-id';
    process.env.NOTION_DB_PORTFOLIO_ID = 'portfolio-db-id';

    expect(getBlogDbId()).toBe('blog-db-id');
    expect(getPortfolioDbId()).toBe('portfolio-db-id');
    expect(getNotionClient()).toBeTruthy();
  });
});
