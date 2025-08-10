# gp/test/test-basic-test

Test runner that executes functional tests with real SPL command execution and assertion validation.

## Purpose
Executes comprehensive functional tests by running actual SPL commands and validating results using JSON selector-based assertions with template variable expansion.

## Parameters
- Uses discovery data from workspace (no direct parameters)
- Operates on all discovered `basic-test__*.json` test definition files

## Behavior
1. Loads test definition files containing test commands and expectations
2. Executes SPL commands via `spl_execute` in isolated session directories
3. Parses JSON responses and extracts values using JSONPath selectors
4. Validates extracted values against expectations with template expansion
5. Records detailed execution results including failures

## Troubleshooting Basic Test Failures

### Understanding Failure Output
When basic test execution fails, the failure list shows:
- **Test Filename**: Name of the failing test file
- **Executed Command**: The exact SPL command that was executed
- **Error Details**: Multi-line failure information including specific assertion failures
- **Status**: 'FAIL' for assertion failures, 'ERROR' for execution failures

### Test Definition Structure
Basic test files use this JSON structure:
```json
{
    "key": "basic-test__api_method__description",
    "name": "Descriptive test name",
    "command": "api/method/command --param=value",
    "selectors": {
        "status": "$.headers.spl.execute.status",
        "errorMessage": "$.headers.spl.execute.error.message",
        "appRoot": "$.headers.spl.execute.appRoot"
    },
    "expect": [
        {
            "key": "status",
            "operation": "equals", 
            "expectation": "completed"
        }
    ]
}
```

### Common Failure Patterns

#### Command Execution Errors
**Symptom**: Test shows ERROR status with execution failure message
**Root Cause**: SPL command fails to execute or returns error status

**Debug Commands**:
```bash
# Run the exact failing command with debug mode
spl_execute dev -d [exact-command-from-failure]

# Example from failure output:
# Test: basic-test__gp_fs_write__first-test.json
# Command: gp/fs/write --file=test.txt --content="test"
spl_execute dev -d gp/fs/write --file=test.txt --content="test"
```

**Analysis Steps**:
1. **Check command syntax**: Verify parameter names and values match API expectations
2. **Review debug output**: Look for module loading errors, parameter parsing issues
3. **Verify session isolation**: Ensure test runs in clean isolated directory
4. **Check dependencies**: Confirm required modules and context are available

**Common Command Issues**:
- Incorrect parameter names (check API argument schema)
- Missing required parameters  
- Invalid parameter values or types
- Module instantiation failures (see test-instantiation troubleshooting)
- Session working directory problems

#### JSON Response Parsing Errors
**Symptom**: "No JSON found in command output" or JSON parsing failures
**Root Cause**: SPL command doesn't return expected JSON response format

**Debug Analysis**:
```bash
# Capture full command output 
spl_execute dev [command] > /tmp/full-output.txt 2>&1
cat /tmp/full-output.txt

# Look for JSON at end of output
tail -10 /tmp/full-output.txt
```

**Expected SPL Response Format**:
SPL commands should return JSON response after any text output:
```
[Optional text output lines]
{"headers":{"spl":{"execute":{"status":"completed",...}}},"value":{...}}
```

**Common Issues**:
- Command produces only text output without JSON
- JSON response malformed or incomplete
- Multiple JSON responses (test expects single response)
- Command exits with error before producing JSON

#### Selector Extraction Failures
**Symptom**: "Expected [key] to equal [value], but got undefined"
**Root Cause**: JSONPath selectors don't match actual response structure

**Debug Commands**:
```bash
# Extract and examine JSON response structure
spl_execute dev [command] | tail -1 | python -m json.tool

# Test specific selectors manually
node -e "
const jp = require('jsonpath');
const response = [paste-json-response];
console.log('status:', jp.query(response, '$.headers.spl.execute.status'));
console.log('appRoot:', jp.query(response, '$.headers.spl.execute.appRoot'));
"
```

**Selector Troubleshooting**:
1. **Verify JSON structure**: Check if response has expected nested properties
2. **Test selectors individually**: Use JSONPath tools to verify selector syntax
3. **Check for array vs single values**: JSONPath returns arrays, test expects single values
4. **Validate property names**: Ensure property names match exactly (case-sensitive)

