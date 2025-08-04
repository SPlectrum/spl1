---
type: feature
github_id: null
title: "Create general-purpose filesystem API with app context integration"
short_summary: "General-purpose filesystem API for installation into apps with automatic context inheritance"
state: open
milestone: v0.8.0
labels: [feature]
priority: high
estimated_effort: TBD
github_updated_at: null
local_updated_at: "2025-08-03T17:59:37.602Z"
---

# Create general-purpose filesystem API with app context integration

## Problem Statement
Create a secure, general-purpose filesystem API that can be installed into any app, automatically inheriting the app's data context as the working directory boundary. This API will be part of a broader general-purpose (gp) API collection designed for collaborative AI development and reusable across multiple apps.

## Required Work
Build a `gp` app containing filesystem API with:
1. **Core filesystem operations** - File and directory operations within secure boundaries
2. **App context inheritance** - Automatically uses host app's data symlink as working directory
3. **API installation pattern** - Designed for symlink installation into target apps
4. **Security by design** - All operations constrained within host app's boundary
5. **Prototype foundation** - First collaborative AI-developed API in the gp collection

## Work Plan

### **1. General Purpose App Structure**
```
spl-dev/apps/gp/
├── fs/                     # Filesystem API
│   ├── file/              # File operations (read, write, copy, move, delete)
│   ├── dir/               # Directory operations (create, list, remove)
│   └── search/            # Search operations (find, grep)
└── [future-apis]/         # Additional general-purpose APIs
```

### **2. API Installation Pattern**
```
# Target app installs fs API via symlink
spl-dev/apps/[target-app]/
├── data -> ../../         # App's working directory boundary
├── fs -> ../gp/fs/        # Symlink to filesystem API
└── [other-app-modules]/

# Command pattern: [target-app]/fs/read, [target-app]/fs/write, etc.
```

### **3. App Context Inheritance Security Model**
- **Automatic context**: API inherits host app's `data/` symlink as working boundary
- **No configuration needed**: Security boundary determined by host app's setup
- **Path validation**: All operations validated within host app's data boundary
- **Installation flexibility**: Same API works in any app context (spl-dev root, repo root, app-only)

### **4. Core API Implementation**
#### **gp/fs/file/** modules:
- `read` - Read file contents with encoding support
- `write` - Write/overwrite file with atomic operations
- `copy` - Copy files with metadata preservation
- `move` - Move/rename files safely
- `delete` - Delete files with confirmation
- `exists` - Check file existence and type
- `info` - Get file metadata (size, dates, permissions)

#### **gp/fs/dir/** modules:
- `create` - Create directories with parent creation
- `list` - List directory contents with filtering
- `remove` - Remove directories with recursive option
- `exists` - Check directory existence
- `info` - Get directory metadata

#### **gp/fs/search/** modules:
- `find` - Find files by name/pattern within scope
- `grep` - Search file contents with regex support

### **5. Collaborative AI Development Pattern**
- **Prototype phase**: First API developed with collaborative AI assistance
- **Reusable design**: Template for additional general-purpose APIs
- **Installation simplicity**: Symlink-based distribution across apps
- **Context-aware**: Automatically adapts to host app's security boundary

## Acceptance Criteria
- [ ] **GP App Structure**: `spl-dev/apps/gp/` created with filesystem API organization
- [ ] **API Installation**: Symlink installation pattern working for target apps
- [ ] **Context Inheritance**: API automatically uses host app's data boundary
- [ ] **File Operations**: All file operations (read, write, copy, move, delete) working within host app scope
- [ ] **Directory Operations**: Directory operations (create, list, remove) working within host app scope  
- [ ] **Search Operations**: Find and grep operations working within host app scope
- [ ] **Command Pattern**: `[app]/fs/[method]` command structure functioning correctly
- [ ] **Security Validation**: All operations properly constrained within host app's working directory
- [ ] **Testing**: Comprehensive testing of API installation and security boundaries
- [ ] **Documentation**: Usage examples, installation pattern, and security model documented

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
- Date: Status update