# SPlectrum Platform Core

SPlectrum is a modular execution platform designed for Linux environments, providing a comprehensive framework for building and deploying applications through a command-based architecture.

## Quick Start

Execute commands using the SPL execution system:

```bash
# Basic command execution
./spl_execute <app-name> <module/api/method> [options] [arguments]

# Examples
./spl_execute test-suite spl/console/log "Hello World"
./spl_execute watcher tools/git/status --repo data/project
./spl_execute boot usr/create_linux_installer
```

**Debug Mode**: Add `-d` flag for detailed execution information.

## Core Architecture

SPlectrum consists of several key components:

- **Execution Layer** (`modules/spl/execute/`) - Pipeline management with TTL protection and status-based routing
- **Data Layer** (`modules/spl/data/`) - Immutable Kafka-like record storage using file directory structures  
- **Package Management** (`modules/spl/package/`) - Complete lifecycle management for deployment packages
- **Application Framework** (`modules/spl/app/`) - Command parsing and application lifecycle management
- **Tool Wrappers** (`modules/tools/`) - Git and 7zip command-line tool integration

## Available Apps

- **test-suite** - Core platform testing and validation
- **test-spl-app** - spl/app API testing (JavaScript script execution)
- **test-tools-git** - Git API testing and validation
- **test-tools-7zip** - 7zip API testing and validation
- **test-boot** - Boot app functionality testing
- **watcher** - Development and monitoring tools
- **boot** - Release and deployment operations  
- **model** - Template for creating new apps

## Linux-Only Design

SPlectrum is built exclusively for Linux environments:
- Native Linux distributions
- WSL2 (Windows Subsystem for Linux)
- Container deployments (planned)

## Getting Started

1. **Execute your first command**:
   ```bash
   ./spl_execute test-suite spl/console/log "Getting started with SPlectrum"
   ```

2. **Explore available commands**:
   ```bash
   ./spl_execute test-suite --help
   ./spl_execute watcher spl/console/log --help
   ```

3. **Check system status**:
   ```bash
   ./spl_execute watcher tools/git/status --repo .
   ```

## Development

For developers working on SPlectrum:
- Read [How to](./docs/how-to.md) for essential development guidelines
- See [Development Workflow Strategy](./docs/development-workflow-strategy.md) for AI-assisted development approach
- See [Implementing New API](./docs/implementing-new-api.md) for creating new modules
- Review [Execute API Properties](./docs/execute-api-properties.md) for execution context details

## Documentation

### Essential Guides
- [Prerequisites](./docs/prerequisites.md) - System requirements and dependency setup
- [Installation Guide](./INSTALL.md) - Installing SPlectrum from distributed release archive
- [Project Overview](./docs/project-overview.md) - Architecture, components, and core concepts
- [How to](./docs/how-to.md) - Essential development and usage guidelines
- [App Development](./docs/app-development.md) - Application development patterns and workflows
- [Code Quality Patterns](./docs/code-quality-patterns.md) - Critical coding standards and anti-patterns
- [Testing Frameworks](./docs/testing-frameworks.md) - Comprehensive testing methodologies
- [Creating New Apps](./docs/creating-new-apps.md) - Complete guide for building applications
- [Implementing New API](./docs/implementing-new-api.md) - Guide for creating new modules
- [Creating a Release](./docs/creating-a-release.md) - Release process and deployment
- [Future Development](./docs/future-development.md) - Roadmap and planned improvements

### API Documentation  
- [Execute API Properties](./docs/execute-api-properties.md) - Execution context and pipeline properties
- [Package API Properties](./docs/package-api-properties.md) - Package management system
- [git API Methods](./docs/git-api-methods.md) - Git wrapper implementation
- [7zip API Methods](./docs/7zip-api-methods.md) - Archive management wrapper
- [App API Properties](./docs/app-api-properties.md) - Application framework properties

### System Architecture
- [Boot App Functionality](./docs/boot-app-functionality.md) - Release and deployment operations
- [spl Data Layer](./docs/spl-data-layer.md) - Immutable data storage design
- [Schema and Repo Notes](./docs/schema-and-repo-notes.md) - Data structure design notes
- [Federated Monorepo Design](./docs/federated-monorepo-design.md) - Future distributed API architecture
- [Subdirectory CLAUDE.md Evolution Plan](./docs/subdirectory-claude-md-plan.md) - Federated AI guidance architecture
- [PRINCE2 Integration Approach](./docs/prince2-integration-approach.md) - Lightweight project management methodology
- [ITIL Integration Approach](./docs/itil-integration-approach.md) - Service management for platform evolution

### Tool References
- [7zip Command Line API](./docs/7zip-command-line-api.md) - Raw 7zip command reference
- [spl Package API Analysis](./docs/spl-package-api-analysis.md) - Package system analysis

## Project Status

**Current Version**: Core platform with essential functionality
**Target**: MVP for application development by version 1.0
**Platform**: Linux-first design with WSL support
