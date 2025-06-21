# AVRO Queue-Folder Service Design

## Overview

This document outlines the design for AVRO services that process messages from queue folders with continuous monitoring, enabling pipe-like composition of message processing workflows.

## Architecture Concept

### Queue-Folder Service Pattern

**Core Concept**: An AVRO service that continuously watches a designated folder for incoming AVRO-encoded messages, processes them according to defined schemas, and outputs results to downstream folders or services.

```
[Input Queue Folder] → [AVRO Service] → [Output Queue Folder/Service]
         ↓                    ↓                      ↓
    *.avro files      Schema Validation      Processed Results
```

### Pipe-Like Composition

Services can be chained together by connecting output folders to input folders:

```
[Service A] → [Queue Folder] → [Service B] → [Queue Folder] → [Service C]
```

## Technical Implementation

### 1. File System Watching

**Technology Options**:
- **Node.js fs.watch()** - Built-in, cross-platform
- **chokidar** - More reliable, better event handling
- **Custom polling** - Fallback for problematic filesystems

**Watch Pattern**:
```javascript
// Pseudocode structure
const watcher = chokidar.watch('/queue/input/*.avro', {
  ignored: /\.tmp$/,
  persistent: true,
  ignoreInitial: false
});

watcher.on('add', (filePath) => {
  processAVROMessage(filePath);
});
```

### 2. AVRO Message Processing Pipeline

**Processing Stages**:
1. **File Detection** - New .avro file appears in queue folder
2. **Schema Validation** - Validate against expected AVRO schema
3. **Message Processing** - Execute service logic on validated message
4. **Result Output** - Write results to output queue or downstream service
5. **Cleanup** - Move/delete processed input file

**Error Handling**:
- Invalid schema → Move to `error/` subfolder
- Processing failure → Move to `retry/` subfolder with retry count
- Poison messages → Move to `deadletter/` subfolder after max retries

### 3. Queue Folder Structure

```
/queue/service-name/
├── input/           # Incoming AVRO messages
├── processing/      # Files currently being processed (atomic moves)
├── output/          # Processed results (if file-based output)
├── error/           # Schema validation failures
├── retry/           # Processing failures (with retry count)
├── deadletter/      # Poison messages after max retries
└── .schema/         # AVRO schema files for validation
```

### 4. Message Flow Control

**Atomic Processing**:
1. Move file from `input/` to `processing/` (atomic operation)
2. Process the file from `processing/`
3. Output results and remove from `processing/`

**Backpressure Handling**:
- Configurable max concurrent processing
- Queue depth monitoring
- Pause/resume watching based on downstream capacity

## Integration with Existing AVRO Strategy

### Alignment with 4-Phase Roadmap

**Phase 1 Enhancement**: Queue-folder services provide concrete implementation pattern for core AVRO infrastructure.

**Phase 2 Integration**: Local service registration can include queue-folder services alongside RPC-style services.

**Phase 3 Extension**: Distributed communication can use shared queue folders (network mounts, distributed filesystems).

**Phase 4 Container Support**: Containers can expose queue folders as service endpoints.

### Service Definition Extension

Extend existing AVRO service definitions with queue-folder metadata:

```json
{
  "namespace": "spl.services",
  "type": "record",
  "name": "QueueFolderService",
  "fields": [
    {"name": "serviceName", "type": "string"},
    {"name": "inputSchema", "type": "string"},
    {"name": "outputSchema", "type": "string"},
    {"name": "queuePath", "type": "string"},
    {"name": "processingMode", "type": {"type": "enum", "symbols": ["SYNC", "ASYNC", "BATCH"]}},
    {"name": "maxConcurrency", "type": "int", "default": 1},
    {"name": "retryPolicy", "type": "RetryPolicy"}
  ]
}
```

## Use Cases

### 1. Data Processing Pipelines

**Log Processing Chain**:
```
[Raw Logs] → [Parse Service] → [Enrich Service] → [Index Service] → [Storage]
```

**ETL Workflows**:
```
[Extract Service] → [Transform Service] → [Validate Service] → [Load Service]
```

### 2. Microservice Communication

**Asynchronous Service Integration**:
- Services communicate via queue folders instead of direct RPC
- Natural decoupling and fault tolerance
- Easy monitoring and debugging (files are visible)

### 3. Batch Processing

**Scheduled Processing**:
- Cron jobs drop messages into queue folders
- Services process batches when ready
- Results accumulated in output folders

## Advantages

### 1. Simplicity
- File-based queuing is conceptually simple
- Easy to monitor, debug, and troubleshoot
- No additional queue infrastructure required

### 2. Reliability
- File system provides natural persistence
- Atomic file operations ensure message integrity
- Easy recovery from service failures

### 3. Flexibility
- Services can be stopped/started independently
- Queue folders can be shared across machines
- Easy to implement backups and archiving

### 4. Observability
- Queue depth visible via file counts
- Message contents can be inspected directly
- Processing history maintained in folder structure

## Implementation Considerations

### Performance
- File system performance limits throughput
- Consider SSD storage for queue folders
- Batch processing for high-volume scenarios

### Scalability
- Horizontal scaling via folder partitioning
- Multiple service instances can process different partitions
- Network-attached storage for distributed processing

### Security
- File system permissions control access
- AVRO schema validation provides message integrity
- Audit trails via file system logs

## Future Enhancements

### 1. Management Interface
- Web UI for queue monitoring
- Service health dashboards
- Message replay capabilities

### 2. Advanced Features
- Message priority queues (subfolders)
- Scheduled processing windows
- Dynamic schema evolution support

### 3. Integration Patterns
- Hybrid queue-folder + RPC services
- Stream processing integration
- Event sourcing patterns

## Work Planning Integration

### Next Steps
1. **Prototype Implementation** - Build basic queue-folder service framework
2. **Schema Integration** - Connect with existing AVRO schema definitions
3. **Container Support** - Design container-based queue-folder services
4. **Performance Testing** - Validate throughput and reliability characteristics

### GitHub Issues
- Create implementation issue for queue-folder service framework
- Link to existing AVRO epic (#30)
- Coordinate with container unified entity strategy

### Documentation Updates
- Update main AVRO communication document with queue-folder patterns
- Add to phase-based development strategy
- Include in project automation workflows

---

*This design provides a foundation for implementing pipe-like AVRO services using file system queues, enabling flexible and reliable message processing workflows within the SPlectrum architecture.*