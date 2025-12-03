'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 8px;
  background-color: ${theme.colors.background.base};
  border: 1px solid ${theme.colors.cream[500]};
  font-size: 16px;
  color: ${theme.colors.cream[800]};
  font-weight: 300;
  white-space: nowrap;
`;

interface CategoryBadgeProps {
  children: React.ReactNode;
  className?: string;
}

function CategoryBadge({ children, className }: CategoryBadgeProps) {
  return <Badge className={className}>{children}</Badge>;
}

export default CategoryBadge;
