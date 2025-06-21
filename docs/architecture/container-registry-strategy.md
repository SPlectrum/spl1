[← Home](../README.md)

# Container Registry Strategy

## Overview

This document outlines the container registry approach for SPlectrum's "container-wrapped git repositories" strategy, focusing on GitHub Container Registry (ghcr.io) integration.

## Registry Selection: GitHub Container Registry

**Decision**: Use GitHub Container Registry (ghcr.io) for SPlectrum containers

**Rationale**:
- **Unified ecosystem** - containers alongside source code
- **Integrated authentication** - GitHub permissions control container access
- **Zero external dependencies** - no separate Docker Hub authentication
- **CI/CD integration** - seamless GitHub Actions workflows
- **Cost efficiency** - included in existing GitHub plans

## Container-Repository Relationship Strategy

### Hybrid Approach (Recommended)

SPlectrum will use a **hybrid container registry approach** combining repository-specific and organization-level containers:

#### 1. Development Containers (Repository-Coupled)
```
Repository: SPlectrum/spl1  
Container: ghcr.io/splectrum/spl1-dev:latest
Purpose: Development and testing of specific repository changes
```

**Characteristics**:
- **One-to-one mapping** - each repository can have its own development container
- **Automated builds** - git push triggers container rebuild
- **Version alignment** - git tags become container tags
- **Rapid iteration** - immediate feedback for repository changes

#### 2. Runtime Containers (Organization-Level)
```
Repository: Multiple (spl1, spl2, core, etc.)
Container: ghcr.io/splectrum/splectrum-runtime:v1.2.3
Purpose: Production runtime combining multiple repositories
```

**Characteristics**:
- **Cross-repository composition** - unified runtime from multiple repos
- **Stable namespace** - consistent `ghcr.io/splectrum/` prefix
- **Release management** - independent versioning from individual repos
- **Distribution strategy** - centralized runtime distribution

### Container Naming Convention

#### Development Containers
```
ghcr.io/splectrum/{repo-name}-dev:{tag}

Examples:
- ghcr.io/splectrum/spl1-dev:latest
- ghcr.io/splectrum/spl1-dev:v0.6.2
- ghcr.io/splectrum/core-dev:feature-api-v2
```

#### Runtime Containers
```
ghcr.io/splectrum/splectrum-{component}:{version}

Examples:
- ghcr.io/splectrum/splectrum-runtime:v1.2.3
- ghcr.io/splectrum/splectrum-engine:latest
- ghcr.io/splectrum/splectrum-tools:v2.1.0
```

## Integration with Development Workflows

### GitHub Actions Integration

**Development Container Workflow**:
```yaml
name: Build Development Container
on:
  push:
    branches: [main, feature/*]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build and push dev container
        run: |
          docker build -t ghcr.io/splectrum/${{ github.event.repository.name }}-dev:${{ github.sha }} .
          docker push ghcr.io/splectrum/${{ github.event.repository.name }}-dev:${{ github.sha }}
```

**Runtime Container Workflow**:
```yaml
name: Build Runtime Container
on:
  release:
    types: [published]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Compose multi-repo runtime
      - name: Build unified runtime container
      - name: Push to ghcr.io/splectrum/splectrum-runtime:${{ github.event.release.tag_name }}
```

### Access Control Strategy

**Repository-Level Permissions**:
- **Development containers** inherit repository permissions
- **Team members** with repo access can pull/push dev containers
- **External collaborators** limited to public dev containers

**Organization-Level Permissions**:
- **Runtime containers** use organization-wide permissions
- **Release managers** control runtime container publishing
- **Public runtime containers** for open distribution

## Benefits of Hybrid Approach

### Development Benefits
- **Rapid iteration** - immediate container builds for feature development
- **Isolated testing** - each repository change gets its own container
- **Branch-specific containers** - test specific features in isolation

### Runtime Benefits
- **Unified distribution** - single runtime container for end users
- **Cross-repository coordination** - runtime combines best of all repos
- **Stable API** - runtime versioning independent of individual repo changes

### Operational Benefits
- **Flexible deployment** - choose development or runtime containers as needed
- **Cost optimization** - development containers can be ephemeral
- **Security isolation** - different permission models for dev vs runtime

## Migration Strategy

### Phase 1: Development Containers
1. Set up GitHub Actions for automatic dev container builds
2. Establish naming conventions and tagging strategy
3. Integrate with existing development workflows

### Phase 2: Runtime Containers
1. Design multi-repository composition strategy
2. Create unified runtime container build process
3. Establish release management for runtime versions

### Phase 3: Distribution
1. Public runtime containers for SPlectrum distribution
2. Private development containers for internal iteration
3. Integration with external dependency management

## Future Considerations

### Registry Evolution
- **Multi-registry support** - backup strategies if needed
- **Registry mirroring** - performance optimization for global distribution
- **Cost optimization** - lifecycle policies for container cleanup

### Integration Enhancements
- **Automatic dependency updates** - runtime containers track repo changes
- **Security scanning** - automated vulnerability assessment
- **Performance monitoring** - container performance metrics

---

*This strategy supports SPlectrum's transition to container-wrapped git repositories while maintaining development velocity and runtime stability.*