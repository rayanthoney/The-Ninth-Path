<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# I wan to build a website based off this website "[https://lexyslotd.com/](https://lexyslotd.com/)" using my Antigravity IDE. My Skyrim Build will be named the Ninth Path and will include all of the mods in the Lexy's Legend Of  The Dragonborn along with their install instructions. I need you to put your Senior  Software engineering  hat on and review the website and develop an Operating procedure to build out a similar and effective website by prompting my IDE Agent.

Yes — you can absolutely build a “Lexy-style” site for **The Ninth Path**, but the right goal is not to clone Lexy’s site. The better engineering target is to reproduce its strengths: long-form structured documentation, persistent navigation, section-based install flows, warning-heavy UX, and low-friction scanning for a very complex mod setup.[^1_1][^1_2][^1_3]

## Site review

Lexy’s site is fundamentally a documentation system for a large and evolving Skyrim mod build, with a top-level nav that routes users into major stages like Welcome, Common Task Instructions, Mod Installation, Merge work, Changelog, and Appendices.  It succeeds because it treats the guide as an operational workflow rather than a marketing site, and because each page is broken into explicit headings, warnings, step lists, tool references, and next-step navigation.[^1_2][^1_3][^1_1]

A few traits are worth copying directly into your own architecture:

- Persistent global nav with major workflow buckets.[^1_1]
- Deep page structure with anchorable sections and “you are here” context.[^1_3][^1_2]
- Repeated alert patterns for warnings, notes, and “do not skip” moments.[^1_2][^1_3]
- A guide menu that exposes every major chapter in sequence.[^1_3]
- An explicit changelog and appendix strategy because a mod list of this size changes often.[^1_4][^1_1]


## What to build

For **The Ninth Path**, the best product shape is an informational documentation website, not a flashy landing page. The loaded guidance for informational sites also fits this use case: content hierarchy should drive the design, navigation should stay tight, typography should optimize reading, and long-form layouts should use sidebar-plus-main or editorial structures for scanning.[^1_1]

I would define the product like this:

- Purpose: Publish a stable, teachable Skyrim build guide modeled after Lexy’s structure.[^1_2][^1_1]
- Audience: Intermediate to advanced modders, plus motivated beginners who can follow exact steps.[^1_1]
- Primary action: “Start the build” or “Begin pre-installation.”
- Secondary actions: Search mods, browse install phases, view tools, compare updates, jump to troubleshooting.
- Tone: Serious, technical, atmospheric, and Skyrim-adjacent; not corporate SaaS.


## Operating procedure

Use this as your senior-engineering SOP for directing your Antigravity IDE agent.

### 1. Define non-negotiables

Tell the agent these are fixed requirements:

- Build a static documentation website for “The Ninth Path.”
- Use Lexy’s site only as a structural reference, not as a visual or code clone.[^1_1]
- Optimize for long reading sessions, fast scanning, and precise instruction-following.[^1_3][^1_2]
- Include desktop and mobile support, dark/light mode, search, left-side section nav, and changelog support.[^1_1]
- Every install page must support warnings, notes, prerequisites, numbered steps, tool cards, and “next/previous” navigation.[^1_2][^1_3]


### 2. Freeze the information architecture

Your IA should be created before any UI work. A good first-pass sitemap:


| Section | Purpose |
| :-- | :-- |
| Home | Intro, scope, difficulty, hardware expectations, start CTA, release status. [^1_1] |
| Start Here | Read-first page, guide philosophy, estimated time, support boundaries. [^1_1] |
| Pre-Installation | OS prep, browser/tooling setup, Skyrim base setup, MO2 baseline. [^1_2] |
| Common Tasks | Reusable instructions such as BSA extraction, CAO, CK resave, mod install rules. [^1_2] |
| Install Phases 1–10 | Chunked mod installation stages, one page per phase. [^1_3] |
| Merge \& Patch | zEdit, xEdit, synthesis, bash, DynDOLOD, load-order resolution. [^1_1][^1_2][^1_3] |
| MCM Setup | Post-install configuration tables and step flows. [^1_3] |
| Finishing Line | Validation, first boot, smoke tests, common failures. [^1_5][^1_3] |
| Mod Index | Searchable master list of all included mods with categories and source links. |
| Tools | MO2, LOOT, xEdit, BethINI, CAO, Wrye Bash, zEdit, SKSE, etc. [^1_1][^1_2] |
| Changelog | Build version history and upgrade guidance. [^1_1][^1_4] |
| Appendix | FAQ, glossary, hardware notes, troubleshooting, naming rules. [^1_1][^1_3] |

### 3. Model the data first

Do not hand-wire pages as pure prose. The IDE agent should first create a content model so your guide scales.

Recommended content schema:

- `guides`: id, slug, title, intro, sequence, status, estimatedTime, prerequisites
- `steps`: guideId, stepNumber, title, bodyMd, warningBlocks, notes, images, relatedTools
- `mods`: name, slug, category, installPhase, sourceUrl, nexusId, versionPinned, required, notes
- `tools`: name, role, downloadUrl, versionPinned, setupInstructions
- `alerts`: type (`warning`, `note`, `critical`, `tip`)
- `changelog_entries`: version, date, summary, breakingChanges, affectedSections

This is the single biggest difference between an amateur build and a durable one: content must be structured so the same components can render steps, tools, warnings, and mod references consistently.

### 4. Choose the technical stack

