'use client';

import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import BlogDetailContent from '@/components/blog/BlogDetailContent';
import Loading from '@/components/common/Loading';
import { BlogPostDetail } from '@/types/blog';
import { PageContainer } from '@/styles/shared.styles';

function BlogDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) {
        setIsError(true);
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/blog/${id}`);

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
        console.error('Failed to load blog detail', error);
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
      <BlogDetailContent post={post} />
    </PageContainer>
  );
}

export default BlogDetailPage;
