import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Loading from '@/components/common/Loading';
import PortfolioDetailModal from '@/components/portfolio/PortfolioDetailModal';
import { PortfolioDetail } from '@/types/portfolio';

const post: PortfolioDetail = {
  id: 'portfolio-id',
  title: '접근성 테스트 프로젝트',
  description: 'description',
  thumbnail: null,
  category: 'Frontend',
  tags: ['React'],
  githubUrl: null,
  webUrl: null,
  startDate: '2025-01-01',
  endDate: null,
  content: 'content',
};

afterEach(() => {
  cleanup();
});

describe('accessibility improvements', () => {
  it('exposes loading status semantics', () => {
    render(<Loading />);

    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
    expect(screen.getByText('로딩 중')).toBeInTheDocument();
  });

  it('applies dialog semantics and closes on Escape', () => {
    const onClose = vi.fn();

    render(<PortfolioDetailModal isOpen onClose={onClose} post={post} />);

    expect(screen.getByRole('dialog', { name: post.title })).toHaveAttribute('aria-modal', 'true');

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('traps focus within the modal', () => {
    render(<PortfolioDetailModal isOpen onClose={vi.fn()} post={post} />);

    const dialog = screen.getByRole('dialog', { name: post.title });
    const openPageLink = screen.getByRole('link', { name: '전체 페이지로 보기' });
    const focusableElements = Array.from(dialog.querySelectorAll<HTMLElement>('a[href], button'));
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    expect(openPageLink).toHaveFocus();

    lastFocusableElement.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(openPageLink).toHaveFocus();

    openPageLink.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(lastFocusableElement).toHaveFocus();
  });
});
