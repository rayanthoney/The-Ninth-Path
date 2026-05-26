'use client';

import React, { useState } from 'react';
import { ModEntry } from '../../lib/types';
import { ExternalLink, Check, Info, AlertTriangle } from '../ui/Icons';

interface ModCardProps {
  mod: ModEntry;
}

export default function ModCard({ mod }: ModCardProps) {
  const [isOpen, setIsOpen] = useState(true);

  const getSourceBadgeColor = (source: string) => {
    switch (source) {
      case 'Nexus':
        return 'bg-amber-900/40 text-amber-300 border-amber-800/60';
      case 'GitHub':
        return 'bg-slate-800/40 text-slate-300 border-slate-700/60';
      default:
        return 'bg-blue-900/40 text-blue-300 border-blue-800/60';
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'Main':
        return 'bg-emerald-950/40 text-emerald-400 border-emerald-900/60';
      case 'Update':
        return 'bg-blue-950/40 text-blue-400 border-blue-900/60';
      case 'Optional':
        return 'bg-amber-950/40 text-amber-400 border-amber-900/60';
      default:
        return 'bg-purple-950/40 text-purple-400 border-purple-900/60';
    }
  };

  return (
    <div id={mod.id} className="my-6 rounded-lg border border-border-primary bg-bg-secondary overflow-hidden shadow-md hover:shadow-lg transition-all duration-150 scroll-mt-20">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-bg-tertiary border-b border-border-primary">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-serif font-bold text-base text-text-primary">
            {mod.name}
          </h4>
          <span className={`text-[11px] px-2 py-0.5 rounded-full border ${getSourceBadgeColor(mod.sourceType)}`}>
            {mod.sourceType}
          </span>
          <span className={`text-[11px] px-2 py-0.5 rounded-full border ${getFileTypeColor(mod.fileType)}`}>
            {mod.fileType} File
          </span>
          {mod.versionPinned && (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-bg-primary border border-border-primary text-text-secondary">
              v{mod.versionPinned}
            </span>
          )}
          {mod.required ? (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-red-950/30 text-red-400 border border-red-900/50">
              Required
            </span>
          ) : (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-800/40 text-gray-400 border border-gray-700/50">
              Optional
            </span>
          )}
        </div>
        
        <a
          href={mod.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-accent-gold hover:text-accent-gold-hover transition-colors font-medium"
        >
          Download <ExternalLink size={12} />
        </a>
      </div>

      {/* Body Area */}
      <div className="p-4 space-y-4">
        {/* Tags */}
        {mod.tags && mod.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {mod.tags.map(tag => (
              <span key={tag} className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 bg-bg-primary text-text-muted rounded border border-border-primary/50">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* FOMOD Instructions */}
        {mod.fomodInstructions && mod.fomodInstructions.length > 0 && (
          <div className="rounded border border-border-primary bg-bg-primary overflow-hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center justify-between px-3 py-2 bg-bg-secondary text-xs font-semibold uppercase tracking-wider text-text-secondary border-b border-border-primary hover:text-accent-gold transition-colors"
            >
              <span>FOMOD Setup Instructions</span>
              <span className="text-[10px] text-text-muted">{isOpen ? 'COLLAPSE ▲' : 'EXPAND ▼'}</span>
            </button>
            {isOpen && (
              <ul className="p-3 space-y-2 text-xs divide-y divide-border-primary/30">
                {mod.fomodInstructions.map((instruction, idx) => (
                  <li key={idx} className="flex gap-2 items-start pt-2 first:pt-0">
                    <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-text-secondary leading-relaxed">{instruction}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Special Instructions */}
        {mod.specialInstructions && mod.specialInstructions.length > 0 && (
          <div className="p-3 bg-accent-gold-muted/40 rounded border border-accent-gold/20 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-accent-gold">
              <AlertTriangle size={14} />
              <span>Special Install/Setup Steps:</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs text-text-secondary">
              {mod.specialInstructions.map((step, idx) => (
                <li key={idx} className="leading-relaxed">{step}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
