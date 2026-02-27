'use client';

import Image from 'next/image';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PortfolioDetail } from '@/types/portfolio';
import { theme } from '@/styles/theme';
import TagList from '@/components/common/TagList';
import CategoryBadge from '@/components/common/CategoryBadge';
import { MarkdownBody } from '@/styles/shared.styles';
import { RiGithubFill, RiGlobalLine, RiShareLine } from '@remixicon/react';
import { IMAGE_QUALITY } from '@/constants';
import { useToast } from '@/components/common/Toast';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  word-break: keep-all;

  @media (min-width: 768px) {
    font-size: 36px;
  }
`;

const SubTitle = styled.p`
  font-size: 20px;
  color: ${theme.colors.text.body};
  margin: 0;
  font-weight: 400;
  line-height: 1.5;
  word-break: keep-all;
`;

const LinkButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  padding-top: 8px;
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
    background-color: ${theme.colors.cream[100]};
    transform: translateY(-2px);
  }
`;

const HeroImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  overflow: hidden;
  background-color: ${theme.colors.background.layer1};
`;

const MetaSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 32px 0;
`;

interface PortfolioDetailContentProps {
  post: PortfolioDetail;
}

function PortfolioDetailContent({ post }: PortfolioDetailContentProps) {
  const { id, title, description, thumbnail, startDate, endDate, tags, category, content, webUrl, githubUrl } = post;
  const dateRange = `${startDate} ~ ${endDate || 'Ing'}`;
  const { showToast, ToastUI } = useToast();

  const handleCopyUrl = async () => {
    try {
      const url = `${window.location.origin}/portfolio/${id}`;
      await navigator.clipboard.writeText(url);
      showToast('포트폴리오 링크가 복사되었습니다!');
    } catch (err) {
      console.error('URL 복사 실패', err);
    }
  };

  return (
    <Container>
      <TitleSection>
        <DateBadge>{dateRange}</DateBadge>
        <MainTitle>{title}</MainTitle>
        <SubTitle>{description}</SubTitle>

        <LinkButtonGroup>
          {githubUrl && (
            <LinkButton href={githubUrl} target="_blank" rel="noopener noreferrer" title="Github 저장소">
              <RiGithubFill size={24} />
            </LinkButton>
          )}

          {webUrl && (
            <LinkButton href={webUrl} target="_blank" rel="noopener noreferrer" title="웹사이트 방문">
              <RiGlobalLine size={24} />
            </LinkButton>
          )}

          <LinkButton as="button" onClick={handleCopyUrl} title="링크 복사">
            <RiShareLine size={24} />
          </LinkButton>
        </LinkButtonGroup>
      </TitleSection>

      {thumbnail && (
        <HeroImageWrapper>
          <Image src={thumbnail} alt={title} fill sizes="(max-width: 800px) 100vw, 800px" quality={IMAGE_QUALITY} style={{ objectFit: 'cover' }} priority />
        </HeroImageWrapper>
      )}

      <MetaSection>
        <CategoryBadge>{category}</CategoryBadge>
        <TagList tags={tags} />
      </MetaSection>

      <MarkdownBody>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </MarkdownBody>

      {ToastUI}
    </Container>
  );
}

export default PortfolioDetailContent;
