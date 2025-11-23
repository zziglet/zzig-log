export interface FooterLink {
  title: string;
  href: string;
}

export interface FooterLinkGroup {
  groupTitle: string;
  links: FooterLink[];
}

export const FOOTER_LINKS: FooterLinkGroup[] = [
  {
    groupTitle: 'SNS',
    links: [
      {
        title: 'Github',
        href: 'https://github.com/zziglet',
      },
      {
        title: 'LinkedIn',
        href: 'https://www.linkedin.com/in/jiwon-jeong-b6131a388',
      },
      {
        title: 'Instagram',
        href: 'https://www.instagram.com/zziglet',
      },
    ],
  },
  {
    groupTitle: '연락처',
    links: [
      {
        title: 'Email',
        href: 'mailto:zziglet0403@gmail.com',
      },
      {
        title: 'Phone',
        href: 'tel:+82-10-2370-1973',
      },
    ],
  },
];

export const GITHUB_LINK = 'https://github.com/zziglet/zzig-log';
