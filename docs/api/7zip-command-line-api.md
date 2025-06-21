[← Home](../README.md)

# 7zip Command Line API Reference

## Introduction

The 7zip command line tool provides a comprehensive API for archive operations through command line interface. This document covers the complete argument structure, commands, and switches available for automation and scripting purposes.

**Related**: See [7zip API Methods](7zip-api-methods.md) for the SPlectrum wrapper implementation that uses these commands.

## Basic Syntax

```
7z <command> [<switches>...] <archive_name> [<file_names>...] [<@listfiles...>]
```

## Main Commands

### Archive Operations

- **`a`** - Add files to archive
- **`d`** - Delete files from archive  
- **`e`** - Extract files from archive (ignoring paths)
- **`l`** - List contents of archive
- **`t`** - Test integrity of archive
- **`u`** - Update files in archive
- **`x`** - Extract files with full paths

### Basic Command Examples

```bash
7z a archive.7z file1.txt file2.txt    # Create archive
7z x archive.7z                        # Extract with paths
7z e archive.7z                        # Extract without paths
7z l archive.7z                        # List contents
7z t archive.7z                        # Test archive
```

## Common Switches

### Compression & Format Options

- **`-t<type>`** - Archive type (7z, zip, tar, etc.)
- **`-mx<level>`** - Compression level (0-9, 0=store, 9=ultra)
- **`-m<method>`** - Compression method

### Output Control

- **`-o<dir>`** - Output directory
- **`-y`** - Assume Yes on all queries
- **`-so`** - Write to stdout
- **`-si`** - Read from stdin

### Password & Encryption

- **`-p<password>`** - Set password
- **`-mhe`** - Encrypt file names
- **`-mhc=on`** - Compress headers

### File Selection

- **`-r`** - Recurse subdirectories
- **`-x<file>`** - Exclude files
- **`-i<include>`** - Include files
- **`-spf`** - Use fully qualified file paths

### Advanced Options

- **`-v<size>`** - Create volumes of specified size
- **`-sfx`** - Create self-extracting archive
- **`-w<dir>`** - Set working directory
- **`-ssc`** - Set sensitive case mode

## Practical Examples

### Creating Archives

```bash
# Create 7z archive with maximum compression
7z a -t7z -mx9 archive.7z folder/

# Create password-protected zip
7z a -tzip -p"mypassword" secure.zip files/

# Create archive excluding certain files
7z a archive.7z folder/ -x!*.tmp -x!*.log

# Create self-extracting archive
7z a -sfx archive.exe folder/
```

### Extracting Archives

```bash
# Extract to specific directory
7z x archive.7z -o"/tmp/extracted/"

# Extract with password
7z x secure.zip -p"mypassword"

# Extract specific files only
7z x archive.7z file1.txt file2.txt
```

### Archive Management

```bash
# List archive contents with technical info
7z l -slt archive.7z

# Test archive integrity
7z t archive.7z

# Update archive (add new/changed files only)
7z u archive.7z folder/

# Delete files from archive
7z d archive.7z *.tmp
```

## Supported Archive Formats

- **7z** - 7-Zip's native format
- **zip** - ZIP format
- **tar** - TAR format
- **gzip/gz** - GZIP format
- **bzip2/bz2** - BZIP2 format
- **xz** - XZ format
- **iso** - ISO format

## Return Codes

- **0** - No error
- **1** - Warning (non-fatal error)
- **2** - Fatal error
- **7** - Command line error
- **8** - Not enough memory
- **255** - User stopped the process

## Scripting and Automation

### Batch Operations

```bash
# Process multiple archives
for f in *.zip; do 7z t "$f"; done

# Create daily backup
7z a backup_$(date +%Y%m%d).7z Documents/
```

### Integration with Other Tools

```bash
# Pipe file list to 7zip
ls *.txt | 7z a -si textfiles.7z

# Extract and pipe to another command
7z x archive.7z -so | grep "pattern"
```

## Performance Considerations

- Use `-mx1` for faster compression with larger files
- Use `-mx9` for maximum compression ratio
- Consider `-mmt` switch for multi-threading on multi-core systems
- Use volume splitting (`-v`) for large archives

## Common Use Cases

1. **Automated Backups**: Regular compression of directories with exclusion patterns
2. **CI/CD Pipelines**: Creating deployment packages with specific compression settings
3. **File Distribution**: Creating self-extracting archives for easy deployment
4. **Archive Maintenance**: Testing and updating existing archives programmatically

The 7zip command line tool provides extensive functionality for archive operations and integrates well with scripting environments and automation workflows.