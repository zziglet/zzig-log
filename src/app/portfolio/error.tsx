'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import Link from 'next/link';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 16px;
  padding: 40px 20px;
`;

const Title = styled.h2`
  font-size: ${theme.textSizes.heading['2xl']};
  font-weight: 700;
  color: ${theme.colors.text.title};
  margin: 0;
`;

const Description = styled.p`
  font-size: ${theme.textSizes.body.md};
  color: ${theme.colors.text.disabled};
  margin: 0;
  text-align: center;
`;

const RetryButton = styled.button`
  padding: 12px 24px;
  border-radius: 12px;
  background-color: ${theme.colors.cream[600]};
  color: white;
  font-size: ${theme.textSizes.body.sm};
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${theme.colors.cream[700]};
  }
`;

const HomeLink = styled(Link)`
  font-size: ${theme.textSizes.body.sm};
  color: ${theme.colors.peach[500]};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default function PortfolioError({ reset }: { error: Error; reset: () => void }) {
  return (
    <Container>
      <Title>문제가 발생했습니다</Title>
      <Description>포트폴리오를 불러오는 중 오류가 발생했습니다.</Description>
      <RetryButton onClick={reset}>다시 시도</RetryButton>
      <HomeLink href="/">홈으로 돌아가기</HomeLink>
    </Container>
  );
}
