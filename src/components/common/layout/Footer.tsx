'use client';

import { FOOTER_LINKS } from '@/constants/footer';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import { RiGithubFill } from '@remixicon/react';

const StyledFooter = styled.footer`
  width: 100%;
  background-color: ${theme.colors.background.layer2};
  color: ${theme.colors.text.body};

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 40px;
  box-sizing: border-box;
  text-align: left;
`;

const FooterContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  font-size: ${theme.textSizes.body.xs};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const FooterLeft = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 48px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }
`;

const FooterRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const LinkGroup = styled.div`
  height: auto;
  width: 96px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const Title = styled.b`
  align-self: stretch;
  position: relative;
`;

const LinkItem = styled.a`
  align-self: stretch;
  position: relative;
  cursor: pointer;
  text-decoration: none;
  color: inherit;

  @media (max-width: 768px) {
    align-self: auto;
  }
`;

const LogoWrapper = styled.div`
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const LogoIcon = styled(RiGithubFill)`
  width: 22px;
  height: 22px;
`;

const DescriptionLabel = styled.div`
  position: relative;
`;

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <StyledFooter>
      <FooterContainer>
        <FooterLeft>
          {FOOTER_LINKS.map((group) => (
            <LinkGroup key={group.groupTitle}>
              <Title>{group.groupTitle}</Title>
              {group.links.map((link) => (
                <LinkItem key={link.title} href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.title}
                </LinkItem>
              ))}
            </LinkGroup>
          ))}
        </FooterLeft>
        <FooterRight>
          <LogoWrapper>
            <LogoIcon />
            <DescriptionLabel>zzig.log</DescriptionLabel>
          </LogoWrapper>
          <DescriptionLabel>zzig.log | 대표 : 정지원</DescriptionLabel>
          <DescriptionLabel>©{currentYear} zziglet. All rights reserved</DescriptionLabel>
        </FooterRight>
      </FooterContainer>
    </StyledFooter>
  );
}

export { Footer };
