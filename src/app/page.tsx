import React from 'react';
import Link from 'next/link';
import { Compass, AlertTriangle, Cpu, HardDrive, Layers, Clock } from '../components/ui/Icons';

export default function Home() {
  const steps = [
    { num: 'I', title: 'Start Here & Preamble', desc: 'Read support boundaries, guide philosophy, and mindset expectations.', link: '/docs/start-here' },
    { num: 'II', title: 'Pre-Installation', desc: 'Prepare your base Steam folders, clean Skyrim, and install MO2.', link: '/docs/pre-installation' },
    { num: 'III', title: 'Common Tasks', desc: 'Familiarize yourself with BSA extraction, xEdit cleaning, and CAO settings.', link: '/docs/common-tasks' },
    { num: 'IV', title: 'Mod Installation', desc: 'Install 1,200+ selected mods in sequenced phases (beginning with Part 1).', link: '/docs/install-part-1' },
    { num: 'V', title: 'Merge & Patch', desc: 'Run zMerge conflict resolution and conflict edits in xEdit.', link: '/docs/merge-patch' },
    { num: 'VI', title: 'LODs & MCM Setup', desc: 'Bake TexGen/DynDOLOD horizons and configure in-game menu preferences.', link: '/docs/finishing-line' }
  ];

  return (
    <main className="flex-1 bg-bg-primary">
      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32 text-center max-w-4xl mx-auto border-b border-border-primary/50">
        <div className="flex justify-center mb-6">
          <Compass className="text-accent-gold animate-spin-slow" size={64} />
        </div>
        <h1 className="font-serif text-4xl md:text-6xl font-extrabold tracking-wider text-text-primary mb-4 leading-tight">
          THE NINTH PATH
        </h1>
        <p className="font-serif italic text-sm md:text-base text-accent-gold uppercase tracking-widest mb-6">
          "Eight paths were walked by mortals. The ninth was forged by man becoming god."
        </p>
        <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          A lore-heavy, spiritually charged Skyrim SE/AE modlist built around high-stakes choices, fate-bending consequences, and the silent war between divinity and mortality.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/docs/start-here"
            className="w-full sm:w-auto px-8 py-3.5 rounded bg-accent-gold text-bg-primary hover:bg-accent-gold-hover transition-colors font-semibold uppercase tracking-wider text-xs shadow-md"
          >
            Begin Pre-Installation
          </Link>
          <a
            href="https://loadorderlibrary.com/lists/lexys-lotd-a-skyrim-modding-guide"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 rounded border border-border-primary text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-all font-semibold uppercase tracking-wider text-xs"
          >
            View Load Order
          </a>
        </div>
      </section>

      {/* Build Info Strip */}
      <section className="bg-bg-secondary border-b border-border-primary/50 py-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-border-primary/50">
          <div className="p-2">
            <span className="block text-[10px] uppercase font-bold tracking-wider text-text-muted mb-1">List Version</span>
            <span className="font-serif text-sm font-bold text-accent-gold">v1.0.0 (Beta 0.1.1.9)</span>
          </div>
          <div className="p-2 pt-6 md:pt-2">
            <span className="block text-[10px] uppercase font-bold tracking-wider text-text-muted mb-1">Game Version</span>
            <span className="font-serif text-sm font-bold text-text-primary">Skyrim SE 1.6.1170</span>
          </div>
          <div className="p-2 pt-6 md:pt-2">
            <span className="block text-[10px] uppercase font-bold tracking-wider text-text-muted mb-1">Complexity</span>
            <span className="font-serif text-sm font-bold text-text-primary">Intermediate-Advanced</span>
          </div>
          <div className="p-2 pt-6 md:pt-2">
            <span className="block text-[10px] uppercase font-bold tracking-wider text-text-muted mb-1">Estimated Setup</span>
            <span className="font-serif text-sm font-bold text-text-primary flex items-center justify-center gap-1">
              <Clock size={14} className="text-accent-gold" /> 10 - 15 Hours
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Core Scope & Complexity Warnings */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-text-primary">
              The Scope of The Ninth Path
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              Modding a game to over 1,200 active entries changes it entirely. This list merges the legendary stability and contents of the Lexy's LOTD build with unique custom-scripted story arcs, custom player homes (like Mörskom Estate, Riverside Lodge, and Dovahkiin's Vault), and refined survival dynamics.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              The goal of this guide is to lead you from a raw base Skyrim folder all the way to a completely patched, conflict-resolved, LOD-baked installation with 100% stability.
            </p>
          </div>

          {/* Hard Warning */}
          <div className="p-4 rounded-lg bg-red-950/20 border-l-4 border-red-500/80 flex gap-3 text-sm text-text-primary">
            <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="font-serif font-bold text-red-400 mb-1 uppercase tracking-wider text-xs">CRITICAL INSTRUCTION</h4>
              <p className="text-text-secondary text-xs leading-relaxed">
                Do not deviate from the mod order, versions, or FOMOD instructions detailed in this guide. Do not add additional plugins, update mods mid-setup, or skip cleaning filters. Doing so will break plugin dependencies and corrupt script save states.
              </p>
            </div>
          </div>

          {/* System Requirements */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2">
              <Cpu className="text-accent-gold" size={20} />
              <h3 className="font-serif text-lg font-bold text-text-primary">
                System Requirements
              </h3>
            </div>
            <div className="overflow-x-auto rounded border border-border-primary">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-bg-secondary text-text-primary border-b border-border-primary">
                    <th className="p-3 font-semibold">Component</th>
                    <th className="p-3 font-semibold">Minimum Specs</th>
                    <th className="p-3 font-semibold">Recommended Specs</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary divide-y divide-border-primary/50">
                  <tr>
                    <td className="p-3 font-semibold text-text-primary">Processor (CPU)</td>
                    <td className="p-3">Intel i5-9400 / AMD Ryzen 5 2600</td>
                    <td className="p-3">Intel i5-13400 / AMD Ryzen 5 5600x</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-text-primary">Graphics (GPU)</td>
                    <td className="p-3">NVIDIA GTX 1060 / AMD RX 580</td>
                    <td className="p-3">NVIDIA RTX 3060 TI / AMD RX 6700</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-text-primary">Memory (RAM)</td>
                    <td className="p-3">16 GB DDR3</td>
                    <td className="p-3">32 GB DDR4</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-text-primary">Storage (SSD)</td>
                    <td className="p-3 flex items-center gap-1"><HardDrive size={12} /> SATA SSD (150GB+ free space)</td>
                    <td className="p-3"><span className="flex items-center gap-1"><HardDrive size={12} /> NVMe M.2 SSD (200GB+ free space)</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Timeline Path Overview */}
        <div className="space-y-6 bg-bg-secondary p-6 rounded-lg border border-border-primary self-start">
          <div className="flex items-center gap-2 border-b border-border-primary/50 pb-3 mb-4">
            <Layers className="text-accent-gold" size={18} />
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-text-primary">
              The Path Chronology
            </h3>
          </div>
          <ol className="relative border-l border-border-primary/80 pl-4 space-y-6 text-xs">
            {steps.map((step, idx) => (
              <li key={idx} className="relative group">
                <span className="absolute -left-[25px] top-0 bg-bg-tertiary border border-border-primary text-accent-gold text-[9px] font-bold rounded-full w-5 h-5 flex items-center justify-center font-serif">
                  {step.num}
                </span>
                <div className="space-y-1">
                  <Link href={step.link} className="font-serif font-bold text-text-primary hover:text-accent-gold transition-colors block text-sm">
                    {step.title}
                  </Link>
                  <p className="text-text-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
