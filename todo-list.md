# Repository Todo List

## Current Topics for Discussion

### Workflow Magic Word Rule Enhancement
- **Priority: High**
- **Context**: Need to establish MUST rule for Claude to read workflow documentation when magic words are recognized
- **Discussion Points**:
  - Define mandatory workflow file reading requirement when sesame triggers detected
  - Ensure Claude always has complete workflow context before execution
  - Prevent workflow execution without proper documentation reference
  - Consider performance implications and caching strategies
- **Next Steps**:
  - Define specific MUST rule language and enforcement mechanism
  - Update CLAUDE.md with workflow reading requirements
  - Consider integration with existing workflow accountability system
- **Status**: Identified during session end workflow discussion

### New Version Initial Activities
- **Priority: High**
- **Context**: Systematic activities needed when starting work on a new version after release completion
- **Initial Activities Identified**:
  - Review archived time and learnings logs from previous version
  - Review existing documentation for implementation gaps or updates needed
  - Create new GitHub Project for version work organization
  - Additional activities to be defined based on version type and scope
- **Next Steps**:
  - Document complete new version startup workflow
  - Define activities specific to implementation vs planning releases
  - Create systematic checklist for version transition activities
- **Status**: Identified during v0.6.1 → v0.6.2 transition

### TDD Rules and Testing Strategy Discussion
- **Priority: High**
- **Context**: Need to establish clear TDD approach rules and testing execution guidelines for development workflow
- **Discussion Points**:
  - Define what tests are required for different types of work (features, bug fixes, refactoring)
  - Establish test execution workflow and integration points
  - Document TDD cycle integration with existing workflows
  - Clarify testing tool requirements and setup procedures
- **Next Steps**:
  - Review current testing documentation in `docs/testing-frameworks.md`
  - Define mandatory TDD workflow rules and test requirements
  - Establish test execution commands and verification procedures
  - Integrate TDD rules with existing workflow documentation
- **Status**: Identified as critical workflow gap requiring immediate attention

### AVRO Queue-Folder Service Implementation
- **Priority: Medium**
- **Context**: Documented queue-folder AVRO service design for pipe-like message processing
- **Next Steps**: 
  - Create GitHub issue for queue-folder service framework prototype
  - Integrate with existing AVRO roadmap (issue #30)
  - Consider implementation priority relative to BARE migration
- **Documentation**: `docs/avro-queue-folder-service-design.md`

### ✅ COMPLETED: Strengthen Step-by-Step Work Workflow
- **Status**: DONE - Critical Step-by-Step Execution Rule added to CLAUDE.md
- **Achievement**: Implemented mandatory single-step completion with choice points

---

*This file maintains persistent todo items and discussion topics across development sessions.*