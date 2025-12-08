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

function Loading() {
  return (
    <Container>
      <Dot delay="0s" />
      <Dot delay="0.2s" />
      <Dot delay="0.4s" />
    </Container>
  );
}

export default Loading;
