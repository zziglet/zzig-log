'use client';

import Image from 'next/image';
import styled from '@emotion/styled';
import { theme } from '@/styles/theme';
import { BlogPost } from '@/types/blog';
import { IMAGE_QUALITY } from '@/constants';

const ItemContainer = styled.article`
  width: 100%;
  padding: 16px 0;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  cursor: pointer;
  border-bottom: 1px solid ${theme.colors.border.light};
  transition: opacity 0.15s ease-in-out;

  ${theme.media.tablet} {
    padding: 20px 0;
    gap: 24px;
  }

  ${theme.media.desktop} {
    padding: 24px 0;
    gap: 28px;
  }

  &:hover {
    opacity: 0.75;
  }
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${theme.colors.background.layer1};
  flex-shrink: 0;

  ${theme.media.tablet} {
    width: 140px;
    height: 140px;
    border-radius: 10px;
  }

  ${theme.media.desktop} {
    width: 164px;
    height: 164px;
    border-radius: 12px;
  }
`;

const Placeholder = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background-color: ${theme.colors.background.layer2};
  flex-shrink: 0;

  ${theme.media.tablet} {
    width: 140px;
    height: 140px;
    border-radius: 10px;
  }

  ${theme.media.desktop} {
    width: 164px;
    height: 164px;
    border-radius: 12px;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  min-height: 80px;

  ${theme.media.tablet} {
    gap: 8px;
    min-height: 140px;
  }

  ${theme.media.desktop} {
    gap: 10px;
    min-height: 164px;
  }
`;

const Title = styled.div`
  margin: 0;
  font-size: ${theme.textSizes.body.md};
  font-weight: 600;
  color: ${theme.colors.text.body};
  line-height: 1.4;
  word-break: keep-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${theme.media.tablet} {
    font-size: ${theme.textSizes.body.lg};
  }

  ${theme.media.desktop} {
    font-size: ${theme.textSizes.body.lg};
  }
`;

const SubTitle = styled.div`
  margin: 0;
  font-size: ${theme.textSizes.body.xs};
  font-weight: 400;
  color: ${theme.colors.text.disabled};
  line-height: 1.4;
  word-break: keep-all;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${theme.media.tablet} {
    font-size: ${theme.textSizes.body.sm};
    -webkit-line-clamp: 2;
  }

  ${theme.media.desktop} {
    font-size: ${theme.textSizes.body.sm};
    -webkit-line-clamp: 2;
  }
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: auto;
`;

const DateText = styled.span`
  font-size: ${theme.textSizes.body.xs};
  color: ${theme.colors.text.disabled};
  font-weight: 400;
`;

const CategoryText = styled.span`
  font-size: ${theme.textSizes.body.xs};
  color: ${theme.colors.cream[600]};
  font-weight: 500;
`;

const Dot = styled.span`
  font-size: ${theme.textSizes.body.xs};
  color: ${theme.colors.text.disabled};
`;

interface BlogItemProps {
  post: BlogPost;
  onClick?: () => void;
}

function BlogItem({ post, onClick }: BlogItemProps) {
  const { title, subtitle, thumbnail, date, category } = post;

  return (
    <ItemContainer onClick={onClick}>
      {thumbnail ? (
        <ThumbnailWrapper>
          <Image
            src={thumbnail}
            alt={`${title} thumbnail`}
            fill
            sizes="(max-width: 767px) 80px, (max-width: 1023px) 140px, 164px"
            quality={IMAGE_QUALITY}
            style={{ objectFit: 'cover' }}
          />
        </ThumbnailWrapper>
      ) : (
        <Placeholder />
      )}

      <ContentWrapper>
        <Title>{title}</Title>
        {subtitle && <SubTitle>{subtitle}</SubTitle>}
        <MetaRow>
          <CategoryText>{category}</CategoryText>
          <Dot>&middot;</Dot>
          <DateText>{date}</DateText>
        </MetaRow>
      </ContentWrapper>
    </ItemContainer>
  );
}

export default BlogItem;
