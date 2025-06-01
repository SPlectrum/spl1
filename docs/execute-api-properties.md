[Home](../README.md)
# SPL Execute API Properties

This document provides a comprehensive overview of the properties used by the SPL execute API, particularly the `headers.spl.execute` properties.

## Overview

The execute API uses the `headers.spl.execute` object as the primary execution context container. This object persists throughout the entire execution lifecycle and allows each step to access and modify the execution context as needed.

## Headers.spl.execute Properties

### Core Execution Properties

| Property | Type | Description |
|----------|------|-------------|
| `action` | String | The current action being executed (e.g., "spl/execute/initialise", "spl/execute/next", "spl/execute/complete") |
| `session` | String | The execution session identifier (defaults to "boot" or "system", otherwise uses "sessions/{session}") |
| `TTL` | Number | Time To Live - Execution timeout counter, defaults to 100, decremented on each execution cycle |
| `status` | String | Execution status indicator: `"green"` (successful), `"orange"` (warnings), `"red"` (errors) |
| `startTime` | Number | Timestamp when execution began (set by `initialise.js`) |
| `finishTime` | Number | Timestamp when execution completed (set by `complete.js`) |
| `duration` | Number | Calculated execution duration in milliseconds |

### Pipeline Management Properties

| Property | Type | Description |
|----------|------|-------------|
| `pipeline` | Array | Contains the execution pipeline steps |
| `graph` | Object | Execution graph object containing `UUID`, `ancestors`, and `children` arrays |

### File and Session Management

| Property | Type | Description |
|----------|------|-------------|
| `fileName` | String | Generated filename for request logging (used in initialise/complete logging) |
| `cwd` | String | Current working directory for module resolution |
| `modules` | String | Module root directory (defaults to "modules") |
| `moduleOverlay` | Array | Module overlay configurations for custom module loading |

### Runtime Control Properties

| Property | Type | Description |
|----------|------|-------------|
| `runtimeMode` | String | Controls runtime behavior (when not "silent", enables request logging) |
| `consoleMode` | String | Controls console output verbosity: `"debug"`, `"verbose"`, `"silent"` |
| `consoleProgress` | String | Tracks console progress output to avoid duplicate messages |
| `history` | Array | Execution history entries, each containing `[action, context_action, activity]` |
| `repeatRequest` | Boolean | Flag indicating if the current request should be repeated |

## Key Functions

The [`spl.js`](../modules/spl/spl.js) library provides these functions for working with `headers.spl.execute`:

### Reading Properties
```javascript
// Get all execution context properties
const context = spl.context(input);

// Get specific execution context property
const action = spl.context(input, "action");
const status = spl.context(input, "status");
```

### Setting Properties
```javascript
// Set execution context property
spl.setContext(input, "action", "spl/execute/next");
spl.setContext(input, "status", "green");

// Set entire context object
spl.setContext(input, null, contextObject);
```

## Execution Flow

The execute API follows this flow using these properties:

```
spl/execute/execute
    ↓
spl/execute/initialise
    ↓
spl/execute/next
    ↓
Execute Request Action
    ↓
Status Check:
    ├── data → Set data_next action → Loop back to next
    ├── blob → Set blob_next action → Loop back to next
    ├── error → spl/error/catch
    ├── execute → Set execute_next action → Loop back to next
    ├── completed → spl/execute/set-next → Loop back to next
    └── default → spl/execute/complete → End
```

## Status Flow Management

The [`next.js`](../modules/spl/execute/next.js) module handles status-based routing:

- **`data`** status: Sets `action` to `request.data_next` and `repeatRequest` to `request.repeat`
- **`blob`** status: Sets `action` to `request.blob_next` and `repeatRequest` to `request.repeat`
- **`error`** status: Sets `action` to `"spl/error/catch"`
- **`execute`** status: Sets `action` to `request.execute_next`
- **`completed`** status: Sets `action` to `"spl/execute/set-next"`
- **Default**: Sets `action` to `"spl/execute/complete"`

## TTL (Time To Live) Management

The TTL property provides execution timeout protection:

1. Initialized to 100 in [`initialise.js`](../modules/spl/execute/initialise.js)
2. Decremented by 1 on each execution cycle in [`execute.js`](../modules/spl/execute/execute.js)
3. When TTL < 1, execution is aborted with error (except for error/catch and complete actions)

## Logging and Request Tracking

When `runtimeMode` is not "silent":

- **Initialise**: Creates a write record to log the initial request
- **Complete**: Creates a put record to log the final request state

Both operations use the `fileName` property for consistent file naming across the execution lifecycle.

## Console Output Control

The `consoleMode` property controls output verbosity:

- **`"debug"`**: Full object dump using `console.dir(input, { depth: 100 })`
- **`"verbose"`**: Verbose output (not yet implemented)
- **`"silent"`**: Minimal output
- **Default**: Standard completion messages with duration

## Related Files

- [`modules/spl/execute/execute.js`](../modules/spl/execute/execute.js) - Main execution controller
- [`modules/spl/execute/initialise.js`](../modules/spl/execute/initialise.js) - Execution initialization
- [`modules/spl/execute/next.js`](../modules/spl/execute/next.js) - Next action routing
- [`modules/spl/execute/complete.js`](../modules/spl/execute/complete.js) - Execution completion
- [`modules/spl/spl.js`](../modules/spl/spl.js) - Core utility functions