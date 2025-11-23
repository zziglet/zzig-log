'use client';

import styled from '@emotion/styled';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { theme } from '@/styles/theme';
import { NAV_LINKS } from '@/constants/nav';

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
  background-color: ${theme.colors.background.base};
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  text-align: center;
`;

const MenuGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 48px;
`;

const LogoLabel = styled(Link)`
  font-size: ${theme.textSizes.heading.xl};
  font-weight: 700;
  color: ${theme.colors.cream[800]};
  text-decoration: none;
  cursor: pointer;
`;

const MenuLabel = styled(Link, {
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<{ $weight: number; $color: string }>`
  font-size: ${theme.textSizes.body.md};
  font-weight: ${(props) => props.$weight};
  color: ${(props) => props.$color};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.cream[500]};
  }
`;

function NavBar() {
  const pathname = usePathname();

  const activeColor = theme.colors.cream[600];
  const inactiveColor = theme.colors.text.disabled;

  const checkIsActive = (linkHref: string): boolean => {
    if (linkHref === '/') {
      return pathname === linkHref;
    }

    return pathname === linkHref || pathname.startsWith(`${linkHref}/`);
  };

  return (
    <StyledNav>
      <NavContainer>
        <LogoLabel href="/">zzig.log</LogoLabel>
        <MenuGroup>
          {NAV_LINKS.map((link) => {
            const isActive = checkIsActive(link.href);

            return (
              <MenuLabel
                key={link.title}
                href={link.href}
                $weight={isActive ? 500 : 400}
                $color={isActive ? activeColor : inactiveColor}
                aria-current={isActive ? 'page' : undefined}
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
