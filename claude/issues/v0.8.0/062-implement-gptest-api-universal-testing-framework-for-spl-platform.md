---
type: feature
github_id: 96
title: "Implement gp/test API - Universal Testing Framework for SPL Platform"
short_summary: "Create comprehensive testing API for quality gates across all environments"
state: open
milestone: v0.8.0
labels: [feature]
priority: high
estimated_effort: large
github_updated_at: "2025-08-07T18:20:22Z"
local_updated_at: "2025-08-05T15:30:13.077Z"
---

# Implement gp/test API - Universal Testing Framework for SPL Platform

## Problem Statement
Manual testing of APIs (like the recent gp/fs implementation) is time-consuming, error-prone, and doesn't scale. We need a systematic testing framework that:
- Provides quality gates across dev/staging/production environments
- Enables systematic validation of API functionality
- Supports automated testing of physical effects (files, network calls, etc.)
- Integrates seamlessly with SPL's debug output and workspace system
- Reduces manual testing effort while improving reliability

## Required Work
Create a focused `gp/test/*` API with core operations (KISS + Coverage):
- **gp/test/run**: Execute test suites with full SPL integration
- **gp/test/suite**: Manage test suite definitions and discovery
- **gp/test/assert**: Workspace-aware assertion engine
- **gp/test/coverage**: Coverage analysis and essential reporting

**Core Features**:
- **Step-by-step execution** with debug integration (essential for debugging)
- **Test isolation** with automatic cleanup and workspace reset
- **Basic filtering** by module/tags for targeted testing
- **Coverage reporting** showing tested vs untested operations

Test suites will be co-located with modules in `module/tests/` folders using JSON definitions.

## Work Plan

### Phase 1: Core Framework (KISS Implementation)
1. **Create gp/test/run module**
   - Execute JSON test suite definitions
   - Integrate with SPL debug output
   - Basic workspace assertions
   - Physical verification helpers
   - Step-by-step execution with debug integration

2. **Create gp/test/suite module**
   - Auto-discovery of tests in `module/tests/` folders
   - Test suite management operations
   - JSON schema validation
   - Basic filtering by module/tags

3. **Create gp/test/assert module**
   - Workspace expression evaluation
   - Error assertion checking
   - Physical filesystem assertions
   - Test isolation and cleanup

4. **Create gp/test/coverage module**
   - API operation coverage analysis
   - Report tested vs untested operations
   - Essential reporting for quality gates

### Simple Test Suite JSON Format
```json
{
  "name": "fs/read operations",
  "tests": [
    {
      "name": "read existing file",
      "action": "gp/fs/read",
      "params": { "file": "test.txt" },
      "expect": {
        "workspace": "gp/fs.*.value === 'test'",
        "history": "contains 'Successfully read'"
      }
    }
  ]
}
```

## Acceptance Criteria
**Core Testing (KISS Implementation)**:
- [ ] Can systematically test all gp/fs operations without manual intervention
- [ ] Test suites co-located with modules (e.g., `gp/fs/read/tests/basic-read.json`)
- [ ] Works across dev/staging/production environments as quality gates
- [ ] Integrates seamlessly with SPL debug output and workspace system
- [ ] Supports both success and failure scenario testing
- [ ] Auto-discovery finds and runs all tests in a module hierarchy
- [ ] Physical verification confirms actual filesystem effects

**Essential Features**:
- [ ] Step-by-step execution with interactive debugging controls
- [ ] Test isolation ensures clean workspace state between tests
- [ ] Basic filtering by module/tags enables targeted testing
- [ ] Coverage reporting shows tested vs untested operations with clear output

**Impact**:
- [ ] Reduces manual testing effort by 80%+ compared to current approach
- [ ] Coverage analysis provides essential quality gate reporting
- [ ] Documentation updated with testing best practices

## Technical Considerations
- **Architecture**: Follow SPL Universal Kafka Record pattern for test results
- **Integration**: Leverage existing SPL debug output rather than rebuilding
- **Security**: Respect SPL's security boundaries and app data isolation  
- **Performance**: Minimize test execution overhead
- **Extensibility**: Design for testing APIs beyond gp/* (auth, db, etc.)
- **Cross-Environment**: Same test suites work in dev, staging, production

## Usage Examples
```bash
# Run specific module tests
./spl_execute dev gp/test/run --module="gp/fs/read"

# Run all fs tests
./spl_execute dev gp/test/run --module="gp/fs" --recursive

# Step-by-step debugging of failed test
./spl_execute dev gp/test/run --module="gp/fs/copy" --step --debug

# Production health checks with filtering
./spl_execute prod gp/test/run --tags="smoke,critical"

# Coverage analysis
./spl_execute dev gp/test/coverage --module="gp/fs"
# Output: "8/10 operations tested (read, write, copy, move, delete, exists, info, list)"
#         "Missing: mkdir, rmdir"

# Auto-discover all tests
./spl_execute dev gp/test/run --discover --app="gp"
```

## GitHub Discussion Summary
This issue originated from experiencing the limitations of manual testing during gp/fs implementation. The systematic debug testing revealed both the power of SPL's debug output and the need for automated testing infrastructure.

## Progress Log
- 2025-08-05: Issue created after comprehensive gp/fs testing experience