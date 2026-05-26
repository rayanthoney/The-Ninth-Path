import React from 'react';
import Link from 'next/link';
import { ChevronRight } from '../ui/Icons';

interface BreadcrumbsProps {
  section?: string;
  title: string;
}

export default function Breadcrumbs({ section, title }: BreadcrumbsProps) {
  const getSectionLabel = (sec: string) => {
    switch (sec) {
      case 'start':
        return 'Start Here';
      case 'preinstall':
        return 'Pre-Installation';
      case 'common-tasks':
        return 'Common Tasks';
      case 'install':
        return 'Install Phase';
      case 'merge-patch':
        return 'Merge & Patch';
      case 'mcm':
        return 'MCM Setup';
      case 'finishing':
        return 'Finishing Line';
      case 'appendix':
        return 'Appendix';
      case 'faq':
        return 'FAQ';
      default:
        return sec;
    }
  };

  return (
    <nav className="flex items-center gap-1.5 text-xs text-text-muted mb-4 font-medium" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-accent-gold transition-colors">
        Home
      </Link>
      
      {section && section !== 'home' && (
        <>
          <ChevronRight size={12} className="text-text-muted/60" />
          <span className="capitalize">{getSectionLabel(section)}</span>
        </>
      )}

      <ChevronRight size={12} className="text-text-muted/60" />
      <span className="text-text-secondary truncate font-semibold" aria-current="page">
        {title}
      </span>
    </nav>
  );
}
