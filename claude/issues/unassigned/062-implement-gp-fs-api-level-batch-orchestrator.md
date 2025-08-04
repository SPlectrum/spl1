---
type: feature
github_id: null
title: "Implement gp/fs API-level batch orchestrator with dynamic pipeline generation"
short_summary: "API dispatcher that creates dynamic pipelines for mixed filesystem operations in single execution"
state: open
milestone: unassigned
labels: [feature, enhancement]
priority: high
estimated_effort: TBD
github_updated_at: null
local_updated_at: "2025-08-04T21:05:00.000Z"
---

# Implement gp/fs API-level batch orchestrator with dynamic pipeline generation

## Problem Statement

Currently, gp/fs API requires separate method calls for each operation (read, write, list, exists). While individual methods support bulk operations within their type, there's no way to execute mixed filesystem operations in a single API call. This limits efficiency and requires complex piped command sequences for multi-operation workflows.

## Required Work

Implement sophisticated API-level batch orchestration at `gp/fs` entry point that accepts complex operation specifications and dynamically generates internal command pipelines.

## Proposed API Structure

### **API Entry Point**: `gp/fs/index.js`
- Accepts batch operation specifications
- Parses and validates operation requests
- Creates dynamic internal pipelines
- Orchestrates method execution
- Aggregates results in single workspace

### **Batch Operation Format**
```javascript
{
  "batch": [
    {
      "method": "read", 
      "files": ["test.txt", "config.json"],
      "encoding": "utf8"
    },
    {
      "method": "write", 
      "operations": [
        {"file": "output1.txt", "content": "data1"},
        {"file": "output2.txt", "source": "gp/fs.data.test_txt"}
      ]
    },
    {
      "method": "list", 
      "paths": [".", "subdirectory"],
      "stats": true
    },
    {
      "method": "exists", 
      "paths": ["file1.txt", "file2.txt", "nonexistent.txt"]
    }
  ],
  "options": {
    "transaction": true,
    "errorHandling": "fail-fast" | "continue",
    "workspace": "gp/fs"
  }
}
```

### **Command Line Interface**
```bash
# Single method bulk operation
./spl_execute dev gp/fs --batch='{"method":"read","files":["test.txt","config.json"]}'

# Mixed operations
./spl_execute dev gp/fs --operations='[
  {"method": "read", "file": "test.txt"},
  {"method": "write", "file": "output.txt", "content": "processed data"},
  {"method": "list", "path": "."}
]'

# Complex workflow
./spl_execute dev gp/fs --batch='@batch-config.json'
```

## Implementation Plan

### **1. API Entry Point** (`gp/fs/index.js`)
```javascript
exports.default = function gp_fs_api(input) {
    // Parse batch specifications
    const batchSpec = spl.action(input);
    
    // Validate batch structure
    // Generate dynamic pipeline
    // Execute methods internally
    // Aggregate results
    // Handle errors appropriately
}
```

### **2. Dynamic Pipeline Generation**
- **Parse batch specifications** into individual method calls
- **Create internal execution pipeline** using SPL patterns
- **Handle dependencies** between operations (e.g., write using read results)
- **Manage workspace references** between operations

### **3. Internal Method Orchestration**
- **Programmatic method invocation** via `spl.moduleAction(input, "gp/fs/read")`
- **Parameter injection** for each method call
- **Result collection** from workspace after each method
- **Error propagation** and transaction handling

### **4. Advanced Features**
- **Workspace references**: Use results from one operation as input to another
- **Conditional operations**: Execute based on previous results
- **Transaction support**: All-or-nothing execution
- **Parallel vs sequential**: Optimize execution order

## Technical Considerations

### **Pipeline Generation**
- Dynamic SPL pipeline creation following `spl/execute/set-pipeline` patterns
- Internal method calls without external command overhead
- Proper workspace state management between operations

### **Error Handling**
- **Fail-fast**: Stop on first error, rollback if transaction mode
- **Continue**: Execute all operations, collect errors
- **Partial success**: Clear indication of what succeeded/failed

### **Performance**
- Single workspace update at the end vs incremental updates
- Batch operation optimization within methods
- Memory management for large batch operations

### **Backward Compatibility**
- Existing individual methods remain unchanged
- API-level orchestrator is additive enhancement
- Clear migration path for complex workflows

## Example Workflows

### **File Processing Pipeline**
```javascript
{
  "batch": [
    {"method": "read", "files": ["input1.txt", "input2.txt"]},
    {"method": "write", "file": "combined.txt", "source": "combine(gp/fs.data.input1_txt, gp/fs.data.input2_txt)"},
    {"method": "list", "path": ".", "validate": ["combined.txt"]}
  ]
}
```

### **Directory Analysis**
```javascript
{
  "batch": [
    {"method": "list", "path": "."},
    {"method": "exists", "paths": "extract_filenames(gp/fs.list.root)"},
    {"method": "read", "files": "filter_text_files(gp/fs.exists.*)"}
  ]
}
```

## Acceptance Criteria

- [ ] **API Entry Point**: `gp/fs/index.js` accepts batch specifications
- [ ] **Dynamic Pipeline**: Generates internal command pipelines
- [ ] **Mixed Operations**: Supports read, write, list, exists in single call
- [ ] **Bulk Operations**: Each method supports bulk processing within batch
- [ ] **Workspace Integration**: All results aggregated in `gp/fs` workspace
- [ ] **Error Handling**: Configurable fail-fast vs continue modes
- [ ] **Performance**: Efficient execution without external command overhead
- [ ] **Documentation**: Clear API specification and examples
- [ ] **Backward Compatibility**: Existing methods unchanged
- [ ] **Command Line**: Intuitive CLI interface for batch operations

## Relationship to Core System

- **Extends**: Current gp/fs individual methods (read, write, list, exists)
- **Enhances**: Workflow efficiency for complex filesystem operations
- **Demonstrates**: Advanced SPL API orchestration patterns
- **Enables**: Single-call complex filesystem workflows

## Implementation Notes

This feature transforms gp/fs from a collection of individual methods into a sophisticated filesystem orchestrator, demonstrating advanced SPL API patterns that could be applied to other APIs (gp/analyze, gp/search, etc.).

## Progress Log
- 2025-08-04: Issue created, implementation planned for next session