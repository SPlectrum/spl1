# gp/test API Guide

Comprehensive guide to using the General Purpose Testing API for SPL platform development.

## Overview

The `gp/test` API provides a complete testing framework for SPL modules and applications with support for discovery, planning, execution, and reporting workflows.

## Architecture

The API follows a **pipeline execution pattern** where multiple commands share workspace data:

```
discover → plan → run → report
```

**Critical**: All commands must be chained using `@@` syntax to maintain shared workspace data.

## Command Reference

### Core Pipeline Commands

#### `gp/test/discover`
**Purpose**: Discover test assets (modules, tests, schemas) using pattern matching  
**Usage**: `gp/test/discover [options]`

**Key Parameters**:
- `--modules=pattern` - Module pattern (e.g., `gp/fs/write`, `gp/*`, `*`)
- `--tests=pattern` - Test pattern (e.g., `basic/*`, `smoke/*`, `*`)
- `--schemas=pattern` - Schema pattern (e.g., `api`, `arguments`, `none`)

**Output**: Stores discovery results in workspace for plan step

#### `gp/test/plan`
**Purpose**: Create execution plan (work packages) from discovered assets  
**Usage**: `gp/test/plan [options]`

**Key Parameters**:
- `--type=coverage|validation|quality` - Planning approach (default: coverage)
- `--threshold=N` - Success rate threshold percentage (default: 80)
- `--module=pattern` - Optional module filter

**Output**: Stores work packages in workspace for run step

#### `gp/test/run`
**Purpose**: Execute planned work packages  
**Usage**: `gp/test/run [options]`

**Key Parameters**:
- `--failfast` - Stop on first test failure (flag)
- `--module=pattern` - Optional module filter

**Output**: Stores execution results in workspace for report step

#### `gp/test/report`
**Purpose**: Generate formatted reports from execution results  
**Usage**: `gp/test/report [options]`

**Key Parameters**:
- `--format=summary|detailed` - Report format (default: summary)
- `--source=auto|discover|run` - Data source (default: auto)
- `--includeDetails` - Include detailed information (flag)
- `--threshold=N` - Threshold for recommendations (default: 80)

## Execution Patterns

### Complete Test Pipeline
```bash
# Full testing workflow with proper chaining
/home/herma/splectrum/spl1/spl_execute dev gp/test/discover --modules=gp/fs/write @@ gp/test/plan @@ gp/test/run @@ gp/test/report
```

### Debug Mode
```bash
# Debug mode shows full execution trace
/home/herma/splectrum/spl1/spl_execute dev -d gp/test/discover --modules=gp/fs/write @@ gp/test/plan @@ gp/test/run @@ gp/test/report
```

### Targeted Testing
```bash
# Test specific module pattern
/home/herma/splectrum/spl1/spl_execute dev gp/test/discover --modules=gp/fs/* --tests=basic/* @@ gp/test/plan @@ gp/test/run @@ gp/test/report

# Focus on specific test threshold
/home/herma/splectrum/spl1/spl_execute dev gp/test/discover --modules=gp/fs/write @@ gp/test/plan --threshold=90 @@ gp/test/run @@ gp/test/report
```

## Work Package Types

### 1. Instantiation Testing
Tests that modules can be required without errors
- **Purpose**: Validate module structure and dependencies
- **Scope**: All discovered `index.js` files
- **Success Criteria**: Module loads and exports something

### 2. JSON Validation Testing  
Tests that JSON schema files are valid
- **Purpose**: Validate argument definitions and configurations
- **Scope**: All discovered `*_arguments.json` files
- **Success Criteria**: JSON parses correctly and is not null/undefined

### 3. Basic Test Execution
Tests that execute real API methods with assertions
- **Purpose**: Functional testing with real command execution
- **Scope**: All discovered `basic__*.json` test definition files
- **Success Criteria**: API executes correctly and meets expectations

## Test Definition Format

Basic test files use JSON format:

```json
{
    "key": "basic__gp_fs_write__first-tests",
    "name": "gp/fs/write first tests", 
    "description": "Initial basic tests for gp/fs/write method functionality",
    "tags": ["basic", "write", "smoke"],
    "tests": [
        {
            "name": "write new file",
            "description": "Create a new file with content", 
            "action": "gp/fs/write",
            "params": {
                "file": "test-write.txt",
                "content": "Hello from basic write test"
            },
            "expect": {
                "workspace": "contains 'test-write.txt'",
                "history": "contains 'Successfully wrote'",
                "error": "none"
            }
        }
    ]
}
```

## Session Isolation

The test framework uses session working directories for test isolation:

```bash
# Tests run with isolated working directories
gp/config/set-session-working-dir --path="apps/gp/data" @@ gp/fs/write --file="test.txt" --content="test"
```

**Key Points**:
- Each test gets its own workspace within the app data directory
- Session directories are cleaned up automatically
- Tests cannot interfere with each other
- Real API execution with audit trail validation

## Workspace Data Structure

Tests use the API Record Pattern for workspace data:

```json
{
  "gp/test": {
    "headers": { 
      "gp": { "test": { "api": "gp/test", "timestamp": "..." } } 
    },
    "value": {
      "|pattern1||pattern2||pattern3|": {
        "headers": { "workflow": ["discover", "plan", "run"] },
        "value": {
          "discovery": { "assets": [...] },
          "plan": { "workPackages": [...] },
          "run": { "results": [...] }
        }
      }
    }
  }
}
```

## Error Handling

### Common Errors

#### "No discovery data found"
**Cause**: Commands executed separately instead of in pipeline  
**Solution**: Use `@@` chaining to maintain shared workspace

#### "Module not found" in tests
**Cause**: Session working directory not properly set  
**Solution**: Ensure test framework uses proper session isolation

#### "Parameter structure error"
**Cause**: Test parameters not properly formatted for SPL execution  
**Solution**: Use real command execution via `execSync`

## Best Practices

### Development Testing
1. **Start with help commands** to verify API structure
2. **Use debug mode** (`-d`) to understand execution flow
3. **Test complete pipeline** - never test individual commands in isolation
4. **Check workspace data** for proper API record structure

### Test File Creation
1. **Follow naming convention**: `basic__api_method__description.json`
2. **Use descriptive test names** and descriptions
3. **Include proper expectations** for validation
4. **Test both success and edge cases**

### Performance Optimization
1. **Use specific module patterns** instead of `*` when possible
2. **Set appropriate thresholds** to avoid unnecessary testing
3. **Use failfast mode** during development for quick feedback

## Integration with SPL Development

The gp/test API integrates with the SPL Development Workflow:

1. **Development Phase**: Create tests alongside API development
2. **Validation Phase**: Run complete test pipelines before canonical sync
3. **Quality Gates**: Use test results to validate readiness

### Development Commands
```bash
# During development - test new APIs
/home/herma/splectrum/spl1/spl_execute dev gp/test/discover --modules=new/api/* @@ gp/test/plan @@ gp/test/run @@ gp/test/report

# Before canonical sync - validate all changes  
/home/herma/splectrum/spl1/spl_execute dev gp/test/discover --modules=* @@ gp/test/plan --threshold=95 @@ gp/test/run @@ gp/test/report
```

## Future Enhancements

Planned improvements to the testing framework:
- Test prerequisites system for setup/teardown
- Integration test support for multi-API workflows
- Performance benchmarking capabilities
- Coverage reporting with detailed metrics

---

*This guide provides complete usage patterns for the gp/test API within the SPL platform development workflow.*