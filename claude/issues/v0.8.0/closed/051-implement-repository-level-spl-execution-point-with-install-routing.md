---
type: feature
github_id: 100
title: "Implement repository-level spl execution point with install routing"
short_summary: "Repository-level spl script routing to spl-repo install folder"
state: open
milestone: unassigned
labels: [feature]
priority: medium
estimated_effort: TBD
github_updated_at: "2025-08-08T08:29:39Z"
local_updated_at: "2025-08-01T17:59:51.549Z"
---

# Implement repository-level spl execution point with install routing

## Problem Statement
Need a single execution point at the repository root level that provides access to SPL functionality. Users should be able to run `./spl manage/issue/create` from the repository root, which routes commands to the appropriate SPL install. This creates a consistent interface regardless of the repository's internal SPL install structure.

## Required Work
Implement a JavaScript file named `spl` at repository root with:
- Shebang line for direct execution (#!/usr/bin/env node)
- Command routing logic to SPL install folder
- Error handling for missing install folder
- Pass-through of all arguments to target SPL instance

## Work Plan

### Phase 1: Core Router Implementation
- Create `spl` JavaScript file at repository root
- Add proper shebang line: `#!/usr/bin/env node`
- Implement command parsing and routing logic
- Add folder existence validation for `spl-repo/`

### Phase 2: Command Forwarding
- Route commands to `spl-repo/spl` executable
- Pass through all arguments: `repo spl manage/issue/create` → `spl-repo/spl manage/issue/create`
- Preserve exit codes and output streams
- Handle process spawning and cleanup

### Phase 3: Error Handling and Validation
- Check `spl-repo/` folder exists before routing
- Provide helpful error messages for missing install
- Validate `spl-repo/spl` executable exists and is accessible
- Handle permission and execution errors gracefully

### Phase 4: Testing and Documentation
- Test command routing with various argument patterns
- Validate error handling scenarios
- Document usage patterns and requirements
- Make file executable with proper permissions

## Acceptance Criteria
- [ ] `spl` JavaScript file created at repository root with shebang
- [ ] File is executable and can be run as `./spl`
- [ ] Commands route correctly: `./spl manage/issue/create` calls `spl-repo/spl manage/issue/create`
- [ ] Error handling when `spl-repo/` folder doesn't exist
- [ ] Error handling when `spl-repo/spl` executable doesn't exist
- [ ] All arguments and options passed through correctly
- [ ] Exit codes preserved from target SPL instance
- [ ] Output streams (stdout/stderr) preserved
- [ ] Works with complex command patterns like `manage/issue/create --title="Test"`

## Technical Considerations

### Architecture Decisions
- Repository-level execution point vs. install-level only
- JavaScript router vs. shell script vs. binary
- Static routing to `spl-repo/` vs. dynamic install detection
- Process spawning strategy for command forwarding

### Dependencies
- Requires Node.js runtime available in environment
- Depends on `spl-repo/` folder structure and `spl` executable
- May relate to issue #050 (single execution point within install)

### Performance Implications
- Additional process spawn overhead for each command
- JavaScript startup time vs. direct execution
- Minimal performance impact expected for typical usage

### Security Considerations
- Validate folder paths to prevent directory traversal
- Ensure executable permissions are handled safely
- No arbitrary command execution - only route to known SPL install
- Preserve security context of spawned processes

## GitHub Discussion Summary
Key insights from GitHub comments (curated manually)

## Progress Log
- 2025-08-01: Issue created - need to implement repository-level routing to spl-repo install