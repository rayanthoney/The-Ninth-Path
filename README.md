# The Ninth Path
*A Skyrim SE/AE Modlist for the Seeker Beyond the Stars*

> *“Eight paths were walked by mortals. The ninth was forged by man becoming god.”*

![Banner](.github/TheNinthPath01.png)

## Contents
- [Preamble](#preamble)
- [List Contents](#list-contents)
- [System Requirements](#system-requirements)

## Preamble

**The Ninth Path** is a lore-heavy, spiritually charged Skyrim SE/AE modlist built around high-stakes choices, fate-bending consequences, and the silent war between divinity and mortality. Inspired by philosophical and esoteric themes, this list invites you to walk a path few have dared — beyond gods, beyond Daedra, beyond time.

If you enjoy:
- Mystical exploration and forgotten truths
- Moral ambiguity and personal consequence
- Prophecy, fate, and the illusion of choice
- Ancient ruins, lost worlds, and impossible timelines

Then *The Ninth Path* was made for you.

---

## List Contents

The full list of mods can be found on [Load Order Library](https://loadorderlibrary.com/lists/the-ninth-path).

A more in-depth look at the mods used can be found in the [gameplay guide](https://github.com/rayanthoney/The-Ninth-Path/blob/main/GAMEPLAYGUIDE.md).

## System Requirements

| Minimum | Recommended |
|-----|-----|
| Intel i5-9400 / AMD Ryzen 5 2600 | Intel i5-13400 / AMD Ryzen 5 5600x  |
| NVIDIA GTX 1060 / AMD RX 580 | NVIDIA RTX 3060 TI / AMD RX 6700 |
| 16 GB DDR3 | 32 GB DDR4 |
| SATA SSD | NVMe SSD |

---

## Web Platform & Developer Documentation

The Ninth Path is accompanied by a modern, content-driven documentation website built using **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

### Directory Structure

```text
src/
  ├── app/                  # Route layouts, pages (Home, Mod Index, Tools Reference)
  ├── components/           # UI elements (Header, Breadcrumbs, Mod/Tool Cards, AlertBlocks)
  ├── content/              # Content data files (Seeded JSON & Markdown guides)
  ├── lib/                  # Search indexing, loader utils, SEO metadata helpers
  └── styles/               # CSS color design tokens
```

### Installation & Development

To run the documentation site locally, ensure you have **Node.js** installed, then execute:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Compile the static production build
npm run build
```

The build command will compile the site to a fully static HTML export inside the `/out` directory, which can be served from any static hosting environment.

### Authoring Workflow

#### 1. Adding/Editing Guide Pages
Create or edit a `.md` markdown file inside `src/content/guides/`. Each file requires the following frontmatter:
```markdown
---
title: Guide Page Title
slug: install/part-2
section: install
sequence: 5
description: A short description of this step.
estimatedTime: 45 mins
difficulty: intermediate
lastUpdated: 2026-05-26
---
```
Use standard markdown or embed custom tags:
*   `<ModCard id="skyui" />` — Injects a full mod details card.
*   `<ToolCard id="dyndolod" />` — Injects a tool configuration block.
*   `<ChecklistBlock id="finish-check" title="Checkpoint Checks" items=['Disable OneDrive', 'Sort load order'] />` — Injects an interactive checklist.
*   `> [!WARNING]` or `> [!CRITICAL]` — Injects stylized warning blocks.

#### 2. Adding Mods or Tools
*   **Mods**: Append a new entry to the JSON array in `src/content/mods.json`.
*   **Tools**: Append a new entry to the JSON array in `src/content/tools.json`.
*   **Changelog**: Add a version history block in `src/content/changelog.json`.

