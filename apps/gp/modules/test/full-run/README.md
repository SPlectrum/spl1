# gp/test/full-run

Unified test pipeline: discover → plan → execute → report

## Purpose
Single command for complete testing workflow with automatic workspace isolation

## Parameters
- `--modules` (required) - Module pattern (e.g., 'gp/config', 'gp/fs')
- `--type` (optional) - Planning type (coverage, validation, quality) 

## Context Changes
- **Before**: Current workspace state
- **After**: Test results in workspace with complete audit trail
- **Scope**: Pipeline execution with automatic cleanup

## Usage Examples
```bash
# Test specific module
gp/test/full-run --modules=gp/config

# Test with planning type
gp/test/full-run --modules=gp/fs --type=validation

# Test pattern matching  
gp/test/full-run --modules=gp/fs*
```

## Integration Patterns
Replaces manual pipeline chaining:
```bash
# Old way (still available for advanced use)
gp/test/discover --modules=X @@ gp/test/plan @@ gp/test/execute @@ gp/test/report

# New way (recommended)
gp/test/full-run --modules=X
```

## Behavior
1. **Discover** assets matching module pattern
2. **Plan** work packages based on planning type  
3. **Execute** tests in isolated workspace
4. **Report** results with summary
5. **Cleanup** workspace automatically

## History Output
```
test/full-run: Starting unified test pipeline
test/full-run: Pipeline configured with 4 stages
```

## Related Methods
- `gp/test/discover` - Discovery only
- `gp/test/plan` - Planning only  
- `gp/test/execute` - Execution with isolation
- `gp/test/report` - Reporting only