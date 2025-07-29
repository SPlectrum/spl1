---
type: feature
github_id: 64
title: "Create bare version of command-line-usage dependency"
state: "open"
milestone: "v1.0.0"
labels: "["enhancement","BARE"]"
priority: medium
estimated_effort: TBD
github_updated_at: "2025-07-10T14:57:32Z"
local_updated_at: "2025-07-29T14:00:08.858Z"
---

# Create bare version of command-line-usage dependency

Problem Statement
## Objective
Create a minimal bare module version of the command-line-usage dependency for SPlectrum's vendored dependency strategy.

## Scope
Convert the command-line-usage external NPM dependency to a bare module in `vendor/deps/splectrum-usage/` with only the functionality used by SPlectrum help systems.

## Current Usage Analysis
**Locations**: 
- `modules/spl/command/help.js:9`
- `modules/spl/app/help.js:8`

**Usage Pattern**:
```javascript
const help = require("command-line-usage");
// Usage: console.log(help(helpData))
```

**Features Used**:
- Help text generation from structured data arrays
- Basic formatting (headers, options, content sections)
- Console output formatting
- Template processing for help sections
- Option list formatting

## Implementation Tasks
- [ ] Analyze command-line-usage source for used features
- [ ] Create minimal implementation in `vendor/deps/splectrum-usage/`
- [ ] Implement core help text generation functionality
- [ ] Add structured data processing (headers, options, content)
- [ ] Add console output formatting
- [ ] Create comprehensive test suite
- [ ] Update SPlectrum imports to use bare module
- [ ] Performance benchmark vs. original

## Bare Module Structure
```
vendor/deps/splectrum-usage/
├── index.js              # Main help generation function
├── formatters.js         # Text formatting utilities
├── template-engine.js    # Basic template processing
├── package.json          # Minimal package definition
├── test/                 # Comprehensive test suite
└── README.md            # Usage documentation
```

## Features to Remove from Original
- Complex styling options
- Advanced formatting features
- Color/ANSI support (if not used)
- Complex template engines
- Markdown processing (if not used)
- Unicode/emoji support (if not used)

**Estimated Size Reduction**: ~60% from full library

## API Compatibility Requirements
Must maintain exact compatibility with current SPlectrum usage:
```javascript
// Current usage that must continue working
const help = require('../../vendor/deps/splectrum-usage');
console.log(help(helpData));
```

## Help Data Structure Analysis
Based on SPlectrum usage, the help data structure includes:
- Header sections with title and content
- Option lists with name, description, type information
- Sub-lists for package/API/method hierarchies
- Top and bottom sections for overall formatting

## Security and Maintenance
- [ ] Security audit of minimal implementation
- [ ] Upstream monitoring setup for original library
- [ ] Automated CVE scanning integration
- [ ] Documentation for security update process

## Dependencies
- Requires Node.js dependency audit (issue #18) completion
- Part of bare modules migration coordination (issue #62)
- Parallel to command-line-args bare module (issue #63)

## Acceptance Criteria
- [ ] Bare module created with minimal functionality
- [ ] All current SPlectrum help usage works without changes
- [ ] Comprehensive test coverage for used features
- [ ] Performance equal or better than original
- [ ] Security review completed
- [ ] Documentation for maintenance workflow

## Related Issues
- Parent: #62 (Switch to bare modules coordination)
- Parallel: #63 (Create bare command-line-args module)
- Grandparent: #19 (BARE minimal dependency architecture)

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