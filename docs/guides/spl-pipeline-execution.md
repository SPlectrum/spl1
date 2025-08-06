# SPL Pipeline Execution Guide

## Overview

SPL supports pipeline execution where multiple commands can share workspace data within a single execution context. This is essential for multi-step workflows that depend on data persistence between command phases.

## Pipeline Execution Methods

### Method 1: Command Piping
Commands can be piped together using `&&` to execute in sequence within the same execution context:

```bash
/home/herma/splectrum/spl1/spl_execute dev gp/test/discover --modules=gp/fs --tests=basic && /home/herma/splectrum/spl1/spl_execute dev gp/test/plan && /home/herma/splectrum/spl1/spl_execute dev gp/test/run && /home/herma/splectrum/spl1/spl_execute dev gp/test/report
```

### Method 2: Batch Execution
Commands can be combined into a batch execution for a single execution context.

## Workspace Persistence

**CRITICAL**: Workspace data does NOT persist between separate command executions. Each individual command invocation creates its own isolated execution context.

**Wrong Approach** (Workspace data lost between commands):
```bash
# This will fail - each command has isolated workspace
/home/herma/splectrum/spl1/spl_execute dev gp/test/discover --modules=gp/fs --tests=basic
/home/herma/splectrum/spl1/spl_execute dev gp/test/plan  # ERROR: No discovery data found
```

**Correct Approach** (Workspace data shared in pipeline):
```bash
# This works - all commands share the same execution context
/home/herma/splectrum/spl1/spl_execute dev gp/test/discover --modules=gp/fs --tests=basic && /home/herma/splectrum/spl1/spl_execute dev gp/test/plan && /home/herma/splectrum/spl1/spl_execute dev gp/test/run && /home/herma/splectrum/spl1/spl_execute dev gp/test/report
```

## Multi-Step Workflow Implementation

When implementing workflows that depend on data from previous steps:

1. **Design for Pipeline Execution**: Assume commands will be executed in a single pipeline context
2. **Use spl.wsSet() and spl.wsRef()**: Store data in workspace using API record pattern
3. **Implement Error Handling**: Check for required data and provide clear error messages
4. **Test End-to-End**: Always test the complete pipeline, not individual commands

## API Record Pattern for Workspace

```javascript
// Step 1: Get or create API record
let apiRecord = spl.wsRef(input, "gp/test");
if (!apiRecord) {
    apiRecord = {
        headers: { gp: { test: { api: "gp/test", timestamp: new Date().toISOString() } } },
        value: {}
    };
}

// Step 2: Store data in pattern-based structure
const requestKey = "|pattern1||pattern2||pattern3|";
apiRecord.value[requestKey] = {
    headers: { workflow: ['discover'], ... },
    value: { discovery: {...}, plan: {...}, run: {...} }
};

// Step 3: Save back to workspace
spl.wsSet(input, "gp/test", apiRecord);
```

## Testing Pipeline Workflows

**Always test the complete pipeline**:
```bash
# Test discovery → plan → run → report pipeline
/home/herma/splectrum/spl1/spl_execute dev -d gp/test/discover --modules=gp/fs --tests=basic && /home/herma/splectrum/spl1/spl_execute dev gp/test/plan && /home/herma/splectrum/spl1/spl_execute dev gp/test/run && /home/herma/splectrum/spl1/spl_execute dev gp/test/report
```

**Never assume individual commands work in isolation** for multi-step workflows.

## Common Pipeline Errors

### "No discovery data found"
**Cause**: Commands executed separately instead of in pipeline  
**Solution**: Use `&&` to chain commands in single execution context

### "No test data found in workspace"
**Cause**: Report command executed separately from pipeline  
**Solution**: Include report as final step in pipeline execution

## Key Principle

**SPL workspace data persists within a single execution context, not across separate command invocations.**

---

*This guide documents essential SPL pipeline execution patterns for multi-step workflows.*