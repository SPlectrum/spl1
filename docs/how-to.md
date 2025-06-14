[← Home](../README.md)
# How To for SPlectrum

## Quick Command Reference
```bash
# Pattern: ./spl_execute <app> <api/method> [options] [args]
./spl_execute test-suite spl/console/log hello world
./spl_execute test-tools-git usr/git-status-tests
./spl_execute test-tools-7zip usr/7zip-add-tests
./spl_execute watcher -d tools/git/status --repo data/project
./spl_execute boot usr/create_linux_installer --help
```

## File Structure (For Code Generation)
```
modules/spl/{api}/{method}.js              # Core APIs
modules/tools/{tool}/{method}.js           # Tool wrappers  
spl/apps/{app}/modules/usr/{method}.js     # App methods
{method}_arguments.json                    # All argument schemas
```

## Method Implementation Template

### Basic Method
```javascript
exports.default = function api_method_name(input) {
    // 1. Extract parameters
    const param = spl.action(input, 'paramName');
    const context = spl.context(input, 'contextProp');
    
    // 2. Execute logic
    
    // 3. Complete
    spl.completed(input);
}
```

### Method with Auxiliary Library and Dual Output
```javascript
const spl = require("../spl.js")
const aux = require("./aux.js")  // Domain auxiliary library

exports.default = function domain_method_name(input) {
    // Use auxiliary library for implementation
    const results = aux.performOperation(input, spl, parameters);
    
    // Store full results in workspace
    spl.wsSet(input, 'operation/results', {
        headers: { spl: { operation: { status: results.passed ? 'passed' : 'failed' } } },
        value: results
    });
    
    // Stream concise output
    if (results.passed) {
        console.log(`✓ ${results.summary}`);
    } else {
        console.error(`✗ ${results.errors.join(', ')}`);
    }
    
    spl.completed(input);
}
```

## Development Rules

### Core Requirements
- Use `spl.action(input, 'param')` for CLI args, `spl.context(input, 'prop')` for execution state
- Call `spl.completed(input)` at method end (required)
- Use `spl.throwError(input, 'message')` for fatal errors only
- Test help flags separately: `./spl_execute app method --help`

### Path and Console Rules
- **Path Resolution**: `spl.context(input, "cwd")` points to SPlectrum install root
- **Relative Paths**: Always relative to install root (e.g., `apps/boot/batches`)
- **Console Output**: Use direct calls (`console.log()`, `console.error()`) within methods
- **Implementation Pattern**: Use auxiliary libraries for complex logic, keep methods as thin wrappers

### Dual Output Pattern (Required)
- **Full Results**: Store complete structured data in workspace via `spl.wsSet()`
- **Concise Stream**: Output human-readable summary to console
- **Success Format**: Short acknowledgment only (`✓ Operation completed`)
- **Failure Format**: Essential failure information only (`✗ Failed: specific reason`)
- **Workspace Access**: Full details available for programmatic access and debugging

### Test App Development
- **Naming**: Follow `test-{target}` pattern
- **Testing Focus**: Test source locations, not deployed locations
- **Hybrid Approach**: Use Node.js modules when SPlectrum functionality incomplete
- **Library Pattern**: Create `{domain}.js` auxiliary library in same directory as methods  

## Batch Files and Method Generation

### Creating Batch Files
Batch files (`.batch` extension) contain command sequences for automation:
```bash
# Example: deploy_myapp.batch
spl/package/load -r install -d packages -f apps_myapp.json
spl/package/deploy -r apps -d . -f apps_myapp.json
```

### Auto-generating Methods from Batch Files
Use `spl/app/create` to generate JavaScript methods from batch files:
```bash
# Navigate to app directory
cd spl/apps/{app-name}

# Generate usr/ method from batch file
./spl spl/app/create -f mybatch.batch

# Creates:
# - modules/usr/mybatch.js (JavaScript method)
# - modules/usr/mybatch_arguments.json (argument schema)
```

