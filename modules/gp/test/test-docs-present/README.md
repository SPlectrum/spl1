# gp/test/test-docs-present

Test runner that validates documentation presence requirements for SPL modules.

## Purpose
Validates that folders containing `.js` files have exactly one `README.md` file, enforcing SPL coding standard requirement for method-level documentation.

## Parameters
- Uses work packages from test planning (no direct parameters)
- Operates on all `.js` and `.md` files discovered in the module tree

## Behavior
1. Groups discovered files by directory
2. Identifies folders containing `.js` files
3. Validates each folder has exactly one `README.md` file
4. Records violations for folders missing documentation or having extra `.md` files
5. Updates workspace with validation results

## Test Logic
- **PASS**: Folder with `.js` files has exactly one `README.md`
- **FAIL**: Folder with `.js` files missing `README.md`  
- **FAIL**: Folder with `.js` files has extra `.md` files (only `README.md` allowed)
- **IGNORE**: Folders without `.js` files (no documentation requirement)

## Integration with Test Pipeline
Documentation presence testing is part of the comprehensive test pipeline:
1. **Discovery** → finds all files in module tree
2. **Planning** → creates docs-present work packages with `.js` files
3. **Execution** → validates documentation requirements ← **This method**
4. **Reporting** → shows missing documentation as clean folder list

## Expected Results Structure

**Successful validation:**
```javascript
{
  type: 'docs-present',
  folderPath: '/full/path/to/folder',
  status: 'PASS',
  message: 'Documentation present (README.md for 2 .js files)',
  duration: 3,
  timestamp: '2025-01-09T...'
}
```

**Missing documentation:**
```javascript
{
  type: 'docs-present',
  folderPath: '/full/path/to/folder', 
  status: 'FAIL',
  message: 'apps/gp/modules/api/method',
  duration: 2,
  timestamp: '2025-01-09T...'
}
```

**Extra markdown files:**
```javascript
{
  type: 'docs-present',
  folderPath: '/full/path/to/folder',
  status: 'FAIL', 
  message: 'apps/gp/modules/api/method (extra .md files: NOTES.md, CHANGELOG.md)',
  duration: 1,
  timestamp: '2025-01-09T...'
}
```

## Troubleshooting Documentation Failures

### Understanding Failure Output
When docs-present tests fail, the report shows clean folder paths of locations missing required documentation:

```
docs-present: 0/14 passed, 14 failed
  FAILED:
apps/gp/modules/fs
apps/gp/modules/fs/copy
apps/gp/modules/fs/delete
```

### Resolution Steps
1. **Identify missing documentation**: Note folder paths from failure list
2. **Create README.md files**: Add documentation in each failing folder
3. **Follow SPL documentation standards**: Include method purpose, parameters, behavior
4. **Re-run test**: Verify documentation compliance

### Documentation Requirements
Each folder containing `.js` files must have:
- Exactly one `README.md` file
- No other `.md` files in the same folder
- Content describing the module's purpose and usage

### Validation Command
```bash
spl_execute dev gp/test/discover --modules=target/module @@ gp/test/plan --type=docs-present @@ gp/test/run @@ gp/test/report
```

---

*Documentation presence validation ensures consistent embedded documentation across all SPL modules*