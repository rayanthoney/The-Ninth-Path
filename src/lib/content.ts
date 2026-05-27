import fs from 'fs';
import path from 'path';
import { GuidePage, ModEntry, ToolEntry, ChangelogEntry, HeadingItem } from './types';

const contentDir = path.join(process.cwd(), 'src/content');
const guidesDir = path.join(contentDir, 'guides');

// Helper to parse frontmatter from markdown files
function parseMarkdownFile(fileContent: string): { data: Record<string, string>; content: string } {
  const data: Record<string, string> = {};
  let content = fileContent;
  
  const match = fileContent.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/);
  if (match) {
    const yamlBlock = match[1];
    content = match[2];
    
    const lines = yamlBlock.split('\n');
    for (const line of lines) {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join(':').trim();
        data[key] = value.replace(/^['"]|['"]$/g, ''); // strip optional quotes
      }
    }
  }
  
  return { data, content };
}

// Heading parser
function parseHeadings(content: string): HeadingItem[] {
  const lines = content.split('\n');
  const headings: HeadingItem[] = [];
  
  let inCodeBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const h2Match = line.match(/^##\s+(.+)$/);
    const h3Match = line.match(/^###\s+(.+)$/);

    if (h2Match) {
      const text = h2Match[1].replace(/<[^>]*>/g, '').trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      headings.push({ id, text, level: 2 });
    } else if (h3Match) {
      const text = h3Match[1].replace(/<[^>]*>/g, '').trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      headings.push({ id, text, level: 3 });
    }
  }
  return headings;
}

// Strict Validators
function validateGuidePage(data: Record<string, string>, fileName: string, fileContent: string): GuidePage {
  const required = ['title', 'slug', 'section', 'sequence', 'description', 'lastUpdated'];
  for (const field of required) {
    if (!data[field]) {
      throw new Error(`Content validation error in guide file "${fileName}": "${field}" is required.`);
    }
  }

  const validSections = [
    'home', 'start', 'preinstall', 'common-tasks', 'install',
    'merge-patch', 'mcm', 'finishing', 'appendix', 'changelog', 'faq'
  ];
  if (!validSections.includes(data.section)) {
    throw new Error(`Content validation error in guide file "${fileName}": "section" must be one of [${validSections.join(', ')}]. Received: "${data.section}"`);
  }

  const sequence = parseInt(data.sequence, 10);
  if (isNaN(sequence)) {
    throw new Error(`Content validation error in guide file "${fileName}": "sequence" must be a valid number. Received: "${data.sequence}"`);
  }

  const difficulty = data.difficulty;
  if (difficulty && !['beginner', 'intermediate', 'advanced'].includes(difficulty)) {
    throw new Error(`Content validation error in guide file "${fileName}": "difficulty" must be beginner, intermediate, or advanced. Received: "${difficulty}"`);
  }

  const parseArray = (str?: string) => {
    if (!str) return undefined;
    return str.split(',').map(s => s.trim()).filter(Boolean);
  };

  const { content } = parseMarkdownFile(fileContent);
  const headings = parseHeadings(content);

  return {
    id: data.id || fileName.replace('.md', ''),
    slug: data.slug,
    title: data.title,
    shortTitle: data.shortTitle,
    section: data.section as GuidePage['section'],
    sequence,
    description: data.description,
    estimatedTime: data.estimatedTime,
    difficulty: difficulty as GuidePage['difficulty'],
    lastUpdated: data.lastUpdated,
    headings,
    prerequisites: parseArray(data.prerequisites),
    relatedTools: parseArray(data.relatedTools),
    relatedMods: parseArray(data.relatedMods),
    versionScope: data.versionScope
  };
}

function validateModEntry(mod: unknown, index: number): ModEntry {
  const m = mod as Record<string, unknown>;
  const context = `mods.json at index ${index} (${m.name || 'unnamed'})`;

  if (!m.id || typeof m.id !== 'string') throw new Error(`Content validation error in ${context}: "id" is required and must be a string.`);
  if (!m.name || typeof m.name !== 'string') throw new Error(`Content validation error in ${context}: "name" is required and must be a string.`);
  if (!m.category || typeof m.category !== 'string') throw new Error(`Content validation error in ${context}: "category" is required and must be a string.`);
  if (typeof m.installPhase !== 'number') throw new Error(`Content validation error in ${context}: "installPhase" is required and must be a number.`);
  if (!m.sourceUrl || typeof m.sourceUrl !== 'string') throw new Error(`Content validation error in ${context}: "sourceUrl" is required and must be a string.`);
  
  const validSourceTypes = ['Nexus', 'GitHub', 'Direct'];
  if (!validSourceTypes.includes(m.sourceType as string)) {
    throw new Error(`Content validation error in ${context}: "sourceType" must be one of [${validSourceTypes.join(', ')}]. Received: "${m.sourceType}"`);
  }

  const validFileTypes = ['Main', 'Update', 'Optional', 'Misc'];
  if (!validFileTypes.includes(m.fileType as string)) {
    throw new Error(`Content validation error in ${context}: "fileType" must be one of [${validFileTypes.join(', ')}]. Received: "${m.fileType}"`);
  }

  if (typeof m.required !== 'boolean') throw new Error(`Content validation error in ${context}: "required" is required and must be a boolean.`);

  const assertStringArray = (arr: unknown, fieldName: string) => {
    if (arr !== undefined && (!Array.isArray(arr) || arr.some(item => typeof item !== 'string'))) {
      throw new Error(`Content validation error in ${context}: "${fieldName}" must be an array of strings.`);
    }
  };

  assertStringArray(m.tags, 'tags');
  assertStringArray(m.fomodInstructions, 'fomodInstructions');
  assertStringArray(m.specialInstructions, 'specialInstructions');

  return mod as ModEntry;
}

function validateToolEntry(tool: unknown, index: number): ToolEntry {
  const t = tool as Record<string, unknown>;
  const context = `tools.json at index ${index} (${t.name || 'unnamed'})`;

  if (!t.id || typeof t.id !== 'string') throw new Error(`Content validation error in ${context}: "id" is required and must be a string.`);
  if (!t.name || typeof t.name !== 'string') throw new Error(`Content validation error in ${context}: "name" is required and must be a string.`);
  if (!t.purpose || typeof t.purpose !== 'string') throw new Error(`Content validation error in ${context}: "purpose" is required and must be a string.`);
  if (!t.downloadUrl || typeof t.downloadUrl !== 'string') throw new Error(`Content validation error in ${context}: "downloadUrl" is required and must be a string.`);
  if (!t.versionPinned || typeof t.versionPinned !== 'string') throw new Error(`Content validation error in ${context}: "versionPinned" is required and must be a string.`);

  if (!Array.isArray(t.usedInSections) || t.usedInSections.some((s: unknown) => typeof s !== 'string')) {
    throw new Error(`Content validation error in ${context}: "usedInSections" is required and must be an array of strings.`);
  }

  if (!Array.isArray(t.installNotes) || t.installNotes.some((n: unknown) => typeof n !== 'string')) {
    throw new Error(`Content validation error in ${context}: "installNotes" is required and must be an array of strings.`);
  }

  return tool as ToolEntry;
}

function validateChangelogEntry(entry: unknown, index: number): ChangelogEntry {
  const e = entry as Record<string, unknown>;
  const context = `changelog.json at index ${index} (Version ${e.version || 'unknown'})`;

  if (!e.id || typeof e.id !== 'string') throw new Error(`Content validation error in ${context}: "id" is required and must be a string.`);
  if (!e.version || typeof e.version !== 'string') throw new Error(`Content validation error in ${context}: "version" is required and must be a string.`);
  if (!e.date || typeof e.date !== 'string') throw new Error(`Content validation error in ${context}: "date" is required and must be a string.`);
  if (!e.summary || typeof e.summary !== 'string') throw new Error(`Content validation error in ${context}: "summary" is required and must be a string.`);

  const assertStringArray = (arr: unknown, fieldName: string) => {
    if (arr !== undefined && (!Array.isArray(arr) || arr.some(item => typeof item !== 'string'))) {
      throw new Error(`Content validation error in ${context}: "${fieldName}" must be an array of strings.`);
    }
  };

  assertStringArray(e.breakingChanges, 'breakingChanges');
  assertStringArray(e.added, 'added');
  assertStringArray(e.removed, 'removed');
  assertStringArray(e.updated, 'updated');
  assertStringArray(e.affectedPages, 'affectedPages');

  return entry as ChangelogEntry;
}

// 1. Guides Loader
export async function getGuides(): Promise<GuidePage[]> {
  if (!fs.existsSync(guidesDir)) return [];
  
  const files = fs.readdirSync(guidesDir);
  const guides: GuidePage[] = files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const filePath = path.join(guidesDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = parseMarkdownFile(fileContent);
      
      return validateGuidePage(data, file, fileContent);
    });
    
  return guides.sort((a, b) => a.sequence - b.sequence);
}

