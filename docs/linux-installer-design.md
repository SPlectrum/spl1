[← Home](../README.md)

# Linux Installer Design for SPlectrum

This document outlines the design and implementation approach for creating Linux-native installers for the SPlectrum platform, replacing Windows-specific self-extracting archives with cross-platform solutions optimized for Linux environments including WSL.

## Overview

SPlectrum deployment on Linux requires a different approach than Windows self-extracting archives. This design leverages shell scripts and standard Linux tools to provide seamless installation experiences across Linux distributions and WSL environments.

## Design Principles

### 1. **Linux-First Approach**
- Native shell script installers using standard Linux tools
- Leverage existing package managers where appropriate
- WSL compatibility as primary Windows support
- Standard Unix filesystem conventions

### 2. **Minimal Dependencies**
- Use only standard Linux utilities (tar, gzip, bash)
- Avoid requiring specific package managers
- Self-contained installation packages
- No external downloads during installation

### 3. **User-Friendly Installation**
- Single-file installer approach
- Interactive and non-interactive modes
- Clear progress feedback
- Comprehensive error handling

## Installer Architecture

### Self-Extracting Shell Script Pattern

The installer follows the proven shell script + embedded archive pattern:

```bash
#!/bin/bash
# SPlectrum Installer for Linux
# This file contains an embedded archive after the __ARCHIVE__ marker

INSTALL_DIR="${1:-$HOME/SPlectrum}"
TEMP_DIR=$(mktemp -d)

echo "Installing SPlectrum to: $INSTALL_DIR"

# Extract embedded archive
sed '1,/^__ARCHIVE__$/d' "$0" | tar -xzf - -C "$TEMP_DIR"

# Run installation
cd "$TEMP_DIR/spl"
./install.sh "$INSTALL_DIR"

# Cleanup
rm -rf "$TEMP_DIR"
exit 0

__ARCHIVE__
[Binary archive data follows]
```

### Installation Workflow

1. **Extraction Phase**
   - Create temporary directory using `mktemp`
   - Extract embedded archive using `tar`
   - Validate extracted contents

2. **Installation Phase**
   - Execute `install.sh` script from archive
   - Copy files to target directory
   - Set appropriate permissions
   - Create symlinks and shortcuts

3. **Configuration Phase**
   - Set up environment variables
   - Create desktop entries (if applicable)
   - Configure PATH integration

4. **Cleanup Phase**
   - Remove temporary files
   - Report installation status
   - Provide usage instructions

## Implementation Components

### 1. Archive Creation (`tools/package/create-installer`)

New SPL command to create Linux installers:

```bash
./spl_execute boot tools/package/create-installer --archive spl_installer.sh --files ./spl --platform linux
```

**Process:**
- Create installation script header
- Bundle SPlectrum files into tar.gz archive
- Append binary archive to script
- Set executable permissions
- Validate installer integrity

### 2. Installation Script (`spl/install.sh`)

Embedded script within the archive:

```bash
#!/bin/bash
# SPlectrum Installation Script

INSTALL_DIR="$1"
SOURCE_DIR="$(dirname "$0")"

echo "Installing SPlectrum from $SOURCE_DIR to $INSTALL_DIR"

# Create directory structure
mkdir -p "$INSTALL_DIR"/{apps,data,modules,runtime}

# Copy core files
cp -r "$SOURCE_DIR"/* "$INSTALL_DIR/"

# Set permissions
chmod +x "$INSTALL_DIR/spl"
find "$INSTALL_DIR" -name "*.sh" -exec chmod +x {} \;

# Create symlink (optional)
if [ -d "$HOME/.local/bin" ]; then
    ln -sf "$INSTALL_DIR/spl" "$HOME/.local/bin/spl" 2>/dev/null || true
fi

echo "Installation complete!"
echo "Add $INSTALL_DIR to your PATH or use: $INSTALL_DIR/spl"
```

### 3. Installer Header Script

The main installer script that users execute:

```bash
#!/bin/bash
# SPlectrum Platform Installer
# Usage: ./spl_installer.sh [install_directory]

set -e

INSTALL_DIR="${1:-$HOME/SPlectrum}"
TEMP_DIR=""
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Color output support
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

cleanup() {
    if [ -n "$TEMP_DIR" ] && [ -d "$TEMP_DIR" ]; then
        rm -rf "$TEMP_DIR"
    fi
}

trap cleanup EXIT INT TERM
```

