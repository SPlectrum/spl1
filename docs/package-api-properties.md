[Home](../README.md)
# SPL Package API Properties

This document provides a comprehensive overview of the properties used by the SPL package API, particularly the `headers.spl.package` properties.

## Overview

The package API manages data and module packages within the SPlectrum platform. It provides functionality to create, save, load, deploy, and remove packages. The `headers.spl.package` object stores package metadata and configuration information throughout the package lifecycle.

## Headers.spl.package Properties

### Core Package Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | String | The name of the package (typically the filename without extension) |

### Property Details

#### name
- **Purpose**: Identifies the package within the workspace
- **Source**: Derived from the package filename during creation
- **Usage**: Used as a reference key for package operations
- **Example**: For package file `myapp.json`, the name would be `myapp`

## Package Object Structure

The complete package object structure in the workspace:

```javascript
{
  headers: { 
    spl: { 
      package: { 
        name: "package-name"
      } 
    } 
  },
  value: {
    // Package contents as key-value pairs
    // Keys are file/directory paths
    // Values are file contents or {} for directories
    "path/to/file.js": "file contents...",
    "path/to/directory/": {},
    "another/file.txt": "more contents..."
  }
}
```

## Package API Methods

### Core Package Operations

| Method | Purpose | Headers Usage |
|--------|---------|---------------|
| [`create`](../modules/spl/package/create.js) | Creates a new package from existing install | Sets `headers.spl.package.name` |
| [`save`](../modules/spl/package/save.js) | Saves package to filesystem | Reads package using workspace reference |
| [`load`](../modules/spl/package/load.js) | Loads package from filesystem | Loads entire package object including headers |
| [`deploy`](../modules/spl/package/deploy.js) | Deploys package to target location | Reads package contents from workspace |
| [`remove`](../modules/spl/package/remove.js) | Removes package from install | Uses package contents to determine removal targets |

## Package Creation Process

### Initialization
Located in [`create.js:15`](../modules/spl/package/create.js:15)

```javascript
const packageRef = `spl/package.${spl.fURI(requestArgs.file)}`;
spl.wsSet(input, packageRef, { 
    headers: { spl: { package: { name: requestArgs.file } } }, 
    value: {} 
});
```

**Process Flow:**
1. Parse location arguments using `setLocation()`
2. Create workspace reference with package name in headers
3. Iterate through source directory structure
4. Store file contents and directory markers in `value` object

### Directory Iteration
The create process recursively scans directories:

```javascript
function iterateDir(dirPath) {
    var contents = package.dirContents(package.path(cwd, repo, dirPath));
    if (contents.length === 0) {
        packageContents[`${dirPath}/`] = {}; // Empty directory marker
    } else {
        for (var i = 0; i < contents.length; i++) {
            var currentPath = `${dirPath}/${contents[i]}`;
            if (package.isFile(package.path(cwd, repo, currentPath))) {
                packageContents[currentPath] = package.getFile(input, spl, package.path(cwd, repo, currentPath));
            } else {
                iterateDir(currentPath); // Recursive directory scan
            }
        }   
    }
}
```

## Location Processing

### setLocation() Function
Located in [`package.js:51`](../modules/spl/package/package.js:51)

The package API uses flexible location specification:

**Input Formats:**
- **Array**: `[repo, dir, file]`
- **String URI**: `"apps/myapp/data/config.json"`
- **Object with path**: `{path: [repo, dir, file]}`
- **Object with uri**: `{uri: "apps/myapp/data/config.json"}`

**Processing Logic:**
```javascript
// String URI parsing
if (("apps data packages").includes(uri[0])) {
    location.repo = uri.slice(0,2).join("/");
    location.dir = uri.slice(2).join("/");
} else if (uri[2] === "data") {
    location.repo = uri.slice(0,3).join("/");
    location.dir = uri.slice(3).join("/");
} else if (uri[3] === "data") {
    location.repo = uri.slice(0,4).join("/");
    location.dir = uri.slice(4).join("/");
} else {
    location.repo = uri.join("/");
    location.dir = "";
}
```

## Package Storage Format

### File Structure
Packages are stored as JSON files containing the complete package object:

