import { GuidePage, ModEntry, ToolEntry } from './types';

export interface SearchResult {
  id: string;
  type: 'guide' | 'mod' | 'tool';
  title: string;
  description: string;
  url: string;
  score?: number;
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
  
  // 1. Search Guides & Headings
  for (const guide of guides) {
    let guideScore = 0;
    const guideTitleLower = guide.title.toLowerCase();
    const guideDescLower = guide.description.toLowerCase();
    
    if (guideTitleLower === sanitized) {
      guideScore += 10;
    } else if (guideTitleLower.startsWith(sanitized)) {
      guideScore += 8;
    } else if (guideTitleLower.includes(sanitized)) {
      guideScore += 5;
    }
    
    if (guideDescLower.includes(sanitized)) {
      guideScore += 2;
    }
    
    if (guideScore > 0) {
      results.push({
        id: guide.id,
        type: 'guide',
        title: guide.title,
        description: guide.description,
        url: `/docs/${guide.slug}`,
        score: guideScore
      });
    }
    
    // Search within guide headings
    if (guide.headings) {
      for (const heading of guide.headings) {
        let headingScore = 0;
        const headingTextLower = heading.text.toLowerCase();
        
        if (headingTextLower === sanitized) {
          headingScore += 8;
        } else if (headingTextLower.startsWith(sanitized)) {
          headingScore += 6;
        } else if (headingTextLower.includes(sanitized)) {
          headingScore += 4;
        }
        
        if (headingScore > 0) {
          results.push({
            id: `${guide.id}-${heading.id}`,
            type: 'guide',
            title: `${guide.title} > ${heading.text}`,
            description: `Section heading in ${guide.title}`,
            url: `/docs/${guide.slug}#${heading.id}`,
            score: headingScore
          });
        }
      }
    }
  }
  
  // 2. Search Mods
  for (const mod of mods) {
    let modScore = 0;
    const nameLower = mod.name.toLowerCase();
    const catLower = mod.category.toLowerCase();
    
    if (nameLower === sanitized) {
      modScore += 12; // Extra high priority for exact mod matches
    } else if (nameLower.startsWith(sanitized)) {
      modScore += 9;
    } else if (nameLower.includes(sanitized)) {
      modScore += 6;
    }
    
    if (catLower.includes(sanitized)) {
      modScore += 3;
    }
    
    if (mod.tags?.some(tag => tag.toLowerCase().includes(sanitized))) {
      modScore += 3;
    }
    
    if (modScore > 0) {
      results.push({
        id: mod.id,
        type: 'mod',
        title: mod.name,
        description: `${mod.category} | Version ${mod.versionPinned || 'Pinned'} - ${mod.required ? 'Required' : 'Optional'}`,
        url: `/mod-index?search=${encodeURIComponent(mod.name)}`,
        score: modScore
      });
    }
  }
  
  // 3. Search Tools
  for (const tool of tools) {
    let toolScore = 0;
    const nameLower = tool.name.toLowerCase();
    const purposeLower = tool.purpose.toLowerCase();
    
    if (nameLower === sanitized) {
      toolScore += 12; // Extra high priority for exact tool matches
    } else if (nameLower.startsWith(sanitized)) {
      toolScore += 9;
    } else if (nameLower.includes(sanitized)) {
      toolScore += 6;
    }
    
    if (purposeLower.includes(sanitized)) {
      toolScore += 2;
    }
    
    if (toolScore > 0) {
      results.push({
        id: tool.id,
        type: 'tool',
        title: tool.name,
        description: tool.purpose,
        url: `/tools#${tool.id}`,
        score: toolScore
      });
    }
  }
  
  // Sort descending by score
  results.sort((a, b) => (b.score || 0) - (a.score || 0));
  
  return results.slice(0, 15); // Return top 15 matches (increased from 10 to cover headings)
}
