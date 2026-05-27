'use client';

import React, { useEffect, useState } from 'react';

interface OnPageTOCProps {
  content: string;
}

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export default function OnPageTOC({ content }: OnPageTOCProps) {
  const [activeId, setActiveId] = useState<string>('');
  const headings = React.useMemo(() => {
    // Parse h2 and h3 elements from markdown content
    const lines = content.split('\n');
    const headingItems: HeadingItem[] = [];

    lines.forEach(line => {
      const h2Match = line.match(/^##\s+(.+)$/);
      const h3Match = line.match(/^###\s+(.+)$/);

      if (h2Match) {
        const text = h2Match[1].replace(/<[^>]*>/g, '').trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        headingItems.push({ id, text, level: 2 });
      } else if (h3Match) {
        const text = h3Match[1].replace(/<[^>]*>/g, '').trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        headingItems.push({ id, text, level: 3 });
      }
    });

    return headingItems;
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    // Scroll spy logic
    const handleScroll = () => {
      const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
      
      let currentActiveId = '';
      const scrollPosition = window.scrollY + 100; // Offset for header

      for (let i = 0; i < headingElements.length; i++) {
        const el = headingElements[i];
        if (el.offsetTop <= scrollPosition) {
          currentActiveId = el.id;
        } else if (i === 0) {
          // If above the first heading
          currentActiveId = '';
        }
      }

      setActiveId(currentActiveId || (headings[0] ? headings[0].id : ''));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run initially

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden lg:block w-64 shrink-0 sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
      <h5 className="font-serif text-xs font-bold uppercase tracking-wider text-text-primary mb-3">
        On This Page
      </h5>
      <nav className="space-y-2 border-l border-border-primary/50 pl-4 py-1 text-xs">
        {headings.map(h => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={`block leading-relaxed transition-colors duration-150 ${
              h.level === 3 ? 'pl-4 font-normal' : 'font-medium'
            } ${
              activeId === h.id
                ? 'text-accent-gold border-l-2 border-accent-gold -ml-[17px] pl-[15px]'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            {h.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
