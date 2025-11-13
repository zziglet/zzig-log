import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "zzig.log",
  description: "zziglet의 좌충우돌 개발 생존기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./icon.svg" type="image/<generated>" sizes="<generated>" />
      </head>
      <body>{children}</body>
    </html>
  );
}
