# Coding Standards - Export Pattern Validation

Validates that index.js files use only exports.default and contain no local functions.

## Overview

The `test-coding-export` method enforces SPL coding standards for module exports. It ensures that API methods use only the standard `exports.default` pattern and that all functionality is properly organized without local helper functions.

## Usage

This method is automatically executed as part of coding standards validation. It is not typically run standalone.

## Validation Rules

### Export Patterns
- **Single Export**: Use only `exports.default = function name(input) { ... }`
- **No Local Functions**: All helper functions must be in auxiliary libraries
- **No Alternative Exports**: Avoid `module.exports` or named exports

### Function Organization
- **Main Method**: Single exported function per module
- **Auxiliary Functions**: Move helpers to `{api}_lib` auxiliary libraries
- **Clean Structure**: Keep index.js files focused and minimal

## Valid Pattern

```javascript
const spl = require("spl_lib");
const apiLib = require("gp_api_lib");

exports.default = function gp_api_method(input) {
    // Use auxiliary functions for complex logic
    const result = apiLib.helperFunction(data);
    spl.completed(input);
}
```

## Invalid Patterns

```javascript
// ✗ Local function
function localHelper() { ... }

exports.default = function gp_api_method(input) {
    localHelper(); // ✗ Should be in auxiliary library
}

// ✗ Alternative export patterns
module.exports = function() { ... };
exports.namedExport = function() { ... };
```

## Integration

This validation runs as part of the coding standards test suite:

- `./spl_execute dev test/full-run --type="coding-standards"`
- `./spl_execute dev test/full-run --type="coding-export"`

## Purpose

Proper export patterns ensure:
- **Code Organization**: Clear separation of concerns
- **Reusability**: Helper functions available across modules  
- **Standards Compliance**: Consistent SPL coding practices
- **Maintainability**: Cleaner, more focused API methods