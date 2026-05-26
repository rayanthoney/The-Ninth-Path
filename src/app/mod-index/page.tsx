'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import modsData from '../../content/mods.json';
import { ModEntry } from '../../lib/types';
import { Search, ExternalLink, ChevronRight } from '../../components/ui/Icons';

export default function ModIndexPage() {
  const mods = modsData as ModEntry[];
  
  // Use React Suspense boundary or standard client-side search parameter check
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPhase, setSelectedPhase] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');

  // Categories list
  const categories = useMemo(() => {
    const cats = new Set(mods.map(m => m.category));
    return ['All', ...Array.from(cats)].sort();
  }, [mods]);

  // Install Phases list
  const phases = useMemo(() => {
    const phs = new Set(mods.map(m => m.installPhase).filter((p): p is number => p !== null));
    return ['All', ...Array.from(phs).map(String).sort((a, b) => parseInt(a) - parseInt(b))];
  }, [mods]);

  // Tags list
  const tags = useMemo(() => {
    const tgs = new Set<string>();
    mods.forEach(m => m.tags?.forEach((t: string) => tgs.add(t)));
    return ['All', ...Array.from(tgs)].sort();
  }, [mods]);

  // Handle queries passed from global search input URL (e.g. ?search=USSEP)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('search');
      if (q) {
        setSearchQuery(q);
      }
    }
  }, []);

  // Filtered mods list
  const filteredMods = useMemo(() => {
    return mods.filter(mod => {
      const matchesSearch =
        mod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mod.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mod.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || mod.category === selectedCategory;
      const matchesPhase = selectedPhase === 'All' || String(mod.installPhase) === selectedPhase;
      const matchesTag = selectedTag === 'All' || mod.tags?.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesPhase && matchesTag;
    });
  }, [mods, searchQuery, selectedCategory, selectedPhase, selectedTag]);

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
      {/* Hero */}
      <div className="border-b border-border-primary/50 pb-6 mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-text-primary tracking-wide mb-2">
          Master Mod Index
        </h1>
        <p className="text-text-secondary text-sm">
          Browse, search, and filter all {mods.length} included mods in The Ninth Path build guide.
        </p>
      </div>

      {/* Filter Options */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Search Bar */}
        <div className="relative flex items-center bg-bg-secondary border border-border-primary rounded-lg px-3 py-2 md:col-span-1">
          <Search className="text-text-muted mr-2" size={16} />
          <input
            type="text"
            placeholder="Search by mod name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-text-primary placeholder-text-muted focus:outline-none"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold tracking-wider text-text-muted">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-bg-secondary border border-border-primary text-xs text-text-primary rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-accent-gold"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        {/* Phase Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold tracking-wider text-text-muted">Installation Phase</label>
          <select
            value={selectedPhase}
            onChange={(e) => setSelectedPhase(e.target.value)}
            className="bg-bg-secondary border border-border-primary text-xs text-text-primary rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-accent-gold"
          >
            {phases.map(p => <option key={p} value={p}>{p === 'All' ? 'All Phases' : `Phase ${p}`}</option>)}
          </select>
        </div>

        {/* Tag Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold tracking-wider text-text-muted">Mod Tags</label>
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="bg-bg-secondary border border-border-primary text-xs text-text-primary rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-accent-gold"
          >
            {tags.map(t => <option key={t} value={t}>{t === 'All' ? 'All Tags' : t}</option>)}
          </select>
        </div>
      </div>

      {/* Grid List */}
      {filteredMods.length === 0 ? (
        <div className="text-center py-16 text-sm text-text-muted border border-dashed border-border-primary rounded-lg">
          No mods found matching the selected filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMods.map(mod => (
            <div key={mod.id} className="p-4 rounded-lg bg-bg-secondary border border-border-primary flex flex-col justify-between gap-4 shadow-sm hover:border-accent-gold/50 transition-colors">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <h3 className="font-serif font-bold text-sm text-text-primary">{mod.name}</h3>
                  <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 bg-bg-tertiary text-text-muted rounded border border-border-primary/50">
                    {mod.category}
                  </span>
                </div>
                
                <div className="flex items-center gap-1.5 flex-wrap text-[10px] text-text-muted">
                  <span>File: <strong className="text-text-secondary">{mod.fileType}</strong></span>
                  {mod.versionPinned && <span>• v{mod.versionPinned}</span>}
                  <span>• {mod.required ? 'Required' : 'Optional'}</span>
                </div>

                {mod.tags && mod.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {mod.tags.map((t: string) => (
                      <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-accent-gold-muted/20 text-accent-gold border border-accent-gold/20 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between border-t border-border-primary/50 pt-3 text-[11px] font-medium">
                <Link
                  href={`/docs/install/part-${mod.installPhase}#${mod.id}`}
                  className="inline-flex items-center gap-1 text-accent-gold hover:text-accent-gold-hover transition-colors"
                >
                  View Setup Steps <ChevronRight size={12} />
                </Link>
                
                <a
                  href={mod.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-text-muted hover:text-text-primary transition-colors"
                >
                  Download {mod.sourceType} <ExternalLink size={10} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
