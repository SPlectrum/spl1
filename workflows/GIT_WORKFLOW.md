# GIT_WORKFLOW

## Branching Strategy
Uses simplified GitHub Flow with issue-per-branch approach integrated with GitHub Projects.

## Branch Types
- `feature/issue-123` - Individual GitHub issues (1-3 days)
- `bugfix/issue-456` - Bug fixes with TDD workflow (same day preferred)

## Complete Workflow
```bash
# 1. Issue created and added to project (see GITHUB_WORKFLOW)
# 2. When assigned to milestone (planned work):
git status && git diff && git log --oneline -5  # Check state
git checkout -b feature/issue-123               # Create issue branch
# Work on specific issue...
git add .                                       # Stage ALL files (atomic work packages)
git commit -m "feat: implement feature (#123)" # Reference issue number
gh pr create --title "Feature title (#123)" --body "Closes #123"
```

## TDD Bug Workflow
```bash
git checkout -b bugfix/issue-456               # Bug fix branch
# Write failing test first (Red)
git commit -m "test: add failing test for bug (#456)"
# Implement fix (Green)  
git commit -m "fix: resolve issue description (#456)"
gh pr create --title "Fix bug title (#456)" --body "Closes #456"
```

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
- Archives `/logs/timelog.txt` to `/logs/archive/timelog_v<version>.txt`
- Clears current timelog and adds version boundary marker
- Preserves complete time tracking history for each version
- Enables post-release analysis of development time patterns