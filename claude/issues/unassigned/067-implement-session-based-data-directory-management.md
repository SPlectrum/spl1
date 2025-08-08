---
type: feature
github_id: null
title: "Implement Session-Based Data Directory Management for Test Isolation"
short_summary: "Add execution session-based data directory configuration to enable isolated test workspaces without global state changes"
state: open
milestone: unassigned
labels: [feature, testing, session-management, filesystem, architecture]
priority: high
estimated_effort: medium
github_updated_at: null
local_updated_at: "2025-08-07T08:15:00.000Z"
---

# Implement Session-Based Data Directory Management for Test Isolation

## Problem Statement
Currently, `gp/fs` operations use a hardcoded data directory path (`{appRoot}/data`), which creates challenges for test isolation. While the existing `gp/config/set-working-dir` can redirect the global working directory, this approach requires setup/teardown coordination and can cause issues with concurrent operations or test failures that don't properly revert state.

Test execution needs isolated workspaces without affecting the global application data directory configuration. The solution should be session-scoped, atomic, and require no global state management.

## Required Work
Implement a session-based data directory management system that:
- **Provides default behavior** compatible with existing `{appRoot}/data` usage
- **Enables session-specific overrides** via execution context settings
- **Maintains atomic operations** with no global state side effects
- **Supports test isolation** with temporary workspace directories

## Work Plan

### Phase 1: Core Architecture Implementation
1. **Create `appDataRoot` Execution Context Setting**
   - Add new execution context field: `spl.context(input, "appDataRoot")`
   - Initialize with default value: `{appRoot}/data` when not explicitly set
   - Ensure backward compatibility with existing data path behavior

2. **Implement Session Working Directory Configuration**
   ```bash
   # New config method for session-specific data directory override
   ./spl_execute dev gp/config/set-session-working-dir --path="/tmp/test-workspace"
   ```
   
   **Method Implementation**: `apps/gp/modules/config/set-session-working-dir/`
   - Set execution context: `spl.rcSet(input.headers, "spl.execute.appDataRoot", targetPath)`
   - Validate target directory existence (create if needed)
   - Provide clear feedback about session workspace configuration

3. **Update File System Operations**
   - Modify `gp/fs/write` to use `appDataRoot` instead of hardcoded path
   - Update other `gp/fs` operations (`read`, `copy`, etc.) for consistency
   - Ensure smooth fallback to default behavior when session override not set

### Phase 2: Integration with Test Framework
1. **Test Runner Integration**
   ```javascript
   // In basic test runner - before executing test actions
   const testWorkspace = `/tmp/spl-test-${Date.now()}-${testCase.name}`;
   await executeSetSessionWorkingDir(input, testWorkspace);
   
   // Execute test actions - they now write to isolated workspace
   const result = await executeSplAction(input, testCase.action, testCase.params);
   
   // Verify results in test workspace
   const verification = await verifyTestExpectations(testWorkspace, testCase.expect);
   
   // Cleanup test workspace
   await cleanupTestWorkspace(testWorkspace);
   ```

2. **Workspace Isolation Implementation**
   - Create unique temporary directories for each test execution
   - Ensure test file operations are completely isolated
   - Implement cleanup mechanism for test workspaces
   - Handle test failures gracefully (cleanup even on errors)

3. **Test Assertion Enhancement**
   - Update basic test runner to check actual file system results
   - Verify file existence, content, and metadata in test workspace
   - Compare expected vs actual results with detailed reporting

### Phase 3: Enhanced Session Management
1. **Session Context Management**
   - Implement session context inheritance in pipeline execution
   - Support nested session contexts (if needed)
   - Provide session context debugging and inspection utilities

2. **Advanced Workspace Features**
   - Support for shared test workspaces across related tests
   - Workspace persistence options for debugging failed tests
   - Integration with existing data directory symlink features

3. **Error Handling and Recovery**
   - Graceful handling of workspace creation failures
   - Automatic cleanup on abnormal test termination
   - Clear error messages for workspace-related issues

## Implementation Details

### Execution Context Integration
```javascript
// In gp/fs operations - enhanced path resolution
function getDataDirectory(input) {
    // Check for session override first
    const sessionDataDir = spl.context(input, "appDataRoot");
    if (sessionDataDir) {
        return sessionDataDir;
    }
    
    // Fall back to default app data directory
    const appRoot = spl.context(input, "appRoot") || "apps/gp";
    const cwd = spl.context(input, "cwd");
    return `${cwd}/${appRoot}/data`;
}
```

