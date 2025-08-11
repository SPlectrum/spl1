# spl/app/generate

Generates a reusable command from a parsed pipeline by creating JavaScript and arguments files in the user modules directory.

## Purpose

Takes a pipeline created by the parser and transforms it into a reusable command with automatic name conflict resolution, file generation, and proper module structure.

## Arguments

- `actionName` - Base name for the generated command
- `filePath` - Path to the source batch file
- `appRoot` - Root directory for the application

## Generation Process

1. **Name Conflict Resolution** - Checks existing files and adds numeric suffix if needed
2. **Pipeline Extraction** - Gets parsed pipeline from workspace
3. **Code Generation** - Creates wrapped JavaScript command
4. **Arguments Creation** - Generates corresponding arguments JSON file
5. **File Storage** - Stores both files in `modules/usr/` directory

## Generated Files

- `modules/usr/{actionName}.js` - Executable command file
- `modules/usr/{actionName}_arguments.json` - Command arguments schema

## Name Collision Handling

Automatically appends numbers (e.g., `command1`, `command2`) to avoid overwriting existing files.

## Usage

```bash
spl_execute dev spl/app/generate --actionName="myCommand" --filePath="batch.txt" --appRoot="/path/to/app"
```

## API Type

API Method - Command generator from pipeline