For Antigravity IDE, I’d prompt toward a maintainable docs stack rather than vanilla HTML.

Preferred stack:

- Next.js with App Router
- TypeScript
- Tailwind or tokenized CSS variables
- MDX or JSON/YAML-backed content collections
- FlexSearch/Minisearch or local static search index
- Static export if possible

Why this stack:

- You need reusable layouts, strong routing, content-driven pages, and future expandability.
- Search and generated TOCs are easier with structured content.
- MDX lets you write guide content naturally while still embedding alert components and tables.


### 5. Build the design system

Your site should feel Skyrim-adjacent and editorial, not game-wiki ugly and not AI-gradient shiny. Informational-site guidance says content hierarchy and typography should carry the experience, with restrained accents and strong reading layout.[^1_1]

Art direction for The Ninth Path:

- Mood: ancient, disciplined, arcane, rugged
- Palette: charcoal, parchment, iron, muted gold, desaturated ember or teal accent
- Typography: elegant serif for display, readable sans-serif for body
- Visual style: codex/manual, not fantasy gimmick

Core components:

- Sticky header
- Left documentation sidebar
- Right mini TOC on desktop
- Breadcrumbs
- Alert blocks
- Step list
- Tool card
- Mod card
- Version badge
- Search modal
- Previous/next pager
- Copy-link-to-section button


### 6. Create the page template system

Every documentation page should be rendered from a standard shell:

1. Header
2. Breadcrumbs
3. Page title
4. Page metadata, version, difficulty, estimate
5. Alert zone
6. In-page TOC
7. Main content
8. Related tools/mods
9. Prev/next navigation
10. Last updated footer

This mirrors why Lexy’s site works so well: each page is predictable and operational, with strong sectional chunking and clear next movement.[^1_3][^1_2]

### 7. Add guide-specific UX

These features are high-value for a Skyrim build guide:

- “Copy section link”
- “Mark step as done” in memory only, no localStorage if sandboxed in constrained environments is a concern for prototypes; for your real deployment you can reintroduce persistence carefully.[^1_1]
- Expandable warnings and troubleshooting callouts
- A floating “On this page” nav
- Mod dependency badges
- Search by mod name, tool, install phase, and page title
- Version pin banners such as “Built for Skyrim 1.6.x”
- Changelog diff summaries


### 8. Separate content from chrome

Have the agent build two workstreams:

- **Platform layer**: navigation, layout, search, theme, reusable UI, SEO
- **Content layer**: The Ninth Path guide data and pages

That separation matters because your content will change much more often than your shell. Lexy’s guide is actively maintained and updated over time, which is exactly why you need versionable, replaceable content records instead of hardcoded page blobs.[^1_4][^1_1]

### 9. Establish authoring workflow

Create a contributor workflow now, even if you are the only author:

- Add a `docs-writing-rules.md`
- Enforce frontmatter on every guide page
- Require version/date/source notes for every mod or tool change
- Require one “Why this matters” line before complex steps
- Require one troubleshooting note for any failure-prone action

That mirrors Lexy’s instructional pattern: repeated reminders, exactness, and explicit support for user error prevention.[^1_2][^1_1]

### 10. Ship in phases

Do not try to finish the whole site in one prompt. Use four delivery phases:

1. Foundation: shell, nav, theme, page template, search scaffold
2. Content model: guides, mods, tools, changelog schemas
3. Core pages: Home, Start Here, Pre-Installation, one Install Phase, one Tools page
4. Expansion: remaining install phases, MCM, merge pages, appendix, polish

## Prompt pack for Antigravity

Here is the prompt I would give your IDE agent first:

```text
You are a senior staff-level frontend/software engineer and information architect.

Build a production-ready documentation website called “The Ninth Path” for a Skyrim mod build guide. Use Lexy’s LOTD site as a structural reference only for documentation flow and usability, not as a design or code clone.

Primary goal:
Create a content-first docs site optimized for long-form installation instructions, warnings, prerequisites, tools, mod references, search, and sequential navigation.

Technical requirements:
- Use Next.js + TypeScript
- Use a scalable component architecture
- Use MDX or structured content collections for guide pages
- Support static generation
- Implement desktop + mobile responsive layouts
- Implement dark/light mode
- Implement local documentation search
- Create reusable components for: alert blocks, step lists, tool cards, mod cards, breadcrumbs, on-page TOC, version badges, previous/next navigation
- Use semantic HTML and accessible navigation
- Keep performance high and visual style restrained

Information architecture:
- Home
- Start Here
- Pre-Installation
- Common Tasks
- Install Phases 1–10
- Merge & Patch
- MCM Setup
- Finishing Line
- Mod Index
- Tools
- Changelog
- Appendix

Design direction:
- Dark fantasy editorial tone
- Feels like a technical codex/manual, not a generic SaaS template
- Restrained palette: charcoal, parchment, muted gold accent
- Serif display + highly readable sans body
- Sticky sidebar docs navigation
- Strong heading hierarchy
- Excellent scanning for warnings and numbered instructions

Engineering requirements:
- Create a data/content model before writing pages
- Build reusable layouts first
- Separate platform components from content files
- Generate sample content for Home, Pre-Installation, one Install Phase, one Tool page, and Changelog
- Add SEO metadata support and Open Graph basics
- Add clear folder structure and explain architecture decisions in README

Deliverables:
1. Full folder structure
2. Working app scaffold
3. Reusable components
4. Sample content files
5. README with authoring workflow
6. Notes for how to add future mod pages and guide phases
```


