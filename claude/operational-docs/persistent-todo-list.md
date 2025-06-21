# Repository Todo List

## Current Topics for Discussion


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

### Repository Organization and Documentation Review  
- **Priority: High**
- **Context**: After creating claude/ directory structure, need comprehensive documentation organization review
- **Completed Items**:
  - ✅ **Status folder docs**: Moved to claude/operational-docs/ - were Claude operational guidance
  - ✅ **Docs folder structure**: Created 10 subfolders and moved all files appropriately
  - ✅ **README.md links**: Updated all documentation links to reflect new subfolder structure
  - ✅ **Claude operational section**: Added dedicated Claude documentation section to README.md
- **Implementation Strategy**: See `claude/operational-docs/docs-organization-strategy.md` for complete approach
- **Remaining Tasks**:
  - Implement getting-started section with progressive learning paths and concise content
- **Status**: Structure complete, ready for getting-started content creation

---

*This file maintains persistent todo items and discussion topics across development sessions.*