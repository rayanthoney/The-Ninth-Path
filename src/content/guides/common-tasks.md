---
title: Common Tasks
slug: common-tasks
section: common-tasks
sequence: 3
description: Reusable documentation for recurring tasks such as extracting BSA files, using Cathedral Assets Optimizer, and cleaning plugins.
estimatedTime: 30 mins
difficulty: advanced
lastUpdated: 2026-05-26
---

This section acts as a library of recurring procedures. In subsequent parts of the guide, you will be directed back to these instructions by anchor links rather than having the steps repeated.

## BSA Extraction

Some mods are packaged with `.bsa` archives. For specific mods, we will extract their contents to edit meshes/textures or to allow other mods to overwrite them cleanly.

1. Open Mod Organizer 2.
2. In the right pane, click on the **Archives** tab.
3. Locate the mod's `.bsa` file.
4. Right-click and choose **Extract**.
5. Save the output to a new folder inside your `MO2/mods` folder, matching the name of the original mod with a ` (BSA Extracted)` suffix.
6. Disable the original BSA in the Archives tab once extracted.

## Cathedral Assets Optimizer (CAO)

We use CAO to optimize old textures and meshes to avoid engine bottlenecks.

> [!WARNING]
> **Incorrect CAO Settings**
> Applying CAO with incorrect settings can corrupt animations or make meshes completely invisible in-game. Ensure you double-check your profiles.

### Optimization Steps:
1. Open **Cathedral Assets Optimizer** via MO2.
2. Select the **Skyrim SE** profile.
3. Check the following boxes:
   - *Textures*: Clean, Optimize, Resize (if desired)
   - *Meshes*: Clean, Optimize, Update tangent spaces
4. Select the target directory (the mod you wish to optimize).
5. Click **Run**. Wait for the status bar to show "Done".

## Clean Plugins with xEdit

Cleaning dirty edits from official DLC and third-party plugins is critical for list stability.

1. Launch **SSEEditQuickClean** via Mod Organizer 2.
2. Select the single plugin you wish to clean (e.g., `Update.esm`).
3. Click OK. The utility will automatically run the cleaning filters (removing identical-to-master records and undeleting references).
4. Close the window when the process finishes and save the plugin.
