# CLAUDE.md

This file provides essential operational guidance for Claude Code when working with this repository.

## Workflow Triggers

**KEYWORD_REGISTRY** → See [workflows/KEYWORD_REGISTRY.md](./workflows/KEYWORD_REGISTRY.md) - Complete keyword system

**SESSION_START** → See [workflows/SESSION_START.md](./workflows/SESSION_START.md)
**GITHUB_WORKFLOW** → See [workflows/GITHUB_WORKFLOW.md](./workflows/GITHUB_WORKFLOW.md)  
**GIT_WORKFLOW** → See [workflows/GIT_WORKFLOW.md](./workflows/GIT_WORKFLOW.md)
**OPERATIONAL_RULES** → See [workflows/OPERATIONAL_RULES.md](./workflows/OPERATIONAL_RULES.md)
**ESSENTIAL_COMMANDS** → See [workflows/ESSENTIAL_COMMANDS.md](./workflows/ESSENTIAL_COMMANDS.md)
**RELEASE_PROCESS** → See [workflows/RELEASE_PROCESS.md](./workflows/RELEASE_PROCESS.md)
**PLANNED_VS_UNPLANNED** → See [workflows/PLANNED_VS_UNPLANNED.md](./workflows/PLANNED_VS_UNPLANNED.md)

## spl1 Context

**Transition Repository**: spl1 focuses on repository restructure, external install workflows, and core API enhancements. See [Federated Monorepo Design](./docs/federated-monorepo-design.md) for transition strategy.

**Development Strategy**: Uses [Phase-Based Development](./docs/phase-based-development-strategy.md) - breaking roadmap items into phases that combine efficiently across different areas, following PRINCE2 "just enough planning" principles.


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


## Learning Rule

At regular intervals, ask "What have I learned?" and update documentation in appropriate docs/ files.

## Future Evolution

See [Subdirectory CLAUDE.md Evolution Plan](./docs/subdirectory-claude-md-plan.md) for planned transition to federated repository architecture.