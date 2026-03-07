import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import PortfolioDetailContent from '@/components/portfolio/PortfolioDetailContent';
import { PageContainer } from '@/styles/shared.styles';
import { getPortfolioPost } from '@/services/portfolio.service';

interface PortfolioDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PortfolioDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPortfolioPost(id).catch(() => null);

  if (!post) {
    return { title: 'Portfolio Not Found' };
  }

  return {
    title: post.title,
    description: post.description || '포트폴리오 프로젝트',
    openGraph: {
      title: post.title,
      description: post.description || '포트폴리오 프로젝트',
      images: post.thumbnail ? [{ url: post.thumbnail }] : [],
    },
  };
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { id } = await params;
  const post = await getPortfolioPost(id);

  if (!post) {
    notFound();
  }

  return (
    <PageContainer>
      <PortfolioDetailContent post={post} />
    </PageContainer>
  );
}
