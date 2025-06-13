[← Home](../README.md)

# SPlectrum Quick Reference

## Command Execution
```bash
# Pattern
./spl_execute <app> <api/method> [options] [args]

# Examples
./spl_execute test-suite spl/console/log "hello world"
./spl_execute watcher tools/git/status --repo data/project
./spl_execute boot usr/create_linux_installer

# Debug: Add -d flag
./spl_execute test-suite -d spl/console/log "debug mode"
```

## Apps
- `test-suite` - Testing/validation
- `watcher` - Development/monitoring  
- `boot` - Release/deployment
- `git` - Repository operations

## Core APIs (Implemented ✅)
- `spl/console/log` - Output messages
- `spl/execute/*` - Pipeline management
- `spl/data/*` - Record storage
- `spl/package/*` - Package management
- `tools/git/status` - Git status only

## Key Functions
```javascript
// Parameter access
const param = spl.action(input, 'paramName');
const context = spl.context(input, 'property');

// Completion
spl.completed(input);
spl.throwError(input, 'message');

// File paths
const path = require('path');
const appRoot = spl.context(input, 'appRoot');
const cwd = spl.context(input, 'cwd');
```

## File Structure
```
modules/
├── spl/{api}/{method}.js          # Core APIs
├── tools/{tool}/{method}.js       # Tool wrappers
└── {api}_arguments.json           # Argument schemas

spl/apps/{app}/modules/usr/        # App-specific methods
```

## Development Pattern
1. Create `method.js` with `exports.default = function api_method(input)`
2. Add `method_arguments.json` with schema
3. Use `spl.action()` for parameters, `spl.context()` for execution state
4. Call `spl.completed(input)` at end

## Error Handling
- No manual error handling - caught at pipeline level
- Use `spl.throwError(input, message)` for fatal errors
- Validation early in method execution

---

[← Home](../README.md)