'use client';

import React from 'react';
import toolsData from '../../content/tools.json';
import { ToolEntry } from '../../lib/types';
import ToolCard from '../../components/docs/ToolCard';
import { Compass } from '../../components/ui/Icons';

export default function ToolsIndexPage() {
  const tools = toolsData as ToolEntry[];

  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
      {/* Page Hero */}
      <div className="border-b border-border-primary/50 pb-6 mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-text-primary tracking-wide mb-2 flex items-center gap-2">
          <Compass className="text-accent-gold" size={28} />
          Modding Tools Catalog
        </h1>
        <p className="text-text-secondary text-sm">
          A master directory of all required software, conflict resolution engines, and assets compilers needed to build The Ninth Path.
        </p>
      </div>

      {/* Intro info box */}
      <div className="p-4 bg-bg-secondary border border-border-primary rounded-lg text-xs text-text-secondary leading-relaxed mb-8 space-y-2">
        <strong className="text-text-primary font-serif uppercase tracking-wider block text-[10px] mb-1">
          Tool Registration Protocol:
        </strong>
        <p>
          Except for standalone system prep files (such as 7-Zip or VC++ redistributables), every tool listed below must be registered as an executable within **Mod Organizer 2** (MO2) to function correctly. 
        </p>
        <p>
          Running tools outside MO2's virtual filesystem will fail to read the active plugins list and will compile files in incorrect directories. Refer to each tool's notes for custom folders.
        </p>
      </div>

      {/* Cards List */}
      <div className="space-y-6">
        {tools.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </main>
  );
}
