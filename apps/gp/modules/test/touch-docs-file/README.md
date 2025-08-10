# gp/test/touch-docs-file

Worker method that processes discovered assets and updates README.md timestamps.

## Purpose
Internal worker method that receives discovered assets from the workspace and updates README.md file timestamps. Part of the `gp/test/touch-docs` pipeline architecture.

## Parameters
- `--recursive`, `-r` (optional) - Process README.md files recursively through module tree

## Architecture Role
This is a worker method in the touch-docs pipeline:
1. **`gp/test/touch-docs`** - Orchestrator (user-facing)
2. **`gp/test/touch-docs-file`** - Worker (internal) ← **This method**

## Input Requirements
- **Discovery data**: Requires discovered assets in workspace from `gp/test/discover`
- **Asset format**: Expects assets with `path` and `fullPath` properties
- **Workspace state**: Reads from `gp/test` workspace record

## Behavior

**Recursive mode (`-r` flag):**
- Updates timestamps for all README.md files found in discovered assets
- Processes entire module tree

**Non-recursive mode (default):**
- Updates only module root-level README.md files
- Filters out README.md files in subdirectories
- Identifies module root by path structure analysis

## Pipeline Integration

**Typical pipeline execution:**
```bash
gp/test/discover --modules=gp/config @@ gp/test/touch-docs-file --recursive
```

**Called by touch-docs orchestrator:**
```bash
spl_execute dev gp/test/touch-docs --modules=gp/config -r
```

## File Processing Logic

**Path filtering (non-recursive):**
- Analyzes path structure: `apps/gp/modules/config/README.md` ✅
- Excludes subdirectories: `apps/gp/modules/config/sub/README.md` ❌
- Uses path segment counting after `modules/` directory

**Timestamp update:**
- Updates both access time (atime) and modification time (mtime)
- Uses current system time for both timestamps
- Preserves file content completely unchanged

## Error Handling
- Gracefully handles missing workspace data
- Reports individual file update failures
- Continues processing remaining files after errors
- Provides clear error messages in history log

## Output and Logging

**Success output:**
```
touch-docs-file: Processing discovered assets (recursive)
touch-docs-file: Updated 4 README.md files
touch-docs-file: Updated apps/gp/modules/config/README.md
touch-docs-file: Updated apps/gp/modules/config/clear-session-working-dir/README.md
touch-docs-file: Updated apps/gp/modules/config/set-session-working-dir/README.md
touch-docs-file: Updated apps/gp/modules/config/set-working-dir/README.md
```

**Error cases:**
```
touch-docs-file: ERROR - No discovery data found in workspace
touch-docs-file: ERROR - No assets found in discovery data
touch-docs-file: ERROR updating /path/to/file: Permission denied
```

## Design Benefits
- **Separation of concerns**: Focus on file operations only
- **Reusable**: Could be used in other documentation workflows
- **Testable**: Can be tested independently with known asset data
- **Leverages discovery**: Uses proven file discovery infrastructure
- **SPL patterns**: Follows established worker method architecture

## Usage Notes
- **Internal method**: Typically not called directly by users
- **Pipeline dependency**: Requires prior discovery execution
- **Workspace state**: Modifies file system but not workspace data
- **Audit trail**: Provides complete logging of all file modifications

---

*Internal worker method for the touch-docs pipeline - updates README.md timestamps from discovered assets*