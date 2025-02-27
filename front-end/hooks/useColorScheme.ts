// hooks/useAppColorScheme.web.ts
import { useEffect, useState } from 'react';

/**
 * Web-specific version of the color scheme hook.
 * We avoid importing from 'react-native' here because
 * that API might not exist for the web bundler in your version.
 */
export function useAppColorScheme(): 'light' | 'dark' {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Optionally detect user preference with a media query:
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateMode = () => setMode(mediaQuery.matches ? 'dark' : 'light');

    // Set initial mode
    updateMode();

    // Listen for changes
    mediaQuery.addEventListener('change', updateMode);

    // Cleanup
    return () => mediaQuery.removeEventListener('change', updateMode);
  }, []);

  return mode;
}
