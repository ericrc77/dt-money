export const theme = {
  colors: {
    white: '#ffffff',

    gray100: '#e1e1e6',
    gray200: '#c4c4cc',
    gray300: '#a9a9b2',
    gray400: '#8d8d99',
    gray500: '#7c7c8a',
    gray600: '#323238',
    gray700: '#29292e',
    gray800: '#202024',
    gray850: '#18181b',
    gray900: '#121214',

    green300: '#00b37e',
    green500: '#00875f',
    green700: '#015f43',

    red300: '#f75a68',
    red500: '#ab222e',
    red700: '#7a1921',

    blue300: '#60a5fa',
    blue500: '#2563eb',
    yellow500: '#f59e0b',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 28,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
} as const

export type AppTheme = typeof theme
