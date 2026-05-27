---
title: Common Tasks Instructions
slug: common-tasks
section: common-tasks
sequence: 2
description: Essential guidelines on English language support, anti-piracy policies, mod tags, installation rules, FOMOD selections, Nexus archives, BSA extraction, and old plugin conversions.
estimatedTime: 45 mins
difficulty: intermediate
lastUpdated: 2026-05-26
---

# Common Tasks Instructions

Before you begin setting up your environment or downloading files, it is crucial to understand the rules, tag conventions, and procedures used throughout this guide.

---

## The Journey Begins

The Journey of a Thousand Plugins begins with a single click. There are two final and very important, specific notes that we have saved for this point.

> [!IMPORTANT]
> **English Language Support Only**
> The Guide does not support installations of Skyrim that do not use the English Language.
>
> - DarkLadyLexy and the vast majority of her team are native English speakers. That is the setup they use when updating and maintaining this guide.
> - While we understand that many of you might speak and play games in your native languages, we do not have staff who can translate and maintain the required changes to all the patches the Guide provides. We simply cannot do it.
> - We apologize if this offends, but it is not a matter of "will not" but "can not".

> [!CRITICAL]
> **Anti-Piracy Policy**
> We DO NOT and WILL NOT support software piracy in any form, including mod piracy.
>
> - This includes providing links to mod files that have been hidden, deleted, or otherwise completely removed from mod file sites.
> - *Note on Archived Files:* This does NOT include "Archived Files" on the Nexus. There is a legal way to obtain these files (as detailed below), and it is not piracy. This was determined after discussions with Nexus staff.
> - If you are on the Discord Server and are found to be using a pirated game, operating system, or any other tool/file, you will be banned. Illegal activity of any kind will not be encouraged or supported.
> - **Game Integrity:** The Guide cannot be properly installed on a cracked or stolen game or system. Almost all pirates caught on the server were identified because the guide failed to install on their cracked base files. **DO NOT DO IT.**

---

## Modification Tag Explanations

The Tags shown below will appear with mods as you install them. Not all of them require immediate action—many are for informational purposes or to help locate specific mod groups. Any action required during installation will be detailed when the time comes.

*For example, many mods have the `LOOT` tag. You do not need to adjust this mod's LOOT rules until directed to do so.*

| Tag | Explanation |
| :--- | :--- |
| `CAO` | Mods that require Cathedral Assets Optimizer processing. |
| `CLASSIC` | Mods that are downloaded from classic Skyrim (Skyrim Legendary Edition). |
| `CREATION KIT RESAVE` | Mods whose ESPs need to be converted to Form 44 in the SSE Creation Kit. |
| `DAR--OAR` | Mods that use Dynamic Animation Replacer or Open Animation Replacer. |
| `ENB` | Mods that use ENB features. |
| `EXTRACT THE BSA` | Mods whose BSAs need to be extracted using Mod Organizer 2's BSA extractor. |
| `LOOT` | Mods that need LOOT rules to be set on the Finishing Line page. |
| `MO2 Removal Tool` | Mods that require processing with the MO2 Removal Tool. |
| `Pandora Behaviour Engine` | Denotes mods that use the Pandora Behaviour Engine. |
| `SKSE DLL` | Denotes a mod that contains an SKSE DLL. |
| `SPID` | Mods that use the Spell Perk Item Distributor Framework. |
| `SkyPatcher` | Mods that require SkyPatcher. |
| `TOOL` | A modding utility to be used during your modding adventure. |
| `xEdit -- Quick Auto Clean` | Mods whose ESPs must be cleaned by xEdit. |
| `Wrye Bash` | Denotes a plugin where Wrye Bash is needed to create a dummy Master or change Masters. |
| `zMerge` | Mods whose ESPs will be merged later using zMerge to reduce the overall ESP count. |

---

## Mod Installation Rules

While installing the guide, keep the following rules in mind:

