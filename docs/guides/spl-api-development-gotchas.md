# SPL API Development Gotchas

Critical issues encountered during collaborative AI development of SPL APIs that are essential to document for future development.

## 1. App Structure vs Global Module Structure

### **Issue**: Confusion between app modules and global module packages

**The Problem**: 
- **Global modules** (like `modules/spl/`) contain auxiliary libraries (`spl.js`, `blob.js`, `app.js`)
- **App modules** (like `apps/gp/modules/fs/`) contain only API/method combinations

**Correct App Structure:**
```
spl-dev/apps/gp/
├── data/                   # App data boundary
├── modules/                # Only API/method combinations
│   ├── fs/                # API namespace
│   │   ├── fs.js          # Auxiliary library (OK in apps)
│   │   ├── read/          # Method implementation
│   │   └── [other-methods]/
│   └── [other-apis]/
├── batches/
└── scripts/
```

**Wrong Structure**: Creating `spl-dev/apps/gp/fs/` directly instead of `spl-dev/apps/gp/modules/fs/`

## 2. Require Path Calculation from App Modules

### **Issue**: Incorrect relative paths to SPL core modules

**The Problem**: 
From `apps/gp/modules/fs/read/index.js`, the path to `modules/spl/spl.js` requires going up **6 levels**, not 4 or 5.

**Path Calculation:**
```
apps/gp/modules/fs/read/index.js
└── ../                    # 1: read → fs
    └── ../                # 2: fs → modules  
        └── ../            # 3: modules → gp
            └── ../        # 4: gp → apps
                └── ../    # 5: apps → spl-dev
                    └── modules/spl/spl.js  # 6: spl-dev → modules
```

**Correct Require Statement:**
```javascript
const spl = require("../../../../../modules/spl/spl.js");
```

## 4. Workspace API Record Manipulation Pattern

### **Issue**: Fragile workspace record updates leading to data loss or corruption

**The Problem**:
Direct manipulation of workspace records without proper two-step process can fail or overwrite existing data.

**Wrong Approach** (Fragile):
```javascript
// BAD: Direct manipulation without proper API record handling
const fileURI = spl.fURI("gp/fs", params.file);
spl.wsSet(input, fileURI, fileRecord);  // Creates separate workspace keys
```

**Correct Two-Step Process**:
```javascript
// STEP 1: Get the API record (gp/fs)
let apiRecord = spl.wsRef(input, "gp/fs");
if (!apiRecord) {
    // Create new API record with proper structure
    apiRecord = {
        headers: { gp: { fs: { api: "gp/fs", timestamp: new Date().toISOString() } } },
        value: {}
    };
}

// STEP 2: Work within the API record - add/update file
const fileKey = spl.fURI("data", params.file);
apiRecord.value[fileKey] = fileRecord;

// Save the updated API record back to workspace
spl.wsSet(input, "gp/fs", apiRecord);
```

**Key Principles**:
1. **Always get the API record first** using `spl.wsRef(input, "api-name")`
2. **Work within the record structure** - modify `apiRecord.value[key]`
3. **Save the complete record back** using `spl.wsSet(input, "api-name", apiRecord)`
4. **File keys use path-based structure** like `data/filename_ext`

**Result Structure**:
```json
{
  "gp/fs": {
    "headers": { "gp": { "fs": { "api": "gp/fs", "timestamp": "..." } } },
    "value": {
      "data/test_txt": { "headers": {...}, "value": "file content" },
      "data/config_json": { "headers": {...}, "value": "config data" }
    }
  }
}
```

This ensures all files are properly grouped under the API namespace with individual archiving capability.

**Wrong**: `require("../../../../modules/spl/spl.js")` (causes MODULE_NOT_FOUND)

## 3. SPL moduleAction Function Requirements

### **Issue**: Understanding SPL's module loading and export expectations

**The Problem**: 
SPL's `moduleAction` function in `spl.js` expects modules to export their main function as `.default`

**App Overlay Resolution Logic:**
1. Try: `${cwd}/apps/${app}/modules/${moduleFile}` (app overlay)
2. Fallback: `${cwd}/${moduleRoot}/${module}` (global modules)  
3. Both expect: `require(path).default(input)`

**Correct Export Pattern:**
```javascript
exports.default = function gp_fs_read(input) {
    // SPL integration logic
    spl.completed(input);
}
```

**Wrong**: `module.exports = function(...)` or `exports.read = function(...)`

## 4. SPL Execution Document Structure

### **Issue**: Understanding the rich execution context passed to methods

**The Problem**: 
Methods receive a complex JSON execution document containing full pipeline state, not simple parameters.

**Key SPL Accessor Pattern:**
```javascript
// Always use SPL accessors, never manipulate input JSON directly
const appRoot = spl.context(input, "appRoot");  // Get app context
const params = spl.action(input);               // Get method parameters  
spl.wsSet(input, "result", data);              // Store results
spl.history(input, "message");                 // Add audit entries
spl.completed(input);                          // Mark completion
```

**Execution Document Contains:**
- Complete pipeline execution history
- Parsed command arguments  
- App context and boundaries
- Workspace for inter-method communication
- Audit trail and timing information

## 5. Testing SPL APIs During Development

### **Issue**: Proper testing approach for SPL API scaffolding

**Testing Strategy:**
1. **Help First**: Test `--help` to verify argument parsing
2. **Simple Execution**: Test basic method calls with console.log
3. **Path Verification**: Ensure require paths resolve correctly
4. **Context Validation**: Verify SPL context data is accessible

**Testing Commands:**
```bash
# Test help system (tests argument files and app overlay)
/home/herma/splectrum/spl1/spl_execute dev gp/fs/read --help

# Test execution (tests require paths and exports)
/home/herma/splectrum/spl1/spl_execute dev gp/fs/read --file=test.txt
```

## 6. Development Context Requirements

### **Issue**: Understanding that development always occurs within app context

**Key Principle**: 
All SPL development happens within an app context. There is no "global development" - even when working on core modules, development occurs within the `spl-dev` app context.

**Implications:**
- Apps provide data boundaries for security
- App overlay pattern allows customization of core modules  
- `appRoot` context defines the working directory scope
- Development workflow assumes app-centric development

## Common Error Patterns

### Module Not Found Errors
```
Error: Cannot find module '/path/to/spl-dev/modules/gp/fs/read'
```
**Cause**: App overlay not working, fallback to global modules failed
**Solution**: Check app structure and require paths

### Require Path Errors  
```
Error: Cannot find module '../../../../modules/spl/spl.js'
```
**Cause**: Incorrect relative path calculation
**Solution**: Count directory levels carefully, use absolute path if needed

### Export Not Found Errors
```
TypeError: require(...).default is not a function
```
**Cause**: Module doesn't export function as `.default`
**Solution**: Use `exports.default = function name(input) {...}`

## Best Practices for Future Development

1. **Always test scaffolding** before implementing complex logic
2. **Use console.log initially** to understand execution document structure
3. **Test help commands first** to verify argument parsing
4. **Count directory levels carefully** for require paths
5. **Follow SPL accessor pattern** - never manipulate input JSON directly
6. **Document gotchas immediately** when encountered during development

---

*These gotchas were identified during collaborative AI development of the first general-purpose APIs for the SPL platform.*