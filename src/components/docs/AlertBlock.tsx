import React from 'react';
import { AlertCircle, AlertTriangle, Info, CheckCircle, Compass } from '../ui/Icons';

export interface AlertBlockProps {
  type: 'note' | 'warning' | 'critical' | 'tip' | 'success';
  title?: string;
  children: React.ReactNode;
}

export default function AlertBlock({ type, title, children }: AlertBlockProps) {
  const styles = {
    note: {
      border: 'border-l-4 border-[var(--alert-note-border)]',
      bg: 'bg-[var(--alert-note-bg)]',
      text: 'text-text-primary',
      icon: <Info className="text-[var(--alert-note-border)] shrink-0" size={20} />,
      defaultTitle: 'Note'
    },
    warning: {
      border: 'border-l-4 border-[var(--alert-warning-border)]',
      bg: 'bg-[var(--alert-warning-bg)]',
      text: 'text-text-primary',
      icon: <AlertTriangle className="text-[var(--alert-warning-border)] shrink-0" size={20} />,
      defaultTitle: 'Warning'
    },
    critical: {
      border: 'border-l-4 border-[var(--alert-critical-border)] animate-pulse',
      bg: 'bg-[var(--alert-critical-bg)]',
      text: 'text-text-primary font-medium',
      icon: <AlertCircle className="text-[var(--alert-critical-border)] shrink-0" size={20} />,
      defaultTitle: 'CRITICAL INSTRUCTION'
    },
    success: {
      border: 'border-l-4 border-[var(--alert-success-border)]',
      bg: 'bg-[var(--alert-success-bg)]',
      text: 'text-text-primary',
      icon: <CheckCircle className="text-[var(--alert-success-border)] shrink-0" size={20} />,
      defaultTitle: 'Success'
    },
    tip: {
      border: 'border-l-4 border-[var(--alert-tip-border)]',
      bg: 'bg-[var(--alert-tip-bg)]',
      text: 'text-text-primary',
      icon: <Compass className="text-[var(--alert-tip-border)] shrink-0" size={20} />,
      defaultTitle: 'Tip'
    }
  };

  const config = styles[type] || styles.note;

  return (
    <div className={`my-6 p-4 rounded-r-lg ${config.border} ${config.bg} flex gap-3 shadow-sm`}>
      {config.icon}
      <div className="flex-1">
        <h5 className="font-serif text-sm font-semibold uppercase tracking-wider mb-1 text-text-primary">
          {title || config.defaultTitle}
        </h5>
        <div className={`text-sm leading-relaxed ${config.text}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
