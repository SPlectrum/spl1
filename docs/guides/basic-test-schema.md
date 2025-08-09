# Basic Test Schema - SPL Test Framework

Standard schema and syntax for writing basic tests that validate SPL API execution through JSON audit log inspection.

## Overview

Basic tests validate SPL API methods by executing them and inspecting the resulting JSON execution document using JSONPath selectors. Tests define specific expectations about the execution state, history, workspace, and context.

## Test File Schema

### File Structure
```
modules/{category}/{api}/{method}/.test/basic__{category}_{api}_{method}__{test-name}.json
```

### JSON Schema
```json
{
    "key": "basic__{category}_{api}_{method}__{test-name}",
    "name": "Human readable test suite name",
    "description": "What this test suite validates",
    "tags": ["basic", "category", "api", "method"],
    "tests": [
        {
            "name": "individual test name",
            "description": "What this specific test validates",
            "action": "category/api/method",
            "params": {
                "param1": "value1",
                "param2": "value2"
            },
            "expect": [
                {
                    "key": "$.jsonpath.to.value",
                    "operation": "equals|exists|matches|contains|count|gt|lt|gte|lte",
                    "expectation": "expected_value|true|false|regex_pattern|number"
                }
            ]
        }
    ]
}
```

## Expectation Operations

### Basic Operations
- **`exists`** - Check if JSONPath exists
  - `expectation: true` - Path must exist
  - `expectation: false` - Path must not exist

- **`equals`** - Exact value match
  - `expectation: "exact_value"` - Must match exactly
  - `expectation: 42` - Numeric exact match

- **`matches`** - Regular expression match
  - `expectation: "^pattern$"` - Regex pattern
  - `expectation: "contains.*text"` - Flexible matching

- **`contains`** - String/array contains check
  - `expectation: "substring"` - String contains
  - `expectation: "array_element"` - Array contains

### Numeric Operations
- **`count`** - Array/object length
  - `expectation: 3` - Exact count
- **`gt`/`gte`** - Greater than (or equal)
- **`lt`/`lte`** - Less than (or equal)

## Common JSONPath Selectors

### Execution Status
```json
{
    "key": "$.headers.spl.execute.status",
    "operation": "equals",
    "expectation": "green"
}
```

### History Messages
```json
{
    "key": "$.headers.spl.execute.history[?(@[2].match(/Success message/))]",
    "operation": "exists", 
    "expectation": true
}
```

### Context Values
```json
{
    "key": "$.headers.spl.execute.appDataRoot",
    "operation": "equals",
    "expectation": "/expected/path"
}
```

### Workspace Data
```json
{
    "key": "$.value['api/name']['workspace_key']",
    "operation": "exists",
    "expectation": true
}
```

### Request Parameters
```json
{
    "key": "$.headers.spl.request['api/method'].param_name",
    "operation": "equals",
    "expectation": "expected_value"
}
```

## Example: File Write Test

```json
{
    "key": "basic__gp_fs_write__first-tests",
    "name": "gp/fs/write first tests",
    "description": "Initial basic tests for gp/fs/write method functionality",
    "tags": ["basic", "write", "smoke", "gp_fs_write"],
    "tests": [
        {
            "name": "write new file",
            "description": "Create a new file with content",
            "action": "gp/fs/write",
            "params": {
                "file": "test-write.txt",
                "content": "Hello from basic write test"
            },
            "expect": [
                {
                    "key": "$.headers.spl.execute.status",
                    "operation": "equals",
                    "expectation": "green"
                },
                {
                    "key": "$.headers.spl.execute.history[?(@[2].match(/Successfully wrote/))]",
                    "operation": "exists",
                    "expectation": true
                },
                {
                    "key": "$.value['gp/fs']['apps/gp/data/test-write_txt']",
                    "operation": "exists",
                    "expectation": true
                },
                {
                    "key": "$.value['gp/fs']['apps/gp/data/test-write_txt'].value",
                    "operation": "equals",
                    "expectation": "Hello from basic write test"
                }
            ]
        }
    ]
}
```

## Example: Context Management Test

