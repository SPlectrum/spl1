# CLAUDE.md

This file provides essential operational guidance for Claude Code when working with this repository.

## ⚠️ CRITICAL: SESSION INITIATION & TIME TRACKING ⚠️

**IMMEDIATELY upon starting ANY session:**
1. **START TIME TRACKING**: Use Edit tool to append session_start entry to `/logs/timelog.txt`:
   ```
   ##→YYYY-MM-DDTHH:MM:SSZ | session_start | unassigned
   ```
2. **LOG FIRST ACTIVITY**: Use Edit tool to append activity entry:
   ```
   ##→YYYY-MM-DDTHH:MM:SSZ | discussion/planning/development | context_description
   ```

**CRITICAL FORMAT RULES:**
- **NEVER use bash echo >> for timelog updates** - causes format corruption
- **ALWAYS use Edit tool** for all timelog modifications
- **ALWAYS use UTC timestamps** with Z suffix for consistency
- **Follow exact format**: `    ##→TIMESTAMP | activity | context`

**ONGOING TIME TRACKING RESPONSIBILITY:**
- Log `session_start` and `session_end` for every session
- Update log at natural transition points (activity changes, issue switches, breaks)
- Use activity types: `discussion`, `planning`, `development`, `testing`, `documentation`, `research`, `break`, `issue_switch`
- Context format: `#123 description` for issues, `unassigned` for general work
- Enable post-session analysis of time distribution and productivity patterns

## spl1 Context

**Transition Repository**: spl1 focuses on repository restructure, external install workflows, and core API enhancements. See [Federated Monorepo Design](./docs/federated-monorepo-design.md) for transition strategy.

**Development Strategy**: Uses [Phase-Based Development](./docs/phase-based-development-strategy.md) - breaking roadmap items into phases that combine efficiently across different areas, following PRINCE2 "just enough planning" principles.

## GitHub Project Management Workflow

**Primary Workflow**: Backlog → Project → Planning → Implementation

### **Seven-Epic Structure**
- **RR**: Repository Restructure (federated monorepo design)
- **SE**: SPlectrum Engines (external install workflows)  
- **CAE**: Core API Enhancement (unified streaming APIs)
- **TDD**: TDD Implementation (comprehensive test-driven workflow)
- **BARE**: Migration to Bare (minimal dependency architecture)
- **NFD**: New Functionality Development (cross-epic supporting tools)
- **AVRO**: AVRO Integration (schema-based data architecture)

### **Backlog → Planning → Execution Workflow**

**1. Adding New Work to Backlog (Lightweight)**
```bash
# Create issue with epic labeling only - NO project assignment
gh issue create --title "Epic-Prefix: Feature description" \
  --label "enhancement,EPIC_NAME" \
  --body "Detailed description with Epic section"
# Fast backlog creation - no configuration overhead
```

**2. Planning Session Import (When Ready to Work)**
```bash
# Import selected issues to project with full configuration
node status/project-automation.js import --issues 27,28,29 --version 0.6.2
# Configures all decision-making fields automatically
```

**3. Daily Execution (Fast Recommendations)**
```bash
# Get recommendations from planned work only
node status/project-automation.js recommend
# Only processes items in project - fast performance
```

**4. Version Completion Cleanup**
```bash
# Remove completed version items from project
node status/project-automation.js remove --version 0.6.1
# Keeps project focused on current work only
```

### **Label Strategy**
- **Work Type Labels**: `enhancement`, `bug`, `feature`, `task`, `documentation`
- **Epic Labels**: `RR`, `SE`, `CAE`, `TDD`, `BARE`, `NFD`, `AVRO`
- **Dual Labeling**: All issues must have both work type and epic labels for immediate identification

### **Issue Lifecycle States**
- **Backlog**: Issues created but not in project (lightweight capture)
- **Planned**: Issues imported to project with full field configuration  
- **Active**: In Progress status in project
- **Complete**: Done status in project
- **Archived**: Removed from project when version complete

### **Feature → Task Breakdown**
- **Features**: High-level work items labeled as `feature` + epic (e.g., `feature,NFD`)
- **Tasks**: Implementation items broken from features, labeled as `task` + epic (e.g., `task,NFD`)
- **Timing**: Task breakdown happens during planning import, not at backlog creation

### **Phase-Based Planning**
- **Milestones** = Epic phases with prefixes (e.g., RR-1, CAE-1) lasting 1-3 weeks
- **Issues** = Specific tasks within phases (1-3 days)  
- **Versions** = Combination of related phases across multiple epics
- **Projects** = Visual workflow management across all phases

**Project Benefits**: Visual workflow management, cross-epic coordination, immediate epic identification, milestone planning integration.

## Essential Commands

**Main Execution**:
```bash
./spl_execute <install-folder> <app-name> <command> [options] [args]
./spl_execute spl test-suite spl/console/log hello world
```

**From App Directory**:
```bash
./spl <command>                                 # Direct execution
./spl spl/app/exec -f {file}.batch             # Test batch files
./spl spl/app/create -f {file}.batch           # Generate usr/ methods
./spl spl/app/run -f {script} -a {args}        # Run script with arguments
./spl spl/app/wrap -f {script}                 # Wrap script as usr/ method
```

**Four-Step Release Process**:
1. `./spl_execute spl boot usr/apps_to_release` (Update app packages)
2. `./spl_execute spl boot usr/release_to_install -a {folder}` (Release → Install)
3. `./spl_execute spl boot usr/modules_to_boot` (Install → Boot)  
4. `./spl_execute spl boot usr/boot_to_release` (Boot → Release)

