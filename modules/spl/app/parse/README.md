# spl/app/parse

Parses prepared batch input by processing commands, arguments, and app overlay detection to create structured command representations.

## Purpose

This internal API command processes prepared batch content line by line, handling command parsing, argument extraction, and app overlay detection with appRoot management.

## Key Operations

1. **Command Processing** - Iterates through prepared batch lines
2. **Argument Parsing** - Parses global and command-specific arguments
3. **App Overlay Detection** - Identifies app overlays and extracts appRoot paths
4. **AppRoot Management** - Handles line-level and batch-level appRoot defaults
5. **Result Storage** - Stores parsed command structures for pipeline creation

## App Overlay Handling

- **Detection** - Identifies app overlays from repository paths containing "apps/"
- **AppRoot Extraction** - Extracts appRoot from paths like "apps/test-spl-app/modules"
- **Default Setting** - Sets line default appRoot on first app encounter
- **Inheritance** - Applies appRoot to both app and module commands

## Parsing Structure

Each command is parsed into multiple parts:
- Global arguments (key: "")
- Command segments (key: command path like "spl/app/create")
- Unknown arguments for further processing

## Usage

```bash
# Typically used after spl/app/prepare
spl_execute dev spl/app/prepare @@ spl/app/parse
```

## API Type

API Method - Batch command parser with app overlay support