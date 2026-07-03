import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

/**
 * Îlot React : bascule le thème clair/sombre et le persiste dans localStorage.
 * L'anti-FOUC est géré par un script bloquant dans <head> (voir BaseLayout).
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme') as Theme;
    setTheme(current ?? 'dark');
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre'}
      title={theme === 'dark' ? 'Thème clair' : 'Thème sombre'}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}
