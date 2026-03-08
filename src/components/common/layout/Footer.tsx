'use client';

import { FOOTER_LINKS, GITHUB_LINK } from '@/constants/footer';
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
  padding: 32px 16px;
  box-sizing: border-box;
  text-align: left;

  ${theme.media.tablet} {
    padding: 48px 24px;
  }

  ${theme.media.desktop} {
    padding: 48px 40px;
  }
`;

const FooterContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  font-size: ${theme.textSizes.body.xs};

  ${theme.media.mobile} {
    flex-direction: column;
    gap: 24px;
  }
`;

const FooterLeft = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 48px;

  ${theme.media.mobile} {
    gap: 0;
    width: 100%;
    justify-content: space-between;
  }
`;

const FooterRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;

  ${theme.media.mobile} {
    align-items: flex-start;
    gap: 4px;
    padding-top: 8px;
    border-top: 1px solid ${theme.colors.border.light};
    width: 100%;
  }
`;

const LinkGroup = styled.div`
  height: auto;
  width: 96px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  ${theme.media.mobile} {
    width: auto;
    gap: 6px;
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
`;

const LogoWrapper = styled.div`
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;

  ${theme.media.mobile} {
    justify-content: flex-start;
  }
`;

const LogoIcon = styled(RiGithubFill)`
  width: 22px;
  height: 22px;

  ${theme.media.mobile} {
    width: 18px;
    height: 18px;
  }
`;

const DescriptionLabel = styled.div`
  position: relative;
`;

const IconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
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
            <IconLink href={GITHUB_LINK} target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub">
              <LogoIcon />
            </IconLink>
            <DescriptionLabel>zzig.log</DescriptionLabel>
          </LogoWrapper>
          <DescriptionLabel>©{currentYear} zziglet. All rights reserved</DescriptionLabel>
        </FooterRight>
      </FooterContainer>
    </StyledFooter>
  );
}

export { Footer };
