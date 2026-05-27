'use client';

import React, { useState, useEffect } from 'react';
import { Check } from '../ui/Icons';

interface ChecklistBlockProps {
  id: string;
  title: string;
  items: string[];
}

export default function ChecklistBlock({ id, title, items }: ChecklistBlockProps) {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Load saved checklist state from localStorage
    const saved = localStorage.getItem(`checklist_${id}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTimeout(() => {
          setCheckedItems(parsed);
        }, 0);
      } catch {
        // ignore parsing errors
      }
    }
  }, [id]);

  const handleToggle = (index: number) => {
    const nextState = {
      ...checkedItems,
      [index]: !checkedItems[index]
    };
    setCheckedItems(nextState);
    localStorage.setItem(`checklist_${id}`, JSON.stringify(nextState));
  };

  const total = items.length;
  const completed = Object.values(checkedItems).filter(Boolean).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="my-6 rounded-lg border border-border-primary bg-bg-secondary p-4 shadow-sm">
      <div className="flex justify-between items-center gap-4 mb-3 border-b border-border-primary/50 pb-2">
        <h5 className="font-serif font-bold text-sm text-text-primary uppercase tracking-wider">
          {title}
        </h5>
        <span className="text-[10px] uppercase font-bold tracking-wider text-accent-gold">
          {completed}/{total} Completed ({percent}%)
        </span>
      </div>

      <div className="w-full bg-bg-primary h-1 rounded-full overflow-hidden mb-4 border border-border-primary/20">
        <div
          className="bg-accent-gold h-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ul className="space-y-2.5 pl-0 text-xs">
        {items.map((item, idx) => {
          const isChecked = !!checkedItems[idx];
          return (
            <li key={idx} className="flex items-start gap-2.5">
              <button
                onClick={() => handleToggle(idx)}
                className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-100 focus:outline-none focus:ring-1 focus:ring-accent-gold ${
                  isChecked
                    ? 'bg-accent-gold border-accent-gold text-bg-primary'
                    : 'border-border-primary bg-bg-primary hover:border-accent-gold'
                }`}
                aria-label={`Toggle item: ${item}`}
              >
                {isChecked && <Check size={12} />}
              </button>
              <span
                onClick={() => handleToggle(idx)}
                className={`cursor-pointer leading-relaxed transition-all duration-100 select-none ${
                  isChecked ? 'text-text-muted line-through' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {item}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
