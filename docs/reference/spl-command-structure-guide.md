# SPL Command Structure and Development Guide

## Overview

This guide explains the SPL command structure, execution patterns, and development workflows for the spl-dev environment.

## Command Execution

### Basic Syntax
```bash
/home/herma/splectrum/spl1/spl_execute dev [options] <command> [command-args]
```

### Command Chaining
```bash
/home/herma/splectrum/spl1/spl_execute dev <command1> [args] @@ <command2> [args] @@ <command3> [args]
```

**Purpose**: Execute multiple commands in a single SPL execution context with shared workspace data.

**Key Benefits**:
- **Shared Workspace**: All chained commands access the same workspace data
- **Single Execution**: One SPL process handles the entire chain
- **Pipeline Workflows**: Essential for multi-step operations like test pipelines

**Examples**:
```bash
# Test pipeline (discovery → plan → run → report)
spl_execute dev gp/test/discover --modules=gp/fs/write @@ gp/test/plan @@ gp/test/run @@ gp/test/report

# Console output chain
spl_execute dev spl/console/log "Step 1" @@ spl/console/log "Step 2" @@ spl/console/log "Complete"

# File operations chain
spl_execute dev gp/fs/write --file=test.txt --content="Hello" @@ gp/fs/read --file=test.txt
```

**Important**: Without `@@` chaining, each command runs in isolated execution contexts and cannot share workspace data.

### Global Options
- `-h, --help` - Show help information
- `-d, --debug` - Debug mode with full execution trace
- `-v, --verbose` - Verbose output (implementation pending)
- `-t, --test` - Parse-only mode (no execution)
- `-s, --steps N` - Set TTL for command execution

## Command Types and Structure

### 1. Core Module Commands

**Location**: `/spl-dev/modules/spl/`

**Pattern**: `spl/<module>/<command>`

**Context**: Global (no app context)

**Examples**:
```bash
# Console operations
spl_execute dev spl/console/log "Hello World"
spl_execute dev spl/console/error "Error message"
spl_execute dev spl/console/warn "Warning message"

# File operations (blob)
spl_execute dev spl/blob/get <file>
spl_execute dev spl/blob/put <file> <content>

# Void operations (testing)
spl_execute dev spl/void/noop  # No operation
```

**Key Modules**:
- `spl/console/*` - Console output operations
- `spl/blob/*` - File and blob operations
- `spl/data/*` - Data operations
- `spl/error/*` - Error handling
- `spl/execute/*` - Execution control
- `spl/package/*` - Package management
- `spl/void/*` - Testing utilities

**Note**: Commands starting with `spl/app/*` require app context - see Application Control section.

### 2. Tools Commands

**Location**: `/spl-dev/modules/tools/`

**Pattern**: `tools/<tool>/<command>`

**Examples**:
```bash
# 7zip operations
spl_execute dev tools/7zip/list -a archive.zip
spl_execute dev tools/7zip/extract -a archive.zip -o output/

# Git operations  
spl_execute dev tools/git/status
spl_execute dev tools/git/add -f file.txt
```

**Available Tools**:
- `tools/7zip/*` - Archive operations
- `tools/git/*` - Git version control operations

### 3. App Commands

**Location**: `/spl-dev/apps/<app-name>/modules/`

**Pattern**: `<app-name>/<module>/<command>`

**Examples**:
```bash
# Test app commands
spl_execute dev test-spl-app/usr/simple-test
spl_execute dev test-spl-app/usr/spl-app-basic-tests

# Model app commands
spl_execute dev model/usr/<command>
```

**App Structure**:
- Each app has its own `modules/` directory
- Apps can override core modules (app overlay pattern)
- Apps have `batches/`, `scripts/`, and `data/` directories

### 4. App Overlay Pattern

Apps can override core module behavior by providing their own implementation.

**Example**:
```bash
# Uses core implementation (appRoot: undefined)
spl_execute dev spl/void/noop

# Uses app-specific implementation (appRoot: apps/test-spl-app)  
spl_execute dev test-spl-app/void/noop
```

**Path Resolution Priority**:
1. App-specific modules (`apps/<app>/modules/`)
2. Core modules (`modules/`)

## Application Control Commands

### Batch File Execution

**Command**: `<app-name>/app/exec` (app-contextualized)

**Purpose**: Execute batch files containing multiple SPL commands within app context

**Syntax**:
```bash
spl_execute dev <app-name>/app/exec -f <batch-file> [-a <args>]
```

**Requirements**:
- Must use app-contextualized form (`<app-name>/app/exec`)
- Batch files must be in app `batches/` directory
- Use relative filename only (e.g., `simple.batch`)

**Examples**:
```bash
# Execute batch file with app context
spl_execute dev test-spl-app/app/exec -f simple.batch -a "test-parameter"

# Wrong - missing app context (will fail)
spl_execute dev spl/app/exec -f simple.batch
```

**Batch File Format**:
```
spl/console/log "Hello from batch file"
spl/console/log "Parameter: $1"
spl/void/noop
```

### Script Execution

**Command**: `<app-name>/app/run` (app-contextualized)

**Purpose**: Execute JavaScript script files within app context

**Syntax**:
```bash
spl_execute dev <app-name>/app/run -f <script-file> [-a <args>]
```

**Requirements**:
- Must use app-contextualized form (`<app-name>/app/run`)
- Script files must be in app `scripts/` directory
- Use relative filename only (e.g., `simple-test.js`)

**Examples**:
```bash
# Execute script with app context
spl_execute dev test-spl-app/app/run -f simple-test.js

# Wrong - missing app context (will fail)
spl_execute dev spl/app/run -f simple-test.js
```

