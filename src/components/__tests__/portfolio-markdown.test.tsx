import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import PortfolioMarkdownContent from '@/components/portfolio/PortfolioMarkdownContent';

const markdown = `# 프로젝트 제목

첫 번째 문단입니다.

두 번째 문단입니다.

- 상위 항목
  - 하위 항목

\`\`\`ts
const project = 'zzig.log';
\`\`\`

> 중요한 인용문

| 구분 | 내용 |
| --- | --- |
| 상태 | 완료 |

[프로젝트 링크](https://example.com)

![프로젝트 이미지](https://example.com/image.png)
`;

afterEach(() => {
  cleanup();
});

describe('PortfolioMarkdownContent', () => {
  it('renders the representative markdown structure', () => {
    const { container } = render(<PortfolioMarkdownContent content={markdown} />);

    expect(screen.getByRole('heading', { name: '프로젝트 제목', level: 1 })).toBeInTheDocument();
    expect(screen.getByText('첫 번째 문단입니다.').tagName).toBe('P');
    expect(screen.getByText('두 번째 문단입니다.').tagName).toBe('P');
    expect(container.querySelector('ul ul')).toHaveTextContent('하위 항목');
    expect(container.querySelector('pre code.language-ts')).toHaveTextContent("const project = 'zzig.log';");
    expect(container.querySelector('blockquote')).toHaveTextContent('중요한 인용문');
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '프로젝트 링크' })).toHaveAttribute('href', 'https://example.com');
    expect(screen.getByRole('img', { name: '프로젝트 이미지' })).toHaveAttribute('src', 'https://example.com/image.png');
  });

  it('wraps tables in a dedicated overflow container', () => {
    render(<PortfolioMarkdownContent content={markdown} />);

    expect(screen.getByRole('table').parentElement?.tagName).toBe('DIV');
  });
});
