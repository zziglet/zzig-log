import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BlogDetailContent from '@/components/blog/BlogDetailContent';
import { PageContainer } from '@/styles/shared.styles';
import { getBlogPost } from '@/services/blog.service';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getBlogPost(id).catch(() => null);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.subtitle || '개발 블로그 포스트',
    openGraph: {
      title: post.title,
      description: post.subtitle || '개발 블로그 포스트',
      images: post.thumbnail ? [{ url: post.thumbnail }] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;
  const post = await getBlogPost(id);

  if (!post) {
    notFound();
  }

  return (
    <PageContainer>
      <BlogDetailContent post={post} />
    </PageContainer>
  );
}
