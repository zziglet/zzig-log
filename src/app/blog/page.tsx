'use client';

import { useState, useEffect, useMemo } from 'react';
import BlogList from '@/components/blog/BlogList';
import CategoryTabBar from '@/components/blog/CategoryTabBar';
import Loading from '@/components/common/Loading';
import { SectionTitle } from '@/styles/shared.styles';
import { BlogPost } from '@/types/blog';
import { useRouter } from 'next/navigation';

function BlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blog');
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        } else {
          console.error('Failed to load blog posts');
        }
      } catch (error) {
        console.error('Failed to load blog posts', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === '전체') {
      return posts;
    }
    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  const handlePostClick = (post: BlogPost) => {
    router.push(`/blog/${post.id}`);
  };

  return (
    <>
      <SectionTitle>Blog</SectionTitle>
      <CategoryTabBar selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
      {loading ? <Loading /> : <BlogList posts={filteredPosts} onClick={handlePostClick} />}
    </>
  );
}

export default BlogPage;
