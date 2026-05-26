'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { GuidePage, ModEntry, ToolEntry } from '../../lib/types';
import { performSearch, SearchResult } from '../../lib/search';
import { Search, X } from '../ui/Icons';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  guides: GuidePage[];
  mods: ModEntry[];
  tools: ToolEntry[];
}

export default function SearchModal({ isOpen, onClose, guides, mods, tools }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Keyboard navigation inside modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          router.push(results[selectedIndex].url);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, router]);

  // Search execution
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim()) {
      const searchHits = performSearch(val, guides, mods, tools);
      setResults(searchHits);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  };

  const handleResultClick = (url: string) => {
    router.push(url);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[15vh] px-4">
      <div
        ref={modalRef}
        className="w-full max-w-xl bg-bg-secondary border border-border-primary rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[60vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Search Input Area */}
        <div className="relative flex items-center border-b border-border-primary bg-bg-tertiary px-4 py-3">
          <Search className="text-text-muted shrink-0 mr-3" size={18} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search guides, mods, tools, and warnings..."
            value={query}
            onChange={handleSearchChange}
            className="w-full bg-transparent text-sm text-text-primary placeholder-text-muted focus:outline-none"
            aria-label="Search box"
          />
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors focus:outline-none"
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-xs text-text-muted">
              Type to search mods, tools, or installation chapters.
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-xs text-text-muted">
              No results found matching "{query}".
            </div>
          ) : (
            <ul className="space-y-1 pl-0">
              {results.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                const badgeColor =
                  item.type === 'guide'
                    ? 'bg-amber-950/30 text-amber-400 border-amber-900/50'
                    : item.type === 'mod'
                    ? 'bg-emerald-950/30 text-emerald-400 border-emerald-900/50'
                    : 'bg-blue-950/30 text-blue-400 border-blue-900/50';

                return (
                  <li key={item.id + item.type}>
                    <button
                      onClick={() => handleResultClick(item.url)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full text-left p-3 rounded-md flex items-center justify-between gap-4 transition-all duration-100 ${
                        isSelected
                          ? 'bg-accent-gold-muted/30 border border-accent-gold/30'
                          : 'border border-transparent'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="font-serif text-sm font-semibold text-text-primary">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-text-muted truncate mt-0.5">
                          {item.description}
                        </div>
                      </div>
                      <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border shrink-0 ${badgeColor}`}>
                        {item.type}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="bg-bg-tertiary border-t border-border-primary px-4 py-2 flex justify-between text-[10px] text-text-muted">
          <span>
            Use <kbd className="bg-bg-primary px-1 rounded border border-border-primary">↑↓</kbd> to navigate,{' '}
            <kbd className="bg-bg-primary px-1 rounded border border-border-primary">Enter</kbd> to select
          </span>
          <span>
            <kbd className="bg-bg-primary px-1 rounded border border-border-primary">ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
