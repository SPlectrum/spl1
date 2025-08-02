---
type: feature
github_id: 91
title: "Implement app overlay pattern for command precedence over module commands"
state: open
milestone: v0.8.0
labels: ["feature", "v0.8.0", "architecture", "command-system"]
priority: high
estimated_effort: M
github_updated_at: "2025-07-29T17:53:34Z"
local_updated_at: "2025-07-29T15:37:33.680Z"
---

# Implement app overlay pattern for command precedence over module commands

## Problem Statement
Implement an app overlay pattern where application commands take precedence over module commands in the SPlectrum command system. This enables apps to override module functionality by creating `[app]/[api]/[method]` implementations that shadow corresponding `[package]/[spi]/[method]` module implementations, allowing for customized behavior and iterative module development using existing app structures.

## Required Work
Design and implement a command resolution system that:
1. **Command Structure Support**: Handle both `[app]/[api]/[method]` and `[package]/[spi]/[method]` patterns
2. **Precedence Resolution**: Ensure app commands always override module commands when names match
3. **App Structure Enhancement**: Modify existing app architecture to support overlay pattern
4. **Module Development Workflow**: Enable module development using app structure patterns

## Work Plan

### 1. Command System Architecture
Define the overlay resolution mechanism:
```
Command Resolution Order:
1. [app]/[api]/[method]     # Highest precedence (app overlay)
2. [package]/[spi]/[method] # Module implementation (fallback)

Example:
- App command: workflow/api/commit      # Takes precedence
- Module command: workflow/spi/commit   # Shadowed by app
```

### 2. Command Resolution Engine
Implement resolution logic:
- **Command Parser**: Parse `[component]/[interface]/[method]` structure
- **Precedence Resolver**: Check app implementations first, fall back to modules
- **Namespace Management**: Handle conflicts and ensure clean separation
- **Error Handling**: Clear feedback when commands are shadowed or missing

### 3. App Structure Enhancements
Modify app architecture to support overlay pattern:
```
Enhanced App Structure:
├── apps/
│   └── [app-name]/
│       ├── api/              # App API implementations (overlay capable)
│       │   ├── [method1].js
│       │   └── [method2].js
│       ├── config/           # App-specific configuration
│       └── docs/             # App documentation
└── modules/
    └── [package-name]/
        ├── spi/              # Service Provider Interface (module)
        │   ├── [method1].js
        │   └── [method2].js
        └── lib/              # Module libraries
```

### 4. Development Workflow Integration
Enable module development using app patterns:
- **Prototype in Apps**: Develop functionality as app implementations
- **Graduate to Modules**: Move stable functionality to module SPIs
- **Overlay Testing**: Test module behavior through app overrides
- **Migration Tools**: Support moving implementations between app/module layers

### 5. Command Registration System
Implement dynamic command discovery:
- **App Command Registry**: Scan and register app API methods
- **Module Command Registry**: Scan and register module SPI methods
- **Precedence Cache**: Optimize resolution performance
- **Hot Reload**: Support runtime command updates during development

## Acceptance Criteria
- [ ] **Command Structure Parsing**: System correctly parses `[app]/[api]/[method]` and `[package]/[spi]/[method]` patterns
- [ ] **Precedence Resolution**: App commands consistently override module commands with same name
- [ ] **App Structure Enhanced**: Existing app structure modified to support overlay pattern
- [ ] **Module Development**: Developers can prototype modules using app structure
- [ ] **Command Discovery**: Automatic registration of both app and module commands
- [ ] **Error Handling**: Clear feedback for command conflicts and resolution
- [ ] **Performance**: Command resolution performs efficiently with caching
- [ ] **Documentation**: Complete developer guide for overlay pattern usage
- [ ] **Migration Tools**: Utilities to move implementations between app/module layers
- [ ] **Testing Framework**: Comprehensive tests for precedence resolution

## Technical Considerations
- **Performance**: Efficient command lookup with minimal overhead
- **Architecture**: Clean separation between app and module command spaces
- **Backward Compatibility**: Existing commands continue to work unchanged
- **Development Experience**: Intuitive workflow for app-to-module graduation
- **Namespace Conflicts**: Clear resolution and error reporting for conflicts
- **Hot Reload**: Support for dynamic command updates during development
- **Documentation**: Clear patterns for when to use app vs module implementations

## Dependencies
- **Related**: carambah/spl-dev engine architecture (issue #025)
- **Integrates**: App/API repository structure planning (issue #026)
- **Foundation**: Overall seed-to-split work plan (issue #013)

## GitHub Discussion Summary
Key insights from GitHub comments (curated manually)

## Progress Log
- Date: Status update