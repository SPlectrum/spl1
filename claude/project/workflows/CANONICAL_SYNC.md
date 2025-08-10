# Canonical Repository Sync Workflow

Critical architectural patterns for syncing SPL development work to canonical repositories.

## Overview

SPL uses a two-tier architecture:
- **`@spl-dev/`**: Development workspace with apps and modules
- **Canonical repos**: Production repositories for distribution

## Architecture Pattern

### Development Structure (`@spl-dev/`)
```
modules/gp/config/           # Canonical module location (real files)
apps/gp/modules/config       # Symlink → ../../../modules/gp/config
```

### Canonical Sync Results
```
Canonical App Repo:
├── apps/gp/modules/config     # SYMLINK (dependency reference)
├── apps/gp/modules/test/      # REAL FILES (app-specific)
└── apps/gp/scripts/           # REAL FILES (app-specific)

Canonical Module Repo:  
├── modules/gp/config/         # REAL FILES (promoted modules)
└── modules/gp/fs/             # REAL FILES (promoted modules)
```

## Critical Sync Rules

### ✅ DO Sync Symlinks As-Is
- **Preserve symlink structure** in canonical apps
- **Symlinks show dependencies** - crucial architectural information
- **Canonical consumers** know what modules to provide
- **Prevents file duplication** across app repositories

### ❌ DON'T Copy Symlink Targets
- **Never copy files** from symlink targets into apps
- **Would duplicate modules** in every app directory  
- **Would break dependency architecture**
- **Would create massive canonical repositories**

## Canonical Repository Locations

**Relative to repository root:**
- **Canonical modules**: `modules/` (from `spl-dev/modules/`)  
- **Canonical apps**: `apps/` (from `spl-dev/apps/`)

## Sync Workflows

### Module Repository Sync  
```bash
# Full sync of all modules (including deletes)
rsync -av --delete /path/to/repo/spl-dev/modules/ /path/to/repo/modules/
```

**Result**: Canonical `modules/` contains all promoted modules (real files only)

### App Repository Sync (Per-App)
⚠️ **CRITICAL**: Sync each app individually, not the entire apps folder

```bash
# Sync each app separately
rsync -av --delete --links /path/to/repo/spl-dev/apps/gp/ /path/to/repo/apps/gp/
rsync -av --delete --links /path/to/repo/spl-dev/apps/model/ /path/to/repo/apps/model/  
rsync -av --delete --links /path/to/repo/spl-dev/apps/test-spl-app/ /path/to/repo/apps/test-spl-app/
```

**Why per-app sync?**
- Each app may have different update schedules
- Allows selective app promotion
- Prevents cross-app contamination
- Maintains clean app boundaries

**Result**: Each canonical app gets symlinks (dependencies) + real files (app code)

## Development → Canonical Process

### 1. Develop in Apps
```bash
# Work in development area
@spl-dev/apps/gp/modules/config/  # Real files during development
```

### 2. Promote to Modules
```bash
# Manual transfer (as done with gp/config)
cp -r apps/gp/modules/config/ modules/gp/config/
rm -rf apps/gp/modules/config/
ln -sf ../../../modules/gp/config apps/gp/modules/config
```

### 3. Sync to Canonical
```bash
# Module sync (all at once)
rsync -av --delete spl-dev/modules/ modules/

# App sync (per app)
rsync -av --delete --links spl-dev/apps/gp/ apps/gp/
rsync -av --delete --links spl-dev/apps/model/ apps/model/
rsync -av --delete --links spl-dev/apps/test-spl-app/ apps/test-spl-app/
```

## Verification Patterns

### Check App Dependencies
```bash
# Should show symlinks to modules
find canonical-app/apps/ -type l -ls
```

### Check Module Content
```bash  
# Should show real files only
find canonical-modules/modules/ -type l  # Should be empty
```

## Architecture Benefits

1. **Clean Separation**: Apps reference modules, don't contain them
2. **Efficient Distribution**: No file duplication across repositories  
3. **Clear Dependencies**: Symlinks document what each app needs
4. **Scalable**: New apps reference existing modules without copying
5. **Maintainable**: Updates to modules don't require app repository changes

## Common Pitfalls

❌ **Copying symlink targets** instead of preserving symlinks
❌ **Missing module dependencies** in canonical module repo
❌ **Breaking symlink paths** during sync process
❌ **Duplicating modules** across multiple app directories

---

**Critical**: This pattern prevents canonical repository explosion and maintains proper dependency architecture.