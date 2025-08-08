---
type: feature
github_id: 102
title: "Create general-purpose filesystem API with app context integration"
short_summary: "General-purpose filesystem API for installation into apps with automatic context inheritance"
state: open
milestone: v0.8.0
labels: [feature]
priority: high
estimated_effort: TBD
github_updated_at: "2025-08-08T08:29:33Z"
local_updated_at: "2025-08-03T17:59:37.602Z"
---

# Create general-purpose filesystem API with app context integration

## Problem Statement
Create a secure, general-purpose filesystem API that can be installed into any app, automatically inheriting the app's data context as the working directory boundary. This API will be part of a broader general-purpose (gp) API collection designed for collaborative AI development and reusable across multiple apps.

## Implementation Status

### **✅ COMPLETED - Core Implementation (spl-dev/apps/gp/)**
**Architecture**: SPL app with unified file/directory operations and security-first design

**Structure**:
```
spl-dev/apps/gp/
├── modules/fs/
│   ├── fs.js                    # Core security library with validatePath()
│   ├── read/                    # ✅ File reading with encoding support
│   ├── write/                   # ✅ File writing with atomic operations  
│   ├── copy/                    # ✅ File copying with metadata preservation
│   ├── move/                    # ✅ File moving/renaming safely
│   ├── delete/                  # ✅ File deletion with confirmation
│   ├── exists/                  # ✅ File/directory existence checking
│   ├── info/                    # ✅ File/directory metadata (size, dates, permissions)
│   ├── list/                    # ✅ Directory listing with file type detection
│   ├── mkdir/                   # ✅ Directory creation with recursive support
│   └── rmdir/                   # ✅ Directory removal with recursive option
├── data/                        # App working directory boundary
└── [standard SPL app structure]
```

**Key Features Implemented**:
- **Security boundary**: All operations constrained within app data/ boundary via `validatePath()`
- **Unified data structure**: Standardized file records with headers/value pattern
- **SPL integration**: Workspace management, history logging, error handling
- **Binary/text detection**: Automatic encoding selection based on file type
- **Permissions handling**: Read/write/execute permission detection and reporting

### **🔄 PROPOSED ADDITIONS - Search Operations**
**Filesystem search functions (metadata-only, no content parsing)**:

#### **gp/fs/find** - File/Directory Discovery
- Find by name patterns (`*.js`, `test-*`)
- Find by type (file/directory filtering)
- Find by path scope with depth limiting
- Pattern matching with glob support

#### **gp/fs/glob** - Advanced Pattern Search  
- Recursive pattern matching (`**/*.md`)
- Multiple pattern support
- Directory traversal with exclusions
- Fast metadata-only operations

**Benefits**:
- **Same security model**: Uses existing `validatePath()` protection
- **Same data structure**: Returns standardized file records 
- **Perfect complement**: Discovery → then use read/write/copy/move on results
- **Performance**: Pure filesystem metadata (no content parsing)
- **SPL patterns**: Consistent workspace/history/error handling

### **📋 Original Requirements (Updated)**
Build a `gp` app containing filesystem API with:
1. **✅ Core filesystem operations** - File and directory operations within secure boundaries
2. **✅ App context inheritance** - Uses SPL app context and data boundary pattern
3. **✅ Security by design** - All operations constrained within app boundary via validatePath()
4. **🔄 Search operations** - File/directory discovery (proposed: find, glob)
5. **✅ Prototype foundation** - First collaborative AI-developed API in the gp collection

### **🎯 Installation & Usage Pattern**
**Current Usage**: Direct SPL app execution
```bash
spl_execute dev gp fs/read --path="file.txt"
spl_execute dev gp fs/list --path="." --stats
spl_execute dev gp fs/copy --from="src.txt" --to="dest.txt"
```

**Future Symlink Installation** (if needed):
```
spl-dev/apps/[target-app]/
├── data -> ../../           # App's working directory boundary  
├── fs -> ../gp/modules/fs/  # Symlink to filesystem API
└── [other-app-modules]/
```

## Acceptance Criteria

### **✅ COMPLETED**
- [x] **GP App Structure**: `spl-dev/apps/gp/` created with filesystem API organization
- [x] **Context Inheritance**: API uses SPL app context with data boundary pattern
- [x] **File Operations**: All file operations (read, write, copy, move, delete) working within app scope
- [x] **Directory Operations**: Directory operations (mkdir, rmdir, list, exists, info) working within app scope
- [x] **Command Pattern**: `gp fs/[method]` command structure functioning correctly  
- [x] **Security Validation**: All operations constrained within app data boundary via validatePath()
- [x] **Core Security Library**: fs.js with comprehensive secure wrapper functions
- [x] **SPL Integration**: Workspace management, history logging, error handling patterns

### **🔄 REMAINING**
- [ ] **Search Operations**: Find and glob operations for file/directory discovery (proposed)
- [ ] **Testing**: Comprehensive testing of API functionality and security boundaries
- [ ] **Documentation**: Usage examples, API reference, and security model documented
- [ ] **API Installation**: Symlink installation pattern for use in other apps (if needed)

## Technical Considerations
- **Security**: All file paths validated within symlink boundary before operations
- **Error Handling**: Consistent error messages and safe failure modes
- **Performance**: Efficient file operations using Node.js fs module
- **Cross-Platform**: Works on Linux, macOS, Windows WSL2
- **Atomic Operations**: File operations that don't leave partial states
- **Path Resolution**: Proper handling of relative paths, symlinks, and edge cases
- **API Reusability**: Clean installation pattern suitable for multiple target apps
- **Collaborative AI**: Prototype development process with AI assistance documented

## GitHub Discussion Summary
Key insights from GitHub comments (curated manually)

## Progress Log
- 2025-08-05: **Major Implementation Complete** - All core file/directory operations implemented with security boundaries, SPL integration, and standardized record format. Proposed search operations (find/glob) for filesystem discovery.
- 2025-08-03: Issue created with initial requirements and architecture plan