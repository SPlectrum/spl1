# GITHUB_WORKFLOW

## Primary Workflow
Backlog → Project → Planning → Implementation

## Seven-Epic Structure
- **RR**: Repository Restructure (federated monorepo design)
- **SE**: SPlectrum Engines (external install workflows)  
- **CAE**: Core API Enhancement (unified streaming APIs)
- **TDD**: TDD Implementation (comprehensive test-driven workflow)
- **BARE**: Migration to Bare (minimal dependency architecture)
- **NFD**: New Functionality Development (cross-epic supporting tools)
- **AVRO**: AVRO Integration (schema-based data architecture)

## Backlog → Planning → Execution Workflow

### 1. Adding New Work to Backlog (Lightweight)
```bash
# Create issue with epic labeling only - NO project assignment
gh issue create --title "Epic-Prefix: Feature description" \
  --label "enhancement,EPIC_NAME" \
  --body "Detailed description with Epic section"
# Fast backlog creation - no configuration overhead
```

### 2. Planning Session Import (When Ready to Work)
```bash
# Import selected issues to project with full configuration
node status/project-automation.js import --issues 27,28,29 --version 0.6.2
# Configures all decision-making fields automatically
```

### 3. Daily Execution (Fast Recommendations)
```bash
# Get recommendations from planned work only
node status/project-automation.js recommend
# Only processes items in project - fast performance
```

### 4. Version Completion Cleanup
```bash
# Remove completed version items from project
node status/project-automation.js remove --version 0.6.1
# Keeps project focused on current work only
```

## Label Strategy
- **Work Type Labels**: `enhancement`, `bug`, `feature`, `task`, `documentation`
- **Epic Labels**: `RR`, `SE`, `CAE`, `TDD`, `BARE`, `NFD`, `AVRO`
- **Dual Labeling**: All issues must have both work type and epic labels for immediate identification

## Issue Lifecycle States
- **Backlog**: Issues created but not in project (lightweight capture)
- **Staged**: Issues selected for import, ready to be added to planned work
- **Planned**: Issues imported to project with full field configuration  
- **Active**: In Progress status in project
- **Complete**: Done status in project
- **Archived**: Removed from project when version complete

## Feature → Task Breakdown
- **Features**: High-level work items labeled as `feature` + epic (e.g., `feature,NFD`)
- **Tasks**: Implementation items broken from features, labeled as `task` + epic (e.g., `task,NFD`)
- **Timing**: Task breakdown happens during planning import, not at backlog creation

## Phase-Based Planning
- **Milestones** = Epic phases with prefixes (e.g., RR-1, CAE-1) lasting 1-3 weeks
- **Issues** = Specific tasks within phases (1-3 days)  
- **Versions** = Combination of related phases across multiple epics
- **Projects** = Visual workflow management across all phases

**Project Benefits**: Visual workflow management, cross-epic coordination, immediate epic identification, milestone planning integration.