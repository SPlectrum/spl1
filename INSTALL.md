# SPlectrum Installation Guide

This guide covers installing SPlectrum from the distributed release archive.

## Prerequisites

- **7-Zip**: Required for extracting the release archive
  - Linux: `sudo apt install p7zip-full` (Ubuntu/Debian) or equivalent
  - Windows: Download from [7-zip.org](https://www.7-zip.org/)
  - macOS: `brew install p7zip`
- **Node.js**: Required for running SPlectrum (v14+ recommended)

## Installation Steps

### 1. Extract Release Archive

Create a directory for the release and extract the archive:

```bash
# Create installation directory
mkdir spl-release
cd spl-release

# Copy the release file
cp /path/to/SPlectrum.7z .

# Extract the archive
7z x SPlectrum.7z
```

This will extract all SPlectrum files to the current directory.

### 2. Deploy Installation

Navigate to the extracted boot directory and run the deployment commands in sequence:

```bash
# Navigate to boot directory
cd install/boot

# Deploy core installation
node spl.js usr/deploy_install

# Deploy modules
node spl.js usr/deploy_modules

# Deploy applications
node spl.js usr/deploy_apps
```

All three commands must complete successfully for a proper installation.

## Usage

Once installed, you can use SPlectrum by navigating to application directories and using the node command format:

```bash
# Navigate to application directory
cd <app-directory>

# Execute commands using node
node spl.js <command>
```

## Troubleshooting

**7-Zip not found**: Ensure 7-Zip is installed and available in your system PATH.

**Node.js errors**: Verify Node.js is installed (v14 or later recommended).

**Permission errors**: Ensure you have write permissions in the installation directory.

**Deployment failures**: Check that all three deployment commands completed without errors. If any fail, the installation may be incomplete.

## What Gets Installed

- **Core APIs**: Console, data, execute, package, and utility functions
- **Tool APIs**: 7zip archive management, Git integration
- **Application Framework**: Script execution, batch processing, pipeline system
- **Boot System**: Installation and deployment management

For more information about using SPlectrum, see the documentation included with your installation.