export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  thumbnail: string | null;
  date: string;
}

export interface BlogPostDetail extends BlogPost {
  content: string;
}

export const CATEGORIES = ['전체', '개발', '알고리즘', '회고'] as const;

export type CategoryType = (typeof CATEGORIES)[number];
