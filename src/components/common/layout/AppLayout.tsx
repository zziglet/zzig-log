'use client';

import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { NavBar } from '@/components/common/layout/NavBar';
import { Footer } from '@/components/common/layout/Footer';

const RootContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex-grow: 1;
`;

const Container = styled.div`
  width: 100%;
`;

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <RootContainer>
      <NavBar />
      <MainContent>
        <Container className="container">{children}</Container>
      </MainContent>
      <Footer />
    </RootContainer>
  );
}

export { AppLayout };