## Second prompt

After the foundation is built, use this prompt:

```text
Refactor the current Ninth Path docs app into a maintainable documentation platform.

Tasks:
- Add a strict content schema for guides, mods, tools, and changelog entries
- Add autogenerated sidebar navigation from content metadata
- Add autogenerated on-page table of contents from headings
- Add search across page title, section headings, mod names, and tools
- Add alert variants: note, warning, critical, success
- Add version badges and “last updated” metadata
- Add a mod index page with filter by category and install phase
- Add previous/next page navigation based on sequence
- Add breadcrumb support
- Add a home page hero that clearly explains scope, difficulty, estimated install time, and start action
- Keep visuals restrained and readable
- Avoid generic feature-card SaaS layouts
```


## Engineering guardrails

Give your agent these explicit anti-patterns to avoid:

- No marketing-style 3-card feature grid as the main body pattern.[^1_1]
- No heavy gradients, glows, neon fantasy, or “AI template” sections.[^1_1]
- No giant hero followed by generic filler content.
- No hardcoded content inside page components when it belongs in content files.
- No buried warnings; warnings must interrupt the reading flow visually.
- No unstructured single giant install page; break phases into manageable chapters.


## Recommended folder structure

A practical project structure would be:

```text
ninth-path/
  app/
    (marketing)/
    docs/
      [[...slug]]/
        page.tsx
    layout.tsx
    globals.css
  components/
    docs/
      sidebar.tsx
      toc.tsx
      pager.tsx
      breadcrumbs.tsx
      alert.tsx
      step-list.tsx
      mod-card.tsx
      tool-card.tsx
    ui/
  content/
    guides/
    tools/
    mods/
    changelog/
  lib/
    content.ts
    search.ts
    navigation.ts
    seo.ts
  public/
    images/
    icons/
  styles/
    tokens.css
  README.md
```


## Final recommendation

The smartest path is to have Antigravity build **The Ninth Path as a docs engine first and a Skyrim guide second**. Lexy’s site works because it is operationally organized, heavily segmented, and built around exact task execution across many pages, not because it has fancy visuals.[^1_3][^1_2][^1_1]

Your edge should be this: keep the same guide discipline, but modernize the UX with stronger search, cleaner content modeling, better mobile handling, and a more intentional visual system for your own brand.[^1_1]

Would you like me to turn this into a **full master build spec** for Antigravity, including page-by-page requirements, component specs, and acceptance criteria?
<span style="display:none">[^1_10][^1_11][^1_12][^1_13][^1_14][^1_6][^1_7][^1_8][^1_9]</span>

<div align="center">⁂</div>

[^1_1]: https://www.youtube.com/watch?v=hualYAyCkSE

[^1_2]: https://lexyslotd.com/guide/mcm-setup/

[^1_3]: https://lexyslotd.com/guide/preinstallation-instructions/

[^1_4]: https://lexyslotd.com/guide/changelog/

[^1_5]: https://lexyslotd.com/guide/finishing-line/

[^1_6]: https://www.youtube.com/watch?v=kM07JUvEftg

[^1_7]: https://www.youtube.com/watch?v=JvQjlCJ8r4M

[^1_8]: https://www.youtube.com/watch?v=pxmwcp0ayao

[^1_9]: https://www.reddit.com/r/skyrimmods/comments/kv3fd0/is_lexys_lotd_guide_and_all_its_recommendations/

[^1_10]: https://www.youtube.com/playlist?list=PLNbiTtPWgJTtaLd3FW-scZmjwgiMYJKZW

[^1_11]: https://www.youtube.com/watch?v=K9afce8oMpI

[^1_12]: https://www.reddit.com/r/skyrimmods/comments/d3figf/i_have_made_a_guide_for_wabbajack_lexys_lotd_from/

[^1_13]: https://www.youtube.com/watch?v=Re_lu3Peh5o

[^1_14]: https://www.youtube.com/watch?v=Qml-AXzNQN0


---

# This looks great but please turn this into a full master build spec for Antigravity, including page-by-page requirements, component specs, and acceptance criteria

Absolutely — below is a full master build spec you can hand to Antigravity as the primary implementation brief. It is designed around the same documentation strengths that make Lexy’s guide effective: a workflow-first homepage, strong warning language, chapterized install pages, a persistent guide menu, clear previous/next navigation, and changelog-driven maintenance for a large mod list.[^2_1][^2_2][^2_3]

## Product brief

**The Ninth Path** is a production-grade documentation website for a Skyrim mod build that includes all mods in Lexy’s LOTD ecosystem plus your own install presentation and brand identity. The site should function as a structured operational guide, not a marketing page, because Lexy’s model works by guiding users through a long, multi-session installation process with explicit expectations, tool familiarity, sequential phases, and update discipline.[^2_2][^2_3][^2_1]

The website must be engineered as a reusable docs platform with content schemas, generated navigation, and support for ongoing updates because Lexy’s guide is actively maintained, chapterized into many install parts, and paired with a formal changelog/update workflow.[^2_3][^2_1]

## Vision and goals

The site should help users:

- Understand the build’s scope, difficulty, hardware demand, and time commitment before starting.[^2_1]
- Move through the setup in a strict, chapter-by-chapter sequence.[^2_2][^2_3]
- Find tool instructions, mod entries, MCM configuration, finishing steps, and update notes quickly.[^2_3][^2_1][^2_2]
- Search mods, tools, pages, headings, and troubleshooting topics from one place.[^2_1][^2_3]

