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

Currently, gp/fs API requires separate method calls for each operation (read, write, list, exists). There's no way to execute mixed filesystem operations in a single API call, which limits efficiency and requires complex piped command sequences for multi-operation workflows.

## ✅ DECIDED IMPLEMENTATION APPROACH

**Architecture Decision**: Use **SPL Pipeline Pattern** (following `spl/app/process` model) rather than per-method batch arrays (like `spl/blob`).

### **Key Principles**:
1. **Identical execution path**: Each method executes exactly as if called directly
2. **User-specified order**: Pipeline preserves exact sequence from batch request
3. **Clean separation**: Batch orchestration separate from individual method logic
4. **Generic pattern**: Implementation will become reusable template for other gp/* APIs

## Required Work

Implement API-level batch orchestrator at `gp/fs/index.js` that dynamically generates SPL execution pipelines from user-specified operation sequences.

## API Structure & Implementation

### **Unified Pipeline-Based Batch Format**
```javascript
[
  // Set API-level defaults that persist for subsequent methods
  {
    "method": "API",
    "params": {
      "encoding": "utf8",        // All file operations use utf8 unless overridden
      "stats": true,             // All list operations include stats
      "errorMode": "continue"    // Pipeline continues on method errors
    }
  },
  
  // Regular method operations - inherit API defaults
  {
    "method": "read", 
    "params": {"file": "test.txt"}  // inherits encoding: utf8
  },
  {
    "method": "write", 
    "params": {"file": "output.txt", "content": "processed data", "encoding": "ascii"}  // overrides API default
  },
  
  // Update API defaults mid-pipeline
  {
    "method": "API",
    "params": {"stats": false}  // Disable stats for remaining operations
  },
  
  {
    "method": "list", 
    "params": {"path": "."}  // inherits stats: false (updated)
  }
]
```

**Benefits of unified approach**:
- **Single structure**: Everything is a pipeline operation
- **Dynamic updates**: Change API defaults mid-pipeline
- **Order matters**: API settings apply to subsequent methods
- **Consistent syntax**: Same `{"method": "X", "params": {...}}` pattern

### **API Entry Point Implementation**: `gp/fs/index.js`
```javascript
exports.default = function gp_fs_batch(input) {
    const batchRequests = spl.action(input);
    
    // Generate dynamic pipeline from user-specified order
    const pipeline = batchRequests.map((request, index) => {
        if (request.method === "API") {
            // API configuration step - set API-level defaults
            return {
                action: "gp/fs/set-api-config",
                "gp/fs/set-api-config": request.params,
                batchIndex: index
            };
        } else {
            // Regular method step
            return {
                action: `gp/fs/${request.method}`,
                [`gp/fs/${request.method}`]: request.params,
                batchIndex: index
            };
        }
    });
    
    // Set SPL pipeline for execution
    spl.wsSet(input, "spl/execute.set-pipeline", {
        headers: { spl: { execute: { pipeline } } },
        value: {}
    });
    
    spl.gotoExecute(input, "spl/execute/set-pipeline");
}
```

### **API Configuration Method**: `gp/fs/set-api-config/index.js`
```javascript
exports.default = function gp_fs_set_api_config(input) {
    const params = spl.action(input);
    
    // Set each parameter as API-level default
    Object.keys(params).forEach(key => {
        spl.setConfig(input, "gp/fs", key, params[key]);
    });
    
    spl.history(input, `API config updated: ${Object.keys(params).join(', ')}`);
    spl.completed(input);
}
```

### **Command Line Interface**
```bash
# Simple batch without API defaults
./spl_execute dev gp/fs --batch='[
  {"method": "read", "params": {"file": "test.txt"}},
  {"method": "write", "params": {"file": "output.txt", "content": "processed"}},
  {"method": "list", "params": {"path": "."}}
]'

# Batch with API-level configuration
./spl_execute dev gp/fs --batch='[
  {"method": "API", "params": {"encoding": "utf8", "stats": true}},
  {"method": "read", "params": {"file": "test.txt"}},
  {"method": "list", "params": {"path": "."}}
]'

# Dynamic API updates mid-pipeline
./spl_execute dev gp/fs --batch='[
  {"method": "API", "params": {"encoding": "utf8"}},
  {"method": "read", "params": {"file": "input.txt"}},
  {"method": "API", "params": {"encoding": "ascii"}},
  {"method": "write", "params": {"file": "output.txt", "content": "data"}}
]'

# Load from file
./spl_execute dev gp/fs --batch='@complex-workflow.json'
```

## Implementation Plan

### **Phase 1: Core Pipeline Orchestrator**
1. **Create `gp/fs/index.js`** with unified pipeline generation logic
2. **Create `gp/fs/set-api-config/index.js`** for API-level parameter management
3. **Test with existing methods** (read, write, list) to validate approach
4. **Test API parameter inheritance** through pipeline execution
5. **Verify identical execution paths** for direct vs batch method calls

### **Phase 2: Enhanced Features**
1. **Error handling modes**: fail-fast vs continue options
2. **Workspace references**: Cross-method data sharing within batch
3. **Validation**: Batch request structure and method existence checks
4. **CLI improvements**: File-based batch loading, better error reporting

### **Phase 3: Generic Pattern Development**
1. **Extract reusable components** for other gp/* APIs
2. **Create batch orchestrator template** for consistent API patterns
3. **Documentation**: Implementation guide for future APIs
4. **Testing framework**: Comprehensive batch operation validation

### **🎯 Key Benefits of Enhanced Pipeline Approach**
- **Identical execution**: Methods behave identically in batch vs direct calls
- **Order preservation**: User-specified sequence maintained exactly
- **API-level inheritance**: Defaults set once, inherited by all pipeline methods
- **Parameter layering**: SPL config system provides method > API > default hierarchy
- **Clean architecture**: No per-method batch code duplication
- **SPL native**: Leverages built-in pipeline execution and configuration infrastructure
- **Generic pattern**: Template for all future gp/* API batch capabilities

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
[
  {"method": "read", "params": {"file": "input1.txt"}},
  {"method": "read", "params": {"file": "input2.txt"}},
  {"method": "write", "params": {"file": "combined.txt", "content": "processed data"}},
  {"method": "list", "params": {"path": ".", "stats": true}}
]
```

### **Directory Analysis Workflow**
```javascript
[
  {"method": "list", "params": {"path": "."}},
  {"method": "read", "params": {"file": "config.json"}},
  {"method": "write", "params": {"file": "analysis.txt", "content": "directory report"}}
]
```

### **Testing with Current Implementation**
```bash
# Test with currently implemented methods (read, write, list)
./spl_execute dev gp/fs --batch='[
  {"method": "read", "params": {"file": "test.txt"}},
  {"method": "list", "params": {"path": "."}},
  {"method": "write", "params": {"file": "output.txt", "content": "batch test"}}
]'
```

## Acceptance Criteria

### **Phase 1: Core Implementation**
- [ ] **Pipeline Orchestrator**: `gp/fs/index.js` generates SPL pipelines from batch requests
- [ ] **Identical Execution**: Methods execute identically in batch vs direct calls
- [ ] **Order Preservation**: Pipeline maintains exact user-specified sequence
- [ ] **Workspace Integration**: All results properly aggregated in `gp/fs` workspace
- [ ] **Current Methods**: Works with implemented methods (read, write, list)

### **Phase 2: Enhanced Features**
- [ ] **Error Handling**: Basic error collection and reporting
- [ ] **CLI Interface**: Clean command-line batch operation support
- [ ] **Validation**: Batch request structure and method existence checking
- [ ] **Documentation**: Implementation patterns and usage examples

### **Phase 3: Generic Pattern**
- [ ] **Reusable Components**: Extracted for other gp/* APIs
- [ ] **Template Documentation**: Guide for implementing similar batch orchestrators
- [ ] **Testing Framework**: Comprehensive validation for batch operations
- [ ] **Backward Compatibility**: Existing individual methods unchanged

## Relationship to Core System

- **Extends**: Current gp/fs individual methods (read, write, list, exists)
- **Enhances**: Workflow efficiency for complex filesystem operations
- **Demonstrates**: Advanced SPL API orchestration patterns
- **Enables**: Single-call complex filesystem workflows

## Implementation Notes

This feature transforms gp/fs from a collection of individual methods into a sophisticated filesystem orchestrator, demonstrating advanced SPL API patterns that could be applied to other APIs (gp/analyze, gp/search, etc.).

## Progress Log
- 2025-08-05: **Architecture Decision Made** - Confirmed SPL pipeline pattern over per-method batch arrays. Implementation approach defined with 3-phase plan and generic pattern development for future gp/* APIs.
- 2025-08-04: Issue created, implementation planned for next session