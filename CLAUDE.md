# CLAUDE.md

This file provides essential operational guidance for Claude Code when working with this repository.

## spl1 Context

**Transition Repository**: spl1 focuses on repository restructure, external install workflows, and core API enhancements. See [Federated Monorepo Design](./docs/federated-monorepo-design.md) for transition strategy.

**Development Strategy**: Uses [Phase-Based Development](./docs/phase-based-development-strategy.md) - breaking roadmap items into phases that combine efficiently across different areas, following PRINCE2 "just enough planning" principles.

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

## Git Workflow

**Branching Strategy**: Uses simplified GitHub Flow with issue-per-branch approach. See [Branching Strategy](./docs/branching-strategy.md) for details.

**Branch Types**:
- `feature/issue-123` - Individual GitHub issues (1-3 days)
- `bugfix/issue-456` - Bug fixes with TDD workflow (same day preferred)

**Standard Workflow**:
```bash
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

## Quick Debugging

- **Use debug flag**: `./spl_execute spl app-name -d command` 
- **Check modules**: Read app's `spl.js` for module path resolution
- **Test help**: All commands support `-h` or `--help`
- **Path issues**: Use `spl.context(input, "cwd")` for install root

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

## GitHub Project Management

**Integration Intention**: GitHub Projects will enhance the existing workflow by providing visual Kanban boards, cross-phase coordination, and automated issue tracking. This complements the current milestone/issue/branch pattern without disrupting it.

**Seven-Epic Structure**:
- **RR**: Repository Restructure (federated monorepo design)
- **SE**: SPlectrum Engines (external install workflows)  
- **CAE**: Core API Enhancement (unified streaming APIs)
- **TDD**: TDD Implementation (comprehensive test-driven workflow)
- **BARE**: Migration to Bare (minimal dependency architecture)
- **NFD**: New Functionality Development (cross-epic supporting tools)
- **AVRO**: AVRO Integration (schema-based data architecture)

**Phase-Based Planning**:
- **Milestones** = Epic phases with prefixes (e.g., RR-1, CAE-1) lasting 1-3 weeks
- **Issues** = Specific tasks within phases (1-3 days)  
- **Versions** = Combination of related phases across multiple epics
- **Projects** = Visual workflow management across all phases (NFD-1 issue #9)

**Milestone → Issue → Branch Workflow**:
```bash
# 1. Create milestone for epic phase
gh api repos/:owner/:repo/milestones --method POST \
  --field title="RR-1: Repository Restructure - Phase 1" \
  --field description="Phase 1: Plan and implement single-concern folder structure"

# 2. Create issues within milestone  
gh issue create --title "Plan single-concern folder structure" \
  --milestone "RR-1: Repository Restructure - Phase 1" \
  --label "planning,enhancement"

# 3. Work on individual issues
git checkout -b feature/issue-123
# Work and commit referencing issue...
gh pr create --title "Plan folder structure (#123)" --body "Closes #123"
```

**Version Strategy**:
- **spl1 starts at 0.6.0** (continuation from spl0 which ended at 0.5.x)
- **Target 1.0** when Repository Restructure (RR) reaches end goal state
- **0.6.0 "Baseline"**: Seven-epic structure + initial analysis/planning issues
- **0.6.1 "Sufficient Analysis & Planning"**: First pass analysis enabling implementation
- **0.6.2+ progression**: PRINCE2 "just enough planning" approach

## Essential Development Tools

**Required for AI-assisted development**:
- `gh` (GitHub CLI) - Release creation, PR management
- `rg` (ripgrep) - Fast code searching (preferred over grep)
- `7z` - Archive operations via tools/7zip API
- `git` - Version control via tools/git API
- `node` v14+ - Core runtime

## Learning Rule

At regular intervals, ask "What have I learned?" and update documentation in appropriate docs/ files.

## Time Tracking Responsibility

**Active Time Logging**: Claude Code maintains an append-only time log at `/logs/timelog.txt` during all sessions using activity-driven format: `timestamp | activity_type | context`

**Key Responsibilities**:
- Log `session_start` and `session_end` for every session
- Update log at natural transition points (activity changes, issue switches, breaks)
- Use activity types: `discussion`, `planning`, `development`, `testing`, `documentation`, `research`, `break`, `issue_switch`
- Context format: `#123 description` for issues, `unassigned` for general work
- Follow format specification in `/logs/timelog-format.md`

**Integration with Workflow**:
- Log activity changes when starting new issues or switching contexts
- Record break periods for accurate session analysis
- Enable post-session analysis of time distribution and productivity patterns

## Future Evolution

See [Subdirectory CLAUDE.md Evolution Plan](./docs/subdirectory-claude-md-plan.md) for planned transition to federated repository architecture.