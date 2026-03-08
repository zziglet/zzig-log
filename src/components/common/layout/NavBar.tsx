'use client';

import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { theme } from '@/styles/theme';
import { NAV_LINKS } from '@/constants/nav';
import { RiCloseFill, RiMenuLine } from '@remixicon/react';
import MobileNav from './MobileNav';

const StyledNav = styled.nav`
  width: 100%;
  height: 80px;
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  box-sizing: border-box;
  background-color: ${theme.colors.background.base};

  ${theme.media.tablet} {
    height: 100px;
    padding: 0 24px;
  }

  ${theme.media.desktop} {
    height: 100px;
    padding: 0 40px;
  }
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoLabel = styled(Link)`
  font-size: ${theme.textSizes.heading.xl};
  font-weight: 700;
  color: ${theme.colors.cream[700]};
  text-decoration: none;
  cursor: pointer;
  z-index: 1001;
`;

const DesktopMenuGroup = styled.div`
  display: none;

  ${theme.media.tablet} {
    display: flex;
    align-items: center;
    gap: 32px;
  }
`;

const MenuLabel = styled(Link, {
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $isActive: boolean }>`
  font-size: ${theme.textSizes.body.md};
  font-weight: ${(props) => (props.$isActive ? 500 : 400)};
  color: ${(props) => (props.$isActive ? theme.colors.cream[600] : theme.colors.text.disabled)};
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${theme.colors.cream[500]};
  }
`;

const MobileMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.body};
  z-index: 1100;

  ${theme.media.tablet} {
    display: none;
  }
`;

const CloseIcon = styled(RiCloseFill)`
  width: 24px;
  height: 24px;
  color: ${theme.colors.cream[700]};
`;

const MenuIcon = styled(RiMenuLine)`
  width: 24px;
  height: 24px;
  color: ${theme.colors.cream[700]};
`;

function NavBar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const checkIsActive = (linkHref: string): boolean => {
    if (linkHref === '/') {
      return pathname === linkHref;
    }

    return pathname === linkHref || pathname.startsWith(`${linkHref}/`);
  };

  return (
    <>
      <StyledNav>
        <NavContainer>
          <LogoLabel href="/">zzig.log</LogoLabel>

          <DesktopMenuGroup>
            {NAV_LINKS.map((link) => (
              <MenuLabel key={link.title} href={link.href} $isActive={checkIsActive(link.href)}>
                {link.title}
              </MenuLabel>
            ))}
          </DesktopMenuGroup>

          <MobileMenuButton onClick={toggleMenu} aria-label="메뉴 토글">
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </MobileMenuButton>
        </NavContainer>
      </StyledNav>

      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}

export { NavBar };
