import { theme } from '@/styles/theme';
import styled from '@emotion/styled';

export const SectionContainer = styled.section<{ bgColor?: string }>`
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
  padding: 52px 0;

  @media (max-width: 768px) {
    padding: 32px 0;
  }
`;

export const HighlightText = styled.span`
  color: ${theme.colors.peach[600]};
  font-weight: bold;
`;
