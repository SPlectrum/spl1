# gp/test - Test Framework

## Quick Usage
```bash
spl_execute dev gp/test/discover --modules=gp/fs/write @@ gp/test/plan @@ gp/test/execute @@ gp/test/report
```

## Pipeline
- `discover` → finds test assets (modules, test files, schemas)
- `plan` → creates work packages (instantiation, json-validation, basic-test-execution)  
- `execute` → runs tests in isolated workspace + cleanup
- `report` → outputs results

## Key Files
- `test.js` - core functions (8 exports, all used)
- `run/` - executes work packages using test.js functions
- `execute/` - orchestrates isolation (workspace creation/cleanup)

## Test Context
```javascript
testContext = {
    appDataRoot: "apps/gp/data/test-timestamp-uuid",
    cwd: "/home/herma/splectrum/spl1/spl-dev", 
    executionHistory: []
}
```