- **Do Not Test Run Early:** DO NOT try to run the game to "make sure the installation is going well" until directed. Many files rely on other files that are not yet installed. Trust the process. If there are problems at the end, server staff can help correct errors or put you in contact with the right people.
- **Do Not Run LOOT Early:** For your own sanity, DO NOT run LOOT until you reach the **Finishing Line** portion of the install. You will see numerous warnings and errors in the LOOT interface and lose your mind. Trust the process.
- **Deleting Specific Files:** Throughout the Guide, you will find instructions to remove files from a mod. Often, these filenames will include a wildcard (`*`), for example: `helgen reborn.esp\*.tga`. In such cases, this means deleting **ALL FILES** matching that pattern (all files with the `.tga` extension in that folder). These instructions will appear in the `Special Instructions` section.
- **Activation:** Once you have installed a mod, **activate it and its files** in MO2. Future installations of other mods rely on that mod being active in both panes of MO2.

### File-Type Installation Procedures

Depending on the download type, install them into Mod Organizer 2 as follows:

#### 1. Main Files
Install as normal. If the mod page has multiple Main Files to install, install each file as a **separate mod** (change the mod title name of the second file installed) so they are considered two different mods by MO2. This allows you to update each file independently instead of downloading everything again if only one updates.

#### 2. Update Files
These files should be installed into the **same mod listing** as their parent mod. When prompting, tell MO2 to **Merge** the files. This tells MO2 to overwrite the original version with the update.

#### 3. Optional, Miscellaneous, or Old Files
These files must be installed as a **separate mod** in MO2. **DO NOT OVERWRITE** the original mod files.

---

## Guide FOMOD Selections

Throughout the guide, you will install several mods with FOMOD installers.

- Only select options specifically listed in the Guide FOMOD selections.
- Some FOMODs will auto-select items that we do not want installed. **Uncheck** anything not selected or not shown in the Guide FOMOD selections.

> [!WARNING]
> **FOMOD Accuracy**
> Be very careful with these selections—incorrect choices are a leading cause of problems in the late portions of an install. Review your choices multiple times to make absolutely certain.

---

## Nexus Archive Files

Mods are constantly being updated: bugs get fixed, improvements are made, new features appear, and new bugs are found. If a mod has been updated since the guide was updated, the version we list will differ from what is available.

Thanks to Nexus policy, older files can be found in the **Archived Files** tab. They do not have a download button associated with them, but they are still available.

### Option 1: Nexus Mods Sensible Archive (Firefox Addon)
Using the Firefox Extension, archived files can be obtained directly via the mod's archive page:
1. Go to the Nexus Mod Page for the mod you are downloading.
2. Go to the **Files** tab.
3. Click the **File Archive** button at the bottom of the page. *(If the button is missing, add `&category=archived` to the end of the Files tab URL.)*
4. Find the correct version and filename.
5. Download using "Mod Manager Downloader", then click "Start Download" on the following page.

### Option 2: Discord Bot
A custom Discord bot can help locate the version you need:
1. Join the Discord server and navigate to the `#bot-fishing` channel.
2. Type `/nexus help` and follow the bot's prompts to search for the specific version.

### Option 3: Manual Inspect Method
If you cannot use the addon or the bot, use the browser inspector:
1. Go to the Nexus Mod Page -> **Files** tab -> **File Archive** at the bottom.
2. Locate the file you need. Right-click on it and select **Inspect Element**.
3. In the Elements pane, find the line starting with `dt id="file-expander-header-[ID]"` (e.g., `dt id="file-expander-header-317360`). The number is the **FileID**.
4. Construct the download link by changing `ModID` and `FileID` in this URL:
   `https://www.nexusmods.com/skyrimspecialedition/mods/ModID/?tab=files&file_id=FileID`

### Option 4: Discord Search
Perform a quick search in the Discord server's `#FAQ` or `#installation-help` channels; other users have likely faced and resolved the same issue.

### Option 5: Beg and Plead
Reach out in `#installation-help` for assistance from the Help-Desk team.

---

## Extracting BSA Files

A Bethesda Softworks Archive (BSA) file is a compression file type Skyrim uses to store assets. Usually, we leave them alone and allow the game to read them.

