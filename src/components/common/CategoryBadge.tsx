'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 10px;
  border-radius: 6px;
  background-color: ${theme.colors.background.base};
  border: 1px solid ${theme.colors.cream[500]};
  font-size: ${theme.textSizes.body.xs};
  color: ${theme.colors.cream[800]};
  font-weight: 300;
  white-space: nowrap;

  ${theme.media.tablet} {
    padding: 4px 12px;
    border-radius: 8px;
    font-size: ${theme.textSizes.body.sm};
  }

  ${theme.media.desktop} {
    padding: 4px 12px;
    border-radius: 8px;
    font-size: ${theme.textSizes.body.sm};
  }
`;

interface CategoryBadgeProps {
  children: React.ReactNode;
  className?: string;
}

function CategoryBadge({ children, className }: CategoryBadgeProps) {
  return <Badge className={className}>{children}</Badge>;
}

export default CategoryBadge;
