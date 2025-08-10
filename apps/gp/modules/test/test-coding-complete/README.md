# Coding Standards - Completion Pattern Validation

Validates that index.js files properly call spl.completed(input) to signal method completion.

## Overview

Ensures that all API methods properly signal completion using the standard SPL completion pattern. This validation is essential for proper pipeline orchestration and execution flow control.

## Validation Rules

- **Required Call**: Every API method must call `spl.completed(input)`
- **Proper Placement**: Usually at the end of method execution
- **Error Handling**: Must be called even in error conditions (after spl.catch)

## Integration

Runs as part of coding standards validation in the test pipeline.