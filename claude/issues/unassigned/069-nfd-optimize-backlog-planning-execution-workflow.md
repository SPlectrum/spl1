---
type: feature
github_id: 27
title: "NFD: Optimize backlog → planning → execution workflow"
short_summary: ""  # One-line summary (max 80 chars) for collaboration lists
state: "open"
milestone: "unassigned"
labels: "["enhancement","NFD"]"
priority: medium
estimated_effort: TBD
github_updated_at: "2025-08-08T08:30:22Z"
local_updated_at: "2025-08-07T18:20:03.446Z"
---

## Epic
NFD - New Functionality Development

## Summary
Optimize the project automation workflow to separate backlog management from planned work, improving performance and reducing project clutter.

## Current Problems
- ❌ **Performance**: Script processes ALL issues every time (slow)
- ❌ **Overhead**: Configuring fields for ideas that may never be worked on  
- ❌ **Project Clutter**: Backlog items mixed with planned work

## Proposed Solution

### **Workflow Stages:**
1. **Backlog Creation** (Lightweight)
   ```bash
   gh issue create --title "..." --label "enhancement,EPIC" --body "..."
   # No project, no version, no milestone - just capture the idea
   ```

2. **Planning Session** (Selective Import)
   ```bash
   node project-automation.js import --issues 27,28,29 --version 0.6.2
   # Import specific issues to project + configure all fields
   ```

3. **Execution** (Focused Project)
   ```bash
   node project-automation.js recommend
   # Fast execution - only processes planned work items
   ```

## Implementation Requirements

### **New Commands Needed:**
- `import` - Add selected issues to project with full field configuration
- `remove` - Remove issues from project when descoped  
- `recommend` - Faster (only processes project items)

### **Immediate Cleanup:**
- Remove issues #24, #26 from project (pure backlog items)
- Keep only planned/active work in project
- Clear separation between backlog and planning

## Benefits
- ⚡ **Faster execution** - project contains only planned work
- 🎯 **Focused project** - clear separation of backlog vs planned
- 📊 **Better planning** - explicit decision about what to work on
- 🔄 **Scalable** - hundreds of backlog issues won't slow down daily recommendations

## Acceptance Criteria
- [ ] Implement `import` command for selective project addition
- [ ] Implement `remove` command for project cleanup
- [ ] Update `recommend` to only process project items
- [ ] Clean up current project (remove backlog items)
- [ ] Document new workflow in decision-framework.md

## Timing
Implement before next planning session when we need to import new issues for work.

## Dependencies
- Enhances #25 (GitHub Projects automation system)
- Supports better PRINCE2 "just enough planning" approach
