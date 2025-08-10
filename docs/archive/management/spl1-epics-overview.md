# spl1 Repository Epics Overview

## Purpose

This document defines the seven major epics (blocks of work) for the spl1 transitional repository. Each epic represents a significant area of development that will be broken into milestone phases and individual GitHub issues.

**Epic Prefixes**: RR, SE, CAE, TDD, BARE, NFD, AVRO for milestone identification (e.g., RR-1, CAE-1)

## Epic 1: Repository Restructure (RR)

**Status**: Well-defined and documented

**Reference**: See [Federated Monorepo Design](./federated-monorepo-design.md) for complete details.

**Summary**: Reorganize the current monorepo into single-concern folders (core/, apps/, tools/, docs/) transitioning to container-wrapped git repositories. This creates a container-native federated architecture where each logical component is distributed as a containerized git repository through the container registry.

## Epic 2: SPlectrum Engines (SE)

**Status**: Detailed definition in progress

**Goal**: Create and manage SPlectrum Engines - deployable installs that power functionality outside the repository for development and repository management tasks.

**Core Problem**: Development currently happens within the repository's ignored `spl/` directory, which creates workflow limitations and potential conflicts.

**Solution Components**:

1. **Install Creation & Management**
   - Commands to create external SPlectrum installs
   - Multiple install management (different purposes/configurations)  
   - Install lifecycle management (create, update, remove)

2. **Workflow Integration**
   - Easy switching between installs for different tasks
   - Integration with existing spl_execute patterns
   - Seamless development experience

3. **Quality Requirements**
   - Considerable amount of functionality needed
   - High test coverage requirement
   - Quality gates for reliability

**Use Cases**:
   - Development work isolation
   - Repository management tasks
   - Testing different configurations
   - Parallel workstream isolation

4. **Rule Adherence Automation**
   - Develop scripts that automatically adhere to multiple operational rules
   - Reduce cognitive load on AI development by encoding best practices
   - Enable consistent workflow execution across all development activities

**Automation Examples**:
   - **Issue Management**: Single script handles creation + milestone assignment + labeling + time log updates
   - **Session Management**: Automated session start/end with proper directory setup + time tracking + git status
   - **Workflow Compliance**: Multi-rule enforcement through single command execution
   - **Quality Gates**: Automated pre-commit validation combining multiple rule checks

**Benefits**:
   - **Consistency**: Encode MUST/SHOULD rules into reusable automation
   - **Efficiency**: Reduce multi-step workflows to single commands  
   - **Reliability**: Eliminate manual rule adherence errors
   - **Scalability**: Add new rules to existing automation scripts

**Design Status**: Still needs considerable thinking and design work before implementation phases can be defined. Rule adherence automation represents a key workflow improvement opportunity that aligns with external install capabilities.

## Epic 3: Core API Enhancement (CAE)

**Status**: Detailed definition complete

**Goal**: Refactor and enhance core APIs for better design, single-concern separation, and improved functionality.

**Key Refactoring Components**:

1. **spl/app API Split**
   - **Problem**: Current spl/app has mixed concerns
   - **Solution**: Split into two single-concern APIs
   - **Outcome**: Better separation of responsibilities

2. **Data Layer Consolidation**
   - **Problem**: spl/data and spl/blob are separate but related
   - **Solution**: Merge into single unified data layer API
   - **Outcome**: Coherent data management interface

3. **Execution API Enhancement**
   - **Problem**: Insufficient error handling and output control
   - **Solution**: Enhance with:
     - Better error packaging for TDD workflow integration
     - Improved output switches and controls
     - Enhanced audit capabilities
   - **Outcome**: Better error handling and debugging capabilities

4. **Package API Enhancement**
   - **Problem**: Currently independent of data layer
   - **Solution**: Redesign to sit on top of unified data layer
   - **Outcome**: Proper architectural layering

**Integration Points**:
- Error packaging connects to TDD Implementation epic
- Unified data layer provides foundation for Package API
- All enhancements support Migration to Bare epic

**Design Status**: Well-defined scope, ready for milestone phase breakdown.

## Epic 4: TDD Implementation (TDD)

**Status**: Detailed definition complete

**Goal**: Design and implement a development TDD workflow starting from requirements, with comprehensive test suite design and bug resolution workflow.

**Key Components**:

1. **TDD Workflow Design**
   - **Scope**: Complete development workflow starting from requirements
   - **Flow**: Requirements → Tests → Implementation → Refactor
   - **Integration**: Seamless workflow for developers and AI

2. **Test Suite Architecture**
   - **Task**: Identify the types of test suites required
   - **Scope**: Comprehensive test coverage strategy (unit, integration, functional, regression)
   - **Environment Validation**: Automated testing of development setup to reduce session startup time

3. **Bug Resolution Workflow**
   - **Scope**: Design and set up systematic bug resolution process
   - **Integration**: Connect with error packaging from Epic 3 (Execution API Enhancement)
   - **Flow**: Bug report → Test case → Fix → Validation
   - **GitHub Integration**: TDD workflow integration with issue-per-branch strategy

4. **Autonomous AI Development Support**
   - **Self-Validating**: Test suites that provide clear pass/fail feedback
   - **Automated Generation**: AI-friendly test case creation capabilities
   - **Error Reporting**: Clear feedback loops for autonomous development

5. **CI/CD Integration**
   - **GitHub Actions**: Automated testing and quality gates
   - **Pre-commit Hooks**: Quality validation before code integration
   - **Continuous Validation**: Ongoing test execution and reporting

