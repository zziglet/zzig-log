'use client';

import { useEffect, useMemo, useState } from 'react';
import Script from 'next/script';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { getGiscusConfig } from './giscusConfig';

const Section = styled.section`
  padding-top: 32px;
`;

const GiscusContainer = styled.div`
  width: 100%;
`;

const Notice = styled.p`
  font-size: ${theme.textSizes.body.sm};
  color: ${theme.colors.text.disabled};
  margin: 0;
`;

interface GiscusCommentsProps {
  pageTitle: string;
  pagePath: string;
}

export default function GiscusComments({ pageTitle, pagePath }: GiscusCommentsProps) {
  const giscusConfig = getGiscusConfig();

  const [giscusTheme, setGiscusTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = (event: MediaQueryListEvent | MediaQueryList) => {
      const nextTheme = event.matches ? 'dark' : 'light';
      setGiscusTheme(nextTheme);

      const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
      iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme: nextTheme } } }, 'https://giscus.app');
    };

    applyTheme(mediaQuery);
    mediaQuery.addEventListener('change', applyTheme);

    return () => {
      mediaQuery.removeEventListener('change', applyTheme);
    };
  }, []);

  const scriptKey = useMemo(() => `giscus-${pagePath.replace(/\//g, '-')}`, [pagePath]);

  if (!giscusConfig) {
    if (process.env.NODE_ENV === 'development') {
      return <Notice>giscus 설정 값이 없습니다.</Notice>;
    }
    return null;
  }

  const mappingTerm = pageTitle?.trim() ? pageTitle.trim() : pagePath;

  return (
    <Section>
      <GiscusContainer className="giscus" />
      <Script
        key={scriptKey}
        src="https://giscus.app/client.js"
        data-repo={giscusConfig.repo}
        data-repo-id={giscusConfig.repoId}
        data-category={giscusConfig.category}
        data-category-id={giscusConfig.categoryId}
        data-mapping="pathname"
        data-term={mappingTerm}
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme={giscusTheme}
        data-lang="ko"
        data-loading="lazy"
        data-strict="0"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <noscript>
        <Notice>댓글은 JavaScript 사용이 필요한 기능입니다.</Notice>
      </noscript>
    </Section>
  );
}
