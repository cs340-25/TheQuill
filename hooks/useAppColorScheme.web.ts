import { useEffect, useState } from 'react';

/**
 * Web-specific version of the color scheme hook.
 * Always returns 'light' or 'dark' (no direct use of React Native).
 */
export function useAppColorScheme(): 'light' | 'dark' {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // If you want, detect user preference with CSS media queries:
    // e.g., matchMedia('(prefers-color-scheme: dark)')
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setMode(mediaQuery.matches ? 'dark' : 'light');

    handler(); // Set initial value
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return mode;
}
