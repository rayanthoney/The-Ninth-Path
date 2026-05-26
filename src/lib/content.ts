import fs from 'fs';
import path from 'path';
import { GuidePage, ModEntry, ToolEntry, ChangelogEntry } from './types';

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
      
      return {
        id: data.id || file.replace('.md', ''),
        slug: data.slug || file.replace('.md', ''),
        title: data.title || file.replace('.md', ''),
        shortTitle: data.shortTitle,
        section: (data.section || 'install') as GuidePage['section'],
        sequence: parseInt(data.sequence || '999', 10),
        description: data.description || '',
        estimatedTime: data.estimatedTime,
        difficulty: data.difficulty as GuidePage['difficulty'],
        lastUpdated: data.lastUpdated || ''
      };
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
  return JSON.parse(fileContent);
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
  return JSON.parse(fileContent);
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
  return JSON.parse(fileContent);
}
