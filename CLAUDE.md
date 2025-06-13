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
```

**Three-Step Release Process**:
1. `usr/release_to_install -a {folder}` (Release → Install)
2. `usr/modules_to_boot` (Install → Boot)  
3. `usr/boot_to_release` (Boot → Release)

## Critical Operational Rules

- **Always return to repo root** (`/mnt/c/SPlectrum/spl0`) after any subdirectory operations
- **Never use in-code defaults** (`|| "value"`) - causes hidden bugs
- **Test batch files first** with `spl/app/exec -f` before generating usr/ commands
- **Package before commit** - run three-step release process before git operations
- **Stage all files before commit** - work packages are atomic, use `git add .`
- **Module locations**: Global (`/modules/`) vs install (`/spl/modules/`) - check app's `spl.js`
- **Script vs Batch**: `scripts/` for multi-language execution, `batches/` for SPL commands

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

## Learning Rule

At regular intervals, ask "What have I learned?" and update documentation in appropriate docs/ files.