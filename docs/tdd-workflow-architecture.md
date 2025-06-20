# TDD Workflow Architecture for spl1

## Overview

This document defines the TDD workflow architecture for TDD-1 Phase 1, establishing a **core spl/test API** that leverages SPlectrum's dual output channels (execution JSON records + stdout/stderr) to provide simple but effective testing capabilities as foundation for future sophisticated test tooling.

## Current Infrastructure Analysis

### Existing Test Components

**Test Suite App** (`spl/apps/test-suite/`):
- Simple JavaScript test files (`scripts/test.js`)
- Basic batch command sequences (`batches/test.batch`)
- SPlectrum integration through `spl/app/run` and `spl/app/exec`

**Testing Framework Documentation** (`docs/testing-frameworks.md`):
- Established patterns for batch → script testing workflow
- Named argument requirements (`-f` for files, `-a` for arguments)
- TDD integration guidelines with Red-Green-Refactor phases

**Error Handling** (`modules/spl/error/`):
- Basic error catching (`spl/error/catch`)
- Error context management with status and history
- Integration with execution pipeline

## Core spl/test API Design

### SPlectrum Dual Output Channel Architecture

**Channel 1: Execution JSON Record**
- `input.value` - workspace data with nested structure  
- `input.headers.spl.execute` - execution context
- `input.headers.spl.request` - request properties
- Accessed via `spl.rcRef()`, `spl.rcSet()`, `spl.rcGet()`

**Channel 2: stdout/stderr**
- Console output from `spl/console/log`, `spl/console/error`, etc.
- Standard process output streams
- Captured during method execution

### 1. Core spl/test API Methods

#### **spl/test/run** - Execute and Capture

```javascript
// modules/spl/test/run.js
exports.default = function spl_test_run(input) {
  const command = spl.action(input, "command");
  const args = spl.action(input, "args") || [];
  const debug = spl.action(input, "debug") || false;
  
  // Execute command and capture both output channels
  const execution = {
    // Channel 1: Execution record capture
    beforeState: spl.copyWorkspace(input),
    
    // Channel 2: stdout/stderr capture 
    output: {
      stdout: "",
      stderr: "", 
      exitCode: 0
    },
    
    timing: {
      start: new Date().toISOString(),
      duration: 0
    }
  };
  
  // Execute with debug context if requested
  if (debug) {
    spl.setContext(input, "debug", true);
    spl.history(input, `TEST_DEBUG: Executing ${command} with args: ${JSON.stringify(args)}`);
  }
  
  // Store execution context for test analysis
  spl.setContext(input, "test.execution", execution);
  spl.setContext(input, "action", command);
};
```

#### **spl/test/assert** - Validation Methods

```javascript
// modules/spl/test/assert.js
exports.default = function spl_test_assert(input) {
  const type = spl.action(input, "type"); // "equals", "contains", "exists", "status"
  const target = spl.action(input, "target"); // "workspace", "stdout", "stderr", "exitCode"
  const path = spl.action(input, "path"); // JSON path for workspace assertions
  const expected = spl.action(input, "expected");
  
  const execution = spl.getContext(input, "test.execution");
  let actual;
  
  // Extract actual value from appropriate channel
  switch(target) {
    case "workspace":
      actual = spl.rcRef(execution.afterState, path);
      break;
    case "stdout":
      actual = execution.output.stdout;
      break;
    case "stderr": 
      actual = execution.output.stderr;
      break;
    case "exitCode":
      actual = execution.output.exitCode;
      break;
  }
  
  // Perform assertion
  const result = performAssertion(type, actual, expected);
  
  // Store assertion result
  const assertions = spl.getContext(input, "test.assertions") || [];
  assertions.push({
    type, target, path, expected, actual, 
    passed: result.passed,
    message: result.message
  });
  
  spl.setContext(input, "test.assertions", assertions);
  
  if (!result.passed) {
    spl.setContext(input, "test.status", "failed");
    spl.history(input, `ASSERTION_FAILED: ${result.message}`);
  }
};
```

#### **spl/test/expect** - Setup Expected Outcomes

