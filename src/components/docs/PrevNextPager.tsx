import React from 'react';
import Link from 'next/link';
import { GuidePage } from '../../lib/types';
import { ChevronLeft, ChevronRight } from '../ui/Icons';

interface PrevNextPagerProps {
  currentPage: GuidePage;
  allPages: GuidePage[];
}

export default function PrevNextPager({ currentPage, allPages }: PrevNextPagerProps) {
  const currentIndex = allPages.findIndex(p => p.id === currentPage.id);
  
  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  if (!prevPage && !nextPage) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mt-12 pt-6 border-t border-border-primary">
      {prevPage ? (
        <Link
          href={`/docs/${prevPage.slug}`}
          className="flex flex-col gap-1 text-left p-3 rounded-lg border border-border-primary hover:border-accent-gold hover:bg-bg-secondary transition-all group flex-1 max-w-[280px]"
        >
          <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted flex items-center gap-1 group-hover:text-accent-gold transition-colors">
            <ChevronLeft size={12} /> Previous Step
          </span>
          <span className="text-sm font-semibold text-text-primary group-hover:text-accent-gold transition-colors font-serif">
            {prevPage.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1 max-w-[280px]"></div>
      )}

      {nextPage ? (
        <Link
          href={`/docs/${nextPage.slug}`}
          className="flex flex-col gap-1 text-right p-3 rounded-lg border border-border-primary hover:border-accent-gold hover:bg-bg-secondary transition-all group flex-1 max-w-[280px] ml-auto"
        >
          <span className="text-[10px] uppercase font-bold tracking-wider text-text-muted flex items-center gap-1 justify-end ml-auto group-hover:text-accent-gold transition-colors">
            Next Step <ChevronRight size={12} />
          </span>
          <span className="text-sm font-semibold text-text-primary group-hover:text-accent-gold transition-colors font-serif">
            {nextPage.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1 max-w-[280px]"></div>
      )}
    </div>
  );
}
