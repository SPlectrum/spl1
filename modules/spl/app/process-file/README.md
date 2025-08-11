# spl/app/process-file

Reads commands from a specified file and processes them with argument substitution for batch processing.

## Purpose

This method handles file-based command input by reading files, applying argument substitution, and storing the content for subsequent processing stages.

## Arguments

- `file` - Path to the file containing commands
- `repo` or `appRoot` - Repository root directory
- `dir` - Directory containing the file
- `args` - Arguments to substitute in file content
- `skipArgs` - Flag to skip argument substitution

## Argument Substitution

When `skipArgs` is false (default), performs these substitutions:
- `$@` - Replaced with comma-separated argument list
- `$*` - Replaced with space-separated argument list  
- `$1`, `$2`, etc. - Replaced with individual arguments

## File Processing Flow

1. **File Reading** - Reads file content using `spl/blob/get`
2. **Argument Substitution** - Applies argument replacements if enabled
3. **Configuration Storage** - Stores processed content in `spl/app/prepare.batch`

## Usage

```bash
spl_execute dev spl/app/process-file --file="commands.txt" --repo="/app" --dir="batches" --args="['param1', 'param2']"
```

## Integration

Commonly used as the first step in pipelines that need to process file-based commands before preparation and execution.

## API Type

API Method - File reader with argument substitution