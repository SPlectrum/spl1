---
title: Research and Design Automation Architecture: MD-Backed Commands to Event-Driven Choreography
type: feature
target: claude-swift
---

# Research and Design Automation Architecture: MD-Backed Commands to Event-Driven Choreography

## Problem Statement
Current architecture uses collaborative workflows (`claude/wow`) with sesame triggers for human-AI interaction. Need to research and design evolution path toward automation while preserving collaborative capabilities. Claude Code's markdown-backed commands may provide ideal bridge architecture between interactive collaboration and event-driven automation.

## Required Work
Research Claude Code's markdown-backed command system and design architectural evolution from current collaborative workflows to full automation, using commands as bridge layer.

## Work Plan

### Phase 1: Research Claude Code Command System
- Deep dive into `.claude/commands/` capabilities
- Document command composition patterns (commands calling other commands)
- Investigate non-interactive mode integration
- Test command parameterization and error handling

### Phase 2: Design Hybrid Architecture
- Define clear separation: `.claude/commands/` (automation) vs `claude/wow/` (collaborative)
- Design migration patterns from workflows to commands
- Create bridge patterns for complex operations
- Specify automation interfaces and event integration points

### Phase 3: Prototype and Validate
- Create proof-of-concept command implementations
- Test command composition and orchestration
- Validate non-interactive execution patterns
- Document migration strategy

## Acceptance Criteria
- [ ] Comprehensive research document on Claude Code MD-backed commands
- [ ] Architectural design showing evolution path: Interactive → Automated → Choreographed
- [ ] Proof-of-concept implementations demonstrating hybrid approach
- [ ] Migration strategy with concrete steps and examples
- [ ] Interface specification for automation boundaries

## Technical Considerations

### Architectural Options Analysis

#### Current: Workflow Files with Trigger Words
**Advantages:**
- Documentation-driven: Workflows are documented, trackable, version-controlled
- Context-aware: Claude reads workflow documentation before execution
- Flexible orchestration: Can chain workflows and handle complex logic
- Audit trail: Built-in logging and session management
- Project-specific: Workflows customized per repository

#### Option: Claude Code Built-in Commands
**Advantages:**
- Native integration: Direct CLI commands with built-in help
- Consistent UX: Standard command structure across Claude Code users
- Performance: Faster execution without documentation reading
- Discoverability: Users see available commands with `/help`

#### Recommended: MD-Backed Commands (Hybrid)
**Key Benefits:**
- Command composition: Commands can call other commands
- Documentation embedded: Commands include their own documentation
- Version controlled: Commands stored in repository
- Parameterizable: Support arguments and context
- Bridge capability: Can delegate to existing workflow scripts

### Evolution Strategy: Three-Phase Approach

#### Phase 1: Current State (Interactive Collaboration)
```
Human: "start sesame"
Claude: [reads docs, executes workflow with human oversight]
```
Use case: Complex problem-solving, planning, exploratory work

#### Phase 2: Automation Bridge (Structured Commands)
```
Human/System: "/start-session --milestone=v0.8.0"
Claude: [executes parameterized workflow, structured output]
```
Use case: Routine operations, CI/CD integration, scheduled tasks

#### Phase 3: Event-Driven Choreography (Full Automation)
```
Git Hook → Claude Code --non-interactive "/auto-commit --context=pr-review"
Schedule → Claude Code --non-interactive "/daily-maintenance"
Webhook → Claude Code --non-interactive "/release --version=patch"
```
Use case: Continuous maintenance, automated releases, monitoring

### Domain Separation Design

#### `.claude/commands/` - Automation Interface
- Purpose: Machine-readable, parameterized, predictable
- Audience: CI/CD, scripts, event systems, non-interactive Claude Code
- Style: Structured inputs/outputs, error codes, idempotent

#### `claude/wow/` - Collaborative Intelligence
- Purpose: Human-readable, collaborative, adaptive
- Audience: Humans + Claude in interactive mode
- Style: Natural language, decision trees, contextual reasoning

### Research Focus Areas
1. Command System Capabilities: Parameter handling, composition, error management
2. Non-Interactive Integration: Event triggering, return codes, logging
3. Migration Patterns: From workflows to commands, maintaining functionality
4. Bridge Architecture: Commands delegating to workflow scripts
5. Automation Choreography: Event-driven command orchestration

## GitHub Discussion Summary
This task originated from architectural discussion about evolution from collaborative workflows to automation. Key insight: MD-backed commands provide ideal bridge between human collaboration and machine automation, enabling gradual migration while preserving collaborative intelligence.

## Progress Log
- 2025-07-31: Task created from architectural discussion - research phase initiated