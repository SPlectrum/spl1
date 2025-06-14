# Critical Code Quality Patterns

## Dangerous Default Anti-Pattern

**Problem**: In-code defaults using `|| "value"` syntax hide configuration errors and create unpredictable behavior.

**Example of Bad Pattern**:
```javascript
const fileDir = spl.action(input, "dir") || "batches";  // DANGEROUS
```

**Correct Approach**: 
- Remove in-code defaults entirely
- Set defaults in `arguments.json` files if needed
- Let missing configuration fail explicitly for debugging

**Bug Discovery**: `spl/app/run` was incorrectly looking in `batches/` folder instead of `scripts/` due to dangerous default in `spl/app/process-file.js`. The `|| "batches"` default masked the missing `dir` parameter.

## Module Location Consistency

**Critical Issue**: SPL has both global modules (`/modules/`) and install modules (`/spl/modules/`).

**Resolution Pattern**:
- Test apps typically use global modules (`../../../modules/spl/spl.js`)
- Install modules are for deployment packages
- Always verify which module location is being used in failing tests
- Check `spl.js` file in app for module path references

## Script vs Batch File Separation

**Design Discovery**: SPL distinguishes between different execution contexts:
- **Scripts** (`scripts/` folder): For `spl/app/run` and `spl/app/wrap` - multi-language capable
- **Batches** (`batches/` folder): For `spl/app/exec` and `spl/app/create` - SPL command sequences

**Key Insight**: Keep JavaScript as default script type while extending for multi-language support (bash, python, etc.) via file extension detection.

## Directory Management Rule

**Critical Practice**: Always return to repository root directory (`/mnt/c/SPlectrum/spl0`) after any operations in subdirectories.

**Why Essential**: 
- Prevents path confusion in git operations
- Ensures consistent relative path behavior
- Avoids git staging/commit errors due to wrong working directory
- Maintains predictable command execution context

**Implementation**: Use `cd /mnt/c/SPlectrum/spl0` after any subdirectory operations.