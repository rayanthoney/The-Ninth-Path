'use client';

import React, { useState } from 'react';
import AlertBlock from './AlertBlock';
import ModCard from './ModCard';
import ToolCard from './ToolCard';
import ChecklistBlock from './ChecklistBlock';
import { ModEntry, ToolEntry } from '../../lib/types';
import { LinkIcon, Check } from '../ui/Icons';

interface MarkdownRendererProps {
  content: string;
  mods: ModEntry[];
  tools: ToolEntry[];
}

function Heading({ id, level, children }: { id: string; level: number; children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window === 'undefined') return;
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const HeadingTag = level === 2 ? 'h2' : 'h3';
  const headingClass = level === 2
    ? 'font-serif text-xl font-bold text-text-primary border-b border-border-primary pb-1.5 mt-8 mb-3 group flex items-center justify-between scroll-mt-20'
    : 'font-serif text-lg font-bold text-text-primary mt-6 mb-2 group flex items-center justify-between scroll-mt-20';

  return (
    <HeadingTag id={id} className={headingClass}>
      <span>{children}</span>
      <button
        onClick={handleCopy}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-text-muted hover:text-accent-gold focus:opacity-100 focus:outline-none flex items-center gap-1.5 text-[10px] font-sans font-normal normal-case cursor-pointer"
        title="Copy section link"
        aria-label="Copy link to this section"
      >
        {copied ? (
          <>
            <span className="text-emerald-500 font-medium font-sans">Copied!</span>
            <Check size={14} className="text-emerald-500" />
          </>
        ) : (
          <LinkIcon size={14} />
        )}
      </button>
    </HeadingTag>
  );
}

