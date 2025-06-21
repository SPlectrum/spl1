# SPlectrum Platform Core - spl1 Iteration

SPlectrum is a modular execution platform designed for Linux environments, providing a comprehensive framework for building and deploying applications through a command-based architecture.

**spl1 Transition Repository**: This iteration focuses on repository restructure, external install workflows, and core API enhancements. See [Federated Monorepo Design](./docs/architecture/federated-monorepo-design.md) for transition strategy and [Phase-Based Development Strategy](./docs/workflows/phase-based-development-strategy.md) for implementation approach.

## Quick Start

Execute commands using the SPL execution system:

```bash
# Basic command execution
./spl_execute <install-folder> <app-name> <module/api/method> [options] [arguments]

# Examples
./spl_execute spl test-suite spl/console/log "Hello World"
./spl_execute spl watcher tools/git/status --repo data/project
./spl_execute spl boot usr/create_linux_installer
```

**Debug Mode**: Add `-d` flag for detailed execution information.

## Core Architecture

SPlectrum consists of several key components:

- **Execution Layer** (`modules/spl/execute/`) - Pipeline management with TTL protection and status-based routing
- **Data Layer** (`modules/spl/data/`) - Immutable Kafka-like record storage using file directory structures  
- **Package Management** (`modules/spl/package/`) - Complete lifecycle management for deployment packages
- **Application Framework** (`modules/spl/app/`) - Command parsing and application lifecycle management
- **Tool Wrappers** (`modules/tools/`) - Git, 7zip, and extensible tool integration framework

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
- Container deployments with Podman integration
- Qubes OS security-first environments

## Getting Started

1. **Execute your first command**:
   ```bash
   ./spl_execute spl test-suite spl/console/log "Getting started with SPlectrum"
   ```

2. **Explore available commands**:
   ```bash
   ./spl_execute spl test-suite --help
   ./spl_execute spl watcher spl/console/log --help
   ```

3. **Check system status**:
   ```bash
   ./spl_execute spl watcher tools/git/status --repo .
   ```

## Development

For developers working on SPlectrum:
- **AI Development**: See [CLAUDE.md](./CLAUDE.md) for uppercase keyword workflow triggers
  - **SESSION_START** - Time tracking and session initiation
  - **GITHUB_WORKFLOW** - Project management with Backlog → Staged → Planned → Active workflow
  - **GIT_WORKFLOW** - Branching and commit workflows
  - **OPERATIONAL_RULES** - Development rules framework
  - **ESSENTIAL_COMMANDS** - Core SPL execution commands
  - **RELEASE_PROCESS** - GitHub release creation
- Read [How to](./docs/guides/how-to.md) for essential development guidelines
- Review [Branching Strategy](./docs/workflows/branching-strategy.md) for simplified GitHub Flow with TDD workflow
- See [Implementing New API](./docs/guides/implementing-new-api.md) for creating new modules
- Review [Execute API Properties](./docs/api/execute-api-properties.md) for execution context details

## Documentation

### Essential Guides
- [spl1 Epics Overview](./docs/management/spl1-epics-overview.md) - Seven major work blocks for spl1 transition
- [Prerequisites](./docs/reference/prerequisites.md) - System requirements and dependency setup
- [Installation Guide](./INSTALL.md) - Installing SPlectrum from distributed release archive
- [Project Overview](./docs/architecture/project-overview.md) - Architecture, components, and core concepts
- [How to](./docs/guides/how-to.md) - Essential development and usage guidelines
- [Creating New Apps](./docs/guides/creating-new-apps.md) - Complete guide for building applications
- [Implementing New API](./docs/guides/implementing-new-api.md) - Guide for creating new modules
- [App Development](./docs/guides/app-development.md) - Application development patterns and workflows
- [Release and Install Process](./docs/guides/release-and-install-process.md) - Comprehensive release and deployment guide
- [Current Development Process](./docs/guides/current-development-process.md) - Current development workflow and process

### Development Workflows
- [Branching Strategy](./docs/workflows/branching-strategy.md) - Simplified GitHub Flow with integrated TDD
- [Phase-Based Development Strategy](./docs/workflows/phase-based-development-strategy.md) - PRINCE2-inspired approach to roadmap execution
- [Phase-Based Implementation Guide](./docs/workflows/phase-based-implementation-guide.md) - Step-by-step guide for daily workflow
- [Code Quality Patterns](./docs/workflows/code-quality-patterns.md) - Critical coding standards and anti-patterns
- [Testing Frameworks](./docs/workflows/testing-frameworks.md) - Comprehensive testing methodologies
- [Operational TDD Framework](./docs/workflows/operational-tdd-framework.md) - Process quality testing methodology

