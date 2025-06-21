# SESSION_END Workflow

## ⚠️ MANDATORY SESSION TERMINATION ⚠️

**MANDATORY SESSION TERMINATION**: When any Claude session ends, Claude MUST execute the following termination sequence to ensure proper workflow completion and session continuity.

**TRIGGER**: End of any Claude session or when user indicates session completion

**MANDATORY TERMINATION SEQUENCE:**

1. **COMPLETE OUTSTANDING TODOS**: Check TodoRead and mark any completed tasks as completed

2. **CAPTURE SESSION LEARNINGS**: Ask "What have I learned this session?" and document insights in appropriate files

3. **FINALIZE SESSION**: Complete all remaining session termination tasks

## SESSION COMPLETION CHECKLIST

### **1. Todo Management Cleanup**
- Review all todos created during session
- Mark completed tasks as completed status
- Update any in_progress tasks to appropriate status
- Clean up any unnecessary todo entries

### **2. Learning Documentation**
- Review session activities for key insights
- Document learnings in relevant docs/ files:
  - Technical insights → `docs/current-development-process.md`
  - Process improvements → workflow files
  - Architecture decisions → strategic documents
  - Development patterns → `docs/code-quality-patterns.md`

### **3. Work Status Assessment**
- Summarize key accomplishments from session
- Identify any issues created or closed
- Note any significant decisions or direction changes
- Highlight any blockers or next steps for future sessions

### **4. Git Operations**
- Execute GIT_WORKFLOW to handle all git operations with proper branching policy
- GIT_WORKFLOW will analyze timelog context to determine planned vs unplanned work
- Applies appropriate branching strategy (issue branches, unplanned branch, or direct commit)

### **5. Session Completion**
- Ensure all session work is properly documented
- Verify all todos are in appropriate status

## SESSION OUTCOME DOCUMENTATION

### **High-Value Sessions**
For sessions with significant outcomes, consider creating brief session summary:
- Major architectural decisions made
- Key documents created or updated
- Issues created with strategic importance
- Learnings that impact future development approach

### **Learning Capture Categories**
- **Technical Learnings**: Architecture, implementation patterns, tool usage
- **Process Learnings**: Workflow improvements, efficiency gains
- **Strategic Learnings**: Long-term vision insights, planning approaches
- **Tool Learnings**: Better ways to use development tools or AI capabilities

## INCOMPLETE WORKFLOW DETECTION

### **Session Start Workflow Check**
At the start of each session, Claude MUST:
1. Read the timelog to check the last entry
2. If last entry is `SESSION_END | session_end:` with no subsequent activities, previous session ended cleanly
3. If last entry shows incomplete SESSION_END (session_end logged but activities after), complete the missing steps:
   - Check TodoRead for incomplete todos from previous session
   - Mark appropriate todos as completed based on git history
   - Capture any obvious learnings from previous session's work
   - Stage and commit any uncommitted changes with session summary

### **Recovery Actions**
When detecting incomplete SESSION_END:
```
Previous session had incomplete SESSION_END workflow. Completing missing steps:
- [List specific recovery actions taken]
- Session continuity restored
```

## INTEGRATION WITH OTHER WORKFLOWS

### **Connection to SESSION_START**
- SESSION_END complements SESSION_START for complete session boundaries
- Time tracking bookends enable session duration analysis
- Learning capture builds on work accomplished since session start

### **Connection to PLANNED_VS_UNPLANNED**
- Review session work classification accuracy
- Document effectiveness of planning decisions
- Note any unplanned work that should have been planned

### **Connection to GIT_WORKFLOW**
- SESSION_END delegates all git operations to GIT_WORKFLOW
- Ensures consistent branching policy across all session terminations
- Maintains separation of concerns: session management vs git operations

### **Connection to GITHUB_WORKFLOW**
- Ensure any issues created during session are properly configured
- Check that issues have appropriate labels, milestones, and epic assignments
- Verify any PRs created have proper context and documentation

## SUCCESS METRICS

### **Session Effectiveness Indicators**
- Clear accomplishments documented in timelog
- Learning insights captured for future reference
- Outstanding work properly tracked in todos or issues
- Session boundaries clearly marked for analysis

### **Quality Indicators**
- All timelog entries properly formatted
- No orphaned todos or incomplete task tracking
- Relevant documentation updated with session insights
- Clear handoff state for future sessions

## ARCHIVAL CONSIDERATIONS

### **Long-term Session Data**
- Session patterns help identify productive workflows
- Learning accumulation guides platform evolution
- Time distribution analysis improves planning accuracy
- Session outcome tracking validates development approaches

### **Release Preparation**
- Before version releases, review accumulated session learnings
- Incorporate insights into release documentation
- Archive significant session outcomes with version history
- Use session data to improve development processes

---

*This workflow ensures systematic session termination that preserves knowledge, maintains data integrity, and enables continuous improvement of development processes.*