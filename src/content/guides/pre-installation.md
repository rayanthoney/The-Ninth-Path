---
title: Pre-Installation Instructions
slug: pre-installation
section: preinstall
sequence: 3
description: Initial setup guidelines, Windows paging file configurations, required tools, Mod Organizer 2 setup, BethINI tweaks, SKSE, xEdit cleaning, and ENB preparations.
lastUpdated: 2026-05-26
---

# Pre-Installation Instructions

> [!WARNING]
> **Do Not Skip This Page!**
> Important setup steps are listed on this page that are vital to the proper installation of the Guide. Even if you have done modded installs before, ensure you have followed all of these directions!

---

## Some Reminders

One more time, before we start, in case you missed these vital points:

1. **DO NOT SORT WITH LOOT UNTIL DIRECTED.** LOOT will not sort the Load Order correctly until you complete the installation and will report errors that have not been resolved yet.
2. **DO NOT DEVIATE FROM THE GUIDE INSTRUCTIONS.** Trust the guide's instructions. Don't add or subtract from the Guide. Even things you wouldn't think could cause problems... can.
3. **READ THE NEXUS MOD PAGES.** Many "bug" reports result from players not being aware of the changes the guide made to the game. Changes that were fully intended. Follow the guide’s installation instructions and check the mod pages if they differ. Any requirements that the mod page lists will be covered later in the guide or by an alternative mod.
4. **REFER TO THE [COMMON TASKS PAGE](/docs/common-tasks) FOR:**
   - `EXTRACT THE BSA` Instructions
   - `CREATION KIT RESAVE` Instructions
   - `CAO` Instructions
   - Mod Installation Advice

Keep in mind that this guide will provide a large number of custom-made patches to make the several hundred mods you will be installing play together nicely. Attention to detail is crucial. Take breaks. Walk away. Don't race to the finish line, but set a nice and manageable pace.

---

## Windows Configuration

### 1. Windows File Extensions
First, we need to make sure Windows file extensions are visible:
1. Open **Windows File Explorer**.
2. In the top title bar, select the **View** tab.
3. Make sure **File name extensions** is checked.
4. Close the window.

### 2. The Windows Page File
The Guide (and Skyrim in general) uses a lot of memory and is very CPU intensive. To ensure your system is properly set up to deal with the Page File requirements:
1. Press `Windows + R` on your keyboard.
2. Type in `sysdm.cpl ,3` and then press **ENTER**.
3. In the window that appears, find the "Performance" section and click on **Settings**.
4. Select the **Advanced** tab at the top of the window.
5. Find the "Virtual Memory" section and click on **Change...**
6. Find the **Automatically Manage Paging File Size for All Drives** option. **DISABLE** this setting.
   - *Backup Paging Drive:* If you have more than one drive, you may want to enable this setting for a drive that does not have MO2 or Skyrim installed on it as a backup. It should have at least 15GB of free space. Set this drive to use "System Managed Size".
   - *MO2/Skyrim Drives:* For the drive or drives that contain MO2 and Skyrim, set them to **System Managed**.

### 3. Windows 11 Smart App Control
Windows 11 Smart App Control (SAC) blocks untrusted applications, but will interfere with some of the tools the guide uses. We recommend turning this feature off while installing the guide:
1. Open **Settings** then select **Privacy & security**.
2. Select **Windows Security**.
3. Select **App & browser control**.
4. Select **Smart App Control settings**.
5. Toggle **OFF**.

### 4. Shader Cache (NVIDIA Users Only)
For NVIDIA GPU users, it is recommended to boost the size of your shader cache:
1. Right-click on your desktop and select **NVIDIA Control Panel**.
2. Navigate and click **Manage 3D Settings** in the left pane.
3. Scroll down the Global Settings tab until you see **Shader Cache Size**.
4. Double-click **Driver Default** next to Shader Cache Size and select **10 GB**.
5. Click **Apply** in the bottom right-hand corner.
6. Exit the NVIDIA Control Panel.

---

## The Web Browser

Normally, we don't want to dictate your entire experience of surfing the internet, but in this case, we have to make an exception. 

Browsers that are Chromium-based (Chrome, Opera, Brave, Edge, etc.) do not consistently display FOMOD options correctly on the screen, which can lead to confusion, incorrect mod installation, and other general unpleasantness.

> [!IMPORTANT]
> **Use Firefox for Guide Setup**
> We HIGHLY recommend **NOT** using any Chromium-Based browser when installing the Guide. We instead recommend that you use **Firefox**, which we know for certain will display the FOMODs and other important information correctly. Just for this installation, trust us, it will help.

---

## General Utilities

These base utilities are required for archive extraction and runtime support.

