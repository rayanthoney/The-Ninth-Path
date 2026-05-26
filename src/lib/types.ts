export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export interface GuidePage {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  section: 'home' | 'start' | 'preinstall' | 'common-tasks' | 'install' | 'merge-patch' | 'mcm' | 'finishing' | 'appendix' | 'changelog' | 'faq';
  sequence: number; // Order in sequential guide stepper
  description: string;
  estimatedTime?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  lastUpdated: string;
  headings: HeadingItem[];
  prerequisites?: string[];
  relatedTools?: string[];
  relatedMods?: string[];
  versionScope?: string;
}

export interface ModEntry {
  id: string;
  name: string;
  category: string;
  installPhase: number; // Install Phase 1-10
  sourceUrl: string;
  sourceType: 'Nexus' | 'GitHub' | 'Direct';
  versionPinned?: string;
  fileType: 'Main' | 'Update' | 'Optional' | 'Misc';
  tags?: string[];
  fomodInstructions?: string[];
  specialInstructions?: string[];
  required: boolean;
}

export interface ToolEntry {
  id: string;
  name: string;
  purpose: string;
  downloadUrl: string;
  versionPinned: string;
  usedInSections: string[];
  installNotes: string[];
}

export interface ChangelogEntry {
  id: string;
  version: string;
  date: string;
  summary: string;
  breakingChanges?: string[];
  added?: string[];
  removed?: string[];
  updated?: string[];
  affectedPages?: string[];
}

export interface AlertBlock {
  type: 'note' | 'warning' | 'critical' | 'tip' | 'success';
  title?: string;
  content: string;
}