```javascript
// modules/spl/test/expect.js  
exports.default = function spl_test_expect(input) {
  const expectations = {
    workspace: spl.action(input, "workspace") || {},
    stdout: spl.action(input, "stdout"),
    stderr: spl.action(input, "stderr"), 
    exitCode: spl.action(input, "exitCode") || 0,
    debug: spl.action(input, "debug") || false
  };
  
  spl.setContext(input, "test.expectations", expectations);
  spl.history(input, `TEST_EXPECTATIONS_SET: ${Object.keys(expectations).join(', ')}`);
};
```

#### **spl/test/debug** - Debug Information Capture

```javascript
// modules/spl/test/debug.js
exports.default = function spl_test_debug(input) {
  const execution = spl.getContext(input, "test.execution");
  const debugInfo = {
    executionSteps: spl.getContext(input, "history") || [],
    workspaceChanges: compareWorkspaces(execution.beforeState, execution.afterState),
    contextSnapshot: {
      execute: spl.getContext(input, "spl.execute"),
      request: spl.getContext(input, "spl.request")
    },
    timing: execution.timing
  };
  
  spl.setContext(input, "test.debugInfo", debugInfo);
  
  // Output detailed debug information
  console.log("=== TEST DEBUG INFO ===");
  console.log(JSON.stringify(debugInfo, null, 2));
};
```

#### **Test Discovery and Organization**

```
modules/spl/test/
├── runner.js              # Main test execution engine
├── discovery.js           # Test suite and case discovery
├── report.js              # Result formatting and reporting
└── validation.js          # Pass/fail determination logic

tests/                      # Centralized test directory
├── api/                   # API-level test suites
│   ├── blob/
│   │   ├── get.batch     # spl/blob/get test cases
│   │   ├── put.batch     # spl/blob/put test cases
│   │   └── validation.js # Blob API specific validations
│   ├── data/
│   └── error/
├── integration/           # Cross-API integration tests
├── regression/            # Bug regression test suites
└── framework/             # Test framework self-tests
```

#### **Test Result Structure**

```javascript
// Standard test result format
const testResult = {
  suite: "spl/blob",
  test: "get.batch", 
  status: "pass|fail|error",
  output: {
    stdout: "captured output",
    stderr: "error messages",
    exitCode: 0
  },
  timing: {
    start: "2025-06-21T02:56:00Z",
    duration: 150 // milliseconds
  },
  bugs: [] // Array of detected issues for bug collection
};
```

### 2. Enhanced Bug Collection System

#### **spl/error Module Enhancements**

```javascript
// modules/spl/error/collect.js - NEW
exports.default = function spl_error_collect(input) {
  const error = spl.action(input, "error");
  const context = spl.getContext(input, "test") || {};
  
  // Enhanced error collection with test context
  const bugReport = {
    message: error.message,
    stack: error.stack,
    testSuite: context.suite,
    testCase: context.case,
    timestamp: new Date().toISOString(),
    environment: {
      platform: process.platform,
      nodeVersion: process.version,
      splVersion: spl.version()
    },
    reproduction: {
      command: context.command,
      arguments: context.arguments,
      expectedOutput: context.expected,
      actualOutput: context.actual
    }
  };
  
  // Store for potential GitHub issue creation
  spl.setContext(input, "bugReport", bugReport);
  spl.history(input, `BUG COLLECTED - ${error.message}`);
};
```

#### **Bug Report → GitHub Issue Automation (Next Version)**

```javascript
// modules/spl/error/issue.js - PLANNED for next version
const issueTemplate = {
  title: "Bug: {error_summary} in {test_suite}",
  body: `
## Bug Report

**Error**: {error_message}

**Test Suite**: {test_suite}
**Test Case**: {test_case}

