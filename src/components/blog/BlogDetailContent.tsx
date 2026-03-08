'use client';

import Image from 'next/image';
import styled from '@emotion/styled';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogPostDetail } from '@/types/blog';
import { theme } from '@/styles/theme';
import TagList from '@/components/common/TagList';
import { MarkdownBody, DetailMainTitle, DetailSubTitle, DetailDateBadge, DetailIconButton } from '@/styles/shared.styles';
import { RiShareLine, RiArrowLeftLine } from '@remixicon/react';
import { IMAGE_QUALITY } from '@/constants';
import { useToast } from '@/components/common/Toast';
import { copyToClipboard } from '@/utils/clipboard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const BackButtonLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  text-decoration: none;
  color: ${theme.colors.text.disabled};
  margin-bottom: 16px;

  &:hover {
    color: ${theme.colors.cream[700]};
  }
`;

const CategoryTitle = styled.div`
  font-size: ${theme.textSizes.body.md};
  color: ${theme.colors.cream[600]};
  font-weight: 700;
`;

const TitleSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding-bottom: 16px;

  ${theme.media.tablet} {
    gap: 16px;
    padding-bottom: 24px;
  }

  ${theme.media.desktop} {
    gap: 16px;
    padding-bottom: 24px;
  }
`;

const ActionGroup = styled.div`
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
  margin: 16px 0;

  ${theme.media.tablet} {
    border-radius: 16px;
  }

  ${theme.media.desktop} {
    border-radius: 16px;
  }
`;

const Placeholder = styled.div`
  width: 100%;
  max-width: 800px;
  max-height: 400px;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  background-color: ${theme.colors.background.layer2};
  margin: 16px 0;

  ${theme.media.tablet} {
    border-radius: 16px;
  }

  ${theme.media.desktop} {
    border-radius: 16px;
  }
`;

interface BlogDetailContentProps {
  post: BlogPostDetail;
}

function BlogDetailContent({ post }: BlogDetailContentProps) {
  const { id, title, subtitle, thumbnail, date, tags, category, content } = post;
  const { showToast, ToastUI } = useToast();

  const handleCopyUrl = async () => {
    const url = `${window.location.origin}/blog/${id}`;
    const success = await copyToClipboard(url);
    if (success) showToast('게시글 링크가 복사되었습니다!');
  };

  return (
    <Container>
      <BackButtonLink href="/blog" aria-label="목록으로 돌아가기">
        <RiArrowLeftLine size={20} />
      </BackButtonLink>

      <TitleSection>
        <CategoryTitle>{category}</CategoryTitle>
        <TagList tags={tags} />
        <DetailMainTitle>{title}</DetailMainTitle>
        {subtitle && <DetailSubTitle>{subtitle}</DetailSubTitle>}
        {thumbnail ? (
          <HeroImageWrapper>
            <Image src={thumbnail} alt={title} fill sizes="(max-width: 800px) 100vw, 800px" quality={IMAGE_QUALITY} style={{ objectFit: 'cover' }} priority />
          </HeroImageWrapper>
        ) : (
          <Placeholder />
        )}
        <DetailDateBadge>{date}</DetailDateBadge>
        <ActionGroup>
          <DetailIconButton onClick={handleCopyUrl} title="링크 복사">
            <RiShareLine size={24} />
          </DetailIconButton>
        </ActionGroup>
      </TitleSection>

      <MarkdownBody>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </MarkdownBody>

      {ToastUI}
    </Container>
  );
}

export default BlogDetailContent;