**Integration Points**:
- **Epic 3**: Receives enhanced error packaging from Execution API
- **Epic 2**: May use external installs for testing isolation
- **All Epics**: Provides quality assurance framework across all development

**Design Status**: Well-defined scope, ready for milestone phase breakdown.

## Epic 5: Migration to Bare (BARE)

**Status**: Detailed definition complete

**Goal**: Migrate platform from Node.js dependencies to minimal, pure API design for better portability, with optional standalone executable creation.

**Part 1: Code Base Migration**
- **Scope**: Migrate entire codebase away from Node.js dependencies
- **Components**:
  - Use existing bare modules where available
  - Create bare modules from Node.js modules (focus on command-line tools)
  - Ensure pure JavaScript/minimal dependency implementation
  - Maintain functionality while removing Node.js-specific features

**Part 2: Standalone Executable Creation**
- **Goal**: Maximum portability through standalone executables
- **Scope**: Create standalone exe for as many tools as possible
- **Benefit**: True platform independence and simplified deployment
- **Challenge**: Tool-specific implementation requirements

**Integration Points**:
- **Epic 3**: Benefits from enhanced APIs and cleaner architecture
- **Epic 4**: Bare modules need comprehensive test coverage
- **All Epics**: Improved portability supports all development workflows

**Design Status**: Well-defined scope with clear two-part approach, ready for milestone phase breakdown.

## Epic 6: New Functionality Development (NFD)

**Status**: Framework defined, requirements will emerge during implementation

**Goal**: Develop new APIs, applications, and tools required to support other epic implementations and expand platform capabilities.

**Scope Categories**:

1. **Epic-Supporting Functionality**
   - New commands/APIs needed for External Install Workflow (Epic 2)
   - Testing APIs or test management applications for TDD Implementation (Epic 4)
   - Tools and utilities for Core API Enhancement (Epic 3)
   - Conversion tools and bare modules for Migration to Bare (Epic 5)

2. **Platform Expansion**
   - New APIs identified through gap analysis during other epic work
   - New applications for improved workflow support
   - Development and deployment utilities
   - Integration tools for enhanced productivity

3. **Emergent Requirements**
   - Functionality discovered during implementation of other epics
   - Cross-cutting tools that benefit multiple epics
   - Performance or usability improvements identified through usage

**Characteristics**:
- **Reactive**: Responds to needs identified during other epic implementation
- **Emergent**: Requirements develop as we learn from working on other epics  
- **Cross-cutting**: Could support multiple other epics simultaneously
- **Flexible**: Adapts to discovered needs rather than pre-planned scope

**Integration Points**:
- **All Epics**: Provides supporting functionality for any epic that requires new capabilities
- **Phase-Based Planning**: New functionality requests become phases/issues within this epic

**Design Status**: Framework established, specific requirements will be identified and planned as other epics progress.

## Epic 7: AVRO Integration (AVRO)

**Status**: Detailed definition complete

**Goal**: Implement comprehensive AVRO schema integration for data schemas and schema-based message communication channels.

**Key Components**:

1. **Data Schema Implementation**
   - **Scope**: Design and implement AVRO schemas for core platform data structures
   - **Integration**: Schema-driven data validation and serialization
   - **Benefits**: Type safety, data evolution support, cross-platform compatibility

2. **Schema-Based Communication Channels**
   - **Scope**: Implement communication channels using AVRO schema-based messages
   - **Applications**: Inter-process communication, API messaging, data exchange
   - **Benefits**: Structured communication, version compatibility, protocol efficiency

3. **Schema Evolution and Management**
   - **Scope**: Support for schema versioning and backward/forward compatibility
   - **Tools**: Schema registry, validation utilities, migration tools
   - **Benefits**: Long-term maintainability and platform evolution

4. **Integration with Existing Systems**
   - **Scope**: Integrate AVRO schemas with existing spl/data layer and APIs
   - **Migration**: Gradual transition from current data handling to schema-driven approach
   - **Compatibility**: Maintain existing functionality during transition

**Integration Points**:
- **Epic 3**: Enhanced data layer benefits from AVRO schema integration
- **Epic 4**: AVRO implementation needs comprehensive test coverage
- **Epic 5**: Schema-based approach supports migration to bare modules
- **Epic 6**: May require new tools and utilities for schema management

**Design Status**: Well-defined scope focusing on both data schemas and communication channels, ready for milestone phase breakdown.

## Epic Interaction Overview

**Dependencies**:
- Repository Restructure serves as foundation for all other epics
- External Install Workflow benefits from clean repository organization
- Core API Enhancement and Migration to Bare may inform each other
- TDD Implementation provides quality assurance across all epics
- New Functionality Development supports all other epics as needed
- AVRO Integration provides schema foundation for data handling across platform

**Parallel Work Potential**:
- Multiple epics can have phases worked in parallel once dependencies are satisfied
- Phase-based development allows for efficient cross-epic coordination
- New Functionality Development can run continuously alongside other epics

## Next Steps

1. Break each epic into milestone phases using phase-based development strategy
2. Create GitHub milestones and issues for implementation
3. Begin coordinated implementation following PRINCE2 "just enough planning" principles
4. Capture emergent requirements in Epic 6 as other epics progress

## Success Criteria

Each epic will have specific success criteria defined during detailed planning. Overall success means spl1 is ready for transition to federated repository architecture with enhanced capabilities for autonomous AI development.