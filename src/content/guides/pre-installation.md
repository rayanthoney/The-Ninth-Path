---
title: Pre-Installation
slug: pre-installation
section: preinstall
sequence: 2
description: How to configure your OS, Steam, Skyrim Special Edition, and Mod Organizer 2 to prepare for the modlist.
estimatedTime: 45 mins
difficulty: intermediate
lastUpdated: 2026-05-26
---

This section details how to prepare your base system, game folders, and modding tools. Do not skip this. A clean base is required to prevent conflict issues down the line.

## System Prerequisites

Ensure you have the following installed on your system before continuing:
- **7-Zip** (latest version)
- **Visual C++ Redistributable 2015-2022** (x64 version)
- **.NET Framework 4.8 or higher**

> [!IMPORTANT]
> **Antivirus Exclusions**
> You must exclude your Mod Organizer 2 directory and your Skyrim Special Edition directory from Windows Defender (or other active antivirus software) scanning. Active scanners will block virtual file creation and lock files during installation, causing setup failure.

## Skyrim Special Edition Base Install

1. Locate your Steam directory. Skyrim **MUST NOT** be installed in `C:\Program Files` or `C:\Program Files (x86)`. Windows security permissions will block virtual writes.
2. If your Steam is in the default Program Files directory, create a new library on a separate SSD (e.g., `D:\SteamLibrary`), or move your Steam installation outside Program Files.
3. Install **Skyrim Special Edition**.
4. Run the game launcher once via Steam. Allow the launcher to detect your hardware settings, configure graphics to Ultra, click OK, and launch the game to the main menu.
5. Exit the game.

## Mod Organizer 2 Installation

1. Create a root directory on your SSD for modding, for example: `D:\SkyrimModding`.
2. Inside that directory, create a subfolder named `MO2`.
3. Download the Mod Organizer 2 installer or portable zip and extract/install it inside `D:\SkyrimModding\MO2`.
4. Launch `ModOrganizer.exe`.
5. Select **Create a portable instance** when prompted.
6. Choose **Skyrim Special Edition** as the target game.
7. Click Next and finish.

> [!TIP]
> **Steam Auto-Updates**
> Ensure you set Skyrim Special Edition updates in Steam to "Only update this game when I launch it". This prevents Steam from auto-updating the game and breaking SKSE plugins while you are mid-setup.

## Pre-Installation Checkpoint

Before moving to the next page, verify that you have completed all environment preparations:

<ChecklistBlock id="preinstall-checkpoint" title="Verification Checklist" items=['OneDrive disabled', 'MO2 installed outside Program Files', 'Defender/Antivirus folder exclusions set', 'Skyrim run once to create registry paths', 'Steam auto-updates set to "Only on launch"'] />
