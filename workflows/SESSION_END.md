# SESSION_END Workflow

## ⚠️ CRITICAL: SESSION TERMINATION ACTIONS ⚠️

**TRIGGER**: End of any Claude session or when user indicates session completion

**SESSION TERMINATION SEQUENCE:**

1. **COMPLETE OUTSTANDING TODOS**: Check TodoRead and mark any completed tasks as completed

2. **CAPTURE SESSION LEARNINGS**: Ask "What have I learned this session?" and document insights in appropriate files

3. **LOG SESSION END**: Use Edit tool to append session_end entry to `/logs/timelog.txt` as FINAL activity:
   ```
   ##→YYYY-MM-DDTHH:MM:SSZ | session_end |
   ```

## SESSION COMPLETION CHECKLIST

### **1. Todo Management Cleanup**
- Review all todos created during session
- Mark completed tasks as completed status
- Update any in_progress tasks to appropriate status
- Clean up any unnecessary todo entries

### **2. Learning Documentation**
- Review session activities for key insights
- Document learnings in relevant docs/ files:
  - Technical insights → `docs/future-development.md`
  - Process improvements → workflow files
  - Architecture decisions → strategic documents
  - Development patterns → `docs/code-quality-patterns.md`

### **3. Work Status Assessment**
- Summarize key accomplishments from session
- Identify any issues created or closed
- Note any significant decisions or direction changes
- Highlight any blockers or next steps for future sessions

### **4. Git Operations**
- Stage all modified files from session
- Create commit with session summary
- Push changes to remote repository

### **5. Time Tracking Finalization (LAST STEP)**
- Ensure all session activities are properly logged
- Verify all time entries have proper format and context
- Add final session_end entry as last timelog action

## CRITICAL FORMAT RULES

- **SESSION_END IS ALWAYS LAST ENTRY** in timelog for any session
- **ALWAYS use Edit tool** for timelog session_end entry
- **ALWAYS use UTC timestamps** with Z suffix
- **Empty context field** for session_end entries (trailing `|` with no content)
- **Follow exact format**: `    ##→TIMESTAMP | session_end |`

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

## INTEGRATION WITH OTHER WORKFLOWS

### **Connection to SESSION_START**
- SESSION_END complements SESSION_START for complete session boundaries
- Time tracking bookends enable session duration analysis
- Learning capture builds on work accomplished since session start

### **Connection to PLANNED_VS_UNPLANNED**
- Review session work classification accuracy
- Document effectiveness of planning decisions
- Note any unplanned work that should have been planned

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