### API Documentation  
- [Execute API Properties](./docs/api/execute-api-properties.md) - Execution context and pipeline properties
- [Package API Properties](./docs/api/package-api-properties.md) - Package management system
- [7zip Command Line API](./docs/api/7zip-command-line-api.md) - Archive management wrapper
- [spl Package API Analysis](./docs/api/spl-package-api-analysis.md) - Package system analysis
- [API Status](./docs/api/api-status.md) - Current API implementation status

### System Architecture
- [Project Overview](./docs/architecture/project-overview.md) - Architecture, components, and core concepts
- [Federated Monorepo Design](./docs/architecture/federated-monorepo-design.md) - Future distributed API architecture
- [Container Unified Entity Strategy](./docs/architecture/container-unified-entity-strategy.md) - Container-based registry and distribution vision
- [spl Data Layer](./docs/architecture/spl-data-layer.md) - Immutable data storage design
- [Schema and Repo Notes](./docs/architecture/schema-and-repo-notes.md) - Data structure design notes
- [Container Registry Strategy](./docs/architecture/container-registry-strategy.md) - Container distribution strategy
- [SE1 Container Engine Architecture](./docs/architecture/se1-container-engine-architecture.md) - Container engine design

### External Integrations
- [AVRO Service Definitions for SPlectrum Communication](./docs/integration/avro-service-definitions-communication.md) - Type-safe distributed communication
- [AVRO Schema Architecture](./docs/integration/avro-schema-architecture.md) - Schema design and evolution
- [AVRO Queue-Folder Service Design](./docs/integration/avro-queue-folder-service-design.md) - Message processing service
- [BARE Minimal Dependency Architecture](./docs/integration/bare-minimal-dependency-architecture.md) - Lightweight serialization approach
- [Qubes OS Overview](./docs/integration/qubes-os-overview.md) - Security-focused operating system fundamentals
- [Qubes OS Integration with SPlectrum](./docs/integration/qubes-splectrum-integration.md) - Security-first development environments
- [PRINCE2 Integration Approach](./docs/integration/prince2-integration-approach.md) - Lightweight project management methodology
- [ITIL Integration Approach](./docs/integration/itil-integration-approach.md) - Service management for platform evolution

### Project Management & Knowledge
- [Decision Log](./docs/management/decision-log.md) - Key architectural and process decisions
- [Lessons Learned](./docs/knowledge/lessons-learned.md) - Accumulated project insights
- [GitHub Project Setup](./docs/management/github-project-setup.md) - Project management configuration
- [Versioning Strategy](./docs/management/versioning-strategy.md) - Version management approach

### Technical Specifications & References
- [Quick Reference](./docs/reference/quick-reference.md) - Essential commands and patterns
- [Boot App Functionality](./docs/reference/boot-app-functionality.md) - Release and deployment operations
- [Test App Development](./docs/reference/test-app-development.md) - Testing application patterns
- [Node Dependency Audit](./docs/reference/node-dependency-audit.md) - Dependency management analysis

## Claude Code Operational Documentation

**SPlectrum Innovation**: AI-assisted development with systematic workflow automation and process validation. This operational framework represents a new approach to development workflow management through Claude Code integration.

### **Core Operational Framework**
- **[CLAUDE.md](./CLAUDE.md)** - Main operational interface with workflow triggers and mandatory rules
- **[Claude Directory](./claude/)** - Complete operational support infrastructure

### **Development Workflow Automation** (`claude/workflows/`)
**Session Management:**
- **[SESSION_START.md](./claude/workflows/SESSION_START.md)** - Session initialization and system checks
- **[SESSION_END.md](./claude/workflows/SESSION_END.md)** - Session termination and cleanup procedures

**Version Lifecycle Management:**
- **[RELEASE_PROCESS.md](./claude/workflows/RELEASE_PROCESS.md)** - GitHub release creation and version closure
- **[VERSION_TRANSITION.md](./claude/workflows/VERSION_TRANSITION.md)** - Knowledge processing and repository cleanup between versions
- **[NEW_VERSION_PLANNING.md](./claude/workflows/NEW_VERSION_PLANNING.md)** - Project setup, epic selection, and work breakdown for new versions