### Session Working Directory Method
```javascript
// apps/gp/modules/config/set-session-working-dir/index.js
exports.default = function gp_config_set_session_working_dir(input) {
    const targetPath = spl.action(input, "path");
    
    if (!targetPath) {
        throw new Error("Missing required parameter: path");
    }
    
    // Resolve absolute path
    const resolvedPath = path.isAbsolute(targetPath) 
        ? targetPath 
        : path.resolve(targetPath);
    
    // Create directory if it doesn't exist
    fs.mkdirSync(resolvedPath, { recursive: true });
    
    // Set session-specific data directory
    spl.rcSet(input.headers, "spl.execute.appDataRoot", resolvedPath);
    
    spl.history(input, `Session working directory set to: ${resolvedPath}`);
    spl.completed(input);
};
```

## Acceptance Criteria

**Core Architecture**:
- [ ] `appDataRoot` execution context setting implemented and functional
- [ ] Default behavior maintains backward compatibility with `{appRoot}/data`
- [ ] `gp/config/set-session-working-dir` method creates and configures session workspace
- [ ] All `gp/fs` operations respect `appDataRoot` setting consistently

**Test Framework Integration**:
- [ ] Basic test runner creates isolated workspace for each test execution
- [ ] Test assertions verify actual file system results in test workspace
- [ ] Test workspace cleanup happens automatically after test completion
- [ ] Failed tests don't leave workspace artifacts (proper error handling)

**Session Management**:
- [ ] Session data directory setting is scoped to execution context only
- [ ] No global state changes affect concurrent or subsequent operations
- [ ] Pipeline execution properly inherits and propagates session context
- [ ] Clear debugging information available for session workspace paths

**Quality & Reliability**:
- [ ] Workspace creation handles permission and disk space issues gracefully
- [ ] Temporary directory naming avoids collisions across concurrent tests
- [ ] Cleanup mechanism is robust against interruption and failure scenarios
- [ ] Performance impact is minimal for operations not using session override

## Usage Examples

### Basic Test Execution with Isolated Workspace
```bash
# Test runner automatically creates isolated workspace
./spl_execute dev gp/test/run --modules="gp/fs/write"

# Manual session workspace configuration
./spl_execute dev gp/config/set-session-working-dir --path="/tmp/my-test-workspace"
./spl_execute dev gp/fs/write --file="test.txt" --content="test content"
# File written to /tmp/my-test-workspace/test.txt instead of apps/gp/data/test.txt
```

### Development Workflow Enhancement
```bash
# Set up development workspace for experimentation
./spl_execute dev gp/config/set-session-working-dir --path="./dev-workspace"

# All subsequent file operations use the session workspace
./spl_execute dev gp/fs/write --file="experiment.txt" --content="data"
./spl_execute dev gp/fs/read --file="experiment.txt"

# Session ends with execution context - no global state changed
```

## Technical Considerations
- **Backward Compatibility**: Existing code continues to work without modification
- **Performance**: Minimal overhead for path resolution enhancement
- **Security**: Validate workspace paths to prevent directory traversal issues
- **Resource Management**: Implement workspace size limits and age-based cleanup
- **Concurrent Safety**: Session contexts are isolated between execution instances

## Integration Points
- **Test Framework**: Primary consumer for isolated test workspaces
- **File System Operations**: All `gp/fs` methods updated to use session data directory
- **Pipeline Execution**: Session context propagates through SPL pipeline stages
- **Configuration Management**: Integrates with existing working directory configuration

## Success Metrics
- **Test Isolation**: Zero test interference due to shared file system state
- **Development Productivity**: Easier debugging with isolated workspaces
- **System Reliability**: No global state corruption from test execution
- **Code Quality**: Clean separation between default and session-specific behavior

## GitHub Discussion Summary
This issue emerged from test framework development where isolated workspaces are essential for reliable test execution. The session-based approach provides clean architecture without global state management complexity, enabling robust test isolation while maintaining backward compatibility.

## Progress Log
- 2025-08-07: Issue created during basic test runner implementation
- Priority: High - Required for actual test execution implementation
- Dependencies: Basic test runner framework (completed)