import PortfolioContent from '@/components/portfolio/PortfolioContent';
import { SectionTitle } from '@/styles/shared.styles';
import { getPortfolioPosts } from '@/services/portfolio.service';

export const revalidate = 60;

export default async function PortfolioPage() {
  const posts = await getPortfolioPosts();

  return (
    <>
      <SectionTitle>Portfolio</SectionTitle>
      <PortfolioContent posts={posts ?? []} />
    </>
  );
}
