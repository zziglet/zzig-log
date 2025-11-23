export interface PortfolioPost {
  id: string;
  title: string;
  description: string;
  thumbnail: string | null;
  category: string;
  tags: string[];
  githubUrl: string | null;
  webUrl: string | null;
  startDate: string;
  endDate: string | null;
}

export interface PortfolioDetail extends PortfolioPost {
  content: string;
}
