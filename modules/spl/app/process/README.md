# spl/app/process

Entry action for preparing, parsing, and executing command line strings through a complete processing pipeline.

## Purpose

This internal API command serves as the main entry point for batch processing, orchestrating the complete workflow from raw batch input through to final execution.

## Arguments

- `appRoot` - Root directory for the application
- `batch` - Command line string or batch content to process

## Processing Pipeline

Creates and executes a 4-stage pipeline:

1. **Prepare** (`spl/app/prepare`) - Processes raw batch input
2. **Parse** (`spl/app/parse`) - Parses commands and arguments
3. **Pipeline** (`spl/app/pipeline`) - Creates executable pipeline
4. **Finalise** (`spl/app/finalise`) - Finalizes and executes pipeline

## Configuration

- Sets `spl/app.appRoot` configuration for the entire processing session
- Passes batch content to the preparation stage

## Usage

```bash
spl_execute dev spl/app/process --appRoot="/path/to/app" --batch="command1 @@ command2"
```

## Integration

This is typically the main entry point for:
- Interactive command processing
- Batch file execution
- Command line interface operations

## API Type

API Method - Main batch processing orchestrator