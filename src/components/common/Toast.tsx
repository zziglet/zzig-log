'use client';

import { useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { theme } from '@/styles/theme';

const slideUp = keyframes`
  from {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
`;

const slideDown = keyframes`
  from {
    transform: translate(-50%, 0);
    opacity: 1;
  }
  to {
    transform: translate(-50%, 100%);
    opacity: 0;
  }
`;

const ToastWrapper = styled.div<{ isExiting: boolean }>`
  position: fixed;
  bottom: 32px;
  left: 50%;
  z-index: 9999;
  animation: ${({ isExiting }) => (isExiting ? slideDown : slideUp)} 0.3s ease forwards;
`;

const ToastContent = styled.div`
  padding: 12px 24px;
  border-radius: 12px;
  background-color: ${theme.colors.cream[800]};
  color: ${theme.colors.cream[50]};
  font-size: ${theme.textSizes.body.sm};
  font-weight: 500;
  white-space: nowrap;
  box-shadow: ${theme.effects.shadow};
`;

const TOAST_DURATION = 2000;
const EXIT_ANIMATION_DURATION = 300;

interface ToastState {
  visible: boolean;
  isExiting: boolean;
  message: string;
}

export function useToast() {
  const [state, setState] = useState<ToastState>({ visible: false, isExiting: false, message: '' });

  const showToast = useCallback((message: string) => {
    setState({ visible: true, isExiting: false, message });
  }, []);

  useEffect(() => {
    if (!state.visible || state.isExiting) return;

    const timer = setTimeout(() => {
      setState((prev) => ({ ...prev, isExiting: true }));
    }, TOAST_DURATION);

    return () => clearTimeout(timer);
  }, [state.visible, state.isExiting]);

  useEffect(() => {
    if (!state.isExiting) return;

    const timer = setTimeout(() => {
      setState({ visible: false, isExiting: false, message: '' });
    }, EXIT_ANIMATION_DURATION);

    return () => clearTimeout(timer);
  }, [state.isExiting]);

  const ToastUI = state.visible ? (
    <ToastWrapper isExiting={state.isExiting}>
      <ToastContent>{state.message}</ToastContent>
    </ToastWrapper>
  ) : null;

  return { showToast, ToastUI };
}
