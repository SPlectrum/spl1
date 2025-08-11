# Coding Standards - Require Pattern Validation

Validates that index.js files use correct require patterns according to SPL standards.

## Overview

The `test-coding-require` method enforces SPL coding standards for module imports. It validates require statement placement, patterns, and ensures compliance with the SPL library naming conventions.

## Usage

This method is automatically executed as part of coding standards validation. It is not typically run standalone.

## Validation Rules

### Require Patterns
- **SPL Library**: Use `require("spl_lib")` for core SPL functionality
- **API Libraries**: Use `require("{api}_lib")` for API-specific libraries (e.g., `require("gp_test_lib")`)
- **No Legacy**: Avoid `require("spl")` - use `require("spl_lib")` instead

### Placement Rules
- **After Header**: Require statements must come after the header comment block
- **Before Exports**: All requires must be declared before `exports.default`
- **Module Section**: Group requires in the designated module import section

### File Structure
```javascript
//  Header comment block
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");           // ✓ Correct
const testLib = require("gp_test_lib");   // ✓ Correct
///////////////////////////////////////////////////////////////////////////////

exports.default = function method_name(input) {
    // Implementation
}
```

## Invalid Patterns

```javascript
// ✗ Legacy pattern
const spl = require("spl");

// ✗ Require after exports
exports.default = function method_name(input) {
    const spl = require("spl_lib");  // ✗ Wrong placement
}
```

## Integration

This validation runs as part of the coding standards test suite:

- `./spl_execute dev test/full-run --type="coding-standards"`
- `./spl_execute dev test/full-run --type="coding-require"`

## Purpose

Proper require patterns ensure:
- **Library Consistency**: Standardized library imports
- **Code Organization**: Clear module dependency section
- **Standards Compliance**: Consistent SPL coding practices
- **Migration Support**: Smooth transition from legacy patterns