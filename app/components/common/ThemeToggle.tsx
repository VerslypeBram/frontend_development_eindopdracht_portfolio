'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted || !resolvedTheme) {
    return (
      <button className="p-2.5 rounded-full border border-neutral-200 text-transparent dark:border-neutral-800 transition-all" aria-label="Placeholder for Theme Toggle" disabled>
        <Moon size={22} strokeWidth={1.5} />
      </button>
    );
  }

  const currentTheme = theme === 'system' ? resolvedTheme : theme;

  return (
    <button onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')} className="p-2.5 rounded-full border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:border-neutral-300 dark:border-neutral-800 dark:text-neutral-300 dark:hover:text-white dark:hover:border-neutral-600 transition-all" aria-label="Toggle Dark Mode">
      {currentTheme === 'dark' ? <Sun size={22} strokeWidth={1.5} /> : <Moon size={22} strokeWidth={1.5} />}
    </button>
  );
}