```json
{
  "headers": {
    "spl": {
      "package": {
        "name": "example-package"
      }
    }
  },
  "value": {
    "modules/mymodule.js": "module.exports = function() { ... };",
    "data/config.json": "{ \"setting\": \"value\" }",
    "scripts/": {},
    "scripts/deploy.sh": "#!/bin/bash\necho 'Deploying...'"
  }
}
```

### Workspace References
Packages are referenced in the workspace using the pattern:
```javascript
const packageRef = `spl/package.${spl.fURI(packageName)}`;
```

## Package Operations

### Save Operation
Located in [`save.js`](../modules/spl/package/save.js)

**Process:**
1. Parse target location
2. Create target directory structure
3. Write package JSON to filesystem
4. Use asynchronous file operations

### Load Operation
Located in [`load.js`](../modules/spl/package/load.js)

**Process:**
1. Parse source location
2. Read package JSON from filesystem
3. Parse and store in workspace with original headers

### Deploy Operation
Located in [`deploy.js`](../modules/spl/package/deploy.js)

**Process:**
1. Parse target location
2. Iterate through package contents
3. Create directory structure
4. Write individual files to target locations

### Remove Operation
Located in [`remove.js`](../modules/spl/package/remove.js)

**Process:**
1. Parse target location
2. Read package contents from workspace
3. Remove directories and files recursively

## Utility Functions

### File System Operations
Located in [`package.js`](../modules/spl/package/package.js)

| Function | Purpose | Usage |
|----------|---------|-------|
| `addDir()` | Creates directory structure | Used during save and deploy |
| `dirContents()` | Lists directory contents | Used during package creation |
| `getFile()` | Reads file contents | Used during package creation |
| `putFile()` | Writes file contents | Used during save and deploy |
| `removeDir()` | Removes directory tree | Used during package removal |
| `isFile()` | Checks if path is file | Used during directory iteration |
| `path()` | Creates proper file paths | Used throughout for path construction |

### Location Utilities
- **`setLocation()`**: Normalizes various location input formats
- **Path parsing**: Handles different repository and directory structures
- **URI processing**: Converts string URIs to structured location objects

## API Arguments

The package API accepts these arguments defined in [`package_arguments.json`](../modules/spl/package_arguments.json):

| Argument | Alias | Type | Description |
|----------|-------|------|-------------|
| `help` | `h` | Boolean | Show help information |
| `repo` | `r` | String | Repository of package source |
| `dir` | `d` | String | Directory of package source |
| `file` | `f` | String | Filename of package source |
| `path` | `p` | Array | Path as 3 space-delimited parts |
| `uri` | `u` | String | Path in URI format |

## Integration with Other APIs

### Execute API Integration
Package operations integrate with the execute API through standard completion:
```javascript
spl.completed(input);
```

### File System Integration
The package API provides a layer over Node.js file system operations:
- Synchronous operations for reading during creation
- Asynchronous operations for writing during save/deploy
- Recursive directory operations for complex package structures

## Error Handling

The package API includes error handling for:
- File system access errors
- Invalid location specifications
- Missing package references
- Directory creation failures

## Best Practices

1. **Location Specification**: Use consistent location formats across operations
2. **Package Naming**: Use descriptive package names that reflect content
3. **Directory Structure**: Maintain logical directory hierarchies in packages
4. **File Paths**: Use forward slashes for cross-platform compatibility
5. **Workspace Management**: Clean up package references when no longer needed

## Related Files

- [`modules/spl/package/package.js`](../modules/spl/package/package.js) - Core package utility functions
- [`modules/spl/package/create.js`](../modules/spl/package/create.js) - Package creation with header initialization
- [`modules/spl/package/save.js`](../modules/spl/package/save.js) - Package persistence to filesystem
- [`modules/spl/package/load.js`](../modules/spl/package/load.js) - Package loading from filesystem
- [`modules/spl/package/deploy.js`](../modules/spl/package/deploy.js) - Package deployment to target locations
- [`modules/spl/package/remove.js`](../modules/spl/package/remove.js) - Package removal from installations
- [`modules/spl/package_arguments.json`](../modules/spl/package_arguments.json) - Package API argument definitions