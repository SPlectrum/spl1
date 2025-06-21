# SESSION_START Workflow

## ⚠️ MANDATORY SESSION INITIALIZATION ⚠️

**MANDATORY SESSION INITIALIZATION**: When any new Claude session begins, Claude MUST execute the following initialization sequence to ensure workflow integrity and session continuity.

**TRIGGER**: Any new Claude session initiation

**MANDATORY ACTIONS upon starting ANY session:**
1. **CHECK PREVIOUS SESSION**: Read timelog to detect incomplete SESSION_END workflows and complete recovery actions if needed
2. **CHECK REPOSITORY TODO LIST**: Read `todo-list.md`, show complete list of pending topics (bullet format) with titles and descriptions so user can make informed choice, then ask what from the list (if any) should we start with

## SESSION RECOVERY

When detecting incomplete SESSION_END from previous session:
- Check TodoRead for incomplete todos from previous session
- Mark appropriate todos as completed based on git history
- Capture any obvious learnings from previous session's work
- Stage and commit any uncommitted changes with session summary