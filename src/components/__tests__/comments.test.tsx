import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import BlogDetailContent from '@/components/blog/BlogDetailContent';
import PortfolioDetailContent from '@/components/portfolio/PortfolioDetailContent';
import { BlogPostDetail } from '@/types/blog';
import { PortfolioDetail } from '@/types/portfolio';

vi.mock('@/components/comments/GiscusComments', () => ({
  default: () => <div data-testid="giscus-comments" />,
}));

const blogPost: BlogPostDetail = {
  id: 'blog-id',
  title: '블로그 글',
  subtitle: 'subtitle',
  thumbnail: null,
  category: '개발',
  tags: ['React'],
  date: '2026.09.19',
  content: '본문',
};

const portfolioPost: PortfolioDetail = {
  id: 'portfolio-id',
  title: '포트폴리오 프로젝트',
  description: 'description',
  thumbnail: null,
  category: 'Frontend',
  tags: ['React'],
  githubUrl: null,
  webUrl: null,
  startDate: '2025-01-01',
  endDate: null,
  content: '본문',
};

afterEach(() => {
  cleanup();
});

describe('detail comments', () => {
  it('keeps Giscus comments on blog details', () => {
    render(<BlogDetailContent post={blogPost} />);

    expect(screen.getByTestId('giscus-comments')).toBeInTheDocument();
  });

  it('does not render Giscus comments on portfolio details', () => {
    render(<PortfolioDetailContent post={portfolioPost} />);

    expect(screen.queryByTestId('giscus-comments')).not.toBeInTheDocument();
  });
});
