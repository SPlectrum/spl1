# Time Log Format Documentation

## Overview
Activity-driven time tracking for Claude Code sessions. Each entry represents the start of a new activity, with the previous activity implicitly ending.

## Format
```
timestamp | activity_type | context
```

## Activity Types

### Core Activities
- `discussion` - General conversation, requirements gathering, problem analysis
- `planning` - Strategic thinking, approach design, breaking down work
- `development` - Code writing, file editing, implementation work  
- `testing` - Running tests, validation, debugging
- `documentation` - Writing docs, comments, specifications
- `research` - Code exploration, learning existing patterns, web searches

### Session Management
- `session_start` - Beginning of work session
- `session_end` - End of work session
- `break` - Pause in work (lunch, interruption, etc.)

### Issue Transitions
- `issue_switch` - Moving between different issues within same activity type

## Context Format

### Unassigned Work
When no specific GitHub issue is being worked on:
```
context = "unassigned"
```

### Issue-Specific Work
When working on a specific GitHub issue:
```
context = "#123 brief description"
```

### Break Context
```
context = "lunch" | "meeting" | "interruption" | "personal"
```

## Rules

1. **Implicit Transitions**: Starting a new activity automatically ends the previous one
2. **Issue Numbers**: If no `#123` in context, work is considered unassigned
3. **Timestamps**: ISO format `YYYY-MM-DDTHH:MM:SS` 
4. **Session Boundaries**: Always start with `session_start`, end with `session_end`
5. **Append-Only**: Never modify existing entries, only add new ones

## Example Session
```
2024-06-15T14:45:00 | session_start | unassigned
2024-06-15T14:47:00 | discussion | time tracking approach
2024-06-15T14:52:00 | planning | #123 folder structure design
2024-06-15T15:15:00 | development | #123 folder structure design
2024-06-15T15:45:00 | testing | #123 folder structure design
2024-06-15T15:50:00 | issue_switch | #124 module refactoring
2024-06-15T16:30:00 | break | coffee
2024-06-15T16:40:00 | development | #124 module refactoring
2024-06-15T17:00:00 | session_end |
```

## Analysis Capabilities

This format enables analysis of:
- **Total session time**: session_end - session_start
- **Time per activity type**: Sum duration for each activity
- **Time per issue**: Sum duration for each #issue
- **Productivity patterns**: Development vs planning ratios
- **Break patterns**: Frequency and duration
- **Issue switching**: How often context switches occur

## Processing Notes

- Calculate duration by finding the next entry's timestamp
- Last entry before `session_end` gets remainder of session time
- Unassigned time can be tracked separately from issue-specific work
- Activity transitions within same issue show workflow patterns