export async function getGuideBySlug(slugArray: string[]): Promise<{ page: GuidePage; content: string } | null> {
  const slug = slugArray.join('/');
  const guides = await getGuides();
  const matched = guides.find(g => g.slug === slug);
  if (!matched) return null;
  
  const filename = `${matched.id}.md`;
  const filePath = path.join(guidesDir, filename);
  if (!fs.existsSync(filePath)) return null;
  
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { content } = parseMarkdownFile(fileContent);
  
  return { page: matched, content };
}

// 2. Mods Loader
export async function getMods(): Promise<ModEntry[]> {
  const filePath = path.join(contentDir, 'mods.json');
  if (!fs.existsSync(filePath)) return [];
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const parsed = JSON.parse(fileContent);
  
  if (!Array.isArray(parsed)) {
    throw new Error('Content validation error in mods.json: Database must be an array.');
  }

  return parsed.map((mod, idx) => validateModEntry(mod, idx));
}

export async function getModById(id: string): Promise<ModEntry | null> {
  const mods = await getMods();
  return mods.find(m => m.id === id) || null;
}

// 3. Tools Loader
export async function getTools(): Promise<ToolEntry[]> {
  const filePath = path.join(contentDir, 'tools.json');
  if (!fs.existsSync(filePath)) return [];
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const parsed = JSON.parse(fileContent);

  if (!Array.isArray(parsed)) {
    throw new Error('Content validation error in tools.json: Database must be an array.');
  }

  return parsed.map((tool, idx) => validateToolEntry(tool, idx));
}

export async function getToolById(id: string): Promise<ToolEntry | null> {
  const tools = await getTools();
  return tools.find(t => t.id === id) || null;
}

// 4. Changelog Loader
export async function getChangelog(): Promise<ChangelogEntry[]> {
  const filePath = path.join(contentDir, 'changelog.json');
  if (!fs.existsSync(filePath)) return [];
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const parsed = JSON.parse(fileContent);

  if (!Array.isArray(parsed)) {
    throw new Error('Content validation error in changelog.json: Database must be an array.');
  }

  return parsed.map((entry, idx) => validateChangelogEntry(entry, idx));
}
