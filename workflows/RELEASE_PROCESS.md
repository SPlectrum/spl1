# RELEASE_PROCESS Workflow

**Trigger**: `release sesame`

## Overview

Complete release process for version closure including log archiving, historical preservation, and release artifact creation.

## Workflow Steps

### 1. Pre-Release Validation
- Verify all Phase 1 planning issues closed
- Confirm all current version work completed
- Validate repository clean state

### 2. Log Archiving Phase
```bash
# Create archive directory if needed
mkdir -p logs/archive

# Archive logs with version stamps
cp logs/timelog.txt logs/archive/timelog_v{VERSION}.txt
cp logs/learnings.md logs/archive/learnings_v{VERSION}.md

# Reset logs for next version
# - Update timelog header to next version
# - Update learnings header to next version  
# - Add version transition entries
```

### 3. Commit & Integration Phase
```bash
# Commit archiving changes
git add logs/
git commit -m "Archive v{VERSION} logs and reset for next version

- Archive timelog_v{VERSION}.txt and learnings_v{VERSION}.md
- Reset current logs for v{NEXT_VERSION} development
- Preserve complete development history

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Create and merge PR
gh pr create --title "Archive v{VERSION} logs and prepare for release"
gh pr merge --squash
```

### 4. Release Artifact Creation
```bash
# Create release archive
./spl_execute spl boot usr/create_self_extract

# Test release installation
mkdir spl-release-test && cd spl-release-test
cp ../SPlectrum.7z . && 7z x SPlectrum.7z
cd install/boot
node spl.js usr/deploy_install
node spl.js usr/deploy_modules  
node spl.js usr/deploy_apps
cd /mnt/c/SPlectrum/spl1 && rm -rf spl-release-test
```

### 5. GitHub Release Creation
```bash
# Create version tag
git tag v{VERSION}
git push origin v{VERSION}

# Create GitHub release with archived learnings as release notes
gh release create v{VERSION} --title "SPlectrum v{VERSION}" --notes-file logs/archive/learnings_v{VERSION}.md SPlectrum.7z INSTALL.md
```

## Release Workflow Execution

### Mandatory Workflow Logging
```
##→YYYY-MM-DDTHH:MM:SSZ | RELEASE_PROCESS | workflow_start: release sesame trigger
##→YYYY-MM-DDTHH:MM:SSZ | RELEASE_PROCESS | step_description: archive logs with version stamps
##→YYYY-MM-DDTHH:MM:SSZ | RELEASE_PROCESS | step_description: reset logs for next version
##→YYYY-MM-DDTHH:MM:SSZ | RELEASE_PROCESS | step_description: commit and merge archiving changes
##→YYYY-MM-DDTHH:MM:SSZ | RELEASE_PROCESS | step_description: create release artifacts and test installation
##→YYYY-MM-DDTHH:MM:SSZ | RELEASE_PROCESS | step_description: create version tag and GitHub release
##→YYYY-MM-DDTHH:MM:SSZ | RELEASE_PROCESS | workflow_complete: v{VERSION} release created successfully
```

## Version Strategy
- **spl1 starts at 0.6.0** (continuation from spl0 which ended at 0.5.x)
- **Target 1.0** when Repository Restructure (RR) reaches end goal state
- **0.6.0 "Baseline"**: Seven-epic structure + initial analysis/planning issues
- **0.6.1 "Sufficient Analysis & Planning"**: First pass analysis enabling implementation
- **0.6.2+ progression**: PRINCE2 "just enough planning" approach

## Integration Points

### Version Management
- Follows Critical Version Management Rule from CLAUDE.md
- Maintains complete historical tracking through archived logs
- Clean separation between version development cycles

### Development Continuity  
- Archived logs preserve complete development history
- Fresh logs enable clean start for next version
- Historical learnings remain accessible for future reference

### Release Artifacts
- Git tags for version identification
- GitHub releases with comprehensive release notes from learnings
- Self-extracting archive for distribution

## Benefits

### Historical Preservation
- Complete development history maintained in archived logs
- Learning documentation preserved for future reference  
- Decision context available for retrospective analysis

### Clean Version Transitions
- Fresh start for next version development
- Clear separation between version cycles
- Systematic release preparation process

### Release Accountability
- Comprehensive release notes from captured learnings
- Complete traceability from planning through implementation
- Systematic version closure process