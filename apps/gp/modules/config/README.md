# gp/config API

Session and working directory configuration for SPL applications.

## Quick Reference

| Method | Purpose | Context Impact |
|--------|---------|---------------|
| `set-session-working-dir --path={dir}` | Temporary session isolation | Sets `appDataRoot` context to temp dir |
| `clear-session-working-dir` | Restore default context | Restores `appDataRoot` to `{appRoot}/data` |
| `set-working-dir --path={dir\|local}` | Permanent symlink config | Creates symlink `data -> target` |

## Key Context Changes

- **`set-session-working-dir`**: Updates execution context `appDataRoot` for current pipeline
- **`clear-session-working-dir`**: Restores execution context `appDataRoot` to default
- **`set-working-dir`**: Physically changes filesystem (symlinks), no context changes

## Testing Pattern

All config methods support gp/test framework:

```bash
spl_execute dev gp/test/discover --modules=gp/config/METHOD @@ gp/test/plan @@ gp/test/execute @@ gp/test/report
```

## Common Usage

**Test isolation pipeline:**
```bash
gp/config/set-session-working-dir --path=/tmp/test-xyz @@ 
gp/fs/write --file=test.txt --content="test data" @@
gp/config/clear-session-working-dir
```

**Development setup:**
```bash
gp/config/set-working-dir --path=local  # Creates normal data/ directory
```

## Implementation Notes

- Session methods use `spl.setContext()` for proper context propagation
- Working dir method uses auxiliary functions in `config.js`
- All methods follow SPL coding standards (no try/catch, happy path)
- History logging: One concise entry per method with key information