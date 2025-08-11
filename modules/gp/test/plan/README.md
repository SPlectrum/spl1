# Test Planning

Pure planning method - examines discovery assets and creates execution plan (work packages). Determines what tests to run and packages them for execution.

## Overview

The `plan` method takes discovered assets and creates structured work packages that define exactly what tests should be executed. It analyzes the discovery data and groups related tests into logical execution units.

## Usage

```bash
./spl_execute <app> test/plan [options]
```

## Parameters

- `--type` (`-t`): Test type filter to plan specific test categories
  - `instantiation` - Module instantiation tests
  - `json-validation` - JSON schema validation tests
  - `basic-test` - Basic functional tests
  - `coding-standards` - Code quality and standards tests
  - `all` - All available test types

## Functionality

- Analyzes discovered assets from the workspace
- Creates structured work packages by test type
- Groups related files for efficient batch execution
- Applies type-based filtering to focus on specific test categories
- Prepares execution metadata for the run phase

## Work Package Types

The planner creates different work package types:

- **Instantiation**: Groups index.js files for module loading tests
- **JSON Validation**: Groups .json files for schema validation
- **Basic Tests**: Groups .test directory contents for functional testing
- **Coding Standards**: Groups source files for code quality checks

## Integration

Planning is the second step in the test pipeline:

1. discover - Inventory available assets  
2. **plan** - Create work packages from assets
3. execute - Run the planned tests
4. report - Generate test results

## Output

The method stores work packages in the workspace that define:
- Test type and execution strategy
- File paths to be processed
- Test configuration and parameters
- Execution order and dependencies

## Example

```bash
# Plan all tests for discovered assets
./spl_execute dev test/plan

# Plan only coding standards tests
./spl_execute dev test/plan --type="coding-standards"
```