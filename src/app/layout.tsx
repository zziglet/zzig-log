import type { Metadata } from 'next';
import { suit } from '@/styles/fonts';
import '@/styles/globals.css';
import EmotionThemeProvider from '@/components/providers/EmotionThemeProvider';

export const metadata: Metadata = {
  title: 'zzig.log',
  description: 'zziglet의 좌충우돌 개발 생존기',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={suit.variable}>
      <head>
        <link rel="icon" href="/icons/icon_logo.svg" type="image/svg+xml" />
      </head>
      <body>
        <EmotionThemeProvider>{children}</EmotionThemeProvider>
      </body>
    </html>
  );
}
