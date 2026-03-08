'use client';

import styled from '@emotion/styled';
import { BlogPost } from '@/types/blog';
import { theme } from '@/styles/theme';
import BlogItem from './BlogItem';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px 0 52px 0;
`;

const EmptyState = styled.div`
  width: 100%;
  padding: 100px 0;
  text-align: center;
  color: ${theme.colors.text.disabled};
  font-size: ${theme.textSizes.body.md};
`;

interface BlogListProps {
  posts: BlogPost[];
}

function BlogList({ posts }: BlogListProps) {
  if (!posts || posts.length === 0) {
    return <EmptyState>게시물이 존재하지 않습니다.</EmptyState>;
  }

  return (
    <ListContainer>
      {posts.map((post) => (
        <BlogItem key={post.id} post={post} />
      ))}
    </ListContainer>
  );
}

export default BlogList;
