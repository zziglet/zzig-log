import BlogContent from '@/components/blog/BlogContent';
import { SectionTitle } from '@/styles/shared.styles';
import { getBlogPosts } from '@/services/blog.service';

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <SectionTitle>Blog</SectionTitle>
      <BlogContent posts={posts ?? []} />
    </>
  );
}
