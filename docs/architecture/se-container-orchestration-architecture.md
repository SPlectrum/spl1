# SPlectrum Engine Container Orchestration Architecture

## Overview

The SPlectrum Engine (SE) Container provides workflow orchestration capabilities that combine rigid execution guarantees with intelligent adaptability through Claude AI assistance. This architecture enables reliable, resumable, and collaborative workflow execution.

## Core Architecture

### Separation of Concerns

```
Claude AI (Agile Intelligence Layer)
    ↓ API calls / Terminal commands
SE Container (Rigid Workflow Executor)
    ↓ integrates with
Existing Tools/Scripts (Implementation Layer)
    ↓ operates on
Repository Data (Persistence Layer)
```

**Responsibilities**:
- **Claude AI**: Decision-making, exception handling, workflow adaptation, contextual intelligence
- **SE Container**: Workflow orchestration, state management, execution guarantees, progress tracking
- **Existing Tools**: Implementation of specific operations (git, GitHub API, file processing)
- **Repository**: Single source of truth for all state and persistence

## Dual-Mode Execution Architecture

### Mode 1: Interactive Terminal (Primary Development Mode)

**Use Case**: Active development, debugging, iterative workflow execution

```bash
claude: se shell
# Long-running container with terminal access
se> execute VERSION_TRANSITION --async
se> status all-workflows
se> check branch-sync
se> resume workflow-abc123
se> help workflows
se> exit
```

**Characteristics**:
- Persistent container instance during active session
- Real-time interaction and debugging capabilities
- Immediate command response
- Repository state awareness maintained
- Manual lifecycle management by Claude

### Mode 2: Fire-and-Forget Commands (Parallel Execution)

**Use Case**: Background workflows, parallel processing, unattended execution

```bash
claude: se execute VERSION_TRANSITION &
claude: se execute AUDIT_ANALYSIS &
claude: se execute REPOSITORY_MAINTENANCE &
# Multiple ephemeral containers running in parallel
claude: se status  # Shows all running workflows
```

**Characteristics**:
- Ephemeral containers (start, execute, save state, exit)
- Parallel workflow execution
- Auto-exit after completion
- No interactive capabilities
- Minimal resource overhead

## Collaborative Workflow Pattern

### Dialogue-Based Exception Handling

The SE container executes workflows rigidly but can request Claude intervention for complex decisions:

```
SE Container: Execute step 1, 2, 3... ✅
SE Container: ⚠️ Exception at step 4 - merge conflict detected
SE Container: State saved to claude/workflow-state/VERSION_TRANSITION-20250622.json
SE Container: Request Claude intervention: resolve merge conflicts in docs/guides/

Claude: [analyzes conflicts, makes intelligent decisions, resolves issues]
Claude: SE container, conflicts resolved - continue execution

SE Container: Loading state... resuming from step 4
SE Container: Execute step 5, 6, 7... ✅ Workflow complete
```

### Exception Scenarios Requiring Intelligence

- **Merge Conflicts**: Require domain knowledge for resolution
- **Content Decisions**: Which version to keep, how to merge changes
- **Workflow Branching**: Conditional paths based on repository analysis
- **Error Recovery**: Complex failure scenarios requiring contextual understanding
- **Validation Failures**: When automated checks fail and require manual assessment

## State Management and Persistence

### Repository-Based State Storage

All state persistence uses repository files - no container-internal state:

```
claude/
├── workflow-state/           # Active workflow execution state
│   ├── VERSION_TRANSITION-20250622.json
│   ├── AUDIT_ANALYSIS-20250622.json
│   └── workflow-registry.json
├── audit/                    # Audit and execution logs
│   ├── current/
│   └── v0.6.1/
├── tools/                    # Executable workflow tools
└── workflows/               # Workflow definitions
```

### State Structure

