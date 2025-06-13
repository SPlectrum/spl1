[← Home](../README.md)

# SPL Execute API Properties

## Quick Reference
Execution context stored in `headers.spl.execute` throughout pipeline lifecycle.

## Core Properties
| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `action` | String | - | Current executing action |
| `session` | String | "boot" | Execution session identifier |
| `TTL` | Number | 100 | Time to live (decrements each cycle) |
| `status` | String | - | `"green"` \| `"orange"` \| `"red"` |
| `startTime` | Number | - | Execution start timestamp |
| `finishTime` | Number | - | Execution end timestamp |
| `duration` | Number | - | Calculated duration (ms) |

## Pipeline Properties
| Property | Type | Purpose |
|----------|------|---------|
| `pipeline` | Array | Execution steps queue |
| `graph` | Object | Contains `UUID`, `ancestors`, `children` |

## Runtime Properties
| Property | Type | Purpose |
|----------|------|---------|
| `fileName` | String | Generated for request logging |
| `cwd` | String | Current working directory |
| `modules` | String | Module root (default: "modules") |
| `runtimeMode` | String | Controls request logging |
| `consoleMode` | String | `"debug"` \| `"verbose"` \| `"silent"` |
| `history` | Array | Execution history entries |
| `repeatRequest` | Boolean | Repeat current request flag |

## Usage
```javascript
// Read context
const action = spl.context(input, "action");
const status = spl.context(input, "status");

// Set context
spl.setContext(input, "action", "spl/execute/next");
spl.setContext(input, "status", "green");
```

## Execution Flow
```
execute → initialise → next → [action] → status check:
├── data → data_next → loop to next
├── blob → blob_next → loop to next  
├── error → spl/error/catch
├── execute → execute_next → loop to next
├── completed → spl/execute/set-next → loop to next
└── default → spl/execute/complete
```

## TTL Management
- Starts at 100 in `initialise.js`
- Decrements by 1 each cycle in `execute.js`  
- TTL < 1 aborts execution (except error/complete actions)

---

[← Home](../README.md)