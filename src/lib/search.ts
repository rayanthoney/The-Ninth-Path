import { GuidePage, ModEntry, ToolEntry } from './types';

export interface SearchResult {
  id: string;
  type: 'guide' | 'mod' | 'tool';
  title: string;
  description: string;
  url: string;
}

// Simple input sanitization to prevent XSS
export function sanitizeSearchQuery(query: string): string {
  return query
    .replace(/[&<>"']/g, '') // strip common HTML tag delimiters
    .trim()
    .toLowerCase();
}

export function performSearch(
  query: string,
  guides: GuidePage[],
  mods: ModEntry[],
  tools: ToolEntry[]
): SearchResult[] {
  const sanitized = sanitizeSearchQuery(query);
  if (!sanitized) return [];
  
  const results: SearchResult[] = [];
  
  // 1. Search Guides
  for (const guide of guides) {
    const titleMatch = guide.title.toLowerCase().includes(sanitized);
    const descMatch = guide.description.toLowerCase().includes(sanitized);
    
    if (titleMatch || descMatch) {
      results.push({
        id: guide.id,
        type: 'guide',
        title: guide.title,
        description: guide.description,
        url: `/docs/${guide.slug}`
      });
    }
  }
  
  // 2. Search Mods
  for (const mod of mods) {
    const nameMatch = mod.name.toLowerCase().includes(sanitized);
    const catMatch = mod.category.toLowerCase().includes(sanitized);
    const tagsMatch = mod.tags?.some(tag => tag.toLowerCase().includes(sanitized)) || false;
    
    if (nameMatch || catMatch || tagsMatch) {
      results.push({
        id: mod.id,
        type: 'mod',
        title: mod.name,
        description: `${mod.category} | Version ${mod.versionPinned || 'Pinned'} - ${mod.required ? 'Required' : 'Optional'}`,
        url: `/mod-index?search=${encodeURIComponent(mod.name)}`
      });
    }
  }
  
  // 3. Search Tools
  for (const tool of tools) {
    const nameMatch = tool.name.toLowerCase().includes(sanitized);
    const purposeMatch = tool.purpose.toLowerCase().includes(sanitized);
    
    if (nameMatch || purposeMatch) {
      results.push({
        id: tool.id,
        type: 'tool',
        title: tool.name,
        description: tool.purpose,
        url: `/tools#${tool.id}`
      });
    }
  }
  
  return results.slice(0, 10); // return top 10 matches
}
