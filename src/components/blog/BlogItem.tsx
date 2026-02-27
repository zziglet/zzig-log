'use client';

import Image from 'next/image';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import TagList from '@/components/common/TagList';
import CategoryBadge from '@/components/common/CategoryBadge';
import { BlogPost } from '@/types/blog';

const ItemContainer = styled.article`
  width: 100%;
  background-color: ${theme.colors.background.base};
  border-radius: 24px;
  padding: 24px 0;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  gap: 36px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 184px;
  height: 184px;
  border-radius: 12px;
  overflow: hidden;
  background-color: ${theme.colors.background.layer1};
  flex-shrink: 0;
`;

const Placeholder = styled.div`
  width: 184px;
  height: 184px;
  border-radius: 12px;
  background-color: ${theme.colors.background.layer2};
  flex-shrink: 0;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  min-height: 184px;
`;

const MetaHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 4px;
`;

const Title = styled.div`
  margin: 0;
  font-size: ${theme.textSizes.body.lg || '18px'};
  font-weight: 700;
  color: ${theme.colors.text.body};
  line-height: 1.4;
  word-break: keep-all;
`;

const SubTitle = styled.div`
  margin: 0;
  font-size: ${theme.textSizes.body.sm || '10px'};
  font-weight: 400;
  color: ${theme.colors.text.body};
  line-height: 1.4;
  word-break: keep-all;
`;

const DateText = styled.span`
  font-size: ${theme.textSizes.body.xs};
  color: ${theme.colors.text.disabled};
  font-weight: 400;
`;

interface BlogItemProps {
  post: BlogPost;
  onClick?: () => void;
}

function BlogItem({ post, onClick }: BlogItemProps) {
  const { title, subtitle, thumbnail, date, tags, category } = post;

  return (
    <ItemContainer onClick={onClick}>
      {thumbnail ? (
        <ThumbnailWrapper>
          <Image src={thumbnail} alt={`${title} thumbnail`} fill sizes="184px" style={{ objectFit: 'cover' }} />
        </ThumbnailWrapper>
      ) : (
        <Placeholder />
      )}

      <ContentWrapper>
        <MetaHeader>
          <TagList tags={tags} />
          <CategoryBadge>{category}</CategoryBadge>
        </MetaHeader>

        <TitleWrapper>
          <Title>{title}</Title>
          <SubTitle>{subtitle}</SubTitle>
          <DateText>{date}</DateText>
        </TitleWrapper>
      </ContentWrapper>
    </ItemContainer>
  );
}

export default BlogItem;
