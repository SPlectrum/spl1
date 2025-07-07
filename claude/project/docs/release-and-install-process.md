# Release and Install Process

## Overview

The SPlectrum release process involves creating installable packages from the development repository. The release system uses a three-tier structure: development repository → release packages → install directories.

## Architecture

**Development Repository**: Contains all source code and development files
- Modules in `/modules/` directory
- Applications in various directories  
- Git tracks everything except `/spl/` directory

**Release Packages**: Self-contained deployable units
- Located in `/release/` directory
- Contains boot app with deployment functionality
- Git-tracked and version controlled

**Install Directories**: Runtime deployment targets  
- Created in `/spl/` directory (git-ignored)
- Self-contained with all dependencies
- Can be packaged for distribution

## Release Creation Process

### Step 1: Update Release Packages
From the repository root, update app packages:
```bash
./spl_execute spl boot usr/apps_to_release
```

### Step 2: Create Install Directory
Create install directory from release packages:
```bash
# From boot app directory or via spl_execute
./spl_execute spl boot usr/release_to_install -a <install-directory-name>

# Examples
./spl_execute spl boot usr/release_to_install -a install
./spl_execute spl boot usr/release_to_install -a spl-production
```

**What Gets Created**:
- `<install-dir>/apps/` - Applications from release packages
- `<install-dir>/install/` - Core SPlectrum modules  
- `<install-dir>/data/`, `runtime/` - Application data directories

### Step 3: Module Synchronization
Synchronize modules from repository to install:
```bash
./spl_execute spl boot usr/modules_to_boot
```

### Step 4: Final Release Package Update
Update release packages with latest changes:
```bash
./spl_execute spl boot usr/boot_to_release  
```

## Install Directory Usage

**Using spl_execute (preferred)**:
```bash
./spl_execute <install-dir> <app> <command>
```

**Direct execution**:
```bash
cd <install-dir>/apps/<app>
./spl <command>
```

## Distribution Packaging

### Linux Installer (Future Implementation)
```bash
./spl_execute spl boot usr/create_linux_installer
```

### Manual Archive Creation
```bash
# Current method for testing
7z a SPlectrum.7z ./spl/install
```

## Testing Release Installations

### Validation Steps
1. Create test install directory
2. Verify all applications execute properly
3. Test core API functionality  
4. Validate tool integrations
5. Confirm data persistence

### Example Test Commands
```bash
# Basic functionality test
./spl_execute test-install test-suite spl/console/log "Installation test"

# Core API test  
./spl_execute test-install boot spl/package/create --help

# Tool integration test
./spl_execute test-install boot tools/git/status --help
```

## Release Process Integration

### With Git Workflow
The release process integrates with git operations:
1. Complete development work
2. Run four-step release process
3. Commit all changes (release packages are git-tracked)
4. Create GitHub release with distribution archive

### With Phase-Based Development
Release creation aligns with version composition:
- Complete phases create meaningful release points
- Version releases include updated release packages
- Install testing validates phase integration

## Key Concepts

**Self-Contained Boot App**: The release/install/boot application contains all code needed for deployment operations, making it independent of the development environment.

**Git Tracking Strategy**: Development repository tracks source and release packages, but install directories are ignored to prevent environment-specific files from being committed.

**Deployment Flexibility**: Install directories can be created with different names and configurations, enabling multiple deployment targets from single release packages.

**Backwards Compatibility**: The release process maintains compatibility with existing spl_execute patterns while supporting new deployment scenarios.

## Future Evolution

The release process is evolving toward:
- Linux-first deployment with native installers
- Container-based deployments  
- Automated CI/CD integration
- Phase-based release automation

See [Federated Monorepo Design](./federated-monorepo-design.md) for the planned evolution toward distributed repository architecture.