[← Home](../README.md)

# 7zip API Wrapper - Methods Implementation Guide

This document outlines the implementation plan for the SPL 7zip API wrapper, based on the [7zip Command Line API Reference](7zip-command-line-api.md) and following the established SPL module pattern demonstrated in the [Git API Methods](git-api-methods.md).

**Implementation Status**: All methods are currently scaffolded with placeholder implementations. See `modules/tools/7zip/` directory for the current code structure.

## Overview

The SPL 7zip API provides a comprehensive wrapper around 7zip commands, following the established SPL module pattern. Each method executes 7zip commands through the auxiliary [`7zip.js`](../modules/tools/7zip/7zip.js) library and integrates seamlessly with the SPL platform's execution and error handling systems.

## Core 7zip API Methods

### 1. Archive Context Management
- **URI**: `tools/7zip`
- **Function**: `tools_7zip(input)`
- **Purpose**: Set archive path context and common options for subsequent 7zip operations
- **Arguments**:
  - `archive` (String, alias: `a`): Default archive file path
  - `working` (String, alias: `w`): Working directory for operations
  - `password` (String, alias: `p`): Default password for encrypted archives
  - `help` (Boolean, alias: `h`): Show help information

### 2. Add Files to Archive
- **URI**: `tools/7zip/add`
- **Function**: `tools_7zip_add(input)`
- **Purpose**: Create new archive or add files to existing archive (7z command: `a`)
- **Arguments**:
  - `archive` (String, alias: `a`, required): Archive file name
  - `files` (String, required): Files/directories to add (supports patterns)
  - `type` (String, alias: `t`): Archive format (7z, zip, tar, etc.)
  - `compression` (Number, alias: `c`): Compression level (0-9)
  - `selfExtracting` (Boolean, alias: `sfx`): Create self-extracting archive
  - `password` (String, alias: `p`): Set password protection
  - `exclude` (String, alias: `x`): Exclude file patterns
  - `recurse` (Boolean, alias: `r`): Recurse subdirectories
  - `help` (Boolean, alias: `h`): Show help information

### 3. Extract Files with Full Paths
- **URI**: `tools/7zip/extract`
- **Function**: `tools_7zip_extract(input)`
- **Purpose**: Extract files from archive preserving directory structure (7z command: `x`)
- **Arguments**:
  - `archive` (String, alias: `a`, required): Archive file to extract
  - `output` (String, alias: `o`): Output directory
  - `files` (String): Specific files to extract
  - `password` (String, alias: `p`): Archive password
  - `overwrite` (Boolean, alias: `y`): Overwrite existing files
  - `help` (Boolean, alias: `h`): Show help information

### 4. Extract Files Without Paths
- **URI**: `tools/7zip/extract-flat`
- **Function**: `tools_7zip_extract_flat(input)`
- **Purpose**: Extract files ignoring directory structure (7z command: `e`)
- **Arguments**:
  - `archive` (String, alias: `a`, required): Archive file to extract
  - `output` (String, alias: `o`): Output directory
  - `files` (String): Specific files to extract
  - `password` (String, alias: `p`): Archive password
  - `overwrite` (Boolean, alias: `y`): Overwrite existing files
  - `help` (Boolean, alias: `h`): Show help information

### 5. List Archive Contents
- **URI**: `tools/7zip/list`
- **Function**: `tools_7zip_list(input)`
- **Purpose**: Display archive contents and information (7z command: `l`)
- **Arguments**:
  - `archive` (String, alias: `a`, required): Archive file to list
  - `technical` (Boolean, alias: `slt`): Show technical information
  - `password` (String, alias: `p`): Archive password
  - `help` (Boolean, alias: `h`): Show help information

### 6. Test Archive Integrity
- **URI**: `tools/7zip/test`
- **Function**: `tools_7zip_test(input)`
- **Purpose**: Test archive integrity and verify files (7z command: `t`)
- **Arguments**:
  - `archive` (String, alias: `a`, required): Archive file to test
  - `password` (String, alias: `p`): Archive password
  - `help` (Boolean, alias: `h`): Show help information

### 7. Update Archive
- **URI**: `tools/7zip/update`
- **Function**: `tools_7zip_update(input)`
- **Purpose**: Update existing archive with new/changed files only (7z command: `u`)
- **Arguments**:
  - `archive` (String, alias: `a`, required): Archive file to update
  - `files` (String, required): Files/directories to update
  - `exclude` (String, alias: `x`): Exclude file patterns
  - `recurse` (Boolean, alias: `r`): Recurse subdirectories
  - `password` (String, alias: `p`): Archive password
  - `help` (Boolean, alias: `h`): Show help information

### 8. Delete Files from Archive
- **URI**: `tools/7zip/delete`
- **Function**: `tools_7zip_delete(input)`
- **Purpose**: Remove files from existing archive (7z command: `d`)
- **Arguments**:
  - `archive` (String, alias: `a`, required): Archive file to modify
  - `files` (String, required): Files/patterns to delete
  - `password` (String, alias: `p`): Archive password
  - `help` (Boolean, alias: `h`): Show help information

