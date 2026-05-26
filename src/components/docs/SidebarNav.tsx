'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GuidePage } from '../../lib/types';
import { BookOpen } from '../ui/Icons';

interface SidebarNavProps {
  allPages: GuidePage[];
}

export default function SidebarNav({ allPages }: SidebarNavProps) {
  const pathname = usePathname();

  // Group pages by section type to create clean navigation blocks
  const sections = [
    {
      title: 'Introduction',
      pages: allPages.filter(p => p.section === 'start' || p.section === 'preinstall' || p.section === 'common-tasks')
    },
    {
      title: 'Mod Installation',
      pages: allPages.filter(p => p.section === 'install')
    },
    {
      title: 'Integration & Testing',
      pages: allPages.filter(p => p.section === 'merge-patch' || p.section === 'finishing' || p.section === 'mcm')
    },
    {
      title: 'Reference & Updates',
      pages: allPages.filter(p => p.section === 'appendix' || p.section === 'faq' || p.section === 'changelog')
    }
  ];

  return (
    <aside className="w-full md:w-64 shrink-0 md:sticky md:top-24 md:self-start md:max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 border-b md:border-b-0 md:border-r border-border-primary/50 pb-6 md:pb-0">
      <div className="flex items-center gap-2 mb-6 hidden md:flex">
        <BookOpen size={18} className="text-accent-gold" />
        <span className="font-serif text-sm font-bold tracking-wider text-text-primary uppercase">
          Build Chronology
        </span>
      </div>
      <nav className="space-y-6">
        {sections.map(section => {
          if (section.pages.length === 0) return null;
          return (
            <div key={section.title} className="space-y-2">
              <h5 className="text-[10px] uppercase font-bold tracking-wider text-text-muted">
                {section.title}
              </h5>
              <ul className="space-y-1 pl-0 text-xs">
                {section.pages.map(page => {
                  const url = `/docs/${page.slug}`;
                  const isActive = pathname === url;
                  return (
                    <li key={page.id}>
                      <Link
                        href={url}
                        className={`group flex items-center justify-between py-1.5 px-2 rounded-md transition-all duration-150 ${
                          isActive
                            ? 'bg-accent-gold-muted text-accent-gold font-semibold'
                            : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                        }`}
                      >
                        <span className="truncate">{page.title}</span>
                        {page.estimatedTime && (
                          <span className="text-[9px] text-text-muted font-normal shrink-0 pl-2 group-hover:text-text-secondary transition-colors">
                            {page.estimatedTime}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
