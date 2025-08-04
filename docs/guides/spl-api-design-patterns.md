# SPL API Design Patterns

Comprehensive guide to designing SPL APIs following the universal Kafka record schema and layered configuration patterns, derived from collaborative AI development of the gp/fs API.

## Universal API Architecture

### Kafka Record Pattern

All SPL APIs follow the universal Kafka record structure:

```javascript
{
  // API-segregated metadata (like Kafka headers)
  headers: {
    [namespace]: {
      [api]: {
        // API-level properties that persist across method pipeline
        // Core data structure metadata
      }
    }
  },
  
  // Pure data payload (like Kafka value)
  value: // Actual content/data
}
```

### API-Centric Data Structure Design

**Core Principle**: All methods within an API operate on the same underlying data structure.

**Example - gp/fs File/Folder Record:**
```javascript
{
  headers: {
    gp: {
      fs: {
        // Unified file/folder record that ALL fs methods work with
        file: "path/to/file",
        type: "file|directory",
        encoding: "utf8",           // File's actual encoding
        valueEncoding: "utf8",      // How value is encoded in record
        size: 1234,
        timestamp: Date.now(),
        created: fileStats.birthtime,
        modified: fileStats.mtime,
        accessed: fileStats.atime
      }
    }
  },
  value: fileContent  // Pure file content or directory listing
}
```

## Layered Configuration System

### Configuration Resolution Hierarchy

SPL's `spl_config` function provides sophisticated layered property resolution:

1. **Method-specific in execution headers**: `headers.[namespace].[api].[method].{key}`
2. **Method-specific in workspace**: `workspace["namespace/api/method"].headers.[namespace].[api].[method].{key}`
3. **Method-specific in API workspace**: `workspace["namespace/api"].headers.[namespace].[api].[method].{key}`
4. **API-level in execution headers**: `headers.[namespace].[api].{key}` (fallback default)
5. **API-level in workspace**: `workspace["namespace/api"].headers.[namespace].[api].{key}` (ultimate fallback)

### Argument Flow Pattern

**API-Level Arguments (Persist Across Pipeline):**
- Set once, inherited by all methods
- Define core data structure properties
- Maintain context through method chains

**Method-Specific Arguments (Override/Extend):**
- Add method-specific parameters
- Override API defaults when needed
- Focus on method's specialized concerns

**Example Pipeline:**
```bash
# API-level context persists throughout pipeline
spl_execute dev gp/fs/read --file=source.txt --encoding=utf8
| gp/fs/copy --to=backup.txt    # Inherits file & encoding
| gp/fs/move --to=archive/      # Inherits from copy result
```

**Configuration Inheritance:**
```javascript
// Initial API-level arguments
headers.gp.fs.file = "source.txt"
headers.gp.fs.encoding = "utf8"

// Method-specific additions
headers.gp.fs.copy.to = "backup.txt"
headers.gp.fs.move.to = "archive/"

// spl_config resolves with proper precedence
```

## Advanced API Design Examples

### Analysis API (gp/analyze)

**API Data Structure**: Code analysis record
```javascript
{
  headers: {
    gp: {
      analyze: {
        project: "myapp",
        depth: 3,
        format: "json",
        scope: "src/",
        // Analysis metadata
      }
    }
  },
  value: {
    // Structured analysis results
    structure: {...},
    dependencies: {...},
    patterns: {...}
  }
}
```

**Pipeline Context:**
```bash
spl_execute dev gp/analyze --project=myapp --depth=3 --format=json
| analyze/structure              # Inherits project context
| analyze/dependencies           # Same analysis scope
| analyze/patterns --style=mvc   # Adds pattern-specific rules
```

### Search API (gp/search)

**API Data Structure**: Search context and results
```javascript
{
  headers: {
    gp: {
      search: {
        scope: "src/",
        caseInsensitive: true,
        context: 5,
        // Search configuration
      }
    }
  },
  value: {
    // Search results with rankings
    matches: [...],
    suggestions: [...]
  }
}
```

### Validation API (gp/validate)

**API Data Structure**: Validation context and results
```javascript
{
  headers: {
    gp: {
      validate: {
        rules: "strict",
        fixSuggestions: true,
        reportLevel: "warning",
        // Validation configuration
      }
    }
  },
  value: {
    // Validation results
    errors: [...],
    warnings: [...],
    suggestions: [...]
  }
}
```

## AVRO Schema Integration (Future)

**Schema Definition Strategy**:
- **API-level schemas**: Define core data structure for each API
- **Method-level schemas**: Define method-specific input/output extensions
- **Layered validation**: AVRO schemas enforce configuration inheritance rules
- **Pipeline compatibility**: Ensure method outputs are compatible with downstream inputs

**Example AVRO Schema Structure:**
```avro
// API-level schema
{
  "type": "record",
  "name": "FileRecord",
  "namespace": "gp.fs",
  "fields": [
    {"name": "file", "type": "string"},
    {"name": "encoding", "type": "string", "default": "utf8"},
    {"name": "valueEncoding", "type": "string", "default": "utf8"},
    {"name": "size", "type": "long"},
    // ... other file metadata
  ]
}

// Method-specific schema extension  
{
  "type": "record", 
  "name": "ReadMethodInput",
  "namespace": "gp.fs.read",
  "fields": [
    // Inherits FileRecord
    // Method-specific additions
  ]
}
```

## Implementation Guidelines

### API Structure Requirements
1. **Auxiliary Library**: `[api].js` with pure business logic functions
2. **Method Implementations**: `[method]/index.js` with SPL integration
3. **Argument Definitions**: `[method]/index_arguments.json` for help and parsing
4. **Consistent Namespace**: All metadata under `headers.[namespace].[api]`

### Data Flow Pattern
1. **Input**: Method arguments → `headers.[namespace].[api].[method]`
2. **Processing**: Business logic operates on API data structure
3. **Output**: Results → `headers.[namespace].[api]` + `value`
4. **Pipeline**: Next method inherits API-level context

### Context Persistence Rules
- **API-level properties**: Persist across method pipeline
- **Method results**: Update API-level properties for next method
- **Method-specific properties**: Scoped to individual method calls
- **Configuration resolution**: Automatic via `spl_config` hierarchy

## Benefits of This Pattern

### For AI Agents
- **Predictable Structure**: Consistent record format across all APIs
- **Rich Context**: Complete metadata available at every level  
- **Pipeline Intelligence**: Context flows naturally through method chains
- **Composable Operations**: Methods can be chained with maintained context

### For Development
- **Reduced Repetition**: Set complex configuration once at API level
- **Method Specialization**: Each method focuses on domain-specific logic
- **Pipeline Workflows**: Natural composition of related operations
- **Schema Evolution**: AVRO enables safe schema changes and validation

### For System Architecture
- **Universal Pattern**: Same design works for all API types
- **Kafka Compatibility**: Direct integration with event streaming
- **Audit Trail**: Complete traceability through execution pipeline  
- **Recursive Structure**: Pattern applies at all system levels

---

*This pattern was developed through collaborative AI implementation of the gp/fs API and represents the foundation for all future SPL API development.*