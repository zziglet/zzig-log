'use client';

import styled from '@emotion/styled';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { MarkdownBody } from '@/styles/shared.styles';
import { theme } from '@/styles/theme';

const PortfolioMarkdownBody = styled(MarkdownBody)`
  width: 100%;
  min-width: 0;
  overflow-wrap: anywhere;

  pre {
    max-width: 100%;
    overflow-x: auto;
  }
`;

const TableScroll = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  margin-bottom: 16px;

  table {
    width: max-content;
    min-width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid ${theme.colors.cream[200]};
    padding: 8px 12px;
    text-align: left;
  }
`;

const markdownComponents: Components = {
  table: ({ node, ...props }) => {
    void node;

    return (
      <TableScroll>
        <table {...props} />
      </TableScroll>
    );
  },
};

interface PortfolioMarkdownContentProps {
  content: string;
}

export default function PortfolioMarkdownContent({ content }: PortfolioMarkdownContentProps) {
  return (
    <PortfolioMarkdownBody>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </PortfolioMarkdownBody>
  );
}
