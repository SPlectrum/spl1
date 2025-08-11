# Coding Standards - Error Handling Validation

Validates that index.js files implement proper error handling using spl.catch patterns.

## Overview

Ensures that all API methods implement proper error handling according to SPL standards. This validation checks for appropriate use of try-catch blocks and spl.catch calls.

## Validation Rules

- **Error Handling**: Methods should use try-catch for error-prone operations
- **SPL Integration**: Use `spl.catch(input, error)` for error reporting
- **Completion**: Call `spl.completed(input)` after error handling

## Integration

Runs as part of coding standards validation in the test pipeline.