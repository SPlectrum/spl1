[Home](../README.md)
# SPL App API Properties

This document provides a comprehensive overview of the properties used by the SPL app API, particularly the `headers.spl.app` properties.

## Overview

The app API is responsible for processing command line input through a multi-stage pipeline: preparation, parsing, pipeline creation, and finalization. The `headers.spl.app` object maintains state throughout this process, tracking the current position in batch command processing and enabling sequential parsing of multi-line, multi-part commands.

## Headers.spl.app Properties

### Core State Tracking Properties

| Property | Type | Description |
|----------|------|-------------|
| `currentLine` | Number | The current line being processed in a batch command execution (defaults to -1) |
| `currentPart` | Number | The current part within a line when commands are split using `@@` delimiter (defaults to -1) |

### Property Details

#### currentLine
- **Default Value**: `-1` (indicates no active line)
- **Purpose**: Tracks position in multi-line command batches during parsing and pipeline creation
- **Range**: -1 (inactive) to N (where N is the number of lines in the batch)
- **Usage**: Incremented by `getNext()` as the parser processes each line sequentially

#### currentPart
- **Default Value**: `-1` (indicates processing entire line or no active part)
- **Purpose**: Tracks position within a line when using `@@` command separators
- **Range**: -1 (entire line) to N (where N is the number of parts in the line)
- **Usage**: Enables parsing of complex command lines with multiple command segments

## App Processing Pipeline

The app API follows this four-stage processing pipeline defined in [`process.js`](../modules/spl/app/process.js):

```
spl/app/process
    ↓
spl/app/prepare → Initialize headers.spl.app state
    ↓
spl/app/parse → Use currentLine/currentPart to parse commands
    ↓
spl/app/pipeline → Use currentLine/currentPart to build execution pipeline
    ↓
spl/app/finalise → Complete processing
```

## Complete App Object Structure

The app object structure in the workspace:

```javascript
{
  headers: { 
    spl: { 
      app: { 
        currentLine: -1, 
        currentPart: -1 
      } 
    } 
  },
  value: { 
    batch: string | array,     // Original batch input
    input: object,             // Prepared input split into lines/parts
    parsed: object,            // Parsed command arguments by line/part
    options: object            // App configuration options
  },
  pipeline: array,             // Generated execution pipeline
  global: object               // Global settings (help, consoleMode, etc.)
}
```

## Key Functions

The [`app.js`](../modules/spl/app/app.js) library provides these functions for working with `headers.spl.app`:

### State Navigation Functions
```javascript
// Get next line/part to process
const next = app.getNext(splApp);

// Reset to initial state (-1, -1)
app.reset(splApp);

// Set current position
app.setCurrent(splApp, { line: 0, part: 0 });
```

### Data Access Functions
```javascript
// Get raw command string for current position
const command = app.commandString(splApp, current);

// Get parsed arguments for current position
const parsed = app.parsed(splApp, current);

// Store parsed results
app.setParsed(splApp, current, parsedResult);
```

## Processing Stages

### Stage 1: Prepare ([`prepare.js`](../modules/spl/app/prepare.js))
- Initializes `headers.spl.app` with `currentLine: -1, currentPart: -1`
- Splits batch input into lines (by `\n`) and parts (by `@@`)
- Creates structured input object with `line_N` and `part_N` keys

### Stage 2: Parse ([`parse.js`](../modules/spl/app/parse.js))
- Uses `getNext()` to iterate through each line/part
- Parses command arguments using command-line-args parser
- Stores parsed results using `setParsed()`
- Updates `currentLine/currentPart` using `setCurrent()`
- **TTL Protection**: 100-iteration limit to prevent infinite loops

### Stage 3: Pipeline ([`pipeline.js`](../modules/spl/app/pipeline.js))
- Resets state using `reset()` and iterates through parsed commands
- Builds execution pipeline from parsed command data
- Processes global arguments (help, debug, verbose, steps)
- Creates action requests for the execution engine
- **TTL Protection**: 100-iteration limit to prevent infinite loops

