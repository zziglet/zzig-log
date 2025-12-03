import styled from '@emotion/styled';
import { SectionContainer, SectionTitle } from '@/styles/shared.styles';
import { INFO_IMAGES, PERSONAL_INFO, CAREER_HISTORY } from '@/constants/info';
import { theme } from '@/styles/theme';

const ContentWrapper = styled.div`
  display: flex;
  gap: 32px;
  align-items: flex-end;
  padding: 72px 0;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ProfileImage = styled.img`
  width: 400px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 200px;
  }
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  flex: 1;
`;

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoRow = styled.div`
  display: flex;
  font-size: ${theme.textSizes.body.xs};
  color: ${theme.colors.text.body};
`;

const Label = styled.span`
  width: 240px;
  font-weight: bold;
  color: ${theme.colors.peach[500]};

  @media (max-width: 768px) {
    width: 160px;
  }
`;

const Value = styled.span`
  flex: 1;
  color: ${theme.colors.text.body};
`;

function AboutMeSection() {
  return (
    <SectionContainer>
      <ContentWrapper>
        <ProfileImage src={INFO_IMAGES.homeIcon2} alt="Profile" />

        <InfoColumn>
          <SectionTitle>
            About
            <br />
            me
          </SectionTitle>

          <InfoGroup>
            <InfoRow>
              <Label>Email</Label>
              <Value>{PERSONAL_INFO.email}</Value>
            </InfoRow>
            <InfoRow>
              <Label>Github</Label>
              <Value>{PERSONAL_INFO.github}</Value>
            </InfoRow>
            <InfoRow>
              <Label>Education</Label>
              <Value>{PERSONAL_INFO.education}</Value>
            </InfoRow>
          </InfoGroup>

          <InfoGroup>
            {CAREER_HISTORY.map((career, index) => (
              <InfoRow key={index}>
                <Label>{career.period}</Label>
                <Value>{career.role}</Value>
              </InfoRow>
            ))}
          </InfoGroup>
        </InfoColumn>
      </ContentWrapper>
    </SectionContainer>
  );
}

export default AboutMeSection;
