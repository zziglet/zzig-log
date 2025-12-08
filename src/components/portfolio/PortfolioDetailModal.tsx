'use client';

import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { theme } from '@/styles/theme';
import { PortfolioDetail } from '@/types/portfolio';
import { RiFullscreenLine, RiCloseLine } from '@remixicon/react';
import PortfolioDetailContent from './PortfolioDetailContent';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
`;

const ModalContainer = styled.div`
  width: 100%;
  max-width: 800px;
  height: 90vh;
  background-color: ${theme.colors.background.base};
  border-radius: 24px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ModalHeader = styled.div`
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  background-color: ${theme.colors.background.base};
  z-index: 10;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  color: ${theme.colors.text.disabled};
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${theme.colors.background.layer1};
    color: ${theme.colors.text.body};
  }
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 40px 40px 40px;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.background.layer1};
    border-radius: 4px;
  }
`;

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: PortfolioDetail | null;
}

function PortfolioDetailModal({ isOpen, onClose, post }: PortfolioModalProps) {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !post) return null;

  const handleFullPage = () => {
    router.push(`/portfolio/${post.id}`);
  };

  return (
    <Backdrop onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ControlButton onClick={handleFullPage} title="새 탭에서 전체 보기">
            <RiFullscreenLine size={24} />
          </ControlButton>
          <ControlButton onClick={onClose} title="닫기">
            <RiCloseLine size={24} />
          </ControlButton>
        </ModalHeader>

        <ScrollArea>
          <PortfolioDetailContent post={post} />
        </ScrollArea>
      </ModalContainer>
    </Backdrop>
  );
}

export default PortfolioDetailModal;
