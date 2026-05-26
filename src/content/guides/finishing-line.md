---
title: Finishing Line
slug: finishing-line
section: finishing
sequence: 6
description: LOD generation using DynDOLOD, setting custom INI parameters, and performing final verification.
estimatedTime: 1.5 hours
difficulty: advanced
lastUpdated: 2026-05-26
---

This is the final phase of building The Ninth Path. We generate the landscape/object billboards and perform smoke tests.

## LOD Generation with DynDOLOD

Generating distant objects (LODs) matching your exact mod selection ensures immersive horizons without popup.

<ToolCard id="dyndolod" />

### Phase 1: TexGen
1. Open **TexGenx64.exe** via MO2.
2. Leave texture sizes at default (128 for diffuse, 256 for billboards).
3. Select your output folder (e.g. `D:\SkyrimModding\TexGen_Output`).
4. Click **Start**. Wait for completion.
5. Create a mod in MO2 from the output folder and enable it.

### Phase 2: DynDOLOD
1. Open **DynDOLODx64.exe** via MO2.
2. Select all worlds (Skyrim, Solstheim, etc.).
3. Choose the **Medium** preset.
4. Select your output folder (e.g. `D:\SkyrimModding\DynDOLOD_Output`).
5. Click **OK** to run. This may take 20-40 minutes depending on your CPU.
6. Create a mod in MO2 from the output folder and enable it. Place it at the absolute bottom of the left pane.

> [!CRITICAL]
> **Load Order Priority**
> Ensure `DynDOLOD.esm` is placed at the top of your plugin list (right pane) directly below ESM files, and `DynDOLOD.esp` is at the absolute bottom.

## Smoke Testing & Verification

Before running a long playthrough, do a validation launch:
1. Start the game via **SKSE** in MO2.
2. Open the console with `~` and type `coc WhiterunOrigin`.
3. Check the frame rate, inspect textures for seams or purple (missing) assets, and verify that DynDOLOD trees are visible in the distance.

<ChecklistBlock id="finishing-checkpoint" title="Release Gate Checkpoint" items=['LOD billboards generated in TexGen', 'DynDOLOD completed execution successfully', 'DynDOLOD output enabled at bottom of MO2 left pane', 'DynDOLOD.esp at the bottom of load order', 'Smoke test COC load succeeded without crash'] />
