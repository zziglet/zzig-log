'use client';

import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  gap: 8px;
`;

const Dot = styled.div<{ delay: string }>`
  width: 16px;
  height: 16px;
  background-color: ${theme.colors.peach[400]};
  border-radius: 50%;
  animation: bounce 0.6s infinite alternate;
  animation-delay: ${(props) => props.delay};

  @keyframes bounce {
    to {
      opacity: 0.3;
      transform: translateY(-8px);
    }
  }
`;

const VisuallyHiddenText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

function Loading() {
  return (
    <Container role="status" aria-live="polite">
      <VisuallyHiddenText>로딩 중</VisuallyHiddenText>
      <Dot delay="0s" aria-hidden="true" />
      <Dot delay="0.2s" aria-hidden="true" />
      <Dot delay="0.4s" aria-hidden="true" />
    </Container>
  );
}

export default Loading;
