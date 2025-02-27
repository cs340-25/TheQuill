// @/constants/Colors.ts

type ThemeName = 'light' | 'dark';

interface ThemeColors {
  text: string;
  background: string;
  tint: string;
}

export const Colors: Record<ThemeName, ThemeColors> = {
  light: {
    text: '#333333',
    background: '#FAF9F6',
    tint: '#8B4513',
  },
  dark: {
    text: '#FFFFFF',
    background: '#333333',
    tint: '#8B4513',
  },
};
