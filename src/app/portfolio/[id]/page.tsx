'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import styled from '@emotion/styled';
import PortfolioDetailContent from '@/components/portfolio/PortfolioDetailContent';
import { PortfolioDetail } from '@/types/portfolio';
import Loading from '@/components/common/Loading';

const PageContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 20px 100px;
`;

function PortfolioDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [post, setPost] = useState<PortfolioDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;

      const res = await fetch(`/api/portfolio/${id}`);

      if (res.status === 404) {
        setIsError(true);
        setIsLoading(false);
        return;
      }

      if (res.ok) {
        const data = await res.json();
        setPost(data);
      } else {
        console.error('Server error');
        setIsError(true);
      }
      setIsLoading(false);
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
