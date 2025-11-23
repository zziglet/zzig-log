'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider, Global } from '@emotion/react';
import { theme, gridGlobalStyles } from '@/styles/theme';

interface EmotionThemeProviderProps {
  children: React.ReactNode;
}

function EmotionThemeProvider({ children }: EmotionThemeProviderProps) {
  const [cache] = useState(() => {
    const cache = createCache({ key: 'css' });
    cache.compat = true;
    return cache;
  });

  useServerInsertedHTML(() => {
    return (
      <style
        data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: Object.values(cache.inserted).join(' '),
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <Global styles={gridGlobalStyles} />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

export { EmotionThemeProvider };
