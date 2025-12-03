import styled from '@emotion/styled';
import { SectionContainer, SectionTitle, HighlightText } from '@/styles/shared.styles';
import { LINKS } from '@/constants/info';
import { theme } from '@/styles/theme';
import Button from '@/components/common/Button';
import Link from 'next/link';

const VisionContainer = styled(SectionContainer)`
  text-align: center;
  width: 100%;
  padding-top: 48px;

  background-image: url('/images/home_3.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Description = styled.div`
  font-size: ${theme.textSizes.body.xs};
  line-height: 1.6;
  color: ${theme.colors.text.body};
  padding-bottom: 48px;
`;

const HorizontalLine = styled.br``;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  padding-bottom: 96px;
`;

function ToBeSection() {
  return (
    <VisionContainer>
      <div>
        <SectionTitle>To be</SectionTitle>
        <Description>
          눈앞에 주어진 문제를 화면으로 해결하는 즐거움이 저를 <HighlightText>FrontEnd</HighlightText> 개발로 이끌었습니다.
          <HorizontalLine />
          앞으로도 새로운 기술과 사람들을 마주하며
          <HorizontalLine />
          <HighlightText>끊임없이 배우고 공유하는 개발자</HighlightText>가 되고 싶습니다.
        </Description>

        <ButtonGroup>
          <Link href={LINKS.blog}>
            <Button color="primary_fill">blog</Button>
          </Link>
          <Link href={LINKS.portfolio}>
            <Button color="primary_line">portfolio</Button>
          </Link>
        </ButtonGroup>
      </div>
    </VisionContainer>
  );
}

export default ToBeSection;