## Implementation Pattern

Each method follows the established SPL pattern demonstrated in the existing [`git/status.js`](../modules/tools/git/status.js) implementation:

```javascript
exports.default = function tools_7zip_methodname(input) {
    // 1. Parameter extraction using spl.action()
    const archive = spl.action(input, 'archive');
    const files = spl.action(input, 'files');
    const password = spl.action(input, 'password');
    
    // 2. Archive path resolution
    const appRoot = spl.context(input, 'appRoot');
    const cwd = spl.context(input, 'cwd');
    const archivePath = zip.getArchivePath(archive, appRoot, cwd);
    
    // 3. Command argument building
    const args = ['7z-command'];
    if (password) args.push(`-p${password}`);
    args.push('-y'); // Always assume yes for automation
    args.push(archivePath);
    if (files) args.push(files);
    
    // 4. 7zip command execution
    const output = zip.execute7zip(input, spl, args, cwd);
    
    // 5. Output processing and console logging
    console.log('7zip Command Output:');
    console.log('==================');
    console.log(output);
    
    // 6. Completion
    spl.completed(input);
}
```

## Core Infrastructure

### Auxiliary Library (`7zip.js`)

The implementation leverages a core auxiliary library similar to [`git.js`](../modules/tools/git/git.js):

```javascript
// Core 7zip command execution
exports.execute7zip = function(input, spl, args, workingPath) {
    // Use 7z executable (Linux-only deployment)
    const executable = '7z';
    
    // Execute command with proper error handling
    // Process return codes: 0=success, 1=warning, 2=fatal error
    // Integration with SPL error handling system
}

// Archive path resolution
exports.getArchivePath = function(archive, appRoot, cwd) {
    // Resolve archive paths relative to app root and working directory
    // Handle absolute and relative paths appropriately
}

// Common switch building
exports.buildCommonSwitches = function(input) {
    // Build frequently used switches from action configuration
    // Handle password, compression, output directory, etc.
}
```

### File Structure Requirements

Each method requires two files in the [`modules/tools/7zip/`](../modules/tools/7zip/) directory:

1. **Implementation file**: `{method}.js`
   - Contains the method implementation following the pattern above
   - Exports a `default` function with naming convention `tools_7zip_{method}`

2. **Arguments schema file**: `{method}_arguments.json`
   - Defines command-line arguments and help information
   - Follows JSON schema pattern established in existing argument files

## Integration with SPlectrum Release Process

The 7zip API directly supports the current SPlectrum release workflow:

```bash
# Create Linux installer archive
./spl_execute boot tools/7zip/add --archive spl-installer.tar.gz --files ./spl --type tar

# With compression options
./spl_execute boot tools/7zip/add --archive spl-installer.tar.gz --files ./spl --type tar --compression 9
```

## Linux Deployment

The wrapper is designed for Linux-only deployment:

- **Executable**: Uses `7z` command (requires p7zip-full package)
- **Path handling**: Unix-style path resolution
- **Archive formats**: Focus on tar.gz, 7z, zip for Linux environments

## Usage Examples

```bash
# Create release package
./spl_execute boot tools/7zip/add --archive release.tar.gz --files ./spl --type tar --compression 9

# Extract archive to specific directory
./spl_execute app tools/7zip/extract --archive package.7z --output /tmp/extracted --overwrite

# List archive contents with technical details
./spl_execute app tools/7zip/list --archive data.tar.gz --technical

# Test archive integrity
./spl_execute app tools/7zip/test --archive backup.7z

# Update archive with new files
./spl_execute app tools/7zip/update --archive project.7z --files ./src --recurse

# Create password-protected ZIP archive
./spl_execute app tools/7zip/add --archive secure.zip --files ./confidential --password mypass123 --type zip
```

## Error Handling and Return Codes

The wrapper processes 7zip return codes according to the [7zip Command Line API Reference](7zip-command-line-api.md):

- **0**: Success - Command completed successfully
- **1**: Warning - Non-fatal error, operation partially completed
- **2**: Fatal error - Operation failed
- **7**: Command line error - Invalid arguments or syntax
- **8**: Not enough memory - System resource limitation
- **255**: User stopped process - Manual interruption

These are integrated with SPL's error handling system through `spl.throwError()` for non-zero return codes.

## Implementation Priority

Recommended implementation order based on SPlectrum usage patterns:

1. **`add`** - Critical for release process (self-extracting archives)
2. **`extract`** - Essential for package deployment
3. **`list`** - Useful for archive inspection
4. **`test`** - Important for archive verification
5. **`update`** - Maintenance operations
6. **`delete`** - Archive cleanup
7. **`extract-flat`** - Specialized extraction

## Related Documentation

- [7zip Command Line API Reference](7zip-command-line-api.md) - Complete 7zip command specification
- [Git API Methods](git-api-methods.md) - Reference implementation pattern
- [Creating a Release](creating-a-release.md) - Current release process using 7zip
- [How To Guide](how-to.md) - General SPL usage instructions

---

[← Home](../README.md)