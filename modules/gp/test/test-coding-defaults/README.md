# Coding Standards - Default Value Fallbacks Validation

Validates that index.js files do not use default value fallbacks on spl.action calls.

## Overview

The `test-coding-defaults` method enforces SPL coding standards for parameter handling. It validates that API methods do not use defensive programming patterns with default value fallbacks on `spl.action(input, 'param')` calls, which violates SPL's happy path programming principle.

## Usage

This method is automatically executed as part of coding standards validation. It is not typically run standalone.

## Validation Rules

### Forbidden Patterns
- **Default Fallbacks**: Never use `spl.action(input, 'param') || 'default'`
- **Defensive Programming**: Avoid any `||` fallback patterns on spl.action calls
- **Happy Path Violation**: Trust that SPL framework provides valid parameters

### SPL Principle
- **Happy Path Programming**: Assume all inputs are valid and operations will succeed
- **Framework Trust**: SPL handles validation and defaults at higher levels
- **Parameter Confidence**: Parameters from spl.action are guaranteed to be valid

## Valid Patterns

```javascript
// ✓ Correct - trust the input parameter
const modules = spl.action(input, 'modules');
const threshold = spl.action(input, 'threshold');

// ✓ Correct - use fixed constants for non-input values
const defaultPlanType = 'coverage';  // Non-input constant
```

## Invalid Patterns

```javascript
// ✗ Forbidden - default value fallback on input parameter
const modules = spl.action(input, 'modules') || '*';

// ✗ Forbidden - defensive programming pattern
const threshold = spl.action(input, 'threshold') || 80;

// ✗ Forbidden - any || fallback on spl.action calls
const type = spl.action(input, 'type') || 'default';
```

## Detection Logic

The validator scans for:
- `spl.action(input, 'param') || fallback` patterns
- `spl.action(input, "param") || fallback` patterns  
- Any `||` operator following spl.action calls with input parameter

## Integration

This validation runs as part of the coding standards test suite:

- `./spl_execute dev gp/test/full-run --type="coding-standards"`
- `./spl_execute dev gp/test/full-run --type="coding-defaults"`

## Purpose

Enforcing no default fallbacks ensures:
- **Happy Path Programming**: Code assumes success and valid inputs
- **Framework Trust**: Relies on SPL validation and error handling
- **Standards Compliance**: Consistent SPL coding practices
- **Defensive Programming Prevention**: Eliminates unnecessary protective code

## SPL Philosophy

SPL framework handles:
- Input validation through argument schemas
- Default value assignment at pipeline level
- Error handling at framework level
- Parameter presence guarantees

API methods should focus on business logic, trusting the framework for parameter management.