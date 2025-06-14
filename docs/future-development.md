# Future Development Roadmap

## spl/app API Redesign/Split

**Current Issue**: The spl/app API is not well designed and needs architectural refactoring.

**Problems Identified**:
- Mixed responsibilities between script execution and batch processing
- Inconsistent command patterns and naming
- Complex pipeline structure that could be simplified
- Unclear separation of concerns

**Proposed Improvements**:
- Split into distinct APIs: `spl/script` for script execution, `spl/batch` for command sequences
- Standardize command patterns across script types
- Simplify pipeline architecture
- Clear separation between execution contexts

**Priority**: Medium - Should be addressed after multi-language script support is implemented

**Dependencies**: Complete multi-language extension first to understand full requirements


## Next Development Items

**High Priority**:

1. **Enhanced Help and Discovery System**
   - Improve help functionality for app user functions (`usr/` methods)
   - Add list functions for APIs to enable discovery of available commands
   - Implement comprehensive help system across all SPL APIs
   - Ensure consistent help output format and discoverability

2. **Extend Script Execution with Working Directory Parameter** 
   - Add `cwd` argument to `spl/app/run` and `spl/app/wrap` 
   - Allow scripts to execute in custom working directories instead of always defaulting to `{appRoot}/scripts/`
   - Current behavior: Scripts always execute in `scripts/` directory
   - Proposed: Optional `cwd` parameter to specify alternate execution directory
   - Use case: Scripts that need to operate on files in different directories (e.g., `data/`, `output/`, project root)
   - Implementation: Add `cwd` action parameter, modify `child.spawn()` cwd option

3. **Subdirectory CLAUDE.md Prototype with Boot App**
   - Create `/spl/apps/boot/CLAUDE.md` as first federated guidance implementation
   - Design self-contained format optimized for AI-assisted development
   - Test discovery mechanism and override behavior
   - Establish patterns for component autonomy and repository evolution
   - See [Subdirectory CLAUDE.md Evolution Plan](./subdirectory-claude-md-plan.md) for full vision

**Pending Enhancements**:

## Standardized Path Resolution

**Current Issue**: Each API implements custom path resolution, creating inconsistency and maintenance burden.

**Proposed Solution**: Standardize on app data pattern with optional scope parameter.

**Target API Design**:
```javascript
// Default: All relative paths resolve to app data directory
spl.resolvePath(input, relativePath)  
// → {cwd}/{appRoot}/data/{relativePath}

// With scope parameter for special cases
spl.resolvePath(input, relativePath, scope)
// Scopes: 'app-data' (default), 'install-root', 'repository', 'working-dir'
```

**Implementation Steps**:
1. Add `spl.resolvePath(input, path, scope = 'app-data')` utility
2. Migrate tools/git and tools/7zip to use standard utility
3. Remove custom path resolution from auxiliary libraries
4. Update core SPL APIs to use app-data scope by default
5. Update documentation and testing patterns

## System Prerequisites Management

**Current Issue**: SPL APIs depend on external tools but lack prerequisite validation.

**Tools API Dependencies Discovered**:
- **tools/7zip**: Requires `7z` executable (p7zip-full package on Ubuntu/Debian)
- **tools/git**: Requires `git` executable
- **Future tools**: Will have similar external dependencies

**Proposed Solution**: Implement prerequisite checking system with helpful installation instructions in error messages.