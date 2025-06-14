[← Home](../README.md)

# Implementing New APIs

## Quick Setup
```bash
# 1. Create API structure
mkdir -p modules/{category}/{api-name}

# 2. Create required files
{api-name}.js              # Auxiliary library
index.js                  # Main entry point  
{api-name}_arguments.json  # API arguments
{method}.js               # Method implementations
{method}_arguments.json   # Method arguments
```

## Existing APIs Reference
| Category | API | Methods | Status |
|----------|-----|---------|--------|
| **spl** | app | create, eval, exec, generate, parse, etc. | ✅ Complete |
| **spl** | blob | contents, copy, delete, get, move, put | ✅ Complete |
| **spl** | command | execute, help, parse, set, write | ✅ Complete |
| **spl** | console | error, log, trace, warn | ✅ Complete |
| **spl** | data | queue, read, write | ✅ Complete |
| **spl** | execute | complete, initialise, next, spawn, etc. | ✅ Complete |
| **spl** | package | create, deploy, load, remove, save | ✅ Complete |
| **tools** | git | add, commit, status, branch, etc. | 🔧 Partial |
| **tools** | 7zip | add, extract, list, test, update, delete | 📋 Scaffolded |

## API Structure Pattern
```
modules/{category}/{api-name}/
├── {api-name}.js                    # Auxiliary library
├── index.js                         # Main entry point
├── {api-name}_arguments.json        # API arguments
├── {method}.js                      # Method implementations
└── {method}_arguments.json          # Method arguments
```

## File Templates

### Auxiliary Library (`{api-name}.js`)
```javascript
//  name        {API Name} Auxiliary Functions
//  URI         {category}/{api-name}/{api-name}
//  type        Auxiliary Library
///////////////////////////////////////////////////////////////////////////////

exports.executeCommand = function(input, spl, args, workingPath) {
    // Common command execution logic
};

exports.getResourcePath = function(resource, appRoot, cwd) {
    // Path resolution logic
};
```

### Method Implementation (`{method}.js`)
```javascript
//  name        {Method Description}
//  URI         {category}/{api-name}/{method}
//  type        API Method
///////////////////////////////////////////////////////////////////////////////
const spl = require("../../spl/spl.js")
const apiLib = require("./{api-name}.js")
///////////////////////////////////////////////////////////////////////////////

exports.default = function {category}_{api_name}_{method}(input) {
    // 1. Extract parameters
    const param = spl.action(input, 'param');
    
    // 2. Execute operation
    const result = apiLib.executeCommand(input, spl, args, cwd);
    
    // 3. Complete
    spl.completed(input);
}
```

### Arguments Schema (`{method}_arguments.json`)
```json
{
    "headers": {
        "header": [
            { "header": "{category}/{api-name}/{method}" },
            { "content": "Method description." },
            { "content": "{bold syntax}: {italic ./spl {category}/{api-name}/{method} <options>}" }
        ]
    },
    "value": [
        { "name": "help", "alias": "h", "type": "Boolean", "description": "show help information", "typeLabel": "flag" },
        { "name": "param", "alias": "p", "type": "String", "description": "parameter description" }
    ]
}
```

## Test App Creation

For each new API, create a corresponding test app:

```bash
# 1. Create test app structure
mkdir -p spl/apps/test-{category}-{api-name}/{batches,data,modules/usr,scripts}

# 2. Copy from model app
cp spl/apps/model/{spl,spl.js} spl/apps/test-{category}-{api-name}/
cp spl/apps/model/modules/* spl/apps/test-{category}-{api-name}/modules/

# 3. Create test batch files
echo "{category}/{api-name}/{method} --help" > batches/{api-name}-{method}-tests.batch

# 4. Generate usr/ methods
./spl spl/app/create -f {api-name}-{method}-tests.batch

# 5. Update boot app release system (see creating-new-apps.md)
```

## Development Workflow (Phase-Based Approach)

**Phase Planning**: Break API implementation into GitHub issues within a milestone phase
1. **Plan API scope** - Define methods and functionality (GitHub issue for planning)
2. **Create directory structure** - Follow pattern above (GitHub issue for scaffolding)
3. **Implement auxiliary library** - Common functions (GitHub issue per library area)
4. **Implement methods** - Individual operations (GitHub issue per method group)
5. **Create test app** - Validation and testing (GitHub issue for test implementation)
6. **Integration testing** - Test with SPL system (GitHub issue for integration)
7. **Release integration** - Update boot app (GitHub issue for release packaging)

**Issue-Per-Branch Workflow**:
- Each step above becomes a GitHub issue (1-3 days work)
- Create feature branch per issue: `feature/api-planning-issue-123`
- Test batch files with `spl/app/exec -f` before generating usr/ methods
- Commit with issue reference: `feat: implement git status method (#123)`
- Create PR referencing issue: `gh pr create --title "Implement git status (#123)" --body "Closes #123"`

**Integration with Phase-Based Development**:
- API implementation fits within larger milestone phases
- Coordinate with repository restructure and TDD implementation phases
- Follow PRINCE2 "just enough planning" - detail current issues, outline future ones

## Naming Conventions
- **API URI**: `{category}/{api-name}` (e.g., `tools/git`)
- **Method URI**: `{category}/{api-name}/{method}` (e.g., `tools/git/status`)
- **Function names**: `{category}_{api_name}_{method}` (e.g., `tools_git_status`)
- **File names**: Use hyphens for multi-word methods (e.g., `extract-flat.js`)

---

[← Home](../README.md)