**Development Operations:**
- **[GIT_WORKFLOW.md](./claude/workflows/GIT_WORKFLOW.md)** - Branch management and commit procedures with audit integration
- **[GITHUB_WORKFLOW.md](./claude/workflows/GITHUB_WORKFLOW.md)** - Project management and issue tracking automation
- **[OPERATIONAL_RULES.md](./claude/workflows/OPERATIONAL_RULES.md)** - Core behavioral rules and compliance requirements

**Work Management:**
- **[PLANNED_VS_UNPLANNED.md](./claude/workflows/PLANNED_VS_UNPLANNED.md)** - Work categorization and branch management strategy
- **[NEXT_ISSUE.md](./claude/workflows/NEXT_ISSUE.md)** - Intelligent work prioritization and recommendation system
- **[PROJECT_AUTOMATION.md](./claude/workflows/PROJECT_AUTOMATION.md)** - GitHub Projects v2 automation and field management

**System Integration:**
- **[ESSENTIAL_COMMANDS.md](./claude/workflows/ESSENTIAL_COMMANDS.md)** - Core SPL platform commands and usage patterns
- **[WORKFLOW_RECOMMENDATION.md](./claude/workflows/WORKFLOW_RECOMMENDATION.md)** - AI-driven workflow optimization and suggestion system
- **[KEYWORD_REGISTRY.md](./claude/workflows/KEYWORD_REGISTRY.md)** - Complete trigger system and workflow integration registry

### **Operational Guidance & Decision Frameworks** (`claude/operational-docs/`)
**Session Continuity:**
- **[persistent-todo-list.md](./claude/operational-docs/persistent-todo-list.md)** - Cross-session task continuity and discussion topics

**Project Management Intelligence:**
- **[project-decision-framework.md](./claude/operational-docs/project-decision-framework.md)** - AI-driven "what next" decision making with kanban optimization
- **[project-api-research-findings.md](./claude/operational-docs/project-api-research-findings.md)** - GitHub Projects v2 API capabilities and automation constraints

**Documentation Strategy:**
- **[docs-organization-strategy.md](./claude/operational-docs/docs-organization-strategy.md)** - Systematic documentation organization with concise overview approach leveraging AI for details

### **Workflow Execution Tracking** (`claude/audit/`)
**Real-Time Accountability:**
- **[current/current.log](./claude/audit/current/current.log)** - Live workflow execution tracking with structured audit format
- **Archived Session Logs** - Historical workflow execution records for analysis and learning

**Audit Architecture:**
- **Enhanced Entry Format**: `timestamp|workflow|action|domains|files|description` with append marker system
- **Workflow Accountability**: Every workflow step logged for completeness verification
- **Session Recovery**: Incomplete workflow detection and recovery capabilities

### **Automation & Validation Tools** (`claude/tools/`)
**Operational TDD Framework** (Planned - [Issue #73](https://github.com/SPlectrum/spl1/issues/73)):
- **Validators**: Workflow completeness, compliance checking, file integrity validation
- **Monitors**: Operational health monitoring, environment state validation  
- **Diagnostics**: Workflow issue detection, session state analysis
- **Recovery**: Automated session recovery and state restoration tools

### **Key Operational Innovations**

**1. Workflow Trigger System**
- **Natural Language Triggers**: `start sesame`, `git sesame`, `version planning sesame`
- **Automated Documentation Reading**: Claude reads relevant workflow docs before execution
- **Context-Aware Execution**: Workflows adapt based on repository state and history

**2. Process Quality Validation**
- **Operational TDD**: Testing development processes with same rigor as application code
- **Compliance Monitoring**: Automated validation of mandatory operational rules
- **Workflow Completeness**: Systematic verification that workflows executed fully

**3. Institutional Knowledge Management**
- **Audit-Driven Learning**: Workflow execution history drives process improvements
- **Cross-Session Continuity**: Persistent state and task management across development sessions
- **Decision Intelligence**: AI-driven work prioritization and context-aware recommendations

**4. Systematic Development Lifecycle**
- **Complete Version Management**: End-to-end version lifecycle from development through release to planning
- **Branch Policy Enforcement**: Automated branch state management and compliance checking
- **Integration Workflows**: Seamless integration between development tools and AI assistance

This operational framework transforms development from ad-hoc activities into systematic, validated, and continuously improving workflows while maintaining developer productivity and creativity.
