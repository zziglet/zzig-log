'use client';

import Image from 'next/image';
import styled from '@emotion/styled';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PortfolioDetail } from '@/types/portfolio';
import { theme } from '@/styles/theme';
import TagList from '@/components/common/TagList';
import CategoryBadge from '@/components/common/CategoryBadge';
import { MarkdownBody, DetailMainTitle, DetailSubTitle, DetailDateBadge, DetailIconButton, DetailIconLink } from '@/styles/shared.styles';
import { RiGithubFill, RiGlobalLine, RiShareLine } from '@remixicon/react';
import { IMAGE_QUALITY } from '@/constants';
import { useToast } from '@/components/common/Toast';
import { copyToClipboard } from '@/utils/clipboard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding-bottom: 16px;

  ${theme.media.tablet} {
    gap: 12px;
    padding-bottom: 24px;
  }

  ${theme.media.desktop} {
    gap: 12px;
    padding-bottom: 24px;
  }
`;

const LinkButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  padding-top: 8px;
`;

const HeroImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  background-color: ${theme.colors.background.layer1};

  ${theme.media.tablet} {
    border-radius: 16px;
  }

  ${theme.media.desktop} {
    border-radius: 16px;
  }
`;

const MetaSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 24px 0;

  ${theme.media.tablet} {
    gap: 12px;
    padding: 32px 0;
  }

  ${theme.media.desktop} {
    gap: 12px;
    padding: 32px 0;
  }
`;

interface PortfolioDetailContentProps {
  post: PortfolioDetail;
}

function PortfolioDetailContent({ post }: PortfolioDetailContentProps) {
  const { id, title, description, thumbnail, startDate, endDate, tags, category, content, webUrl, githubUrl } = post;
  const dateRange = `${startDate} ~ ${endDate || 'Ing'}`;
  const { showToast, ToastUI } = useToast();

  const handleCopyUrl = async () => {
    const url = `${window.location.origin}/portfolio/${id}`;
    const success = await copyToClipboard(url);
    if (success) showToast('포트폴리오 링크가 복사되었습니다!');
  };

  return (
    <Container>
      <TitleSection>
        <DetailDateBadge>{dateRange}</DetailDateBadge>
        <DetailMainTitle>{title}</DetailMainTitle>
        <DetailSubTitle>{description}</DetailSubTitle>

        <LinkButtonGroup>
          {githubUrl && (
            <DetailIconLink href={githubUrl} target="_blank" rel="noopener noreferrer" title="Github 저장소">
              <RiGithubFill size={24} />
            </DetailIconLink>
          )}

          {webUrl && (
            <DetailIconLink href={webUrl} target="_blank" rel="noopener noreferrer" title="웹사이트 방문">
              <RiGlobalLine size={24} />
            </DetailIconLink>
          )}

          <DetailIconButton onClick={handleCopyUrl} title="링크 복사">
            <RiShareLine size={24} />
          </DetailIconButton>
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
