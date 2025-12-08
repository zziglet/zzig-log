'use client';

import styled from '@emotion/styled';
import PortfolioItem from './PortfolioItem';
import { PortfolioPost } from '@/types/portfolio';
import { theme } from '@/styles/theme';

const GridContainer = styled.div`
  display: grid;
  width: 100%;
  padding: 8px 0 52px 0;

  grid-template-columns: repeat(1, 1fr);
  gap: 32px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const EmptyState = styled.div`
  width: 100%;
  padding: 100px 0;
  text-align: center;
  color: ${theme.colors.text.disabled};
  font-size: 16px;
`;

interface PortfolioListProps {
  posts: PortfolioPost[];
  onClick: (post: PortfolioPost) => void;
}

function PortfolioList({ posts, onClick }: PortfolioListProps) {
  if (!posts || posts.length === 0) {
    return <EmptyState>게시물이 존재하지 않습니다.</EmptyState>;
  }

  return (
    <GridContainer>
      {posts.map((post) => (
        <PortfolioItem key={post.id} post={post} onClick={() => onClick(post)} />
      ))}
    </GridContainer>
  );
}

export default PortfolioList;
