[← Home](../README.md)

# Boot App Functionality Overview

## Introduction

The Boot App implements a number of actions to deal with the boot app update, the release folder update and the deployment of an install.
The functionality is in folder `/release/install/boot/modules/usr/`.

## Special Characteristics

The Boot App has unique deployment characteristics that differ from other SPlectrum applications:

### Multi-Location Architecture
- **Source**: `spl/apps/boot/` - Primary development location with .batch files only
- **Install**: `spl/install/boot/` - Intermediate deployment location
- **Release**: `release/install/boot/` - Final distribution location

### Deployment Flow
1. Changes are made in `spl/apps/boot/`
2. `usr/boot_to_release` copies from `spl/apps/boot/` → `release/install/boot/`
3. The release folder is used to populate new installs
4. **Important**: Package deploy method only creates/updates files, never removes existing files

### File Management Considerations
- Only .batch files should exist in source and deployments
- .txt files may persist in intermediate locations from previous processes
- Clean up .txt files from `spl/install/boot/batches/` before releasing to prevent propagation
- The boot app manages release/deployment for all other SPlectrum applications

## Functionality

### Boot app Update

#### [`modules_to_boot.js`](../release/install/boot/modules/usr/modules_to_boot.js)
- **URI**: `usr/modules_to_boot`
- **Purpose**: Updates the spl package within the modules folder of the boot app with the version in the spl/modules folder.

### Release Update

#### [`boot_to_release.js`](../release/install/boot/modules/usr/boot_to_release.js)
- **URI**: `usr/boot_to_release`
- **Purpose**: Updates the boot app code in the release folder.

#### [`apps_to_release.js`](../release/install/boot/modules/usr/apps_to_release.js)
- **URI**: `usr/apps_to_release`
- **Purpose**: Updates the apps packages in the release folder with the current state in spl/apps.

### Release Deploy

#### [`release_to_install.js`](../release/install/boot/modules/usr/release_to_install.js)
- **URI**: `usr/release_to_install`
- **Purpose**: Deploys the release and modules folder to the spl/install folder. (Done prior to created the zip file.)

### Deployment Operations

Execute the first three in the listed order to unpack and deploy an install.

#### [`deploy_install.js`](../release/install/boot/modules/usr/deploy_install.js)
- **URI**: `usr/deploy_install`
- **Purpose**: Handles installation deployment operations

#### [`deploy_modules.js`](../release/install/boot/modules/usr/deploy_modules.js)
- **URI**: `usr/deploy_modules`
- **Purpose**: Manages module deployment operations

#### [`deploy_apps.js`](../release/install/boot/modules/usr/deploy_apps.js)
- **URI**: `usr/deploy_apps`
- **Purpose**: Deploys multiple application packages to the apps directory
- **Supported Applications**:
  - Boot application (`apps_boot.json`)
  - Git application (`apps_git.json`)
  - Test suite application (`apps_test-suite.json`)
- **Process**: Loads each package from the install/packages directory and deploys it to the apps directory

Additional commands:

#### [`deploy_watcher.js`](../release/install/boot/modules/usr/deploy_watcher.js)
- **URI**: `usr/deploy_watcher`
- **Purpose**: Deploy the watcher app.

#### [`remove_install.js`](../release/install/boot/modules/usr/remove_install.js)
- **URI**: `usr/remove_install`
- **Purpose**: Remove the deployed install (all folders except for install folder).
