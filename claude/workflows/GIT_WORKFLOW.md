# GIT_WORKFLOW

## Branching Strategy
Uses simplified GitHub Flow with issue-per-branch approach integrated with GitHub Projects.

## Branch Types
- `feature/issue-123` - Feature development tied to GitHub issue
- `bugfix/issue-456` - Bug fixes with TDD workflow tied to GitHub issue
- `unplanned` - Unplanned work (reused branch, minimize usage)

## Main Branch Synchronization

**CRITICAL**: Always keep main synchronized with remote before branch operations:

### MANDATORY RULE: Post-PR Sync
**EVERY PR merge MUST be followed immediately by:**
1. `git checkout main && git pull origin main` 
2. `git checkout unplanned && git merge main`

**NO EXCEPTIONS** - This ensures all branches stay synchronized with merged changes.

### SESSION_START Main Sync (MANDATORY)
```bash
git checkout main
git pull origin main                            # Sync local main with remote
git checkout unplanned                          # Return to default branch
git merge main                                  # Update unplanned with latest main
```

**CRITICAL**: This sync step is MANDATORY at session start to ensure all work begins with current codebase.

### Pre-Work Main Sync
Before creating any issue branch or starting work:
```bash
git checkout main
git pull origin main                            # Ensure main is current
# Then proceed with branch creation...
```

## Timelog-Driven Branch Selection

**Before any code changes, check timelog context:**

### Issue Work (Planned)
```bash
# Timelog shows: ##→2025-06-17T10:30:00Z | FREESTYLE | development: #123 feature description

# 1. Sync main first
git checkout main
git pull origin main                            # Ensure main is current

# 2. Create issue branch from current main
git checkout -b feature/issue-123               # or bugfix/issue-123
git merge main                                  # Ensure branch has latest main

# 3. Work on specific issue...

# Archive audit log before commit
if [ -f claude/audit/current/current.log ]; then
    mv claude/audit/current/current.log claude/audit/current/session_$(date -u +%Y-%m-%dT%H-%M-%S).log
    touch claude/audit/current/current.log
fi

git add .                                       # Stage ALL files (atomic work packages)
git commit -m "feat: implement feature (#123)" # Reference issue number
gh pr create --title "Feature title (#123)" --body "Closes #123"
```

### Unplanned Work
```bash
# Timelog shows: ##→2025-06-17T10:30:00Z | FREESTYLE | development: unassigned

# 1. Ensure unplanned has latest main (if not done in SESSION_START)
git checkout main
git pull origin main                            # Sync main if needed
git checkout unplanned                          # Switch to unplanned branch
git merge main                                  # Ensure unplanned has latest main

# 2. Make changes...

# Archive audit log before commit
if [ -f claude/audit/current/current.log ]; then
    mv claude/audit/current/current.log claude/audit/current/session_$(date -u +%Y-%m-%dT%H-%M-%S).log
    touch claude/audit/current/current.log
fi

git add .
git commit -m "..." # Use unplanned commit format (see below)
gh pr create --title "Unplanned: description" --body "Unplanned work"
gh pr merge --squash                            # Merge PR immediately

# 3. MANDATORY: Sync branches after PR merge
git checkout main
git pull origin main                            # Sync local main with merged changes
git checkout unplanned                          # Return to default branch
git merge main                                  # Update unplanned with latest main
```

## Branch Housekeeping

### Post-PR Merge Sync
After any PR is merged to main:
```bash
git checkout main
git pull origin main                            # Sync local main with merged changes
git checkout unplanned                          # Return to default branch
git merge main                                  # Update unplanned with latest main
```

### Branch Cleanup
- **Issue branches**: Delete when GitHub issue is closed (`git branch -d feature/issue-123`)
- **Unplanned branch**: Keep active, reuse for all unplanned work
- **Goal**: Minimize unplanned work to reduce maintenance overhead

## Unplanned Work Commits
For unplanned work (no GitHub issue), reference timelog context:
```bash
git commit -m "$(cat <<'EOF'
feat: descriptive title of changes

- Bullet point summary of changes
- Include key implementation details

This was unplanned work - [brief context of how it emerged].
Full activity tracked in timelog: [relevant timelog contexts].

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

## TDD Bug Workflow
```bash
git checkout -b bugfix/issue-456               # Bug fix branch

# Write failing test first (Red)
# Archive audit log before commit
if [ -f claude/audit/current/current.log ]; then
    mv claude/audit/current/current.log claude/audit/current/session_$(date -u +%Y-%m-%dT%H-%M-%S).log
    touch claude/audit/current/current.log
fi
git add .
git commit -m "test: add failing test for bug (#456)"

# Implement fix (Green)  
# Archive audit log before commit
if [ -f claude/audit/current/current.log ]; then
    mv claude/audit/current/current.log claude/audit/current/session_$(date -u +%Y-%m-%dT%H-%M-%S).log
    touch claude/audit/current/current.log
fi
git add .
git commit -m "fix: resolve issue description (#456)"

gh pr create --title "Fix bug title (#456)" --body "Closes #456"
```

## Audit Log Handling in Git Workflow

### **MANDATORY Pattern for Current.log**
When executing git workflows, follow this pattern to avoid committing operational audit entries:

```bash
# 1. Archive current audit log (this gets committed)
if [ -f claude/audit/current/current.log ]; then
    mv claude/audit/current/current.log claude/audit/current/session_$(date -u +%Y-%m-%dT%H-%M-%S).log
    touch claude/audit/current/current.log
fi

# 2. Make project changes and commit
git add .
git commit -m "project changes"

# 3. Add operational audit entries to new current.log
echo "workflow progress..." >> claude/audit/current/current.log

# 4. Stash audit log before git operations
git stash push claude/audit/current/current.log -m "workflow audit updates"

# 5. Execute git workflow (push, PR, merge, sync)
git push origin branch
gh pr create --title "..." --body "..."
gh pr merge --squash
git checkout main && git pull origin main
git checkout unplanned && git merge main

# 6. Restore audit log (stays local, not committed)
git stash pop
```

### **Key Principles:**
- **Archive gets committed**: Session boundaries are permanent project history
- **Operational entries stay local**: Current workflow tracking doesn't need to be in git history
- **Clean git operations**: Stash/unstash prevents operational noise in commits
- **Session boundaries preserved**: Archived logs maintain accountability without cluttering history

## Version Release Workflow
```bash
# 1. Archive timelog before creating version
node scripts/archive_timelog.js <version>      # Archive timelog with version stamp

# 2. Create git tag and release
git tag v<version>
git push origin v<version>
gh release create v<version> --title "Version <version>" --notes "Release notes"
```

## Timelog Archive Rule
**CRITICAL**: When creating any new version/release, the timelog must be archived first:
- Archives current audit logs to `audit/v<version>/audit_v<version>.log`
- Clears current timelog and adds version boundary marker
- Preserves complete time tracking history for each version
- Enables post-release analysis of development time patterns