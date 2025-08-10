# Coding Standards - Argument Pattern Validation

Validates that index.js files use correct SPL argument extraction patterns.

## Overview

The `test-coding-args` method enforces SPL coding standards for parameter handling. It validates that API methods properly extract arguments using `spl.action(input, 'paramName')` rather than accessing the full action object.

## Usage

This method is automatically executed as part of coding standards validation. It is not typically run standalone.

## Validation Rules

- **Proper Extraction**: Use `spl.action(input, 'paramName')` for specific parameters
- **Avoid Full Access**: Do not use `spl.action(input)` to access all parameters  
- **Parameter Specificity**: Extract only the parameters the method actually uses

## Valid Patterns

```javascript
// ✓ Correct - specific parameter extraction
const modulePattern = spl.action(input, 'modules');
const summaryOnly = spl.action(input, 'summaryOnly');
```

## Invalid Patterns

```javascript
// ✗ Incorrect - accessing all parameters
const allParams = spl.action(input);
```

## Integration

This validation runs as part of the coding standards test suite, typically triggered by:

- `./spl_execute dev test/full-run --type="coding-standards"`
- `./spl_execute dev test/full-run --type="coding-args"`

## Purpose

Proper argument patterns ensure:
- **API Clarity**: Explicit parameter dependencies
- **Maintainability**: Clear parameter usage tracking
- **Standards Compliance**: Consistent SPL coding practices
- **Documentation Alignment**: Parameters match argument definitions