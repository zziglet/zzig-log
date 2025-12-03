'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TagItem = styled.span`
  font-size: ${theme.textSizes.body.xs};
  color: ${theme.colors.peach[400]};
  font-weight: 300;
`;

interface TagListProps {
  tags: string[];
  className?: string;
}

function TagList({ tags, className }: TagListProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <ListContainer className={className}>
      {tags.map((tag, index) => (
        <TagItem key={`${tag}-${index}`}>#{tag}</TagItem>
      ))}
    </ListContainer>
  );
}

export default TagList;
