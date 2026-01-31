'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if dark mode is stored
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = storedTheme === 'dark' || (storedTheme === null && prefersDark);

    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-8 right-8 z-[100] w-16 h-16 rounded-full bg-gradient-to-br from-foreground to-foreground/80 text-background shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
      aria-label="Toggle dark mode"
    >
      <div className="relative w-8 h-8 flex items-center justify-center">
        {/* Sun icon - visible in light mode */}
        <svg
          className={`absolute w-6 h-6 transition-all duration-300 ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
            }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m6.08 0l4.24-4.24M1 12h6m6 0h6m-4.22 7.78l4.24-4.24m-12.56 0l4.24 4.24M23 12a11 11 0 11-22 0 11 11 0 0122 0z" />
        </svg>

        {/* Moon icon - visible in dark mode */}
        <svg
          className={`absolute w-6 h-6 transition-all duration-300 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
            }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full mb-4 px-3 py-2 bg-background text-foreground text-xs font-semibold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg border border-border">
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </div>
    </button>
  );
}