### Stage 4: Finalise ([`finalise.js`](../modules/spl/app/finalise.js))
- Sets up the execution pipeline for the execute API
- Transfers control to the execution engine

## Input Structure Processing

### Line Processing
Commands are split into lines using newline characters (`\n`):
```javascript
// Input: "spl/console/log message1\nspl/console/log message2"
// Results in:
{
  "line_0": ["spl/console/log", "message1"],
  "line_1": ["spl/console/log", "message2"]
}
```

### Part Processing
Within lines, commands can be split using `@@` delimiter:
```javascript
// Input: "spl/console/log message1 @@ spl/console/log message2"
// Results in:
{
  "line_0": {
    "part_0": ["spl/console/log", "message1"],
    "part_1": ["spl/console/log", "message2"]
  }
}
```

## State Management Logic

### getNext() Algorithm
Located in [`app.js:49`](../modules/spl/app/app.js:49)

```javascript
function getNext(splApp) {
    var line = splApp.headers.spl.app.currentLine;
    var part = splApp.headers.spl.app.currentPart;
    part++;
    
    // Check if part exists in current line
    if (splApp.value.input[`line_${line}`] && 
        splApp.value.input[`line_${line}`][`part_${part}`]) {
        return { line: line, part: part };
    }
    
    // Move to next line
    line++; part = 0;
    if (splApp.value.input[`line_${line}`]) {
        if (splApp.value.input[`line_${line}`][`part_${part}`] === undefined) {
            part = -1; // Entire line processing
        }
        return { line: line, part: part };
    }
    
    // No more commands
    return { line: -1, part: -1 };
}
```

### reset() Function
Located in [`app.js:63`](../modules/spl/app/app.js:63)

**Purpose**: Resets both `currentLine` and `currentPart` to -1
**Usage**: Called at the start of pipeline stage to restart iteration

### setCurrent() Function
Located in [`app.js:69`](../modules/spl/app/app.js:69)

**Purpose**: Updates current position after processing a line/part
**Usage**: Called after parsing or pipeline processing of each command

## Integration with Execute API

The app API creates execution pipelines for the execute API:

```javascript
spl.wsSet(input, "spl/execute.set-pipeline", {
    headers: {
        spl: {
            execute: { pipeline: splApp.pipeline }
        }
    },
    value: {}
});
```

## Error Handling and TTL Protection

Both parsing and pipeline stages include TTL (Time To Live) protection:
- **Limit**: 100 iterations per stage
- **Purpose**: Prevents infinite loops in malformed input
- **Error**: "Parser ran out of steps when parsing" if TTL exceeded

## Utility Functions

### commandString()
- **Purpose**: Retrieves raw command string for specified line/part
- **Returns**: String array of command and arguments
- **Usage**: `app.commandString(splApp, { line: 0, part: 0 })`

### parsed()
- **Purpose**: Retrieves parsed command arguments for specified line/part
- **Returns**: Structured clone of parsed arguments to prevent mutations
- **Usage**: `app.parsed(splApp, { line: 0, part: 0 })`

### setParsed()
- **Purpose**: Stores parsed command results for specific line/part
- **Storage**: Nested object structure `parsed[line_N][part_N]` or `parsed[line_N]`

## Related Files

- [`modules/spl/app/process.js`](../modules/spl/app/process.js) - Main processing pipeline controller
- [`modules/spl/app/prepare.js`](../modules/spl/app/prepare.js) - Input preparation and state initialization
- [`modules/spl/app/parse.js`](../modules/spl/app/parse.js) - Command parsing using state tracking
- [`modules/spl/app/pipeline.js`](../modules/spl/app/pipeline.js) - Pipeline creation using state tracking
- [`modules/spl/app/finalise.js`](../modules/spl/app/finalise.js) - Processing completion
- [`modules/spl/app/app.js`](../modules/spl/app/app.js) - Core app utility functions
- [`modules/spl/app_arguments.json`](../modules/spl/app_arguments.json) - App API argument definitions