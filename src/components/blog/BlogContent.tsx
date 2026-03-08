'use client';

import { useState, useMemo } from 'react';
import BlogList from '@/components/blog/BlogList';
import CategoryTabBar from '@/components/blog/CategoryTabBar';
import { BlogPost, CategoryType } from '@/types/blog';

interface BlogContentProps {
  posts: BlogPost[];
}

function BlogContent({ posts }: BlogContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('전체');

  const filteredPosts = useMemo(() => {
    if (selectedCategory === '전체') {
      return posts;
    }
    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  return (
    <>
      <CategoryTabBar selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
      <BlogList posts={filteredPosts} />
    </>
  );
}

export default BlogContent;
