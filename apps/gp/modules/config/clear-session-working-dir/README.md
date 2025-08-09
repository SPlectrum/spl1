# gp/config/clear-session-working-dir

Restores default session working directory context.

## Purpose
Clears temporary session context and restores default `appDataRoot` configuration.

## Parameters
- None

## Context Changes
- **Before**: `appDataRoot` = `{any-session-path}`
- **After**: `appDataRoot` = `{appRoot}/data` 
- **Scope**: Current execution pipeline only

## Usage Examples

**After test isolation:**
```bash
gp/config/clear-session-working-dir
```

## Integration Patterns

**Cleanup after temporary operations:**
```bash
gp/config/set-session-working-dir --path=/tmp/work @@
gp/fs/write --file=temp.txt --content="temporary data" @@
gp/config/clear-session-working-dir
```

**In gp/test framework:**
- Used automatically by `gp/test/execute` pipeline
- Ensures clean state after test completion

## Behavior
1. Gets current `appRoot` from context
2. Calculates default: `{appRoot}/data`
3. Restores execution context via `spl.setContext()`
4. No filesystem changes (context only)

## History Output
```
config/clear-session-working-dir: Restored appDataRoot to apps/gp/data
```

## Related Methods
- `gp/config/set-session-working-dir` - Set temporary context
- `gp/config/set-working-dir` - Permanent filesystem changes