# spl/app/run

Executes script files with support for JavaScript, shell, and Python scripts through appropriate execution methods.

## Purpose

Provides unified script execution capability that automatically detects script type and uses the appropriate execution method for JavaScript, shell (.sh), or Python (.py) files.

## Arguments

- `appRoot` - Root directory for the application
- `file` - Path to the script file to execute
- `args` - Arguments to pass to the script

## Script Type Detection

- **Shell Scripts (.sh)** - Executed using `splApp.executeShellScript()`
- **Python Scripts (.py)** - Executed using `splApp.executePythonScript()`
- **JavaScript Scripts** - Executed through `spl/app/process-file` → `spl/app/eval` pipeline

## Execution Methods

### Shell and Python Scripts
- Uses auxiliary functions for direct execution
- Handles working directory and path resolution
- Passes arguments directly to script interpreter

### JavaScript Scripts
- Creates processing pipeline:
  1. `spl/app/process-file` - Reads and processes script file
  2. `spl/app/eval` - Evaluates JavaScript content

## Usage

```bash
# JavaScript script
spl_execute dev spl/app/run --appRoot="/app" --file="script.js" --args="['param1']"

# Shell script  
spl_execute dev spl/app/run --appRoot="/app" --file="script.sh" --args="['param1']"

# Python script
spl_execute dev spl/app/run --appRoot="/app" --file="script.py" --args="['param1']"
```

## API Type

API Method - Multi-language script executor