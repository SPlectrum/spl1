# RELEASE_PROCESS

## Complete GitHub Release Workflow
```bash
# 1. Create release archive
./spl_execute spl boot usr/create_self_extract

# 2. Test release installation
mkdir spl-release-test && cd spl-release-test
cp ../SPlectrum.7z . && 7z x SPlectrum.7z
cd install/boot
node spl.js usr/deploy_install
node spl.js usr/deploy_modules  
node spl.js usr/deploy_apps
cd /mnt/c/SPlectrum/spl0 && rm -rf spl-release-test

# 3. Commit all changes
git add . && git commit -m "feat: release preparation"

# 4. Create GitHub release
gh release create vX.XX --title "Title" --notes "Notes" SPlectrum.7z INSTALL.md
```

## Version Strategy
- **spl1 starts at 0.6.0** (continuation from spl0 which ended at 0.5.x)
- **Target 1.0** when Repository Restructure (RR) reaches end goal state
- **0.6.0 "Baseline"**: Seven-epic structure + initial analysis/planning issues
- **0.6.1 "Sufficient Analysis & Planning"**: First pass analysis enabling implementation
- **0.6.2+ progression**: PRINCE2 "just enough planning" approach