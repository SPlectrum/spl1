# Create Test Workspace

Creates isolated workspace directory for test execution.

## Overview

The `create-workspace` method generates a unique temporary workspace directory within the current `appDataRoot` context. This workspace provides complete isolation for test execution, ensuring that tests don't interfere with each other or with production data.

## Usage

```bash
./spl_execute <app> test/create-workspace
```

## Functionality

- Creates a unique workspace directory with timestamp and UUID components
- Stores the workspace path in `gp.test.workspace` header metadata
- Provides complete isolation for test execution
- Works within the current `appDataRoot` context

## Integration

This method is typically used as part of the test pipeline orchestration:

1. **create-workspace** - Creates isolated workspace
2. test-execution - Runs tests in isolation
3. remove-workspace - Cleans up after testing

## Output

The workspace path is stored in the execution context and can be accessed by subsequent pipeline steps for isolated test operations.