## Git Workflow

**Branching Strategy**: Uses simplified GitHub Flow with issue-per-branch approach integrated with GitHub Projects.

**Branch Types**:
- `feature/issue-123` - Individual GitHub issues (1-3 days)
- `bugfix/issue-456` - Bug fixes with TDD workflow (same day preferred)

**Complete Workflow**:
```bash
# 1. Issue created and added to project (see GitHub Project Management above)
# 2. When assigned to milestone (planned work):
git status && git diff && git log --oneline -5  # Check state
git checkout -b feature/issue-123               # Create issue branch
# Work on specific issue...
git add .                                       # Stage ALL files (atomic work packages)
git commit -m "feat: implement feature (#123)" # Reference issue number
gh pr create --title "Feature title (#123)" --body "Closes #123"
```

**TDD Bug Workflow**:
```bash
git checkout -b bugfix/issue-456               # Bug fix branch
# Write failing test first (Red)
git commit -m "test: add failing test for bug (#456)"
# Implement fix (Green)  
git commit -m "fix: resolve issue description (#456)"
gh pr create --title "Fix bug title (#456)" --body "Closes #456"
```

## Operational Rules Framework

### **MUST Rules** (Non-Negotiable Requirements)
- **Discuss, Think, Plan, Start**: For all significant work, follow this methodology - initiate discussions, request planning time, create planning documents, then implement
- **Time tracking REQUIRED** - Update `/logs/timelog.txt` at every activity transition, issue switch, and session boundary
- **Document learnings REQUIRED** - At session end, capture "What have I learned?" in appropriate docs/ files
- **Assign issues to milestones** - All issues must be assigned to appropriate epic phase milestone
- **Always return to repo root** (`/mnt/c/SPlectrum/spl1`) after any subdirectory operations
- **Stage all files before commit** - Work packages are atomic, use `git add .`
- **Package before commit** - Run four-step release process before git operations

### **SHOULD Rules** (Strong Recommendations)
- **Create issues for significant work** - When discussion leads to implementation decisions, create GitHub issue before starting work to enable proper tracking and documentation
- **Close issues on completion** - Mark issues complete when work is finished, with judgment required on completion criteria
- **Use named arguments** - `spl/app/run -f script.js -a args` NOT `spl/app/run script.js args`
- **Correct command syntax** - `./spl_execute <install-folder> <app-name> <command>` (e.g., `./spl_execute spl boot usr/apps_to_release`)
- **Test batch files first** with `spl/app/exec -f` before generating usr/ commands
- **Follow existing code patterns** - Mimic style, libraries, and conventions in codebase
- **Documentation housekeeping** - When features completed, REMOVE planning/scaffolding docs entirely

### **PREFER Rules** (Better Choices When Options Exist)
- **PREFER editing existing files** over creating new ones
- **PREFER rg (ripgrep)** over grep for searching
- **PREFER Task tool** for unknown codebase exploration
- **PREFER direct tools** (Read, Glob) for specific known files

### **AVOID Rules** (Generally Don't Do)
- **AVOID in-code defaults** (`|| "value"`) - causes hidden bugs
- **AVOID creating unnecessary documentation** - only create when explicitly requested
- **AVOID mixing concerns** - Script vs Batch: `scripts/` for multi-language, `batches/` for SPL

### **CONTEXTUAL Rules** (Situation-Dependent Guidelines)
- **Module locations**: Check app's `spl.js` - Global (`/modules/`) vs install (`/spl/modules/`)
- **Debug mode**: Use `./spl_execute spl app-name -d command` when troubleshooting
- **Path issues**: Use `spl.context(input, "cwd")` for install root resolution
- **Test help**: All commands support `-h` or `--help` for guidance

## Quick Debugging

- **Use debug flag**: `./spl_execute spl app-name -d command` 
- **Check modules**: Read app's `spl.js` for module path resolution
- **Test help**: All commands support `-h` or `--help`
- **Path issues**: Use `spl.context(input, "cwd")` for install root

## Essential Development Tools

**Required for AI-assisted development**:
- `gh` (GitHub CLI) - Release creation, PR management, project integration
- `rg` (ripgrep) - Fast code searching (preferred over grep)
- `7z` - Archive operations via tools/7zip API
- `git` - Version control via tools/git API
- `node` v14+ - Core runtime

## Key Files for Understanding

**Core Platform**:
- `modules/spl/spl.js` - Core utility library
- `docs/project-overview.md` - Architecture and components  
- `docs/app-development.md` - Application development patterns
- `docs/code-quality-patterns.md` - Critical coding standards
- `docs/testing-frameworks.md` - Testing methodologies

**spl1 Strategy**:
- `docs/phase-based-development-strategy.md` - PRINCE2-inspired roadmap execution approach
- `docs/phase-based-implementation-guide.md` - Step-by-step workflow implementation guide
- `docs/branching-strategy.md` - Simplified GitHub Flow with integrated TDD
- `docs/future-development.md` - Learning capture and planned improvements

## Release Creation Process

**Complete GitHub Release Workflow**:
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

## Learning Rule

At regular intervals, ask "What have I learned?" and update documentation in appropriate docs/ files.

## Future Evolution

See [Subdirectory CLAUDE.md Evolution Plan](./docs/subdirectory-claude-md-plan.md) for planned transition to federated repository architecture.