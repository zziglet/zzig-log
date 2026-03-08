'use client';

import { theme } from '@/styles/theme';
import styled from '@emotion/styled';

export const SectionContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.background.base};

  & > div {
    width: 100%;
  }
`;

export const SectionTitle = styled.div`
  font-size: ${theme.textSizes.heading['5xl']};
  font-weight: 200;
  color: ${theme.colors.cream[600]};
  line-height: 1;
  padding: 24px 0;

  ${theme.media.tablet} {
    padding: 40px 0;
  }

  ${theme.media.desktop} {
    padding: 52px 0;
  }
`;

export const HighlightText = styled.span`
  color: ${theme.colors.peach[600]};
  font-weight: bold;
`;

export const MarkdownBody = styled.div`
  color: ${theme.colors.text.body};
  font-size: 16px;
  line-height: 1.8;
  padding: 12px 0;

  @media (min-width: 768px) {
    font-size: 17px;
  }

  h1,
  h2,
  h3 {
    margin-top: 40px;
    margin-bottom: 16px;
    font-weight: 700;
    color: #121212;
  }

  h1 {
    font-size: 28px;
    border-bottom: 1px solid #eee;
    padding-bottom: 12px;
  }
  h2 {
    font-size: 24px;
  }
  h3 {
    font-size: 20px;
  }

  p {
    margin-bottom: 16px;
  }

  ul,
  ol {
    padding-left: 24px;
    margin-bottom: 16px;
  }

  li {
    margin-bottom: 8px;
  }

  img {
    max-width: 100%;
    border-radius: 12px;
    margin: 24px 0;
  }

  code {
    background-color: #f6f8fa;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'SF Mono', Consolas, Menlo, Monaco, monospace;
    font-size: 0.9em;
  }

  pre code {
    background-color: transparent;
    padding: 0;
  }

  blockquote {
    border-left: 4px solid ${theme.colors.peach[400]};
    padding-left: 16px;
    margin: 24px 0;
    color: #666;
  }
`;

export const PageContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 60px 20px 100px;
  box-sizing: border-box;

  @media (min-width: 768px) {
    padding-top: 80px;
  }
`;
