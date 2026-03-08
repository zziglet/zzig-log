'use client';

import { useState, useEffect, useRef } from 'react';
import PortfolioModal from '@/components/portfolio/PortfolioDetailModal';
import PortfolioList from '@/components/portfolio/PortfolioList';
import { PortfolioDetail, PortfolioPost } from '@/types/portfolio';

interface PortfolioContentProps {
  posts: PortfolioPost[];
}

function PortfolioContent({ posts }: PortfolioContentProps) {
  const [selectedPost, setSelectedPost] = useState<PortfolioDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const handlePostClick = async (post: PortfolioPost) => {
    setSelectedPost({ ...post, content: '' });
    setIsModalOpen(true);

    const currentId = post.id;

    try {
      const res = await fetch(`/api/portfolio/${post.id}`);

      if (res.ok) {
        const detailData: PortfolioDetail = await res.json();
        setSelectedPost((prev) => (prev && prev.id === currentId ? detailData : prev));
      } else {
        setSelectedPost((prev) => (prev ? { ...prev, content: '## 내용을 불러올 수 없습니다.' } : null));
      }
    } catch (error) {
      console.error('[PortfolioContent] Failed to fetch detail:', error);
      setSelectedPost((prev) => (prev ? { ...prev, content: '## 내용을 불러올 수 없습니다.' } : null));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setSelectedPost(null), 300);
  };

  return (
    <>
      <PortfolioList posts={posts} onClick={handlePostClick} />
      <PortfolioModal isOpen={isModalOpen} onClose={closeModal} post={selectedPost} />
    </>
  );
}

export default PortfolioContent;
