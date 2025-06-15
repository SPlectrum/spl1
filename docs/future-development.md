# Future Development Roadmap

## Key Learning: Branching Strategy Design

**Date**: 2025-06-14  
**Learning**: Simplified branching workflows are more effective for transitional projects than complex GitFlow approaches.

**Insight**: When dealing with multiple concurrent concerns (repository restructure, API enhancement, TDD implementation), feature branches that include all aspects (planning, implementation, documentation, refactoring) create cleaner integration and reduce cognitive overhead. Separating documentation and refactoring into different branches creates unnecessary complexity.

**Applied Solution**: Adopted simplified GitHub Flow with:
- `feature/*` branches for complete roadmap items
- `bugfix/*` branches for TDD-driven bug fixes
- Integration of docs/refactor within feature work
- Test-first approach for all bug fixes

This learning reinforces the value of simplicity in development workflows, especially during architectural transitions.

## Key Learning: Phase-Based Development Strategy

**Date**: 2025-06-14  
**Learning**: Breaking roadmap items into phases that can be mixed across different areas creates more efficient work units than sequential milestone completion.

**Insight**: Large roadmap items (repository restructure, AVRO integration, TDD implementation) contain phases that naturally couple with phases from other items. Working on boot area restructure alongside boot area testing and workflow design is more efficient than completing entire restructure before starting any testing work.

**Applied Solution**: Developed phase-based development strategy that:
- Decomposes roadmap items into 1-3 week phases
- Composes versions from related phases across multiple items
- Applies PRINCE2 "just enough planning" principles
- Enables parallel progress while maintaining coherent delivery units

This approach optimizes for development efficiency while maintaining quality and learning cycles.

## Key Learning: Epic Definition Process

**Date**: 2025-06-14  
**Learning**: Comprehensive epic identification requires iterative definition and cross-validation to ensure complete coverage.

**Process Applied**:
- Started with roadmap items from original purpose document
- Detailed each epic through discussion and requirements gathering
- Added emergent epic (New Functionality Development) when gap identified
- Recovered missing epic (AVRO Integration) through systematic review
- Validated completeness through potential gap analysis

**Final Epic Framework**: Seven epics covering infrastructure, core platform, quality/process, and expansion:
1. Repository Restructure - Foundation restructuring
2. External Install Workflow - Development process improvement
3. Core API Enhancement - API refactoring and improvements
4. TDD Implementation - Quality and autonomous development
5. Migration to Bare - Platform independence
6. New Functionality Development - Emergent requirements
7. AVRO Integration - Schema-driven data and communication

**Key Insights**:
- Epic definition benefits from multiple perspectives and iterative refinement
- Emergent/reactive epics (Epic 6) are as important as planned transformation epics
- Original requirements can get lost during detailed planning - systematic review prevents omissions
- Epic interdependencies inform implementation strategy

This comprehensive epic framework provides solid foundation for phase-based implementation planning.

---

## Environment Validation Framework (TDD Integration)

**Context**: From previous planning sessions - addresses significant manual checking overhead in development sessions.

**Problem**: Manual verification of paths, module resolution, context setup, and API availability creates cognitive overhead and slows development velocity.

**Solution**: Comprehensive test-driven environment validation framework

**Implementation Approach**:
- **Phase 1**: Essential test suite covering basic execution, module resolution, API functionality
- **Phase 2**: Integration with development workflows and session startup
- **Phase 3**: Comprehensive coverage and performance benchmarking

**Alignment with spl1**: This directly supports our TDD Implementation roadmap item and should be included in TDD phases.

**Key Tests Needed**:
- Basic app execution: `./spl_execute spl boot --help`
- Module resolution: `./spl_execute spl boot spl/console/log "test"`  
- Core API functionality: `./spl_execute spl boot spl/package/create --help`
- Tools integration: `./spl_execute spl boot tools/7zip/add --help`

**Success Metrics**: Time from session start to productive development < 2 minutes

## Development Management App (External Install Workflow Integration)

**Context**: From previous planning sessions - addresses workflow consistency and efficiency.

**Problem**: Common development workflows (git operations, release cycles, testing patterns) require multiple manual commands and are prone to inconsistency.

**Solution**: Dedicated management app providing standardized command routines

**Target Functionality**:
- **Git Workflow**: `mgmt/git/stage-and-commit`, `mgmt/git/release-cycle`, `mgmt/git/feature-branch`
- **Development Workflow**: `mgmt/dev/test-and-release`, `mgmt/dev/new-app`, `mgmt/dev/deploy-changes` 
- **Quality Assurance**: `mgmt/qa/validate-environment`, `mgmt/qa/pre-commit-checks`, `mgmt/qa/integration-tests`

**Alignment with spl1**: This supports both External Install Workflow and TDD Implementation roadmap items by providing standardized development automation.

**Benefits**: Consistency, efficiency, built-in validation, self-documenting workflows, easier onboarding

