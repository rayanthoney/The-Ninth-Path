import React from 'react';
import { ToolEntry } from '../../lib/types';
import { ExternalLink, CheckCircle } from '../ui/Icons';

interface ToolCardProps {
  tool: ToolEntry;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <div id={tool.id} className="my-6 rounded-lg border border-border-primary bg-bg-secondary overflow-hidden shadow-sm hover:shadow-md transition-all duration-150 scroll-mt-20">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-bg-tertiary border-b border-border-primary">
        <div className="flex items-center gap-2">
          <h4 className="font-serif font-bold text-base text-text-primary">
            {tool.name}
          </h4>
          {tool.versionPinned && (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-bg-primary border border-border-primary text-text-secondary">
              v{tool.versionPinned}
            </span>
          )}
        </div>
        
        {tool.downloadUrl && (
          <a
            href={tool.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-accent-gold hover:text-accent-gold-hover transition-colors font-medium"
          >
            Download Site <ExternalLink size={12} />
          </a>
        )}
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <p className="text-xs text-text-secondary leading-relaxed">
          <strong>Purpose:</strong> {tool.purpose}
        </p>

        {tool.installNotes && tool.installNotes.length > 0 && (
          <div className="space-y-1.5">
            <h5 className="text-[11px] uppercase font-bold tracking-wider text-text-muted">
              Installation & Configuration Notes:
            </h5>
            <ul className="space-y-1.5 pl-0 text-xs">
              {tool.installNotes.map((note, idx) => (
                <li key={idx} className="flex gap-2 items-start text-text-secondary leading-relaxed">
                  <CheckCircle size={14} className="text-accent-gold shrink-0 mt-0.5" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
