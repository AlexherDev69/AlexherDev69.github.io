import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

/**
 * Îlot React : bascule le thème Innie (sombre) / Outie (clair) et le persiste.
 * L'anti-FOUC est géré par un script bloquant dans <head> (voir BaseLayout).
 * Le libellé affiche le mode courant : sombre = Innie, clair = Outie.
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
      aria-label={theme === 'dark' ? 'Passer en mode Outie (clair)' : 'Passer en mode Innie (sombre)'}
      title={theme === 'dark' ? 'Mode Innie' : 'Mode Outie'}
    >
      {theme === 'dark' ? 'Innie' : 'Outie'}
    </button>
  );
}
