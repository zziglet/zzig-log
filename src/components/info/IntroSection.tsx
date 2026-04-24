'use client';

import Image from 'next/image';
import styled from '@emotion/styled';
import { SectionContainer, SectionTitle } from '@/styles/shared.styles';
import { INFO_IMAGES } from '@/constants/info';
import { theme } from '@/styles/theme';

const DescriptionBox = styled.div`
  text-align: left;
  padding-bottom: 20px;

  ${theme.media.tablet} {
    padding-bottom: 28px;
  }

  ${theme.media.desktop} {
    padding-bottom: 32px;
  }
`;

const Greeting = styled.div`
  font-size: ${theme.textSizes.body.sm};
  color: ${theme.colors.text.body};
  font-weight: bold;
  line-height: 1.6;
`;

const HighlightName = styled.span`
  color: ${theme.colors.cream[600]};
`;

const SubTitle = styled.div`
  font-size: ${theme.textSizes.body.xs};
  color: ${theme.colors.peach[600]};
  font-weight: 500;
  padding-top: 8px;
`;

function IntroSection() {
  return (
    <SectionContainer>
      <DescriptionBox>
        <SectionTitle>zziglet</SectionTitle>
        <Greeting>
          안녕하세요, 끊임 없이 전진하고 싶은 개발자, <HighlightName>정지원</HighlightName>입니다.
        </Greeting>
        <SubTitle>Web Front-End Developer in Seoul, Korea</SubTitle>
      </DescriptionBox>
      <Image src={INFO_IMAGES.homeIcon1} alt="Intro Main" width={4776} height={1744} style={{ width: '100%', height: 'auto' }} priority />
    </SectionContainer>
  );
}

export default IntroSection;