## Advanced Features

### 1. **Multi-Architecture Support**

Detect architecture and handle appropriately:

```bash
detect_architecture() {
    ARCH=$(uname -m)
    case "$ARCH" in
        x86_64) ARCH_NAME="x64" ;;
        aarch64|arm64) ARCH_NAME="arm64" ;;
        armv7l) ARCH_NAME="arm" ;;
        *) print_warning "Unknown architecture: $ARCH, using x64 as default"; ARCH_NAME="x64" ;;
    esac
    print_status "Detected architecture: $ARCH_NAME"
}
```

### 2. **Environment Configuration**

Support installation customization through environment variables:

```bash
# Configuration options
SPLATFORM_INSTALL_DIR="${SPLATFORM_INSTALL_DIR:-$HOME/SPlectrum}"
SPLATFORM_CREATE_SYMLINK="${SPLATFORM_CREATE_SYMLINK:-true}"
SPLATFORM_QUIET_INSTALL="${SPLATFORM_QUIET_INSTALL:-false}"
SPLATFORM_SKIP_PATH_SETUP="${SPLATFORM_SKIP_PATH_SETUP:-false}"
```

### 3. **Dependency Checking**

Validate required tools before installation:

```bash
check_dependencies() {
    local deps=("node" "tar" "gzip" "mktemp")
    local missing=()
    
    for cmd in "${deps[@]}"; do
        if ! command -v "$cmd" >/dev/null 2>&1; then
            missing+=("$cmd")
        fi
    done
    
    if [ ${#missing[@]} -gt 0 ]; then
        print_error "Missing required dependencies: ${missing[*]}"
        print_error "Please install them using your system package manager"
        exit 1
    fi
    
    print_status "All dependencies satisfied"
}
```

### 4. **Installation Verification**

Verify successful installation:

```bash
verify_installation() {
    local install_dir="$1"
    
    if [ ! -f "$install_dir/spl" ]; then
        print_error "Installation verification failed: spl executable not found"
        return 1
    fi
    
    if [ ! -x "$install_dir/spl" ]; then
        print_error "Installation verification failed: spl executable not executable"
        return 1
    fi
    
    # Test basic functionality
    if ! "$install_dir/spl" --help >/dev/null 2>&1; then
        print_error "Installation verification failed: spl command test failed"
        return 1
    fi
    
    print_status "Installation verification successful"
    return 0
}
```

### 5. **Uninstall Support**

Generate uninstall script during installation:

```bash
create_uninstaller() {
    local install_dir="$1"
    
    cat > "$install_dir/uninstall.sh" << EOF
#!/bin/bash
# SPlectrum Uninstaller

echo "Removing SPlectrum installation from: $install_dir"

# Remove symlinks
rm -f "\$HOME/.local/bin/spl"

# Remove installation directory
read -p "Delete all SPlectrum files and data? [y/N]: " -n 1 -r
echo
if [[ \$REPLY =~ ^[Yy]$ ]]; then
    rm -rf "$install_dir"
    echo "SPlectrum uninstalled successfully"
else
    echo "Uninstall cancelled"
fi
EOF
    
    chmod +x "$install_dir/uninstall.sh"
    print_status "Uninstaller created at: $install_dir/uninstall.sh"
}
```

## Integration with Current Build Process

### Modified Release Workflow

Replace Windows-specific commands in the release process:

```bash
# Current Windows process (docs/creating-a-release.md)
# 7z a -sfx spl.exe ./spl

# New Linux process
./spl usr/create_linux_installer
```

### Boot App Integration

Add new boot command (`usr/create_linux_installer.js`):

```javascript
// Create Linux installer as part of release process
exports.default = function usr_create_linux_installer(input) {
    // 1. Create installer header script
    // 2. Bundle spl directory into tar.gz
    // 3. Combine header + archive into single executable
    // 4. Set permissions and validate
    
    console.log('Linux installer created: spl_installer.sh');
    spl.completed(input);
}
```

### Release Directory Structure

Update release structure to include Linux installer:

```
release/
├── install/
│   ├── spl_installer.sh      # Linux installer
│   ├── spl.exe               # Windows SFX (legacy)
│   └── checksums.txt         # Integrity verification
```

