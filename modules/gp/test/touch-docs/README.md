# gp/test/touch-docs

Updates timestamps on README.md files to mark documentation as current.

## Purpose
Utility method for updating README.md file timestamps after reviewing and confirming that documentation accurately reflects current code state. Resolves docs-current test failures when documentation content is accurate but timestamps are outdated.

## Parameters
- `--modules` (`-m`) (required) - Target module pattern (e.g., `gp/config`, `gp/fs`)
- `--recursive`, `-r` (optional) - Update README.md files recursively through entire module tree

## Behavior

**Default (non-recursive):**
- Updates only the main README.md file at the module root level
- Example: `gp/config` → only `apps/gp/modules/config/README.md`

**Recursive mode (`-r` flag):**
- Updates all README.md files throughout the module tree
- Example: `gp/config -r` → all README.md files in `apps/gp/modules/config/` and subdirectories

## Usage Examples

**Update single module documentation:**
```bash
spl_execute dev gp/test/touch-docs --modules=gp/config
```

**Update entire module tree documentation:**
```bash
spl_execute dev gp/test/touch-docs --modules=gp/config -r
```

**Update different module:**
```bash
spl_execute dev gp/test/touch-docs --modules=gp/fs -r
```

## Integration with docs-current Testing

**Typical workflow:**
1. Run docs-current test to identify outdated documentation
2. Review and update documentation content as needed
3. Use `touch-docs` to update timestamps after content review
4. Re-run docs-current test to verify compliance

**Example workflow:**
```bash
# Identify outdated documentation
spl_execute dev gp/test/discover --modules=gp/config @@ gp/test/plan --type=docs-current @@ gp/test/run @@ gp/test/report

# Review documentation content manually...

# Mark documentation as current after review
spl_execute dev gp/test/touch-docs --modules=gp/config -r

# Verify docs-current compliance
spl_execute dev gp/test/discover --modules=gp/config @@ gp/test/plan --type=docs-current @@ gp/test/run @@ gp/test/report
```

## Safety Features
- **Read-only content**: Never modifies file contents, only timestamps
- **README.md only**: Only affects README.md files, ignores all other files
- **Audit logging**: Records every file updated for complete audit trail
- **Error handling**: Continues processing other files if individual updates fail

## Output and Logging

**History output:**
```
touch-docs: Starting documentation timestamp update for gp/config (recursive)
touch-docs: Updated 4 README.md files in gp/config
touch-docs: Updated apps/gp/modules/config/README.md
touch-docs: Updated apps/gp/modules/config/clear-session-working-dir/README.md
touch-docs: Updated apps/gp/modules/config/set-session-working-dir/README.md
touch-docs: Updated apps/gp/modules/config/set-working-dir/README.md
```

## Important Notes

**Use responsibly:**
- Only use after actually reviewing documentation content
- Don't use as a shortcut to bypass legitimate documentation updates
- The goal is accurate, current documentation, not just passing tests

**File system behavior:**
- Updates both access time (atime) and modification time (mtime)
- Uses current system time for timestamp updates
- Changes are immediately visible to file system and SPL discovery

## Error Handling
- Gracefully handles missing directories or files
- Reports errors for individual file update failures
- Continues processing remaining files after errors
- Provides clear error messages in history log

---

*Use this method to maintain documentation currency after confirming content accuracy*