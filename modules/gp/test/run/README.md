# gp/test/run

Comprehensive test pipeline executing complete test suite with workspace isolation.

## Purpose
Executes the full testing pipeline from workspace creation through all test types to cleanup. This is the main test runner that performs systematic validation of SPL modules.

## Pipeline Stages

### Workspace Management
1. **create-workspace** - Creates isolated test environment
2. **remove-workspace** - Cleans up after testing

### Core Testing
3. **test-instantiation** - Verifies modules load correctly
4. **test-json-validation** - Validates JSON schema files
5. **test-basic-test** - Executes functional tests

### Documentation Validation  
6. **test-docs-present** - Ensures README.md files exist
7. **test-docs-current** - Verifies documentation is up-to-date

### Structure Validation
8. **test-file-type** - Validates folder structure and file naming

### Coding Standards (9 tests)
9. **test-coding-require** - Require pattern validation
10. **test-coding-export** - Export pattern validation  
11. **test-coding-args** - Argument extraction patterns
12. **test-coding-header** - Header format validation
13. **test-coding-errors** - Error handling patterns
14. **test-coding-complete** - Completion pattern validation
15. **test-coding-naming** - Function naming conventions
16. **test-coding-history** - History logging patterns

## Integration
Called by `gp/test/execute` pipeline for isolated test execution with automatic workspace management and comprehensive validation coverage.

## History Output
```
test/run: Starting comprehensive test pipeline
test/run: Test pipeline configured with 10 stages (workspace + instantiation + json-validation + basic-test + docs-present + docs-current + file-type + coding-require + coding-export)
```