import styled from '@emotion/styled';
import { SectionContainer, SectionTitle } from '@/styles/shared.styles';
import { INFO_IMAGES } from '@/constants/info';
import { theme } from '@/styles/theme';

const DescriptionBox = styled.div`
  text-align: left;
  padding-bottom: 32px;
`;

const Greeting = styled.div`
  font-size: ${theme.textSizes.body.sm};
  color: ${theme.colors.text.body};
  font-weight: bold;
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

const MainImage = styled.img`
  width: 100%;
  max-height: 600px;
  object-fit: cover;
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
      <MainImage src={INFO_IMAGES.homeIcon1} alt="Intro Main" />
    </SectionContainer>
  );
}

export default IntroSection;
