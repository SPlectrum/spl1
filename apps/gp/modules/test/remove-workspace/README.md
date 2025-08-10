# Remove Test Workspace

Removes test workspace directory and captures assets for audit trail.

## Overview

The `remove-workspace` method provides clean workspace cleanup after test execution. It captures an audit trail of workspace contents before removal, ensuring proper cleanup and providing debugging information when needed.

## Usage

```bash
./spl_execute <app> test/remove-workspace
```

## Functionality

- Retrieves workspace path from execution context metadata
- Captures complete workspace asset inventory for audit
- Safely removes the workspace directory with validation
- Stores removal status and asset details for debugging
- Provides graceful handling when no workspace exists

## Safety Features

- **Path Validation**: Only removes directories with 'test-' prefix
- **Asset Capture**: Full inventory before removal for debugging
- **Status Tracking**: Records removal success/failure
- **Graceful Handling**: Safe when no workspace exists

## Audit Trail

The method captures comprehensive workspace information:

- File inventory with sizes and timestamps
- Directory structure
- Content samples for small files (≤1000 bytes)
- Total workspace size and file count

## Integration

This method completes the test workspace lifecycle:

1. create-workspace - Creates isolated workspace
2. test-execution - Runs tests in isolation  
3. **remove-workspace** - Cleans up and audits

## Metadata Storage

Workspace removal details are stored in execution headers:

- `gp.test.workspace-assets` - Complete audit trail
- Asset inventory, removal status, and workspace path
- Available for debugging and monitoring

## Error Handling

- Continues gracefully if no workspace exists
- Reports removal status (success/failure)
- Maintains audit trail even on removal failures