'use client';

import Image from 'next/image';
import styled from '@emotion/styled';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogPostDetail } from '@/types/blog';
import { theme } from '@/styles/theme';
import TagList from '@/components/common/TagList';
import { MarkdownBody } from '@/styles/shared.styles';
import { RiShareLine, RiArrowLeftLine } from '@remixicon/react';
import { IMAGE_QUALITY } from '@/constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const BackButtonLink = styled(Link)`
  display: inline-flex;
  align-self: flex-start;
  gap: 4px;
  text-decoration: none;
  color: ${theme.colors.cream[600]};
  font-size: ${theme.textSizes.body.md};
  font-weight: 500;

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
  gap: 16px;
  padding-bottom: 24px;
`;

const DateBadge = styled.span`
  font-size: ${theme.textSizes.body.sm};
  color: ${theme.colors.text.disabled};
  font-weight: 500;
`;

const MainTitle = styled.h1`
  font-size: 32px;
  font-weight: 800;
  color: ${theme.colors.text.body};
  margin: 0;
  line-height: 1.3;
  word-break: keep-all;
  text-align: center;

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
  text-align: center;
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 12px;
  padding-top: 8px;
`;

const IconButton = styled.button`
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
  margin: 24px 0;
`;

const Placeholder = styled.div`
  width: 100%;
  max-width: 800px;
  max-height: 400px;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  background-color: ${theme.colors.background.layer2};
  margin: 24px 0;
`;

interface BlogDetailContentProps {
  post: BlogPostDetail;
}

function BlogDetailContent({ post }: BlogDetailContentProps) {
  const { id, title, subtitle, thumbnail, date, tags, category, content } = post;

  const handleCopyUrl = async () => {
    try {
      const url = `${window.location.origin}/blog/${id}`;
      await navigator.clipboard.writeText(url);
      alert('게시글 링크가 복사되었습니다!');
    } catch (err) {
      console.error('URL 복사 실패', err);
    }
  };

  return (
    <Container>
      <BackButtonLink href="/blog" aria-label="목록으로 돌아가기">
        <RiArrowLeftLine size={28} />
      </BackButtonLink>

      <TitleSection>
        <CategoryTitle>{category}</CategoryTitle>
        <TagList tags={tags} />
        <MainTitle>{title}</MainTitle>
        {subtitle && <SubTitle>{subtitle}</SubTitle>}
        {thumbnail ? (
          <HeroImageWrapper>
            <Image src={thumbnail} alt={title} fill sizes="(max-width: 800px) 100vw, 800px" quality={IMAGE_QUALITY} style={{ objectFit: 'cover' }} priority />
          </HeroImageWrapper>
        ) : (
          <Placeholder />
        )}
        <DateBadge>{date}</DateBadge>
        <ActionGroup>
          <IconButton onClick={handleCopyUrl} title="링크 복사">
            <RiShareLine size={24} />
          </IconButton>
        </ActionGroup>
      </TitleSection>

      <MarkdownBody>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </MarkdownBody>
    </Container>
  );
}

export default BlogDetailContent;
