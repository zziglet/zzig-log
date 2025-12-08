'use client';

import { useEffect } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { theme } from '@/styles/theme';
import { NAV_LINKS } from '@/constants/nav';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenuOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1050;

  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? 'visible' : 'hidden')};
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenuContent = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 70%;
  max-width: 300px;
  background-color: ${theme.colors.background.base};
  padding: 100px 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 32px;
  box-shadow: -4px 0 16px rgba(0, 0, 0, 0.1);

  transform: translateX(${(props) => (props.$isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
`;

const MobileMenuItem = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  font-size: ${theme.textSizes.heading.xl};
  font-weight: ${(props) => (props.isActive ? 700 : 400)};
  color: ${(props) => (props.isActive ? theme.colors.cream[600] : theme.colors.text.disabled)};
  text-decoration: none;
`;

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const checkIsActive = (linkHref: string): boolean => {
    if (linkHref === '/') return pathname === linkHref;
    return pathname === linkHref || pathname.startsWith(`${linkHref}/`);
  };

  return (
    <MobileMenuOverlay $isOpen={isOpen} onClick={onClose}>
      <MobileMenuContent $isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        {NAV_LINKS.map((link) => (
          <MobileMenuItem key={link.title} href={link.href} isActive={checkIsActive(link.href)} onClick={onClose}>
            {link.title}
          </MobileMenuItem>
        ))}
      </MobileMenuContent>
    </MobileMenuOverlay>
  );
}
