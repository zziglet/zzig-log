'use client';

import { useState, useEffect } from 'react';
import PortfolioModal from '@/components/portfolio/PortfolioDetailModal';
import PortfolioList from '@/components/portfolio/PortfolioList';
import { SectionTitle } from '@/styles/shared.styles';
import { PortfolioDetail, PortfolioPost } from '@/types/portfolio';
import Loading from '@/components/common/Loading';

function PortfolioPage() {
  const [posts, setPosts] = useState<PortfolioPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<PortfolioDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        } else {
          console.error('Failed to load posts');
        }
      } catch (error) {
        console.error('Failed to load posts', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = async (post: PortfolioPost) => {
    setSelectedPost({ ...post, content: '' });
    setIsModalOpen(true);

    const currentId = post.id;
    const res = await fetch(`/api/portfolio/${post.id}`);

    if (res.ok) {
      const detailData: PortfolioDetail = await res.json();
      setSelectedPost((prev) => (prev && prev.id === currentId ? detailData : prev));
    } else {
      setSelectedPost((prev) => (prev ? { ...prev, content: '## 내용을 불러올 수 없습니다.' } : null));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPost(null), 300);
  };

  return (
    <>
      <SectionTitle>Portfolio</SectionTitle>
      {loading ? <Loading /> : <PortfolioList posts={posts} onClick={handlePostClick} />}
      <PortfolioModal isOpen={isModalOpen} onClose={closeModal} post={selectedPost} />
    </>
  );
}

export default PortfolioPage;
