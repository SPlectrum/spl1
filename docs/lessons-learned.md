# Lessons Learned

This document captures key learnings from development sessions to improve future workflows and avoid repeated mistakes.

## Time Tracking & Session Management

### UTC Timestamps for Consistency (2025-06-15)
**Context**: Working across timezones with time logging system  
**Learning**: Always use UTC timestamps with Z suffix (e.g., `2025-06-15T16:26:04Z`) for time tracking  
**Impact**: Prevents timezone-related data corruption and ensures consistent analysis  
**Implementation**: Updated CLAUDE.md operational rules with UTC requirement  
**Command**: `date -u +"%Y-%m-%dT%H:%M:%SZ"` for consistent timestamps  

## Documentation Standards

### Setup Documentation Importance (2025-06-15)
**Context**: Complex GitHub Project setup with multiple steps  
**Learning**: Complex technical setups require comprehensive "how to recreate" documentation  
**Impact**: Without documentation, recreating setups requires rediscovering all steps and debugging  
**Best Practice**: Document the "why" and "how" including exact commands, IDs, and troubleshooting  
**Example**: `docs/github-project-setup.md` enables complete project recreation  

## Authentication & API Management

### Scope Management for GitHub CLI (2025-06-15)
**Context**: GitHub Projects v2 integration  
**Learning**: Different GitHub features require specific authentication scopes  
**Impact**: Missing scopes cause mysterious authentication failures  
**Best Practice**: Check required scopes before starting complex integrations  
**Common Scopes**: `repo`, `project`, `read:project`, `read:org`, `workflow`  
**Command**: `gh auth status` to verify current scopes  

## Workflow Design

### Planning Hub vs Execution Tools (2025-06-15)
**Context**: GitHub Issues vs GitHub Projects workflow design  
**Learning**: Separate planning tools from execution tools for better flexibility  
**Impact**: Enables "create first, plan later" vs "must plan during creation" workflows  
**Pattern**: 
- **Issues** = Execution tracking (concrete work items)
- **Projects** = Planning hub (dynamic organization, epic visibility)
- **Milestones** = Development readiness marker (not primary organization tool)

## Tool Integration

### API Limitations vs CLI Tools (2025-06-15)
**Context**: GitHub CLI vs GraphQL API capabilities  
**Learning**: CLI tools often provide subset of full API functionality  
**Impact**: Advanced features require direct API usage with more complex syntax  
**Best Practice**: Start with CLI, escalate to API for advanced features  
**Example**: GitHub CLI can't create custom project fields; GraphQL API required  

---

## Learning Rule

As stated in CLAUDE.md: "At regular intervals, ask 'What have I learned?' and update documentation in appropriate docs/ files."

**Update Pattern**: Add learnings with date, context, impact, and actionable best practices.