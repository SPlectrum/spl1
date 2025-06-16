# KEYWORD_REGISTRY

This file maintains the complete registry of uppercase workflow trigger keywords used in the CLAUDE.md system.

## Custom Workflow Keywords

| Keyword | File | Purpose | Trigger Context |
|---------|------|---------|-----------------|
| **SESSION_START** | `SESSION_START.md` | Time tracking & session initiation | Every new Claude session |
| **SESSION_END** | `SESSION_END.md` | Session termination & learning capture | End of Claude session |
| **GITHUB_WORKFLOW** | `GITHUB_WORKFLOW.md` | Project management & issue lifecycle | GitHub operations, project planning |
| **GIT_WORKFLOW** | `GIT_WORKFLOW.md` | Branching, commits, releases | Git operations, version releases |
| **OPERATIONAL_RULES** | `OPERATIONAL_RULES.md` | Development rules framework | Development decisions, coding standards |
| **ESSENTIAL_COMMANDS** | `ESSENTIAL_COMMANDS.md` | Core SPL execution commands | SPL platform operations |
| **RELEASE_PROCESS** | `RELEASE_PROCESS.md` | GitHub release creation | Creating platform releases |
| **PLANNED_VS_UNPLANNED** | `PLANNED_VS_UNPLANNED.md` | Work classification strategy | Deciding whether to create issues |

## Built-in Claude Code Keywords

These represent my automatic behaviors and built-in workflows:

| Keyword | Built-in Behavior | Trigger Context |
|---------|------------------|-----------------|
| **TODO_MANAGEMENT** | Automatic TodoWrite/TodoRead usage for task tracking | Complex multi-step tasks, planning |
| **TOOL_SELECTION** | Strategic tool choice (Task vs Read/Grep/Glob) | Codebase exploration vs specific file access |
| **SEARCH_STRATEGY** | Parallel search operations, context-aware searching | Finding files, functions, or patterns |
| **ERROR_HANDLING** | Retry logic, fallback strategies, error analysis | Tool failures, unexpected results |
| **CONCURRENCY** | Batch multiple tool calls in single response | Information gathering, parallel operations |
| **CODE_ANALYSIS** | Read-first approach, pattern recognition, convention following | Understanding codebases, making changes |
| **COMMIT_WORKFLOW** | git status + diff + log before commits, staging all files | Git operations, pre-commit checks |
| **RESPONSE_CONCISENESS** | Minimize output tokens, direct answers | All communication |

## Epic-Specific Keywords (Future)

Reserved for epic-specific workflows when needed:

| Epic | Potential Keywords | Status |
|------|-------------------|--------|
| **RR** | REPOSITORY_RESTRUCTURE | Not yet created |
| **SE** | SPECTRUM_ENGINES | Not yet created |
| **CAE** | CORE_API_ENHANCEMENT | Not yet created |
| **TDD** | TEST_DRIVEN_DEVELOPMENT | Not yet created |
| **BARE** | BARE_MIGRATION | Not yet created |
| **NFD** | NEW_FUNCTIONALITY | Not yet created |
| **AVRO** | AVRO_INTEGRATION | Not yet created |

## Context-Specific Keywords (Future)

Potential additional workflow triggers:

| Context | Potential Keywords | Purpose |
|---------|-------------------|---------|
| Debugging | DEBUG_WORKFLOW | Systematic debugging approach |
| Testing | TESTING_WORKFLOW | Test creation and execution |
| Documentation | DOCS_WORKFLOW | Documentation standards |
| Learning | LEARNING_CAPTURE | End-of-session learning documentation |

## Registry Maintenance Rules

1. **Add new keywords here FIRST** before creating workflow files
2. **Update this registry** when modifying existing workflows
3. **Check for conflicts** - ensure keywords are unique and clear
4. **Follow naming convention**: NOUN_VERB or CONTEXT_ACTION format
5. **Keep alphabetical order** within each section for easy scanning

## Usage Pattern

```markdown
**KEYWORD_NAME** → See [workflows/FILENAME.md](./workflows/FILENAME.md)
```

Example:
```markdown
**SESSION_START** → See [workflows/SESSION_START.md](./workflows/SESSION_START.md)
```