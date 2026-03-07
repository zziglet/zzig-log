'use client';

import Image from 'next/image';
import styled from '@emotion/styled';
import { PortfolioPost } from '@/types/portfolio';
import { theme } from '@/styles/theme';
import TagList from '@/components/common/TagList';
import CategoryBadge from '@/components/common/CategoryBadge';
import { IMAGE_QUALITY } from '@/constants';

const CardContainer = styled.article`
  width: 100%;
  background-color: ${theme.colors.background.base};
  border-radius: 24px;
  box-shadow: ${theme.effects.shadow};
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  color: ${theme.colors.text.body};
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 320 / 200;
  border-radius: 12px;
  overflow: hidden;
  background-color: ${theme.colors.background.layer1};
`;

const Placeholder = styled.div`
  width: 100%;
  aspect-ratio: 320 / 200;
  background-color: ${theme.colors.background.layer1};
  border-radius: 12px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
`;

const Title = styled.div`
  margin: 0;
  font-size: ${theme.textSizes.body.xs};
  font-weight: bold;
  line-height: 1.4;
  word-break: keep-all;
`;

const DateText = styled.div`
  font-size: ${theme.textSizes.body.xs};
  color: ${theme.colors.text.disabled};
  font-weight: 300;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

interface PortfolioItemProps {
  post: PortfolioPost;
  onClick?: () => void;
}

function PortfolioItem({ post, onClick }: PortfolioItemProps) {
  const { title, thumbnail, startDate, endDate, tags, category } = post;
  const dateRange = `${startDate} - ${endDate || 'Ing'}`;

  return (
    <CardContainer onClick={onClick}>
      {thumbnail ? (
        <ThumbnailWrapper>
          <Image
            src={thumbnail}
            alt={`${title} thumbnail`}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            quality={IMAGE_QUALITY}
            style={{ objectFit: 'cover' }}
          />
        </ThumbnailWrapper>
      ) : (
        <Placeholder />
      )}

      <ContentWrapper>
        <Header>
          <Title>{title}</Title>
          <DateText>{dateRange}</DateText>
        </Header>

        <Footer>
          <TagList tags={tags} />
          <CategoryBadge>{category}</CategoryBadge>
        </Footer>
      </ContentWrapper>
    </CardContainer>
  );
}

export default PortfolioItem;