### Command Creation

**Command**: `<app-name>/app/create` (app-contextualized)

**Purpose**: Convert batch files to permanent commands within app context

**Command**: `<app-name>/app/wrap` (app-contextualized)

**Purpose**: Wrap scripts as commands within app context

**Note**: These commands require app context to locate the source files in the correct app directory.

## Help System

### Command Help
```bash
# Get help for any command
spl_execute dev <command> -h

# Examples
spl_execute dev spl/console/log -h
spl_execute dev tools/7zip/list -h
spl_execute dev test-spl-app/usr/simple-test -h
```

### Global Help
```bash
# Show global options
spl_execute dev -h
```

## Development Workflow

### Directory Structure

```
spl-dev/
├── modules/           # Core SPL modules (development)
│   ├── spl/          # Core SPL functionality
│   └── tools/        # Tool integrations
└── apps/             # Application modules (development)
    └── <app-name>/
        ├── batches/  # Batch files (.batch)
        ├── scripts/  # Script files (.js, .py, .sh)
        ├── data/     # Application data
        └── modules/  # App-specific modules
```

### Development Rules

**🚫 Never modify**:
- `/modules/` (canonical core modules)
- `/apps/` (canonical app modules)

**✅ Always modify**:
- `/spl-dev/modules/` (development core modules)
- `/spl-dev/apps/` (development app modules)

### Sync Process

After development completion:

**Core Modules** (complete replacement):
```bash
rsync -av --delete spl-dev/modules/ modules/
```

**App Modules** (by app):
```bash
for app in spl-dev/apps/*/; do
  app_name=$(basename "$app")
  rsync -av --delete "spl-dev/apps/$app_name/" "apps/$app_name/"
done
```

## Debugging and Diagnostics

### Debug Mode

**Command**: Use `-d` flag for full execution trace

**Example**:
```bash
spl_execute dev -d test-spl-app/void/noop
```

**Debug Output Includes**:
- Complete execution history
- AppRoot context information
- Pipeline state
- Blob resolution paths
- Execution timing
- Request/response structure

### AppRoot Context

The debug output shows appRoot context:
- `undefined` - Core module execution
- `apps/<app-name>` - App-specific execution

**Example Debug Output**:
```json
{
  "headers": {
    "spl": {
      "execute": {
        "appRoot": "apps/test-spl-app",
        "cwd": "/home/herma/splectrum/spl1/spl-dev"
      }
    }
  }
}
```

### Test Mode

**Purpose**: Parse commands without execution

**Usage**:
```bash
spl_execute dev -t spl/console/log "Test message"
```

### Performance Monitoring

Commands show execution time:
```
spl/app/process completed succesfully ( 50 ms ).
```

## Common Error Patterns

### Missing App Context
```
ERROR - TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received undefined
```
**Cause**: Using `spl/app/exec` or `spl/app/run` without app context
**Solution**: Use app-contextualized form: `<app-name>/app/exec`

### File Not Found Errors
```
ERROR - Error: ENOENT: no such file or directory
```
**Solution**: Check file paths and ensure working from correct directory

### TTL Expiration
```
ERROR - TTL has expired, execution aborted
```
**Solution**: Use `-s` flag to increase step limit

### Invalid Arguments
```
ERROR - TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string
```
**Solution**: Check command syntax and argument format

### Module Not Found
```
ERROR - TypeError: require(...).default is not a function
```
**Solution**: Check module structure and implementation

### Command Parsing Rule
**Key Rule**: Commands not referencing an existing app with the first part are parsed as module commands. Always use `<app-name>/command/path` for app-specific operations.

## Working Examples

### Basic Operations
```bash
# Console output
spl_execute dev spl/console/log "Hello SPL"

# App-specific command
spl_execute dev test-spl-app/usr/simple-test

# Tools usage
spl_execute dev tools/7zip/list -h

# Debug mode
spl_execute dev -d spl/void/noop
```

### App Development
```bash
# Test app overlay
spl_execute dev test-spl-app/void/noop  # App version
spl_execute dev spl/void/noop           # Core version

# Run app tests
spl_execute dev test-spl-app/usr/spl-app-basic-tests

# Execute batch files (requires app context)
spl_execute dev test-spl-app/app/exec -f simple.batch -a "test-param"

# Execute scripts (requires app context)
spl_execute dev test-spl-app/app/run -f simple-test.js
```

### Help and Discovery
```bash
# Get command help
spl_execute dev spl/console/log -h
spl_execute dev tools/7zip/extract -h

# Test without execution  
spl_execute dev -t spl/console/log "test"
```

## Installation Context

### Current Setup
- **Development Install**: `dev` (spl-dev)
- **Command Router**: `/home/herma/splectrum/spl1/spl_execute`
- **Working Directory**: `/home/herma/splectrum/spl1/spl-dev`

### Future Installs
- **Planned**: `spl-repo` for workflow script execution
- **Multiple installs**: Switch via `spl_execute <install> <command>`

## Best Practices

1. **Always use `-h`** to check command syntax before first use
2. **Use debug mode** (`-d`) to understand execution flow
3. **Test with `-t`** before running potentially destructive commands
4. **Check appRoot context** in debug output to verify app overlay behavior
5. **Work only in spl-dev** during development
6. **Sync to canonical** only after testing completion
7. **Use relative paths** for batch and script files
8. **Monitor execution time** for performance optimization

---

*This guide is for Claude development reference and troubleshooting in the spl1 transitional repository.*