Primary product goals:

- Make a huge mod build feel navigable.
- Reduce user error through structure and visual emphasis.
- Support long-term maintenance without rewriting layouts.
- Create a visual identity for “The Ninth Path” that is distinct from Lexy while preserving documentation effectiveness.[^2_2][^2_1]


## Constraints

This spec should explicitly instruct Antigravity to:

- Use Lexy’s site as a **reference for structure and documentation behavior**, not as a source for copied code, copied text, or cloned visual branding.[^2_3][^2_1][^2_2]
- Avoid generic SaaS section patterns and instead optimize for docs-style reading, scanning, and procedural execution.[^2_2]
- Assume the guide will evolve often, so content must be data-driven and versioned.[^2_1][^2_3]


## Technical architecture

Recommended implementation stack:

- Next.js App Router
- TypeScript
- MDX or schema-backed Markdown content
- Tailwind plus CSS variables or a tokenized CSS system
- Static generation where possible
- Local search index for docs content
- Accessible semantic HTML
- Dark/light mode
- No CMS dependency required at initial launch

Rationale:

- The content is multi-page, deeply structured, and maintained over time, which matches a content-collection architecture better than handcrafted static pages.[^2_3][^2_1]
- Lexy’s guide demonstrates the need for chapterized navigation, page sequencing, and explicit update flows, all of which benefit from structured metadata and route generation.[^2_2][^2_3]


## Content model

The platform must be built around structured content.

### Core schemas

#### GuidePage

```ts
type GuidePage = {
  id: string
  slug: string
  title: string
  shortTitle?: string
  section: 'home' | 'start' | 'preinstall' | 'common-tasks' | 'install' | 'merge-patch' | 'mcm' | 'finishing' | 'appendix' | 'changelog' | 'faq'
  sequence?: number
  description: string
  estimatedTime?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  prerequisites?: string[]
  relatedTools?: string[]
  relatedMods?: string[]
  versionScope?: string
  lastUpdated: string
  status: 'draft' | 'reviewed' | 'published'
}
```


#### StepBlock

```ts
type StepBlock = {
  id: string
  guidePageId: string
  order: number
  title: string
  body: string
  bullets?: string[]
  warnings?: AlertBlock[]
  notes?: AlertBlock[]
  screenshots?: string[]
  codeOrIni?: CodeSample[]
}
```


#### ModEntry

```ts
type ModEntry = {
  id: string
  name: string
  slug: string
  category: string
  installPhase: number | null
  sourceUrl: string
  sourceType: 'Nexus' | 'GitHub' | 'Direct'
  versionPinned?: string
  fileType?: 'Main' | 'Update' | 'Optional' | 'Misc'
  tags?: string[]
  toolDependencies?: string[]
  specialInstructions?: string[]
  fomodInstructions?: string[]
  required: boolean
}
```


#### ToolEntry

```ts
type ToolEntry = {
  id: string
  name: string
  slug: string
  purpose: string
  downloadUrl?: string
  versionPinned?: string
  usedInSections: string[]
  installNotes?: string[]
}
```


#### ChangelogEntry

```ts
type ChangelogEntry = {
  id: string
  version: string
  date: string
  summary: string
  breakingChanges?: string[]
  added?: string[]
  removed?: string[]
  updated?: string[]
  affectedPages?: string[]
}
```


#### AlertBlock

```ts
type AlertBlock = {
  type: 'note' | 'warning' | 'critical' | 'tip' | 'success'
  title?: string
  content: string
}
```


## Information architecture

Lexy’s guide exposes a strong top-level navigation pattern with Welcome, Common Task Instructions, Mod Installation, “Now We Make It Work,” Changelog, and Appendices, while the guide menu breaks the install into numbered parts plus finishing pages and archives.  The Ninth Path should preserve that operational logic, with the following top-level IA.[^2_1][^2_3]

### Primary routes

| Route | Purpose | Notes |
| :-- | :-- | :-- |
| `/` | Home | Scope, warnings, hardware, time, start CTA. [^2_1] |
| `/start-here` | Start rules | Read-first page, support boundaries, learning expectations. [^2_1] |
| `/pre-installation` | Environment prep | Fresh game, tools, file system, backups, prerequisites. [^2_1] |
| `/common-tasks` | Reusable instruction library | Extraction, CAO, xEdit basics, MO2 patterns. [^2_1][^2_2] |
| `/install/part-1` to `/install/part-10` | Main install chapters | Mirrors Lexy’s numbered segmentation. [^2_3] |
| `/merge-patch` | Integration workflows | zMerge, xEdit, Synthesis, conflict resolution. [^2_3] |
| `/finishing-line` | Final generation and validation | Final tools, tests, first boot. [^2_4][^2_3] |
| `/mcm-setup` | In-game post-install setup | MCM instructions and presets. [^2_5] |
| `/mod-index` | Master mod directory | Search/filter/sort all included mods. |
| `/tools` | Tool reference | Tool install and usage notes. [^2_1] |
| `/changelog` | Update workflow and history | Operational updates, version notes. [^2_3] |
| `/appendix` | Reference material | Glossary, FAQ, compatibility, naming rules. [^2_3] |
| `/faq` | Common support questions | Launch blockers, scope, versioning. |

## Page-by-page requirements

### 1. Home