**Reproduction Steps**:
1. Command: \`{command}\`
2. Arguments: \`{arguments}\`

**Expected Output**: 
\`\`\`
{expected_output}
\`\`\`

**Actual Output**:
\`\`\`
{actual_output}
\`\`\`

**Environment**:
- Platform: {platform}
- Node.js: {node_version}
- SPlectrum: {spl_version}

**Stack Trace**:
\`\`\`
{stack_trace}
\`\`\`

🤖 Generated automatically by TDD bug collection system
  `,
  labels: ["bug", "tdd", "auto-generated"],
  milestone: "next-version-milestone"
};
```

### 3. TDD Workflow Integration

#### **Red-Green-Refactor Cycle**

**Phase 1: RED (Failing Tests)**
```bash
# Create failing test first
./spl_execute spl test-runner spl/test/run -s api/blob -t get.batch
# Expected: FAIL (functionality not implemented)
```

**Phase 2: GREEN (Make Tests Pass)**
```bash
# Implement minimal functionality
# Re-run tests until passing
./spl_execute spl test-runner spl/test/run -s api/blob -t get.batch
# Expected: PASS
```

**Phase 3: REFACTOR (Improve Implementation)**
```bash
# Refactor implementation
# Ensure tests still pass
./spl_execute spl test-runner spl/test/run -s api/blob
# Expected: ALL PASS
```

#### **Git Integration Pattern**

```bash
# TDD commit pattern
git commit -m "test: add failing test for spl/blob/get edge case (#issue-number)"
git commit -m "feat: implement spl/blob/get to pass tests (#issue-number)" 
git commit -m "refactor: optimize spl/blob/get implementation (#issue-number)"
```

## Simple Prototype Implementation Plan (Next Version)

### Phase 1: Core spl/test API Foundation

#### **Core Methods (Essential)**
1. **spl/test/run** - Execute commands with dual output capture
2. **spl/test/assert** - Basic assertion methods (equals, contains, exists)
3. **spl/test/expect** - Set up expected outcomes
4. **spl/test/debug** - Debug information capture and display

#### **API Structure**
```
modules/spl/test/
├── index.js              # API entry point
├── run.js                # Execute and capture both output channels
├── assert.js             # Assertion methods for validation
├── expect.js             # Expected outcome setup
├── debug.js              # Debug information capture
└── run_arguments.json    # Argument schema for spl/test/run
```

#### **Key Implementation Features**
- **Dual Channel Analysis**: Capture both execution JSON records and stdout/stderr
- **Debug Flag Integration**: Detailed execution step tracking when debug=true
- **Simple Assertion Library**: Basic validation methods for common test patterns
- **SPlectrum Integration**: Native integration with existing execution pipeline

### Phase 2: Enhanced Bug Collection Integration (Future)

#### **spl/error Enhancements**
- **spl/error/collect** - Enhanced with test context
- **spl/error/report** - Bug report generation from test failures
- **GitHub Issue Automation** - Automatic issue creation for failing tests

### Phase 3: Test Development Patterns (Future)

#### **TDD Workflow Integration**
- **Red-Green-Refactor** cycle documentation
- **Test-First Development** patterns with spl/test API
- **Requirement Testing** - TDD against defined requirements

## Integration with Existing Systems

### **Argument Schema Validation**
- Leverage existing argument validation patterns
- Ensure `-f`, `-a`, `-d` parameter consistency
- Test argument schema compliance as part of test suite

### **Batch File Execution**
- Build on proven `spl/app/exec -f {file}.batch` pattern
- Support existing test-suite app structure
- Maintain compatibility with current testing approach

### **Error Pipeline Integration**
- Enhance existing `spl/error/catch` functionality
- Maintain current error context and history mechanisms
- Add test-aware error collection without breaking existing flows

## Benefits for TDD Implementation

### **Development Workflow**
- **Fast Feedback**: Immediate test results for development cycles
- **Regression Prevention**: Automated detection of breaking changes
- **Quality Gates**: Test-driven feature development ensures reliability

### **Bug Management**
- **Automatic Collection**: Test failures automatically become bug reports
- **Reproduction Data**: Complete environment and steps captured
- **Traceability**: Direct link between test failures and GitHub issues

### **Team Productivity**
- **Consistent Testing**: Standardized test execution across all APIs
- **Clear Expectations**: TDD workflow provides development structure
- **Automated Quality**: Bug detection happens during development, not deployment

## Next Steps

1. **Create Implementation Issues**: Break down Phase 1A-1D into actionable GitHub issues
2. **Start with Test Runner**: Begin with basic test execution framework (Phase 1A)
3. **Integrate with CAE-1**: Coordinate with unified data API work for comprehensive testing
4. **Plan Next Version Features**: Design GitHub issue automation for future implementation

This architecture provides a solid foundation for TDD implementation while building incrementally on SPlectrum's existing test infrastructure and maintaining compatibility with current development patterns.