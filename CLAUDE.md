# CLAUDE.md

This file provides essential operational guidance for Claude Code when working with this repository.

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

## Critical Operational Rules

- **Discuss, Think, Plan, Start**: For all significant work, follow this methodology - initiate discussions, request planning time, create planning documents, then implement
- **Always return to repo root** (`/mnt/c/SPlectrum/spl0`) after any subdirectory operations
- **Never use in-code defaults** (`|| "value"`) - causes hidden bugs
- **Use named arguments ALWAYS** - `spl/app/run -f script.js -a args` NOT `spl/app/run script.js args`
- **Correct command syntax** - `./spl_execute <install-folder> <app-name> <command>` (e.g., `./spl_execute spl boot usr/apps_to_release`)
- **Test batch files first** with `spl/app/exec -f` before generating usr/ commands
- **Package before commit** - run four-step release process before git operations
- **Stage all files before commit** - work packages are atomic, use `git add .`
- **Module locations**: Global (`/modules/`) vs install (`/spl/modules/`) - check app's `spl.js`
- **Script vs Batch**: `scripts/` for multi-language execution, `batches/` for SPL commands
- **Documentation housekeeping**: When features are completed, REMOVE all planning/scaffolding documentation entirely - don't mark as "completed", delete the sections and renumber remaining items

## Git Workflow

```bash
git status && git diff && git log --oneline -5  # Check state
git add .                                       # Stage ALL files (atomic work packages)
git commit -m "conventional: description..."     # Commit with Claude attribution
git push                                        # Push to remote
```

## Quick Debugging

- **Use debug flag**: `./spl_execute spl app-name -d command` 
- **Check modules**: Read app's `spl.js` for module path resolution
- **Test help**: All commands support `-h` or `--help`
- **Path issues**: Use `spl.context(input, "cwd")` for install root

## Key Files for Understanding

- `modules/spl/spl.js` - Core utility library
- `docs/project-overview.md` - Architecture and components  
- `docs/app-development.md` - Application development patterns
- `docs/code-quality-patterns.md` - Critical coding standards
- `docs/testing-frameworks.md` - Testing methodologies
- `docs/future-development.md` - Roadmap and planned improvements

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

## Essential Development Tools

**Required for AI-assisted development**:
- `gh` (GitHub CLI) - Release creation, PR management
- `rg` (ripgrep) - Fast code searching (preferred over grep)
- `7z` - Archive operations via tools/7zip API
- `git` - Version control via tools/git API
- `node` v14+ - Core runtime

## Learning Rule

At regular intervals, ask "What have I learned?" and update documentation in appropriate docs/ files.

## Future Evolution

See [Subdirectory CLAUDE.md Evolution Plan](./docs/subdirectory-claude-md-plan.md) for planned transition to federated repository architecture.