## Distribution Methods

### 1. **Direct Download**
```bash
# Simple download and execute
curl -fsSL https://install.splectrum.com/linux | bash

# Download and verify
curl -fsSL https://releases.splectrum.com/latest/spl_installer.sh -o spl_installer.sh
chmod +x spl_installer.sh
./spl_installer.sh
```

### 2. **GitHub Releases**
- Attach `spl_installer.sh` to GitHub releases
- Automated builds via GitHub Actions
- Version-specific installers with changelog integration

### 3. **WSL Integration**
```bash
# WSL-specific installation
./spl_installer.sh --wsl-mode
```

Special WSL considerations:
- Windows PATH integration
- Cross-filesystem permissions
- Performance optimization hints

## Security Considerations

### 1. **Checksum Validation**
```bash
validate_archive_integrity() {
    local archive_line=$(grep -n "^__ARCHIVE__$" "$0" | cut -d: -f1)
    local archive_start=$((archive_line + 1))
    
    # Extract and validate embedded checksum
    local expected_sha256="$EMBEDDED_CHECKSUM"
    local actual_sha256=$(tail -n +"$archive_start" "$0" | sha256sum | cut -d' ' -f1)
    
    if [ "$expected_sha256" != "$actual_sha256" ]; then
        print_error "Archive integrity check failed"
        print_error "Expected: $expected_sha256"
        print_error "Actual:   $actual_sha256"
        exit 1
    fi
    
    print_status "Archive integrity verified"
}
```

### 2. **Permission Management**
- User-space installation by default
- Minimal required permissions
- Optional system-wide installation with sudo

### 3. **Temporary File Security**
- Use `mktemp` for secure temporary directories
- Clean up on exit and signal handlers
- Proper umask settings

## Error Handling and Recovery

### 1. **Installation Failures**
```bash
handle_installation_error() {
    local error_code="$1"
    local error_msg="$2"
    
    print_error "Installation failed: $error_msg"
    print_error "Error code: $error_code"
    
    # Cleanup partial installation
    if [ -d "$INSTALL_DIR" ]; then
        print_status "Cleaning up partial installation..."
        rm -rf "$INSTALL_DIR"
    fi
    
    print_error "Installation aborted"
    exit "$error_code"
}
```

### 2. **Recovery Options**
- Automatic cleanup on failure
- Resume capability for interrupted installations
- Backup and restore for upgrades

## Testing Strategy

### 1. **Distribution Testing**
Test across major Linux distributions:
- Ubuntu LTS versions (18.04, 20.04, 22.04)
- CentOS/RHEL 7, 8, 9
- Debian stable
- Alpine Linux
- Amazon Linux 2

### 2. **Installation Scenarios**
- Fresh installation
- Upgrade existing installation
- User vs system-wide installation
- WSL environments
- Low disk space conditions
- Permission restrictions

### 3. **Automated Testing Framework**
```bash
# Test runner script
./test/test_installer.sh --distribution ubuntu:20.04
./test/test_installer.sh --distribution centos:8
./test/test_installer.sh --wsl
./test/test_installer.sh --user-install
./test/test_installer.sh --system-install
```

## Implementation Timeline

### Phase 1: Core Installer
- Self-extracting shell script implementation
- Basic installation functionality
- Integration with existing boot app system
- WSL compatibility

### Phase 2: Enhanced Features
- Multi-architecture support
- Advanced configuration options
- Comprehensive error handling
- Uninstall capability

### Phase 3: Distribution and Testing
- Automated testing framework
- CI/CD integration
- Release automation
- Documentation and examples

## Related Documentation

- [Creating a Release](creating-a-release.md) - Current release process
- [Package API Properties](package-api-properties.md) - Package management system  
- [Boot App Functionality](boot-app-functionality.md) - Release automation
- [7zip API Methods](7zip-api-methods.md) - Archive creation methods

## Conclusion

This Linux-focused installer design provides a robust deployment solution for SPlectrum while maintaining compatibility with WSL environments. The self-extracting shell script pattern offers simplicity and reliability while supporting advanced features like multi-architecture deployment and comprehensive error handling.

The implementation integrates seamlessly with the existing SPL build system and provides a foundation for future enhancements including automated deployment pipelines and advanced distribution methods.

---

[← Home](../README.md)