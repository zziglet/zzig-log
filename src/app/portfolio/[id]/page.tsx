'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import PortfolioDetailContent from '@/components/portfolio/PortfolioDetailContent';
import { PortfolioDetail } from '@/types/portfolio';
import Loading from '@/components/common/Loading';
import { PageContainer } from '@/styles/shared.styles';

function PortfolioDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [post, setPost] = useState<PortfolioDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;

      try {
        const res = await fetch(`/api/portfolio/${id}`);

        if (res.status === 404) {
          setIsError(true);
          return;
        }

        if (res.ok) {
          const data = await res.json();
          setPost(data);
        } else {
          console.error('Server error');
          setIsError(true);
        }
      } catch (error) {
        console.error('Failed to load portfolio detail', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (isLoading) {
    return (
      <PageContainer>
        <Loading />
      </PageContainer>
    );
  }

  if (isError || !post) {
    return notFound();
  }

  return (
    <PageContainer>
      <PortfolioDetailContent post={post} />
    </PageContainer>
  );
}

export default PortfolioDetailPage;
