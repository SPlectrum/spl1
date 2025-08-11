# gp/test/test-instantiation

Test runner that validates modules can be instantiated without errors.

## Purpose
Verifies that discovered module files can be required and export the expected SPL pattern (`exports.default` function).

## Parameters
- Uses discovery data from workspace (no direct parameters)
- Operates on all discovered `index.js` files

## Behavior
1. Attempts to `require()` each discovered module file
2. Verifies the module exports a `.default` function
3. Records successful instantiations and failures
4. Updates workspace with results for reporting

## Troubleshooting Instantiation Failures

### Understanding Failure Output
When instantiation tests fail, the failure list shows:
- **File Path**: Exact path to module that failed to instantiate
- **Error Message**: Brief description of instantiation failure
- **Status**: 'FAIL' for instantiation errors

### Common Failure Patterns

#### "Cannot find module" Errors
**Symptom**: `Error: Cannot find module '/path/to/module'`
**Root Cause**: Module path resolution or dependency issues

**Debug Commands**:
```bash
# Test module loading directly
node -e "console.log(require('/exact/path/from/failure'))"

# Check if file exists
ls -la /exact/path/from/failure

# Check parent directory structure
ls -la /path/to/parent/directory/
```

**Common Causes**:
- Incorrect require path calculation in module (should be 6 levels up from app modules)
- Missing `spl.js` or other dependencies
- File path case sensitivity issues
- Broken symlinks in development environment

#### "require(...).default is not a function"
**Symptom**: Module loads but `.default` property is undefined or not callable
**Root Cause**: Incorrect SPL export pattern

**Debug Commands**:
```bash
# Check what module actually exports
node -e "const m = require('/path/to/failing/module'); console.log(Object.keys(m)); console.log(typeof m.default);"

# Inspect full exports
node -e "console.log(require('/path/to/failing/module'))"
```

**Resolution**: Ensure module uses correct SPL pattern:
```javascript
exports.default = function module_name(input) {
    // SPL method implementation
    spl.completed(input);
}
```

#### JavaScript Syntax Errors
**Symptom**: `SyntaxError: Unexpected token` or similar parsing errors
**Root Cause**: Invalid JavaScript syntax in module

**Debug Commands**:
```bash
# Check syntax without execution
node --check /path/to/failing/module.js

# Show specific syntax error location
node /path/to/failing/module.js
```

**Common Issues**:
- Missing semicolons or brackets
- Invalid variable declarations
- Incorrect require statements
- Malformed function definitions

#### Module Dependency Errors  
**Symptom**: `Error: Cannot find module 'spl'` or similar dependency errors
**Root Cause**: Module cannot locate required dependencies

**Debug Commands**:
```bash
# Check require resolution from module directory
cd /path/to/module/directory
node -e "console.log(require.resolve('spl'))"
node -e "console.log(require.resolve('../../../../../modules/spl/spl.js'))"
```

**Resolution**:
- Verify require path counting: `../../../../../modules/spl/spl.js` from app modules
- Check that required files exist in expected locations
- Ensure consistent directory structure

### Debug Analysis Workflow

#### Step 1: Run with Debug Mode
```bash
spl_execute dev -d gp/test/test-instantiation
```

#### Step 2: Analyze Debug Output
Look for:
- Module resolution attempts and paths tried
- Stack traces showing exact failure points
- Context information about workspace and discovery data

#### Step 3: Isolate Specific Failure
For each failed module:
```bash
# Test direct instantiation
node -e "try { const m = require('/failing/module/path'); console.log('SUCCESS:', typeof m.default); } catch(e) { console.log('ERROR:', e.message); }"
```

#### Step 4: Apply Targeted Fix
- **Path issues**: Fix require statements in failing module
- **Export issues**: Add proper `exports.default = function` pattern  
- **Syntax issues**: Fix JavaScript syntax errors
- **Dependency issues**: Ensure required modules are available

#### Step 5: Verify Fix
Re-run test pipeline to confirm instantiation now succeeds:
```bash
spl_execute dev gp/test/discover @@ gp/test/plan @@ gp/test/run @@ gp/test/report
```

## Integration with Test Pipeline

Instantiation testing is the first validation layer:
1. **Discovery** finds module files
2. **Instantiation** verifies modules can load ← **This method**
3. **JSON validation** checks argument schemas
4. **Basic test execution** runs functional tests

Failed instantiation prevents progression to functional testing, making this a critical quality gate.

## Expected Results Structure

Successful instantiation creates results like:
```javascript
{
  type: 'instantiation',
  filePath: '/path/to/module/index.js',
  status: 'PASS',
  message: 'Module instantiated successfully',
  duration: 45,
  timestamp: '2025-01-09T...'
}
```

Failed instantiation creates:
```javascript
{
  type: 'instantiation', 
  filePath: '/path/to/module/index.js',
  status: 'FAIL',
  message: 'relative/path: Cannot find module spl',
  duration: 12,
  timestamp: '2025-01-09T...'
}
```

---

*Method-level documentation for instantiation test troubleshooting*