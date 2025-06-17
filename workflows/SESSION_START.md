# SESSION_START Workflow

## ⚠️ CRITICAL: IMMEDIATE ACTIONS ⚠️

**TRIGGER**: Any new Claude session initiation

**IMMEDIATELY upon starting ANY session:**
1. **START TIME TRACKING**: Use Edit tool to append session_start entry to `/logs/timelog.txt`:
   ```
   ##→YYYY-MM-DDTHH:MM:SSZ | session_start | unassigned
   ```
2. **LOG FIRST ACTIVITY**: Use Edit tool to append activity entry:
   ```
   ##→YYYY-MM-DDTHH:MM:SSZ | discussion/planning/development | context_description
   ```
3. **CHECK REPOSITORY TODO LIST**: Read `discussion-topics.md`, show summary of pending items, and ask user what from the list (if any) should we start with

## CRITICAL FORMAT RULES

- **NEVER use bash echo >> for timelog updates** - causes format corruption
- **ALWAYS use Edit tool** for all timelog modifications
- **ALWAYS use UTC timestamps** with Z suffix for consistency
- **Use system time** - Check current time at session start for accurate timestamps
- **Follow exact format**: `    ##→TIMESTAMP | activity | context`

## ONGOING TIME TRACKING RESPONSIBILITY

- Log `session_start` and `session_end` for every session
- Update log at natural transition points (activity changes, issue switches, breaks)
- Use activity types: `discussion`, `planning`, `development`, `testing`, `documentation`, `research`, `break`, `issue_switch`
- Context format: `#123 description` for issues, `unassigned` for general work
- Enable post-session analysis of time distribution and productivity patterns

## TIMELOG ARCHIVE RULE

**CRITICAL**: When creating new versions/releases, timelog must be archived first:
- Run `node scripts/archive_timelog.js <version>` before git tagging
- Archives current timelog to `/logs/archive/timelog_v<version>.txt`
- See **GIT_WORKFLOW** for complete version release procedure