```json
{
    "key": "basic__gp_config__session-isolation",
    "name": "gp/config session management tests",
    "description": "Test context modification and restoration via JSON selectors",
    "tags": ["basic", "config", "session", "context"],
    "tests": [
        {
            "name": "context modified",
            "description": "Session working directory changes appDataRoot context",
            "action": "gp/config/set-session-working-dir",
            "params": {
                "path": "/tmp/test-session"
            },
            "expect": [
                {
                    "key": "$.headers.spl.execute.history[?(@[2].match(/Session working directory configured successfully/))]",
                    "operation": "exists",
                    "expectation": true
                },
                {
                    "key": "$.headers.spl.execute.appDataRoot",
                    "operation": "equals",
                    "expectation": "/tmp/test-session"
                },
                {
                    "key": "$.headers.spl.execute.status",
                    "operation": "equals",
                    "expectation": "green"
                }
            ]
        },
        {
            "name": "context restored",
            "description": "Clear session restores original appDataRoot",
            "action": "gp/config/clear-session-working-dir",
            "params": {},
            "expect": [
                {
                    "key": "$.headers.spl.execute.history[?(@[2].match(/Restored default appDataRoot/))]",
                    "operation": "exists",
                    "expectation": true
                },
                {
                    "key": "$.headers.spl.execute.appDataRoot",
                    "operation": "matches",
                    "expectation": "^apps/gp/data$"
                },
                {
                    "key": "$.headers.spl.execute.status",
                    "operation": "equals",
                    "expectation": "green"
                }
            ]
        }
    ]
}
```

## Writing Guidelines

### 1. Test Naming
- **File naming**: `basic__{category}_{api}_{method}__{descriptive-name}.json`
- **Test keys**: Use double underscores as separators
- **Test names**: Descriptive action phrases ("write new file", "context restored")

### 2. Expectation Design
- **Specific selectors**: Target exact JSON paths
- **Multiple assertions**: Break complex expectations into multiple simple ones
- **Status checks**: Always verify execution status
- **History validation**: Check for key success messages

### 3. Parameter Values
- **Predictable data**: Use consistent test values
- **Isolation-safe**: Values that work in test workspaces
- **Descriptive**: Parameter values that aid debugging

### 4. Error Testing
```json
{
    "name": "invalid parameter error",
    "description": "Missing required parameter should fail gracefully",
    "action": "gp/fs/write",
    "params": {},
    "expect": [
        {
            "key": "$.headers.spl.execute.status",
            "operation": "equals",
            "expectation": "red"
        },
        {
            "key": "$.headers.spl.execute.error",
            "operation": "exists",
            "expectation": true
        }
    ]
}
```

## Integration with Test Framework

Basic tests are executed by the `gp/test` framework:

1. **Discovery**: `gp/test/discover` finds `.test/*.json` files
2. **Planning**: `gp/test/plan` creates execution work packages  
3. **Execution**: `gp/test/run` executes tests in isolated workspaces
4. **Validation**: JSON selectors applied to execution documents
5. **Reporting**: `gp/test/report` shows results

### Execution Pattern
```bash
# Run basic tests for specific module
/home/herma/splectrum/spl1/spl_execute dev gp/test/discover --modules=gp/fs/write --tests=basic/* @@ gp/test/plan @@ gp/test/run @@ gp/test/report
```

## Best Practices

### 1. Test Isolation
- Tests run in unique temporary workspaces
- Session management ensures no cross-test contamination
- File operations use predictable paths within test workspace

### 2. Assertion Completeness
- Test both success conditions AND expected side effects
- Verify workspace state changes (files created, data stored)
- Check execution history for key milestone messages
- Validate context changes when APIs modify execution state

### 3. Maintainability
- Use descriptive test names and descriptions
- Group related tests in logical suites
- Tag tests for easy filtering and organization
- Document complex JSONPath selectors with inline comments

### 4. Error Coverage
- Test both happy path and error conditions
- Validate error messages and status codes
- Ensure graceful failure modes

---

*This schema provides precise, JSON-based validation of SPL API execution through audit log inspection*