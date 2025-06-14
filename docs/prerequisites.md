# SPlectrum Prerequisites and Setup Requirements

This document outlines all prerequisites for both using SPlectrum and developing with it (including AI-assisted development like Claude Code).

## System Requirements

### Operating System
- **Primary**: Linux distributions (Ubuntu, Debian, CentOS, RHEL, Fedora, etc.)
- **Secondary**: WSL2 (Windows Subsystem for Linux)
- **Architecture**: x86_64 (x64) - ARM64/ARM support planned
- **Design**: Linux-first architecture - Windows native support not available

### Hardware Requirements
- **RAM**: Minimal requirements (standard Node.js footprint)
- **Disk**: ~50MB for core installation, additional space for applications
- **Network**: Internet access required for GitHub integration and package downloads

## Required Dependencies (End Users)

### 1. Node.js Runtime (CRITICAL)
- **Version**: v14+ required, v18+ recommended
- **Purpose**: Core runtime for all SPlectrum operations
- **Installation**:
  ```bash
  # Ubuntu/Debian
  sudo apt update && sudo apt install nodejs npm
  
  # CentOS/RHEL/Fedora
  sudo dnf install nodejs npm
  
  # From NodeSource (latest versions)
  curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```
- **Verification**: `node --version` (should show v14+)

### 2. 7-Zip (REQUIRED)
- **Purpose**: Archive management via `tools/7zip` API (extract, create, list, test operations)
- **Executable**: `7z` must be available in system PATH
- **Installation**:
  ```bash
  # Ubuntu/Debian
  sudo apt install p7zip-full
  
  # CentOS/RHEL/Fedora
  sudo dnf install p7zip p7zip-plugins
  ```
- **Verification**: `7z --help`

### 3. Git (REQUIRED)
- **Purpose**: Version control operations via `tools/git` API
- **Installation**:
  ```bash
  # Ubuntu/Debian
  sudo apt install git
  
  # CentOS/RHEL/Fedora
  sudo dnf install git
  ```
- **Verification**: `git --version`

### 4. Bash (REQUIRED)
- **Purpose**: Shell script execution via `spl/app/run`
- **Installation**: Typically pre-installed on Linux systems
- **Verification**: `bash --version`

### 5. Python 3 (OPTIONAL)
- **Purpose**: Execute `.py` scripts via `spl/app/run`
- **Installation**:
  ```bash
  # Ubuntu/Debian
  sudo apt install python3
  
  # CentOS/RHEL/Fedora
  sudo dnf install python3
  ```
- **Verification**: `python3 --version`

## Development Setup (AI-Assisted Development)

### All End User Dependencies PLUS:

### GitHub Integration Tools (REQUIRED)

#### 1. GitHub CLI (`gh`)
- **Purpose**: Create releases, manage PRs, issues, and GitHub operations
- **Critical for**: Release creation, PR management, repository operations
- **Installation**:
  ```bash
  # Ubuntu/Debian
  sudo apt install gh
  # or from GitHub's official repository:
  curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
  sudo apt update && sudo apt install gh
  
  # CentOS/RHEL/Fedora
  sudo dnf install gh
  ```
- **Setup**: `gh auth login` (authenticate with GitHub)
- **Verification**: `gh --version`

#### 2. GitHub Actions Integration
- **Purpose**: Automated workflows (Claude Code Review, PR Assistant)
- **Requirements**: Repository must have GitHub Actions enabled
- **Workflows**: `.github/workflows/` directory with workflow files
- **Permissions**: Repository admin access to configure workflows

### Advanced Development Tools (REQUIRED for Claude Code)

#### 1. Ripgrep (`rg`)
- **Purpose**: Fast text search across codebase (preferred over grep)
- **Installation**:
  ```bash
  # Ubuntu/Debian
  sudo apt install ripgrep
  
  # CentOS/RHEL/Fedora
  sudo dnf install ripgrep
  ```
- **Verification**: `rg --version`

#### 2. Standard Unix Tools
- **Purpose**: File operations, text processing, system commands
- **Required tools**:
  - `ls` - Directory listing
  - `cat` - File content display
  - `head`, `tail` - File content sampling
  - `find` - File searching (backup to rg)
  - `sed`, `awk` - Text processing
  - `chmod` - Permission management
  - `mkdir`, `rm`, `mv`, `cp` - File operations
- **Installation**: Usually pre-installed on Linux systems

### Development Environment Requirements

#### 1. Git Workflow Capabilities
- **Repository access**: Clone, pull, push permissions
- **Authentication**: SSH keys or HTTPS tokens configured
- **Commit capabilities**: User name and email configured
- **Branch management**: Create, switch, merge, delete branches
- **Configuration**:
  ```bash
  git config --global user.name "Your Name"
  git config --global user.email "your.email@example.com"
  ```

#### 2. File System Access
- **Read/Write permissions**: Full access to repository files
- **Directory operations**: Create, delete, move files and directories
- **Executable permissions**: Run `./spl_execute` and shell scripts
- **Symlink support**: Create and follow symbolic links if needed

