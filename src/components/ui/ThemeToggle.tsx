'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from './Icons';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark'); // default to dark

  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.className = savedTheme;
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      document.documentElement.className = initialTheme;
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.className = nextTheme;
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-bg-secondary border border-border-primary hover:text-accent-gold transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-accent-gold"
      aria-label="Toggle dark/light theme"
      title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
