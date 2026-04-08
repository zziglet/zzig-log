'use client';

import { useEffect, useRef } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!giscusConfig || !containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = '';

    const mappingTerm = pageTitle?.trim() ? pageTitle.trim() : pagePath;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', giscusConfig.repo);
    script.setAttribute('data-repo-id', giscusConfig.repoId);
    script.setAttribute('data-category', giscusConfig.category);
    script.setAttribute('data-category-id', giscusConfig.categoryId);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-term', mappingTerm);
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    script.setAttribute('data-lang', 'ko');
    script.setAttribute('data-loading', 'lazy');
    script.setAttribute('data-strict', '0');
    script.crossOrigin = 'anonymous';
    script.async = true;

    container.appendChild(script);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleThemeChange = (event: MediaQueryListEvent) => {
      const nextTheme = event.matches ? 'dark' : 'light';
      const iframe = container.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
      iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme: nextTheme } } }, 'https://giscus.app');
    };

    mediaQuery.addEventListener('change', handleThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
      container.innerHTML = '';
    };
  }, [pagePath, pageTitle]);

  if (!giscusConfig) {
    if (process.env.NODE_ENV === 'development') {
      return <Notice>giscus 설정 값이 없습니다.</Notice>;
    }
    return null;
  }

  return (
    <Section>
      <GiscusContainer ref={containerRef} className="giscus" />
      <noscript>
        <Notice>댓글은 JavaScript 사용이 필요한 기능입니다.</Notice>
      </noscript>
    </Section>
  );
}
