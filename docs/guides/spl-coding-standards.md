# SPL Coding Standards

Essential coding standards for SPL platform development. **MANDATORY READING** before any SPL API development work.

## Core Principles

### 1. Happy Path Programming
**Rule**: Assume all inputs are valid and operations will succeed  
**Rationale**: SPL framework handles validation and errors at higher levels  
**Application**: Write code for the success case, let SPL handle failures

```javascript
// ✅ GOOD - Happy path assumption
exports.default = function my_api(input) {
    const value = spl.action(input, 'value');
    const result = processValue(value);
    spl.completed(input);
}

// ❌ BAD - Defensive programming
exports.default = function my_api(input) {
    try {
        const value = spl.action(input, 'value');
        if (!value) {
            throw new Error("Value is required");
        }
        const result = processValue(value);
        spl.completed(input);
    } catch (error) {
        spl.rcSet(input.headers, "spl.execute.error", { ... });
    }
}
```

### 2. No Try/Catch in API Methods
**Rule**: Never use try/catch blocks in SPL API method exports.default functions  
**Rationale**: SPL execution engine handles all error cases at the framework level  
**Exception**: None - this rule is absolute

```javascript
// ✅ GOOD - Let SPL handle errors
exports.default = function gp_fs_write(input) {
    const file = spl.action(input, 'file');
    const content = spl.action(input, 'content');
    
    fs.writeFileSync(file, content);
    spl.history(input, `Successfully wrote ${file}`);
    spl.completed(input);
}

// ❌ BAD - Manual error handling
exports.default = function gp_fs_write(input) {
    try {
        const file = spl.action(input, 'file');
        // ... implementation
    } catch (error) {
        spl.rcSet(input.headers, "spl.execute.error", { ... });
    }
}
```

### 3. No Manual Error Setting
**Rule**: Never use `spl.rcSet(input.headers, "spl.execute.error", ...)` in API methods  
**Rationale**: SPL framework automatically captures and handles errors  
**Alternative**: Let natural JavaScript errors bubble up to SPL

### 4. No Input Validation in API Methods
**Rule**: Never validate parameters or throw validation errors in API methods  
**Rationale**: Input validation is handled by argument schemas and SPL pipeline  
**Trust**: Parameters from `spl.action(input, 'param')` are valid and present

## Architecture Standards

### 5. No Direct Node.js Imports in API Methods
**Rule**: API method files should only import `spl` - no fs, path, etc.  
**Rationale**: Keep API methods lightweight, testable, and focused  
**Pattern**: Use auxiliary functions for complex operations

```javascript
// ✅ GOOD - Clean API method
const spl = require("spl");
const myLib = require('../lib.js');

exports.default = function my_api(input) {
    const result = myLib.doComplexWork(input);
    spl.completed(input);
}

// ❌ BAD - Heavy imports in API method
const spl = require("spl");
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
```

### 6. Auxiliary Functions Pattern
**Rule**: Complex logic belongs in shared auxiliary modules  
**Location**: Place in `{module}/lib.js` or `test.js` for test-related functions  
**Export**: Export functions for reuse across multiple API methods

```javascript
// In test.js - auxiliary functions
exports.createUniqueWorkspace = function(baseDir) {
    // Complex implementation here
};

// In API method - simple delegation
const testLib = require('../test.js');

exports.default = function my_test_api(input) {
    const workspace = testLib.createUniqueWorkspace(baseDir);
    spl.completed(input);
}
```

### 7. Single Responsibility per API Method
**Rule**: Each API method should do exactly one thing  
**Scope**: One clear, focused responsibility per exports.default function  
**Composition**: Combine functionality through pipelines, not mega-methods

## SPL-Specific Patterns

### 8. Consistent SPL Action Usage
**Pattern**: Extract all parameters at the beginning of the function  
**Naming**: Use descriptive variable names that match parameter names

```javascript
// ✅ GOOD - Clear parameter extraction
exports.default = function gp_test_plan(input) {
    const planType = spl.action(input, 'type') || 'coverage';
    const targetModule = spl.action(input, 'module');
    const threshold = spl.action(input, 'threshold') || 80;
    
    // Implementation using clear variables
    spl.completed(input);
}
```

### 9. Informative History Logging
**Rule**: Use `spl.history()` to provide clear execution trail  
**Pattern**: Log start, key milestones, and completion  
**Format**: Use consistent prefixes like `{method}: {action}`

```javascript
exports.default = function gp_test_discover(input) {
    spl.history(input, `test/discover: Starting discovery`);
    spl.history(input, `test/discover: Found ${assets.length} assets`);
    spl.history(input, `test/discover: Discovery completed successfully`);
    spl.completed(input);
}
```

### 10. Proper SPL Completion
**Rule**: Every API method must end with `spl.completed(input)`  
**Placement**: Final statement in the function (except for `spl.gotoExecute` cases)  
**Never**: Don't call `spl.completed()` in error cases - SPL handles this

