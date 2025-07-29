---
type: feature
github_id: 67
title: "Implement core spl/test API foundation"
state: "open"
milestone: "v0.8.0"
labels: "["enhancement","TDD"]"
priority: medium
estimated_effort: TBD
github_updated_at: "2025-07-10T15:01:54Z"
local_updated_at: "2025-07-29T14:00:08.857Z"
---

# Implement core spl/test API foundation

Problem Statement
## Objective
Create core spl/test API with essential methods for dual output channel testing.

## Core API Methods

### **spl/test/run** - Execute and Capture
- Execute SPlectrum commands with full output capture
- Capture execution JSON records (input.value, headers) 
- Capture stdout/stderr streams
- Debug flag integration for detailed execution tracking
- Timing and context preservation

### **spl/test/assert** - Validation Methods  
- Basic assertion types: equals, contains, exists, status
- Target both output channels: workspace, stdout, stderr, exitCode
- JSON path support for workspace assertions
- Result accumulation and pass/fail determination

### **spl/test/expect** - Expected Outcome Setup
- Define expected workspace state changes
- Expected stdout/stderr content patterns
- Expected exit codes and execution status
- Debug expectation configuration

### **spl/test/debug** - Debug Information
- Detailed execution step tracking
- Workspace state comparison (before/after)
- Context snapshot capture
- Formatted debug output display

## API Structure
```
modules/spl/test/
├── index.js              # API entry point
├── run.js                # Execute and capture both output channels
├── assert.js             # Assertion methods for validation  
├── expect.js             # Expected outcome setup
├── debug.js              # Debug information capture
└── *_arguments.json      # Argument schemas for each method
```

## Key Features
- **Dual Channel Analysis**: Leverage SPlectrum's execution JSON + stdout/stderr
- **Debug Integration**: Enhanced debug=true detailed tracking
- **Simple Prototype**: Foundation for future sophisticated testing tools
- **TDD Ready**: Support test-driven development workflows

## Integration Points
- Existing `spl/app/exec` and `spl/app/run` patterns
- Current `spl/error/catch` error handling
- SPlectrum workspace and execution context
- Future spl/error bug collection enhancements

## Next Version Scope
This is a **simple prototype** to evaluate and evolve the testing approach.

## Dependencies
- TDD workflow architecture (issue #17)
- Understanding of SPlectrum dual output channels
- Current execution and error handling patterns

## Acceptance Criteria
- [ ] All 4 core methods implemented (run, assert, expect, debug)
- [ ] Dual output channel capture working
- [ ] Debug flag integration functional
- [ ] Basic assertion library operational
- [ ] Integration with existing SPlectrum execution patterns
- [ ] Simple prototype ready for evaluation

Parent Issue: #17 TDD-1 Plan TDD workflow architecture

## Original GitHub Context
What problem does this solve? What user need or business requirement drives this feature?

## Required Work
How will we solve it? High-level approach and key components.

## Work Plan
Technical details, API designs, database changes, step-by-step approach.

## Acceptance Criteria
- [ ] Criterion 1: Specific, testable outcome
- [ ] Criterion 2: Another measurable success condition
- [ ] Criterion 3: Documentation updated

## Technical Considerations
- Architecture decisions
- Dependencies on other features
- Performance implications
- Security considerations

## GitHub Discussion Summary
Key insights from GitHub comments (curated manually)

## Progress Log
- Date: Status update