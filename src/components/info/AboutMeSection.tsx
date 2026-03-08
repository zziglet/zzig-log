'use client';

import Image from 'next/image';
import styled from '@emotion/styled';
import { SectionContainer, SectionTitle } from '@/styles/shared.styles';
import { INFO_IMAGES, PERSONAL_INFO, CAREER_HISTORY } from '@/constants/info';
import { theme } from '@/styles/theme';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 40px 0;

  ${theme.media.tablet} {
    gap: 32px;
    padding: 56px 0;
  }

  ${theme.media.desktop} {
    flex-direction: row;
    align-items: flex-end;
    gap: 48px;
    padding: 72px 0;
  }
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 200px;
  aspect-ratio: 3 / 4;

  ${theme.media.tablet} {
    width: 300px;
  }

  ${theme.media.desktop} {
    width: 400px;
  }
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  flex: 1;
  width: 100%;

  ${theme.media.desktop} {
    gap: 40px;
  }
`;

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  ${theme.media.tablet} {
    gap: 16px;
  }
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: ${theme.textSizes.body.xs};
  color: ${theme.colors.text.body};

  ${theme.media.tablet} {
    flex-direction: row;
    gap: 0;
  }
`;

const Label = styled.span`
  font-weight: bold;
  color: ${theme.colors.peach[500]};

  ${theme.media.tablet} {
    width: 200px;
    flex-shrink: 0;
  }

  ${theme.media.desktop} {
    width: 240px;
  }
`;

const Value = styled.span`
  color: ${theme.colors.text.body};

  ${theme.media.tablet} {
    flex: 1;
  }
`;

function AboutMeSection() {
  return (
    <SectionContainer>
      <ContentWrapper>
        <ProfileImageWrapper>
          <Image
            src={INFO_IMAGES.homeIcon2}
            alt="Profile"
            fill
            sizes="(max-width: 767px) 200px, (max-width: 1023px) 300px, 400px"
            unoptimized
            style={{ objectFit: 'cover' }}
          />
        </ProfileImageWrapper>

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
