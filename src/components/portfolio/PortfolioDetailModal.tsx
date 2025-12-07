'use client';

import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PortfolioDetail } from '@/types/portfolio';
import { theme } from '@/styles/theme';
import TagList from '@/components/common/TagList';
import CategoryBadge from '@/components/common/CategoryBadge';
import { MarkdownBody } from '@/styles/shared.styles';
import { RiShareLine, RiFullscreenLine, RiCloseLine, RiGithubFill, RiGlobalLine } from '@remixicon/react';

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

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 24px;
`;

const DateBadge = styled.span`
  font-size: ${theme.textSizes.body.sm};
  color: ${theme.colors.text.disabled};
  font-weight: 500;
`;

const MainTitle = styled.h2`
  font-size: 32px;
  font-weight: 800;
  color: ${theme.colors.text.body};
  margin: 0;
  line-height: 1.3;
`;

const SubTitle = styled.p`
  font-size: 20px;
  color: ${theme.colors.text.body};
  margin: 0;
  font-weight: 400;
  line-height: 1.5;
`;

const LinkButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

const LinkButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-color: ${theme.colors.cream[50]};
  color: ${theme.colors.text.body};
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;

  &:hover {
    background-color: ${theme.colors.peach[200]};
    transform: translateY(-2px);
  }
`;

const HeroImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 16px;
  background-color: ${theme.colors.background.layer1};
  margin-bottom: 24px;
`;

const MetaSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
`;

const CategoryWrapper = styled.div`
  display: flex;
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

  const { id, title, description, thumbnail, startDate, endDate, tags, category, content, webUrl, githubUrl } = post;
  const dateRange = `${startDate} - ${endDate || 'Ing'}`;

  const handleFullPage = () => {
    router.push(`/portfolio/${id}`);
  };

  const handleCopyUrl = async () => {
    try {
      const url = `${window.location.origin}/portfolio/${id}`;
      await navigator.clipboard.writeText(url);
      alert('포트폴리오 링크가 복사되었습니다!');
    } catch (err) {
      console.error('URL 복사 실패', err);
    }
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
          <TitleSection>
            <DateBadge>{dateRange}</DateBadge>
            <MainTitle>{title}</MainTitle>
            <SubTitle>{description}</SubTitle>

            <LinkButtonGroup>
              {githubUrl && (
                <LinkButton href={githubUrl} target="_blank" title="Github 저장소">
                  <RiGithubFill size={24} />
                </LinkButton>
              )}

              {webUrl && (
                <LinkButton href={webUrl} target="_blank" title="웹사이트 방문">
                  <RiGlobalLine size={24} />
                </LinkButton>
              )}

              <LinkButton as="button" onClick={handleCopyUrl} title="링크 복사">
                <RiShareLine size={24} />
              </LinkButton>
            </LinkButtonGroup>
          </TitleSection>

          {thumbnail && <HeroImage src={thumbnail} alt={title} />}

          <MetaSection>
            <CategoryWrapper>
              <CategoryBadge>{category}</CategoryBadge>
            </CategoryWrapper>
            <TagList tags={tags} />
          </MetaSection>

          <MarkdownBody>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </MarkdownBody>
        </ScrollArea>
      </ModalContainer>
    </Backdrop>
  );
}

export default PortfolioDetailModal;
