[← Back to Project Home](../../../README.md)

# Project Information

## Project Overview
- **PROJECT_NAME**: spl1
- **PROJECT_TYPE**: Transitional Repository (spl0 → spl2)
- **DESCRIPTION**: Modular execution platform with core engine providing minimal viable functionality for application development
- **PURPOSE**: Implement repository restructure, external install workflows, and core API enhancements while transitioning to federated monorepo architecture

## Repository Configuration
- **REPOSITORY**: SPlectrum/spl1
- **PRIMARY_BRANCH**: main
- **DEVELOPMENT_BRANCH**: unplanned
- **DEPLOYMENT_PATTERN**: Self-extracting zip with install instructions

## Architecture
- **DEPLOYMENT_MODEL**: Self-extracting package system with immutable Kafka-like record storage
- **CONTENT_SEPARATION**: Single-concern folders transitioning to container-wrapped git repositories
- **TEMPLATE_STRUCTURE**: 

## Development Team
- **PRIMARY_MAINTAINER**: Jules ten Bos in collaboration with Claude
- **DEVELOPMENT_APPROACH**: Phase-based development following PRINCE2 "just enough planning" principles
- **COLLABORATION_MODEL**: AI-assisted development with mandatory collaborative decision-making

## Project Boundaries
- **SCOPE**: Seven epics (RR, SE, CAE, TDD, BARE, NFD, AVRO) for complete platform transformation
- **NOT_SCOPE**: Post-1.0 mature development features
- **TARGET_USERS**: Developers building modular applications on SPlectrum platform

## Dependencies
- **RUNTIME**: Node.js v14+
- **TOOLS**: git, gh (GitHub CLI), rg (ripgrep), 7z
- **PLATFORMS**: Cross-platform (Linux, macOS, Windows WSL2)

## Success Criteria
- **DEPLOYABILITY**: Container-native federated architecture fully implemented
- **SEPARATION**: Each logical component distributed as containerized git repository
- **USABILITY**: External SPlectrum Engines enable isolated development workflows
- **MAINTAINABILITY**: High test coverage, quality gates, automated rule adherence

## Development Requirements

### Essential Knowledge for SPL Development
**CRITICAL**: SPL platform development requires understanding of unique execution patterns before any development work.

**MANDATORY READING**: Before ANY SPL development task, Claude MUST:
1. **Read**: `claude/project/SPL_ESSENTIALS.md` - Core SPL execution model and patterns
2. **Confirm**: State "SPL ESSENTIALS CONFIRMED" before proceeding with SPL development
3. **Reference**: Use as quick lookup during development work

**Why Essential**: SPL's execution model, error handling, and development patterns are fundamentally different from typical development. This knowledge prevents critical errors and ensures proper integration.

**Other Documentation**: Available in `docs/guides/` for reference when specific questions arise.

---

*Project Hook - General project information for spl1*