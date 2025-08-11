# spl/app/prepare

Prepares command line entry for parsing by splitting batch input into structured line and part representations.

## Purpose

This internal API command transforms raw batch input into a structured format suitable for parsing, handling line breaks, pipeline operators, and workspace initialization.

## Key Operations

1. **Input Normalization** - Handles arrays, strings, and removes carriage returns
2. **Line Splitting** - Separates input into individual command lines
3. **Pipeline Detection** - Identifies pipeline operators ("@@") within lines
4. **Part Segmentation** - Splits lines with pipelines into separate parts
5. **Workspace Setup** - Creates structured `spl/app` workspace entry

## Input Processing

- **Array Handling** - Joins array inputs with spaces
- **Line Breaks** - Removes `\r` characters and splits on `\n`
- **Pipeline Operators** - Splits lines containing `@@` into parts
- **Trimming** - Uses `app.splitAndTrim()` for clean argument separation

## Output Structure

Creates `spl/app` workspace with:
- `headers.spl.app.currentLine` - Current line index (-1 initially)
- `headers.spl.app.currentPart` - Current part index (-1 initially)
- `value.batch` - Original batch input
- `value.input` - Structured line/part representation
- `value.parsed` - Empty object for parsing results
- `value.options` - Preserved from previous workspace if exists

## Usage

```bash
# First step in app processing pipeline
spl_execute dev spl/app/prepare --batch="command1 @@ command2"
```

## API Type

API Method - Batch input preprocessor