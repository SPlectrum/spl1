# gp/config/set-session-working-dir

Sets temporary session working directory for isolated data operations.

## Purpose
Configures session-level `appDataRoot` context for test isolation and temporary workflows.

## Parameters
- `--path` (required) - Target directory path (absolute or relative)

## Context Changes
- **Before**: `appDataRoot` = `{appRoot}/data` 
- **After**: `appDataRoot` = `{resolved-path}`
- **Scope**: Current execution pipeline only

## Usage Examples

**Test isolation:**
```bash
gp/config/set-session-working-dir --path=/tmp/test-workspace-123
```

**Relative path:**
```bash
gp/config/set-session-working-dir --path=../shared-temp
```

## Integration Patterns

**With gp/fs operations:**
```bash
gp/config/set-session-working-dir --path=/tmp/isolated @@
gp/fs/write --file=test.txt --content="isolated test data" @@
gp/config/clear-session-working-dir
```

**In gp/test framework:**
- Used automatically by `gp/test/execute` for test isolation
- Creates unique workspace, runs tests, cleans up

## Behavior
1. Creates target directory if it doesn't exist
2. Validates target is a directory
3. Updates execution context via `spl.setContext()`
4. Affects all subsequent data operations in pipeline

## History Output
```
config/set-session-working-dir: Set appDataRoot to /tmp/test-workspace-123
```

## Related Methods
- `gp/config/clear-session-working-dir` - Restore default context
- `gp/config/set-working-dir` - Permanent filesystem changes