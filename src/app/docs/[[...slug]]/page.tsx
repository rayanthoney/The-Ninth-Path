import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getGuides, getGuideBySlug, getMods, getTools, getChangelog } from '../../../lib/content';
import { generateSeoMetadata } from '../../../lib/seo';
import SidebarNav from '../../../components/docs/SidebarNav';
import Breadcrumbs from '../../../components/docs/Breadcrumbs';
import OnPageTOC from '../../../components/docs/OnPageTOC';
import PrevNextPager from '../../../components/docs/PrevNextPager';
import MarkdownRenderer from '../../../components/docs/MarkdownRenderer';

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

// Generate static routes for static export
export async function generateStaticParams() {
  const guides = await getGuides();
  const params = guides.map(guide => ({
    slug: guide.slug.split('/')
  }));
  // Add base path entry for optional catch-all route /docs
  params.push({ slug: [] });
  return params;
}

// Dynamically generate SEO metadata for each page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  const guideData = await getGuideBySlug(slug);
  if (!guideData) {
    return {
      title: 'Page Not Found',
    };
  }
  return generateSeoMetadata({
    title: guideData.page.title,
    description: guideData.page.description,
    slug: `docs/${guideData.page.slug}`,
  });
}

export default async function DocsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  const guideData = await getGuideBySlug(slug);
  
  if (!guideData) {
    return notFound();
  }

  const { page, content } = guideData;
  const allPages = await getGuides();
  const mods = await getMods();
  const tools = await getTools();
  const changelog = await getChangelog();

  // Custom renderer for changelog page if visited via docs slug
  const isChangelog = page.section === 'changelog';

  return (
    <div className="max-w-7xl w-full mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Left Sidebar Nav */}
      <SidebarNav allPages={allPages} />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 max-w-3xl">
        <Breadcrumbs section={page.section} title={page.title} />

        {/* Page Hero Header */}
        <div className="border-b border-border-primary/50 pb-6 mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-text-primary tracking-wide mb-3">
            {page.title}
          </h1>
          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            {page.description}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] text-text-muted">
            {page.estimatedTime && (
              <span className="flex items-center gap-1.5">
                <strong>Estimate:</strong> {page.estimatedTime}
              </span>
            )}
            {page.difficulty && (
              <span className="flex items-center gap-1.5">
                <strong>Difficulty:</strong> <span className="capitalize">{page.difficulty}</span>
              </span>
            )}
            {page.lastUpdated && (
              <span>
                <strong>Last Updated:</strong> {page.lastUpdated}
              </span>
            )}
          </div>
        </div>

        {/* Render page contents */}
        {isChangelog ? (
          <div className="space-y-12">
            {changelog.map(entry => (
              <div key={entry.id} className="border-l-2 border-accent-gold/40 pl-6 space-y-4">
                <div className="flex flex-wrap items-baseline gap-2.5">
                  <h3 className="font-serif text-lg font-bold text-text-primary">
                    Version {entry.version}
                  </h3>
                  <span className="text-xs text-text-muted font-mono">{entry.date}</span>
                </div>
                <p className="text-xs text-text-secondary italic">{entry.summary}</p>
                
                {entry.breakingChanges && entry.breakingChanges.length > 0 && (
                  <div className="p-3 bg-red-950/20 border border-red-900/50 rounded text-xs space-y-1">
                    <span className="font-bold text-red-400">Breaking Updates / Rebuild Required:</span>
                    <ul className="list-disc pl-4 space-y-0.5 text-text-secondary">
                      {entry.breakingChanges.map((bc, idx) => <li key={idx}>{bc}</li>)}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {entry.added && entry.added.length > 0 && (
                    <div className="space-y-1">
                      <span className="font-bold text-emerald-400">Added:</span>
                      <ul className="list-disc pl-4 space-y-0.5 text-text-secondary">
                        {entry.added.map((item, idx) => <li key={idx}>{item}</li>)}
                      </ul>
                    </div>
                  )}
                  {entry.updated && entry.updated.length > 0 && (
                    <div className="space-y-1">
                      <span className="font-bold text-blue-400">Updated:</span>
                      <ul className="list-disc pl-4 space-y-0.5 text-text-secondary">
                        {entry.updated.map((item, idx) => <li key={idx}>{item}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <MarkdownRenderer content={content} mods={mods} tools={tools} />
        )}

        {/* Chronological Navigation Pager */}
        <PrevNextPager currentPage={page} allPages={allPages} />
      </main>

      {/* Right mini TOC */}
      {!isChangelog && <OnPageTOC content={content} />}
    </div>
  );
}
