# spl/app/finalise

Prepares execution of batch operations based on global settings and finalizes the pipeline for execution.

## Purpose

This internal API command handles the final preparation stage before batch execution, including console mode configuration, help pipeline addition, and pipeline execution setup.

## Key Operations

1. **Console Mode Setup** - Configures console mode from global settings
2. **Help Integration** - Adds help commands to pipeline when requested
3. **Pipeline Creation** - Creates `spl/execute/set-pipeline` for execution
4. **Execution Control** - Handles parseOnly mode or proceeds to execution

## Global Settings Processed

- `consoleMode` - Sets console output mode
- `help` - Array of help requests to add to pipeline
- `parseOnly` - Flag to complete without execution

## Pipeline Flow

If help is requested, adds `spl/app/help` to the pipeline before execution.

## Usage

```bash
# Typically used as final step in app pipeline
spl_execute dev spl/app/prepare @@ spl/app/parse @@ spl/app/pipeline @@ spl/app/finalise
```

## API Type

API Method - Pipeline finalization processor