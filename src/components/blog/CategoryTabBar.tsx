'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { CATEGORIES } from '@/types/blog';

const TabContainer = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0 16px;
  border-bottom: 0.5px solid ${theme.colors.border};
  background-color: ${theme.colors.background.base};
  box-sizing: border-box;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  ${theme.media.tablet} {
    gap: 16px;
  }

  ${theme.media.desktop} {
    gap: 16px;
  }
`;

const TabItem = styled.button<{ isActive: boolean }>`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  font-family: inherit;
  font-size: ${theme.textSizes.body.md};
  line-height: 32px;
  font-weight: ${({ isActive }) => (isActive ? 700 : 500)};
  color: ${({ isActive }) => (isActive ? theme.colors.cream[700] : theme.colors.text.disabled)};

  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${theme.colors.cream[800]};
  }
`;

interface CategoryTabBarProps {
  selectedCategory: string;
  onSelect: (category: string) => void;
}

function CategoryTabBar({ selectedCategory, onSelect }: CategoryTabBarProps) {
  return (
    <TabContainer>
      {CATEGORIES.map((category) => (
        <TabItem key={category} isActive={selectedCategory === category} onClick={() => onSelect(category)}>
          {category}
        </TabItem>
      ))}
    </TabContainer>
  );
}

export default CategoryTabBar;
