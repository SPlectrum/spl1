# spl/data/queue

Queues an action request to the runtime request queue in Kafka record mode.

## Purpose

This API method puts action requests onto the request queue specified in the execution header, writing them in a structured Kafka record format for distributed processing.

## Key Operations

1. **Context Extraction** - Gets current working directory and session information
2. **Session Path Resolution** - Handles boot/system sessions vs regular session paths
3. **Queue Data Preparation** - Serializes workspace reference to JSON format
4. **File Record Writing** - Writes queue data using Kafka record format
5. **Progress Logging** - Records successful queue operation

## Session Handling

- **Boot/System Sessions** - Used as-is without modification
- **Regular Sessions** - Prefixed with `sessions/` directory path

## Queue Structure

Queues action requests to: `runtime/{session}/requests/queue`

## Data Format

Uses JSON serialization of workspace references in Kafka record mode for compatibility with distributed processing systems.

## Usage

```bash
spl_execute dev spl/data/queue
```

## Dependencies

- `spl_lib` - Core SPL functionality
- `spl_data` - Data handling and file operations

## API Type

API Method - Action request queue manager