---

## spl/app API Redesign/Split

**Current Issue**: The spl/app API is not well designed and needs architectural refactoring.

**Problems Identified**:
- Mixed responsibilities between script execution and batch processing
- Inconsistent command patterns and naming
- Complex pipeline structure that could be simplified
- Unclear separation of concerns

**Proposed Improvements**:
- Split into distinct APIs: `spl/script` for script execution, `spl/batch` for command sequences
- Standardize command patterns across script types
- Simplify pipeline architecture
- Clear separation between execution contexts

**Priority**: Medium - Should be addressed after multi-language script support is implemented

**Dependencies**: Complete multi-language extension first to understand full requirements


## Next Development Items

**High Priority**:

1. **Enhanced Help and Discovery System**
   - Improve help functionality for app user functions (`usr/` methods)
   - Add list functions for APIs to enable discovery of available commands
   - Implement comprehensive help system across all SPL APIs
   - Ensure consistent help output format and discoverability

2. **Extend Script Execution with Working Directory Parameter** 
   - Add `cwd` argument to `spl/app/run` and `spl/app/wrap` 
   - Allow scripts to execute in custom working directories instead of always defaulting to `{appRoot}/scripts/`
   - Current behavior: Scripts always execute in `scripts/` directory
   - Proposed: Optional `cwd` parameter to specify alternate execution directory
   - Use case: Scripts that need to operate on files in different directories (e.g., `data/`, `output/`, project root)
   - Implementation: Add `cwd` action parameter, modify `child.spawn()` cwd option

3. **Subdirectory CLAUDE.md Prototype with Boot App**
   - Create `/spl/apps/boot/CLAUDE.md` as first federated guidance implementation
   - Design self-contained format optimized for AI-assisted development
   - Test discovery mechanism and override behavior
   - Establish patterns for component autonomy and repository evolution
   - See [Subdirectory CLAUDE.md Evolution Plan](./subdirectory-claude-md-plan.md) for full vision

**Pending Enhancements**:

## Standardized Path Resolution

**Current Issue**: Each API implements custom path resolution, creating inconsistency and maintenance burden.

**Proposed Solution**: Standardize on app data pattern with optional scope parameter.

**Target API Design**:
```javascript
// Default: All relative paths resolve to app data directory
spl.resolvePath(input, relativePath)  
// → {cwd}/{appRoot}/data/{relativePath}

// With scope parameter for special cases
spl.resolvePath(input, relativePath, scope)
// Scopes: 'app-data' (default), 'install-root', 'repository', 'working-dir'
```

**Implementation Steps**:
1. Add `spl.resolvePath(input, path, scope = 'app-data')` utility
2. Migrate tools/git and tools/7zip to use standard utility
3. Remove custom path resolution from auxiliary libraries
4. Update core SPL APIs to use app-data scope by default
5. Update documentation and testing patterns

## System Prerequisites Management

**Current Issue**: SPL APIs depend on external tools but lack prerequisite validation.

**Tools API Dependencies Discovered**:
- **tools/7zip**: Requires `7z` executable (p7zip-full package on Ubuntu/Debian)
- **tools/git**: Requires `git` executable
- **Future tools**: Will have similar external dependencies

**Proposed Solution**: Implement prerequisite checking system with helpful installation instructions in error messages.

## What have I learned?

*This section captures key insights and learnings from development sessions to inform future work.*

### Session 2025-06-15: Project Automation & Workflow Optimization

**Key Learning: Programmatic Project Management is Transformative**
- GitHub Projects v2 GraphQL API enables complete field automation
- Separating backlog creation from planning configuration is crucial for performance
- Decision-making intelligence belongs in field values, not views
- Single view with smart field population is more effective than multiple static views

**Workflow Design Insights:**
- **Backlog → Planning → Execution → Archive** creates optimal separation of concerns
- Lightweight issue creation enables fast idea capture without overhead
- Selective project import during planning sessions maintains focus and performance
- Version-based cleanup prevents project bloat while preserving decision context

**Technical Architecture Lessons:**
- GraphQL mutations for field updates scale better than CLI commands for bulk operations
- Decision Score algorithm (85/75/60 for analysis/infrastructure/implementation) provides clear priority ranking
- Epic + Version + Session Type + Context Switch Cost creates comprehensive decision matrix
- Time tracking integration with project state enables momentum-based recommendations

**Project Management Discoveries:**
- PRINCE2 "just enough planning" works excellently with programmatic automation
- Issues can exist in multiple states (backlog vs planned) with different configuration needs
- Cross-epic coordination benefits from visual project management with programmatic intelligence
- Immediate field population during import creates better planning session efficiency

**Future Applications:**
- Pattern applicable to any complex project requiring strategic coordination
- Automation reduces cognitive load while maintaining strategic visibility
- Version-focused workflow aligns well with iterative development approaches
- Integration with time tracking creates powerful context-switching optimization