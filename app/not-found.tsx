import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: '찾으시는 페이지를 찾을 수 없습니다.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>
        Oops! 찾으시는 페이지를 찾을 수 없습니다. <br />
        입력하신 URL이 정확한지 확인하거나 홈으로 돌아가세요.
      </p>
    </div>
  );
}