#### 3. Command Line Environment
- **Shell access**: Bash or compatible shell (zsh, fish acceptable)
- **PATH configuration**: All dependencies accessible via system PATH
- **Working directory**: Ability to navigate and work from repository root
- **Terminal capabilities**: Support for colored output, cursor positioning

#### 4. Network Requirements
- **Internet access**: Required for GitHub operations, package downloads
- **GitHub connectivity**: Access to github.com, api.github.com
- **Package repositories**: Access to system package repositories (apt, dnf, yum)

### What's NOT Required for Development
- ❌ **No npm/yarn**: No package manager needed for SPlectrum itself
- ❌ **No build tools**: No webpack, babel, rollup, etc.
- ❌ **No test frameworks**: Uses built-in SPL testing system
- ❌ **No linting tools**: No ESLint, Prettier, etc. required
- ❌ **No IDE requirements**: Works with any text editor or IDE
- ❌ **No Docker**: No containerization needed for development
- ❌ **No database**: No external database dependencies
- ❌ **No web server**: No Apache, Nginx, or similar needed

## Installation Verification

### Basic Environment Check
```bash
# Essential dependencies
node --version              # Should show v14.0.0 or higher
7z --help | head -3         # Should show 7-Zip version info
git --version               # Should show git version
bash --version | head -1    # Should show bash version
python3 --version           # Should show Python 3.x (optional)

# Development tools
gh --version                # GitHub CLI version
rg --version                # Ripgrep version

# Test SPlectrum functionality
./spl_execute spl boot spl/console/log "Prerequisites verified!"
```

### GitHub Integration Check
```bash
# Verify GitHub authentication
gh auth status

# Test repository access
gh repo view

# Verify workflow capabilities
gh workflow list
```

## Platform-Specific Installation

### Ubuntu/Debian Complete Setup
```bash
# Update package list
sudo apt update

# Install essential dependencies
sudo apt install nodejs npm p7zip-full git python3 -y

# Install GitHub CLI
sudo apt install gh -y

# Install development tools
sudo apt install ripgrep -y

# Verify installation
node --version && git --version && 7z --help | head -1 && gh --version && rg --version
```

### CentOS/RHEL/Fedora Complete Setup
```bash
# Install essential dependencies
sudo dnf install nodejs npm p7zip p7zip-plugins git python3 -y

# Install GitHub CLI
sudo dnf install gh -y

# Install development tools
sudo dnf install ripgrep -y

# Verify installation
node --version && git --version && 7z --help | head -1 && gh --version && rg --version
```

### WSL2 (Windows Subsystem for Linux)
1. **Install WSL2**: Enable WSL2 feature in Windows
2. **Choose distribution**: Ubuntu 20.04+ or Debian 11+ recommended
3. **Follow Linux steps**: Use Ubuntu/Debian installation commands above
4. **Windows integration**: Ensure WSL2 can access Windows file system if needed
5. **GitHub authentication**: May need to configure credentials for cross-platform access

## Dependency Architecture Analysis

### SPlectrum Core Philosophy
- **Self-contained**: No external package management needed for core functionality
- **System-level dependencies**: Leverages standard Linux tools
- **No build process**: Direct Node.js execution without compilation
- **Bundled libraries**: Required Node.js modules included in release
- **Platform detection**: Automatic adaptation for different environments

### Claude Code Integration Requirements
- **GitHub-centric**: Heavy reliance on GitHub CLI and API
- **Search-optimized**: Requires fast text search capabilities (ripgrep)
- **File-system intensive**: Needs comprehensive file manipulation tools
- **Git-native**: Deep integration with Git workflow and operations
- **Command-line focused**: Designed for terminal-based development

## Minimum Working Environments

### End User Environment
1. **Linux system** (physical, VM, or WSL2)
2. **Node.js v14+**
3. **7-Zip** (`p7zip-full`)
4. **Git**
5. **Bash**

### Development Environment (Claude Code)
1. **All end user requirements**
2. **GitHub CLI** (`gh`) with authentication
3. **Ripgrep** (`rg`) for fast searching
4. **Standard Unix tools**
5. **Network connectivity** to GitHub
6. **Repository permissions** (read/write access)

### Capabilities Enabled
- **Core Operations**: All SPlectrum functionality
- **Archive Management**: Full 7zip API operations
- **Version Control**: Complete Git workflow
- **Script Execution**: JavaScript, bash, Python scripts
- **Release Management**: GitHub release creation and management
- **CI/CD Integration**: GitHub Actions workflows
- **Code Analysis**: Fast searching and file manipulation
- **Documentation**: Comprehensive project documentation

## Next Steps

After installing prerequisites:
1. **For end users**: Follow [Installation Guide](../INSTALL.md) for distributed releases
2. **For developers**: See [How to](./how-to.md) for development workflow
3. **For AI assistance**: Ensure all development tools are properly configured
4. **For understanding**: Review [Project Overview](./project-overview.md) for architecture