# Repository Maintenance Tasks - v0.6.1

**Generated**: 2025-06-22T04:57:06.265Z
**Repository Version**: 0.6.1
**Files Scanned**: 1905
**Total Tasks**: 3642

## Purpose

This operational document provides detailed task lists for executing repository maintenance as part of VERSION_TRANSITION Step 3. Each task includes specific file and line references for efficient execution.

## Execution Strategy

### Recommended Order
1. **High Priority Tasks** (610 tasks) - Execute first
2. **Medium Priority Tasks** (124 tasks) - Execute based on available time
3. **Low Priority Tasks** (2908 tasks) - Execute when convenient

### Task Completion Tracking
- [ ] Mark completed tasks with ✅
- [ ] Update this document as tasks are completed
- [ ] Remove completed sections to maintain focus

## High Priority Tasks (610)

*Critical issues affecting navigation, user experience, and version accuracy.*

### outdated_version_reference (478 tasks)

| Status | File | Line | Content | Issue | Action |
|--------|------|------|---------|-------|--------|
| ⬜ | `docs/architecture/container-registry-strategy.md` | 42 | Container: ghcr.io/splectrum/splectrum-r... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/architecture/container-registry-strategy.md` | 60 | - ghcr.io/splectrum/spl1-dev:v0.6.2 | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/architecture/container-registry-strategy.md` | 69 | - ghcr.io/splectrum/splectrum-runtime:v1... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/architecture/container-registry-strategy.md` | 71 | - ghcr.io/splectrum/splectrum-tools:v2.1... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/architecture/container-unified-entity-strategy.md` | 174 | │   ├── execute:v1.2.3          # Core e... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/architecture/container-unified-entity-strategy.md` | 175 | │   ├── data:v1.2.3             # Data l... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/architecture/container-unified-entity-strategy.md` | 176 | │   └── package:v1.2.3          # Packag... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/architecture/container-unified-entity-strategy.md` | 178 | │   ├── git:v2.1.0              # Git in... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/architecture/container-unified-entity-strategy.md` | 179 | │   ├── podman:v1.0.0           # Contai... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/architecture/container-unified-entity-strategy.md` | 180 | │   └── 7zip:v1.0.0             # Archiv... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/architecture/container-unified-entity-strategy.md` | 182 | ├── boot:v0.6.2             # Boot appli... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/architecture/container-unified-entity-strategy.md` | 183 | ├── watcher:v0.6.2          # File watch... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/architecture/container-unified-entity-strategy.md` | 184 | └── test-suite:v0.6.2       # Testing fr... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/architecture/container-unified-entity-strategy.md` | 188 | - **Push**: `podman push registry.splect... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/architecture/container-unified-entity-strategy.md` | 189 | - **Pull**: `podman pull registry.splect... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/architecture/container-unified-entity-strategy.md` | 190 | - **Run**: `podman run registry.splectru... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/architecture/container-unified-entity-strategy.md` | 198 | module: 'container://registry.splectrum.... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/architecture/container-unified-entity-strategy.md` | 208 | tool: 'container://registry.splectrum.io... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/architecture/federated-monorepo-design.md` | 146 | "version": "1.2.0", | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/architecture/federated-monorepo-design.md` | 152 | "version": "0.8.0", | Outdated version reference: 0.8.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/architecture/federated-monorepo-design.md` | 164 | "version": "1.2.0", | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/architecture/federated-monorepo-design.md` | 165 | "splectrum-version": ">=1.0.0", | Outdated version reference: 1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/architecture/se1-container-engine-architecture.md` | 28 | ├── data-processor:v1.0.0    # Multi-arc... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/architecture/se1-container-engine-architecture.md` | 29 | ├── file-analyzer:v2.1.0     # All tools... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/architecture/se1-container-engine-architecture.md` | 30 | └── report-generator:v1.5.0  # Cross-pla... | Outdated version reference: v1.5.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/guides/current-development-process.md` | 36 | **Next Phase**: Transition to Version 0.... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/integration/avro-service-definitions-communication.md` | 179 | string image;                     // "re... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/integration/avro-service-definitions-communication.md` | 304 | image: 'registry.splectrum.io/spl/gpu-co... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/integration/qubes-splectrum-integration.md` | 31 | │  │ ├─ Core Development       ││  │ ├─ ... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/integration/qubes-splectrum-integration.md` | 32 | │  │ ├─ Tools Integration      ││  │ ├─ ... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/integration/qubes-splectrum-integration.md` | 143 | version: 'v0.6.2', | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/integration/qubes-splectrum-integration.md` | 150 | splectrum: { version: 'v0.7.0' } | Outdated version reference: v0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/integration/qubes-splectrum-integration.md` | 245 | await qubes.template.share('spl-dev-v0.7... | Outdated version reference: v0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/management/decision-log.md` | 3 | # Decision Log (spl1 v0.6.2) | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/management/decision-log.md` | 73 | *This decision log will be archived to `... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/management/versioning-strategy.md` | 5 | SPL1 continues the SPlectrum version lin... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/management/versioning-strategy.md` | 9 | ### Starting Point: 0.6.0 | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/management/versioning-strategy.md` | 11 | - **Fresh start**: spl1 begins developme... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/management/versioning-strategy.md` | 14 | ### Target Milestone: 1.0.0 | Outdated version reference: 1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/management/versioning-strategy.md` | 25 | - **0.6.0 "Baseline"**: Seven-epic struc... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/management/versioning-strategy.md` | 27 | - **0.6.2+ "Implementation Phases"**: Ba... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/management/versioning-strategy.md` | 43 | - **Minor versions** (0.6.0 → 0.7.0): Si... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/management/versioning-strategy.md` | 43 | - **Minor versions** (0.6.0 → 0.7.0): Si... | Outdated version reference: 0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/management/versioning-strategy.md` | 44 | - **Patch versions** (0.6.0 → 0.6.1): An... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/management/versioning-strategy.md` | 45 | - **Pre-release** (0.6.0-alpha.1): Testi... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reference/prerequisites.md` | 180 | node --version              # Should sho... | Outdated version reference: v14.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 30 | \| `docs/architecture/container-registry... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 31 | \| `docs/architecture/container-registry... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 31 | \| `docs/architecture/container-registry... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 32 | \| `docs/architecture/container-registry... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 32 | \| `docs/architecture/container-registry... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 33 | \| `docs/architecture/container-registry... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 33 | \| `docs/architecture/container-registry... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 34 | \| `docs/architecture/container-unified-... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 34 | \| `docs/architecture/container-unified-... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 35 | \| `docs/architecture/container-unified-... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 35 | \| `docs/architecture/container-unified-... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 36 | \| `docs/architecture/container-unified-... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 36 | \| `docs/architecture/container-unified-... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 37 | \| `docs/architecture/container-unified-... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 37 | \| `docs/architecture/container-unified-... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 38 | \| `docs/architecture/container-unified-... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 38 | \| `docs/architecture/container-unified-... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 39 | \| `docs/architecture/container-unified-... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 39 | \| `docs/architecture/container-unified-... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 40 | \| `docs/architecture/container-unified-... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 40 | \| `docs/architecture/container-unified-... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 41 | \| `docs/architecture/container-unified-... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 41 | \| `docs/architecture/container-unified-... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 42 | \| `docs/architecture/container-unified-... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 42 | \| `docs/architecture/container-unified-... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 43 | \| `docs/architecture/container-unified-... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 44 | \| `docs/architecture/container-unified-... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 45 | \| `docs/architecture/container-unified-... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 46 | \| `docs/architecture/container-unified-... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 47 | \| `docs/architecture/container-unified-... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 48 | \| `docs/architecture/federated-monorepo... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 48 | \| `docs/architecture/federated-monorepo... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 49 | \| `docs/architecture/federated-monorepo... | Outdated version reference: 0.8.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 49 | \| `docs/architecture/federated-monorepo... | Outdated version reference: 0.8.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 50 | \| `docs/architecture/federated-monorepo... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 50 | \| `docs/architecture/federated-monorepo... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 51 | \| `docs/architecture/federated-monorepo... | Outdated version reference: 1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 51 | \| `docs/architecture/federated-monorepo... | Outdated version reference: 1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 52 | \| `docs/architecture/se1-container-engi... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 52 | \| `docs/architecture/se1-container-engi... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 53 | \| `docs/architecture/se1-container-engi... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 53 | \| `docs/architecture/se1-container-engi... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 54 | \| `docs/architecture/se1-container-engi... | Outdated version reference: v1.5.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 54 | \| `docs/architecture/se1-container-engi... | Outdated version reference: v1.5.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 55 | \| `docs/guides/current-development-proc... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 55 | \| `docs/guides/current-development-proc... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 56 | \| `docs/integration/avro-service-defini... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 57 | \| `docs/integration/avro-service-defini... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 58 | \| `docs/integration/qubes-splectrum-int... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 59 | \| `docs/integration/qubes-splectrum-int... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 60 | \| `docs/integration/qubes-splectrum-int... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 60 | \| `docs/integration/qubes-splectrum-int... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 61 | \| `docs/integration/qubes-splectrum-int... | Outdated version reference: v0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 61 | \| `docs/integration/qubes-splectrum-int... | Outdated version reference: v0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 62 | \| `docs/integration/qubes-splectrum-int... | Outdated version reference: v0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 62 | \| `docs/integration/qubes-splectrum-int... | Outdated version reference: v0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 63 | \| `docs/management/decision-log.md` \| ... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 63 | \| `docs/management/decision-log.md` \| ... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 64 | \| `docs/management/decision-log.md` \| ... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 65 | \| `docs/management/versioning-strategy.... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 66 | \| `docs/management/versioning-strategy.... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 66 | \| `docs/management/versioning-strategy.... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 67 | \| `docs/management/versioning-strategy.... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 68 | \| `docs/management/versioning-strategy.... | Outdated version reference: 1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 68 | \| `docs/management/versioning-strategy.... | Outdated version reference: 1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 69 | \| `docs/management/versioning-strategy.... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 69 | \| `docs/management/versioning-strategy.... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 70 | \| `docs/management/versioning-strategy.... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 70 | \| `docs/management/versioning-strategy.... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 71 | \| `docs/management/versioning-strategy.... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 71 | \| `docs/management/versioning-strategy.... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 71 | \| `docs/management/versioning-strategy.... | Outdated version reference: 0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 72 | \| `docs/management/versioning-strategy.... | Outdated version reference: 0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 72 | \| `docs/management/versioning-strategy.... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 72 | \| `docs/management/versioning-strategy.... | Outdated version reference: 0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 73 | \| `docs/management/versioning-strategy.... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 73 | \| `docs/management/versioning-strategy.... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 74 | \| `docs/management/versioning-strategy.... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 74 | \| `docs/management/versioning-strategy.... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 75 | \| `docs/reference/prerequisites.md` \| ... | Outdated version reference: v14.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 75 | \| `docs/reference/prerequisites.md` \| ... | Outdated version reference: v14.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 76 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 77 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 78 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 79 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 80 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 81 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 82 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 83 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 84 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 85 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 86 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 87 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 88 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 89 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 90 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 91 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 92 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 93 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 94 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 95 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 96 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 97 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 98 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 99 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 100 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 101 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 102 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 103 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 104 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 105 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 106 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 107 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 108 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.8.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 109 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.8.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 110 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 111 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 112 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 113 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 114 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 115 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 116 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 117 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 118 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.5.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 119 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.5.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 120 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 121 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 122 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 123 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 124 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 125 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 126 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 127 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 128 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 129 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 130 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 131 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 132 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 133 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 134 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 135 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 136 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 137 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 138 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 139 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 140 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 141 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 142 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 143 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 144 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 145 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 146 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 147 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 148 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 149 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 150 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 151 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 152 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 153 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 154 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 155 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v14.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 156 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v14.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 157 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 158 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 159 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 160 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 161 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 162 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 163 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 164 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 165 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 166 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 167 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 168 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 169 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 170 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 171 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 172 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 173 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 174 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 175 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 176 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 177 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 178 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 179 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 180 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 181 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 182 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 183 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 184 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 185 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 186 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 187 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 188 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 189 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 190 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 191 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 192 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 193 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 194 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 195 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 196 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 197 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 198 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 199 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 200 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 201 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 202 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 203 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 204 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 205 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 206 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 207 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 208 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 209 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 210 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 211 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 212 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 213 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 214 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 215 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 216 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 217 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 218 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 219 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 220 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 221 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 222 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 223 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 224 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 225 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.8.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 226 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.8.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 227 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.8.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 228 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.8.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 229 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 230 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 231 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 232 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 233 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 234 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 235 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 236 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 237 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 238 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 239 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 240 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 241 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 242 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 243 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 244 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 245 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.5.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 246 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.5.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 247 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.5.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 248 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.5.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 249 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 250 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 251 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 252 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 253 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 254 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 255 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 256 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 257 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 258 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 259 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 260 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v1.2.3 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 261 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 262 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 263 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v2.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 264 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 265 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 266 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 267 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 268 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 269 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 270 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 271 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 272 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 273 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 274 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 275 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 276 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 277 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 278 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 279 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 280 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 281 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 282 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 283 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 284 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 285 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 286 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 287 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 288 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 289 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 290 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 291 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 292 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 293 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 294 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 295 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 296 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 297 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 298 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 299 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 300 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 301 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 302 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 303 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 304 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 305 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 306 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 307 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 308 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 309 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 310 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 311 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 312 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 313 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 314 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 315 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 316 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 317 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 318 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 319 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.7.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 320 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 321 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 322 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 323 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 324 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 325 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 326 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 327 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 328 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v14.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 329 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v14.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 330 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v14.0.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 331 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 332 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 333 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 334 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 335 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 336 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 337 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 338 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 339 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 340 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 341 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 342 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 343 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 344 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 345 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 346 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 347 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 348 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 349 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 350 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 351 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 352 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 353 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 354 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 355 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 356 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 357 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 358 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 359 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 360 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 361 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 362 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 363 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 364 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 365 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 366 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 367 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 368 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 369 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 370 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 371 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 372 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 373 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 374 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 375 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 376 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 377 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 378 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 379 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 380 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 381 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 382 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 383 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 384 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 385 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 386 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 387 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 388 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 389 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 390 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 391 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 392 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 393 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 394 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 395 | \| `docs/reports/v0.6.1-repository-maint... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 396 | \| `docs/specifications/audit-log-archit... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 396 | \| `docs/specifications/audit-log-archit... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 397 | \| `docs/specifications/audit-log-archit... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 397 | \| `docs/specifications/audit-log-archit... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 398 | \| `docs/specifications/audit-log-archit... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 398 | \| `docs/specifications/audit-log-archit... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 399 | \| `docs/specifications/audit-log-migrat... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 399 | \| `docs/specifications/audit-log-migrat... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 400 | \| `docs/workflows/phase-based-developme... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 401 | \| `docs/workflows/phase-based-developme... | Outdated version reference: 1.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 401 | \| `docs/workflows/phase-based-developme... | Outdated version reference: 1.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 402 | \| `docs/workflows/phase-based-developme... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 402 | \| `docs/workflows/phase-based-developme... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 403 | \| `docs/workflows/phase-based-developme... | Outdated version reference: 1.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 403 | \| `docs/workflows/phase-based-developme... | Outdated version reference: 1.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 404 | \| `docs/workflows/phase-based-developme... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 404 | \| `docs/workflows/phase-based-developme... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 584 | - `RELEASE_NOTES_v0.6.1.md`:134 - Outdat... | Outdated version reference: v0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 585 | - `claude/operational-docs/project-decis... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 586 | - `claude/operational-docs/project-decis... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 587 | - `claude/operational-docs/project-decis... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 588 | - `claude/workflows/GITHUB_WORKFLOW.md`:... | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/specifications/audit-log-architecture.md` | 18 | └── v0.6.0/ | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/specifications/audit-log-architecture.md` | 19 | └── audit_v0.6.0.log                 # C... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/specifications/audit-log-architecture.md` | 19 | └── audit_v0.6.0.log                 # C... | Outdated version reference: v0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/specifications/audit-log-migration-plan.md` | 48 | 1. **Extract Version 0.6.2 Activities** | Outdated version reference: 0.6.2 | Update to current version: v0.6.1 |
| ⬜ | `docs/workflows/phase-based-development-strategy.md` | 35 | Combine epic phases into versions starti... | Outdated version reference: 0.6.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/workflows/phase-based-development-strategy.md` | 141 | **Version 1.1.0: "Foundation Enhancement... | Outdated version reference: 1.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/workflows/phase-based-development-strategy.md` | 148 | **Version 1.2.0: "Core Integration"** | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/workflows/phase-based-development-strategy.md` | 156 | After delivering Version 1.1.0, we would... | Outdated version reference: 1.1.0 | Update to current version: v0.6.1 |
| ⬜ | `docs/workflows/phase-based-development-strategy.md` | 159 | - Adjust the planning for Version 1.2.0 ... | Outdated version reference: 1.2.0 | Update to current version: v0.6.1 |

### broken_link (132 tasks)

| Status | File | Line | Content | Issue | Action |
|--------|------|------|---------|-------|--------|
| ⬜ | `CLAUDE.md` | 244 | **Transition Repository**: spl1 focuses ... | Broken link: ./docs/federated-monorepo-design.md | Update path or remove broken link |
| ⬜ | `CLAUDE.md` | 246 | **Development Strategy**: Uses [Phase-Ba... | Broken link: ./docs/phase-based-development-strategy.md | Update path or remove broken link |
| ⬜ | `CLAUDE.md` | 284 | See [Subdirectory CLAUDE.md Evolution Pl... | Broken link: ./docs/subdirectory-claude-md-plan.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 419 | \| ⬜ \| `docs/api/7zip-command-line-api.... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 421 | \| ⬜ \| `docs/api/api-status.md` \| 1 \|... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 422 | \| ⬜ \| `docs/api/api-status.md` \| 56 \... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 423 | \| ⬜ \| `docs/api/execute-api-properties... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 424 | \| ⬜ \| `docs/api/execute-api-properties... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 425 | \| ⬜ \| `docs/api/package-api-properties... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 426 | \| ⬜ \| `docs/api/package-api-properties... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 427 | \| ⬜ \| `docs/api/spl-package-api-analys... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 428 | \| ⬜ \| `docs/api/spl-package-api-analys... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 429 | \| ⬜ \| `docs/architecture/container-reg... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 430 | \| ⬜ \| `docs/architecture/container-uni... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 431 | \| ⬜ \| `docs/architecture/federated-mon... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 433 | \| ⬜ \| `docs/architecture/federated-mon... | Broken link: how-to.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 434 | \| ⬜ \| `docs/architecture/federated-mon... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 435 | \| ⬜ \| `docs/architecture/schema-and-re... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 436 | \| ⬜ \| `docs/architecture/spl-data-laye... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 437 | \| ⬜ \| `docs/guides/creating-new-apps.m... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 438 | \| ⬜ \| `docs/guides/creating-new-apps.m... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 441 | \| ⬜ \| `docs/guides/how-to.md` \| 1 \| ... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 442 | \| ⬜ \| `docs/guides/how-to.md` \| 187 \... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 443 | \| ⬜ \| `docs/guides/how-to.md` \| 204 \... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 444 | \| ⬜ \| `docs/guides/how-to.md` \| 220 \... | Broken link: ./related-doc.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 448 | \| ⬜ \| `docs/guides/implementing-new-ap... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 449 | \| ⬜ \| `docs/guides/implementing-new-ap... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 451 | \| ⬜ \| `docs/integration/avro-service-d... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 452 | \| ⬜ \| `docs/integration/qubes-os-overv... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 453 | \| ⬜ \| `docs/integration/qubes-splectru... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 454 | \| ⬜ \| `docs/management/decision-log.md... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 459 | \| ⬜ \| `docs/reference/boot-app-functio... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 472 | \| ⬜ \| `docs/reference/quick-reference.... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 473 | \| ⬜ \| `docs/reference/quick-reference.... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | 474 | \| ⬜ \| `docs/reference/test-app-develop... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `claude/workflows/KEYWORD_REGISTRY.md` | 100 | **KEYWORD_NAME** → See [workflows/FILENA... | Broken link: ./workflows/FILENAME.md | Update path or remove broken link |
| ⬜ | `claude/workflows/KEYWORD_REGISTRY.md` | 105 | **SESSION_START** → See [workflows/SESSI... | Broken link: ./workflows/SESSION_START.md | Update path or remove broken link |
| ⬜ | `claude/workflows/NEXT_ISSUE.md` | 151 | **NEXT_ISSUE** → See [workflows/NEXT_ISS... | Broken link: ./workflows/NEXT_ISSUE.md | Update path or remove broken link |
| ⬜ | `claude/workflows/PROJECT_AUTOMATION.md` | 89 | **PROJECT_AUTOMATION** → See [workflows/... | Broken link: ./workflows/PROJECT_AUTOMATION.md | Update path or remove broken link |
| ⬜ | `docs/api/7zip-command-line-api.md` | 1 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/api/7zip-command-line-api.md` | 9 | **Related**: See [7zip API Methods](7zip... | Broken link: 7zip-api-methods.md | Update path or remove broken link |
| ⬜ | `docs/api/api-status.md` | 1 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/api/api-status.md` | 56 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/api/execute-api-properties.md` | 1 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/api/execute-api-properties.md` | 65 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/api/package-api-properties.md` | 1 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/api/package-api-properties.md` | 46 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/api/spl-package-api-analysis.md` | 1 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/api/spl-package-api-analysis.md` | 52 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/architecture/container-registry-strategy.md` | 1 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/architecture/container-unified-entity-strategy.md` | 1 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/architecture/federated-monorepo-design.md` | 1 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/architecture/federated-monorepo-design.md` | 233 | - [Implementing New API](implementing-ne... | Broken link: implementing-new-api.md | Update path or remove broken link |
| ⬜ | `docs/architecture/federated-monorepo-design.md` | 234 | - [How To](how-to.md) - Development guid... | Broken link: how-to.md | Update path or remove broken link |
| ⬜ | `docs/architecture/federated-monorepo-design.md` | 238 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/architecture/schema-and-repo-notes.md` | 1 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/architecture/spl-data-layer.md` | 1 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/guides/creating-new-apps.md` | 1 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/guides/creating-new-apps.md` | 57 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/guides/current-development-process.md` | 28 | - **Epic Details**: See [spl1 Epics Over... | Broken link: ./spl1-epics-overview.md | Update path or remove broken link |
| ⬜ | `docs/guides/current-development-process.md` | 29 | - **Phase Strategy**: See [Phase-Based D... | Broken link: ./phase-based-development-strategy.md | Update path or remove broken link |
| ⬜ | `docs/guides/how-to.md` | 1 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/guides/how-to.md` | 187 | ✓ Start with [← Home](../README.md) navi... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/guides/how-to.md` | 204 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/guides/how-to.md` | 220 | - [Related Doc](./related-doc.md) - Brie... | Broken link: ./related-doc.md | Update path or remove broken link |
| ⬜ | `docs/guides/how-to.md` | 227 | - [New Feature Guide](./docs/new-feature... | Broken link: ./docs/new-feature-guide.md | Update path or remove broken link |
| ⬜ | `docs/guides/how-to.md` | 232 | - [New API Methods](./docs/new-api-metho... | Broken link: ./docs/new-api-methods.md | Update path or remove broken link |
| ⬜ | `docs/guides/how-to.md` | 237 | - [New Architecture Design](./docs/new-a... | Broken link: ./docs/new-architecture-design.md | Update path or remove broken link |
| ⬜ | `docs/guides/implementing-new-api.md` | 1 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/guides/implementing-new-api.md` | 150 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/guides/release-and-install-process.md` | 140 | See [Federated Monorepo Design](./federa... | Broken link: ./federated-monorepo-design.md | Update path or remove broken link |
| ⬜ | `docs/integration/avro-service-definitions-communication.md` | 1 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/integration/qubes-os-overview.md` | 1 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/integration/qubes-splectrum-integration.md` | 1 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/management/decision-log.md` | 1 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/management/github-project-setup.md` | 261 | - [Phase-Based Development Strategy](./p... | Broken link: ./phase-based-development-strategy.md | Update path or remove broken link |
| ⬜ | `docs/management/github-project-setup.md` | 262 | - [Federated Monorepo Design](./federate... | Broken link: ./federated-monorepo-design.md | Update path or remove broken link |
| ⬜ | `docs/management/github-project-setup.md` | 263 | - [CLAUDE.md Operational Rules](../CLAUD... | Broken link: ../CLAUDE.md | Update path or remove broken link |
| ⬜ | `docs/management/spl1-epics-overview.md` | 13 | **Reference**: See [Federated Monorepo D... | Broken link: ./federated-monorepo-design.md | Update path or remove broken link |
| ⬜ | `docs/reference/boot-app-functionality.md` | 1 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reference/boot-app-functionality.md` | 35 | #### [`modules_to_boot.js`](../release/i... | Broken link: ../release/install/boot/modules/usr/modules_to_boot.js | Update path or remove broken link |
| ⬜ | `docs/reference/boot-app-functionality.md` | 41 | #### [`boot_to_release.js`](../release/i... | Broken link: ../release/install/boot/modules/usr/boot_to_release.js | Update path or remove broken link |
| ⬜ | `docs/reference/boot-app-functionality.md` | 45 | #### [`apps_to_release.js`](../release/i... | Broken link: ../release/install/boot/modules/usr/apps_to_release.js | Update path or remove broken link |
| ⬜ | `docs/reference/boot-app-functionality.md` | 51 | #### [`release_to_install.js`](../releas... | Broken link: ../release/install/boot/modules/usr/release_to_install.js | Update path or remove broken link |
| ⬜ | `docs/reference/boot-app-functionality.md` | 59 | #### [`deploy_install.js`](../release/in... | Broken link: ../release/install/boot/modules/usr/deploy_install.js | Update path or remove broken link |
| ⬜ | `docs/reference/boot-app-functionality.md` | 63 | #### [`deploy_modules.js`](../release/in... | Broken link: ../release/install/boot/modules/usr/deploy_modules.js | Update path or remove broken link |
| ⬜ | `docs/reference/boot-app-functionality.md` | 67 | #### [`deploy_apps.js`](../release/insta... | Broken link: ../release/install/boot/modules/usr/deploy_apps.js | Update path or remove broken link |
| ⬜ | `docs/reference/boot-app-functionality.md` | 78 | #### [`deploy_watcher.js`](../release/in... | Broken link: ../release/install/boot/modules/usr/deploy_watcher.js | Update path or remove broken link |
| ⬜ | `docs/reference/boot-app-functionality.md` | 82 | #### [`remove_install.js`](../release/in... | Broken link: ../release/install/boot/modules/usr/remove_install.js | Update path or remove broken link |
| ⬜ | `docs/reference/prerequisites.md` | 294 | 1. **For end users**: Follow [Installati... | Broken link: ../INSTALL.md | Update path or remove broken link |
| ⬜ | `docs/reference/prerequisites.md` | 295 | 2. **For developers**: See [How to](./ho... | Broken link: ./how-to.md | Update path or remove broken link |
| ⬜ | `docs/reference/prerequisites.md` | 297 | 4. **For understanding**: Review [Projec... | Broken link: ./project-overview.md | Update path or remove broken link |
| ⬜ | `docs/reference/quick-reference.md` | 1 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reference/quick-reference.md` | 71 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reference/test-app-development.md` | 1 | [← Home](../README.md) | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 412 | \| `docs/api/7zip-command-line-api.md` \... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 414 | \| `docs/api/api-status.md` \| 1 \| brok... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 415 | \| `docs/api/api-status.md` \| 56 \| bro... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 416 | \| `docs/api/execute-api-properties.md` ... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 417 | \| `docs/api/execute-api-properties.md` ... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 418 | \| `docs/api/package-api-properties.md` ... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 419 | \| `docs/api/package-api-properties.md` ... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 420 | \| `docs/api/spl-package-api-analysis.md... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 421 | \| `docs/api/spl-package-api-analysis.md... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 422 | \| `docs/architecture/container-registry... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 423 | \| `docs/architecture/container-unified-... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 424 | \| `docs/architecture/federated-monorepo... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 425 | \| `docs/architecture/federated-monorepo... | Broken link: implementing-new-api.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 426 | \| `docs/architecture/federated-monorepo... | Broken link: how-to.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 427 | \| `docs/architecture/federated-monorepo... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 428 | \| `docs/architecture/schema-and-repo-no... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 429 | \| `docs/architecture/spl-data-layer.md`... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 430 | \| `docs/guides/creating-new-apps.md` \|... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 431 | \| `docs/guides/creating-new-apps.md` \|... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 434 | \| `docs/guides/how-to.md` \| 1 \| broke... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 435 | \| `docs/guides/how-to.md` \| 187 \| bro... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 436 | \| `docs/guides/how-to.md` \| 204 \| bro... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 437 | \| `docs/guides/how-to.md` \| 220 \| bro... | Broken link: ./related-doc.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 438 | \| `docs/guides/how-to.md` \| 227 \| bro... | Broken link: ./docs/new-feature-guide.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 439 | \| `docs/guides/how-to.md` \| 232 \| bro... | Broken link: ./docs/new-api-methods.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 441 | \| `docs/guides/implementing-new-api.md`... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 442 | \| `docs/guides/implementing-new-api.md`... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 444 | \| `docs/integration/avro-service-defini... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 445 | \| `docs/integration/qubes-os-overview.m... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 446 | \| `docs/integration/qubes-splectrum-int... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 447 | \| `docs/management/decision-log.md` \| ... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 450 | \| `docs/management/github-project-setup... | Broken link: ../CLAUDE.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 452 | \| `docs/reference/boot-app-functionalit... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 463 | \| `docs/reference/prerequisites.md` \| ... | Broken link: ./how-to.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 465 | \| `docs/reference/quick-reference.md` \... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 466 | \| `docs/reference/quick-reference.md` \... | Broken link: ../README.md | Update path or remove broken link |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | 467 | \| `docs/reference/test-app-development.... | Broken link: ../README.md | Update path or remove broken link |

## Medium Priority Tasks (124)

*Quality and organization issues that improve maintainability.*

### draft_content (13 tasks)

| Status | File | Line | Content | Action |
|--------|------|------|---------|--------|
| ⬜ | `CLAUDE.md` | - | Contains draft/WIP indicators | Review completion status and update or archive |
| ⬜ | `INSTALL.md` | - | Contains draft/WIP indicators | Review completion status and update or archive |
| ⬜ | `README.md` | - | Contains draft/WIP indicators | Review completion status and update or archive |
| ⬜ | `claude/operational-docs/repository-maintenance-analysis-plan.md` | - | Contains draft/WIP indicators | Review completion status and update or archive |
| ⬜ | `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md` | - | Contains draft/WIP indicators | Review completion status and update or archive |
| ⬜ | `claude/workflows/SESSION_END.md` | - | Contains draft/WIP indicators | Review completion status and update or archive |
| ⬜ | `claude/workflows/SESSION_START.md` | - | Contains draft/WIP indicators | Review completion status and update or archive |
| ⬜ | `docs/guides/app-development.md` | - | Contains draft/WIP indicators | Review completion status and update or archive |
| ⬜ | `docs/guides/how-to.md` | - | Contains draft/WIP indicators | Review completion status and update or archive |
| ⬜ | `docs/reference/test-app-development.md` | - | Contains draft/WIP indicators | Review completion status and update or archive |
| ⬜ | `docs/reports/v0.6.1-repository-maintenance.md` | - | Contains draft/WIP indicators | Review completion status and update or archive |
| ⬜ | `docs/specifications/claude-directory-specification.md` | - | Contains draft/WIP indicators | Review completion status and update or archive |
| ⬜ | `docs/workflows/operational-tdd-framework.md` | - | Contains draft/WIP indicators | Review completion status and update or archive |

### temporary_filename (111 tasks)

| Status | File | Line | Content | Action |
|--------|------|------|---------|--------|
| ⬜ | `claude/operational-docs/session-summary-version-transition-prototypes.md` | - | Filename: session-summary-version-transition-proto... | Review if content should be archived or renamed |
| ⬜ | `docs/reference/test-app-development.md` | - | Filename: test-app-development.md | Review if content should be archived or renamed |
| ⬜ | `docs/workflows/testing-frameworks.md` | - | Filename: testing-frameworks.md | Review if content should be archived or renamed |
| ⬜ | `modules/tools/7zip/test.js` | - | Filename: test.js | Review if content should be archived or renamed |
| ⬜ | `modules/tools/7zip/test_arguments.json` | - | Filename: test_arguments.json | Review if content should be archived or renamed |
| ⬜ | `release/install/boot/modules/tools/7zip/test.js` | - | Filename: test.js | Review if content should be archived or renamed |
| ⬜ | `release/install/boot/modules/tools/7zip/test_arguments.json` | - | Filename: test_arguments.json | Review if content should be archived or renamed |
| ⬜ | `release/install/boot/modules/usr/deploy_test-boot.js` | - | Filename: deploy_test-boot.js | Review if content should be archived or renamed |
| ⬜ | `release/install/boot/modules/usr/deploy_test-boot_arguments.json` | - | Filename: deploy_test-boot_arguments.json | Review if content should be archived or renamed |
| ⬜ | `release/install/boot/modules/usr/deploy_test-tools-7zip.js` | - | Filename: deploy_test-tools-7zip.js | Review if content should be archived or renamed |
| ⬜ | `release/install/boot/modules/usr/deploy_test-tools-7zip_arguments.json` | - | Filename: deploy_test-tools-7zip_arguments.json | Review if content should be archived or renamed |
| ⬜ | `release/install/boot/modules/usr/deploy_test-tools-git.js` | - | Filename: deploy_test-tools-git.js | Review if content should be archived or renamed |
| ⬜ | `release/install/boot/modules/usr/deploy_test-tools-git_arguments.json` | - | Filename: deploy_test-tools-git_arguments.json | Review if content should be archived or renamed |
| ⬜ | `release/install/boot/modules/usr/test-tools-7zip_to_release.js` | - | Filename: test-tools-7zip_to_release.js | Review if content should be archived or renamed |
| ⬜ | `release/install/boot/modules/usr/test-tools-7zip_to_release_arguments.json` | - | Filename: test-tools-7zip_to_release_arguments.jso... | Review if content should be archived or renamed |
| ⬜ | `release/install/boot/modules/usr/test-tools-git_to_release.js` | - | Filename: test-tools-git_to_release.js | Review if content should be archived or renamed |
| ⬜ | `release/install/boot/modules/usr/test-tools-git_to_release_arguments.json` | - | Filename: test-tools-git_to_release_arguments.json | Review if content should be archived or renamed |
| ⬜ | `release/install/packages/apps_test-boot.json` | - | Filename: apps_test-boot.json | Review if content should be archived or renamed |
| ⬜ | `release/install/packages/apps_test-spl-app.json` | - | Filename: apps_test-spl-app.json | Review if content should be archived or renamed |
| ⬜ | `release/install/packages/apps_test-suite.json` | - | Filename: apps_test-suite.json | Review if content should be archived or renamed |
| ⬜ | `release/install/packages/apps_test-tools-7zip.json` | - | Filename: apps_test-tools-7zip.json | Review if content should be archived or renamed |
| ⬜ | `release/install/packages/apps_test-tools-git.json` | - | Filename: apps_test-tools-git.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/boot/modules/tools/7zip/test.js` | - | Filename: test.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/boot/modules/tools/7zip/test_arguments.json` | - | Filename: test_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/boot/modules/usr/deploy_test-boot.js` | - | Filename: deploy_test-boot.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/boot/modules/usr/deploy_test-boot_arguments.json` | - | Filename: deploy_test-boot_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/boot/modules/usr/deploy_test-tools-7zip.js` | - | Filename: deploy_test-tools-7zip.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/boot/modules/usr/deploy_test-tools-7zip_arguments.json` | - | Filename: deploy_test-tools-7zip_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/boot/modules/usr/deploy_test-tools-git.js` | - | Filename: deploy_test-tools-git.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/boot/modules/usr/deploy_test-tools-git_arguments.json` | - | Filename: deploy_test-tools-git_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/boot/modules/usr/test-tools-7zip_to_release.js` | - | Filename: test-tools-7zip_to_release.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/boot/modules/usr/test-tools-7zip_to_release_arguments.json` | - | Filename: test-tools-7zip_to_release_arguments.jso... | Review if content should be archived or renamed |
| ⬜ | `spl/apps/boot/modules/usr/test-tools-git_to_release.js` | - | Filename: test-tools-git_to_release.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/boot/modules/usr/test-tools-git_to_release_arguments.json` | - | Filename: test-tools-git_to_release_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-spl-app/modules/usr/args-test.js` | - | Filename: args-test.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-spl-app/modules/usr/args-test_arguments.json` | - | Filename: args-test_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-spl-app/modules/usr/js-help-tests.js` | - | Filename: js-help-tests.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-spl-app/modules/usr/js-help-tests_arguments.json` | - | Filename: js-help-tests_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-spl-app/modules/usr/js-run-tests.js` | - | Filename: js-run-tests.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-spl-app/modules/usr/js-run-tests_arguments.json` | - | Filename: js-run-tests_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-spl-app/modules/usr/js-wrap-tests.js` | - | Filename: js-wrap-tests.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-spl-app/modules/usr/js-wrap-tests_arguments.json` | - | Filename: js-wrap-tests_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-spl-app/modules/usr/js-wrapped-execution-tests.js` | - | Filename: js-wrapped-execution-tests.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-spl-app/modules/usr/js-wrapped-execution-tests_arguments.json` | - | Filename: js-wrapped-execution-tests_arguments.jso... | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-spl-app/modules/usr/simple-test.js` | - | Filename: simple-test.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-spl-app/modules/usr/simple-test_arguments.json` | - | Filename: simple-test_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-spl-app/modules/usr/spl-app-basic-tests.js` | - | Filename: spl-app-basic-tests.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-spl-app/modules/usr/spl-app-basic-tests_arguments.json` | - | Filename: spl-app-basic-tests_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-spl-app/modules/usr/spl-app-help-tests.js` | - | Filename: spl-app-help-tests.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-spl-app/modules/usr/spl-app-help-tests_arguments.json` | - | Filename: spl-app-help-tests_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-spl-app/modules/usr/spl-context-test.js` | - | Filename: spl-context-test.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-spl-app/modules/usr/spl-context-test_arguments.json` | - | Filename: spl-context-test_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-spl-app/scripts/args-test.js` | - | Filename: args-test.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-spl-app/scripts/simple-test.js` | - | Filename: simple-test.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-spl-app/scripts/spl-context-test.js` | - | Filename: spl-context-test.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-suite/batches/test.js` | - | Filename: test.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-suite/data/test.txt` | - | Filename: test.txt | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-suite/modules/usr/blob-tests.js` | - | Filename: blob-tests.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-suite/modules/usr/blob-tests_arguments.json` | - | Filename: blob-tests_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-suite/modules/usr/console-tests.js` | - | Filename: console-tests.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-suite/modules/usr/console-tests_arguments.json` | - | Filename: console-tests_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-suite/modules/usr/package-tests.js` | - | Filename: package-tests.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-suite/modules/usr/package-tests_arguments.json` | - | Filename: package-tests_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-suite/modules/usr/test.js` | - | Filename: test.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-suite/modules/usr/test_arguments.json` | - | Filename: test_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-suite/scripts/test.js` | - | Filename: test.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-tools-7zip/data/test.txt` | - | Filename: test.txt | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-tools-7zip/data/test2.txt` | - | Filename: test2.txt | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-tools-7zip/modules/usr/tools-7zip-basic-tests.js` | - | Filename: tools-7zip-basic-tests.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-tools-7zip/modules/usr/tools-7zip-basic-tests_arguments.json` | - | Filename: tools-7zip-basic-tests_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-tools-7zip/modules/usr/tools-7zip-help-tests.js` | - | Filename: tools-7zip-help-tests.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-tools-7zip/modules/usr/tools-7zip-help-tests_arguments.json` | - | Filename: tools-7zip-help-tests_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-tools-git/data/test-repo/test.txt` | - | Filename: test.txt | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-tools-git/data/test-repo/test2.txt` | - | Filename: test2.txt | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-tools-git/modules/usr/console-tests.js` | - | Filename: console-tests.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-tools-git/modules/usr/console-tests_arguments.json` | - | Filename: console-tests_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-tools-git/modules/usr/git-status-tests.js` | - | Filename: git-status-tests.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-tools-git/modules/usr/git-status-tests_arguments.json` | - | Filename: git-status-tests_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-tools-git/modules/usr/test-tools-git_to_release.js` | - | Filename: test-tools-git_to_release.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/test-tools-git/modules/usr/test-tools-git_to_release_arguments.json` | - | Filename: test-tools-git_to_release_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/watcher/batches/test.js` | - | Filename: test.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/watcher/data/test.txt` | - | Filename: test.txt | Review if content should be archived or renamed |
| ⬜ | `spl/apps/watcher/modules/usr/blob-tests.js` | - | Filename: blob-tests.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/watcher/modules/usr/blob-tests_arguments.json` | - | Filename: blob-tests_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/watcher/modules/usr/console-tests.js` | - | Filename: console-tests.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/watcher/modules/usr/console-tests_arguments.json` | - | Filename: console-tests_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/watcher/modules/usr/package-tests.js` | - | Filename: package-tests.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/watcher/modules/usr/package-tests_arguments.json` | - | Filename: package-tests_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/watcher/modules/usr/test.js` | - | Filename: test.js | Review if content should be archived or renamed |
| ⬜ | `spl/apps/watcher/modules/usr/test_arguments.json` | - | Filename: test_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/apps/watcher/scripts/test.js` | - | Filename: test.js | Review if content should be archived or renamed |
| ⬜ | `spl/install/boot/modules/tools/7zip/test.js` | - | Filename: test.js | Review if content should be archived or renamed |
| ⬜ | `spl/install/boot/modules/tools/7zip/test_arguments.json` | - | Filename: test_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/install/boot/modules/usr/deploy_test-boot.js` | - | Filename: deploy_test-boot.js | Review if content should be archived or renamed |
| ⬜ | `spl/install/boot/modules/usr/deploy_test-boot_arguments.json` | - | Filename: deploy_test-boot_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/install/boot/modules/usr/deploy_test-tools-7zip.js` | - | Filename: deploy_test-tools-7zip.js | Review if content should be archived or renamed |
| ⬜ | `spl/install/boot/modules/usr/deploy_test-tools-7zip_arguments.json` | - | Filename: deploy_test-tools-7zip_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/install/boot/modules/usr/deploy_test-tools-git.js` | - | Filename: deploy_test-tools-git.js | Review if content should be archived or renamed |
| ⬜ | `spl/install/boot/modules/usr/deploy_test-tools-git_arguments.json` | - | Filename: deploy_test-tools-git_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/install/boot/modules/usr/test-tools-7zip_to_release.js` | - | Filename: test-tools-7zip_to_release.js | Review if content should be archived or renamed |
| ⬜ | `spl/install/boot/modules/usr/test-tools-7zip_to_release_arguments.json` | - | Filename: test-tools-7zip_to_release_arguments.jso... | Review if content should be archived or renamed |
| ⬜ | `spl/install/boot/modules/usr/test-tools-git_to_release.js` | - | Filename: test-tools-git_to_release.js | Review if content should be archived or renamed |
| ⬜ | `spl/install/boot/modules/usr/test-tools-git_to_release_arguments.json` | - | Filename: test-tools-git_to_release_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/install/modules/tools/7zip/test.js` | - | Filename: test.js | Review if content should be archived or renamed |
| ⬜ | `spl/install/modules/tools/7zip/test_arguments.json` | - | Filename: test_arguments.json | Review if content should be archived or renamed |
| ⬜ | `spl/install/packages/apps_test-boot.json` | - | Filename: apps_test-boot.json | Review if content should be archived or renamed |
| ⬜ | `spl/install/packages/apps_test-spl-app.json` | - | Filename: apps_test-spl-app.json | Review if content should be archived or renamed |
| ⬜ | `spl/install/packages/apps_test-suite.json` | - | Filename: apps_test-suite.json | Review if content should be archived or renamed |
| ⬜ | `spl/install/packages/apps_test-tools-7zip.json` | - | Filename: apps_test-tools-7zip.json | Review if content should be archived or renamed |
| ⬜ | `spl/install/packages/apps_test-tools-git.json` | - | Filename: apps_test-tools-git.json | Review if content should be archived or renamed |
| ⬜ | `spl/test.txt` | - | Filename: test.txt | Review if content should be archived or renamed |

## Low Priority Tasks (2908)

*Minor improvements that can be addressed when convenient. These are summarized by type with examples.*

### experimental_marker (95 instances)

**Pattern**: Experimental/temporary marker found
**Action**: Review if content is now permanent or should be archived

**All Files**:
- [ ] `CLAUDE.md`:74
- [ ] `CLAUDE.md`:226
- [ ] `RELEASE_NOTES_v0.6.1.md`:47
- [ ] `RELEASE_NOTES_v0.6.1.md`:144
- [ ] `claude/operational-docs/persistent-todo-list.md`:11
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:27
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:34
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:63
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:65
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:66
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:68
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:87
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:122
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:147
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:170
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:549
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:553
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:554
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:555
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:556
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:557
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:558
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:559
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:560
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:561
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:562
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:563
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:564
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:566
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:570
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:686
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:688
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:810
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:811
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:830
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:831
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:1
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:7
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:104
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:139
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:164
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:165
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:217
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:227
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:245
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:249
- [ ] `claude/workflows/VERSION_TRANSITION.md`:29
- [ ] `claude/workflows/VERSION_TRANSITION.md`:86
- [ ] `claude/workflows/VERSION_TRANSITION.md`:140
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:3
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:5
- [ ] `docs/architecture/container-unified-entity-strategy.md`:266
- [ ] `docs/architecture/federated-monorepo-design.md`:177
- [ ] `docs/architecture/se1-container-engine-architecture.md`:3
- [ ] `docs/guides/app-development.md`:47
- [ ] `docs/integration/avro-queue-folder-service-design.md`:209
- [ ] `docs/integration/avro-service-definitions-communication.md`:385
- [ ] `docs/integration/qubes-os-overview.md`:34
- [ ] `docs/integration/qubes-os-overview.md`:56
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:21
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:546
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:547
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:548
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:549
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:550
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:551
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:552
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:553
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:554
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:555
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:556
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:557
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:558
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:559
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:560
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:561
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:562
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:563
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:564
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:565
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:569
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:575
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:576
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:577
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:578
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:579
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:580
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:633
- [ ] `docs/specifications/se-1-git-workflow-enforcement-spec.md`:5
- [ ] `docs/specifications/se-1-git-workflow-enforcement-spec.md`:122
- [ ] `docs/specifications/se-1-git-workflow-enforcement-spec.md`:128
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:80
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:129
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:270
- [ ] `docs/workflows/tdd-workflow-architecture.md`:333

### outdated_version_reference (434 instances)

**Pattern**: Outdated version reference: v0.6.2
**Action**: Update to current version: v0.6.1

**All Files**:
- [ ] `RELEASE_NOTES_v0.6.1.md`:134
- [ ] `claude/operational-docs/project-decision-framework.md`:60
- [ ] `claude/operational-docs/project-decision-framework.md`:98
- [ ] `claude/operational-docs/project-decision-framework.md`:134
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:32
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:33
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:33
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:34
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:35
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:36
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:36
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:37
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:37
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:38
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:38
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:39
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:39
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:40
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:40
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:41
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:41
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:42
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:42
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:43
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:43
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:44
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:44
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:45
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:46
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:47
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:48
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:49
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:50
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:50
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:51
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:51
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:52
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:52
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:53
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:53
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:54
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:54
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:55
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:55
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:56
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:56
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:57
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:58
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:59
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:60
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:61
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:62
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:62
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:63
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:63
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:64
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:65
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:65
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:66
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:67
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:68
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:68
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:69
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:70
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:70
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:71
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:71
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:72
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:72
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:73
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:73
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:73
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:74
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:74
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:74
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:75
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:75
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:76
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:76
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:77
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:78
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:79
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:80
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:81
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:82
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:83
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:84
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:85
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:86
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:87
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:88
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:89
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:90
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:91
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:92
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:93
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:94
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:95
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:96
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:97
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:98
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:99
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:100
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:101
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:102
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:103
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:104
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:105
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:106
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:107
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:108
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:109
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:110
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:111
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:112
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:113
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:114
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:115
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:116
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:117
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:118
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:119
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:120
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:121
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:122
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:123
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:124
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:125
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:126
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:127
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:128
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:129
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:130
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:131
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:132
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:133
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:134
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:135
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:136
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:137
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:138
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:139
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:140
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:141
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:142
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:143
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:144
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:145
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:146
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:147
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:148
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:149
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:150
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:151
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:152
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:153
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:154
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:155
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:156
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:157
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:158
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:159
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:160
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:161
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:162
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:163
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:164
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:165
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:166
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:167
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:168
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:169
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:170
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:171
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:172
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:173
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:174
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:175
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:176
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:177
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:178
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:179
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:180
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:181
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:182
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:183
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:184
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:185
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:186
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:187
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:188
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:189
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:190
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:191
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:192
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:193
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:194
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:195
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:196
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:197
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:198
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:199
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:200
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:201
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:202
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:203
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:204
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:205
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:206
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:207
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:208
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:209
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:210
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:211
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:212
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:213
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:214
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:215
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:216
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:217
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:218
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:219
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:220
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:221
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:222
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:223
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:224
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:225
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:226
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:227
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:228
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:229
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:230
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:231
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:232
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:233
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:234
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:235
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:236
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:237
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:238
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:239
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:240
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:241
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:242
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:243
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:244
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:245
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:246
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:247
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:248
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:249
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:250
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:251
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:252
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:253
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:254
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:255
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:256
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:257
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:258
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:259
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:260
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:261
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:262
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:263
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:264
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:265
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:266
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:267
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:268
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:269
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:270
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:271
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:272
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:273
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:274
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:275
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:276
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:277
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:278
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:279
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:280
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:281
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:282
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:283
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:284
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:285
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:286
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:287
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:288
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:289
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:290
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:291
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:292
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:293
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:294
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:295
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:296
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:297
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:298
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:299
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:300
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:301
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:302
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:303
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:304
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:305
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:306
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:307
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:308
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:309
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:310
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:311
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:312
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:313
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:314
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:315
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:316
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:317
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:318
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:319
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:320
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:321
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:322
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:323
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:324
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:325
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:326
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:327
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:328
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:329
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:330
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:331
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:332
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:333
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:334
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:335
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:336
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:337
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:338
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:339
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:340
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:341
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:342
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:343
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:344
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:345
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:346
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:347
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:348
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:349
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:350
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:351
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:352
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:353
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:354
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:355
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:356
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:357
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:358
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:359
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:360
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:361
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:362
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:363
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:364
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:365
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:366
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:367
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:368
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:369
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:370
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:371
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:372
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:373
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:374
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:375
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:376
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:377
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:378
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:379
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:380
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:381
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:382
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:383
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:384
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:385
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:386
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:387
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:388
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:389
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:390
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:391
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:392
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:393
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:394
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:395
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:396
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:397
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:398
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:398
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:399
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:399
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:400
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:400
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:401
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:401
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:402
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:403
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:403
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:404
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:404
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:405
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:405
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:406
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:406
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:706
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:828
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:828
- [ ] `claude/workflows/GITHUB_WORKFLOW.md`:31
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:17
- [ ] `claude/workflows/NEXT_ISSUE.md`:45
- [ ] `claude/workflows/NEXT_ISSUE.md`:138
- [ ] `claude/workflows/PLANNED_VS_UNPLANNED.md`:72
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:38
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:60
- [ ] `claude/workflows/RELEASE_PROCESS.md`:90
- [ ] `claude/workflows/RELEASE_PROCESS.md`:92
- [ ] `claude/workflows/RELEASE_PROCESS.md`:94
- [ ] `claude/workflows/RELEASE_PROCESS.md`:196
- [ ] `claude/workflows/RELEASE_PROCESS.md`:197
- [ ] `claude/workflows/RELEASE_PROCESS.md`:198
- [ ] `claude/workflows/RELEASE_PROCESS.md`:199

### broken_file_reference (238 instances)

**Pattern**: File reference not found: docs/project-overview.md
**Action**: Update path or verify file exists

**All Files**:
- [ ] `CLAUDE.md`:28
- [ ] `CLAUDE.md`:29
- [ ] `CLAUDE.md`:81
- [ ] `CLAUDE.md`:141
- [ ] `CLAUDE.md`:262
- [ ] `CLAUDE.md`:263
- [ ] `CLAUDE.md`:264
- [ ] `CLAUDE.md`:265
- [ ] `CLAUDE.md`:268
- [ ] `CLAUDE.md`:269
- [ ] `CLAUDE.md`:270
- [ ] `CLAUDE.md`:271
- [ ] `RELEASE_NOTES_v0.6.1.md`:48
- [ ] `RELEASE_NOTES_v0.6.1.md`:54
- [ ] `RELEASE_NOTES_v0.6.1.md`:60
- [ ] `RELEASE_NOTES_v0.6.1.md`:102
- [ ] `RELEASE_NOTES_v0.6.1.md`:103
- [ ] `RELEASE_NOTES_v0.6.1.md`:104
- [ ] `RELEASE_NOTES_v0.6.1.md`:105
- [ ] `RELEASE_NOTES_v0.6.1.md`:106
- [ ] `RELEASE_NOTES_v0.6.1.md`:109
- [ ] `RELEASE_NOTES_v0.6.1.md`:110
- [ ] `RELEASE_NOTES_v0.6.1.md`:114
- [ ] `RELEASE_NOTES_v0.6.1.md`:115
- [ ] `claude/operational-docs/docs-organization-strategy.md`:20
- [ ] `claude/operational-docs/docs-organization-strategy.md`:21
- [ ] `claude/operational-docs/docs-organization-strategy.md`:22
- [ ] `claude/operational-docs/docs-organization-strategy.md`:23
- [ ] `claude/operational-docs/docs-organization-strategy.md`:24
- [ ] `claude/operational-docs/docs-organization-strategy.md`:25
- [ ] `claude/operational-docs/docs-organization-strategy.md`:26
- [ ] `claude/operational-docs/docs-organization-strategy.md`:27
- [ ] `claude/operational-docs/docs-organization-strategy.md`:28
- [ ] `claude/operational-docs/docs-organization-strategy.md`:32
- [ ] `claude/operational-docs/docs-organization-strategy.md`:33
- [ ] `claude/operational-docs/docs-organization-strategy.md`:34
- [ ] `claude/operational-docs/docs-organization-strategy.md`:35
- [ ] `claude/operational-docs/docs-organization-strategy.md`:36
- [ ] `claude/operational-docs/docs-organization-strategy.md`:37
- [ ] `claude/operational-docs/docs-organization-strategy.md`:41
- [ ] `claude/operational-docs/docs-organization-strategy.md`:42
- [ ] `claude/operational-docs/docs-organization-strategy.md`:43
- [ ] `claude/operational-docs/docs-organization-strategy.md`:44
- [ ] `claude/operational-docs/docs-organization-strategy.md`:45
- [ ] `claude/operational-docs/docs-organization-strategy.md`:46
- [ ] `claude/operational-docs/docs-organization-strategy.md`:47
- [ ] `claude/operational-docs/docs-organization-strategy.md`:51
- [ ] `claude/operational-docs/docs-organization-strategy.md`:52
- [ ] `claude/operational-docs/docs-organization-strategy.md`:53
- [ ] `claude/operational-docs/docs-organization-strategy.md`:54
- [ ] `claude/operational-docs/docs-organization-strategy.md`:55
- [ ] `claude/operational-docs/docs-organization-strategy.md`:59
- [ ] `claude/operational-docs/docs-organization-strategy.md`:60
- [ ] `claude/operational-docs/docs-organization-strategy.md`:61
- [ ] `claude/operational-docs/docs-organization-strategy.md`:62
- [ ] `claude/operational-docs/docs-organization-strategy.md`:63
- [ ] `claude/operational-docs/docs-organization-strategy.md`:64
- [ ] `claude/operational-docs/docs-organization-strategy.md`:65
- [ ] `claude/operational-docs/docs-organization-strategy.md`:66
- [ ] `claude/operational-docs/docs-organization-strategy.md`:70
- [ ] `claude/operational-docs/docs-organization-strategy.md`:71
- [ ] `claude/operational-docs/docs-organization-strategy.md`:72
- [ ] `claude/operational-docs/docs-organization-strategy.md`:73
- [ ] `claude/operational-docs/docs-organization-strategy.md`:74
- [ ] `claude/operational-docs/docs-organization-strategy.md`:75
- [ ] `claude/operational-docs/docs-organization-strategy.md`:76
- [ ] `claude/operational-docs/docs-organization-strategy.md`:77
- [ ] `claude/operational-docs/docs-organization-strategy.md`:81
- [ ] `claude/operational-docs/docs-organization-strategy.md`:82
- [ ] `claude/operational-docs/docs-organization-strategy.md`:83
- [ ] `claude/operational-docs/docs-organization-strategy.md`:84
- [ ] `claude/operational-docs/docs-organization-strategy.md`:85
- [ ] `claude/operational-docs/docs-organization-strategy.md`:89
- [ ] `claude/operational-docs/docs-organization-strategy.md`:90
- [ ] `claude/operational-docs/docs-organization-strategy.md`:91
- [ ] `claude/operational-docs/docs-organization-strategy.md`:92
- [ ] `claude/operational-docs/docs-organization-strategy.md`:93
- [ ] `claude/operational-docs/docs-organization-strategy.md`:97
- [ ] `claude/operational-docs/docs-organization-strategy.md`:98
- [ ] `claude/operational-docs/docs-organization-strategy.md`:99
- [ ] `claude/operational-docs/docs-organization-strategy.md`:100
- [ ] `claude/operational-docs/docs-organization-strategy.md`:101
- [ ] `claude/operational-docs/docs-organization-strategy.md`:102
- [ ] `claude/operational-docs/docs-organization-strategy.md`:103
- [ ] `claude/operational-docs/docs-organization-strategy.md`:104
- [ ] `claude/operational-docs/docs-organization-strategy.md`:105
- [ ] `claude/operational-docs/docs-organization-strategy.md`:106
- [ ] `claude/operational-docs/docs-organization-strategy.md`:107
- [ ] `claude/operational-docs/docs-organization-strategy.md`:111
- [ ] `claude/operational-docs/docs-organization-strategy.md`:112
- [ ] `claude/operational-docs/docs-organization-strategy.md`:113
- [ ] `claude/operational-docs/docs-organization-strategy.md`:114
- [ ] `claude/operational-docs/docs-organization-strategy.md`:115
- [ ] `claude/operational-docs/persistent-todo-list.md`:14
- [ ] `claude/operational-docs/project-api-research-findings.md`:36
- [ ] `claude/operational-docs/project-decision-framework.md`:7
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:22
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:128
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:460
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:461
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:462
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:463
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:464
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:465
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:466
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:467
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:468
- [ ] `claude/workflows/ESSENTIAL_COMMANDS.md`:26
- [ ] `claude/workflows/GIT_WORKFLOW.md`:211
- [ ] `claude/workflows/OPERATIONAL_RULES.md`:20
- [ ] `claude/workflows/OPERATIONAL_RULES.md`:34
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:7
- [ ] `claude/workflows/VERSION_TRANSITION.md`:34
- [ ] `docs/api/execute-api-properties.md`:59
- [ ] `docs/api/execute-api-properties.md`:60
- [ ] `docs/api/package-api-properties.md`:31
- [ ] `docs/architecture/federated-monorepo-design.md`:140
- [ ] `docs/architecture/federated-monorepo-design.md`:159
- [ ] `docs/architecture/project-overview.md`:10
- [ ] `docs/architecture/project-overview.md`:11
- [ ] `docs/architecture/project-overview.md`:11
- [ ] `docs/architecture/project-overview.md`:11
- [ ] `docs/architecture/project-overview.md`:18
- [ ] `docs/architecture/project-overview.md`:18
- [ ] `docs/architecture/project-overview.md`:18
- [ ] `docs/architecture/project-overview.md`:18
- [ ] `docs/architecture/project-overview.md`:22
- [ ] `docs/architecture/project-overview.md`:22
- [ ] `docs/architecture/project-overview.md`:22
- [ ] `docs/architecture/project-overview.md`:22
- [ ] `docs/architecture/project-overview.md`:22
- [ ] `docs/architecture/project-overview.md`:29
- [ ] `docs/architecture/project-overview.md`:29
- [ ] `docs/architecture/project-overview.md`:29
- [ ] `docs/architecture/project-overview.md`:30
- [ ] `docs/architecture/project-overview.md`:30
- [ ] `docs/architecture/project-overview.md`:30
- [ ] `docs/guides/app-development.md`:15
- [ ] `docs/guides/app-development.md`:55
- [ ] `docs/guides/app-development.md`:97
- [ ] `docs/guides/app-development.md`:118
- [ ] `docs/guides/app-development.md`:152
- [ ] `docs/guides/app-development.md`:152
- [ ] `docs/guides/app-development.md`:152
- [ ] `docs/guides/current-development-process.md`:30
- [ ] `docs/guides/current-development-process.md`:31
- [ ] `docs/guides/current-development-process.md`:41
- [ ] `docs/guides/how-to.md`:89
- [ ] `docs/guides/implementing-new-api.md`:43
- [ ] `docs/guides/implementing-new-api.md`:59
- [ ] `docs/guides/implementing-new-api.md`:81
- [ ] `docs/guides/implementing-new-api.md`:146
- [ ] `docs/integration/avro-schema-architecture.md`:10
- [ ] `docs/integration/avro-schema-architecture.md`:20
- [ ] `docs/knowledge/lessons-learned.md`:21
- [ ] `docs/management/decision-log.md`:9
- [ ] `docs/management/decision-log.md`:38
- [ ] `docs/management/decision-log.md`:73
- [ ] `docs/reference/boot-app-functionality.md`:35
- [ ] `docs/reference/boot-app-functionality.md`:41
- [ ] `docs/reference/boot-app-functionality.md`:45
- [ ] `docs/reference/boot-app-functionality.md`:51
- [ ] `docs/reference/boot-app-functionality.md`:59
- [ ] `docs/reference/boot-app-functionality.md`:63
- [ ] `docs/reference/boot-app-functionality.md`:67
- [ ] `docs/reference/boot-app-functionality.md`:71
- [ ] `docs/reference/boot-app-functionality.md`:72
- [ ] `docs/reference/boot-app-functionality.md`:73
- [ ] `docs/reference/boot-app-functionality.md`:78
- [ ] `docs/reference/boot-app-functionality.md`:82
- [ ] `docs/reference/node-dependency-audit.md`:92
- [ ] `docs/reference/prerequisites.md`:68
- [ ] `docs/reference/quick-reference.md`:59
- [ ] `docs/reference/quick-reference.md`:60
- [ ] `docs/reference/test-app-development.md`:27
- [ ] `docs/reference/test-app-development.md`:49
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:453
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:454
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:455
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:456
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:457
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:458
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:459
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:460
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:461
- [ ] `docs/specifications/audit-log-architecture.md`:5
- [ ] `docs/specifications/audit-log-architecture.md`:25
- [ ] `docs/specifications/audit-log-architecture.md`:29
- [ ] `docs/specifications/audit-log-architecture.md`:30
- [ ] `docs/specifications/audit-log-architecture.md`:64
- [ ] `docs/specifications/audit-log-architecture.md`:114
- [ ] `docs/specifications/audit-log-architecture.md`:120
- [ ] `docs/specifications/audit-log-migration-plan.md`:5
- [ ] `docs/specifications/audit-log-migration-plan.md`:10
- [ ] `docs/specifications/audit-log-migration-plan.md`:29
- [ ] `docs/specifications/audit-log-migration-plan.md`:54
- [ ] `docs/specifications/audit-log-migration-plan.md`:119
- [ ] `docs/specifications/audit-log-migration-plan.md`:134
- [ ] `docs/specifications/claude-directory-specification.md`:27
- [ ] `docs/specifications/claude-directory-specification.md`:27
- [ ] `docs/specifications/claude-directory-specification.md`:28
- [ ] `docs/specifications/claude-directory-specification.md`:28
- [ ] `docs/specifications/claude-directory-specification.md`:29
- [ ] `docs/specifications/claude-directory-specification.md`:38
- [ ] `docs/specifications/claude-directory-specification.md`:39
- [ ] `docs/specifications/claude-directory-specification.md`:40
- [ ] `docs/specifications/claude-directory-specification.md`:41
- [ ] `docs/specifications/claude-directory-specification.md`:49
- [ ] `docs/specifications/claude-directory-specification.md`:50
- [ ] `docs/specifications/claude-directory-specification.md`:51
- [ ] `docs/specifications/claude-directory-specification.md`:52
- [ ] `docs/specifications/claude-directory-specification.md`:60
- [ ] `docs/specifications/claude-directory-specification.md`:61
- [ ] `docs/specifications/claude-directory-specification.md`:62
- [ ] `docs/specifications/claude-directory-specification.md`:63
- [ ] `docs/specifications/claude-directory-specification.md`:72
- [ ] `docs/specifications/claude-directory-specification.md`:73
- [ ] `docs/specifications/claude-directory-specification.md`:74
- [ ] `docs/specifications/claude-directory-specification.md`:88
- [ ] `docs/specifications/claude-directory-specification.md`:89
- [ ] `docs/specifications/claude-directory-specification.md`:90
- [ ] `docs/specifications/claude-directory-specification.md`:91
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:34
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:44
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:45
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:46
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:47
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:48
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:81
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:129
- [ ] `docs/workflows/code-quality-patterns.md`:14
- [ ] `docs/workflows/code-quality-patterns.md`:17
- [ ] `docs/workflows/code-quality-patterns.md`:24
- [ ] `docs/workflows/code-quality-patterns.md`:27
- [ ] `docs/workflows/phase-based-implementation-guide.md`:303
- [ ] `docs/workflows/tdd-workflow-architecture.md`:12
- [ ] `docs/workflows/tdd-workflow-architecture.md`:16
- [ ] `docs/workflows/testing-frameworks.md`:50

### version_specific (3 instances)

**Pattern**: Version-specific content may need archiving
**Action**: Consider archiving if version is completed

**All Files**:
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`
- [ ] `docs/workflows/phase-based-development-strategy.md`

### terminology_inconsistency (4 instances)

**Pattern**: Inconsistent usage: REPOSITORY, Repository
**Action**: Standardize on: repository

**All Files**:
- [ ] `multiple files`
- [ ] `multiple files`
- [ ] `multiple files`
- [ ] `multiple files`

### header_formatting (1758 instances)

**Pattern**: Header missing space after #
**Action**: Add space after # for proper markdown formatting

**All Files**:
- [ ] `CLAUDE.md`:5
- [ ] `CLAUDE.md`:22
- [ ] `CLAUDE.md`:32
- [ ] `CLAUDE.md`:55
- [ ] `CLAUDE.md`:59
- [ ] `CLAUDE.md`:64
- [ ] `CLAUDE.md`:71
- [ ] `CLAUDE.md`:78
- [ ] `CLAUDE.md`:85
- [ ] `CLAUDE.md`:89
- [ ] `CLAUDE.md`:94
- [ ] `CLAUDE.md`:100
- [ ] `CLAUDE.md`:105
- [ ] `CLAUDE.md`:110
- [ ] `CLAUDE.md`:118
- [ ] `CLAUDE.md`:122
- [ ] `CLAUDE.md`:128
- [ ] `CLAUDE.md`:134
- [ ] `CLAUDE.md`:143
- [ ] `CLAUDE.md`:147
- [ ] `CLAUDE.md`:152
- [ ] `CLAUDE.md`:174
- [ ] `CLAUDE.md`:187
- [ ] `CLAUDE.md`:210
- [ ] `CLAUDE.md`:214
- [ ] `CLAUDE.md`:230
- [ ] `CLAUDE.md`:242
- [ ] `CLAUDE.md`:249
- [ ] `CLAUDE.md`:258
- [ ] `CLAUDE.md`:274
- [ ] `CLAUDE.md`:278
- [ ] `CLAUDE.md`:282
- [ ] `INSTALL.md`:5
- [ ] `INSTALL.md`:13
- [ ] `INSTALL.md`:15
- [ ] `INSTALL.md`:33
- [ ] `INSTALL.md`:53
- [ ] `INSTALL.md`:65
- [ ] `INSTALL.md`:75
- [ ] `README.md`:7
- [ ] `README.md`:23
- [ ] `README.md`:33
- [ ] `README.md`:44
- [ ] `README.md`:52
- [ ] `README.md`:70
- [ ] `README.md`:85
- [ ] `README.md`:87
- [ ] `README.md`:99
- [ ] `README.md`:107
- [ ] `README.md`:114
- [ ] `README.md`:123
- [ ] `README.md`:133
- [ ] `README.md`:139
- [ ] `README.md`:145
- [ ] `README.md`:149
- [ ] `README.md`:153
- [ ] `README.md`:178
- [ ] `README.md`:189
- [ ] `README.md`:199
- [ ] `README.md`:206
- [ ] `RELEASE_NOTES_v0.6.1.md`:7
- [ ] `RELEASE_NOTES_v0.6.1.md`:11
- [ ] `RELEASE_NOTES_v0.6.1.md`:13
- [ ] `RELEASE_NOTES_v0.6.1.md`:27
- [ ] `RELEASE_NOTES_v0.6.1.md`:29
- [ ] `RELEASE_NOTES_v0.6.1.md`:34
- [ ] `RELEASE_NOTES_v0.6.1.md`:39
- [ ] `RELEASE_NOTES_v0.6.1.md`:44
- [ ] `RELEASE_NOTES_v0.6.1.md`:50
- [ ] `RELEASE_NOTES_v0.6.1.md`:56
- [ ] `RELEASE_NOTES_v0.6.1.md`:62
- [ ] `RELEASE_NOTES_v0.6.1.md`:67
- [ ] `RELEASE_NOTES_v0.6.1.md`:69
- [ ] `RELEASE_NOTES_v0.6.1.md`:75
- [ ] `RELEASE_NOTES_v0.6.1.md`:81
- [ ] `RELEASE_NOTES_v0.6.1.md`:83
- [ ] `RELEASE_NOTES_v0.6.1.md`:89
- [ ] `RELEASE_NOTES_v0.6.1.md`:94
- [ ] `RELEASE_NOTES_v0.6.1.md`:99
- [ ] `RELEASE_NOTES_v0.6.1.md`:101
- [ ] `RELEASE_NOTES_v0.6.1.md`:108
- [ ] `RELEASE_NOTES_v0.6.1.md`:113
- [ ] `RELEASE_NOTES_v0.6.1.md`:117
- [ ] `RELEASE_NOTES_v0.6.1.md`:119
- [ ] `RELEASE_NOTES_v0.6.1.md`:124
- [ ] `RELEASE_NOTES_v0.6.1.md`:129
- [ ] `RELEASE_NOTES_v0.6.1.md`:134
- [ ] `RELEASE_NOTES_v0.6.1.md`:136
- [ ] `RELEASE_NOTES_v0.6.1.md`:142
- [ ] `RELEASE_NOTES_v0.6.1.md`:147
- [ ] `RELEASE_NOTES_v0.6.1.md`:155
- [ ] `claude/operational-docs/docs-organization-strategy.md`:3
- [ ] `claude/operational-docs/docs-organization-strategy.md`:5
- [ ] `claude/operational-docs/docs-organization-strategy.md`:11
- [ ] `claude/operational-docs/docs-organization-strategy.md`:16
- [ ] `claude/operational-docs/docs-organization-strategy.md`:18
- [ ] `claude/operational-docs/docs-organization-strategy.md`:30
- [ ] `claude/operational-docs/docs-organization-strategy.md`:39
- [ ] `claude/operational-docs/docs-organization-strategy.md`:49
- [ ] `claude/operational-docs/docs-organization-strategy.md`:57
- [ ] `claude/operational-docs/docs-organization-strategy.md`:68
- [ ] `claude/operational-docs/docs-organization-strategy.md`:79
- [ ] `claude/operational-docs/docs-organization-strategy.md`:87
- [ ] `claude/operational-docs/docs-organization-strategy.md`:95
- [ ] `claude/operational-docs/docs-organization-strategy.md`:109
- [ ] `claude/operational-docs/docs-organization-strategy.md`:117
- [ ] `claude/operational-docs/docs-organization-strategy.md`:119
- [ ] `claude/operational-docs/docs-organization-strategy.md`:125
- [ ] `claude/operational-docs/docs-organization-strategy.md`:131
- [ ] `claude/operational-docs/docs-organization-strategy.md`:136
- [ ] `claude/operational-docs/docs-organization-strategy.md`:140
- [ ] `claude/operational-docs/docs-organization-strategy.md`:143
- [ ] `claude/operational-docs/docs-organization-strategy.md`:147
- [ ] `claude/operational-docs/docs-organization-strategy.md`:153
- [ ] `claude/operational-docs/docs-organization-strategy.md`:158
- [ ] `claude/operational-docs/docs-organization-strategy.md`:162
- [ ] `claude/operational-docs/docs-organization-strategy.md`:169
- [ ] `claude/operational-docs/persistent-todo-list.md`:3
- [ ] `claude/operational-docs/persistent-todo-list.md`:7
- [ ] `claude/operational-docs/project-api-research-findings.md`:3
- [ ] `claude/operational-docs/project-api-research-findings.md`:8
- [ ] `claude/operational-docs/project-api-research-findings.md`:10
- [ ] `claude/operational-docs/project-api-research-findings.md`:15
- [ ] `claude/operational-docs/project-api-research-findings.md`:20
- [ ] `claude/operational-docs/project-api-research-findings.md`:22
- [ ] `claude/operational-docs/project-api-research-findings.md`:29
- [ ] `claude/operational-docs/project-api-research-findings.md`:34
- [ ] `claude/operational-docs/project-api-research-findings.md`:39
- [ ] `claude/operational-docs/project-api-research-findings.md`:51
- [ ] `claude/operational-docs/project-decision-framework.md`:3
- [ ] `claude/operational-docs/project-decision-framework.md`:5
- [ ] `claude/operational-docs/project-decision-framework.md`:9
- [ ] `claude/operational-docs/project-decision-framework.md`:27
- [ ] `claude/operational-docs/project-decision-framework.md`:49
- [ ] `claude/operational-docs/project-decision-framework.md`:57
- [ ] `claude/operational-docs/project-decision-framework.md`:73
- [ ] `claude/operational-docs/project-decision-framework.md`:91
- [ ] `claude/operational-docs/project-decision-framework.md`:117
- [ ] `claude/operational-docs/project-decision-framework.md`:119
- [ ] `claude/operational-docs/project-decision-framework.md`:149
- [ ] `claude/operational-docs/project-decision-framework.md`:164
- [ ] `claude/operational-docs/project-decision-framework.md`:170
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:3
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:9
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:11
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:13
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:21
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:29
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:37
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:39
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:47
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:55
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:63
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:65
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:73
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:81
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:89
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:91
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:99
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:107
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:115
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:117
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:127
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:138
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:140
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:145
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:150
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:155
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:157
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:162
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:167
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:174
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:176
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:181
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:186
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:8
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:12
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:14
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:19
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:24
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:28
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:408
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:545
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:549
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:566
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:682
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:686
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:704
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:722
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:740
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:749
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:760
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:778
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:796
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:798
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:803
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:819
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:821
- [ ] `claude/operational-docs/repository-maintenance-tasks-v0.6.1.md`:827
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:3
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:16
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:18
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:20
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:37
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:52
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:67
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:69
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:75
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:80
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:86
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:88
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:96
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:101
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:107
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:109
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:114
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:119
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:124
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:126
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:138
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:150
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:162
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:164
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:169
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:174
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:181
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:183
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:188
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:193
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:198
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:202
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:204
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:210
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:216
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:222
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:224
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:229
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:234
- [ ] `claude/operational-docs/session-summary-version-transition-prototypes.md`:239
- [ ] `claude/workflows/AUDIT_LOGGING.md`:3
- [ ] `claude/workflows/AUDIT_LOGGING.md`:7
- [ ] `claude/workflows/AUDIT_LOGGING.md`:9
- [ ] `claude/workflows/AUDIT_LOGGING.md`:15
- [ ] `claude/workflows/AUDIT_LOGGING.md`:22
- [ ] `claude/workflows/AUDIT_LOGGING.md`:27
- [ ] `claude/workflows/AUDIT_LOGGING.md`:29
- [ ] `claude/workflows/AUDIT_LOGGING.md`:42
- [ ] `claude/workflows/AUDIT_LOGGING.md`:44
- [ ] `claude/workflows/AUDIT_LOGGING.md`:49
- [ ] `claude/workflows/AUDIT_LOGGING.md`:54
- [ ] `claude/workflows/AUDIT_LOGGING.md`:59
- [ ] `claude/workflows/AUDIT_LOGGING.md`:61
- [ ] `claude/workflows/AUDIT_LOGGING.md`:67
- [ ] `claude/workflows/AUDIT_LOGGING.md`:73
- [ ] `claude/workflows/AUDIT_LOGGING.md`:83
- [ ] `claude/workflows/AUDIT_LOGGING.md`:88
- [ ] `claude/workflows/AUDIT_LOGGING.md`:90
- [ ] `claude/workflows/AUDIT_LOGGING.md`:96
- [ ] `claude/workflows/AUDIT_LOGGING.md`:103
- [ ] `claude/workflows/AUDIT_LOGGING.md`:109
- [ ] `claude/workflows/AUDIT_LOGGING.md`:111
- [ ] `claude/workflows/AUDIT_LOGGING.md`:131
- [ ] `claude/workflows/AUDIT_LOGGING.md`:133
- [ ] `claude/workflows/AUDIT_LOGGING.md`:140
- [ ] `claude/workflows/AUDIT_LOGGING.md`:150
- [ ] `claude/workflows/AUDIT_LOGGING.md`:152
- [ ] `claude/workflows/AUDIT_LOGGING.md`:160
- [ ] `claude/workflows/AUDIT_LOGGING.md`:171
- [ ] `claude/workflows/AUDIT_LOGGING.md`:173
- [ ] `claude/workflows/AUDIT_LOGGING.md`:182
- [ ] `claude/workflows/AUDIT_LOGGING.md`:189
- [ ] `claude/workflows/AUDIT_LOGGING.md`:191
- [ ] `claude/workflows/AUDIT_LOGGING.md`:197
- [ ] `claude/workflows/ESSENTIAL_COMMANDS.md`:3
- [ ] `claude/workflows/ESSENTIAL_COMMANDS.md`:9
- [ ] `claude/workflows/ESSENTIAL_COMMANDS.md`:18
- [ ] `claude/workflows/ESSENTIAL_COMMANDS.md`:24
- [ ] `claude/workflows/GITHUB_WORKFLOW.md`:3
- [ ] `claude/workflows/GITHUB_WORKFLOW.md`:6
- [ ] `claude/workflows/GITHUB_WORKFLOW.md`:15
- [ ] `claude/workflows/GITHUB_WORKFLOW.md`:17
- [ ] `claude/workflows/GITHUB_WORKFLOW.md`:28
- [ ] `claude/workflows/GITHUB_WORKFLOW.md`:35
- [ ] `claude/workflows/GITHUB_WORKFLOW.md`:42
- [ ] `claude/workflows/GITHUB_WORKFLOW.md`:49
- [ ] `claude/workflows/GITHUB_WORKFLOW.md`:51
- [ ] `claude/workflows/GITHUB_WORKFLOW.md`:61
- [ ] `claude/workflows/GITHUB_WORKFLOW.md`:68
- [ ] `claude/workflows/GITHUB_WORKFLOW.md`:71
- [ ] `claude/workflows/GITHUB_WORKFLOW.md`:79
- [ ] `claude/workflows/GITHUB_WORKFLOW.md`:84
- [ ] `claude/workflows/GITHUB_WORKFLOW.md`:86
- [ ] `claude/workflows/GITHUB_WORKFLOW.md`:93
- [ ] `claude/workflows/GITHUB_WORKFLOW.md`:99
- [ ] `claude/workflows/GITHUB_WORKFLOW.md`:105
- [ ] `claude/workflows/GIT_WORKFLOW.md`:3
- [ ] `claude/workflows/GIT_WORKFLOW.md`:6
- [ ] `claude/workflows/GIT_WORKFLOW.md`:11
- [ ] `claude/workflows/GIT_WORKFLOW.md`:15
- [ ] `claude/workflows/GIT_WORKFLOW.md`:22
- [ ] `claude/workflows/GIT_WORKFLOW.md`:32
- [ ] `claude/workflows/GIT_WORKFLOW.md`:40
- [ ] `claude/workflows/GIT_WORKFLOW.md`:44
- [ ] `claude/workflows/GIT_WORKFLOW.md`:69
- [ ] `claude/workflows/GIT_WORKFLOW.md`:99
- [ ] `claude/workflows/GIT_WORKFLOW.md`:101
- [ ] `claude/workflows/GIT_WORKFLOW.md`:110
- [ ] `claude/workflows/GIT_WORKFLOW.md`:115
- [ ] `claude/workflows/GIT_WORKFLOW.md`:134
- [ ] `claude/workflows/GIT_WORKFLOW.md`:159
- [ ] `claude/workflows/GIT_WORKFLOW.md`:161
- [ ] `claude/workflows/GIT_WORKFLOW.md`:192
- [ ] `claude/workflows/GIT_WORKFLOW.md`:198
- [ ] `claude/workflows/GIT_WORKFLOW.md`:209
- [ ] `claude/workflows/KEYWORD_REGISTRY.md`:5
- [ ] `claude/workflows/KEYWORD_REGISTRY.md`:23
- [ ] `claude/workflows/KEYWORD_REGISTRY.md`:38
- [ ] `claude/workflows/KEYWORD_REGISTRY.md`:52
- [ ] `claude/workflows/KEYWORD_REGISTRY.md`:63
- [ ] `claude/workflows/KEYWORD_REGISTRY.md`:72
- [ ] `claude/workflows/KEYWORD_REGISTRY.md`:88
- [ ] `claude/workflows/KEYWORD_REGISTRY.md`:97
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:3
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:12
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:14
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:22
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:37
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:48
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:60
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:73
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:75
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:84
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:89
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:94
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:96
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:102
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:108
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:113
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:115
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:120
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:125
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:130
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:132
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:138
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:144
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:150
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:156
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:158
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:163
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:168
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:173
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:175
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:180
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:185
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:190
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:192
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:197
- [ ] `claude/workflows/NEXT_ISSUE.md`:3
- [ ] `claude/workflows/NEXT_ISSUE.md`:6
- [ ] `claude/workflows/NEXT_ISSUE.md`:8
- [ ] `claude/workflows/NEXT_ISSUE.md`:14
- [ ] `claude/workflows/NEXT_ISSUE.md`:16
- [ ] `claude/workflows/NEXT_ISSUE.md`:21
- [ ] `claude/workflows/NEXT_ISSUE.md`:26
- [ ] `claude/workflows/NEXT_ISSUE.md`:31
- [ ] `claude/workflows/NEXT_ISSUE.md`:33
- [ ] `claude/workflows/NEXT_ISSUE.md`:38
- [ ] `claude/workflows/NEXT_ISSUE.md`:43
- [ ] `claude/workflows/NEXT_ISSUE.md`:48
- [ ] `claude/workflows/NEXT_ISSUE.md`:56
- [ ] `claude/workflows/NEXT_ISSUE.md`:58
- [ ] `claude/workflows/NEXT_ISSUE.md`:63
- [ ] `claude/workflows/NEXT_ISSUE.md`:70
- [ ] `claude/workflows/NEXT_ISSUE.md`:76
- [ ] `claude/workflows/NEXT_ISSUE.md`:78
- [ ] `claude/workflows/NEXT_ISSUE.md`:83
- [ ] `claude/workflows/NEXT_ISSUE.md`:88
- [ ] `claude/workflows/NEXT_ISSUE.md`:93
- [ ] `claude/workflows/NEXT_ISSUE.md`:95
- [ ] `claude/workflows/NEXT_ISSUE.md`:101
- [ ] `claude/workflows/NEXT_ISSUE.md`:107
- [ ] `claude/workflows/NEXT_ISSUE.md`:109
- [ ] `claude/workflows/NEXT_ISSUE.md`:119
- [ ] `claude/workflows/NEXT_ISSUE.md`:127
- [ ] `claude/workflows/NEXT_ISSUE.md`:134
- [ ] `claude/workflows/NEXT_ISSUE.md`:136
- [ ] `claude/workflows/NEXT_ISSUE.md`:142
- [ ] `claude/workflows/NEXT_ISSUE.md`:148
- [ ] `claude/workflows/OPERATIONAL_RULES.md`:3
- [ ] `claude/workflows/OPERATIONAL_RULES.md`:12
- [ ] `claude/workflows/OPERATIONAL_RULES.md`:22
- [ ] `claude/workflows/OPERATIONAL_RULES.md`:28
- [ ] `claude/workflows/OPERATIONAL_RULES.md`:33
- [ ] `claude/workflows/PLANNED_VS_UNPLANNED.md`:3
- [ ] `claude/workflows/PLANNED_VS_UNPLANNED.md`:5
- [ ] `claude/workflows/PLANNED_VS_UNPLANNED.md`:12
- [ ] `claude/workflows/PLANNED_VS_UNPLANNED.md`:19
- [ ] `claude/workflows/PLANNED_VS_UNPLANNED.md`:21
- [ ] `claude/workflows/PLANNED_VS_UNPLANNED.md`:26
- [ ] `claude/workflows/PLANNED_VS_UNPLANNED.md`:31
- [ ] `claude/workflows/PLANNED_VS_UNPLANNED.md`:36
- [ ] `claude/workflows/PLANNED_VS_UNPLANNED.md`:38
- [ ] `claude/workflows/PLANNED_VS_UNPLANNED.md`:45
- [ ] `claude/workflows/PLANNED_VS_UNPLANNED.md`:53
- [ ] `claude/workflows/PLANNED_VS_UNPLANNED.md`:55
- [ ] `claude/workflows/PLANNED_VS_UNPLANNED.md`:69
- [ ] `claude/workflows/PLANNED_VS_UNPLANNED.md`:76
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:3
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:6
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:10
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:12
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:19
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:26
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:33
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:35
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:40
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:45
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:50
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:52
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:57
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:62
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:67
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:69
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:75
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:80
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:85
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:87
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:92
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:97
- [ ] `claude/workflows/RELEASE_PROCESS.md`:5
- [ ] `claude/workflows/RELEASE_PROCESS.md`:9
- [ ] `claude/workflows/RELEASE_PROCESS.md`:11
- [ ] `claude/workflows/RELEASE_PROCESS.md`:16
- [ ] `claude/workflows/RELEASE_PROCESS.md`:32
- [ ] `claude/workflows/RELEASE_PROCESS.md`:51
- [ ] `claude/workflows/RELEASE_PROCESS.md`:66
- [ ] `claude/workflows/RELEASE_PROCESS.md`:76
- [ ] `claude/workflows/RELEASE_PROCESS.md`:78
- [ ] `claude/workflows/RELEASE_PROCESS.md`:80
- [ ] `claude/workflows/RELEASE_PROCESS.md`:81
- [ ] `claude/workflows/RELEASE_PROCESS.md`:82
- [ ] `claude/workflows/RELEASE_PROCESS.md`:83
- [ ] `claude/workflows/RELEASE_PROCESS.md`:84
- [ ] `claude/workflows/RELEASE_PROCESS.md`:85
- [ ] `claude/workflows/RELEASE_PROCESS.md`:86
- [ ] `claude/workflows/RELEASE_PROCESS.md`:89
- [ ] `claude/workflows/RELEASE_PROCESS.md`:96
- [ ] `claude/workflows/RELEASE_PROCESS.md`:98
- [ ] `claude/workflows/RELEASE_PROCESS.md`:103
- [ ] `claude/workflows/RELEASE_PROCESS.md`:108
- [ ] `claude/workflows/RELEASE_PROCESS.md`:113
- [ ] `claude/workflows/RELEASE_PROCESS.md`:115
- [ ] `claude/workflows/RELEASE_PROCESS.md`:120
- [ ] `claude/workflows/RELEASE_PROCESS.md`:125
- [ ] `claude/workflows/RELEASE_PROCESS.md`:130
- [ ] `claude/workflows/RELEASE_PROCESS.md`:132
- [ ] `claude/workflows/RELEASE_PROCESS.md`:135
- [ ] `claude/workflows/RELEASE_PROCESS.md`:140
- [ ] `claude/workflows/RELEASE_PROCESS.md`:144
- [ ] `claude/workflows/RELEASE_PROCESS.md`:147
- [ ] `claude/workflows/RELEASE_PROCESS.md`:150
- [ ] `claude/workflows/RELEASE_PROCESS.md`:153
- [ ] `claude/workflows/RELEASE_PROCESS.md`:156
- [ ] `claude/workflows/RELEASE_PROCESS.md`:159
- [ ] `claude/workflows/RELEASE_PROCESS.md`:162
- [ ] `claude/workflows/RELEASE_PROCESS.md`:165
- [ ] `claude/workflows/RELEASE_PROCESS.md`:168
- [ ] `claude/workflows/RELEASE_PROCESS.md`:172
- [ ] `claude/workflows/RELEASE_PROCESS.md`:178
- [ ] `claude/workflows/RELEASE_PROCESS.md`:180
- [ ] `claude/workflows/RELEASE_PROCESS.md`:186
- [ ] `claude/workflows/RELEASE_PROCESS.md`:192
- [ ] `claude/workflows/RELEASE_PROCESS.md`:194
- [ ] `claude/workflows/RELEASE_PROCESS.md`:201
- [ ] `claude/workflows/RELEASE_PROCESS.md`:214
- [ ] `claude/workflows/RELEASE_PROCESS.md`:220
- [ ] `claude/workflows/RELEASE_PROCESS.md`:222
- [ ] `claude/workflows/RELEASE_PROCESS.md`:228
- [ ] `claude/workflows/RELEASE_PROCESS.md`:234
- [ ] `claude/workflows/RELEASE_PROCESS.md`:240
- [ ] `claude/workflows/RELEASE_PROCESS.md`:242
- [ ] `claude/workflows/RELEASE_PROCESS.md`:248
- [ ] `claude/workflows/SESSION_END.md`:3
- [ ] `claude/workflows/SESSION_END.md`:20
- [ ] `claude/workflows/SESSION_END.md`:34
- [ ] `claude/workflows/SESSION_END.md`:36
- [ ] `claude/workflows/SESSION_END.md`:40
- [ ] `claude/workflows/SESSION_END.md`:44
- [ ] `claude/workflows/SESSION_END.md`:48
- [ ] `claude/workflows/SESSION_END.md`:50
- [ ] `claude/workflows/SESSION_END.md`:57
- [ ] `claude/workflows/SESSION_END.md`:65
- [ ] `claude/workflows/SESSION_END.md`:67
- [ ] `claude/workflows/SESSION_END.md`:77
- [ ] `claude/workflows/SESSION_END.md`:85
- [ ] `claude/workflows/SESSION_END.md`:87
- [ ] `claude/workflows/SESSION_END.md`:92
- [ ] `claude/workflows/SESSION_END.md`:97
- [ ] `claude/workflows/SESSION_END.md`:102
- [ ] `claude/workflows/SESSION_END.md`:107
- [ ] `claude/workflows/SESSION_END.md`:109
- [ ] `claude/workflows/SESSION_END.md`:115
- [ ] `claude/workflows/SESSION_END.md`:121
- [ ] `claude/workflows/SESSION_END.md`:123
- [ ] `claude/workflows/SESSION_END.md`:129
- [ ] `claude/workflows/SESSION_START.md`:3
- [ ] `claude/workflows/SESSION_START.md`:19
- [ ] `claude/workflows/SESSION_START.md`:33
- [ ] `claude/workflows/VERSION_TRANSITION.md`:3
- [ ] `claude/workflows/VERSION_TRANSITION.md`:12
- [ ] `claude/workflows/VERSION_TRANSITION.md`:14
- [ ] `claude/workflows/VERSION_TRANSITION.md`:20
- [ ] `claude/workflows/VERSION_TRANSITION.md`:26
- [ ] `claude/workflows/VERSION_TRANSITION.md`:32
- [ ] `claude/workflows/VERSION_TRANSITION.md`:39
- [ ] `claude/workflows/VERSION_TRANSITION.md`:45
- [ ] `claude/workflows/VERSION_TRANSITION.md`:47
- [ ] `claude/workflows/VERSION_TRANSITION.md`:55
- [ ] `claude/workflows/VERSION_TRANSITION.md`:63
- [ ] `claude/workflows/VERSION_TRANSITION.md`:69
- [ ] `claude/workflows/VERSION_TRANSITION.md`:71
- [ ] `claude/workflows/VERSION_TRANSITION.md`:77
- [ ] `claude/workflows/VERSION_TRANSITION.md`:83
- [ ] `claude/workflows/VERSION_TRANSITION.md`:89
- [ ] `claude/workflows/VERSION_TRANSITION.md`:91
- [ ] `claude/workflows/VERSION_TRANSITION.md`:100
- [ ] `claude/workflows/VERSION_TRANSITION.md`:106
- [ ] `claude/workflows/VERSION_TRANSITION.md`:112
- [ ] `claude/workflows/VERSION_TRANSITION.md`:114
- [ ] `claude/workflows/VERSION_TRANSITION.md`:119
- [ ] `claude/workflows/VERSION_TRANSITION.md`:124
- [ ] `claude/workflows/VERSION_TRANSITION.md`:129
- [ ] `claude/workflows/VERSION_TRANSITION.md`:131
- [ ] `claude/workflows/VERSION_TRANSITION.md`:137
- [ ] `claude/workflows/VERSION_TRANSITION.md`:143
- [ ] `claude/workflows/VERSION_TRANSITION.md`:149
- [ ] `claude/workflows/VERSION_TRANSITION.md`:155
- [ ] `claude/workflows/VERSION_TRANSITION.md`:157
- [ ] `claude/workflows/VERSION_TRANSITION.md`:164
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:3
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:9
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:13
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:17
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:19
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:21
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:28
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:41
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:53
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:55
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:73
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:84
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:86
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:94
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:102
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:109
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:111
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:113
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:114
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:115
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:118
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:123
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:135
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:137
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:142
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:147
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:149
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:154
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:159
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:161
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:165
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:172
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:180
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:186
- [ ] `docs/api/7zip-command-line-api.md`:5
- [ ] `docs/api/7zip-command-line-api.md`:11
- [ ] `docs/api/7zip-command-line-api.md`:17
- [ ] `docs/api/7zip-command-line-api.md`:19
- [ ] `docs/api/7zip-command-line-api.md`:29
- [ ] `docs/api/7zip-command-line-api.md`:39
- [ ] `docs/api/7zip-command-line-api.md`:41
- [ ] `docs/api/7zip-command-line-api.md`:47
- [ ] `docs/api/7zip-command-line-api.md`:54
- [ ] `docs/api/7zip-command-line-api.md`:60
- [ ] `docs/api/7zip-command-line-api.md`:67
- [ ] `docs/api/7zip-command-line-api.md`:74
- [ ] `docs/api/7zip-command-line-api.md`:76
- [ ] `docs/api/7zip-command-line-api.md`:92
- [ ] `docs/api/7zip-command-line-api.md`:105
- [ ] `docs/api/7zip-command-line-api.md`:121
- [ ] `docs/api/7zip-command-line-api.md`:131
- [ ] `docs/api/7zip-command-line-api.md`:140
- [ ] `docs/api/7zip-command-line-api.md`:142
- [ ] `docs/api/7zip-command-line-api.md`:152
- [ ] `docs/api/7zip-command-line-api.md`:162
- [ ] `docs/api/7zip-command-line-api.md`:169
- [ ] `docs/api/api-status.md`:5
- [ ] `docs/api/api-status.md`:15
- [ ] `docs/api/api-status.md`:17
- [ ] `docs/api/api-status.md`:34
- [ ] `docs/api/api-status.md`:43
- [ ] `docs/api/api-status.md`:49
- [ ] `docs/api/execute-api-properties.md`:5
- [ ] `docs/api/execute-api-properties.md`:8
- [ ] `docs/api/execute-api-properties.md`:19
- [ ] `docs/api/execute-api-properties.md`:25
- [ ] `docs/api/execute-api-properties.md`:36
- [ ] `docs/api/execute-api-properties.md`:47
- [ ] `docs/api/execute-api-properties.md`:58
- [ ] `docs/api/package-api-properties.md`:5
- [ ] `docs/api/package-api-properties.md`:23
- [ ] `docs/api/package-api-properties.md`:28
- [ ] `docs/api/package-api-properties.md`:35
- [ ] `docs/api/spl-package-api-analysis.md`:5
- [ ] `docs/api/spl-package-api-analysis.md`:8
- [ ] `docs/api/spl-package-api-analysis.md`:17
- [ ] `docs/api/spl-package-api-analysis.md`:29
- [ ] `docs/api/spl-package-api-analysis.md`:44
- [ ] `docs/architecture/container-registry-strategy.md`:5
- [ ] `docs/architecture/container-registry-strategy.md`:9
- [ ] `docs/architecture/container-registry-strategy.md`:20
- [ ] `docs/architecture/container-registry-strategy.md`:22
- [ ] `docs/architecture/container-registry-strategy.md`:26
- [ ] `docs/architecture/container-registry-strategy.md`:39
- [ ] `docs/architecture/container-registry-strategy.md`:52
- [ ] `docs/architecture/container-registry-strategy.md`:54
- [ ] `docs/architecture/container-registry-strategy.md`:64
- [ ] `docs/architecture/container-registry-strategy.md`:74
- [ ] `docs/architecture/container-registry-strategy.md`:76
- [ ] `docs/architecture/container-registry-strategy.md`:110
- [ ] `docs/architecture/container-registry-strategy.md`:122
- [ ] `docs/architecture/container-registry-strategy.md`:124
- [ ] `docs/architecture/container-registry-strategy.md`:129
- [ ] `docs/architecture/container-registry-strategy.md`:134
- [ ] `docs/architecture/container-registry-strategy.md`:139
- [ ] `docs/architecture/container-registry-strategy.md`:141
- [ ] `docs/architecture/container-registry-strategy.md`:146
- [ ] `docs/architecture/container-registry-strategy.md`:151
- [ ] `docs/architecture/container-registry-strategy.md`:156
- [ ] `docs/architecture/container-registry-strategy.md`:158
- [ ] `docs/architecture/container-registry-strategy.md`:163
- [ ] `docs/architecture/container-unified-entity-strategy.md`:7
- [ ] `docs/architecture/container-unified-entity-strategy.md`:11
- [ ] `docs/architecture/container-unified-entity-strategy.md`:13
- [ ] `docs/architecture/container-unified-entity-strategy.md`:17
- [ ] `docs/architecture/container-unified-entity-strategy.md`:22
- [ ] `docs/architecture/container-unified-entity-strategy.md`:28
- [ ] `docs/architecture/container-unified-entity-strategy.md`:33
- [ ] `docs/architecture/container-unified-entity-strategy.md`:38
- [ ] `docs/architecture/container-unified-entity-strategy.md`:43
- [ ] `docs/architecture/container-unified-entity-strategy.md`:52
- [ ] `docs/architecture/container-unified-entity-strategy.md`:54
- [ ] `docs/architecture/container-unified-entity-strategy.md`:85
- [ ] `docs/architecture/container-unified-entity-strategy.md`:87
- [ ] `docs/architecture/container-unified-entity-strategy.md`:92
- [ ] `docs/architecture/container-unified-entity-strategy.md`:97
- [ ] `docs/architecture/container-unified-entity-strategy.md`:102
- [ ] `docs/architecture/container-unified-entity-strategy.md`:107
- [ ] `docs/architecture/container-unified-entity-strategy.md`:112
- [ ] `docs/architecture/container-unified-entity-strategy.md`:114
- [ ] `docs/architecture/container-unified-entity-strategy.md`:118
- [ ] `docs/architecture/container-unified-entity-strategy.md`:123
- [ ] `docs/architecture/container-unified-entity-strategy.md`:128
- [ ] `docs/architecture/container-unified-entity-strategy.md`:133
- [ ] `docs/architecture/container-unified-entity-strategy.md`:138
- [ ] `docs/architecture/container-unified-entity-strategy.md`:140
- [ ] `docs/architecture/container-unified-entity-strategy.md`:142
- [ ] `docs/architecture/container-unified-entity-strategy.md`:150
- [ ] `docs/architecture/container-unified-entity-strategy.md`:159
- [ ] `docs/architecture/container-unified-entity-strategy.md`:168
- [ ] `docs/architecture/container-unified-entity-strategy.md`:170
- [ ] `docs/architecture/container-unified-entity-strategy.md`:187
- [ ] `docs/architecture/container-unified-entity-strategy.md`:192
- [ ] `docs/architecture/container-unified-entity-strategy.md`:194
- [ ] `docs/architecture/container-unified-entity-strategy.md`:204
- [ ] `docs/architecture/container-unified-entity-strategy.md`:214
- [ ] `docs/architecture/container-unified-entity-strategy.md`:216
- [ ] `docs/architecture/container-unified-entity-strategy.md`:221
- [ ] `docs/architecture/container-unified-entity-strategy.md`:226
- [ ] `docs/architecture/container-unified-entity-strategy.md`:231
- [ ] `docs/architecture/container-unified-entity-strategy.md`:236
- [ ] `docs/architecture/container-unified-entity-strategy.md`:240
- [ ] `docs/architecture/container-unified-entity-strategy.md`:244
- [ ] `docs/architecture/container-unified-entity-strategy.md`:249
- [ ] `docs/architecture/container-unified-entity-strategy.md`:261
- [ ] `docs/architecture/federated-monorepo-design.md`:5
- [ ] `docs/architecture/federated-monorepo-design.md`:9
- [ ] `docs/architecture/federated-monorepo-design.md`:11
- [ ] `docs/architecture/federated-monorepo-design.md`:52
- [ ] `docs/architecture/federated-monorepo-design.md`:72
- [ ] `docs/architecture/federated-monorepo-design.md`:83
- [ ] `docs/architecture/federated-monorepo-design.md`:97
- [ ] `docs/architecture/federated-monorepo-design.md`:99
- [ ] `docs/architecture/federated-monorepo-design.md`:115
- [ ] `docs/architecture/federated-monorepo-design.md`:130
- [ ] `docs/architecture/federated-monorepo-design.md`:138
- [ ] `docs/architecture/federated-monorepo-design.md`:140
- [ ] `docs/architecture/federated-monorepo-design.md`:159
- [ ] `docs/architecture/federated-monorepo-design.md`:175
- [ ] `docs/architecture/federated-monorepo-design.md`:183
- [ ] `docs/architecture/federated-monorepo-design.md`:185
- [ ] `docs/architecture/federated-monorepo-design.md`:191
- [ ] `docs/architecture/federated-monorepo-design.md`:197
- [ ] `docs/architecture/federated-monorepo-design.md`:199
- [ ] `docs/architecture/federated-monorepo-design.md`:205
- [ ] `docs/architecture/federated-monorepo-design.md`:217
- [ ] `docs/architecture/federated-monorepo-design.md`:222
- [ ] `docs/architecture/federated-monorepo-design.md`:232
- [ ] `docs/architecture/project-overview.md`:5
- [ ] `docs/architecture/project-overview.md`:7
- [ ] `docs/architecture/project-overview.md`:41
- [ ] `docs/architecture/project-overview.md`:57
- [ ] `docs/architecture/project-overview.md`:107
- [ ] `docs/architecture/schema-and-repo-notes.md`:5
- [ ] `docs/architecture/schema-and-repo-notes.md`:7
- [ ] `docs/architecture/schema-and-repo-notes.md`:18
- [ ] `docs/architecture/schema-and-repo-notes.md`:25
- [ ] `docs/architecture/schema-and-repo-notes.md`:30
- [ ] `docs/architecture/schema-and-repo-notes.md`:38
- [ ] `docs/architecture/se1-container-engine-architecture.md`:5
- [ ] `docs/architecture/se1-container-engine-architecture.md`:8
- [ ] `docs/architecture/se1-container-engine-architecture.md`:11
- [ ] `docs/architecture/se1-container-engine-architecture.md`:15
- [ ] `docs/architecture/se1-container-engine-architecture.md`:23
- [ ] `docs/architecture/se1-container-engine-architecture.md`:25
- [ ] `docs/architecture/se1-container-engine-architecture.md`:33
- [ ] `docs/architecture/se1-container-engine-architecture.md`:42
- [ ] `docs/architecture/se1-container-engine-architecture.md`:49
- [ ] `docs/architecture/se1-container-engine-architecture.md`:51
- [ ] `docs/architecture/se1-container-engine-architecture.md`:56
- [ ] `docs/architecture/se1-container-engine-architecture.md`:61
- [ ] `docs/architecture/se1-container-engine-architecture.md`:66
- [ ] `docs/architecture/se1-container-engine-architecture.md`:71
- [ ] `docs/architecture/se1-container-engine-architecture.md`:77
- [ ] `docs/architecture/se1-container-engine-architecture.md`:82
- [ ] `docs/architecture/se1-container-engine-architecture.md`:89
- [ ] `docs/guides/app-development.md`:3
- [ ] `docs/guides/app-development.md`:12
- [ ] `docs/guides/app-development.md`:19
- [ ] `docs/guides/app-development.md`:28
- [ ] `docs/guides/app-development.md`:41
- [ ] `docs/guides/app-development.md`:54
- [ ] `docs/guides/app-development.md`:62
- [ ] `docs/guides/app-development.md`:69
- [ ] `docs/guides/app-development.md`:71
- [ ] `docs/guides/app-development.md`:127
- [ ] `docs/guides/app-development.md`:129
- [ ] `docs/guides/app-development.md`:135
- [ ] `docs/guides/app-development.md`:140
- [ ] `docs/guides/app-development.md`:145
- [ ] `docs/guides/app-development.md`:151
- [ ] `docs/guides/app-development.md`:157
- [ ] `docs/guides/creating-new-apps.md`:5
- [ ] `docs/guides/creating-new-apps.md`:18
- [ ] `docs/guides/creating-new-apps.md`:28
- [ ] `docs/guides/creating-new-apps.md`:41
- [ ] `docs/guides/creating-new-apps.md`:48
- [ ] `docs/guides/current-development-process.md`:3
- [ ] `docs/guides/current-development-process.md`:7
- [ ] `docs/guides/current-development-process.md`:14
- [ ] `docs/guides/current-development-process.md`:26
- [ ] `docs/guides/current-development-process.md`:33
- [ ] `docs/guides/current-development-process.md`:39
- [ ] `docs/guides/how-to.md`:4
- [ ] `docs/guides/how-to.md`:14
- [ ] `docs/guides/how-to.md`:22
- [ ] `docs/guides/how-to.md`:24
- [ ] `docs/guides/how-to.md`:38
- [ ] `docs/guides/how-to.md`:64
- [ ] `docs/guides/how-to.md`:66
- [ ] `docs/guides/how-to.md`:72
- [ ] `docs/guides/how-to.md`:78
- [ ] `docs/guides/how-to.md`:85
- [ ] `docs/guides/how-to.md`:91
- [ ] `docs/guides/how-to.md`:93
- [ ] `docs/guides/how-to.md`:101
- [ ] `docs/guides/how-to.md`:115
- [ ] `docs/guides/how-to.md`:127
- [ ] `docs/guides/how-to.md`:133
- [ ] `docs/guides/how-to.md`:135
- [ ] `docs/guides/how-to.md`:184
- [ ] `docs/guides/how-to.md`:195
- [ ] `docs/guides/how-to.md`:202
- [ ] `docs/guides/how-to.md`:210
- [ ] `docs/guides/how-to.md`:213
- [ ] `docs/guides/how-to.md`:216
- [ ] `docs/guides/how-to.md`:219
- [ ] `docs/guides/how-to.md`:223
- [ ] `docs/guides/how-to.md`:240
- [ ] `docs/guides/implementing-new-api.md`:5
- [ ] `docs/guides/implementing-new-api.md`:18
- [ ] `docs/guides/implementing-new-api.md`:31
- [ ] `docs/guides/implementing-new-api.md`:41
- [ ] `docs/guides/implementing-new-api.md`:43
- [ ] `docs/guides/implementing-new-api.md`:59
- [ ] `docs/guides/implementing-new-api.md`:81
- [ ] `docs/guides/implementing-new-api.md`:98
- [ ] `docs/guides/implementing-new-api.md`:119
- [ ] `docs/guides/implementing-new-api.md`:142
- [ ] `docs/guides/release-and-install-process.md`:3
- [ ] `docs/guides/release-and-install-process.md`:7
- [ ] `docs/guides/release-and-install-process.md`:24
- [ ] `docs/guides/release-and-install-process.md`:26
- [ ] `docs/guides/release-and-install-process.md`:32
- [ ] `docs/guides/release-and-install-process.md`:48
- [ ] `docs/guides/release-and-install-process.md`:54
- [ ] `docs/guides/release-and-install-process.md`:60
- [ ] `docs/guides/release-and-install-process.md`:73
- [ ] `docs/guides/release-and-install-process.md`:75
- [ ] `docs/guides/release-and-install-process.md`:80
- [ ] `docs/guides/release-and-install-process.md`:86
- [ ] `docs/guides/release-and-install-process.md`:88
- [ ] `docs/guides/release-and-install-process.md`:95
- [ ] `docs/guides/release-and-install-process.md`:107
- [ ] `docs/guides/release-and-install-process.md`:109
- [ ] `docs/guides/release-and-install-process.md`:116
- [ ] `docs/guides/release-and-install-process.md`:122
- [ ] `docs/guides/release-and-install-process.md`:132
- [ ] `docs/integration/avro-queue-folder-service-design.md`:3
- [ ] `docs/integration/avro-queue-folder-service-design.md`:7
- [ ] `docs/integration/avro-queue-folder-service-design.md`:9
- [ ] `docs/integration/avro-queue-folder-service-design.md`:19
- [ ] `docs/integration/avro-queue-folder-service-design.md`:27
- [ ] `docs/integration/avro-queue-folder-service-design.md`:29
- [ ] `docs/integration/avro-queue-folder-service-design.md`:50
- [ ] `docs/integration/avro-queue-folder-service-design.md`:64
- [ ] `docs/integration/avro-queue-folder-service-design.md`:77
- [ ] `docs/integration/avro-queue-folder-service-design.md`:89
- [ ] `docs/integration/avro-queue-folder-service-design.md`:91
- [ ] `docs/integration/avro-queue-folder-service-design.md`:101
- [ ] `docs/integration/avro-queue-folder-service-design.md`:122
- [ ] `docs/integration/avro-queue-folder-service-design.md`:124
- [ ] `docs/integration/avro-queue-folder-service-design.md`:136
- [ ] `docs/integration/avro-queue-folder-service-design.md`:143
- [ ] `docs/integration/avro-queue-folder-service-design.md`:150
- [ ] `docs/integration/avro-queue-folder-service-design.md`:152
- [ ] `docs/integration/avro-queue-folder-service-design.md`:157
- [ ] `docs/integration/avro-queue-folder-service-design.md`:162
- [ ] `docs/integration/avro-queue-folder-service-design.md`:167
- [ ] `docs/integration/avro-queue-folder-service-design.md`:172
- [ ] `docs/integration/avro-queue-folder-service-design.md`:174
- [ ] `docs/integration/avro-queue-folder-service-design.md`:179
- [ ] `docs/integration/avro-queue-folder-service-design.md`:184
- [ ] `docs/integration/avro-queue-folder-service-design.md`:189
- [ ] `docs/integration/avro-queue-folder-service-design.md`:191
- [ ] `docs/integration/avro-queue-folder-service-design.md`:196
- [ ] `docs/integration/avro-queue-folder-service-design.md`:201
- [ ] `docs/integration/avro-queue-folder-service-design.md`:206
- [ ] `docs/integration/avro-queue-folder-service-design.md`:208
- [ ] `docs/integration/avro-queue-folder-service-design.md`:214
- [ ] `docs/integration/avro-queue-folder-service-design.md`:219
- [ ] `docs/integration/avro-schema-architecture.md`:3
- [ ] `docs/integration/avro-schema-architecture.md`:7
- [ ] `docs/integration/avro-schema-architecture.md`:9
- [ ] `docs/integration/avro-schema-architecture.md`:14
- [ ] `docs/integration/avro-schema-architecture.md`:19
- [ ] `docs/integration/avro-schema-architecture.md`:24
- [ ] `docs/integration/avro-schema-architecture.md`:26
- [ ] `docs/integration/avro-schema-architecture.md`:79
- [ ] `docs/integration/avro-schema-architecture.md`:110
- [ ] `docs/integration/avro-schema-architecture.md`:129
- [ ] `docs/integration/avro-schema-architecture.md`:131
- [ ] `docs/integration/avro-schema-architecture.md`:136
- [ ] `docs/integration/avro-schema-architecture.md`:157
- [ ] `docs/integration/avro-schema-architecture.md`:187
- [ ] `docs/integration/avro-schema-architecture.md`:189
- [ ] `docs/integration/avro-schema-architecture.md`:195
- [ ] `docs/integration/avro-schema-architecture.md`:201
- [ ] `docs/integration/avro-schema-architecture.md`:207
- [ ] `docs/integration/avro-schema-architecture.md`:209
- [ ] `docs/integration/avro-schema-architecture.md`:215
- [ ] `docs/integration/avro-schema-architecture.md`:221
- [ ] `docs/integration/avro-service-definitions-communication.md`:7
- [ ] `docs/integration/avro-service-definitions-communication.md`:11
- [ ] `docs/integration/avro-service-definitions-communication.md`:13
- [ ] `docs/integration/avro-service-definitions-communication.md`:28
- [ ] `docs/integration/avro-service-definitions-communication.md`:32
- [ ] `docs/integration/avro-service-definitions-communication.md`:34
- [ ] `docs/integration/avro-service-definitions-communication.md`:61
- [ ] `docs/integration/avro-service-definitions-communication.md`:63
- [ ] `docs/integration/avro-service-definitions-communication.md`:65
- [ ] `docs/integration/avro-service-definitions-communication.md`:92
- [ ] `docs/integration/avro-service-definitions-communication.md`:121
- [ ] `docs/integration/avro-service-definitions-communication.md`:149
- [ ] `docs/integration/avro-service-definitions-communication.md`:151
- [ ] `docs/integration/avro-service-definitions-communication.md`:175
- [ ] `docs/integration/avro-service-definitions-communication.md`:199
- [ ] `docs/integration/avro-service-definitions-communication.md`:201
- [ ] `docs/integration/avro-service-definitions-communication.md`:203
- [ ] `docs/integration/avro-service-definitions-communication.md`:217
- [ ] `docs/integration/avro-service-definitions-communication.md`:232
- [ ] `docs/integration/avro-service-definitions-communication.md`:234
- [ ] `docs/integration/avro-service-definitions-communication.md`:243
- [ ] `docs/integration/avro-service-definitions-communication.md`:261
- [ ] `docs/integration/avro-service-definitions-communication.md`:263
- [ ] `docs/integration/avro-service-definitions-communication.md`:278
- [ ] `docs/integration/avro-service-definitions-communication.md`:288
- [ ] `docs/integration/avro-service-definitions-communication.md`:290
- [ ] `docs/integration/avro-service-definitions-communication.md`:300
- [ ] `docs/integration/avro-service-definitions-communication.md`:311
- [ ] `docs/integration/avro-service-definitions-communication.md`:313
- [ ] `docs/integration/avro-service-definitions-communication.md`:320
- [ ] `docs/integration/avro-service-definitions-communication.md`:322
- [ ] `docs/integration/avro-service-definitions-communication.md`:331
- [ ] `docs/integration/avro-service-definitions-communication.md`:344
- [ ] `docs/integration/avro-service-definitions-communication.md`:349
- [ ] `docs/integration/avro-service-definitions-communication.md`:351
- [ ] `docs/integration/avro-service-definitions-communication.md`:358
- [ ] `docs/integration/avro-service-definitions-communication.md`:362
- [ ] `docs/integration/avro-service-definitions-communication.md`:367
- [ ] `docs/integration/avro-service-definitions-communication.md`:379
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:3
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:7
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:9
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:15
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:17
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:23
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:29
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:35
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:60
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:62
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:68
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:83
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:85
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:91
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:96
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:101
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:103
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:115
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:127
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:132
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:134
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:149
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:155
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:157
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:163
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:169
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:175
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:181
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:183
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:188
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:194
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:200
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:202
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:208
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:214
- [ ] `docs/integration/itil-integration-approach.md`:3
- [ ] `docs/integration/itil-integration-approach.md`:7
- [ ] `docs/integration/itil-integration-approach.md`:9
- [ ] `docs/integration/itil-integration-approach.md`:14
- [ ] `docs/integration/itil-integration-approach.md`:19
- [ ] `docs/integration/itil-integration-approach.md`:21
- [ ] `docs/integration/itil-integration-approach.md`:27
- [ ] `docs/integration/itil-integration-approach.md`:29
- [ ] `docs/integration/itil-integration-approach.md`:41
- [ ] `docs/integration/itil-integration-approach.md`:53
- [ ] `docs/integration/itil-integration-approach.md`:65
- [ ] `docs/integration/itil-integration-approach.md`:77
- [ ] `docs/integration/itil-integration-approach.md`:89
- [ ] `docs/integration/itil-integration-approach.md`:91
- [ ] `docs/integration/itil-integration-approach.md`:93
- [ ] `docs/integration/itil-integration-approach.md`:99
- [ ] `docs/integration/itil-integration-approach.md`:105
- [ ] `docs/integration/itil-integration-approach.md`:107
- [ ] `docs/integration/itil-integration-approach.md`:118
- [ ] `docs/integration/itil-integration-approach.md`:120
- [ ] `docs/integration/itil-integration-approach.md`:126
- [ ] `docs/integration/itil-integration-approach.md`:132
- [ ] `docs/integration/itil-integration-approach.md`:138
- [ ] `docs/integration/itil-integration-approach.md`:140
- [ ] `docs/integration/itil-integration-approach.md`:146
- [ ] `docs/integration/itil-integration-approach.md`:152
- [ ] `docs/integration/itil-integration-approach.md`:154
- [ ] `docs/integration/itil-integration-approach.md`:164
- [ ] `docs/integration/itil-integration-approach.md`:166
- [ ] `docs/integration/itil-integration-approach.md`:172
- [ ] `docs/integration/itil-integration-approach.md`:178
- [ ] `docs/integration/itil-integration-approach.md`:184
- [ ] `docs/integration/itil-integration-approach.md`:186
- [ ] `docs/integration/itil-integration-approach.md`:193
- [ ] `docs/integration/itil-integration-approach.md`:195
- [ ] `docs/integration/itil-integration-approach.md`:203
- [ ] `docs/integration/itil-integration-approach.md`:211
- [ ] `docs/integration/itil-integration-approach.md`:219
- [ ] `docs/integration/itil-integration-approach.md`:221
- [ ] `docs/integration/itil-integration-approach.md`:226
- [ ] `docs/integration/itil-integration-approach.md`:231
- [ ] `docs/integration/itil-integration-approach.md`:237
- [ ] `docs/integration/itil-integration-approach.md`:239
- [ ] `docs/integration/itil-integration-approach.md`:251
- [ ] `docs/integration/itil-integration-approach.md`:263
- [ ] `docs/integration/itil-integration-approach.md`:275
- [ ] `docs/integration/itil-integration-approach.md`:287
- [ ] `docs/integration/itil-integration-approach.md`:289
- [ ] `docs/integration/itil-integration-approach.md`:295
- [ ] `docs/integration/itil-integration-approach.md`:301
- [ ] `docs/integration/itil-integration-approach.md`:306
- [ ] `docs/integration/itil-integration-approach.md`:308
- [ ] `docs/integration/itil-integration-approach.md`:314
- [ ] `docs/integration/itil-integration-approach.md`:320
- [ ] `docs/integration/itil-integration-approach.md`:322
- [ ] `docs/integration/itil-integration-approach.md`:325
- [ ] `docs/integration/itil-integration-approach.md`:330
- [ ] `docs/integration/itil-integration-approach.md`:335
- [ ] `docs/integration/itil-integration-approach.md`:340
- [ ] `docs/integration/itil-integration-approach.md`:346
- [ ] `docs/integration/itil-integration-approach.md`:349
- [ ] `docs/integration/itil-integration-approach.md`:354
- [ ] `docs/integration/itil-integration-approach.md`:359
- [ ] `docs/integration/itil-integration-approach.md`:364
- [ ] `docs/integration/itil-integration-approach.md`:370
- [ ] `docs/integration/itil-integration-approach.md`:374
- [ ] `docs/integration/itil-integration-approach.md`:380
- [ ] `docs/integration/prince2-integration-approach.md`:3
- [ ] `docs/integration/prince2-integration-approach.md`:7
- [ ] `docs/integration/prince2-integration-approach.md`:9
- [ ] `docs/integration/prince2-integration-approach.md`:15
- [ ] `docs/integration/prince2-integration-approach.md`:17
- [ ] `docs/integration/prince2-integration-approach.md`:31
- [ ] `docs/integration/prince2-integration-approach.md`:45
- [ ] `docs/integration/prince2-integration-approach.md`:59
- [ ] `docs/integration/prince2-integration-approach.md`:73
- [ ] `docs/integration/prince2-integration-approach.md`:75
- [ ] `docs/integration/prince2-integration-approach.md`:80
- [ ] `docs/integration/prince2-integration-approach.md`:85
- [ ] `docs/integration/prince2-integration-approach.md`:90
- [ ] `docs/integration/prince2-integration-approach.md`:95
- [ ] `docs/integration/prince2-integration-approach.md`:100
- [ ] `docs/integration/prince2-integration-approach.md`:105
- [ ] `docs/integration/prince2-integration-approach.md`:110
- [ ] `docs/integration/prince2-integration-approach.md`:112
- [ ] `docs/integration/prince2-integration-approach.md`:117
- [ ] `docs/integration/prince2-integration-approach.md`:122
- [ ] `docs/integration/prince2-integration-approach.md`:127
- [ ] `docs/integration/prince2-integration-approach.md`:129
- [ ] `docs/integration/prince2-integration-approach.md`:131
- [ ] `docs/integration/prince2-integration-approach.md`:141
- [ ] `docs/integration/prince2-integration-approach.md`:143
- [ ] `docs/integration/prince2-integration-approach.md`:152
- [ ] `docs/integration/prince2-integration-approach.md`:163
- [ ] `docs/integration/prince2-integration-approach.md`:165
- [ ] `docs/integration/prince2-integration-approach.md`:167
- [ ] `docs/integration/prince2-integration-approach.md`:173
- [ ] `docs/integration/prince2-integration-approach.md`:180
- [ ] `docs/integration/prince2-integration-approach.md`:186
- [ ] `docs/integration/prince2-integration-approach.md`:188
- [ ] `docs/integration/prince2-integration-approach.md`:194
- [ ] `docs/integration/prince2-integration-approach.md`:200
- [ ] `docs/integration/prince2-integration-approach.md`:206
- [ ] `docs/integration/prince2-integration-approach.md`:208
- [ ] `docs/integration/prince2-integration-approach.md`:213
- [ ] `docs/integration/prince2-integration-approach.md`:218
- [ ] `docs/integration/prince2-integration-approach.md`:223
- [ ] `docs/integration/prince2-integration-approach.md`:228
- [ ] `docs/integration/prince2-integration-approach.md`:230
- [ ] `docs/integration/prince2-integration-approach.md`:235
- [ ] `docs/integration/prince2-integration-approach.md`:241
- [ ] `docs/integration/prince2-integration-approach.md`:245
- [ ] `docs/integration/prince2-integration-approach.md`:251
- [ ] `docs/integration/qubes-os-overview.md`:5
- [ ] `docs/integration/qubes-os-overview.md`:9
- [ ] `docs/integration/qubes-os-overview.md`:11
- [ ] `docs/integration/qubes-os-overview.md`:17
- [ ] `docs/integration/qubes-os-overview.md`:23
- [ ] `docs/integration/qubes-os-overview.md`:25
- [ ] `docs/integration/qubes-os-overview.md`:33
- [ ] `docs/integration/qubes-os-overview.md`:39
- [ ] `docs/integration/qubes-os-overview.md`:45
- [ ] `docs/integration/qubes-os-overview.md`:47
- [ ] `docs/integration/qubes-os-overview.md`:53
- [ ] `docs/integration/qubes-os-overview.md`:59
- [ ] `docs/integration/qubes-os-overview.md`:65
- [ ] `docs/integration/qubes-os-overview.md`:67
- [ ] `docs/integration/qubes-os-overview.md`:73
- [ ] `docs/integration/qubes-os-overview.md`:80
- [ ] `docs/integration/qubes-os-overview.md`:82
- [ ] `docs/integration/qubes-os-overview.md`:88
- [ ] `docs/integration/qubes-os-overview.md`:94
- [ ] `docs/integration/qubes-os-overview.md`:100
- [ ] `docs/integration/qubes-os-overview.md`:102
- [ ] `docs/integration/qubes-os-overview.md`:108
- [ ] `docs/integration/qubes-os-overview.md`:114
- [ ] `docs/integration/qubes-os-overview.md`:116
- [ ] `docs/integration/qubes-os-overview.md`:122
- [ ] `docs/integration/qubes-os-overview.md`:128
- [ ] `docs/integration/qubes-os-overview.md`:133
- [ ] `docs/integration/qubes-splectrum-integration.md`:7
- [ ] `docs/integration/qubes-splectrum-integration.md`:11
- [ ] `docs/integration/qubes-splectrum-integration.md`:13
- [ ] `docs/integration/qubes-splectrum-integration.md`:22
- [ ] `docs/integration/qubes-splectrum-integration.md`:45
- [ ] `docs/integration/qubes-splectrum-integration.md`:47
- [ ] `docs/integration/qubes-splectrum-integration.md`:49
- [ ] `docs/integration/qubes-splectrum-integration.md`:63
- [ ] `docs/integration/qubes-splectrum-integration.md`:66
- [ ] `docs/integration/qubes-splectrum-integration.md`:68
- [ ] `docs/integration/qubes-splectrum-integration.md`:80
- [ ] `docs/integration/qubes-splectrum-integration.md`:83
- [ ] `docs/integration/qubes-splectrum-integration.md`:85
- [ ] `docs/integration/qubes-splectrum-integration.md`:103
- [ ] `docs/integration/qubes-splectrum-integration.md`:106
- [ ] `docs/integration/qubes-splectrum-integration.md`:108
- [ ] `docs/integration/qubes-splectrum-integration.md`:110
- [ ] `docs/integration/qubes-splectrum-integration.md`:136
- [ ] `docs/integration/qubes-splectrum-integration.md`:154
- [ ] `docs/integration/qubes-splectrum-integration.md`:156
- [ ] `docs/integration/qubes-splectrum-integration.md`:175
- [ ] `docs/integration/qubes-splectrum-integration.md`:192
- [ ] `docs/integration/qubes-splectrum-integration.md`:194
- [ ] `docs/integration/qubes-splectrum-integration.md`:196
- [ ] `docs/integration/qubes-splectrum-integration.md`:213
- [ ] `docs/integration/qubes-splectrum-integration.md`:216
- [ ] `docs/integration/qubes-splectrum-integration.md`:218
- [ ] `docs/integration/qubes-splectrum-integration.md`:229
- [ ] `docs/integration/qubes-splectrum-integration.md`:232
- [ ] `docs/integration/qubes-splectrum-integration.md`:234
- [ ] `docs/integration/qubes-splectrum-integration.md`:236
- [ ] `docs/integration/qubes-splectrum-integration.md`:240
- [ ] `docs/integration/qubes-splectrum-integration.md`:242
- [ ] `docs/integration/qubes-splectrum-integration.md`:260
- [ ] `docs/integration/qubes-splectrum-integration.md`:262
- [ ] `docs/integration/qubes-splectrum-integration.md`:266
- [ ] `docs/integration/qubes-splectrum-integration.md`:269
- [ ] `docs/integration/qubes-splectrum-integration.md`:280
- [ ] `docs/integration/qubes-splectrum-integration.md`:282
- [ ] `docs/integration/qubes-splectrum-integration.md`:288
- [ ] `docs/integration/qubes-splectrum-integration.md`:294
- [ ] `docs/knowledge/lessons-learned.md`:5
- [ ] `docs/knowledge/lessons-learned.md`:7
- [ ] `docs/knowledge/lessons-learned.md`:14
- [ ] `docs/knowledge/lessons-learned.md`:16
- [ ] `docs/knowledge/lessons-learned.md`:23
- [ ] `docs/knowledge/lessons-learned.md`:25
- [ ] `docs/knowledge/lessons-learned.md`:33
- [ ] `docs/knowledge/lessons-learned.md`:35
- [ ] `docs/knowledge/lessons-learned.md`:44
- [ ] `docs/knowledge/lessons-learned.md`:46
- [ ] `docs/knowledge/lessons-learned.md`:55
- [ ] `docs/management/decision-log.md`:5
- [ ] `docs/management/decision-log.md`:11
- [ ] `docs/management/decision-log.md`:20
- [ ] `docs/management/decision-log.md`:23
- [ ] `docs/management/decision-log.md`:32
- [ ] `docs/management/decision-log.md`:34
- [ ] `docs/management/decision-log.md`:52
- [ ] `docs/management/github-project-setup.md`:3
- [ ] `docs/management/github-project-setup.md`:7
- [ ] `docs/management/github-project-setup.md`:17
- [ ] `docs/management/github-project-setup.md`:34
- [ ] `docs/management/github-project-setup.md`:36
- [ ] `docs/management/github-project-setup.md`:41
- [ ] `docs/management/github-project-setup.md`:50
- [ ] `docs/management/github-project-setup.md`:54
- [ ] `docs/management/github-project-setup.md`:56
- [ ] `docs/management/github-project-setup.md`:86
- [ ] `docs/management/github-project-setup.md`:107
- [ ] `docs/management/github-project-setup.md`:128
- [ ] `docs/management/github-project-setup.md`:154
- [ ] `docs/management/github-project-setup.md`:165
- [ ] `docs/management/github-project-setup.md`:167
- [ ] `docs/management/github-project-setup.md`:172
- [ ] `docs/management/github-project-setup.md`:179
- [ ] `docs/management/github-project-setup.md`:188
- [ ] `docs/management/github-project-setup.md`:190
- [ ] `docs/management/github-project-setup.md`:195
- [ ] `docs/management/github-project-setup.md`:200
- [ ] `docs/management/github-project-setup.md`:205
- [ ] `docs/management/github-project-setup.md`:207
- [ ] `docs/management/github-project-setup.md`:213
- [ ] `docs/management/github-project-setup.md`:218
- [ ] `docs/management/github-project-setup.md`:222
- [ ] `docs/management/github-project-setup.md`:224
- [ ] `docs/management/github-project-setup.md`:230
- [ ] `docs/management/github-project-setup.md`:236
- [ ] `docs/management/github-project-setup.md`:242
- [ ] `docs/management/github-project-setup.md`:244
- [ ] `docs/management/github-project-setup.md`:249
- [ ] `docs/management/github-project-setup.md`:254
- [ ] `docs/management/github-project-setup.md`:259
- [ ] `docs/management/spl1-epics-overview.md`:3
- [ ] `docs/management/spl1-epics-overview.md`:9
- [ ] `docs/management/spl1-epics-overview.md`:17
- [ ] `docs/management/spl1-epics-overview.md`:67
- [ ] `docs/management/spl1-epics-overview.md`:105
- [ ] `docs/management/spl1-epics-overview.md`:146
- [ ] `docs/management/spl1-epics-overview.md`:173
- [ ] `docs/management/spl1-epics-overview.md`:210
- [ ] `docs/management/spl1-epics-overview.md`:246
- [ ] `docs/management/spl1-epics-overview.md`:261
- [ ] `docs/management/spl1-epics-overview.md`:268
- [ ] `docs/management/versioning-strategy.md`:3
- [ ] `docs/management/versioning-strategy.md`:7
- [ ] `docs/management/versioning-strategy.md`:9
- [ ] `docs/management/versioning-strategy.md`:14
- [ ] `docs/management/versioning-strategy.md`:19
- [ ] `docs/management/versioning-strategy.md`:21
- [ ] `docs/management/versioning-strategy.md`:24
- [ ] `docs/management/versioning-strategy.md`:29
- [ ] `docs/management/versioning-strategy.md`:35
- [ ] `docs/management/versioning-strategy.md`:42
- [ ] `docs/management/versioning-strategy.md`:47
- [ ] `docs/management/versioning-strategy.md`:49
- [ ] `docs/management/versioning-strategy.md`:55
- [ ] `docs/management/versioning-strategy.md`:61
- [ ] `docs/management/versioning-strategy.md`:63
- [ ] `docs/management/versioning-strategy.md`:69
- [ ] `docs/management/versioning-strategy.md`:75
- [ ] `docs/management/versioning-strategy.md`:82
- [ ] `docs/management/versioning-strategy.md`:84
- [ ] `docs/management/versioning-strategy.md`:91
- [ ] `docs/reference/boot-app-functionality.md`:5
- [ ] `docs/reference/boot-app-functionality.md`:10
- [ ] `docs/reference/boot-app-functionality.md`:14
- [ ] `docs/reference/boot-app-functionality.md`:19
- [ ] `docs/reference/boot-app-functionality.md`:25
- [ ] `docs/reference/boot-app-functionality.md`:31
- [ ] `docs/reference/boot-app-functionality.md`:33
- [ ] `docs/reference/boot-app-functionality.md`:35
- [ ] `docs/reference/boot-app-functionality.md`:39
- [ ] `docs/reference/boot-app-functionality.md`:41
- [ ] `docs/reference/boot-app-functionality.md`:45
- [ ] `docs/reference/boot-app-functionality.md`:49
- [ ] `docs/reference/boot-app-functionality.md`:51
- [ ] `docs/reference/boot-app-functionality.md`:55
- [ ] `docs/reference/boot-app-functionality.md`:59
- [ ] `docs/reference/boot-app-functionality.md`:63
- [ ] `docs/reference/boot-app-functionality.md`:67
- [ ] `docs/reference/boot-app-functionality.md`:78
- [ ] `docs/reference/boot-app-functionality.md`:82
- [ ] `docs/reference/node-dependency-audit.md`:3
- [ ] `docs/reference/node-dependency-audit.md`:7
- [ ] `docs/reference/node-dependency-audit.md`:13
- [ ] `docs/reference/node-dependency-audit.md`:15
- [ ] `docs/reference/node-dependency-audit.md`:17
- [ ] `docs/reference/node-dependency-audit.md`:26
- [ ] `docs/reference/node-dependency-audit.md`:28
- [ ] `docs/reference/node-dependency-audit.md`:39
- [ ] `docs/reference/node-dependency-audit.md`:41
- [ ] `docs/reference/node-dependency-audit.md`:51
- [ ] `docs/reference/node-dependency-audit.md`:53
- [ ] `docs/reference/node-dependency-audit.md`:78
- [ ] `docs/reference/node-dependency-audit.md`:104
- [ ] `docs/reference/node-dependency-audit.md`:106
- [ ] `docs/reference/node-dependency-audit.md`:108
- [ ] `docs/reference/node-dependency-audit.md`:126
- [ ] `docs/reference/node-dependency-audit.md`:143
- [ ] `docs/reference/node-dependency-audit.md`:151
- [ ] `docs/reference/node-dependency-audit.md`:155
- [ ] `docs/reference/node-dependency-audit.md`:157
- [ ] `docs/reference/node-dependency-audit.md`:178
- [ ] `docs/reference/node-dependency-audit.md`:190
- [ ] `docs/reference/node-dependency-audit.md`:192
- [ ] `docs/reference/node-dependency-audit.md`:197
- [ ] `docs/reference/node-dependency-audit.md`:202
- [ ] `docs/reference/node-dependency-audit.md`:207
- [ ] `docs/reference/node-dependency-audit.md`:209
- [ ] `docs/reference/node-dependency-audit.md`:214
- [ ] `docs/reference/node-dependency-audit.md`:219
- [ ] `docs/reference/node-dependency-audit.md`:224
- [ ] `docs/reference/prerequisites.md`:5
- [ ] `docs/reference/prerequisites.md`:7
- [ ] `docs/reference/prerequisites.md`:13
- [ ] `docs/reference/prerequisites.md`:18
- [ ] `docs/reference/prerequisites.md`:20
- [ ] `docs/reference/prerequisites.md`:37
- [ ] `docs/reference/prerequisites.md`:50
- [ ] `docs/reference/prerequisites.md`:62
- [ ] `docs/reference/prerequisites.md`:67
- [ ] `docs/reference/prerequisites.md`:79
- [ ] `docs/reference/prerequisites.md`:81
- [ ] `docs/reference/prerequisites.md`:83
- [ ] `docs/reference/prerequisites.md`:85
- [ ] `docs/reference/prerequisites.md`:103
- [ ] `docs/reference/prerequisites.md`:109
- [ ] `docs/reference/prerequisites.md`:111
- [ ] `docs/reference/prerequisites.md`:123
- [ ] `docs/reference/prerequisites.md`:135
- [ ] `docs/reference/prerequisites.md`:137
- [ ] `docs/reference/prerequisites.md`:148
- [ ] `docs/reference/prerequisites.md`:154
- [ ] `docs/reference/prerequisites.md`:160
- [ ] `docs/reference/prerequisites.md`:165
- [ ] `docs/reference/prerequisites.md`:175
- [ ] `docs/reference/prerequisites.md`:177
- [ ] `docs/reference/prerequisites.md`:194
- [ ] `docs/reference/prerequisites.md`:206
- [ ] `docs/reference/prerequisites.md`:208
- [ ] `docs/reference/prerequisites.md`:226
- [ ] `docs/reference/prerequisites.md`:241
- [ ] `docs/reference/prerequisites.md`:248
- [ ] `docs/reference/prerequisites.md`:250
- [ ] `docs/reference/prerequisites.md`:257
- [ ] `docs/reference/prerequisites.md`:264
- [ ] `docs/reference/prerequisites.md`:266
- [ ] `docs/reference/prerequisites.md`:273
- [ ] `docs/reference/prerequisites.md`:281
- [ ] `docs/reference/prerequisites.md`:291
- [ ] `docs/reference/quick-reference.md`:5
- [ ] `docs/reference/quick-reference.md`:19
- [ ] `docs/reference/quick-reference.md`:25
- [ ] `docs/reference/quick-reference.md`:32
- [ ] `docs/reference/quick-reference.md`:48
- [ ] `docs/reference/quick-reference.md`:58
- [ ] `docs/reference/quick-reference.md`:64
- [ ] `docs/reference/test-app-development.md`:5
- [ ] `docs/reference/test-app-development.md`:25
- [ ] `docs/reference/test-app-development.md`:44
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:3
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:11
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:14
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:20
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:26
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:32
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:38
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:44
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:50
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:56
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:62
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:68
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:74
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:80
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:86
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:92
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:98
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:105
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:108
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:114
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:120
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:126
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:132
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:138
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:144
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:150
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:156
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:162
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:168
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:175
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:178
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:185
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:187
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:196
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:206
- [ ] `docs/reports/v0.6.1-knowledge-sync.md`:209
- [ ] `docs/reports/v0.6.1-metrics-report.md`:3
- [ ] `docs/reports/v0.6.1-metrics-report.md`:10
- [ ] `docs/reports/v0.6.1-metrics-report.md`:66
- [ ] `docs/reports/v0.6.1-metrics-report.md`:75
- [ ] `docs/reports/v0.6.1-metrics-report.md`:81
- [ ] `docs/reports/v0.6.1-metrics-report.md`:100
- [ ] `docs/reports/v0.6.1-metrics-report.md`:105
- [ ] `docs/reports/v0.6.1-metrics-report.md`:118
- [ ] `docs/reports/v0.6.1-metrics-report.md`:135
- [ ] `docs/reports/v0.6.1-metrics-report.md`:150
- [ ] `docs/reports/v0.6.1-metrics-report.md`:152
- [ ] `docs/reports/v0.6.1-metrics-report.md`:156
- [ ] `docs/reports/v0.6.1-metrics-report.md`:168
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:7
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:17
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:24
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:538
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:542
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:567
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:571
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:575
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:583
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:591
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:599
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:603
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:609
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:617
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:625
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:627
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:631
- [ ] `docs/reports/v0.6.1-repository-maintenance.md`:637
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:3
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:12
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:29
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:32
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:40
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:48
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:56
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:64
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:72
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:80
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:88
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:96
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:104
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:112
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:120
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:128
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:136
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:144
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:152
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:160
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:168
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:176
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:184
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:192
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:200
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:208
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:216
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:224
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:232
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:240
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:248
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:256
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:264
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:272
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:280
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:288
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:296
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:304
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:312
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:320
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:328
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:337
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:340
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:345
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:350
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:355
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:360
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:365
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:370
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:375
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:380
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:385
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:390
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:395
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:400
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:405
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:410
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:415
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:420
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:425
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:430
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:436
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:439
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:445
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:451
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:457
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:463
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:469
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:475
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:481
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:544
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:546
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:557
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:574
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:583
- [ ] `docs/specifications/audit-log-architecture.md`:3
- [ ] `docs/specifications/audit-log-architecture.md`:7
- [ ] `docs/specifications/audit-log-architecture.md`:9
- [ ] `docs/specifications/audit-log-architecture.md`:22
- [ ] `docs/specifications/audit-log-architecture.md`:32
- [ ] `docs/specifications/audit-log-architecture.md`:34
- [ ] `docs/specifications/audit-log-architecture.md`:37
- [ ] `docs/specifications/audit-log-architecture.md`:40
- [ ] `docs/specifications/audit-log-architecture.md`:55
- [ ] `docs/specifications/audit-log-architecture.md`:63
- [ ] `docs/specifications/audit-log-architecture.md`:68
- [ ] `docs/specifications/audit-log-architecture.md`:70
- [ ] `docs/specifications/audit-log-architecture.md`:75
- [ ] `docs/specifications/audit-log-architecture.md`:80
- [ ] `docs/specifications/audit-log-architecture.md`:86
- [ ] `docs/specifications/audit-log-architecture.md`:92
- [ ] `docs/specifications/audit-log-architecture.md`:94
- [ ] `docs/specifications/audit-log-architecture.md`:99
- [ ] `docs/specifications/audit-log-architecture.md`:104
- [ ] `docs/specifications/audit-log-architecture.md`:110
- [ ] `docs/specifications/audit-log-architecture.md`:117
- [ ] `docs/specifications/audit-log-architecture.md`:119
- [ ] `docs/specifications/audit-log-architecture.md`:124
- [ ] `docs/specifications/audit-log-architecture.md`:129
- [ ] `docs/specifications/audit-log-architecture.md`:134
- [ ] `docs/specifications/audit-log-architecture.md`:139
- [ ] `docs/specifications/audit-log-architecture.md`:144
- [ ] `docs/specifications/audit-log-architecture.md`:146
- [ ] `docs/specifications/audit-log-architecture.md`:152
- [ ] `docs/specifications/audit-log-architecture.md`:158
- [ ] `docs/specifications/audit-log-architecture.md`:160
- [ ] `docs/specifications/audit-log-architecture.md`:166
- [ ] `docs/specifications/audit-log-migration-plan.md`:3
- [ ] `docs/specifications/audit-log-migration-plan.md`:7
- [ ] `docs/specifications/audit-log-migration-plan.md`:9
- [ ] `docs/specifications/audit-log-migration-plan.md`:15
- [ ] `docs/specifications/audit-log-migration-plan.md`:21
- [ ] `docs/specifications/audit-log-migration-plan.md`:23
- [ ] `docs/specifications/audit-log-migration-plan.md`:27
- [ ] `docs/specifications/audit-log-migration-plan.md`:43
- [ ] `docs/specifications/audit-log-migration-plan.md`:47
- [ ] `docs/specifications/audit-log-migration-plan.md`:63
- [ ] `docs/specifications/audit-log-migration-plan.md`:67
- [ ] `docs/specifications/audit-log-migration-plan.md`:83
- [ ] `docs/specifications/audit-log-migration-plan.md`:87
- [ ] `docs/specifications/audit-log-migration-plan.md`:103
- [ ] `docs/specifications/audit-log-migration-plan.md`:107
- [ ] `docs/specifications/audit-log-migration-plan.md`:123
- [ ] `docs/specifications/audit-log-migration-plan.md`:125
- [ ] `docs/specifications/audit-log-migration-plan.md`:133
- [ ] `docs/specifications/audit-log-migration-plan.md`:138
- [ ] `docs/specifications/audit-log-migration-plan.md`:140
- [ ] `docs/specifications/audit-log-migration-plan.md`:147
- [ ] `docs/specifications/audit-log-migration-plan.md`:154
- [ ] `docs/specifications/audit-log-migration-plan.md`:156
- [ ] `docs/specifications/audit-log-migration-plan.md`:161
- [ ] `docs/specifications/audit-log-migration-plan.md`:167
- [ ] `docs/specifications/audit-log-migration-plan.md`:169
- [ ] `docs/specifications/audit-log-migration-plan.md`:174
- [ ] `docs/specifications/audit-log-migration-plan.md`:179
- [ ] `docs/specifications/claude-directory-specification.md`:3
- [ ] `docs/specifications/claude-directory-specification.md`:7
- [ ] `docs/specifications/claude-directory-specification.md`:11
- [ ] `docs/specifications/claude-directory-specification.md`:21
- [ ] `docs/specifications/claude-directory-specification.md`:23
- [ ] `docs/specifications/claude-directory-specification.md`:34
- [ ] `docs/specifications/claude-directory-specification.md`:45
- [ ] `docs/specifications/claude-directory-specification.md`:56
- [ ] `docs/specifications/claude-directory-specification.md`:67
- [ ] `docs/specifications/claude-directory-specification.md`:71
- [ ] `docs/specifications/claude-directory-specification.md`:76
- [ ] `docs/specifications/claude-directory-specification.md`:81
- [ ] `docs/specifications/claude-directory-specification.md`:86
- [ ] `docs/specifications/claude-directory-specification.md`:93
- [ ] `docs/specifications/claude-directory-specification.md`:102
- [ ] `docs/specifications/claude-directory-specification.md`:110
- [ ] `docs/specifications/se-1-git-workflow-enforcement-spec.md`:3
- [ ] `docs/specifications/se-1-git-workflow-enforcement-spec.md`:7
- [ ] `docs/specifications/se-1-git-workflow-enforcement-spec.md`:21
- [ ] `docs/specifications/se-1-git-workflow-enforcement-spec.md`:25
- [ ] `docs/specifications/se-1-git-workflow-enforcement-spec.md`:27
- [ ] `docs/specifications/se-1-git-workflow-enforcement-spec.md`:30
- [ ] `docs/specifications/se-1-git-workflow-enforcement-spec.md`:32
- [ ] `docs/specifications/se-1-git-workflow-enforcement-spec.md`:40
- [ ] `docs/specifications/se-1-git-workflow-enforcement-spec.md`:48
- [ ] `docs/specifications/se-1-git-workflow-enforcement-spec.md`:54
- [ ] `docs/specifications/se-1-git-workflow-enforcement-spec.md`:59
- [ ] `docs/specifications/se-1-git-workflow-enforcement-spec.md`:69
- [ ] `docs/specifications/se-1-git-workflow-enforcement-spec.md`:71
- [ ] `docs/specifications/se-1-git-workflow-enforcement-spec.md`:76
- [ ] `docs/specifications/se-1-git-workflow-enforcement-spec.md`:81
- [ ] `docs/specifications/se-1-git-workflow-enforcement-spec.md`:86
- [ ] `docs/specifications/se-1-git-workflow-enforcement-spec.md`:93
- [ ] `docs/specifications/se-1-git-workflow-enforcement-spec.md`:100
- [ ] `docs/specifications/se-1-git-workflow-enforcement-spec.md`:120
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:5
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:9
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:16
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:18
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:22
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:27
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:32
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:34
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:43
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:50
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:52
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:60
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:68
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:73
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:78
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:80
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:86
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:91
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:96
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:101
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:103
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:108
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:113
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:118
- [ ] `docs/specifications/subdirectory-claude-md-plan.md`:126
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:3
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:7
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:83
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:85
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:103
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:130
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:144
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:152
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:154
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:160
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:166
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:171
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:173
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:178
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:183
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:188
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:193
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:195
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:206
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:217
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:219
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:224
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:229
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:231
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:236
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:241
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:246
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:248
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:253
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:258
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:263
- [ ] `docs/workflows/branching-strategy.md`:3
- [ ] `docs/workflows/branching-strategy.md`:7
- [ ] `docs/workflows/branching-strategy.md`:9
- [ ] `docs/workflows/branching-strategy.md`:12
- [ ] `docs/workflows/branching-strategy.md`:16
- [ ] `docs/workflows/branching-strategy.md`:20
- [ ] `docs/workflows/branching-strategy.md`:22
- [ ] `docs/workflows/branching-strategy.md`:38
- [ ] `docs/workflows/branching-strategy.md`:62
- [ ] `docs/workflows/branching-strategy.md`:64
- [ ] `docs/workflows/branching-strategy.md`:70
- [ ] `docs/workflows/branching-strategy.md`:76
- [ ] `docs/workflows/branching-strategy.md`:78
- [ ] `docs/workflows/branching-strategy.md`:84
- [ ] `docs/workflows/branching-strategy.md`:90
- [ ] `docs/workflows/code-quality-patterns.md`:3
- [ ] `docs/workflows/code-quality-patterns.md`:19
- [ ] `docs/workflows/code-quality-patterns.md`:29
- [ ] `docs/workflows/code-quality-patterns.md`:37
- [ ] `docs/workflows/operational-tdd-framework.md`:3
- [ ] `docs/workflows/operational-tdd-framework.md`:7
- [ ] `docs/workflows/operational-tdd-framework.md`:11
- [ ] `docs/workflows/operational-tdd-framework.md`:13
- [ ] `docs/workflows/operational-tdd-framework.md`:29
- [ ] `docs/workflows/operational-tdd-framework.md`:31
- [ ] `docs/workflows/operational-tdd-framework.md`:54
- [ ] `docs/workflows/operational-tdd-framework.md`:76
- [ ] `docs/workflows/operational-tdd-framework.md`:98
- [ ] `docs/workflows/operational-tdd-framework.md`:120
- [ ] `docs/workflows/operational-tdd-framework.md`:142
- [ ] `docs/workflows/operational-tdd-framework.md`:144
- [ ] `docs/workflows/operational-tdd-framework.md`:170
- [ ] `docs/workflows/operational-tdd-framework.md`:172
- [ ] `docs/workflows/operational-tdd-framework.md`:179
- [ ] `docs/workflows/operational-tdd-framework.md`:186
- [ ] `docs/workflows/operational-tdd-framework.md`:192
- [ ] `docs/workflows/operational-tdd-framework.md`:199
- [ ] `docs/workflows/operational-tdd-framework.md`:206
- [ ] `docs/workflows/operational-tdd-framework.md`:208
- [ ] `docs/workflows/operational-tdd-framework.md`:213
- [ ] `docs/workflows/operational-tdd-framework.md`:218
- [ ] `docs/workflows/operational-tdd-framework.md`:232
- [ ] `docs/workflows/operational-tdd-framework.md`:234
- [ ] `docs/workflows/operational-tdd-framework.md`:239
- [ ] `docs/workflows/operational-tdd-framework.md`:244
- [ ] `docs/workflows/operational-tdd-framework.md`:249
- [ ] `docs/workflows/operational-tdd-framework.md`:254
- [ ] `docs/workflows/operational-tdd-framework.md`:259
- [ ] `docs/workflows/operational-tdd-framework.md`:261
- [ ] `docs/workflows/operational-tdd-framework.md`:266
- [ ] `docs/workflows/operational-tdd-framework.md`:271
- [ ] `docs/workflows/operational-tdd-framework.md`:276
- [ ] `docs/workflows/operational-tdd-framework.md`:281
- [ ] `docs/workflows/operational-tdd-framework.md`:283
- [ ] `docs/workflows/operational-tdd-framework.md`:288
- [ ] `docs/workflows/operational-tdd-framework.md`:293
- [ ] `docs/workflows/phase-based-development-strategy.md`:3
- [ ] `docs/workflows/phase-based-development-strategy.md`:7
- [ ] `docs/workflows/phase-based-development-strategy.md`:9
- [ ] `docs/workflows/phase-based-development-strategy.md`:12
- [ ] `docs/workflows/phase-based-development-strategy.md`:18
- [ ] `docs/workflows/phase-based-development-strategy.md`:25
- [ ] `docs/workflows/phase-based-development-strategy.md`:27
- [ ] `docs/workflows/phase-based-development-strategy.md`:34
- [ ] `docs/workflows/phase-based-development-strategy.md`:42
- [ ] `docs/workflows/phase-based-development-strategy.md`:48
- [ ] `docs/workflows/phase-based-development-strategy.md`:50
- [ ] `docs/workflows/phase-based-development-strategy.md`:56
- [ ] `docs/workflows/phase-based-development-strategy.md`:62
- [ ] `docs/workflows/phase-based-development-strategy.md`:67
- [ ] `docs/workflows/phase-based-development-strategy.md`:69
- [ ] `docs/workflows/phase-based-development-strategy.md`:74
- [ ] `docs/workflows/phase-based-development-strategy.md`:79
- [ ] `docs/workflows/phase-based-development-strategy.md`:84
- [ ] `docs/workflows/phase-based-development-strategy.md`:86
- [ ] `docs/workflows/phase-based-development-strategy.md`:91
- [ ] `docs/workflows/phase-based-development-strategy.md`:96
- [ ] `docs/workflows/phase-based-development-strategy.md`:101
- [ ] `docs/workflows/phase-based-development-strategy.md`:103
- [ ] `docs/workflows/phase-based-development-strategy.md`:108
- [ ] `docs/workflows/phase-based-development-strategy.md`:113
- [ ] `docs/workflows/phase-based-development-strategy.md`:118
- [ ] `docs/workflows/phase-based-development-strategy.md`:120
- [ ] `docs/workflows/phase-based-development-strategy.md`:127
- [ ] `docs/workflows/phase-based-development-strategy.md`:140
- [ ] `docs/workflows/phase-based-development-strategy.md`:155
- [ ] `docs/workflows/phase-based-implementation-guide.md`:3
- [ ] `docs/workflows/phase-based-implementation-guide.md`:7
- [ ] `docs/workflows/phase-based-implementation-guide.md`:9
- [ ] `docs/workflows/phase-based-implementation-guide.md`:25
- [ ] `docs/workflows/phase-based-implementation-guide.md`:30
- [ ] `docs/workflows/phase-based-implementation-guide.md`:53
- [ ] `docs/workflows/phase-based-implementation-guide.md`:55
- [ ] `docs/workflows/phase-based-implementation-guide.md`:85
- [ ] `docs/workflows/phase-based-implementation-guide.md`:87
- [ ] `docs/workflows/phase-based-implementation-guide.md`:107
- [ ] `docs/workflows/phase-based-implementation-guide.md`:134
- [ ] `docs/workflows/phase-based-implementation-guide.md`:137
- [ ] `docs/workflows/phase-based-implementation-guide.md`:158
- [ ] `docs/workflows/phase-based-implementation-guide.md`:160
- [ ] `docs/workflows/phase-based-implementation-guide.md`:187
- [ ] `docs/workflows/phase-based-implementation-guide.md`:190
- [ ] `docs/workflows/phase-based-implementation-guide.md`:212
- [ ] `docs/workflows/phase-based-implementation-guide.md`:214
- [ ] `docs/workflows/phase-based-implementation-guide.md`:240
- [ ] `docs/workflows/phase-based-implementation-guide.md`:267
- [ ] `docs/workflows/phase-based-implementation-guide.md`:269
- [ ] `docs/workflows/phase-based-implementation-guide.md`:286
- [ ] `docs/workflows/phase-based-implementation-guide.md`:300
- [ ] `docs/workflows/phase-based-implementation-guide.md`:308
- [ ] `docs/workflows/phase-based-implementation-guide.md`:310
- [ ] `docs/workflows/phase-based-implementation-guide.md`:317
- [ ] `docs/workflows/phase-based-implementation-guide.md`:324
- [ ] `docs/workflows/phase-based-implementation-guide.md`:331
- [ ] `docs/workflows/tdd-workflow-architecture.md`:3
- [ ] `docs/workflows/tdd-workflow-architecture.md`:7
- [ ] `docs/workflows/tdd-workflow-architecture.md`:9
- [ ] `docs/workflows/tdd-workflow-architecture.md`:26
- [ ] `docs/workflows/tdd-workflow-architecture.md`:28
- [ ] `docs/workflows/tdd-workflow-architecture.md`:41
- [ ] `docs/workflows/tdd-workflow-architecture.md`:43
- [ ] `docs/workflows/tdd-workflow-architecture.md`:82
- [ ] `docs/workflows/tdd-workflow-architecture.md`:131
- [ ] `docs/workflows/tdd-workflow-architecture.md`:149
- [ ] `docs/workflows/tdd-workflow-architecture.md`:173
- [ ] `docs/workflows/tdd-workflow-architecture.md`:195
- [ ] `docs/workflows/tdd-workflow-architecture.md`:216
- [ ] `docs/workflows/tdd-workflow-architecture.md`:218
- [ ] `docs/workflows/tdd-workflow-architecture.md`:252
- [ ] `docs/workflows/tdd-workflow-architecture.md`:259
- [ ] `docs/workflows/tdd-workflow-architecture.md`:297
- [ ] `docs/workflows/tdd-workflow-architecture.md`:299
- [ ] `docs/workflows/tdd-workflow-architecture.md`:324
- [ ] `docs/workflows/tdd-workflow-architecture.md`:333
- [ ] `docs/workflows/tdd-workflow-architecture.md`:335
- [ ] `docs/workflows/tdd-workflow-architecture.md`:337
- [ ] `docs/workflows/tdd-workflow-architecture.md`:343
- [ ] `docs/workflows/tdd-workflow-architecture.md`:354
- [ ] `docs/workflows/tdd-workflow-architecture.md`:360
- [ ] `docs/workflows/tdd-workflow-architecture.md`:362
- [ ] `docs/workflows/tdd-workflow-architecture.md`:367
- [ ] `docs/workflows/tdd-workflow-architecture.md`:369
- [ ] `docs/workflows/tdd-workflow-architecture.md`:374
- [ ] `docs/workflows/tdd-workflow-architecture.md`:376
- [ ] `docs/workflows/tdd-workflow-architecture.md`:381
- [ ] `docs/workflows/tdd-workflow-architecture.md`:386
- [ ] `docs/workflows/tdd-workflow-architecture.md`:391
- [ ] `docs/workflows/tdd-workflow-architecture.md`:393
- [ ] `docs/workflows/tdd-workflow-architecture.md`:398
- [ ] `docs/workflows/tdd-workflow-architecture.md`:403
- [ ] `docs/workflows/tdd-workflow-architecture.md`:408
- [ ] `docs/workflows/testing-frameworks.md`:3
- [ ] `docs/workflows/testing-frameworks.md`:7
- [ ] `docs/workflows/testing-frameworks.md`:21
- [ ] `docs/workflows/testing-frameworks.md`:31
- [ ] `docs/workflows/testing-frameworks.md`:34
- [ ] `docs/workflows/testing-frameworks.md`:47
- [ ] `docs/workflows/testing-frameworks.md`:56
- [ ] `docs/workflows/testing-frameworks.md`:66

### code_block_formatting (376 instances)

**Pattern**: Code block without language specification
**Action**: Add language identifier for syntax highlighting

**All Files**:
- [ ] `CLAUDE.md`:37
- [ ] `CLAUDE.md`:39
- [ ] `CLAUDE.md`:42
- [ ] `CLAUDE.md`:44
- [ ] `CLAUDE.md`:47
- [ ] `CLAUDE.md`:49
- [ ] `CLAUDE.md`:189
- [ ] `CLAUDE.md`:191
- [ ] `CLAUDE.md`:194
- [ ] `CLAUDE.md`:196
- [ ] `CLAUDE.md`:199
- [ ] `CLAUDE.md`:201
- [ ] `INSTALL.md`:29
- [ ] `INSTALL.md`:49
- [ ] `INSTALL.md`:63
- [ ] `README.md`:19
- [ ] `README.md`:57
- [ ] `README.md`:63
- [ ] `README.md`:68
- [ ] `claude/operational-docs/docs-organization-strategy.md`:151
- [ ] `claude/operational-docs/docs-organization-strategy.md`:160
- [ ] `claude/operational-docs/project-decision-framework.md`:47
- [ ] `claude/operational-docs/project-decision-framework.md`:115
- [ ] `claude/operational-docs/project-decision-framework.md`:130
- [ ] `claude/operational-docs/project-decision-framework.md`:139
- [ ] `claude/operational-docs/project-decision-framework.md`:147
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:118
- [ ] `claude/operational-docs/repository-maintenance-analysis-plan.md`:125
- [ ] `claude/workflows/AUDIT_LOGGING.md`:12
- [ ] `claude/workflows/AUDIT_LOGGING.md`:20
- [ ] `claude/workflows/AUDIT_LOGGING.md`:30
- [ ] `claude/workflows/AUDIT_LOGGING.md`:32
- [ ] `claude/workflows/AUDIT_LOGGING.md`:45
- [ ] `claude/workflows/AUDIT_LOGGING.md`:47
- [ ] `claude/workflows/AUDIT_LOGGING.md`:50
- [ ] `claude/workflows/AUDIT_LOGGING.md`:52
- [ ] `claude/workflows/AUDIT_LOGGING.md`:55
- [ ] `claude/workflows/AUDIT_LOGGING.md`:57
- [ ] `claude/workflows/AUDIT_LOGGING.md`:65
- [ ] `claude/workflows/AUDIT_LOGGING.md`:71
- [ ] `claude/workflows/AUDIT_LOGGING.md`:81
- [ ] `claude/workflows/AUDIT_LOGGING.md`:86
- [ ] `claude/workflows/AUDIT_LOGGING.md`:91
- [ ] `claude/workflows/AUDIT_LOGGING.md`:94
- [ ] `claude/workflows/AUDIT_LOGGING.md`:97
- [ ] `claude/workflows/AUDIT_LOGGING.md`:101
- [ ] `claude/workflows/AUDIT_LOGGING.md`:104
- [ ] `claude/workflows/AUDIT_LOGGING.md`:107
- [ ] `claude/workflows/AUDIT_LOGGING.md`:115
- [ ] `claude/workflows/AUDIT_LOGGING.md`:118
- [ ] `claude/workflows/AUDIT_LOGGING.md`:121
- [ ] `claude/workflows/AUDIT_LOGGING.md`:125
- [ ] `claude/workflows/AUDIT_LOGGING.md`:134
- [ ] `claude/workflows/AUDIT_LOGGING.md`:138
- [ ] `claude/workflows/AUDIT_LOGGING.md`:148
- [ ] `claude/workflows/AUDIT_LOGGING.md`:169
- [ ] `claude/workflows/AUDIT_LOGGING.md`:180
- [ ] `claude/workflows/AUDIT_LOGGING.md`:187
- [ ] `claude/workflows/ESSENTIAL_COMMANDS.md`:7
- [ ] `claude/workflows/ESSENTIAL_COMMANDS.md`:16
- [ ] `claude/workflows/GITHUB_WORKFLOW.md`:26
- [ ] `claude/workflows/GITHUB_WORKFLOW.md`:33
- [ ] `claude/workflows/GITHUB_WORKFLOW.md`:40
- [ ] `claude/workflows/GITHUB_WORKFLOW.md`:47
- [ ] `claude/workflows/GIT_WORKFLOW.md`:28
- [ ] `claude/workflows/GIT_WORKFLOW.md`:38
- [ ] `claude/workflows/GIT_WORKFLOW.md`:67
- [ ] `claude/workflows/GIT_WORKFLOW.md`:97
- [ ] `claude/workflows/GIT_WORKFLOW.md`:108
- [ ] `claude/workflows/GIT_WORKFLOW.md`:132
- [ ] `claude/workflows/GIT_WORKFLOW.md`:157
- [ ] `claude/workflows/GIT_WORKFLOW.md`:190
- [ ] `claude/workflows/GIT_WORKFLOW.md`:207
- [ ] `claude/workflows/KEYWORD_REGISTRY.md`:74
- [ ] `claude/workflows/KEYWORD_REGISTRY.md`:86
- [ ] `claude/workflows/KEYWORD_REGISTRY.md`:101
- [ ] `claude/workflows/KEYWORD_REGISTRY.md`:106
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:76
- [ ] `claude/workflows/NEW_VERSION_PLANNING.md`:82
- [ ] `claude/workflows/NEXT_ISSUE.md`:11
- [ ] `claude/workflows/NEXT_ISSUE.md`:81
- [ ] `claude/workflows/NEXT_ISSUE.md`:86
- [ ] `claude/workflows/NEXT_ISSUE.md`:91
- [ ] `claude/workflows/NEXT_ISSUE.md`:117
- [ ] `claude/workflows/NEXT_ISSUE.md`:125
- [ ] `claude/workflows/NEXT_ISSUE.md`:132
- [ ] `claude/workflows/NEXT_ISSUE.md`:152
- [ ] `claude/workflows/PLANNED_VS_UNPLANNED.md`:67
- [ ] `claude/workflows/PLANNED_VS_UNPLANNED.md`:74
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:16
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:23
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:30
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:73
- [ ] `claude/workflows/PROJECT_AUTOMATION.md`:90
- [ ] `claude/workflows/RELEASE_PROCESS.md`:30
- [ ] `claude/workflows/RELEASE_PROCESS.md`:49
- [ ] `claude/workflows/RELEASE_PROCESS.md`:64
- [ ] `claude/workflows/RELEASE_PROCESS.md`:74
- [ ] `claude/workflows/RELEASE_PROCESS.md`:79
- [ ] `claude/workflows/RELEASE_PROCESS.md`:87
- [ ] `claude/workflows/RELEASE_PROCESS.md`:170
- [ ] `claude/workflows/SESSION_END.md`:79
- [ ] `claude/workflows/SESSION_END.md`:83
- [ ] `claude/workflows/VERSION_TRANSITION.md`:53
- [ ] `claude/workflows/VERSION_TRANSITION.md`:61
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:29
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:39
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:42
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:51
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:75
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:82
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:92
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:100
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:107
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:112
- [ ] `claude/workflows/WORKFLOW_RECOMMENDATION.md`:116
- [ ] `docs/api/7zip-command-line-api.md`:13
- [ ] `docs/api/7zip-command-line-api.md`:15
- [ ] `docs/api/7zip-command-line-api.md`:37
- [ ] `docs/api/7zip-command-line-api.md`:90
- [ ] `docs/api/7zip-command-line-api.md`:103
- [ ] `docs/api/7zip-command-line-api.md`:119
- [ ] `docs/api/7zip-command-line-api.md`:150
- [ ] `docs/api/7zip-command-line-api.md`:160
- [ ] `docs/api/execute-api-properties.md`:45
- [ ] `docs/api/execute-api-properties.md`:48
- [ ] `docs/api/execute-api-properties.md`:56
- [ ] `docs/api/package-api-properties.md`:21
- [ ] `docs/api/package-api-properties.md`:42
- [ ] `docs/api/spl-package-api-analysis.md`:27
- [ ] `docs/api/spl-package-api-analysis.md`:42
- [ ] `docs/architecture/container-registry-strategy.md`:27
- [ ] `docs/architecture/container-registry-strategy.md`:31
- [ ] `docs/architecture/container-registry-strategy.md`:40
- [ ] `docs/architecture/container-registry-strategy.md`:44
- [ ] `docs/architecture/container-registry-strategy.md`:55
- [ ] `docs/architecture/container-registry-strategy.md`:62
- [ ] `docs/architecture/container-registry-strategy.md`:65
- [ ] `docs/architecture/container-registry-strategy.md`:72
- [ ] `docs/architecture/container-registry-strategy.md`:93
- [ ] `docs/architecture/container-registry-strategy.md`:108
- [ ] `docs/architecture/container-unified-entity-strategy.md`:58
- [ ] `docs/architecture/container-unified-entity-strategy.md`:83
- [ ] `docs/architecture/container-unified-entity-strategy.md`:148
- [ ] `docs/architecture/container-unified-entity-strategy.md`:157
- [ ] `docs/architecture/container-unified-entity-strategy.md`:166
- [ ] `docs/architecture/container-unified-entity-strategy.md`:171
- [ ] `docs/architecture/container-unified-entity-strategy.md`:185
- [ ] `docs/architecture/container-unified-entity-strategy.md`:202
- [ ] `docs/architecture/container-unified-entity-strategy.md`:212
- [ ] `docs/architecture/federated-monorepo-design.md`:14
- [ ] `docs/architecture/federated-monorepo-design.md`:20
- [ ] `docs/architecture/federated-monorepo-design.md`:29
- [ ] `docs/architecture/federated-monorepo-design.md`:44
- [ ] `docs/architecture/federated-monorepo-design.md`:73
- [ ] `docs/architecture/federated-monorepo-design.md`:81
- [ ] `docs/architecture/federated-monorepo-design.md`:84
- [ ] `docs/architecture/federated-monorepo-design.md`:95
- [ ] `docs/architecture/federated-monorepo-design.md`:157
- [ ] `docs/architecture/federated-monorepo-design.md`:173
- [ ] `docs/architecture/federated-monorepo-design.md`:215
- [ ] `docs/architecture/project-overview.md`:77
- [ ] `docs/architecture/se1-container-engine-architecture.md`:26
- [ ] `docs/architecture/se1-container-engine-architecture.md`:31
- [ ] `docs/architecture/se1-container-engine-architecture.md`:40
- [ ] `docs/guides/app-development.md`:88
- [ ] `docs/guides/creating-new-apps.md`:16
- [ ] `docs/guides/creating-new-apps.md`:29
- [ ] `docs/guides/creating-new-apps.md`:39
- [ ] `docs/guides/creating-new-apps.md`:53
- [ ] `docs/guides/how-to.md`:12
- [ ] `docs/guides/how-to.md`:15
- [ ] `docs/guides/how-to.md`:20
- [ ] `docs/guides/how-to.md`:36
- [ ] `docs/guides/how-to.md`:62
- [ ] `docs/guides/how-to.md`:99
- [ ] `docs/guides/how-to.md`:113
- [ ] `docs/guides/how-to.md`:125
- [ ] `docs/guides/how-to.md`:141
- [ ] `docs/guides/how-to.md`:148
- [ ] `docs/guides/how-to.md`:157
- [ ] `docs/guides/how-to.md`:182
- [ ] `docs/guides/how-to.md`:185
- [ ] `docs/guides/how-to.md`:193
- [ ] `docs/guides/how-to.md`:221
- [ ] `docs/guides/how-to.md`:228
- [ ] `docs/guides/how-to.md`:233
- [ ] `docs/guides/how-to.md`:238
- [ ] `docs/guides/implementing-new-api.md`:16
- [ ] `docs/guides/implementing-new-api.md`:32
- [ ] `docs/guides/implementing-new-api.md`:39
- [ ] `docs/guides/implementing-new-api.md`:57
- [ ] `docs/guides/implementing-new-api.md`:79
- [ ] `docs/guides/implementing-new-api.md`:96
- [ ] `docs/guides/implementing-new-api.md`:117
- [ ] `docs/guides/release-and-install-process.md`:30
- [ ] `docs/guides/release-and-install-process.md`:41
- [ ] `docs/guides/release-and-install-process.md`:52
- [ ] `docs/guides/release-and-install-process.md`:58
- [ ] `docs/guides/release-and-install-process.md`:65
- [ ] `docs/guides/release-and-install-process.md`:71
- [ ] `docs/guides/release-and-install-process.md`:78
- [ ] `docs/guides/release-and-install-process.md`:84
- [ ] `docs/guides/release-and-install-process.md`:105
- [ ] `docs/integration/avro-queue-folder-service-design.md`:13
- [ ] `docs/integration/avro-queue-folder-service-design.md`:17
- [ ] `docs/integration/avro-queue-folder-service-design.md`:23
- [ ] `docs/integration/avro-queue-folder-service-design.md`:25
- [ ] `docs/integration/avro-queue-folder-service-design.md`:48
- [ ] `docs/integration/avro-queue-folder-service-design.md`:66
- [ ] `docs/integration/avro-queue-folder-service-design.md`:75
- [ ] `docs/integration/avro-queue-folder-service-design.md`:120
- [ ] `docs/integration/avro-queue-folder-service-design.md`:127
- [ ] `docs/integration/avro-queue-folder-service-design.md`:129
- [ ] `docs/integration/avro-queue-folder-service-design.md`:132
- [ ] `docs/integration/avro-queue-folder-service-design.md`:134
- [ ] `docs/integration/avro-schema-architecture.md`:77
- [ ] `docs/integration/avro-schema-architecture.md`:108
- [ ] `docs/integration/avro-schema-architecture.md`:127
- [ ] `docs/integration/avro-schema-architecture.md`:155
- [ ] `docs/integration/avro-schema-architecture.md`:159
- [ ] `docs/integration/avro-schema-architecture.md`:185
- [ ] `docs/integration/avro-service-definitions-communication.md`:26
- [ ] `docs/integration/avro-service-definitions-communication.md`:36
- [ ] `docs/integration/avro-service-definitions-communication.md`:59
- [ ] `docs/integration/avro-service-definitions-communication.md`:90
- [ ] `docs/integration/avro-service-definitions-communication.md`:119
- [ ] `docs/integration/avro-service-definitions-communication.md`:147
- [ ] `docs/integration/avro-service-definitions-communication.md`:173
- [ ] `docs/integration/avro-service-definitions-communication.md`:197
- [ ] `docs/integration/avro-service-definitions-communication.md`:204
- [ ] `docs/integration/avro-service-definitions-communication.md`:215
- [ ] `docs/integration/avro-service-definitions-communication.md`:230
- [ ] `docs/integration/avro-service-definitions-communication.md`:241
- [ ] `docs/integration/avro-service-definitions-communication.md`:259
- [ ] `docs/integration/avro-service-definitions-communication.md`:276
- [ ] `docs/integration/avro-service-definitions-communication.md`:286
- [ ] `docs/integration/avro-service-definitions-communication.md`:298
- [ ] `docs/integration/avro-service-definitions-communication.md`:309
- [ ] `docs/integration/avro-service-definitions-communication.md`:329
- [ ] `docs/integration/avro-service-definitions-communication.md`:342
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:37
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:58
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:81
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:113
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:125
- [ ] `docs/integration/bare-minimal-dependency-architecture.md`:147
- [ ] `docs/integration/itil-integration-approach.md`:106
- [ ] `docs/integration/itil-integration-approach.md`:116
- [ ] `docs/integration/itil-integration-approach.md`:153
- [ ] `docs/integration/itil-integration-approach.md`:162
- [ ] `docs/integration/itil-integration-approach.md`:344
- [ ] `docs/integration/itil-integration-approach.md`:368
- [ ] `docs/integration/prince2-integration-approach.md`:130
- [ ] `docs/integration/prince2-integration-approach.md`:139
- [ ] `docs/integration/prince2-integration-approach.md`:142
- [ ] `docs/integration/prince2-integration-approach.md`:150
- [ ] `docs/integration/prince2-integration-approach.md`:153
- [ ] `docs/integration/prince2-integration-approach.md`:161
- [ ] `docs/integration/qubes-splectrum-integration.md`:24
- [ ] `docs/integration/qubes-splectrum-integration.md`:43
- [ ] `docs/integration/qubes-splectrum-integration.md`:50
- [ ] `docs/integration/qubes-splectrum-integration.md`:61
- [ ] `docs/integration/qubes-splectrum-integration.md`:78
- [ ] `docs/integration/qubes-splectrum-integration.md`:86
- [ ] `docs/integration/qubes-splectrum-integration.md`:101
- [ ] `docs/integration/qubes-splectrum-integration.md`:134
- [ ] `docs/integration/qubes-splectrum-integration.md`:152
- [ ] `docs/integration/qubes-splectrum-integration.md`:173
- [ ] `docs/integration/qubes-splectrum-integration.md`:190
- [ ] `docs/integration/qubes-splectrum-integration.md`:211
- [ ] `docs/integration/qubes-splectrum-integration.md`:227
- [ ] `docs/integration/qubes-splectrum-integration.md`:258
- [ ] `docs/integration/qubes-splectrum-integration.md`:278
- [ ] `docs/management/decision-log.md`:22
- [ ] `docs/management/decision-log.md`:28
- [ ] `docs/management/github-project-setup.md`:32
- [ ] `docs/management/github-project-setup.md`:39
- [ ] `docs/management/github-project-setup.md`:48
- [ ] `docs/management/github-project-setup.md`:84
- [ ] `docs/management/github-project-setup.md`:105
- [ ] `docs/management/github-project-setup.md`:126
- [ ] `docs/management/github-project-setup.md`:152
- [ ] `docs/management/github-project-setup.md`:193
- [ ] `docs/management/github-project-setup.md`:198
- [ ] `docs/management/github-project-setup.md`:203
- [ ] `docs/reference/node-dependency-audit.md`:64
- [ ] `docs/reference/node-dependency-audit.md`:84
- [ ] `docs/reference/node-dependency-audit.md`:90
- [ ] `docs/reference/node-dependency-audit.md`:96
- [ ] `docs/reference/node-dependency-audit.md`:102
- [ ] `docs/reference/node-dependency-audit.md`:165
- [ ] `docs/reference/node-dependency-audit.md`:171
- [ ] `docs/reference/prerequisites.md`:34
- [ ] `docs/reference/prerequisites.md`:47
- [ ] `docs/reference/prerequisites.md`:59
- [ ] `docs/reference/prerequisites.md`:76
- [ ] `docs/reference/prerequisites.md`:99
- [ ] `docs/reference/prerequisites.md`:120
- [ ] `docs/reference/prerequisites.md`:146
- [ ] `docs/reference/prerequisites.md`:192
- [ ] `docs/reference/prerequisites.md`:204
- [ ] `docs/reference/prerequisites.md`:224
- [ ] `docs/reference/prerequisites.md`:239
- [ ] `docs/reference/quick-reference.md`:17
- [ ] `docs/reference/quick-reference.md`:46
- [ ] `docs/reference/quick-reference.md`:49
- [ ] `docs/reference/quick-reference.md`:56
- [ ] `docs/reference/test-app-development.md`:8
- [ ] `docs/reference/test-app-development.md`:17
- [ ] `docs/reference/test-app-development.md`:23
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:585
- [ ] `docs/reports/v0.6.1-workflow-optimization.md`:588
- [ ] `docs/specifications/audit-log-architecture.md`:10
- [ ] `docs/specifications/audit-log-architecture.md`:20
- [ ] `docs/specifications/audit-log-architecture.md`:35
- [ ] `docs/specifications/audit-log-architecture.md`:38
- [ ] `docs/specifications/claude-directory-specification.md`:13
- [ ] `docs/specifications/claude-directory-specification.md`:19
- [ ] `docs/specifications/se-1-git-workflow-enforcement-spec.md`:61
- [ ] `docs/specifications/se-1-git-workflow-enforcement-spec.md`:67
- [ ] `docs/specifications/se-1-git-workflow-enforcement-spec.md`:112
- [ ] `docs/specifications/se-1-git-workflow-enforcement-spec.md`:118
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:9
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:81
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:119
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:126
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:196
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:204
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:207
- [ ] `docs/workflows/backlog-to-completion-workflow.md`:215
- [ ] `docs/workflows/branching-strategy.md`:36
- [ ] `docs/workflows/branching-strategy.md`:60
- [ ] `docs/workflows/code-quality-patterns.md`:10
- [ ] `docs/workflows/operational-tdd-framework.md`:14
- [ ] `docs/workflows/operational-tdd-framework.md`:27
- [ ] `docs/workflows/operational-tdd-framework.md`:52
- [ ] `docs/workflows/operational-tdd-framework.md`:74
- [ ] `docs/workflows/operational-tdd-framework.md`:96
- [ ] `docs/workflows/operational-tdd-framework.md`:118
- [ ] `docs/workflows/operational-tdd-framework.md`:140
- [ ] `docs/workflows/operational-tdd-framework.md`:145
- [ ] `docs/workflows/operational-tdd-framework.md`:168
- [ ] `docs/workflows/operational-tdd-framework.md`:177
- [ ] `docs/workflows/operational-tdd-framework.md`:184
- [ ] `docs/workflows/operational-tdd-framework.md`:190
- [ ] `docs/workflows/operational-tdd-framework.md`:197
- [ ] `docs/workflows/operational-tdd-framework.md`:204
- [ ] `docs/workflows/operational-tdd-framework.md`:219
- [ ] `docs/workflows/operational-tdd-framework.md`:230
- [ ] `docs/workflows/phase-based-implementation-guide.md`:51
- [ ] `docs/workflows/phase-based-implementation-guide.md`:69
- [ ] `docs/workflows/phase-based-implementation-guide.md`:72
- [ ] `docs/workflows/phase-based-implementation-guide.md`:83
- [ ] `docs/workflows/phase-based-implementation-guide.md`:132
- [ ] `docs/workflows/phase-based-implementation-guide.md`:156
- [ ] `docs/workflows/phase-based-implementation-guide.md`:210
- [ ] `docs/workflows/phase-based-implementation-guide.md`:238
- [ ] `docs/workflows/phase-based-implementation-guide.md`:265
- [ ] `docs/workflows/tdd-workflow-architecture.md`:80
- [ ] `docs/workflows/tdd-workflow-architecture.md`:129
- [ ] `docs/workflows/tdd-workflow-architecture.md`:147
- [ ] `docs/workflows/tdd-workflow-architecture.md`:171
- [ ] `docs/workflows/tdd-workflow-architecture.md`:175
- [ ] `docs/workflows/tdd-workflow-architecture.md`:193
- [ ] `docs/workflows/tdd-workflow-architecture.md`:214
- [ ] `docs/workflows/tdd-workflow-architecture.md`:250
- [ ] `docs/workflows/tdd-workflow-architecture.md`:295
- [ ] `docs/workflows/tdd-workflow-architecture.md`:306
- [ ] `docs/workflows/tdd-workflow-architecture.md`:314
- [ ] `docs/workflows/tdd-workflow-architecture.md`:322
- [ ] `docs/workflows/tdd-workflow-architecture.md`:331
- [ ] `docs/workflows/tdd-workflow-architecture.md`:344
- [ ] `docs/workflows/tdd-workflow-architecture.md`:352
- [ ] `docs/workflows/testing-frameworks.md`:8
- [ ] `docs/workflows/testing-frameworks.md`:19

## Progress Tracking

### Completion Summary
- [ ] High Priority: 0/610 completed
- [ ] Medium Priority: 0/124 completed
- [ ] Low Priority: 0/2908 completed

### Completion Criteria
**High Priority Complete When**:
- All broken internal links are fixed
- All version references updated to current version
- Critical navigation issues resolved

**Medium Priority Complete When**:
- Draft content reviewed and finalized or archived
- Temporary files organized properly
- Content quality issues addressed

**Low Priority Complete When**:
- Formatting consistency improved
- Terminology standardized
- Minor issues addressed as time permits

## Execution Notes

### Tips for Efficient Execution
1. **Batch similar tasks**: Group file operations by type
2. **Use find/replace**: For version updates and terminology fixes
3. **Test changes**: Verify links work after fixing
4. **Update progress**: Mark completed tasks immediately

### Common Patterns
- **Version References**: Update `v1.2.3`, `v0.6.2` → `v0.6.1`
- **Broken Links**: Check file exists, update path if moved
- **Draft Content**: Review completion status, remove draft markers
- **Temporary Files**: Decide permanent location or archive

---

*This operational document was generated by the Repository Maintenance Analyzer for VERSION_TRANSITION Step 3 execution. Update progress as tasks are completed.*