```json
{
  "workflowId": "VERSION_TRANSITION-20250622",
  "workflowType": "VERSION_TRANSITION",
  "startTime": "2025-06-22T10:30:00Z",
  "currentStep": 4,
  "totalSteps": 7,
  "status": "awaiting_intervention",
  "context": {
    "version": "0.6.1",
    "targetFolder": "docs/",
    "conflictFiles": ["docs/guides/process.md"]
  },
  "completedSteps": [1, 2, 3],
  "interventionRequest": {
    "type": "merge_conflict",
    "description": "resolve merge conflicts in docs/guides/",
    "requiredAction": "manual_resolution"
  }
}
```

## API Design and Interface

### Keyword-Based API

Natural language workflow triggers map to rigid execution paths:

```bash
se execute VERSION_TRANSITION [--version 0.6.1] [--async]
se execute AUDIT_ANALYSIS [--target claude/audit/v0.6.1/]
se execute REPOSITORY_MAINTENANCE [--scope current-platform]
se status [workflow-id]
se resume workflow-id
se cancel workflow-id
se list workflows
```

### Integration Points

**Git Operations**: SE container handles all git commands, branch management, PR creation
**GitHub API**: Issue management, project updates, release creation  
**File System**: Repository analysis, documentation updates, file organization
**Tool Execution**: Orchestrated execution of existing analysis and maintenance tools

## Application Architecture

### Initial App Strategy: One App Per Workflow Type

**Rationale**: Focused functionality, easier maintenance, clear separation of concerns

**Planned Apps**:
- `se-version-transition`: VERSION_TRANSITION workflow orchestration
- `se-github-workflow`: GitHub issue and project management workflows  
- `se-audit-management`: Audit log processing and analysis workflows
- `se-repository-maintenance`: Repository cleanup and maintenance workflows

**Future Consolidation**: Apps can be consolidated into unified SE container as patterns emerge

### Container Configuration

**Image Base**: Lightweight base with Node.js runtime
**Mounted Volumes**:
- Repository root: `/workspace` (read-write access)
- Tool directory: `/workspace/claude/tools` (executable access)

**Environment**:
- GitHub token for API access
- Git configuration for repository operations
- Access to all existing tools and scripts

## Implementation Benefits

### Reliability Guarantees

- **Workflow Completion**: SE ensures workflows either complete successfully or clearly indicate intervention points
- **State Recovery**: Interrupted workflows can resume from last successful step
- **Audit Trail**: Complete execution history preserved in repository
- **Error Handling**: Structured exception handling with clear intervention requests

### Development Efficiency

- **Simplified Interface**: Single API for complex multi-step workflows
- **Parallel Execution**: Multiple workflows can run simultaneously without interference
- **Interactive Development**: Terminal mode enables rapid iteration and debugging
- **Consistent Execution**: Same workflow behavior regardless of execution context

### Scalability

- **Stateless Containers**: Easy to scale horizontally for parallel processing
- **Repository Persistence**: No database dependencies or external state requirements
- **Tool Integration**: Leverage existing tools without rewriting functionality
- **Flexible Deployment**: Can run locally, in CI/CD, or in cloud environments

## Future Evolution

### Enhanced Orchestration Capabilities

- **Conditional Workflows**: Dynamic workflow paths based on repository state
- **Workflow Composition**: Combining multiple workflows into larger orchestrations
- **Dependency Management**: Automatic sequencing of dependent workflows
- **Resource Optimization**: Intelligent scheduling and resource allocation

### Advanced Intelligence Integration

- **Predictive Intervention**: SE anticipates likely intervention points
- **Learning Patterns**: SE learns from intervention history to improve automation
- **Context Awareness**: SE understands repository context for better decision support
- **Automated Resolution**: SE handles increasingly complex scenarios without intervention

## Related Documentation

- **[SE Container Deployment Strategy](./se-container-deployment-strategy.md)**: Container runtime selection, P2P networking, and distributed execution patterns
- **[GitHub Issue #78](https://github.com/SPlectrum/spl1/issues/78)**: SE Container prototype implementation roadmap

---

*This architecture provides the foundation for reliable, intelligent workflow orchestration that combines the best of rigid execution guarantees with adaptive intelligence capabilities.*