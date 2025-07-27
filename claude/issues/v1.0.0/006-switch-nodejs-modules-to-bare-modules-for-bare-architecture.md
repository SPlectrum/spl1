---
type: feature
github_id: 62
title: "Switch Node.js modules to bare modules for BARE architecture"
state: "open"
milestone: "v1.0.0"
labels: "["enhancement","BARE"]"
priority: medium
estimated_effort: TBD
github_updated_at: "2025-07-10T14:57:35Z"
local_updated_at: "2025-07-27T19:34:13.460Z"
---

# Switch Node.js modules to bare modules for BARE architecture

Problem Statement
## Objective
Coordinate the migration of Node.js dependencies to bare modules as part of BARE minimal dependency architecture implementation.

## Scope
Parent coordination issue for converting SPlectrum's minimal external dependencies to vendored bare modules for Holepunch Pear distribution.

## Migration Tasks
- [ ] Create bare version of command-line-args dependency (Issue #63)
- [ ] Create bare version of command-line-usage dependency (Issue #64)
- [ ] Update SPlectrum modules to use bare dependencies
- [ ] Implement dependency maintenance automation
- [ ] Test bare module compatibility and performance
- [ ] Document bare module usage patterns

## Audit Results Summary
**Corrected Finding**: **2 external NPM dependencies** across entire SPlectrum codebase:
- `command-line-args` - Used in `modules/spl/command/command.js` for argument parsing
- `command-line-usage` - Used in `modules/spl/command/help.js` and `modules/spl/app/help.js` for help generation
- Built-in Node.js modules (crypto, child_process, path, fs) - Keep as-is
- Extensive internal module system - No changes required

## Implementation Strategy
1. **Minimal Vendoring**: Create `vendor/deps/splectrum-args/` and `vendor/deps/splectrum-usage/`
2. **API Compatibility**: Maintain exact compatibility with current usage
3. **Security Control**: Full control over updates and security patches
4. **Pear Optimization**: Self-contained for peer-to-peer distribution

## Benefits for Pear Distribution
- Complete offline functionality (no npm/package manager requirements)
- Deterministic builds across all peers
- Minimal attack surface (only 2 dependencies to audit)
- No dependency resolution failures

## Dependencies
- Requires Node.js dependency audit (issue #18) completion
- Enables container strategy (#59) and JavaScript vendor strategy (#60)

## Acceptance Criteria
- [ ] All external dependencies converted to bare modules
- [ ] SPlectrum modules updated to use bare dependencies
- [ ] Dependency maintenance automation implemented
- [ ] Comprehensive testing of bare module functionality
- [ ] Documentation for bare module development workflow

## Related Issues
- Parent: #19 (BARE minimal dependency architecture)
- Child: #63 (Create bare command-line-args module)
- Child: #64 (Create bare command-line-usage module)
- Relates to: #59 (Container strategy), #60 (JavaScript vendor strategy)

## Original GitHub Context
What problem does this solve? What user need or business requirement drives this feature?

## Required Work
How will we solve it? High-level approach and key components.

## Work Plan
Technical details, API designs, database changes, step-by-step approach.

## Acceptance Criteria
- [ ] Criterion 1: Specific, testable outcome
- [ ] Criterion 2: Another measurable success condition
- [ ] Criterion 3: Documentation updated

## Technical Considerations
- Architecture decisions
- Dependencies on other features
- Performance implications
- Security considerations

## GitHub Discussion Summary
Key insights from GitHub comments (curated manually)

## Progress Log
- Date: Status update