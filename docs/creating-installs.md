[← Home](../README.md)

# Creating Install Directories

## Create Install from Release

```bash
# From boot app directory
./spl usr/release_to_install -a <install-directory-name>

# Examples
./spl usr/release_to_install -a install
./spl usr/release_to_install -a spl-production
```

## What Gets Created

- `<install-dir>/apps/` - Applications from release
- `<install-dir>/install/` - Core SPlectrum modules
- `<install-dir>/data/`, `runtime/` - Application data directories

## Usage

```bash
# Using spl_execute (if available)
./spl_execute <install-dir> <app> <command>

# Direct execution
cd <install-dir>/apps/<app>
./spl <command>
```

## Notes

- Install directories use `spl-*` naming pattern (git-ignored)
- Creates executable deployment from release packages
- Overwrites existing install if directory exists
- Use temporary names for testing (e.g., `spl-test-install`)

## Creating Install from Distributed Release Zip

When working with a distributed release zip file (outside the development repository):

### 1. Extract Release Package
```bash
# Create a folder for the release
mkdir spl-release
cd spl-release

# Copy the release file into the folder
cp /path/to/SPlectrum.7z .

# Extract the 7z file
7z x SPlectrum.7z
```

### 2. Create Install Directory
```bash
# Installation commands to be documented
# Process updated in recent versions
```

### 3. Linux Self-Extracting Installers
For Linux deployments, use the self-extracting installer pattern:
```bash
# Create Linux installer (when available)
./spl_execute boot tools/package/create-installer --archive spl_installer.sh --files ./spl --platform linux

# Install using the generated installer
chmod +x spl_installer.sh
./spl_installer.sh [target-directory]
```

**Repository Context**: The above instructions apply to creating installs within this development repository. The distributed package process uses similar commands but operates on extracted release contents.

---

[← Home](../README.md)