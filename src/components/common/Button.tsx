'use client';

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { theme } from '@/styles/theme';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonColor = 'primary_fill' | 'secondary' | 'primary_line';

export interface CustomButtonSize {
  width?: number;
  height?: number;
  font?: number;
}

const sizeStyles = (size: ButtonSize, customSize: CustomButtonSize | undefined) => {
  if (customSize) {
    return css`
      width: ${customSize.width ?? 150}px;
      height: ${customSize.height ?? 35}px;
      font-size: ${customSize.font ?? 13}px;
    `;
  }

  switch (size) {
    case 'sm':
      return css`
        font-size: ${theme.textSizes.body.lg};
        font-weight: 400;
        width: 100px;
        height: 40px;
        border-radius: 12px;
      `;
    case 'md':
      return css`
        font-size: ${theme.textSizes.body.xs};
        font-weight: 500;
        width: 128px;
        height: 48px;
        border-radius: 16px;
      `;
    case 'lg':
      return css`
        font-size: ${theme.textSizes.body.sm};
        font-weight: 500;
        width: 164px;
        height: 52px;
        border-radius: 16px;
      `;
  }
};

const colorStyles = (color: ButtonColor) => {
  switch (color) {
    case 'primary_fill':
      return css`
        background: ${theme.colors.cream[100]};
        color: ${theme.colors.cream[700]};
        border: 1px solid ${theme.colors.cream[200]};

        &:hover:not(:disabled) {
          background: ${theme.colors.cream[200]};
        }
      `;

    case 'secondary':
      return css`
        background: ${theme.colors.peach[100]};
        color: ${theme.colors.peach[700]};
        border: 1px solid ${theme.colors.peach[200]};

        &:hover:not(:disabled) {
          background: ${theme.colors.peach[200]};
        }
      `;

    case 'primary_line':
      return css`
        background: ${theme.colors.background.base};
        color: ${theme.colors.cream[700]};
        border: 1px solid ${theme.colors.cream[200]};

        &:hover:not(:disabled) {
          background: ${theme.colors.background.layer2};
        }
      `;
  }
};

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  cursor: pointer;
  padding: 0 14px;
  font-family: var(--font-suit);

  ${({ size = 'md', customSize }) => sizeStyles(size, customSize)}
  ${({ color = 'primary_fill' }) => colorStyles(color)}
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  customSize?: CustomButtonSize;
  color?: ButtonColor;
}

function Button(props: ButtonProps) {
  return <StyledButton {...props} />;
}

export default Button;
