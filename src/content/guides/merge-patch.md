---
title: Merge & Patch
slug: merge-patch
section: merge-patch
sequence: 5
description: Conflict resolution procedures, zMerge operations, and synthesis runs to unite the modlist.
estimatedTime: 1 hour
difficulty: advanced
lastUpdated: 2026-05-26
---

With all mods installed, we now merge plugins to bypass the Skyrim 254 ESP limit and run conflict resolution tools.

## The Plugin Limits
- **ESM/ESP**: Limit is 254 active plugins.
- **ESL/ESPFE**: Limit is 4096 active light plugins.

We use **zMerge** to combine older or smaller ESP plugins into a unified ESM/ESP file.

<ToolCard id="zmerge" />

### Merge Instructions:
1. Open **zMerge** (part of zEdit) through MO2.
2. Click **Create Merge**. Name it `The Ninth Path - Armor and Weapons Merge`.
3. Under the plugins tab, select the weapon and armor plugins listed in the guide.
4. Click **Build**.
5. Once built, close zMerge. Enable the newly generated merge folder in the left pane of MO2, and disable the individual merged plugins.

## SSEEdit Patching

<ToolCard id="xedit" />

1. Run **SSEEdit** via MO2.
2. Select all files and click OK.
3. Once the background loader finishes, right-click any plugin and select **Apply Filter for Conflicts**.
4. Check the conflict zones and resolve errors manually or by running our custom resolution script.