Lexy’s homepage immediately sets expectations: the guide is large, actively maintained, technically demanding, and time-intensive, and it recommends that users read everything before starting.  Your homepage should do the same in a more modern form.[^2_1]

Required sections:

- Hero with title, subtitle, build identity, and “Begin Pre-Installation” CTA
- Build status strip, version, target Skyrim version, last updated
- Scope statement: what Ninth Path is and is not
- Severity/warning callout about complexity and time investment
- Hardware expectations and storage requirements
- Recommended knowledge/tools
- “Read all pages before starting” section
- Guide path preview, showing full install journey
- Support/community section
- Footer with key links

Acceptance criteria:

- User can understand the build’s scope in under 20 seconds.[^2_1]
- Primary CTA is visible above the fold.
- Complexity warning is impossible to miss.[^2_1]
- There is exactly one dominant primary action.


### 2. Start Here

Purpose:

- Orient the user before touching mods.
- Explain who this guide is for.
- Explain support boundaries for off-guide changes, which Lexy also emphasizes clearly.[^2_1]

Required sections:

- Who this guide is for
- Who should not use it
- Required mindset and process discipline
- Support boundaries
- “Do not deviate during first install”
- Recommended learning resources
- Next-step CTA to pre-installation

Acceptance criteria:

- User knows whether they are ready to proceed.
- Page includes at least one critical warning and one note callout.
- Navigation points directly to the next page.


### 3. Pre-Installation

Lexy’s pre-install content exists to prepare the base environment before mod installation begins.  Your version should formalize this as a systems setup page.[^2_6][^2_1]

Required sections:

- Fresh Skyrim install expectations
- Folder placement strategy
- Steam settings / game version notes
- Antivirus or Defender exclusions where relevant
- Tool installation checklist
- Mod Organizer 2 base setup
- Backup practices
- Validation checklist before continuing

Acceptance criteria:

- Page is organized as a checklist with completion-friendly structure.
- Each prerequisite has pass/fail wording.
- End of page includes a “Ready to continue” validation block.


### 4. Common Tasks

Lexy refers users back to reusable actions such as extracting BSAs, using CAO, conversion patterns, and MO2-related handling.  This should be the shared instruction library for every recurring operation.[^2_2]

Required sections:

- How to install main/update/optional files
- How to process tagged mods
- MO2 separators and list management
- BSA extraction
- CAO processing
- Manual file edits
- INI/TOML changes
- Backup and restore workflow

Acceptance criteria:

- Every common task is linkable by anchor.
- Install pages can reference these tasks without repeating long prose.
- Each task includes prerequisites, steps, common failures, and expected outcome.


### 5. Install Part pages

Lexy splits mod installation into many numbered chapters and organizes each around repeated mod cards, instructions, special steps, and tool-specific notes.  This is the most important page family in the entire product.[^2_3][^2_2]

Required structure for each install page:

- Page title
- Short intro for the phase
- Estimated time
- Required prior completion
- Major category groupings within the phase
- Repeated mod blocks
- FOMOD instructions where applicable
- Special instruction blocks
- Links to common task anchors
- “Checkpoint complete” section
- Previous/next navigation


#### Standard mod block fields

- Mod name
- Source link
- Version
- File type: Main / Update / Optional / Misc
- Tags: SKSE DLL, LOOT, Pandora, SPID, etc., similar to Lexy’s labels.[^2_2]
- Summary
- FOMOD instructions
- Special instructions
- Related dependencies

Acceptance criteria:

- A user can distinguish normal install instructions from special instructions at a glance.[^2_2]
- File-type handling is visually separated because Lexy relies on this distinction heavily.[^2_2]
- Long pages retain persistent in-page navigation.
- Each mod block is machine-readable from content data.


### 6. Merge \& Patch

Lexy has a dedicated “Now We Make It Work” stage and references merge/update regeneration processes in the changelog workflow.  Your equivalent should centralize all post-install integration workflows.[^2_3][^2_1]

Required sections:

- Overview of why patching exists
- Ordered list of patch/merge tasks
- Tool-by-tool subsections
- Safety notes before regeneration
- Output placement rules
- Validation and expected artifacts
- Troubleshooting matrix

Acceptance criteria:

- The page is sequenced and not just a knowledge dump.
- Every tool subsection has inputs, outputs, and failure states.
- Clear dependencies are listed between tasks.


### 7. Finishing Line

Lexy’s finishing page includes final ordering, generation tools, and last-mile steps before gameplay.  Your finishing page should act as the release gate.[^2_4]

Required sections:

- Enable/disable final groups
- Load order validation
- TexGen / DynDOLOD / xLODGen / other generators
- Generated output placement
- Last pass checks
- Launch preparation
- Final smoke-test list

Acceptance criteria:

- User can complete a first successful launch using only this page plus linked dependencies.
- Final validation checklist exists as a distinct component.
- Every generated artifact has a destination rule.


### 8. MCM Setup

Lexy dedicates a full page to MCM settings and warns users to expect meaningful time investment for it.  Your page should be structured for in-game configuration efficiency.[^2_5]

Required sections:

- Before launch notes
- Before first save notes
- MCM order guidance
- Per-mod setting tables
- Preset import instructions where relevant
- Verification screenshots or state descriptions
- Completion checklist

Acceptance criteria:

- Settings are displayed in table or checklist form for fast scanning.
- Every MCM subsection names the mod clearly.
- User can tell which options are defaults and which are custom recommendations.


