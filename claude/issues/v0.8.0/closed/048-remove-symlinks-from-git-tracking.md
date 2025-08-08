---
type: task
github_id: 98
title: "remove symlinks from git tracking"
short_summary: ""  # One-line summary (max 80 chars) for collaboration lists
state: open
milestone: unassigned
labels: [task]
priority: medium
estimated_effort: TBD
github_updated_at: "2025-08-08T08:29:45Z"
local_updated_at: "2025-07-31T16:38:46.236Z"
imported_from: "claude/inbox/2025-07-30T12-00-00-000Z_claude-swift_remove-symlinks-from-git-tracking.md"
target: "splectrum/spl1"
source: "claude-swift"
created: "2025-07-30T12:00:00.000Z"
description: "Remove CLAUDE.md and claude/wow symlinks from git tracking and add to .gitignore"
---

# Remove CLAUDE.md and claude/wow symlinks from git tracking and add to .gitignore

## Task Details
- Remove CLAUDE.md from git tracking: `git rm --cached CLAUDE.md`
- Remove claude/wow from git tracking: `git rm --cached -r claude/wow` 
- Add both to .gitignore:
  - CLAUDE.md
  - claude/wow/
- Commit changes with message about removing orchestrator symlinks from version control

## Background
These are symlinks to the orchestrator's files and should not be tracked in individual project repositories. They are managed by the orchestrator and should be local-only in each project.