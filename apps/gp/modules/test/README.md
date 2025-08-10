# gp/test - Universal Testing Framework

API-level batch orchestrator providing quality gates and systematic API validation with pipeline support.

## Usage Modes

### API Configuration Mode
```bash
./spl_execute dev gp/test
```
Basic configuration mode for API setup and method instantiation.

### Batch Orchestration Mode  
```bash
./spl_execute dev gp/test --batch='[{"method":"discover","params":{"modules":"gp/config"}},{"method":"plan","params":{}},{"method":"run","params":{}}]'
```
Processes JSON arrays of test operations through dynamic pipeline generation.

## Batch Operations
The framework supports batch execution of test operations:
- `discover` → Asset discovery with module patterns
- `plan` → Work package creation from discovered assets  
- `run` → Test execution in isolated workspaces
- `report` → Result formatting and output
- `full-run` → Complete pipeline orchestration

## Test Types & Failure Handling

### Test Type Overview
1. **Instantiation Tests**: Verify modules can be required and export proper SPL patterns
2. **JSON Validation Tests**: Verify JSON schema files are syntactically valid
3. **Basic Tests**: Execute functional tests with real SPL commands and assertions

### When Tests Fail - Quick Troubleshooting Reference

#### Instantiation Test Failures
- **Failure Info**: File path of module that failed to instantiate
- **Common Issues**: Wrong require paths, missing .default exports, syntax errors
- **Debug Approach**: `spl_execute dev -d gp/test/test-instantiation`
- **Detailed Guide**: [test-instantiation/README.md](test-instantiation/README.md#troubleshooting-instantiation-failures)

#### JSON Validation Failures
- **Failure Info**: File path of invalid JSON file
- **Common Issues**: JSON syntax errors, encoding problems, malformed schemas
- **Debug Approach**: `python -m json.tool < failing-file.json`
- **Detailed Guide**: [test-json-validation/README.md](test-json-validation/README.md#troubleshooting-json-validation-failures)

#### Basic Test Execution Failures
- **Failure Info**: Test filename + executed command that failed
- **Common Issues**: Command execution errors, assertion failures, selector problems
- **Debug Approach**: `spl_execute dev -d [exact-failing-command]`
- **Detailed Guide**: [test-basic-test/README.md](test-basic-test/README.md#troubleshooting-basic-test-failures)

### General Debug Workflow
1. **Identify failure type** from test report output
2. **Note specific failing file/command** from failure details
3. **Run failing command with debug mode**: `spl_execute dev -d [command]`
4. **Analyze debug audit output** for root cause
5. **Apply targeted fix** based on failure type
6. **Re-run pipeline** to verify fix

## Key Implementation Files
- `test.js` - Core auxiliary functions for test execution
- `run/` - Executes work packages using test.js functions
- `test-instantiation/` - Module loading validation
- `test-json-validation/` - JSON schema validation  
- `test-basic-test/` - Functional test execution

## Test Context Structure
```javascript
testContext = {
    appDataRoot: "apps/gp/data/test-timestamp-uuid",
    cwd: "/home/herma/splectrum/spl1/spl-dev", 
    executionHistory: []
}
```