### 9. Mod Index

Purpose:

- Provide the searchable single source of truth for every included mod.
- Extend Lexy’s install-page style into a reference layer.[^2_3][^2_2]

Required features:

- Search by mod name
- Filter by install phase
- Filter by category
- Filter by tag
- View dependencies
- Deep-link to owning install page

Acceptance criteria:

- Search returns results under 100ms for a static dataset target.
- Each mod links to its install context.
- Empty states explain how to broaden the search.


### 10. Tools

Lexy’s homepage explicitly calls out tools users should generally know before starting, including MO2, LOOT, CAO, Creation Kit, xEdit, zMerge, Wrye Bash, zEdit, xLODGEN, DynDOLOD, and Synthesis.  Your tools area should make those dependencies discoverable and understandable.[^2_1]

Required sections:

- Tool purpose
- Download/source link
- Version guidance
- Where used in the guide
- Minimal setup notes
- Known pitfalls

Acceptance criteria:

- A user can understand why a tool exists in the build process.
- Each tool page lists related guide pages.
- Tool cards can be embedded elsewhere.


### 11. Changelog

Lexy’s changelog is not just historical; it is procedural, telling users how to update an existing build and what regeneration steps are required.  Your changelog must support the same operational use.[^2_3]

Required sections:

- “How to update” workflow at top
- Latest release
- Archived releases
- Breaking changes
- Added / removed / updated lists
- Affected page links
- Rebuild/regeneration requirements

Acceptance criteria:

- Latest release is visible at top without scrolling far.
- Each entry links to affected pages.
- Update workflow is independent from release notes and easy to find.


### 12. Appendix

Purpose:

- Hold reference material that supports the guide without interrupting the main install flow.
- Similar to Lexy’s appendix and related references.[^2_3]

Suggested content:

- Glossary
- Naming conventions
- Troubleshooting codes
- File path conventions
- Compatibility notes
- Recommended reading order
- Credits

Acceptance criteria:

- Reference content is searchable.
- Appendix pages can be linked from anywhere.
- It does not contain core install steps that should live elsewhere.


## Layout specification

### Global shell

Required layout:

- Sticky top header
- Left sidebar navigation on desktop
- Main content column
- Right-side “On this page” TOC on large screens
- Responsive single-column fallback on mobile
- Footer with key external links

Behavior requirements:

- Sidebar highlights current page
- TOC highlights current heading on scroll
- Prev/next pager appears at end of guide pages, as Lexy does.[^2_3][^2_1]
- Breadcrumbs appear on all non-home pages, similar to Lexy’s “You are here” pattern.[^2_2][^2_3]

Acceptance criteria:

- No layout shift when TOC activates.
- Sidebar remains usable on long pages.
- Mobile nav opens/closes with full keyboard support.


## Component specifications

### Header

Includes:

- Ninth Path logo
- Primary nav
- Search trigger
- Theme toggle
- Version badge

Acceptance:

- Sticky behavior
- Header height consistent across routes
- Search is accessible via click and keyboard shortcut


### SidebarNav

Includes:

- Grouped guide sections
- Current page highlight
- Optional collapse for sub-sections

Acceptance:

- Generated from metadata
- Supports nested install parts
- Keyboard navigable


### Breadcrumbs

Includes:

- Home > Section > Current page

Acceptance:

- Auto-generated from route metadata
- Hidden visually only when redundant, never removed semantically


### PageHero

Includes:

- Title
- Description
- Metadata row
- Page status / updated date

Acceptance:

- Used on all core page types
- Supports optional warning band below metadata


### AlertBlock

Variants:

- Note
- Warning
- Critical
- Tip
- Success

Acceptance:

- Distinct iconography/color/tone
- Critical is visually strongest
- Must be usable inline inside MDX


### StepList

Purpose:

- Render ordered procedural steps

Acceptance:

- Numbered automatically
- Supports nested notes inside steps
- Linkable per step


### ModCard

Fields:

- Name
- Version
- File type
- Category/tag badges
- Summary
- Source link
- Instructions
- Dependencies
- Related tasks

Acceptance:

- Collapsible extended instructions optional
- Supports FOMOD block and special instruction block
- Visually distinguishes Main/Update/Optional handling, reflecting Lexy’s install logic.[^2_2]


### ToolCard

Fields:

- Tool name
- Role
- Used in
- Version
- Links

Acceptance:

- Reusable in tool pages and guide sidebars


### OnPageTOC

Purpose:

- Heading navigation for long documents

Acceptance:

- Generated from page headings
- Scroll spy active state
- Hidden on small screens if necessary, but accessible through a substitute entry point


### PrevNextPager

Purpose:

- Sequential guide movement

Acceptance:

- Supports previous/next labels
- Uses guide sequence metadata
- Hidden only on non-sequential reference pages


### SearchModal

Search scopes:

- Pages
- Headings
- Mods
- Tools
- FAQ entries

Acceptance:

- Keyboard accessible
- Returns grouped result types
- Deep-links to exact headings where possible


### ChecklistBlock

Purpose:

- Render validation steps at transition points

Acceptance:

- Reusable on Pre-Installation, Finishing Line, and MCM Setup
- Supports success/failure criteria


## Design direction

The visual system should feel like a technical codex with Skyrim-adjacent atmosphere, but never drift into cheesy fantasy UI. Lexy’s utility comes from readability and structure, not spectacle, so The Ninth Path should preserve content-first clarity while introducing a stronger branded identity.[^2_1][^2_2]

