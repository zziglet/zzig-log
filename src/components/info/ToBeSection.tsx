'use client';

import styled from '@emotion/styled';
import { SectionTitle, HighlightText } from '@/styles/shared.styles';
import { LINKS } from '@/constants/info';
import { theme } from '@/styles/theme';
import Button from '@/components/common/Button';
import Link from 'next/link';

const FullBleedWrapper = styled.section`
  width: 100vw;
  position: relative;
  overflow: hidden;
  margin-left: -16px;

  ${theme.media.tablet} {
    margin-left: -24px;
  }

  ${theme.media.desktop} {
    margin-left: calc(-50vw + 50%);
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  background-image: url('/images/home_3.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(250, 250, 250, 0.15);
`;

const ContentArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 48px 16px 64px;

  ${theme.media.tablet} {
    padding: 56px 24px 80px;
  }

  ${theme.media.desktop} {
    padding: 64px 40px 96px;
  }
`;

const Description = styled.p`
  font-size: ${theme.textSizes.body.xs};
  line-height: 1.8;
  color: ${theme.colors.text.body};
  max-width: 480px;
  margin: 0 auto;
  padding-bottom: 40px;
  word-break: keep-all;

  ${theme.media.tablet} {
    font-size: ${theme.textSizes.body.sm};
    padding-bottom: 48px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;

  ${theme.media.tablet} {
    gap: 24px;
  }
`;

function ToBeSection() {
  return (
    <FullBleedWrapper>
      <BackgroundImage />
      <Overlay />
      <ContentArea>
        <SectionTitle>To be</SectionTitle>
        <Description>
          눈앞에 주어진 문제를 화면으로 해결하는 즐거움이 저를 <HighlightText>FrontEnd</HighlightText> 개발로 이끌었습니다. 앞으로도 새로운 기술과 사람들을
          마주하며 <HighlightText>끊임없이 배우고 공유하는 개발자</HighlightText>가 되고 싶습니다.
        </Description>

        <ButtonGroup>
          <Link href={LINKS.blog}>
            <Button color="primary_fill">blog</Button>
          </Link>
          <Link href={LINKS.portfolio}>
            <Button color="primary_line">portfolio</Button>
          </Link>
        </ButtonGroup>
      </ContentArea>
    </FullBleedWrapper>
  );
}

export default ToBeSection;
