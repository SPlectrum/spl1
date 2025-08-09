# gp/config/set-working-dir

Sets permanent working directory via filesystem symlinks or local directories.

## Purpose
Configures persistent data directory location through symlinks or local directory creation.

## Parameters
- `--path` (required) - Target directory path or `"local"` for normal directory

## Context Changes
- **No execution context changes**
- **Physical filesystem changes only**

## Usage Examples

**Local development setup:**
```bash
gp/config/set-working-dir --path=local
```

**Symlink to shared storage:**
```bash
gp/config/set-working-dir --path=/shared/project-data
```

**Relative path symlink:**
```bash
gp/config/set-working-dir --path=../shared-workspace
```

## Integration Patterns

**Development environment setup:**
```bash
gp/config/set-working-dir --path=local
```

**Production shared storage:**
```bash
gp/config/set-working-dir --path=/mnt/shared/app-data
```

## Behavior

**When `path=local`:**
1. Removes existing symlinks
2. Creates normal `data/` directory
3. For local development use

**When `path={directory}`:**
1. Removes existing `data/` directory/symlink
2. Creates symlink: `data -> {resolved-path}`
3. For shared or external storage

## Filesystem Impact
- **Destructive**: Removes existing `data/` directory if converting to symlink
- **Creates**: Either normal directory or symlink as specified
- **Persistent**: Changes survive application restarts

## History Output
```
config/set-working-dir: Configured local data directory
config/set-working-dir: Created data symlink to /shared/storage
```

## Related Methods
- `gp/config/set-session-working-dir` - Temporary context changes
- `gp/config/clear-session-working-dir` - Session context restoration