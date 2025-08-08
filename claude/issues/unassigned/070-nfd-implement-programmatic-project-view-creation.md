---
type: feature
github_id: 26
title: "NFD: Implement programmatic project view creation"
short_summary: ""  # One-line summary (max 80 chars) for collaboration lists
state: "open"
milestone: "unassigned"
labels: "["enhancement","NFD"]"
priority: medium
estimated_effort: TBD
github_updated_at: "2025-08-08T08:30:24Z"
local_updated_at: "2025-08-07T18:20:03.448Z"
---

## Epic
NFD - New Functionality Development

## Summary
Research and implement programmatic creation of GitHub Project views via GraphQL API when available. This would enable automated setup of optimized decision-making views (Current Version Dashboard, Session Planning, Epic Overview) for better project management UX.

## Background Research ✅
Comprehensive GraphQL API research completed - findings in `/status/view-research-findings.md`:

### **Current API Status:**
- ✅ **ProjectV2View Type Exists**: Has fields like `filter`, `groupByFields`, `sortByFields`, `layout`
- ❌ **No Create View Mutations**: Searched entire GraphQL schema - no `createProjectV2View` mutation found
- ❌ **No CLI Support**: `gh project` commands don't include view creation

### **Hypothesis:**
- Views are currently **web UI only** (similar to early GitHub Actions)
- API can **read views** but not create them programmatically
- View creation API likely planned for future GitHub releases

## Desired Views for Decision-Making

1. **Current Version Dashboard** (Primary)
   - Filter: Version = 0.6.1 (current focus)
   - Group by: Status (Backlog → Ready → In Progress → Review → Done)
   - Sort by: Decision Score (descending)

2. **Session Planning View**
   - Filter: Status = Ready
   - Group by: Session Type (Planning, Deep Work, Quick Win, etc.)
   - Sort by: Context Switch Cost, Decision Score

3. **Epic Overview**
   - Group by: Epic (RR, SE, CAE, TDD, BARE, NFD, AVRO)
   - Shows cross-epic balance and progress

## Current Workaround ✅
Single view with programmatic field population works effectively:
- Sort by Decision Score = instant priority ranking
- Filter by Version = current work focus
- Epic field = immediate context
- Session Type = time-based planning

## Implementation Plan
- [ ] Monitor GitHub Projects v2 roadmap for view creation API
- [ ] Research alternative approaches (URL-based bookmarks, etc.)
- [ ] Implement programmatic view creation when API becomes available
- [ ] Document view configurations for manual setup in the interim

## Dependencies
- Enhances #25 (GitHub Projects automation system)
- Complements existing programmatic field management

## Acceptance Criteria
- [ ] API research updated when GitHub releases view creation capabilities
- [ ] Programmatic view creation implemented when possible
- [ ] Optimized views available for better project management UX
- [ ] Documentation for manual view setup as interim solution

## Priority
**Low** - Current single view approach with programmatic fields is highly effective for decision-making. This is a UX enhancement for human users rather than a functional limitation.
