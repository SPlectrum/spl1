# SE-1: Container-Based Engine Architecture

**Related GitHub Issue**: [#32 - SE-1: Container engine prototype implementation](https://github.com/SPlectrum/spl1/issues/32)

## Strategic Context
**SE-1 as Container Pioneer**: First container implementation for SPlectrum platform, establishing patterns and practices for subsequent container adoption in RR epic and overall container unified entity strategy.

## Objective
Replace gitignored folder engine installations with container-based distribution, packaging, and execution.

## Problem Statement
**Current**: Engines installed in gitignored folders with host dependency management nightmare
**Target**: Container registry distribution with zero prerequisites and cross-architecture support

## Solution Overview
Containers as unified solution for:
- **Packaging**: Self-contained images with all tools bundled
- **Storage**: Container registry replacing local folders  
- **Distribution**: Standard `podman pull` operations
- **Runtime**: Isolated execution environments
- **Cross-Architecture**: Multi-arch images (Intel/AMD/ARM)

## Container Engine Model

### Registry Structure
```
registry.splectrum.io/engines/
├── data-processor:v1.0.0    # Multi-arch, zero dependencies
├── file-analyzer:v2.1.0     # All tools bundled internally
└── report-generator:v1.5.0  # Cross-platform compatible
```

### Engine Container Pattern
```dockerfile
FROM node:18-alpine
RUN apk add --no-cache git python3 7zip sqlite
COPY engine-modules/ /engine/
VOLUME ["/workspace", "/data", "/output"]
ENTRYPOINT ["/engine/bootstrap.js"]
```

### Benefits
- **Zero Prerequisites**: No host tool installation required
- **Cross-Architecture**: Single pull works on Intel/AMD/ARM  
- **Tool Bundling**: Git, 7zip, Python, etc. included in container
- **Version Control**: Immutable tagged releases
- **Security**: Process isolation and controlled access

## Implementation Phases

### Phase 1: Infrastructure
- Integrate Podman API (#29)
- Create base engine container template
- Setup container registry

### Phase 2: Engine Framework  
- Engine creation tooling (`spl app create --type=engine`)
- Container build/publish pipeline
- Engine metadata management

### Phase 3: Reference Engines
- Data processing engine
- File analysis engine  
- Archive management engine

### Phase 4: Production
- Multi-architecture builds
- Registry security
- Engine marketplace

## Strategic Implementation Sequence
1. **SE-1** (Current): Container pioneer - establishes container patterns
2. **RR Epic**: Apply container lessons to repository components  
3. **BARE Epic**: Sufficient progress enables full container strategy
4. **Container Unified Strategy**: Complete platform implementation

## Dependencies
- Issue #29: Podman Container Runtime API (critical path)
- External install workflow requirements (#12) - completion dependency
- Container unified entity strategy alignment (post-BARE)

## Success Criteria
- Engines distributed via container registry
- Zero host dependencies for engine execution  
- Cross-architecture compatibility (Intel/AMD/ARM)
- Seamless replacement of gitignored folder pattern
- **Pioneer Foundation**: Validated container patterns for RR epic adoption

## Strategic Value
- **First Container Use Case**: Proves container viability for SPlectrum
- **Pattern Establishment**: Creates reusable container practices
- **RR Epic Foundation**: Container lessons directly inform repository component containerization
- **Prerequisite Elimination**: Solves dependency management across architectures