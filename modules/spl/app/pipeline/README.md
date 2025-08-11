# spl/app/pipeline

Creates executable pipelines from parsed commands by transforming parsed command structures into pipeline requests with global option handling.

## Purpose

This internal API command converts parsed command data into structured pipeline requests, handling global options, help requests, and appRoot configuration for execution.

## Key Operations

1. **Pipeline Creation** - Builds array of executable pipeline requests
2. **Global Options Processing** - Handles parseOnly, debug, verbose, and help flags
3. **Request Structure** - Creates action requests with proper argument mapping
4. **AppRoot Integration** - Adds appRoot and appDataRoot to requests
5. **Help Collection** - Gathers help requests for batch processing

## Global Options Handled

- `parseOnly` - Sets flag to complete without execution (test mode)
- `debug`/`verbose` - Sets console mode for output control
- `help` - Collects help requests for later processing
- `steps` - Adds TTL limits to first pipeline request

## AppRoot Management

- **AppRoot Addition** - Adds appRoot from parsed details to requests
- **Data Root Default** - Sets appDataRoot to `{appRoot}/data` by default
- **Request Enhancement** - Enriches requests with app context

## Pipeline Structure

Each pipeline request contains:
- `action` - Command to execute
- Command-specific arguments (using command as key)
- `appRoot` and `appDataRoot` when applicable

## Usage

```bash
# Typically used after spl/app/parse
spl_execute dev spl/app/parse @@ spl/app/pipeline
```

## API Type

API Method - Pipeline generator from parsed commands