#### Expectation Assertion Failures  
**Symptom**: "Expected [key] to equal [value], but got [actual-value]"
**Root Cause**: Test expectations don't match actual command behavior

**Debug Analysis Process**:
1. **Run command manually** and examine actual output
2. **Compare expected vs actual values** - are expectations correct?
3. **Check template expansion** - are variables like `{appRoot}` expanding correctly?
4. **Review test logic** - does the test accurately represent desired behavior?

**Template Variable Expansion**:
Tests support template variables in expectations:
```json
{
    "key": "history", 
    "operation": "contains",
    "expectation": "Successfully wrote {appRoot}/data/test.txt"
}
```
Variables expanded: `{appRoot}` → actual appRoot value from response

#### Session Isolation Problems
**Symptom**: Tests interfere with each other or fail inconsistently
**Root Cause**: Session working directory not properly isolated

**Debug Commands**:
```bash
# Check if session isolation is working
spl_execute dev -d gp/config/set-session-working-dir --path=/tmp/test-isolation
spl_execute dev -d gp/fs/write --file=test.txt --content=test
ls /tmp/test-isolation/  # Should contain test.txt
```

**Isolation Issues**:
- Session directories not created or cleaned up properly
- Tests writing to shared locations instead of session directories
- File permissions or access issues in session directories

### Debug Analysis Workflow

#### Step 1: Identify Failing Test
From failure output, note:
- Test filename: `basic-test__api_method__description.json`
- Executed command: `api/method --param=value`  
- Failure type: ERROR (execution) vs FAIL (assertion)

#### Step 2: Run Command with Debug Mode
```bash
# Execute exact failing command with full debug
spl_execute dev -d [exact-command-from-failure-output]
```

#### Step 3: Analyze Debug Output
Look for:
- **Module loading**: Are required modules found and loaded?
- **Parameter parsing**: Are parameters correctly extracted from command?
- **Execution flow**: Does command execute through to completion?
- **JSON response**: Is valid JSON response generated?
- **Error details**: Any error messages or stack traces?

#### Step 4: Manual Response Testing
```bash
# Capture and examine JSON response  
spl_execute dev [command] | tail -1 > /tmp/response.json
python -m json.tool < /tmp/response.json

# Test selectors against actual response
node -e "
const jp = require('jsonpath');
const response = JSON.parse(require('fs').readFileSync('/tmp/response.json'));
console.log('Available properties:', Object.keys(response.headers.spl.execute));
"
```

#### Step 5: Update Test or Fix Implementation
Based on analysis:
- **Fix command implementation** if execution errors found
- **Update test selectors** if response structure differs from expectations
- **Correct test expectations** if they don't match intended behavior
- **Fix session isolation** if workspace issues identified

#### Step 6: Verify Fix
```bash
# Re-run specific test type to verify fix
spl_execute dev gp/test/discover --modules=[target-api] @@ gp/test/plan --type=basic-test @@ gp/test/run @@ gp/test/report
```

## Integration with Test Pipeline

Basic test execution is the final and most comprehensive validation:
1. **Discovery** finds test files
2. **Instantiation** verifies modules load
3. **JSON validation** checks schemas are valid  
4. **Basic test execution** runs full functional tests ← **This method**

This method provides the highest confidence in API functionality by executing real commands with assertion validation.

## Expected Results Structure

Successful test creates results like:
```javascript
{
  type: 'basic-test',
  testFile: '/path/to/basic-test__api_method__test.json',
  testName: 'basic-test__api_method__test.json', 
  status: 'PASS',
  message: 'Test passed',
  executedCommand: 'api/method --param=value',
  duration: 234,
  timestamp: '2025-01-09T...',
  selectorResults: { status: 'completed', errorMessage: null },
  expectResults: { status: { actual: 'completed', expected: 'completed', passed: true } }
}
```

Failed test creates:
```javascript
{
  type: 'basic-test',
  testFile: '/path/to/basic-test__api_method__test.json',
  testName: 'basic-test__api_method__test.json',
  status: 'FAIL', 
  message: 'basic-test__api_method__test.json\napi/method --param=value\nExpected status to equal "completed", but got "error"\n',
  executedCommand: 'api/method --param=value',
  duration: 156,
  timestamp: '2025-01-09T...'
}
```

---

*Method-level documentation for basic test execution troubleshooting*