## Data Management Standards

### 11. Workspace Data Structure
**Pattern**: Use consistent workspace record structure  
**Headers**: Include API metadata, timestamps, and workflow state  
**Values**: Store actual data under descriptive keys

```javascript
// ✅ GOOD - Structured workspace data
const record = {
    headers: { 
        gp: { test: { api: "gp/test", timestamp: new Date().toISOString() } }
    },
    value: {
        discovery: { assets: [...] },
        plan: { workPackages: [...] }
    }
};
spl.wsSet(input, "gp/test", record);
```

### 12. Context Usage Patterns
**Rule**: Get context values once, use throughout method  
**Caching**: Store in variables rather than repeated `spl.context()` calls  
**Standard**: `appDataRoot`, `cwd`, `appRoot` are common contexts

## Testing Integration Standards

### 13. Test Isolation Requirements
**Rule**: Tests must run in isolated temporary workspaces  
**Pattern**: Create unique directories, execute, capture, cleanup  
**Safety**: Only remove directories matching `test-*` pattern

### 14. Session Management
**Rule**: Use session working directories for data operations isolation  
**Methods**: `gp/config/set-session-working-dir` and `gp/config/clear-session-working-dir`  
**Scope**: Session changes only affect current execution context

## Code Quality Standards

### 15. Consistent Naming Conventions
**Functions**: `descriptiveActionName` - clear action verbs  
**Variables**: `descriptiveNoun` - what the data represents  
**Constants**: Clear, self-documenting names

### 16. Comment Usage
**Rule**: Comments should explain "why", not "what"  
**API Headers**: Always include name, URI, type, description comments  
**Implementation**: Comment complex business logic only

### 17. File Structure Consistency
**Pattern**: Every API method follows same structure:
```javascript
//  name        Clear Method Name
//  URI         full/api/path  
//  type        API Method
//  description What this method accomplishes
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const auxiliaryLib = require('../lib.js'); // if needed
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Brief Implementation Description
exports.default = function descriptive_function_name(input) {
    // Parameter extraction
    // Main implementation
    // SPL completion
}

// Utility functions (if any)

///////////////////////////////////////////////////////////////////////////////
```

### 18. Method-Level Documentation Requirement
**Rule**: Every API method MUST have a method-level README.md file  
**Location**: `{method-directory}/README.md`  
**Purpose**: Embedded documentation that travels with deployed code

**Required README Structure**:
```markdown
# method/path/name

Brief description of what this method accomplishes.

## Purpose
Clear explanation of method's primary function

## Parameters
- `--param` (required/optional) - Description of each parameter

## Context Changes
- **Before**: Current state description
- **After**: State after method execution  
- **Scope**: Execution scope (pipeline, session, permanent)

## Usage Examples
```bash
concrete/command/examples --with=parameters
```

## Integration Patterns
Common usage patterns with other methods

## Behavior
Step-by-step description of what method does

## History Output
```
expected: Log message format
```

## Related Methods
- Cross-references to related functionality
```

**Benefits**:
- **Embedded**: Documentation travels with code deployment
- **Consistent**: Uniform structure across all SPL methods  
- **Context-Specific**: Method-specific examples and details
- **Claude Code Optimization**: Improves AI workflow efficiency

## Enforcement

### Mandatory Review Points
Before any SPL API development:
- [ ] Read this document completely
- [ ] Understand happy path programming principle
- [ ] Confirm no try/catch usage patterns
- [ ] Review auxiliary function patterns
- [ ] Understand SPL framework responsibilities

### Code Review Checklist
- [ ] No try/catch blocks in exports.default
- [ ] No manual error setting with spl.rcSet
- [ ] No input validation or parameter checking
- [ ] Only `spl` import in API methods
- [ ] Proper use of auxiliary functions
- [ ] Consistent history logging
- [ ] Proper SPL completion
- [ ] **Method-level README.md present** with required structure
- [ ] **Test coverage** using gp/test framework

## Examples of Standard Violations

### Common Anti-Patterns to Avoid

```javascript
// ❌ ANTI-PATTERN: Defensive programming
if (!input || !spl.action(input, 'required')) {
    throw new Error("Invalid input");
}

// ❌ ANTI-PATTERN: Manual error handling  
try { 
    // work
} catch (error) {
    spl.rcSet(input.headers, "spl.execute.error", {...});
}

// ❌ ANTI-PATTERN: Heavy imports
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// ❌ ANTI-PATTERN: Complex inline logic
exports.default = function(input) {
    // 200 lines of complex implementation
}
```

## Conclusion

These standards ensure:
- **Reliability**: SPL framework handles errors consistently
- **Maintainability**: Clear separation of concerns  
- **Testability**: Clean, focused API methods
- **Performance**: Lightweight methods with framework optimization
- **Consistency**: Uniform patterns across all SPL modules

**Remember**: When in doubt, choose simplicity and let the SPL framework handle complexity.

---

*This document is a living standard - update as patterns evolve*