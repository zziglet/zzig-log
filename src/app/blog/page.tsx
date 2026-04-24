import { Metadata } from 'next';
import BlogContent from '@/components/blog/BlogContent';
import { SectionTitle } from '@/styles/shared.styles';
import { getBlogPosts } from '@/services/blog.service';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Blog',
  description: 'zziglet의 개발 블로그 글 목록입니다.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog',
    description: 'zziglet의 개발 블로그 글 목록입니다.',
    url: '/blog',
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <SectionTitle>Blog</SectionTitle>
      <BlogContent posts={posts ?? []} />
    </>
  );
}
