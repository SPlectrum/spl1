[← Home](../README.md)

# AVRO Service Definitions for SPlectrum Communication

**Related GitHub Issue**: [#30 - AVRO: Implement Service Definitions for Unified Local/Internode Communication](https://github.com/SPlectrum/spl1/issues/30)

## Executive Summary

This document outlines the architectural vision for implementing Apache AVRO service definitions as the unified communication layer for SPlectrum, enabling seamless local and internode communication through type-safe, schema-driven service contracts. This approach provides a foundation for distributed SPlectrum deployments while maintaining the platform's modular principles.

## Current State Analysis

### Existing Communication Patterns

SPlectrum currently employs direct function calls and URI-based module addressing:

```javascript
// Current local module execution
const result = await spl.execute('spl/data/write', input);

// Current pipeline execution
await spl.execute('spl/execute/next', {
  headers: { spl: { execute: context } },
  value: pipelineData
});
```

### Current Limitations

No type safety, undocumented interfaces, no distributed scaling, manual service discovery, inconsistent error handling, limited to JavaScript serialization.

## AVRO Service Definitions Vision

### Unified Communication Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                    AVRO SERVICE LAYER                               │
├─────────────────────────────────────────────────────────────────────┤
│  Local Communication     │  Internode Communication                 │
│  ┌─────────────────────┐ │  ┌─────────────────────────────────────┐ │
│  │ In-process calls    │ │  │ Network RPC                         │ │
│  │ Binary serialization│ │  │ Load balancing                      │ │
│  │ Memory optimization │ │  │ Service discovery                   │ │
│  └─────────────────────┘ │  └─────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│                   AVRO SERVICE CONTRACTS                            │
│  • Type-safe method signatures                                      │
│  • Schema evolution support                                         │
│  • Multi-language client generation                                 │
│  • Self-documenting interfaces                                      │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
              ┌─────────────────────────────────────┐
              │       SPLECTRUM MODULES             │
              │   spl/*, tools/*, apps/*            │
              └─────────────────────────────────────┘
```

## Service Definition Architecture

### Core Service Protocols

#### 1. **SPL Execution Service**
```avro
protocol SPLExecuteService {
  // Core execution request/response
  record ExecuteRequest {
    string module;                    // "spl/data/write"
    map<string> headers;              // Execution context
    union { null, bytes, string, record } value;  // Payload
    union { null, string } schema;    // Optional schema reference
  }
  
  record ExecuteResponse {
    string status;                    // "data", "blob", "error", "completed"
    map<string> headers;              // Updated context
    union { null, bytes, string, record } value;  // Result payload
    union { null, string } errorMessage;
  }
  
  // Core execution method
  ExecuteResponse execute(ExecuteRequest request) throws ExecutionError;
  
  // Module introspection
  array<string> listAvailableModules();
  string getModuleSchema(string module);
}
```

#### 2. **SPL Data Service**
```avro
protocol SPLDataService {
  record DataWriteRequest {
    string topic;
    string primaryKey;
    record data;
    union { null, string } schema;
  }
  
  record DataReadRequest {
    string topic;
    union { null, string } primaryKey;
    union { null, long } limit;
    union { null, long } offset;
  }
  
  record DataResponse {
    array<record> records;
    long totalCount;
    union { null, string } nextOffset;
  }
  
  void write(DataWriteRequest request) throws DataWriteError;
  DataResponse read(DataReadRequest request) throws DataReadError;
  array<string> listTopics();
}
```

#### 3. **SPL Pipeline Service**
```avro
protocol SPLPipelineService {
  record PipelineStage {
    string module;
    map<string> configuration;
    union { null, string } inputSchema;
    union { null, string } outputSchema;
  }
  
  record PipelineDefinition {
    string name;
    array<PipelineStage> stages;
    map<string> globalConfig;
  }
  
  record PipelineExecutionRequest {
    union { string, PipelineDefinition } pipeline;  // Name or inline definition
    record input;
    map<string> context;
  }
  
  ExecuteResponse executePipeline(PipelineExecutionRequest request);
  void registerPipeline(PipelineDefinition pipeline);
  array<string> listPipelines();
}
```

### Distributed Communication Protocols

#### 1. **Internode Service Discovery**
```avro
protocol SPLNodeService {
  record NodeInfo {
    string nodeId;
    string endpoint;
    array<string> availableModules;
    map<string> capabilities;
    long lastHeartbeat;
  }
  
  record DistributedExecuteRequest {
    union { null, string } targetNode;  // null for auto-routing
    ExecuteRequest request;
    union { null, int } timeout;
  }
  
  ExecuteResponse executeRemote(DistributedExecuteRequest request);
  array<NodeInfo> listNodes();
  void registerNode(NodeInfo node);
  void heartbeat(string nodeId);
}
```

#### 2. **Container Service Integration**
```avro
protocol SPLContainerService {
  record ContainerExecuteRequest {
    string image;                     // "registry.splectrum.io/spl/ml:v1.0.0"
    ExecuteRequest request;
    union { null, map<string> } environment;
    union { null, array<string> } volumes;
  }
  
  record ContainerInfo {
    string containerId;
    string image;
    string status;
    array<string> exposedServices;
  }
  
  ExecuteResponse executeContainer(ContainerExecuteRequest request);
  array<ContainerInfo> listContainers();
  void startContainer(string image, map<string> config);
  void stopContainer(string containerId);
}
```

## Implementation Strategy

### Phase 1: Core AVRO Infrastructure

#### 1.1 Service Definition Framework
```
modules/spl/avro/
├── service-registry.js          # Service definition management
├── local-transport.js           # In-process communication
├── schema-validator.js          # Request/response validation
├── service-proxy.js             # Client-side service proxies
└── definitions/
    ├── spl-execute.avsc         # Core execution service
    ├── spl-data.avsc            # Data layer service
    ├── spl-pipeline.avsc        # Pipeline execution service
    └── spl-container.avsc       # Container integration service
```

#### 1.2 Backward Compatibility Layer
```javascript
// Legacy URI-based calls still work
const legacyResult = await spl.execute('spl/data/write', input);

// New AVRO service calls
const dataService = spl.avro.getService('SPLDataService');
const avroResult = await dataService.write({
  topic: 'users',
  primaryKey: 'user123',
  data: userData,
  schema: 'UserSchema'
});
```

### Phase 2: Local Service Implementation

#### 2.1 Service Registration
```javascript
// Automatic service registration during module loading
spl.avro.registerService('SPLDataService', {
  implementation: require('./modules/spl/data'),
  definition: require('./modules/spl/avro/definitions/spl-data.avsc')
});
```

#### 2.2 Type-Safe Client Generation
```javascript
// Generate typed service clients
const clients = spl.avro.generateClients([
  'SPLExecuteService',
  'SPLDataService', 
  'SPLPipelineService'
]);

// Type-safe method calls with IntelliSense support
const result = await clients.data.write({
  topic: 'events',        // Type: string (required)
  primaryKey: 'evt001',   // Type: string (required)
  data: eventData,        // Type: record (required)
  schema: 'EventSchema'   // Type: string (optional)
});
```

### Phase 3: Distributed Communication

#### 3.1 Network Transport Layer
```javascript
// HTTP/TCP transport for internode communication
const distributedService = spl.avro.getDistributedService('SPLExecuteService', {
  transport: 'http',
  endpoint: 'http://node-02:8080/spl-avro'
});

// Transparent remote execution
const remoteResult = await distributedService.execute({
  module: 'spl/ml/analyze',
  value: mlData
});
```

#### 3.2 Service Discovery Integration
```javascript
// Automatic node discovery and load balancing
spl.avro.configureCluster({
  discoveryMethod: 'consul',  // or 'etcd', 'kubernetes'
  endpoints: ['consul:8500'],
  loadBalancing: 'round-robin'
});
```

### Phase 4: Container Integration

#### 4.1 Container Service Definitions
```dockerfile
# Container with embedded AVRO service definitions
FROM splectrum/base:latest
COPY service-definitions/ /spl/avro/definitions/
COPY modules/ /spl/modules/
LABEL spl.avro.services="SPLDataService,SPLExecuteService"
EXPOSE 8080/tcp
```

#### 4.2 Dynamic Container Services
```javascript
// Execute services in containers with AVRO contracts
const containerResult = await spl.container.executeService({
  image: 'registry.splectrum.io/spl/gpu-compute:v2.1.0',
  service: 'SPLGPUService',
  method: 'trainModel',
  request: trainingData
});
```

## Benefits Realization

### Benefits

- **Type Safety**: Compile-time validation, self-documenting APIs, IDE support
- **Performance**: Binary serialization, efficient protocols, schema-aware caching
- **Operations**: Structured monitoring, validated logging, contract-based testing
- **Platform Evolution**: Microservices foundation, multi-language support, cloud-native integration

## Integration with SPlectrum Architecture

### Module System Enhancement
```javascript
// Enhanced module loading with AVRO contracts
const executeModule = await spl.loadModule('spl/execute', {
  contractValidation: true,
  serviceDefinition: 'SPLExecuteService'
});
```

### Pipeline Type Safety
```javascript
// Type-safe pipeline definitions
const analyticsPipeline = spl.pipeline.define({
  name: 'user-analytics',
  stages: [
    { module: 'spl/data/read', outputSchema: 'UserData' },
    { module: 'spl/ml/analyze', inputSchema: 'UserData', outputSchema: 'Analytics' },
    { module: 'spl/data/write', inputSchema: 'Analytics' }
  ]
});
```

### Container Unified Entity Synergy
- AVRO service definitions embedded in container metadata
- Container registry includes service contract information
- Dynamic service discovery across container instances

## Migration Strategy

### Migration Phases

**A**: Core infrastructure and SPL contracts (post-BARE)
**B**: Module conversion with parallel operation
**C**: Distributed protocols and container integration  
**D**: Complete migration with advanced features

### Risk Mitigation

Address complexity through documentation/training, validate performance via benchmarking, maintain backward compatibility during transition.

## Success Metrics

**Technical**: Reduced interface errors, improved performance, distributed scalability, faster development
**Operational**: Higher reliability, better observability, simplified integration, multi-language flexibility

## Conclusion

AVRO service definitions represent a transformative approach to SPlectrum communication, providing:

- **Unified Protocol**: Consistent local and distributed communication
- **Type Safety**: Compile-time validation and documentation
- **Performance**: Optimized binary serialization and network protocols
- **Scalability**: Foundation for distributed SPlectrum deployments
- **Integration**: Perfect alignment with container unified entity strategy

This architectural evolution positions SPlectrum for modern distributed computing scenarios while maintaining its core modular principles and developer-friendly approach.

## Next Steps

1. **Define Core Service Contracts**: Create AVRO definitions for essential SPL modules
2. **Implement Local Transport**: Build in-process AVRO communication layer
3. **Develop Service Registry**: Create service discovery and registration system
4. **Create Client Generators**: Build tooling for type-safe service clients
5. **Prototype Distributed Communication**: Implement internode AVRO protocols
6. **Container Integration**: Embed AVRO service definitions in container metadata

---

*This document establishes the foundation for SPlectrum's evolution toward a type-safe, distributed, service-oriented architecture through AVRO service definitions.*