# SE-1 Git Workflow Enforcement Engine Specification

## Overview

The SE-1 Git Workflow Enforcement Engine is a prototype SPlectrum Engine designed to eliminate human/AI procedural errors in git branch management by enforcing rigid workflow rules automatically.

## Problem Statement

Current git workflow requires manual execution of complex multi-step sequences:
- SESSION_START: 4-step main sync process
- Unplanned work: 7-step commit→PR→merge→sync cycle  
- Issue work: 6-step main sync→branch creation→work cycle
- Post-PR sync: 4-step mandatory sync sequence

**Failure modes observed:**
- Forgetting post-PR main sync (branches diverge)
- Skipping SESSION_START sync (working with stale code)
- Manual merge conflict resolution errors
- Inconsistent workflow execution

## Solution: Rigid Rule Enforcement

Replace manual procedural execution with automated rule enforcement that makes incorrect execution impossible.

## SE-1 Engine Specification

### Core Principle
**No git operations allowed unless workflow prerequisites are satisfied**

### Engine Components

#### 1. State Validator
- **Function**: Verify repository state before allowing operations
- **Rules**: 
  - Block commands if main not synced with remote
  - Block branch switches without clean working directory
  - Block PR creation without proper commit format
- **Implementation**: Git hooks + wrapper scripts

#### 2. Workflow Enforcer  
- **Function**: Execute complete workflows as atomic operations
- **Commands**:
  - `se1 session-start` → Complete SESSION_START workflow
  - `se1 unplanned-work <description>` → Full unplanned cycle
  - `se1 issue-work <issue-number>` → Issue branch creation with sync
- **Failure handling**: Rollback on any step failure

#### 3. Sync Guardian
- **Function**: Automatic post-PR synchronization
- **Trigger**: Any PR merge completion
- **Action**: Mandatory main sync + unplanned update
- **Implementation**: GitHub webhook + local automation

#### 4. Validation Reporter
- **Function**: Real-time workflow compliance monitoring  
- **Output**: Branch sync status, workflow step completion
- **Integration**: Claude Code workflow logging

### Technical Architecture

```
SE-1 Engine Layer
├── Git State Monitor (validates prerequisites)
├── Workflow Executor (atomic operations)  
├── Sync Controller (post-PR automation)
└── Compliance Reporter (status tracking)
```

### Implementation Strategy

#### Phase 1: Git Hook Enforcement
- Pre-commit: Validate working directory state
- Pre-push: Ensure main sync completed
- Post-merge: Auto-trigger sync sequence

#### Phase 2: Workflow Commands
- Replace manual git sequences with SE-1 commands
- Atomic execution with rollback on failure
- Integration with existing timelog system

#### Phase 3: Remote Integration  
- GitHub webhook integration
- Automatic post-PR sync triggers
- Cross-session state persistence

### Success Criteria

1. **Zero procedural errors** - Impossible to execute incorrect workflow
2. **Reduced cognitive load** - AI focuses on content, not procedure
3. **Consistent execution** - Same workflow outcome every time
4. **Failure resilience** - Graceful handling of conflict scenarios

### Integration Points

- **CLAUDE.md workflows** - Replace manual procedures with SE-1 commands
- **TodoWrite system** - SE-1 manages workflow todos automatically  
- **Timelog tracking** - SE-1 logs workflow execution automatically
- **GitHub Projects** - SE-1 updates issue states based on workflow completion

### Example Usage

Instead of:
```bash
git add .
git commit -m "..."
gh pr create --title "..." --body "..."
gh pr merge --squash
git checkout main
git pull origin main
git checkout unplanned  
git merge main
```

SE-1 provides:
```bash
se1 unplanned-work "update GIT_WORKFLOW documentation"
# Executes entire sequence atomically with validation
```

## Next Steps

1. Create GitHub issue for SE-1 prototype implementation
2. Design git hook architecture for state validation
3. Implement basic workflow command wrappers
4. Test against current git workflow pain points
5. Integrate with Claude Code operational workflows

This prototype will serve as proof-of-concept for SPlectrum Engine rigid rule enforcement, demonstrating how operational procedures can be made error-proof through systematic automation.