export default function MarkdownRenderer({ content, mods, tools }: MarkdownRendererProps) {
  // Split content into blocks by double newlines, but preserve code blocks and alerts together
  const blocks: string[] = [];
  const lines = content.split('\n');
  
  let currentBlock: string[] = [];
  let inCodeBlock = false;
  let inAlert = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      currentBlock.push(line);
      if (!inCodeBlock) {
        blocks.push(currentBlock.join('\n'));
        currentBlock = [];
      }
      continue;
    }
    
    if (inCodeBlock) {
      currentBlock.push(line);
      continue;
    }

    if (line.trim().startsWith('> [!')) {
      inAlert = true;
      currentBlock.push(line);
      continue;
    }

    if (inAlert) {
      if (line.trim().startsWith('>') || line.trim() !== '') {
        currentBlock.push(line);
      } else {
        inAlert = false;
        blocks.push(currentBlock.join('\n'));
        currentBlock = [];
      }
      continue;
    }

    if (line.trim() === '') {
      if (currentBlock.length > 0) {
        blocks.push(currentBlock.join('\n'));
        currentBlock = [];
      }
    } else {
      currentBlock.push(line);
    }
  }

  if (currentBlock.length > 0) {
    blocks.push(currentBlock.join('\n'));
  }

  // Parse inline text (bold, links, code) safely
  const parseInlineText = (text: string) => {
    let parsed = text;
    
    const boldRegex = /\*\*([\s\S]+?)\*\*/g;
    const linkRegex = /\[([\s\S]+?)\]\(([\s\S]+?)\)/g;
    const inlineCodeRegex = /`([^`]+)`/g;

    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    
    const matches: { index: number; length: number; component: React.ReactNode }[] = [];

    let match;
    while ((match = boldRegex.exec(parsed)) !== null) {
      matches.push({
        index: match.index,
        length: match[0].length,
        component: <strong key={`bold-${match.index}`} className="font-bold text-text-primary">{match[1]}</strong>
      });
    }

    while ((match = linkRegex.exec(parsed)) !== null) {
      matches.push({
        index: match.index,
        length: match[0].length,
        component: (
          <a key={`link-${match.index}`} href={match[2]} className="text-accent-gold hover:underline" target={match[2].startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
            {match[1]}
          </a>
        )
      });
    }

    while ((match = inlineCodeRegex.exec(parsed)) !== null) {
      matches.push({
        index: match.index,
        length: match[0].length,
        component: <code key={`code-${match.index}`} className="bg-bg-secondary border border-border-primary px-1.5 py-0.5 rounded text-xs font-mono text-text-primary">{match[1]}</code>
      });
    }

    matches.sort((a, b) => a.index - b.index);

    let indexOffset = 0;
    for (const m of matches) {
      if (m.index < indexOffset) continue;
      
      if (m.index > indexOffset) {
        elements.push(parsed.substring(indexOffset, m.index));
      }
      elements.push(m.component);
      indexOffset = m.index + m.length;
    }

    if (indexOffset < parsed.length) {
      elements.push(parsed.substring(indexOffset));
    }

    return elements.length > 0 ? elements : text;
  };

  return (
    <div className="prose max-w-none text-text-secondary text-sm space-y-6">
      {blocks.map((block, index) => {
        const trimmed = block.trim();

        // 1. Headers
        if (trimmed.startsWith('### ')) {
          const text = trimmed.substring(4);
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          return (
            <Heading key={index} id={id} level={3}>
              {parseInlineText(text)}
            </Heading>
          );
        }
        if (trimmed.startsWith('## ')) {
          const text = trimmed.substring(3);
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          return (
            <Heading key={index} id={id} level={2}>
              {parseInlineText(text)}
            </Heading>
          );
        }
        if (trimmed.startsWith('# ')) {
          return <h1 key={index} className="font-serif text-3xl font-extrabold text-text-primary mb-4">{parseInlineText(trimmed.substring(2))}</h1>;
        }

        // 2. ModCard Embed
        const modMatch = trimmed.match(/<ModCard\s+id="([^"]+)"\s*\/>/);
        if (modMatch) {
          const modId = modMatch[1];
          const mod = mods.find(m => m.id === modId);
          if (mod) return <ModCard key={index} mod={mod} />;
          return <div key={index} className="text-xs text-red-400 p-2 border border-red-900 rounded bg-red-950/20 font-sans">Mod "{modId}" not found in content database.</div>;
        }

        // 3. ToolCard Embed
        const toolMatch = trimmed.match(/<ToolCard\s+id="([^"]+)"\s*\/>/);
        if (toolMatch) {
          const toolId = toolMatch[1];
          const tool = tools.find(t => t.id === toolId);
          if (tool) return <ToolCard key={index} tool={tool} />;
          return <div key={index} className="text-xs text-red-400 p-2 border border-red-900 rounded bg-red-950/20 font-sans">Tool "{toolId}" not found in content database.</div>;
        }

        // 4. ChecklistBlock Embed
        const checklistMatch = trimmed.match(/<ChecklistBlock\s+id="([^"]+)"\s+title="([^"]+)"\s+items=\[([^\]]+)\]\s*\/>/);
        if (checklistMatch) {
          const id = checklistMatch[1];
          const title = checklistMatch[2];
          const items = checklistMatch[3].split(',').map(item => item.trim().replace(/^['"]|['"]$/g, ''));
          return <ChecklistBlock key={index} id={id} title={title} items={items} />;
        }

        // 5. GitHub Alert Blocks
        if (trimmed.startsWith('> [!')) {
          const typeMatch = trimmed.match(/^> \[\!([A-Z]+)\]/i);
          if (typeMatch) {
            const alertType = typeMatch[1].toLowerCase() as any;
            const blockLines = trimmed.split('\n');
            
            let alertTitle = '';
            let startIndex = 1;
            
            if (blockLines[1] && blockLines[1].trim().startsWith('> **')) {
              alertTitle = blockLines[1].replace(/^>\s*\*\*|\*\*\s*$/g, '').trim();
              startIndex = 2;
            }
            
            const alertContent = blockLines
              .slice(startIndex)
              .map(l => l.replace(/^>\s*/, '').trim())
              .filter(Boolean)
              .join(' ');

            return (
              <AlertBlock key={index} type={alertType} title={alertTitle}>
                {parseInlineText(alertContent)}
              </AlertBlock>
            );
          }
        }

        // 6. Code Block
        if (trimmed.startsWith('```')) {
          const codeLines = block.split('\n');
          const codeBody = codeLines.slice(1, -1).join('\n');
          return (
            <pre key={index} className="bg-bg-secondary border border-border-primary p-4 rounded-lg overflow-x-auto text-xs font-mono text-text-primary my-4">
              <code>{codeBody}</code>
            </pre>
          );
        }

        // 7. Unordered / Ordered Lists
        if (trimmed.startsWith('- ') || trimmed.match(/^\d+\.\s/)) {
          const listLines = block.split('\n');
          const isOrdered = /^\d+\.\s/.test(listLines[0].trim());
          
          const listItems = listLines.map((li, lIdx) => {
            const cleanText = li.replace(/^(-\s+|\d+\.\s+)/, '');
            return <li key={lIdx} className="leading-relaxed">{parseInlineText(cleanText)}</li>;
          });

          return isOrdered ? (
            <ol key={index} className="list-decimal pl-6 space-y-1.5 my-4">{listItems}</ol>
          ) : (
            <ul key={index} className="list-disc pl-6 space-y-1.5 my-4">{listItems}</ul>
          );
        }

        // 8. Tables
        if (trimmed.startsWith('|')) {
          const tableLines = block.split('\n');
          const headers = tableLines[0].split('|').map(h => h.trim()).filter(Boolean);
          const rows = tableLines.slice(2).map(row => row.split('|').map(td => td.trim()).filter(Boolean)).filter(r => r.length > 0);

          return (
            <div key={index} className="overflow-x-auto rounded border border-border-primary my-4 font-sans">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-bg-secondary text-text-primary border-b border-border-primary">
                    {headers.map((h, hIdx) => <th key={hIdx} className="p-3 font-semibold">{h}</th>)}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-primary/50 text-text-secondary">
                  {rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-bg-secondary/40 transition-colors">
                      {row.map((cell, cIdx) => <td key={cIdx} className="p-3">{parseInlineText(cell)}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        // 9. Standard Paragraph
        return (
          <p key={index} className="leading-relaxed text-text-secondary mb-4">
            {parseInlineText(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
