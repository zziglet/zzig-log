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
