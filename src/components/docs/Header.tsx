'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '../ui/ThemeToggle';
import SearchModal from './SearchModal';
import { GuidePage, ModEntry, ToolEntry } from '../../lib/types';
import { Search, Compass } from '../ui/Icons';

interface HeaderProps {
  guides: GuidePage[];
  mods: ModEntry[];
  tools: ToolEntry[];
}

export default function Header({ guides, mods, tools }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  // Handle Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Start Here', href: '/docs/start-here' },
    { label: 'Mod Index', href: '/mod-index' },
    { label: 'Tools', href: '/tools' },
    { label: 'Changelog', href: '/docs/changelog' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-bg-secondary/95 backdrop-blur-md border-b border-border-primary/80 transition-colors duration-150">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group focus:outline-none">
            <Compass className="text-accent-gold group-hover:rotate-45 transition-transform duration-300" size={24} />
            <span className="font-serif text-lg font-bold tracking-wider text-text-primary group-hover:text-accent-gold transition-colors">
              THE NINTH PATH
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map(link => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors duration-150 ${
                    isActive ? 'text-accent-gold' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Row */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="inline-flex items-center justify-between gap-3 text-xs text-text-muted hover:text-text-primary px-3 py-1.5 rounded-lg bg-bg-primary border border-border-primary hover:border-accent-gold transition-all duration-150 focus:outline-none focus:ring-1 focus:ring-accent-gold w-32 md:w-44 text-left"
              title="Search guides and mods (Cmd+K)"
            >
              <span className="flex items-center gap-1.5">
                <Search size={14} /> Search...
              </span>
              <kbd className="hidden sm:inline-block text-[9px] bg-bg-secondary px-1.5 py-0.5 rounded border border-border-primary">
                ⌘K
              </kbd>
            </button>

            <ThemeToggle />
          </div>
        </div>
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        guides={guides}
        mods={mods}
        tools={tools}
      />
    </>
  );
}
