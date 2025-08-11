# Test Discovery

Pure discovery method - lists operations, tests, schemas, and metadata. Foundation method for all test operations.

## Overview

The `discover` method scans the SPL module structure to identify available operations, test files, schemas, and associated metadata. It serves as the foundation for all test operations by providing comprehensive asset discovery.

## Usage

```bash
./spl_execute <app> test/discover [options]
```

## Parameters

- `--modules` (`-m`): Module pattern to discover (e.g., `gp/*`, `gp/config`, default: `*`)
- `--tests` (`-t`): Test pattern filter (default: `*`)  
- `--schemas` (`-s`): Schema discovery pattern (default: `none`)

## Functionality

- Scans module directories for index.js files (operations)
- Discovers .test directories and their JSON test definitions
- Identifies argument schemas and documentation files
- Creates comprehensive asset inventory with metadata
- Supports glob pattern filtering for targeted discovery

## Discovery Output

The method produces a structured inventory including:

- **Operations**: Available API methods and their file paths
- **Tests**: Test definitions from .test directories
- **Schemas**: Argument schemas and validation files
- **Metadata**: File timestamps, sizes, and relationships

## Integration

Discovery is the first step in the test pipeline:

1. **discover** - Inventory available assets
2. plan - Create work packages from discovered assets
3. execute - Run the planned tests
4. report - Generate test results

## Example

```bash
# Discover all gp/config assets
./spl_execute dev test/discover --modules="gp/config"

# Discover with test filtering
./spl_execute dev test/discover --modules="gp/*" --tests="basic-*"
```