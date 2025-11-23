import { css } from '@emotion/react';

const BREAKPOINT_MD = 1024; // Desktop breakpoint
const BREAKPOINT_SM = 768; // Tablet breakpoint

export const theme = {
  media: {
    // Mobile first: styles outside media queries are for mobile (<= 767px)
    // Tablet (768px <= screen <= 1023px)
    tablet: `@media (min-width: ${BREAKPOINT_SM}px) and (max-width: ${BREAKPOINT_MD - 1}px)`,
    // Desktop (screen >= 1024px)
    desktop: `@media (min-width: ${BREAKPOINT_MD}px)`,
    // Mobile (screen <= 767px)
    mobile: `@media (max-width: ${BREAKPOINT_SM - 1}px)`,
  },
  colors: {
    cream: {
      50: 'var(--cream_50)',
      100: 'var(--cream_100)',
      200: 'var(--cream_200)',
      300: 'var(--cream_300)',
      400: 'var(--cream_400)',
      500: 'var(--cream_500)',
      600: 'var(--cream_600)',
      700: 'var(--cream_700)',
      800: 'var(--cream_800)',
      900: 'var(--cream_900)',
      950: 'var(--cream_950)',
    },
    peach: {
      50: 'var(--peach_50)',
      100: 'var(--peach_100)',
      200: 'var(--peach_200)',
      300: 'var(--peach_300)',
      400: 'var(--peach_400)',
      500: 'var(--peach_500)',
      600: 'var(--peach_600)',
      700: 'var(--peach_700)',
      800: 'var(--peach_800)',
      900: 'var(--peach_900)',
      950: 'var(--peach_950)',
    },
    border: {
      light: 'var(--border--light)',
      medium: 'var(--border--medium)',
      heavy: 'var(--border--heavy)',
    },
    text: {
      disabled: 'var(--text--disabled)',
      body: 'var(--text--body)',
      title: 'var(--text--title)',
    },
    background: {
      base: 'var(--background--base)',
      layer1: 'var(--background--layer_1)',
      layer2: 'var(--background--layer_2)',
    },
    danger: {
      surface: 'var(--danger_surface)',
      border: 'var(--danger_border)',
      base: 'var(--danger_base)',
      text: 'var(--danger_text)',
    },
    success: {
      border: 'var(--success_border)',
      base: 'var(--success_base)',
      text: 'var(--success_text)',
    },
  },
  textSizes: {
    heading: {
      '7xl': 'var(--heading--7xl)',
      '5xl': 'var(--heading--5xl)',
      '4xl': 'var(--heading--4xl)',
      '3xl': 'var(--heading--3xl)',
      '2xl': 'var(--heading--2xl)',
      xl: 'var(--heading--xl)',
    },
    body: {
      '2xl': 'var(--body--2xl)',
      xl: 'var(--body--xl)',
      lg: 'var(--body--lg)',
      md: 'var(--body--md)',
      sm: 'var(--body--sm)',
      xs: 'var(--body--xs)',
    },
  },
  effects: {
    shadow: 'var(--shadow)',
  },
};

const columnBasis = (cols: number) => (cols / 12) * 100;

const generateColClasses = (prefix: string, totalCols: number) => {
  let styles = '';
  for (let i = 1; i <= totalCols; i++) {
    const width = columnBasis(i);
    styles += `
      .${prefix}-${i} {
        flex: 0 0 ${width}%;
        max-width: ${width}%;
      }
    `;
  }
  return styles;
};

export const gridGlobalStyles = css`
  /* Default Box Sizing */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Base Styles for all screen sizes (Mobile First) */
  [class^='col-'] {
    position: relative;
    width: 100%;
    /* Mobile-first default padding (will be overridden by media queries) */
    padding-right: 8px;
    padding-left: 8px;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    /* Mobile-first default margin (will be overridden by media queries) */
    margin-right: -8px;
    margin-left: -8px;
  }

  /* --- Mobile (Default/Base, max-width: 767px) --- */
  .container {
    width: 100%;
    max-width: 480px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 16px;
    padding-left: 16px;
  }

  /* Mobile-specific column classes (col-mobile-1 to col-mobile-4) */
  ${generateColClasses('col-mobile', 4)}

  /* --- Tablet (768px <= screen <= 1023px) --- */
  ${theme.media.tablet} {
    .container {
      max-width: 768px;
      padding-right: 24px;
      padding-left: 24px;
    }

    .row {
      margin-right: -12px;
      margin-left: -12px;
    }

    [class^='col-'] {
      padding-right: 12px;
      padding-left: 12px;
    }

    /* Tablet column classes (col-tablet-1 to col-tablet-6) */
    ${generateColClasses('col-tablet', 6)}
  }

  /* --- Desktop (screen >= 1024px) --- */
  ${theme.media.desktop} {
    .container {
      max-width: 1200px;
      padding-right: 40px;
      padding-left: 40px;
    }

    .row {
      margin-right: -12px;
      margin-left: -12px;
    }

    [class^='col-'] {
      padding-right: 12px;
      padding-left: 12px;
    }

    /* Desktop column classes (col-1 to col-12) */
    ${generateColClasses('col', 12)}
  }
`;

export type ThemeType = typeof theme;
