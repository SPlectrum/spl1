# CLAUDE.md

This file provides essential operational guidance for Claude Code when working with this repository.

## Critical File Reference Rule

**MANDATORY FILE PATH SPECIFICATION**: All file references in workflows, documentation, and instructions MUST specify exact file paths.

**Examples:**
- ❌ "log in timelog" → ✅ "log in `logs/timelog.txt`"
- ❌ "update documentation" → ✅ "update `docs/project-overview.md`"
- ❌ "check the config" → ✅ "check `settings/config.json`"

**Purpose**: Eliminates ambiguity, prevents errors, enables automation, and improves maintainability.

## Critical Workflow Execution Rule

**MANDATORY WORKFLOW LOGGING**: When any custom workflow is recognized, Claude MUST:

1. **FIRST ACTION**: Log workflow start in `logs/timelog.txt` before executing any workflow steps:
   ```
   ##→YYYY-MM-DDTHH:MM:SSZ | WORKFLOW_NAME | workflow_start: [workflow_context]
   ```

2. **DURING EXECUTION**: Log each workflow step as it is completed:
   ```
   ##→YYYY-MM-DDTHH:MM:SSZ | WORKFLOW_NAME | step_description: [step_details]
   ```

3. **LAST ACTION**: Log workflow completion after all workflow steps complete:
   ```
   ##→YYYY-MM-DDTHH:MM:SSZ | WORKFLOW_NAME | workflow_complete: [summary]
   ```

This enables detection of incomplete workflow executions and ensures proper workflow accountability.

**SESSION_START SPECIAL REQUIREMENT**: When SESSION_START workflow is recognized, Claude MUST check system time first to ensure accurate timestamps for all session activities.

## Critical Branch Management Rule

**MANDATORY BRANCH POLICY**: Repository MUST maintain proper branch state for all work types.

### 1. Default State Rule
- Repository MUST default to `unplanned` branch at all times
- Prevents accidental commits to main branch
- SESSION_START MUST verify and switch to unplanned if on main

### 2. Branch Switching Protocol
**MANDATORY: Complete work cycle before leaving ANY branch:**
1. Commit all changes to current branch
2. Push current branch to remote
3. Create PR: current-branch → main
4. Merge PR (integrates work into main)
5. Only then switch to target branch

**After switching to target branch:**
- Merge main → target-branch to get latest changes (including work just merged)
- Ensures target branch starts with complete current codebase

**CRITICAL WORKFLOW INTEGRITY RULE:**
- **MUST NOT modify any repository files during steps 1-5 above**
- **NO timelog entries, documentation updates, or any file changes during PR cycle**
- **File modifications ONLY allowed after successful branch switch**
- **Workflow tracking happens AFTER transition, never during**

**Critical Rules:**
- NO branch transitions without completing PR cycle first
- NO file modifications during transition sequence

### 3. Work Lifecycle Management
**Issue Branches (`feature/issue-123`, `bugfix/issue-456`):**
- Accumulate multiple commits throughout issue development
- MUST complete PR cycle when transitioning away from branch (even if issue incomplete)
- Branch can be recreated from main for continued work
- Branch deleted only after issue completion

**Unplanned Branch:**
- Immediate commit + PR + merge cycle for each work session
- MUST complete PR cycle when transitioning to issue work
- Always kept active, never deleted
- Gets continuous main updates through merge operations

### 4. Integration Strategy
**All Branch Transitions:**
```
any-branch: commit → push → PR → merge → switch → merge main into target
```

**Unplanned Work Flow:**
```
unplanned: commit → PR → merge → (optional switch)
```

**Issue Work Flow:**
```
issue-branch: accumulate commits → PR when transitioning → continue or complete
```

**Integration Points:**
- Every branch transition forces work through main
- All active branches stay synchronized via main
- No work isolation - everything integrates continuously
- Prevents branch divergence and work loss

**Purpose**: Maintains clean separation between planned/unplanned work, prevents conflicts, ensures all work stays current with latest changes.
## Workflow Triggers

**KEYWORD_REGISTRY** → See [workflows/KEYWORD_REGISTRY.md](./workflows/KEYWORD_REGISTRY.md) - Complete keyword system

### User-Friendly Sesame Triggers
Use natural language with "sesame" suffix:
- `start sesame` → SESSION_START workflow
- `finish sesame` → SESSION_END workflow  
- `git sesame` → GIT_WORKFLOW
- `github sesame` → GITHUB_WORKFLOW
- `rules sesame` → OPERATIONAL_RULES
- `commands sesame` → ESSENTIAL_COMMANDS
- `release sesame` → RELEASE_PROCESS
- `planning sesame` → PLANNED_VS_UNPLANNED
- `project sesame` → PROJECT_AUTOMATION
- `next sesame` → NEXT_ISSUE
- `recommend sesame` → WORKFLOW_RECOMMENDATION (experimental)

### Technical Keywords (for documentation)
**SESSION_START** → See [workflows/SESSION_START.md](./workflows/SESSION_START.md)
**GITHUB_WORKFLOW** → See [workflows/GITHUB_WORKFLOW.md](./workflows/GITHUB_WORKFLOW.md)  
**GIT_WORKFLOW** → See [workflows/GIT_WORKFLOW.md](./workflows/GIT_WORKFLOW.md)
**OPERATIONAL_RULES** → See [workflows/OPERATIONAL_RULES.md](./workflows/OPERATIONAL_RULES.md)
**ESSENTIAL_COMMANDS** → See [workflows/ESSENTIAL_COMMANDS.md](./workflows/ESSENTIAL_COMMANDS.md)
**RELEASE_PROCESS** → See [workflows/RELEASE_PROCESS.md](./workflows/RELEASE_PROCESS.md)
**PLANNED_VS_UNPLANNED** → See [workflows/PLANNED_VS_UNPLANNED.md](./workflows/PLANNED_VS_UNPLANNED.md)
**WORKFLOW_RECOMMENDATION** → See [workflows/WORKFLOW_RECOMMENDATION.md](./workflows/WORKFLOW_RECOMMENDATION.md)

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
- `docs/current-development-process.md` - Current development workflow and process


## Persistent Todo Management

**Repository Todo List**: `todo-list.md` - Maintains discussion topics and todos across sessions to ensure continuity.

## Learning Rule

At regular intervals, ask "What have I learned?" and update documentation in appropriate docs/ files.

## Future Evolution

See [Subdirectory CLAUDE.md Evolution Plan](./docs/subdirectory-claude-md-plan.md) for planned transition to federated repository architecture.