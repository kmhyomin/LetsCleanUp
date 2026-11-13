export const theme = {
  color: {
    primary: '#16a34a',
    primaryDark: '#15803d',
    primarySoft: '#dcfce7',
    accent: '#0ea5e9',
    warning: '#f59e0b',
    danger: '#ef4444',
    text: '#1f2937',
    textSub: '#6b7280',
    border: '#e5e7eb',
    bg: '#f6faf7',
    surface: '#ffffff',
  },
  radius: {
    sm: '8px',
    md: '14px',
    lg: '20px',
  },
  shadow: '0 6px 20px rgba(22, 101, 52, 0.08)',
  media: {
    mobile: '@media (max-width: 720px)',
  },
} as const;

export type AppTheme = typeof theme;