Art direction:

- Dark stone / parchment / iron palette
- Muted gold or desaturated teal accent
- Serif display font for headers
- Highly readable sans body font
- Slightly atmospheric but restrained visuals
- Left-aligned content by default
- Strong hierarchy through typography and spacing

Do not use:

- SaaS-style three-card feature blocks as the main page pattern
- Neon fantasy glows
- Purple AI gradients
- Generic startup copy
- Decorative clutter that competes with instructions


## Interaction requirements

Required behaviors:

- Search modal shortcut
- Copy link for headings
- Expand/collapse long notes
- Sticky TOC on desktop
- Responsive sidebar drawer on mobile
- Theme toggle
- Smooth but restrained transitions
- Reading progress indicator on long pages

Acceptance criteria:

- No interaction depends on hover alone
- All interactive controls are keyboard accessible
- Reduced-motion mode disables non-essential animation


## Search requirements

Searchable content types:

- Page titles
- Section headings
- Mod names
- Tool names
- Alert titles
- FAQ entries

Result behavior:

- Exact match priority for mod names
- Heading deep-links
- Typed badges for result category
- Keyboard arrow navigation
- Enter opens selected result

Acceptance criteria:

- Search index generated at build time
- Search works offline for statically served content
- Empty results provide suggestions


## SEO and metadata

Required:

- Unique page titles
- Unique meta descriptions
- Open Graph basics
- Canonical URLs
- Structured breadcrumbs if practical
- “Last updated” metadata exposed in UI

Acceptance criteria:

- Every published page has metadata fields
- Social preview works for Home and major guide pages


## Accessibility requirements

Required:

- Semantic HTML landmarks
- One H1 per page
- Logical heading structure
- Visible focus states
- 44x44 minimum tap targets
- Proper labels for buttons and toggles
- Sufficient contrast in both themes
- Skip-to-content link
- Table accessibility for MCM/settings pages

Acceptance criteria:

- Entire site operable by keyboard
- Alert variants announced meaningfully
- Search modal traps and returns focus correctly


## Performance requirements

Required:

- Static generation wherever possible
- Deferred non-critical JS
- Lazy-load heavy images
- Efficient search index
- No unnecessary client-side hydration for purely static sections

Acceptance criteria:

- Documentation pages render quickly on mobile
- Core content visible without waiting for large scripts
- Long pages scroll smoothly


## Content authoring rules

Antigravity should also generate a README or contributing guide with these rules:

- Each guide page must have frontmatter metadata
- Every major step must include an expected outcome
- Every high-risk action should include a warning or troubleshooting note
- Repeated procedures belong in Common Tasks, not duplicated across pages
- Mod entries should be normalized and reused across views
- Release notes must list affected pages and regeneration requirements


## Data seeding requirements

Initial scaffold content should include:

- Home
- Start Here
- Pre-Installation
- Common Tasks
- Install Part 1
- Merge \& Patch
- Finishing Line
- MCM Setup
- Tools overview
- Changelog overview
- Appendix overview
- At least 20 seeded sample mod entries
- At least 8 seeded tool entries

Acceptance criteria:

- App is navigable end-to-end with seeded content
- Install Part 1 demonstrates full component richness
- Search indexes seeded data correctly


## Delivery milestones

### Milestone 1: Foundation

Deliver:

- App scaffold
- Theme
- Layout shell
- Header/sidebar/footer
- Routing structure
- Typography and tokens

Acceptance:

- All primary routes exist
- Desktop/mobile shell works
- Dark/light mode works


### Milestone 2: Content engine

Deliver:

- Schemas
- MDX/content collections
- Navigation generation
- TOC generation
- Pager generation

Acceptance:

- Pages render from content metadata
- Sidebar and prev/next are automatic


### Milestone 3: Core components

Deliver:

- Alert blocks
- Step lists
- Mod cards
- Tool cards
- Checklists
- Breadcrumbs
- Search modal

Acceptance:

- Components render from content
- Accessible behavior verified


### Milestone 4: Core pages

Deliver:

- Home
- Start Here
- Pre-Installation
- Common Tasks
- Install Part 1
- Tools overview
- Changelog overview

Acceptance:

- User can begin a guided path through the site
- Search finds seeded content


### Milestone 5: Expanded docs

Deliver:

- Remaining install page templates
- Merge \& Patch
- Finishing Line
- MCM Setup
- Appendix
- FAQ
- Mod Index

Acceptance:

- Full documentation platform shape is complete


### Milestone 6: Polish and QA

Deliver:

- SEO metadata
- Error states
- Empty states
- Reduced motion
- Mobile QA
- Readability pass
- Final documentation

Acceptance:

- No broken links
- No inaccessible controls
- No pages with placeholder copy


## Definition of done

The Ninth Path is complete when:

- The docs platform can render all guide chapters from structured content.
- Users can move sequentially through the guide with breadcrumbs, sidebar nav, TOC, and prev/next controls.[^2_3][^2_2]
- Search works across pages, headings, mods, and tools.
- Install pages clearly distinguish normal instructions, warnings, FOMOD steps, and special instructions, matching the procedural clarity Lexy uses.[^2_2]
- The site includes an update workflow and historical changelog model, as Lexy’s guide does.[^2_3]
- The visual language is clearly original to The Ninth Path while preserving the strengths of a serious Skyrim modding documentation experience.[^2_1][^2_2]


