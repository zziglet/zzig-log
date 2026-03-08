'use client';

import Image from 'next/image';
import styled from '@emotion/styled';
import { PortfolioPost } from '@/types/portfolio';
import { theme } from '@/styles/theme';
import { IMAGE_QUALITY } from '@/constants';

const CardContainer = styled.article`
  width: 100%;
  border: 1px solid ${theme.colors.border.light};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s ease-in-out;

  ${theme.media.tablet} {
    border-radius: 14px;
  }

  ${theme.media.desktop} {
    border-radius: 16px;
  }

  &:hover {
    border-color: ${theme.colors.cream[400]};
  }
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  background-color: ${theme.colors.background.layer1};
`;

const Placeholder = styled.div`
  width: 100%;
  aspect-ratio: 16 / 10;
  background-color: ${theme.colors.background.layer1};
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 14px;

  ${theme.media.tablet} {
    gap: 8px;
    padding: 14px 16px;
  }

  ${theme.media.desktop} {
    gap: 8px;
    padding: 16px 18px;
  }
`;

const Title = styled.div`
  margin: 0;
  font-size: ${theme.textSizes.body.sm};
  font-weight: 600;
  color: ${theme.colors.text.body};
  line-height: 1.4;
  word-break: keep-all;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;

  ${theme.media.tablet} {
    font-size: ${theme.textSizes.body.md};
  }

  ${theme.media.desktop} {
    font-size: ${theme.textSizes.body.md};
  }
`;

const CategoryText = styled.span`
  font-size: ${theme.textSizes.body.xs};
  color: ${theme.colors.cream[600]};
  font-weight: 500;
`;

const DateText = styled.span`
  font-size: ${theme.textSizes.body.xs};
  color: ${theme.colors.text.disabled};
  font-weight: 300;
`;

interface PortfolioItemProps {
  post: PortfolioPost;
  onClick?: () => void;
}

function PortfolioItem({ post, onClick }: PortfolioItemProps) {
  const { title, thumbnail, startDate, endDate, category } = post;
  const dateRange = `${startDate} - ${endDate || 'Ing'}`;

  return (
    <CardContainer onClick={onClick}>
      {thumbnail ? (
        <ThumbnailWrapper>
          <Image
            src={thumbnail}
            alt={`${title} thumbnail`}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            quality={IMAGE_QUALITY}
            style={{ objectFit: 'cover' }}
          />
        </ThumbnailWrapper>
      ) : (
        <Placeholder />
      )}

      <ContentWrapper>
        <Title>{title}</Title>
        <CategoryText>{category}</CategoryText>
        <DateText>{dateRange}</DateText>
      </ContentWrapper>
    </CardContainer>
  );
}

export default PortfolioItem;
