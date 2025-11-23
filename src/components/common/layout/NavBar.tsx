'use client';

import styled from '@emotion/styled';
import { usePathname } from 'next/navigation';
import { theme } from '@/styles/theme';
import { NAV_LINKS } from '@/constants/nav';
import { useEffect, useState } from 'react';

const StyledNav = styled.nav`
  width: 100%;
  height: 100px;

  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
  box-sizing: border-box;
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  text-decoration: none;
  cursor: pointer;
  text-align: center;
`;

const MenuGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 48px;
`;

const LogoLabel = styled.a`
  font-size: ${theme.textSizes.heading.xl};
  font-weight: 700;
  color: ${theme.colors.cream[800]};
`;

const MenuLabel = styled.a<{ size: string; weight: number; color: string }>`
  font-size: ${theme.textSizes.body.md};
  font-weight: ${(props: { weight: number }) => props.weight};
  color: ${(props: { color: string }) => props.color};
`;

function NavBar() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const activeColor = theme.colors.cream[600];
  const inactiveColor = theme.colors.text.disabled;

  return (
    <StyledNav>
      <NavContainer>
        <LogoLabel href="/info">zzig.log</LogoLabel>
        <MenuGroup>
          {NAV_LINKS.map((link) => {
            const isActive = isMounted ? pathname.startsWith(link.href) : false;
            return (
              <MenuLabel
                key={link.title}
                href={link.href}
                size={theme.textSizes.body.lg}
                weight={isActive ? 500 : 400}
                color={isActive ? activeColor : inactiveColor}
              >
                {link.title}
              </MenuLabel>
            );
          })}
        </MenuGroup>
      </NavContainer>
    </StyledNav>
  );
}

export { NavBar };