## Master prompt for Antigravity

```text
You are a senior staff-level software engineer, frontend architect, and documentation-platform designer.

Build a production-grade documentation website called “The Ninth Path” for a Skyrim mod build guide. Use Lexy’s LOTD site only as a reference for documentation flow, content architecture, and procedural usability. Do not clone its code, copy its text, or reproduce its branding.

Product goal:
Create a modern, maintainable, content-driven docs platform for a very large Skyrim mod list with chapterized install instructions, strong warning UX, tool references, mod references, MCM setup, finishing workflows, changelog support, and search.

Core product requirements:
- Build with Next.js App Router + TypeScript
- Use structured content collections or MDX with frontmatter schemas
- Support static generation where practical
- Implement a responsive docs layout:
  - sticky header
  - left sidebar navigation
  - main content column
  - right-side “On this page” table of contents on large screens
- Implement dark/light mode
- Implement local documentation search
- Implement generated breadcrumbs, sidebar nav, and previous/next pager from metadata

Required routes:
- /
- /start-here
- /pre-installation
- /common-tasks
- /install/part-1 through /install/part-10
- /merge-patch
- /finishing-line
- /mcm-setup
- /mod-index
- /tools
- /changelog
- /appendix
- /faq

Content/data models required:
- GuidePage
- StepBlock
- ModEntry
- ToolEntry
- ChangelogEntry
- AlertBlock

Required reusable components:
- Header
- SidebarNav
- Breadcrumbs
- PageHero
- AlertBlock (note, warning, critical, tip, success)
- StepList
- ModCard
- ToolCard
- OnPageTOC
- PrevNextPager
- SearchModal
- ChecklistBlock

Design direction:
- Content-first technical codex feel
- Skyrim-adjacent but restrained
- Dark stone / parchment / iron palette
- Muted gold or desaturated teal accent
- Serif display + readable sans body
- Avoid generic SaaS feature-grid aesthetics
- Avoid neon fantasy, glows, AI gradients, and filler marketing sections

Behavior requirements:
- Copy-link anchors for headings
- Keyboard-accessible search modal
- Responsive sidebar drawer on mobile
- Scroll-spy active TOC
- Reading progress indicator on long pages
- Reduced-motion support
- Semantic HTML and strong accessibility

Content requirements:
- Seed the project with real scaffold content for:
  - Home
  - Start Here
  - Pre-Installation
  - Common Tasks
  - Install Part 1
  - Merge & Patch
  - Finishing Line
  - MCM Setup
  - Tools overview
  - Changelog overview
  - Appendix overview
- Seed at least 20 sample ModEntry records and 8 sample ToolEntry records
- Make ModCard and ToolCard fully data-driven
- Ensure install pages support version badges, file type badges, tags, FOMOD instructions, special instructions, and links to common tasks

Authoring and maintenance requirements:
- Create a README that explains:
  - project architecture
  - folder structure
  - content authoring workflow
  - how to add guide pages
  - how to add mods/tools
  - how navigation is generated
  - how changelog entries are managed

Acceptance criteria:
- Full route scaffold exists
- Search works across page titles, headings, mods, and tools
- Sidebar and pager are generated from metadata
- Install Part 1 demonstrates the complete page/component system
- UI is accessible, responsive, and content-first
- No placeholder marketing fluff
- No copied source text from Lexy’s site

Deliverables:
1. Full project scaffold
2. Content schemas and seeded content
3. Reusable component system
4. Working docs navigation and search
5. README with maintenance guidance
6. Clear TODO markers for remaining content expansion
```

Would you like me to turn this next into a **developer handoff package** with:

1. exact folder/file tree,
2. sample frontmatter schemas,
3. sample MDX for one install page,
4. and a second Antigravity prompt just for the search + content engine?
<span style="display:none">[^2_10][^2_11][^2_12][^2_13][^2_14][^2_15][^2_16][^2_17][^2_18][^2_7][^2_8][^2_9]</span>

<div align="center">⁂</div>

[^2_1]: https://www.youtube.com/watch?v=kM07JUvEftg

[^2_2]: https://www.youtube.com/watch?v=JvQjlCJ8r4M

[^2_3]: https://www.youtube.com/watch?v=pxmwcp0ayao

[^2_4]: https://lexyslotd.com/guide/finishing-line/

[^2_5]: https://lexyslotd.com/guide/mcm-setup/

[^2_6]: https://lexyslotd.com/guide/preinstallation-instructions/

[^2_7]: https://lexyslotd.com

[^2_8]: https://lexyslotd.com/guide/mod-installation-part-4/

[^2_9]: https://www.youtube.com/watch?v=K9afce8oMpI

[^2_10]: https://staging.lexyslotd.com/guide/mcm-setup/

[^2_11]: https://lexyslotd.com/guide/credits/

[^2_12]: https://staging.lexyslotd.com/guide/credits/

[^2_13]: https://lexyslotd.com/faqs/

[^2_14]: https://www.reddit.com/r/skyrimmods/comments/eliz2q/2020_guide_mods_mnikjom_yashed_guide_darkladylexy/

[^2_15]: https://staging.lexyslotd.com/guide/mod-installation-part-4/

[^2_16]: https://lexyslotd.com/guide/mod-installation-part-1/

[^2_17]: https://lexyslotd.com/guide/changelog/

[^2_18]: https://lexyslotd.com/changelogs/7th-june-2024/