### Batch File Usage Pattern
```bash
# 1. Create batch file with command sequence
echo "spl/console/log Hello World" > hello.batch

# 2. Generate method from batch
./spl spl/app/create -f hello.batch

# 3. Execute generated method
./spl usr/hello
```

### Common Use Cases
- **Release management**: Create packages and save to release directory
- **Deployment**: Load packages and deploy to target locations  
- **Testing**: Run test suites with specific configurations
- **Build processes**: Compile and package applications

## Creating New Documentation

### Complete Documentation Workflow

**1. Document Creation**:
```bash
# Create new document in docs/ folder (kebab-case naming)
docs/new-feature-guide.md
```

**2. CLAUDE.md Updates**:
```bash
# Add reference to CLAUDE.md if it affects development workflow
# Update "Key Files for Understanding" section if applicable
# Add to relevant workflow sections
```

**3. README.md Integration**:
```bash
# Add to appropriate documentation section:
# - Essential Guides (for core development)
# - API Documentation (for API references)  
# - System Architecture (for design docs)
# - Tool References (for tool-specific docs)
```

**4. GitHub Issue-Based Workflow**:
```bash
# IMPORTANT: Work within GitHub issue workflow
# 1. Create or work on specific GitHub issue
git checkout -b feature/issue-123

# 2. Package changes to release folder first (if needed)
# Changes in spl/ install directory are NOT git-tracked
cd spl/apps/boot
./spl usr/boot_to_release      # If boot app was modified
./spl usr/apps_to_release      # If any apps were created/modified

# 3. Stage all related changes together
git add docs/new-document.md CLAUDE.md README.md release/

# 4. Create descriptive commit referencing issue
git commit -m "docs: add new feature documentation (#123)

Added comprehensive guide for new feature including workflow
integration and updated navigation in README.md and CLAUDE.md."

# 5. Create PR when ready
gh pr create --title "Add new feature documentation (#123)" --body "Closes #123"
```

### File Creation Checklist
```
✓ Create in docs/ folder (kebab-case naming)
✓ Start with [← Home](../README.md) navigation
✓ Follow standard template structure
✓ Update CLAUDE.md if workflow-related
✓ Follow phase-based development and issue-per-branch workflow
✓ Add to appropriate README.md section
✓ Commit all changes together with descriptive message
```

### Documentation Standards (For AI Efficiency)
- **Token-efficient**: Front-load key information, use scannable format
- **Code examples**: Always include working command/code snippets
- **Consistent structure**: Use template below for predictable parsing
- **Navigation**: Ensure discoverability through README.md and CLAUDE.md
- **Workflow integration**: Update CLAUDE.md for development-related docs

### Standard Template
```markdown
[← Home](../README.md)

# Title (Descriptive, not generic)

Brief description - what this solves/enables.

## Quick Reference
Key commands/patterns first.

## Implementation Details  
Technical specifics.

## Examples
Working code/command examples.

## Related Documentation
- [Related Doc](./related-doc.md) - Brief description
```

### README.md Integration Patterns

**Essential Guides** (core development):
```markdown
- [New Feature Guide](./docs/new-feature-guide.md) - How to implement new features
```

**API Documentation** (technical references):
```markdown
- [New API Methods](./docs/new-api-methods.md) - API implementation details
```

**System Architecture** (design documents):
```markdown
- [New Architecture Design](./docs/new-architecture-design.md) - System design decisions
```

### CLAUDE.md Integration

**When to Update CLAUDE.md**:
- Documentation affects development workflow
- New patterns or conventions established
- Key reference files for understanding codebase
- Changes to git, testing, or deployment processes

**Integration Locations**:
- **Key Files for Understanding**: Add essential development documents
- **Working with the Codebase**: Add pattern or convention changes
- **Development Workflow Strategy**: Add workflow-related documents

