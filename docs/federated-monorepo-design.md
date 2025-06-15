[← Home](../README.md)

# Federated Monorepo Design

## Concept

A hybrid approach combining monorepo benefits with distributed API development - a core platform that dynamically assembles from multiple specialized API repositories.

## Architecture Vision

### Transition Strategy: Single-Concern Folders → Federated Repositories

**Phase 1 (spl1)**: Reorganize current monorepo into single-concern folders
```
spl1/
├── core/           # Execution engine, data layer, packages  
├── apps/           # Applications (boot, test-suite, watcher)
├── tools/          # External tool integrations (git, 7zip)
└── docs/           # Centralized documentation
```

**Architectural Notes**:
- spl1 is a transitional repository (like spl0) focused on restructuring for future federation
- The top-level repository serves as orchestrator for domain-specific components
- Initial structure is hierarchical but may evolve based on learning from implementation
- Core API migration to "bare" (minimal, pure API) design is prioritized during this phase

**Phase 2**: Extract into domain-specific repositories  
```
spl-core/           # Execution engine, data layer, packages
├── CLAUDE.md       # Core platform patterns
├── modules/spl/    # Core APIs
└── docs/

spl-apps/           # Applications (boot, test-suite, watcher)
├── CLAUDE.md       # App development patterns  
├── apps/           # Individual applications
└── docs/

spl-tools/          # External tool integrations
├── CLAUDE.md       # Tool integration patterns
├── modules/tools/  # Git, 7zip, etc.
└── docs/
```

**Phase 3**: Full federated API architecture with per-API repositories

### Benefits of Domain Separation

**Efficiency Gains**:
- Faster file searches and navigation in smaller codebases
- Focused CLAUDE.md files with domain-specific guidance
- Reduced cognitive overhead from irrelevant context
- Better tool performance on smaller file sets

**Context Management**:
- Clear domain boundaries and responsibilities
- Single domain expertise per repository
- Reduced risk of applying wrong patterns across domains
- Easier maintenance of specialized knowledge

**AI Development Benefits**:
- Interactive mode for complex cross-domain work
- Autonomous mode for routine domain-specific tasks
- Deep specialized context builds over time per domain
- Parallel work streams possible across domains

### Final Target: Core Platform Repository (`spl-platform`)
```
spl-platform/
├── core/                    # Execution engine, spl.js functions, data layer
├── apps/                   # Application framework (test-suite, watcher, boot, etc.)
├── docs/                   # Platform documentation
├── api-registry.json       # Central registry mapping APIs to repositories
├── api-loader/             # Dynamic API integration system
└── release/                # Core platform releases
```

### Distributed API Repositories
```
spl-git-api/               # tools/git implementation
├── methods/               # All git method implementations
├── git.js                 # Auxiliary functions
├── api-manifest.json      # Version, dependencies, install specs
└── docs/                  # API-specific documentation

spl-7zip-api/              # tools/7zip implementation
spl-database-api/          # Future database operations
spl-kubernetes-api/        # Future container orchestration
spl-custom-tool-api/       # Third-party extensions
```

## Refined Architecture Strategy

### Two-Type Context Architecture

Based on analysis of repository needs, the federated architecture should distinguish between two fundamental context types:

**Execution Contexts** (Active Development Environments):
- Powered by SPlectrum engines providing specialized development runtime
- Rich, domain-specific CLAUDE.md files with development workflows
- Tool configurations, coding patterns, and debugging approaches
- Optimized for productive development work

**Data Catalogs** (Package Storage and Registry):
- Single-concern focused packages with embedded documentation and test suites
- Self-contained units with independent lifecycle management  
- Minimal operational CLAUDE.md files for maintenance and organization
- Optimized for storage, discovery, and deployment

### Parallel Architecture Migration Strategy

Rather than reorganizing existing structure, implement a **parallel architecture approach**:

1. **New Folders Alongside Existing**: Build future architecture while current system continues operating
2. **Deprecation Pathway**: Gradual migration of functionality to new architecture  
3. **Validation Phase**: Old folders deprecated only when new system proves stable
4. **Zero Disruption**: Current `modules/`, `release/` etc. remain functional during transition

This creates a much safer migration path than big-bang reorganization, allowing:
- Continuous operation during restructure
- Incremental validation of new architecture
- Risk mitigation through parallel systems
- Natural evolution rather than forced migration

### SPlectrum Engines as Development Runtime

SPlectrum engines become the **development runtime layer** that powers execution contexts:
- Provide specialized development environments per context type
- Enable engine-driven tooling, workflows, and capabilities
- Create truly isolated, optimized development experiences
- Support both autonomous and interactive development modes

## Key Components

### API Registry (`api-registry.json`)
Central manifest defining available APIs and their sources:
```json
{
  "tools/git": {
    "repo": "https://github.com/splectrum/spl-git-api.git",
    "version": "1.2.0",
    "required": true,
    "loadOrder": 1
  },
  "tools/7zip": {
    "repo": "https://github.com/splectrum/spl-7zip-api.git", 
    "version": "0.8.0",
    "optional": true,
    "loadOrder": 2
  }
}
```

### API Manifest (`api-manifest.json`)
Per-repository specification:
```json
{
  "name": "tools/git",
  "version": "1.2.0",
  "splectrum-version": ">=1.0.0",
  "dependencies": [],
  "methods": ["status", "add", "commit", "push", "pull"],
  "install": {
    "target": "modules/tools/git/",
    "commands": ["npm install"]
  }
}
```

### Dynamic API Loader
Core platform functionality to:
- Clone API repositories to temporary locations
- Validate compatibility and dependencies
- Install APIs into the module structure
- Handle version conflicts and updates
- Enable/disable APIs dynamically

## Advantages

### Development Benefits
- **Independent Development**: API teams work autonomously with own release cycles
- **Selective Dependencies**: Load only required APIs for specific deployments
- **Third-Party Extensions**: External developers can create APIs without core access
- **Reduced Core Complexity**: Platform stays focused on execution engine

### Operational Benefits
- **Modular Deployments**: Different environments can load different API sets
- **Version Management**: Each API maintains independent versioning
- **Security Isolation**: APIs can be audited and approved independently
- **Bandwidth Efficiency**: Only download needed functionality

## Implementation Considerations

### URI Compatibility
Maintains SPlectrum's existing URI-based module addressing:
- `tools/git/status` works regardless of source repository
- No changes needed to existing execution patterns
- Apps continue using standard `./spl_execute` commands

### Development Workflow
```bash
# Core platform development
git clone spl-platform && cd spl-platform
./spl api-loader install-all    # Loads all APIs from registry

# API-specific development  
git clone spl-git-api && cd spl-git-api
./test-api.sh                   # Local API testing
./deploy-to-registry.sh         # Publish new version
```

### Deployment Scenarios
- **Full Platform**: Load all APIs for complete functionality
- **Minimal Core**: Load only essential APIs for lightweight deployments
- **Custom Builds**: Load specific API combinations for specialized use cases

## Future Elaboration Topics

- API dependency resolution algorithms
- Version conflict resolution strategies
- Hot-loading and runtime API management
- Security and validation frameworks for third-party APIs
- Performance implications of dynamic loading
- Automated testing across API combinations
- Release coordination between core platform and APIs

## Related Documentation
- [Implementing New API](implementing-new-api.md) - Current single-repo approach
- [How To](how-to.md) - Development guidelines that would apply to federated APIs

---

[← Home](../README.md)