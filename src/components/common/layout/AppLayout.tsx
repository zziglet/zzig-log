'use client';

import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { NavBar } from '@/components/common/layout/NavBar';
import { Footer } from '@/components/common/layout/Footer';
import ScrollToTop from '@/components/common/ScrollToTop';
import { theme } from '@/styles/theme';

const RootContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex-grow: 1;
  padding: 0 16px;

  ${theme.media.tablet} {
    padding: 0 24px;
  }

  ${theme.media.desktop} {
    padding: 0 40px;
  }
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
      <ScrollToTop />
      <NavBar />
      <MainContent>
        <Container className="container">{children}</Container>
      </MainContent>
      <Footer />
    </RootContainer>
  );
}

export { AppLayout };
