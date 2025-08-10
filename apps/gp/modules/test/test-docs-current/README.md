# gp/test/test-docs-current

Test runner that validates documentation currency requirements for SPL modules.

## Purpose
Validates that `README.md` files have more recent last-modified timestamps than `.js` files in the same folder, ensuring documentation stays current with code changes.

## Parameters
- Uses work packages from test planning (no direct parameters)
- Operates on assets with file metadata (path, lastModified) from discovery

## Behavior
1. Groups discovered assets by directory
2. Identifies folders containing `.js` files
3. Finds `README.md` file in each folder
4. Compares last-modified timestamps
5. Records violations where `README.md` is older than any `.js` file
6. Updates workspace with validation results

## Test Logic
- **PASS**: Folder with `.js` files has `README.md` newer than all `.js` files
- **PASS**: Folder with `.js` files has no `README.md` (not a currency issue)
- **FAIL**: Folder has `README.md` older than one or more `.js` files
- **IGNORE**: Folders without `.js` files (no documentation currency requirement)

## Integration with Test Pipeline
Documentation currency testing is part of the comprehensive test pipeline:
1. **Discovery** → finds all files with lastModified timestamps
2. **Planning** → creates docs-current work packages with asset metadata
3. **Execution** → validates documentation currency ← **This method**
4. **Reporting** → shows outdated documentation as clean folder list

## Expected Results Structure

**Current documentation:**
```javascript
{
  type: 'docs-current',
  folderPath: '/full/path/to/folder',
  status: 'PASS',
  message: 'apps/gp/modules/api/method (README.md is current)',
  duration: 2,
  timestamp: '2025-01-09T...'
}
```

**Outdated documentation:**
```javascript
{
  type: 'docs-current',
  folderPath: '/full/path/to/folder',
  status: 'FAIL',
  message: 'apps/gp/modules/api/method',
  duration: 3,
  timestamp: '2025-01-09T...',
  details: {
    readmeLastModified: '2025-01-08T10:00:00.000Z',
    outdatedJsFiles: 'index.js, helper.js'
  }
}
```

**No README.md (not a currency issue):**
```javascript
{
  type: 'docs-current',
  folderPath: '/full/path/to/folder',
  status: 'PASS',
  message: 'apps/gp/modules/api/method (no README.md to check)',
  duration: 1,
  timestamp: '2025-01-09T...'
}
```

## Troubleshooting Documentation Currency Failures

### Understanding Failure Output
When docs-current tests fail, the report shows clean folder paths where documentation is outdated:

```
docs-current: 13/15 passed, 2 failed
  FAILED:
apps/gp/modules/api/execute  
apps/gp/modules/api/run
```

### Resolution Steps
1. **Identify outdated documentation**: Note folder paths from failure list
2. **Check file timestamps**: Verify which `.js` files are newer than `README.md`
3. **Update documentation**: Review and update `README.md` content to reflect code changes
4. **Touch file if needed**: Use `touch README.md` to update timestamp if content is current
5. **Re-run test**: Verify documentation currency compliance

### Common Causes
- Code modifications without documentation updates
- New `.js` files added without updating folder documentation
- Automated code generation updating timestamps
- File system operations affecting modification times

### Prevention
- Update documentation as part of code change workflow
- Include documentation reviews in code review process
- Use automated checks in CI/CD pipelines

### Validation Command
```bash
spl_execute dev gp/test/discover --modules=target/module @@ gp/test/plan --type=docs-current @@ gp/test/run @@ gp/test/report
```

### Understanding File Timestamps
The test uses file system `mtime` (modification time) to compare:
- `README.md` last modified time must be >= latest `.js` file modified time
- Timezone differences are handled through ISO string comparison
- File operations like `touch`, `cp`, `mv` affect modification times

---

*Documentation currency validation ensures documentation reflects the current state of code across all SPL modules*