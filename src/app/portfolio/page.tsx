import { Metadata } from 'next';
import PortfolioContent from '@/components/portfolio/PortfolioContent';
import { SectionTitle } from '@/styles/shared.styles';
import { getPortfolioPosts } from '@/services/portfolio.service';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'zziglet이 작업한 프로젝트를 모아둔 포트폴리오 페이지입니다.',
  alternates: {
    canonical: '/portfolio',
  },
  openGraph: {
    title: 'Portfolio',
    description: 'zziglet이 작업한 프로젝트를 모아둔 포트폴리오 페이지입니다.',
    url: '/portfolio',
  },
};

export default async function PortfolioPage() {
  const posts = await getPortfolioPosts();

  return (
    <>
      <SectionTitle>Portfolio</SectionTitle>
      <PortfolioContent posts={posts ?? []} />
    </>
  );
}