However, we extract BSA files in two scenarios:
1. The BSA comes with a "Dummy" plugin (a plugin with no records that exists solely to force the game to load the BSA). We extract the BSA and delete the dummy plugin.
2. The plugin will be merged later, removing its ability to load BSAs.

### Option 1: The Automagical Way (BSA Extractor Plugin)
1. Click the **spanner and screwdriver (Tools)** icon in the top left corner of MO2.
2. Click the **Plugins** tab.
3. Select the **BSA Extractor** plugin.
4. On the right side, make sure the `only_alternate_source` option is set to `false`.

When installing a mod containing a BSA, MO2 will ask if you want to extract it. For mods marked with the `EXTRACT THE BSA` tag, **select YES**, and choose **Yes** to delete the BSA after extraction. For all other mods, select **NO**.

### Option 2: The Manual Way
1. Select the **Archive** tab in the MO2 Right Pane.
2. Scroll to locate the BSA archive associated with the plugin.
3. Right-click the BSA name and select **Extract**.
4. Choose the mod folder name as the destination.
5. Manually delete the original BSA file using File Explorer.

---

## Converting Old Plugins (Form 43 to 44)

Classic Skyrim (LE) plugins use Form 43, while Skyrim Special Edition (SE) uses Form 44. To ensure stability, convert old plugins using the Creation Kit.

### Step 1: Resave in the Creation Kit
1. Verify that your **Overwrite Folder** (listed last in the Left Pane of MO2) is empty.
2. Run the **Creation Kit** via MO2.
3. Go to **File** -> **Data...**
4. Locate the plugin, select **Set as Active File**, and click OK. (Ignore background warnings/errors.)
5. Once loaded, go to **File** -> **Save**.
6. Close the Creation Kit.

### Step 2: Verify with SSEEdit (xEdit)
1. Run **xEdit** via MO2.
2. Right-click the plugin list and choose **Select None**.
3. Find and check the converted plugin, then click OK.
4. Right-click the plugin name in the left panel and select **Check for errors**. Ensure it displays "All done!".
5. Right-click the plugin and select **Sort Masters**.
6. Close xEdit and save.
7. Run the plugin through **xEdit Quick Auto Clean**.

---

## Cathedral Assets Optimizer (CAO)

We use CAO to optimize old textures and meshes. Close MO2 before running CAO.

> [!WARNING]
> **Warning: Close MO2 First**
> Cathedral Assets Optimizer is designed to run OUTSIDE of Mod Organizer. Close MO2 completely before running CAO.

Profiles to use based on the tag:
- **Lexy’s LOTD SE - BSA:** Optimizes meshes and textures, then packs them into a BSA.
- **Lexy’s LOTD SE - No BSA:** Optimizes meshes and textures, leaving them as loose files.
- **Lexy’s LOTD SE - WICO:** Specifically configured for WICO character overhaul optimizations.

### Steps to Run CAO:
1. Close MO2.
2. Run CAO from its installation folder.
3. Select the correct profile matching the mod's instructions.
4. Click **Open Directory** and select the folder of the mod you are optimizing.
5. Click **Log** to preview the process.
6. Click **Run**. Close CAO when complete.
7. Repeat for all files (Main, Optional, and Misc).

---

## Mod Organizer 2 Removal Tool

The MO2 Removal Tool simplifies file cleanup based on the mod tags.
1. Install all files listed in the "Files to Download" section.
2. Select **MO2 Removal Tool** from the MO2 toolbar puzzle icon menu.
3. Input the target mod name (defaults to the last installed mod).
4. Copy and paste the paths to delete (specified in the mod's special instructions).
5. Click **Run** and review the file deletion list.
6. Click **Remove All** (we recommend using the "mohidden" option to rename instead of permanently deleting files).

---

## Wrye Bash (Dummy Masters)

We use Wrye Bash to create a dummy Master to enable loading a plugin into xEdit for cleaning.
1. Run **Wrye Bash** through MO2.
2. Locate the plugin (which will display in red indicating a missing Master).
3. Right-click the plugin and choose **Create Dummy Masters**.
4. Select **Yes** in the pop-up.
5. Verify the new dummy plugin is checked.
6. Exit Wrye Bash and clean the plugin in xEdit.
