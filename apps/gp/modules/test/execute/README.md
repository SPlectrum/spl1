# gp/test/execute  

## Purpose
Orchestrates test isolation: creates unique workspace → runs tests → cleanup with audit

## Pipeline
1. `gp/config/set-session-working-dir --path={unique-workspace}`
2. `gp/test/run` 
3. `gp/test/cleanup-workspace`

## Workspace Creation
```javascript
const testLib = require('gp_test');
const uniqueWorkspace = testLib.createUniqueWorkspace(baseDir);
// Creates: /path/to/apps/gp/data/test-{timestamp}-{uuid}
```

## Key Pattern
All tests run in isolated workspace, then cleaned up with asset audit trail stored in test results.