### 7-Zip (Tool)
- **Role:** File compression utility. Download the latest version.
- **Download:** [7-Zip Official](https://www.7-zip.org/)
- **Details:** 64-bit Windows x64.

### Nexus Mods Sensible Archive (Firefox Addon)
- **Role:** Browser utility that enables direct downloads of older archived mod files.
- **Download:** [Sensible Archive Addon](https://addons.mozilla.org/en-US/firefox/addon/nexus-mods-sensible-archive/)
- **Special Instructions:**
  1. Make sure you have installed the Firefox Web browser.
  2. Press the **Add to Firefox** button.
  3. In the pop-up, click the **Add** button, then click OK.
  4. Exit and restart Firefox.

### .NET Framework (Tool)
- **Role:** Developer platform required for Synthesis and Scrambled Bugs.
- **Download:** [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) and [.NET 9.0 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- **Warning:** You need both **.NET v8.0+** and **.NET v9.0+** SDKs for Synthesis to work properly.

### Microsoft Visual C++ Redistributable (Tool)
- **Role:** MSVC runtime libraries. Required for Mod Organizer 2 and LOOT.
- **Download:** [MSVC Redistributables](https://learn.microsoft.com/en-US/cpp/windows/latest-supported-vc-redist)
- **Details:** Download both the **x86** and **x64** versions for Visual Studio 2015, 2017, 2019, and 2022.

---

## Official Bethesda Content

### Skyrim Special Edition
The base game must be prepared and configured.

#### 1. Steam Overlay Exclusions
The Steam Overlay is known to cause issues while playing Skyrim Special Edition. Disable it globally or for Skyrim:
- *Globally:* Steam -> Settings -> In-Game -> Uncheck **Enable the Steam overlay while in-game**.
- *For Skyrim:* Right-click Skyrim Special Edition in Steam -> Properties -> General -> Uncheck **Enable the Steam Overlay while in-game**.

#### 2. Update Proofing Skyrim
Bethesda regularly updates base Skyrim files for Creation Club, which breaks SKSE plugins. Prevent Steam from auto-updating:
1. In Steam, right-click **The Elder Scrolls V: Skyrim Special Edition** -> **Properties**.
2. Select the **Updates** tab.
3. Under "Automatic Updates", select **Only update this game when I launch it**.
4. Close the window.
*(Skyrim will remain un-updated since we launch it via MO2's SKSE launcher, not Steam).*

#### 3. Configure Skyrim
1. Start Skyrim Special Edition through Steam to open the default launcher.
2. Click **Options**.
3. Click the **Ultra** button.
4. Set Aspect Ratio and Resolution to your monitor's optimal resolution.
5. Set Antialiasing to **Off** (required for ENB).
6. Ensure that **Windowed Mode** is unchecked.
7. Click **OK** to save and close the launcher.
- **Required Game Version:** Skyrim Special Edition v1.6.1170.

### Skyrim Special Edition: Creation Kit
1. Download and install the **Creation Kit** via Steam (under Tools).
2. Start the Creation Kit once via Steam to generate its default configurations.
3. Extract the scripts archive (inside the Data folder) if prompted.
4. Exit the Creation Kit.
5. Download the premade [CreationKitCustom.ini](https://lexyslotd.com/) and place it in your Skyrim SE main folder. This configuration enables multiple master files and loads DLC files correctly.
- **Required Version:** v1.6.1378.1.

### Creation Kit Platform Extended (Tool)
- **Role:** Patches and bug fixes for Creation Kit SE.
- **Download:** [CK Platform Extended](https://github.com/nukem9/SkyrimPlatformExtended/releases)
- **Special Instructions:** Extract the contents of the archive directly into your main Skyrim Special Edition folder (where `CreationKit.exe` is located).
- **Idiot Check:** Make sure you extract the contents directly into the main folder, not a subfolder.

---

## Modding Tools Setup

Create a dedicated folder for all your modding tools, ideally at the root of a drive (e.g. `C:\Modding Tools` or `D:\Modding Tools`). Tools must be extracted into their own individual folders, out of Steam folders, and **MUST NOT** be installed in UAC-protected directories like Desktop or Program Files.

### 1. LOOT (Tool)
- **Role:** Load Order Optimisation Tool.
- **Download:** [LOOT v0.28.0 - Installer](https://loot.github.io/)
- **Initial Setup (Outside MO2):**
  1. Shut down MO2 if open.
  2. Run LOOT from its installed location.
  3. Click the **Sort Plugins** icon (three horizontal lines) in the top left corner to fetch the masterlist.
  4. If updating LOOT, go to **Game** -> **Clear All User Metadata...** -> select **Yes** to ensure clean rules.
- **Create Custom Groups:**
  1. Under the top menu, select **Game** -> **Edit Groups**.
  2. Add the following custom groups and link them (by clicking, holding, and dragging lines between nodes):
     - Create `Village Mods` -> drag a line from `Alternate Start` to `Village Mods`.
     - Create `Trivial Smelters of Skyrim` -> connect `Village Mods` to `Trivial Smelters of Skyrim`.
     - Connect `Trivial Smelters of Skyrim` to `Follower Frameworks`.
     - Create `CCOR Patches` -> connect `Cell Encounter Zones` to `CCOR Patches`.
     - Create `CACO Patches` -> connect `CCOR Patches` to `CACO Patches`.
     - Create `Merge Patches` -> connect `CACO Patches` to `Merge Patches`.
     - Create `OWL` -> connect `Merge Patches` to `OWL` -> connect `OWL` to `Cell Water`.
     - Create `ELFX` -> connect `Cell Weathers & Lighting` to `ELFX`.
     - Create `ELFX Shadows` -> connect `ELFX` to `ELFX Shadows`.
     - Create `LUX Orbis` -> connect `ELFX Shadows` to `LUX Orbis`.
     - Create `LUX Via` -> connect `LUX Orbis` to `LUX Via` -> connect `LUX Via` to `Open Cities Skyrim`.
     - Create `NPC Retextures` -> connect `Khajiit Speak` to `NPC Retextures`.
     - Create `Courier Overhauls` -> connect `NPC Retextures` to `Courier Overhauls`.
     - Create `RS Children` -> connect `Courier Overhauls` to `RS Children`.
     - Create `Consistency Patches` -> connect `RS Children` to `Consistency Patches`.
     - Create `Conflict Resolution` -> connect `Consistency Patches` to `Conflict Resolution`.
     - Create `Conflict Resolution - Late Loaders` -> connect `Conflict Resolution` to `Conflict Resolution - Late Loaders` -> connect `Conflict Resolution - Late Loaders` to `Leveled List Modifiers`.
  3. Click **Auto arrange groups** to clean up connections, verify all groups show as black/green links, and click **Save** to exit. Close LOOT.

### 2. xEdit (SSEEdit) (Tool)
- **Role:** Cleaning mods and creating patches.
- **Download:** [SSEEdit v4.1.5f](https://www.nexusmods.com/skyrimspecialedition/mods/164)
- **Setup:** Extract the archive and rename:
  - `xDump.exe` -> `SSEDump.exe`
  - `xDump64.exe` -> `SSEDump64.exe`
  - `xTESEdit.exe` -> `SSEEdit.exe`
  - `xTESEdit64.exe` -> `SSEEdit64.exe`
  - Copy `SSEEdit64.exe` and rename the copy to `SSEEditQuickAutoClean.exe`.
- **4K Monitor Compatibility Settings:**
  1. Right-click `SSEEdit64.exe` -> **Properties**.
  2. Select the **Compatibility** tab.
  3. Click **Change high DPI settings**.
  4. Check **Override high DPI scaling behavior** and set scaling to **System**.

### 3. Mators xEdit Patching Framework (MXPF) (Tool)
- **Role:** Scripting library for patch generation.
- **Download:** [MXPF on GitHub](https://github.com/matortheeternal/mxpf)
- **Setup:** Extract the `Edit Scripts` folder contents to the `Edit Scripts` folder inside your `SSEEdit` directory.

### 4. TES5EditScripts (Tool)
- **Role:** Extra scripting utilities for xEdit.
- **Download:** [TES5EditScripts](https://github.com/matortheeternal/TES5EditScripts)
- **Setup:** Extract the `Edit Scripts` folder contents into your `SSEEdit/Edit Scripts` folder.

### 5. WICO Cleanup Script (Tool)
- **Role:** Filters NPC records.
- **Download:** [Hishy NPC Record Forwarding Script](https://www.nexusmods.com/skyrimspecialedition/mods/5049)
- **Setup:** Extract `Hishy_NPC_RecordForwarding.pas` to `SSEEdit/Edit Scripts`.

### 6. Dark Face Issue Reporter (Tool)
- **Role:** Script to verify head mesh errors.
- **Setup:** Extract the script to `SSEEdit/Edit Scripts`. Edit `darkfaceissuereporter.ini` as follows:
  ```ini
  CreateDebugLogFile=True
  CreateConsoleCommandBatchFile=True
  CreateDarkFaceCollector=True
  DarkFaceCollectorFilename=darkfacecollector.esp
  ```
- **Exclude List:** Download `Dark Face Issue Reporter Ignore` and place the INI file into `SSEEdit/Edit Scripts/`.

### 7. Synthesis (Tool)
- **Role:** Automated multi-patch framework.
- **Download:** [Synthesis standalone](https://github.com/Mutagen-Modding/Synthesis/releases) (v0.35.5).
- **Profile:** Download `Lexy's LOTD Synthesis Profile` (v0.35.5.2) and extract it directly into the Synthesis installation folder.

### 8. Cathedral Assets Optimizer (CAO) (Tool)
- **Role:** Automates texture and mesh conversions.
- **Download:** [Cathedral Assets Optimizer](https://www.nexusmods.com/skyrimspecialedition/mods/23316) (v5.3.15).
- **Profiles:** Download `Lexy's LOTD CAO Profiles` (v5.3.14.1) and extract them into your CAO folder.

### 9. Wrye Bash (Tool)
- **Role:** Masterlist and Bashed Patch generator.
- **Download:** [Wrye Bash v314 Standalone](https://www.nexusmods.com/skyrimspecialedition/mods/18)
- **Setup:** Extract to a location of your choice (e.g. `C:\Modding Tools\Wrye Bash`).
- *Note:* Windows 10 users may see a `Docs` folder generated in the MO2 Overwrite folder. It can be safely deleted.

### 10. zEdit / zMerge (Tool)
- **Role:** Plugin merging utility.
- **Download:** [zEdit v0.6.7 Portable x64](https://github.com/z-edit/zedit/releases)

---

## Script Extenders

### Skyrim Script Extender (SKSE64) (Tool)
- **Role:** Engine scripting extensions.
- **Download:** [SKSE64 SE Version](https://skse.silverlock.org/) (v2.2.6).
- **Special Instructions:** Copy **ONLY** the following files directly into your main Skyrim Special Edition folder (where `SkyrimSE.exe` is located):
  - `skse64_1_6_1170.dll`
  - `skse64_loader.exe`
  *(We will install the SKSE Scripts folder later via Mod Organizer 2).*

---

## BethINI Setup

### Bethini Pie (Performance INI Editor) (Tool)
- **Role:** Simplifies Skyrim config file edits.
- **Download:** [Bethini Pie v4.17](https://www.nexusmods.com/skyrimspecialedition/mods/4875)
- **Configuration Steps:**
  1. Launch Bethini Pie. Select **Skyrim Special Edition**.
  2. Setup paths:
     - **Game Path:** Points to `Steam\steamapps\common\Skyrim Special Edition`
     - **INI Path:** Points to `Mod Organizer 2\profiles\Vanilla Profile` (or your portable directory equivalent).
  3. Click OK.

#### 1. Basic Tab Settings
- Click **Reset to Default** -> wait for confirmation.
- Click **High** preset (avoid Ultra to maintain performance).
- Click **Apply Recommended Tweaks** -> wait for confirmation.
- **Display Configurations:**
  - *Resolution:* Native monitor resolution.
  - *Display Mode:* Borderless Windowed.
  - *Default World FOV / Default FOV / Default 1st Person FOV:* 85.
  - *64 Bit Render Targets:* checked.
  - *Vsync:* unchecked.
  - *Lock Framerate:* unchecked.
- **Adjustments:**
  - *Bloom Boost:* 5.0
  - *Freebies Seen:* checked.

#### 2. General Tab Settings
- **Saved Games:** Uncheck *Autosaves*, *Save on Pause*, *Save on Travel*, *Save on Wait*, and *Save on Rest*.
- **Papyrus:**
  - *Post-Load Update Time:* 2000
  - *Max Allocated Memory:* 500000

#### 3. Gameplay Tab Settings
- *NPC Use Ammo:* checked.
- *Over Encumbered Reminder:* 300.
- *Tutorials:* unchecked.

#### 4. Interface Tab Settings
- *Bethesda Modding Platform:* unchecked.
- *Mod Manager Menu:* unchecked.

#### 5. Environment Tab Settings
- *Grass Density:* 60.
- *Grass Diversity:* 15.
- *Water Reflect Sky:* unchecked.

#### 6. Shadows Tab Settings
- *Ambient Occlusion:* unchecked.
- *SAO Bias:* 0.5.
- *SAO Exp Factor:* 0.22.
- *SAO Intensity:* 12.0.
- *SAO Radius:* 850.

#### 7. Visuals Tab Settings
- *Sun Base Size:* 200.
- *Sun Glare Size:* 282.
- *Particles:* 7500.
- *Lens Flare:* unchecked.

#### 8. View Distance Tab Settings
- *Tree LOD Distance:* 0 (leave default if not running DynDOLOD Ultra Trees).
- **Save:** Go to **File** -> **Save** to confirm changes. Exit Bethini Pie.

---

## Mod Manager

> [!IMPORTANT]
> **Use Mod Organizer 2 Only**
> This Guide was written for and assumes the use of Mod Organizer 2 and its built-in plugins. The use of any other Mod Management program is NOT SUPPORTED and will disqualify you from official Discord support.

> [!CAUTION]
> **CCleaner Warning**
> The paid version of CCleaner is known to break Mod Organizer 2's Virtual Filing System (VFS). Unchecking the 'windows event logs' option under CCleaner's advanced tab will prevent this. Make sure the Profile Folder remains inside the MO2 directory.

### Mod Organizer 2 (Tool)
- **Role:** Mod management engine.
- **Download:** [Mod Organizer 2 v2.5.0](https://www.nexusmods.com/skyrimspecialedition/mods/244)

---

## Installing & Configuring Mod Organizer 2

> [!WARNING]
> **Must Install in Portable Mode**
> Mod Organizer 2 MUST be installed in portable mode. Do NOT install MO2 in your Steam folder, Skyrim game folder, or UAC-protected folders like Desktop or Program Files.

### 1. Installation Steps
1. Run the Mod Organizer 2 installer. (If Windows Defender warns you, select **More Info** -> **Run Anyway**).
2. Select your installation location (e.g. `D:\SkyrimModding\MO2`).
3. Launch MO2.
4. Select **Create a portable instance**.
5. Select **Skyrim: Special Edition**.
6. Select **Steam**.
7. Check **Use profile-specific game INI files** and **Use profile-specific save games**.
8. Ensure the Location matches your installation path.
9. Click **Finish**, then select **Do Nothing**.
- **Idiot Check:** Do NOT move the `Mods` or `Profiles` folders out of the MO2 directory at any time; their paths are hard-coded.

### 2. Linking to Nexus Mods
1. Click the **Settings** icon (spanner and screwdriver) in MO2.
2. Select the **Nexus** tab.
3. Click **Connect to Nexus**.
4. Allow permission in your opened browser window, then close it.
5. Click **OK** in MO2.

### 3. Theme Configuration
1. Click the **Settings** icon in MO2.
2. Select the **Theme** tab.
3. In the Style dropdown, choose a dark theme (e.g. `dark`, `Paper Dark`, or `vs15 Dark`).
4. Click **OK**.

### 4. Info Columns & Workarounds
1. In the Left Pane of MO2, right-click the column headers and check **Content**.
2. Click the **Settings** icon -> **Workarounds** tab.
3. Under Options, check **Enable archives parsing (experimental)** to show BSA conflicts.
4. Go to the **General** tab.
5. Under Download List, check **Show meta information** and **Compact list**. Click **OK**.
- *Storage Tip:* If your SSD is small, adjust the downloads directory folder to a larger storage drive inside MO2 Settings -> Paths tab.

### 5. BSA Extractor Plugin Configuration
1. Click the **Settings** icon -> **Plugins** tab.
2. Select **BSA Extractor**.
3. Set `only_alternate_source` to `false`. Click **OK**.
4. When prompted during mod installs, select **YES** to extract archives and **YES** to delete the BSA afterwards (for `EXTRACT THE BSA` tagged mods). Select **NO** for all other mods.

---

## Mod Organizer 2 Profile Setup

We will create a baseline profile to preserve vanilla files and build a modded profile for installation.

### 1. Create the "Vanilla" Profile
1. Click the **Configure Profiles** button (ID card icon).
2. Click **Create**. Name it `Vanilla Skyrim SE`.
3. Uncheck **Default Game INI Settings** and click **OK**.
4. Select `Vanilla Skyrim SE` in the profile list.
5. Ensure **Use profile-specific Save Games** and **Use profile-specific Game INI Files** are checked.
6. Click **Close**.
7. In the profile dropdown above the modlist, select `Vanilla Skyrim SE`.
8. Click **Configure Profiles** again, select the `Default` profile, click **Remove** -> **Yes**, then close.

### 2. Set up Mod Organizer 2 Initial Load Order
Bethesda's DLC plugins must be organized chronologically:
1. In the left panel, drag the non-MO files into this order (top-to-bottom):
   - `DLC: Dawnguard`
   - `DLC: HearthFires`
   - `DLC: Dragonborn`
   - `Creation Club: ccBGSSSE001-Fish`
   - `Creation Club: ccQDRSSE001-SurvivalMode`
   - `Creation Club: ccBGSSSE037-Curios`
   - `Creation Club: ccBGSSSE025-AdvDSGS`
   - `Creation Club: _ResourcePack`
2. Select **LOOT** from the executables dropdown and click **Run**.
3. Click **Sort Plugins** (three lines icon) in LOOT, then click **Apply Sorted Load Order**.
4. Exit LOOT.

### 3. Create the "Legacy of the Dragonborn" Profile
1. Open Profile Settings, select `Vanilla Skyrim SE`, and click **Copy**.
2. Name it `Legacy of the Dragonborn - Special Edition`.
3. Verify both profile-specific INIs and Saves checkmarks are enabled.
4. Verify the base game DLCs are sorted in the correct order.

---

## Executable Integration

We must register the utilities inside Mod Organizer 2 so they can access the Virtual File System (VFS).

1. Click the **Executables** dropdown -> select **Edit...** (or gear icon).
2. Click the **+** button -> select **Add from file...**
3. Navigate to and double-click `SSEEdit64.exe`. Click **Apply**.
4. Repeat for `SSEEditQuickAutoClean.exe`.
5. Repeat for `Bethini.exe`, `WryeBash.exe`, `Synthesis.exe`, `zEdit.exe`, and `LOOT.exe`.
   - *Arguments for zEdit:* Add `-appMode="merge"` to the Arguments field.
   - *xEdit Cache Redirection (Optional):* Add `-C:"D:\Skyrim SE Tools\SSEEdit\Cache\"` to arguments to keep the MO2 overwrite folder clean.
6. Click **OK** to close the window.

---

## xEdit & SKSE Post-Config

Ensure the modded profile `Legacy of the Dragonborn - Special Edition` is selected.

### 1. xEdit Option Tweaks
1. Run **SSEEdit** via MO2. Click **OK** to load all files.
2. Wait for "Background Loader: finished".
3. Right-click any plugin in the left list -> **Other** -> **Options**.
4. **Uncheck** *Simple Records LAND, NAVI, NAVM, CELL, WRLD*.
5. Click **OK**, then exit SSEEdit.

### 2. Complete SKSE Installation
1. Click the **Install Mod** button (file box icon) in MO2.
2. Select the downloaded **SKSE64 archive** -> click **Open**.
3. Replace the mod name with `SKSE Scripts`.
4. In the folder tree window, right-click the `Data` folder and select **Set Data Directory**. (It should display only a checked `Scripts` folder and read "The content of looks valid").
5. Click **OK**.
6. Check the box next to `SKSE Scripts` in the Left Pane of MO2 to activate it.

### 3. Create and Edit SKSE.ini
1. Right-click `SKSE Scripts` -> select **Open In Explorer**.
2. Create a new folder named `SKSE`.
3. Open the folder and create a text file named `SKSE.ini` (path: `...\mods\SKSE Scripts\SKSE\SKSE.ini`).
4. Paste the following settings into the INI file:
   ```ini
   [General]
   ClearInvalidRegistrations=1

   [Display]
   iTintTextureResolution=2048
   ```
5. Save and close the file. Exit Explorer.

---

## Post BethINI Tweaks

Open the **INI Editor** in MO2 (spanner icon -> INI Editor) to tweak the generated files.

### 1. Skyrim.ini edits
Add the following lines under the `[General]` section:
```ini
[General]
sLanguage=English
uInterior Cell Buffer=0
```
> [!CAUTION]
> **Language Configuration**
> For Non-English Windows Installations: You MUST add `sLanguage=English` to `Skyrim.ini`. Failure to do so will cause game tools to fall back to the OS language, breaking string references and plugin patches.

---

## Install Verification

Verify that SKSE is installed and running correctly:
1. Select **SKSE** from the executables dropdown in MO2 and click **Run**.
2. At the main menu, press the console key (**~**).
3. Type `getskseversion` and press **Enter**.
4. Confirm it returns the correct SKSE version (e.g. `2.2.6`).
5. Close Skyrim.

> [!CRITICAL]
> **Required Step**
> DO NOT continue past this point unless you are certain that SKSE is correctly installed and returning the proper version in the game console.

---

## Mod Organizer 2 Plugins

Download the following plugins and extract them into your `Mod Organizer 2\plugins` directory.

### Autoscroller Plugin (Tool)
- **Role:** Synchronizes selections between the left pane (Mod List) and right pane (Plugins List).
- **Download:** [Autoscroller for MO2](https://www.nexusmods.com/skyrimspecialedition/mods/165507) (v1.4)
- **Special Instructions:** Extract to `Mod Organizer 2\plugins`.

### Filter Fix for Mod Organizer (Tool)
- **Role:** Corrects separator expansion behaviors when searching.
- **Download:** [Filter Fix for MO2](https://www.nexusmods.com/skyrimspecialedition/mods/172674) (v1.0)
- **Special Instructions:** Extract to `Mod Organizer 2\plugins`.

### Merge Plugins Hide (Tool)
- **Role:** Manages and disables merged plugins.
- **Download:** [Merge Plugins Hide](https://github.com/deorder/mo2-plugins/releases) (v1.2)
- **Special Instructions:**
  1. Extract to `Mod Organizer 2\plugins` and rename the extracted folder to `deorder_plugins`.
  2. Open MO2 -> click Settings -> **Plugins** tab.
  3. Select **Merge Plugins Hide**.
  4. In the right pane, change `hide-type` from `mohidden` to `optional` (must be all lowercase).
  5. Click **OK**.
- **Idiot Check:** Make sure the `o` in `optional` is lowercase.

### Mod Organizer 2 Removal Tool (Tool)
- **Role:** Simplifies cleaning/removing files from mods.
- **Download:** [MO2 File Removal Tool](https://www.nexusmods.com/skyrimspecialedition/mods/117306) (v2.4.1)
- **Special Instructions:**
  1. Extract to `Mod Organizer 2\plugins`.
  2. In MO2 Plugins tab, locate `mo2-removal-tool`.
  3. Change `plugin-optional` to `true` and `removal-type` to `mohidden`. Click **OK**.
  *(If you need disk space, you can set the removal type to `delete` instead of `mohidden` to save ~10GB of storage).*

### Prepare Merge (Tool)
- **Role:** Automatically orders target plugins for merges.
- **Download:** [Prepare Merge for MO2](https://www.nexusmods.com/skyrimspecialedition/mods/47791) (v1.2.3)
- **Special Instructions:** Extract to `Mod Organizer 2\plugins`.

### Remember Installation Choices (Tool)
- **Role:** Caches FOMOD selections.
- **Download:** [Remember Installation Choices](https://www.nexusmods.com/skyrimspecialedition/mods/140678) (v1.2.4)
- **Special Instructions:** Extract to `Mod Organizer 2\plugins`.

### Set CPU Affinity (Tool)
- **Role:** Sets CPU affinity for optimized threads.
- **Download:** [Set CPU Affinity](https://www.nexusmods.com/skyrimspecialedition/mods/94636) (v1.2.0)
- **Special Instructions:** Extract to `Mod Organizer 2\plugins`.

---

## Bethesda ESM File Maintenance

Clean dirty edits (Identical to Master [ITM] records and Deleted [UDR] references) in the base game ESMs.

### 1. Create Backups
1. Navigate to your `Skyrim Special Edition\Data` folder.
2. Copy and backup the following files to a safe directory (e.g. your desktop):
   - `Update.esm`
   - `Dawnguard.esm`
   - `HearthFires.esm`
   - `Dragonborn.esm`
   - `ccBGSSSE001-Fish.esm`
   - `ccQDRSSE001-SurvivalMode.esl`
   - `ccBGSSSE037-Curios.esl`
   - `ccBGSSSE025-AdvDSGS.esm`
   - `_ResourcePack.esl`

### 2. Auto-Cleaning Instructions
1. Run **SSEEdit - Quick Auto Clean** via MO2.
2. Select `Update.esm` and click **OK**.
3. Wait for "Quick Clean Mode finished", then close the window.
4. Repeat this process separately for:
   - `Dawnguard.esm`
   - `HearthFires.esm`
   - `Dragonborn.esm`
   - `ccBGSSSE001-Fish.esm`
   - `ccQDRSSE001-SurvivalMode.esl`
   - `ccBGSSSE037-Curios.esl`
   - `ccBGSSSE025-AdvDSGS.esm`
   - `_ResourcePack.esl`
> [!CRITICAL]
> **Do NOT Clean Skyrim.esm**
> NEVER clean `Skyrim.esm`. Doing so will compare the master file to itself, deleting all records and corrupting your base game files.

### 3. Manual xEdit Cleaning (Dawnguard.esm)
`Dawnguard.esm` contains manual records that must be cleaned:
1. Run **SSEEdit** (the standard version, NOT Quick Auto Clean) via MO2.
2. Right-click the plugin list and choose **Select None**. Check `Dawnguard.esm` and click **OK**.
3. Once loaded, expand `Dawnguard.esm` in the left panel.
4. Navigate to: `Cell` -> `Block 5` -> `Sub-Block 3` -> click **00016BCF**.
5. In the right pane, locate the **XEZN** sub-record referencing `RiftenRatwayZone [ECZN:0009FBB9]`.
6. Right-click this entry under the `Dawnguard.esm` column and select **Remove**.
7. Repeat the removal steps for:
   - `Block 2` -> `Sub-Block 1` -> **0001FA4C CWGuardTemplates** -> Right-click the entire record and choose **Remove**.
   - `Block 8` -> `Sub-Block 1` -> Right-click the entire sub-block and choose **Remove**.
8. Close xEdit and click OK to save.

### 4. Create a Cleaned ESMs Mod in MO2
1. Inside `...\Mod Organizer 2\mods`, create a folder named `Cleaned Vanilla ESMs`.
2. Move the cleaned files (`Update.esm`, `Dawnguard.esm`, `Hearthfires.esm`, `Dragonborn.esm`, `ccBGSSSE001-Fish.esm`, `ccQDRSSE001-SurvivalMode.esl`, `ccBGSSSE037-Curios.esl`, `ccBGSSSE025-AdvDSGS.esm`, `_ResourcePack.esl`) **FROM** `Skyrim\Data` **TO** your new `MO2\mods\Cleaned Vanilla ESMs` directory.
3. Restore the uncleaned backup files you saved earlier back into `Skyrim\Data`.
4. Refresh MO2 (`F5`). Check and **activate** the new `Cleaned Vanilla ESMs` mod in the left panel.

---

## Level of Detail (LOD) Generation Tools

### 1. xLODGen (Tool)
- **Role:** Generates terrain LOD meshes and textures.
- **Download:** [xLODGen Terrain LOD Beta](https://stepmodifications.org/)
- **Setup:**
  1. Extract the archive to a folder named `xLODGEN` outside Skyrim or MO2 directories.
  2. Create a folder named `SSELODGen_Output` at the root of a drive.
  3. Register `xLODGenx64.exe` as an executable in MO2.
  4. In the Arguments field, enter: `-sse -o:"Drive Letter:\SSELODGen_Output"` (replace Drive Letter accordingly).

### 2. ACMOS Road Generator (Tool)
- **Role:** Paints roads/paths on xLODGen terrain LODs.
- **Download:** [ACMOS Road Generator](https://www.nexusmods.com/skyrimspecialedition/mods/79205) (v4.1)
- **Setup:** Add `ACMOS Road Generator.exe` as an executable in MO2. Do not install via MO2.

### 3. DynDOLOD 3 Alpha (Tool)
- **Role:** Distant object LOD generator.
- **Download:** [DynDOLOD 3 Alpha Standalone](https://dyndolod.info/)
- **Setup:**
  1. Extract to a folder named `DynDOLOD Special Edition` outside of Skyrim/MO2.
  2. Add `TexGenx64.exe` and `DynDOLODx64.exe` as executables in MO2.
  3. Enter `-sse` in the Arguments field for both.
- **Enable Expert & Level32 Modes:**
  1. Navigate to `...\DynDOLOD Special Edition\Edit Scripts\DynDOLOD\` and open `DynDOLOD_SSE.ini`.
  2. Set `Expert=1` and `Level32=1`.
  3. Find `DoubleSidedTextureMask` and remove the leading semi-colon (`;`). Ensure it reads `DoubleSidedTextureMask=mountain,mtn`.
  4. Save and exit.

---

## Plugin Merge Configuration

### zMerge Setup
1. Open zEdit and select **zMerge** -> click **Start Session**.
2. Click the cog icon in the upper-right corner.
3. Select **Integration Settings**:
   - *Mod Manager:* Mod Organizer 2
   - *MO2 Instance:* Portable
   - *Mod manager path:* File path to `Mod Organizer 2`
   - *Mod manager mods path:* File path to `Mod Organizer 2\mods`
4. Select **Merge Settings**:
   - *Merge output path:* File path to your `Mod Organizer 2\mods` folder.
   - **Uncheck** *Disable plugins*.
5. Select **Archive Creation Settings**:
   - Under *Advanced*, set *Minimum Files Per Archive* to `999999`.
   - Under *Advanced*, ensure *Create textures archive* is **unchecked**.
6. Click **OK**, then close zMerge.

---

## ENB Post Processing & Ljoss Preset

### 1. ENB Series Binaries (Tool)
- **Role:** Graphics library engine.
- **Download:** [ENBSeries for TES Skyrim SE](http://enbdev.com/download_mod_tesskyrimse.html)
- **Setup:** Download the latest version. Extract **ONLY** `d3d11.dll` and `d3dcompiler_46e.dll` from the Wrapper Version folder in the archive and place them into your main Skyrim Special Edition directory.

### 2. Ljoss ReLUX ENB Preset (Tool)
- **Role:** Graphics preset for Cathedral Weathers.
- **Download:** [Ljoss ReLUX for Cathedral Weather](https://www.nexusmods.com/skyrimspecialedition/mods/63578) (v2.2)
- **Setup:**
  - *Main File:* Extract the contents of the `2.1` folder in the archive to your main Skyrim Special Edition directory.
  - *ELE ELFX Combo Support File:* Extract the `Weathers` folder to the `enbseries` folder (inside the Skyrim SE directory).

### 3. Ljoss ELFX Changes (Tool)
- **Role:** Modifies lighting values.
- **Download:** [Ljoss ELFX Changes](https://www.nexusmods.com/skyrimspecialedition/mods/85672) (v1.0)
- **Setup:** Extract the contents of the archive to your main Skyrim Special Edition directory.

---

## Monitor Calibration & Display Setup

> [!CAUTION]
> **Do Not Skip This Step**
> The chosen ENB was created by a graphical industry professional and will not look correct if these settings are not configured.

> [!WARNING]
> **Windows 11 Users**
> Disable the Windows "Auto-HDR" feature. Using Auto-HDR with Skyrim will cause severe color banding and crushed black levels.

1. **Calibrate Color:** We highly recommend calibrating your monitor's colors before starting. Reference [How to calibrate your monitor](https://www.nexusmods.com/skyrimspecialedition/articles/1831).
2. **HDMI Configuration:** If connecting via HDMI, apply the settings corresponding to your monitor setup inside the NVIDIA Control Panel (under *Change Resolution* -> *Use NVIDIA Color Settings*):
   - *Non-HDR PC Monitor:* Set Output Color Format to **RGB**, Output Color Depth to **8-Bit**, and Output Dynamic Range to **Full**.
   - *Non-HDR TV:* Set Output Color Format to **RGB**, Output Color Depth to **8-Bit**, and Output Dynamic Range to **Limited**.
   - *HDR Monitor/TV:* Set Output Color Format/Depth/Dynamic Range in order of hardware support:
     1. RGB 10-Bit Full
     2. YCbCr 4:4:4 10-Bit Limited
     3. YCbCr 4:2:2 10-Bit Limited
     4. YCbCr 4:2:0 10-Bit Limited
     5. RGB 8-Bit Full
3. **TV settings:** Ensure your input type is set to "PC" or "Console", and for LG OLED TVs, select the "Game" picture setting and enable "Ultra HDMI Deep Color".

---

## Antivirus Exclusions

Windows Defender and other software block virtual writes. Add exclusions for Mod Organizer 2 and your tools.

### Exclude Processes in Windows Defender:
1. Search for **Virus & threat protection** in your Windows Search Bar.
2. Select **Manage settings** under *Virus & threat protection settings*.
3. Select **Add or remove exclusions** under *Exclusions*.
4. Click **Add an exclusion** -> select **Process**.
5. Input the file paths for:
   - `DynDOLODx64.exe`
   - `TexGenx64.exe`
   - `xLODGENx64.exe`
   - `Cathedral_Assets_Optimizer.exe`
   - `texconv.exe` (found inside your DynDOLOD and xLODGen Edit Scripts folders).
6. Click **Add an exclusion** -> select **Folder**, and add your `MO2` and modding tools directories.
7. Click **Add an exclusion** -> select **File type**, and enter `.nif`.
