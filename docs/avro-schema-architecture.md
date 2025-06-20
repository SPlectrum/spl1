# AVRO Schema Architecture for spl1

## Overview

This document defines the AVRO schema integration architecture for spl1, building on the research completed in issue #20. The architecture supports the two-block implementation strategy while maintaining compatibility with existing argument schemas and help systems.

## Design Principles

### 1. Dual Schema Approach
- **Functional Schemas**: `.avsc` files for runtime validation and tooling
- **Data Schemas**: Internal data structure representation for manipulation
- **Separation of Concerns**: Functional forms in `modules/`, data forms in data layer

### 2. API-Level Schema Organization  
- Schemas stored at API level (e.g., `spl/blob`, `spl/data`) since APIs operate on same data structure
- Method-level schema refinements for specific property subsets
- Hierarchical schema inheritance: Package → API → Method

### 3. Backward Compatibility
- Existing `*_arguments.json` files remain as source of truth during transition
- AVRO schemas generated from existing JSON schemas programmatically
- Help system integration maintained through schema metadata

## Schema Design Patterns

### 1. Base Argument Schema Pattern

```avro
{
  "type": "record",
  "name": "BaseArgumentSchema", 
  "namespace": "spl.schema",
  "fields": [
    {
      "name": "headers",
      "type": {
        "type": "record",
        "name": "HeaderInfo",
        "fields": [
          {
            "name": "header",
            "type": {
              "type": "array",
              "items": {
                "type": "record", 
                "name": "HeaderItem",
                "fields": [
                  {"name": "header", "type": ["null", "string"], "default": null},
                  {"name": "content", "type": ["null", "string"], "default": null}
                ]
              }
            }
          }
        ]
      }
    },
    {
      "name": "value", 
      "type": {
        "type": "array",
        "items": {
          "type": "record",
          "name": "ArgumentDefinition", 
          "fields": [
            {"name": "name", "type": "string"},
            {"name": "alias", "type": ["null", "string"], "default": null},
            {"name": "type", "type": ["null", "string"], "default": null}, 
            {"name": "description", "type": ["null", "string"], "default": null},
            {"name": "multiple", "type": ["null", "boolean"], "default": null},
            {"name": "typeLabel", "type": ["null", "string"], "default": null}
          ]
        }
      }
    }
  ]
}
```

### 2. API-Specific Schema Extensions

Each API extends the base pattern with API-specific argument types:

```avro
// spl/blob API schema
{
  "type": "record",
  "name": "BlobArgumentSchema",
  "namespace": "spl.blob.schema", 
  "fields": [
    // Inherits BaseArgumentSchema structure
    // Adds blob-specific validation rules
    {
      "name": "pathArguments",
      "type": {
        "type": "record", 
        "name": "PathArguments",
        "fields": [
          {"name": "repo", "type": ["null", "string"]},
          {"name": "dir", "type": ["null", "string"]}, 
          {"name": "file", "type": ["null", "string"]},
          {"name": "path", "type": ["null", {"type": "array", "items": "string"}]},
          {"name": "uri", "type": ["null", "string"]}
        ]
      }
    }
  ]
}
```

### 3. Method-Level Schema Specialization

Individual methods can specify which argument subsets they use:

```avro
// spl/blob/get method schema  
{
  "type": "record",
  "name": "BlobGetArguments",
  "namespace": "spl.blob.get.schema",
  "fields": [
    // References parent API schema
    // Specifies required vs optional arguments for this method
    {"name": "requiredArgs", "type": {"type": "array", "items": "string"}},
    {"name": "optionalArgs", "type": {"type": "array", "items": "string"}}
  ]
}
```

## Integration with Unified Data API

### 1. Schema Evolution Strategy
- **Phase 1**: Generate AVRO schemas from existing JSON schemas
- **Phase 2**: Enhance unified data API with AVRO validation
- **Phase 3**: Migrate help system to use AVRO schema metadata

### 2. Data Layer Integration Points

```javascript
// Unified data API with AVRO validation
const dataAPI = {
  // Schema validation at data layer entry points
  validateRecord: (data, schemaName) => { /* AVRO validation */ },
  
  // Schema-aware data operations  
  read: (uri, options = {}) => {
    const schema = getAPISchema(uri);
    const validatedOptions = validateRecord(options, schema);
    return performRead(uri, validatedOptions);
  },
  
  // Schema metadata for help system
  getArgumentSchema: (apiPath) => { /* return AVRO schema */ },
  generateHelp: (apiPath) => { /* generate from AVRO metadata */ }
};
```

### 3. Schema Storage Organization

```
schemas/
├── avro/                      # Functional AVRO schemas (.avsc)
│   ├── base/
│   │   └── argument-schema.avsc
│   ├── spl/
│   │   ├── app/
│   │   │   ├── app-api.avsc
│   │   │   └── methods/
│   │   │       ├── create.avsc
│   │   │       └── eval.avsc  
│   │   ├── blob/
│   │   │   ├── blob-api.avsc
│   │   │   └── methods/
│   │   │       ├── get.avsc
│   │   │       └── put.avsc
│   │   └── data/
│   │       ├── data-api.avsc
│   │       └── methods/
│   └── tools/
│       └── git/
│           ├── git-api.avsc
│           └── methods/
└── registry/                  # Schema registry data structure
    ├── schema-catalog.json    # Schema discovery and metadata
    └── validation-rules.json  # Cross-schema validation rules
```

## First Implementation Steps

### Step 1: Schema Generation Pipeline
1. **Audit existing argument schemas** (100+ files identified)
2. **Create base AVRO schema template** matching current `headers`/`value` structure  
3. **Build programmatic converter** from JSON → AVRO schema
4. **Generate AVRO schemas** for all existing APIs

### Step 2: Validation Integration
1. **Integrate `avsc` library** into data layer
2. **Create schema registry** for runtime schema loading
3. **Add validation hooks** to unified data API entry points
4. **Maintain backward compatibility** during transition

### Step 3: Enhanced Features  
1. **Schema-aware help generation** from AVRO metadata
2. **Cross-API validation rules** (e.g., path arguments consistency)
3. **Schema versioning support** for API evolution
4. **Documentation auto-generation** from schema definitions

## Benefits

### Development Benefits
- **Type Safety**: Runtime validation of all API arguments
- **Consistency**: Standardized argument patterns across APIs
- **Documentation**: Auto-generated help from schema metadata
- **Tooling**: IDE support and validation tools

### Operational Benefits  
- **Error Prevention**: Invalid arguments caught at data layer
- **Debugging**: Clear validation error messages with schema context
- **Evolution**: Versioned schemas enable backward-compatible API changes
- **Integration**: Standard AVRO tooling for cross-system communication

## Next Steps

1. **Create implementation issues** for each step (following backlog-to-completion workflow)
2. **Start with schema generation pipeline** as foundation
3. **Integrate with existing CAE-1 data layer work** for unified API enhancement
4. **Plan coordination with TDD-1** for validation testing framework

This architecture provides a solid foundation for AVRO integration while maintaining the flexibility and organization principles that make spl1 effective.