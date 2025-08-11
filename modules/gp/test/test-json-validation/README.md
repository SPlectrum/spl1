# gp/test/test-json-validation

Test runner that validates JSON schema files are syntactically correct.

## Purpose
Verifies that discovered JSON files (typically `*_arguments.json` schema files) contain valid JSON syntax and can be parsed without errors.

## Parameters
- Uses discovery data from workspace (no direct parameters)
- Operates on all discovered `*.json` files

## Behavior
1. Attempts to parse each discovered JSON file using `JSON.parse()`
2. Verifies parsed content is not null or undefined
3. Records successful validations and failures
4. Updates workspace with results for reporting

## Troubleshooting JSON Validation Failures

### Understanding Failure Output
When JSON validation tests fail, the failure list shows:
- **File Path**: Exact path to JSON file that failed validation
- **Error Message**: JSON parsing error details
- **Status**: 'FAIL' for validation errors

### Common Failure Patterns

#### JSON Syntax Errors
**Symptom**: `SyntaxError: Unexpected token` or `Unexpected end of JSON input`
**Root Cause**: Malformed JSON syntax

**Debug Commands**:
```bash
# Test JSON parsing directly
node -e "console.log(JSON.parse(require('fs').readFileSync('/path/to/failing.json', 'utf8')))"

# Validate JSON with better error messages
cat /path/to/failing.json | python -m json.tool

# Check file content
cat /path/to/failing.json
```

**Common JSON Syntax Issues**:
- Missing or extra commas
- Unclosed brackets `[]` or braces `{}`
- Unescaped quotes in string values
- Trailing commas (not allowed in JSON)
- Comments (not allowed in JSON)
- Single quotes instead of double quotes

**Example Fix**:
```json
// BAD - has trailing comma
{
  "name": "test",
  "type": "String",
}

// GOOD - no trailing comma
{
  "name": "test", 
  "type": "String"
}
```

#### Empty or Corrupted Files
**Symptom**: `Unexpected end of JSON input` or `null/undefined` content
**Root Cause**: File is empty, truncated, or corrupted

**Debug Commands**:
```bash
# Check file size and content
ls -la /path/to/failing.json
wc -l /path/to/failing.json
head -5 /path/to/failing.json
tail -5 /path/to/failing.json
```

**Resolution**:
- Restore file from backup if corrupted
- Add proper JSON content if empty
- Check file permissions and encoding

#### Encoding Issues
**Symptom**: `Unexpected token` with strange characters
**Root Cause**: File has incorrect text encoding (not UTF-8)

**Debug Commands**:
```bash
# Check file encoding
file /path/to/failing.json

# Check for BOM or special characters
hexdump -C /path/to/failing.json | head -3

# Convert to UTF-8 if needed
iconv -f ISO-8859-1 -t UTF-8 /path/to/failing.json > /path/to/fixed.json
```

#### SPL Argument Schema Issues
**Symptom**: JSON parses but doesn't match expected SPL argument schema structure
**Root Cause**: Incorrect schema format for SPL command arguments

**Expected SPL Argument Schema Structure**:
```json
{
    "headers": {
        "header": [
            { "header": "api/method/name" },
            { "content": "Method description." },
            { "content": "{bold syntax}: {italic ./spl api/method/name <options>}" }
        ]
    },
    "value": [
        { "name": "help", "alias": "h", "type": "Boolean", "description": "show help information", "typeLabel": "flag" },
        { "name": "param", "alias": "p", "type": "String", "description": "parameter description" }
    ]
}
```

**Common Schema Issues**:
- Missing required `headers` or `value` sections
- Incorrect array/object structure
- Missing required properties like `name`, `type`, `description`
- Invalid parameter types

### Debug Analysis Workflow

#### Step 1: Run with Debug Mode
```bash
spl_execute dev -d gp/test/test-json-validation
```

#### Step 2: Analyze Debug Output
Look for:
- Specific JSON parsing error messages
- File paths and line numbers where parsing fails
- Content excerpts showing problematic JSON

#### Step 3: Manual JSON Validation
For each failed JSON file:
```bash
# Test parsing with detailed error info
node -e "
try { 
  const content = require('fs').readFileSync('/failing/file.json', 'utf8');
  const parsed = JSON.parse(content);
  console.log('SUCCESS: JSON is valid');
  console.log('Content:', JSON.stringify(parsed, null, 2));
} catch(e) { 
  console.log('ERROR:', e.message);
  console.log('Line/Column:', e.message.match(/position (\d+)/)); 
}"
```

#### Step 4: Apply Targeted Fix
- **Syntax errors**: Fix JSON formatting using editor or formatter
- **Empty files**: Add proper JSON content structure
- **Encoding issues**: Convert to UTF-8 encoding
- **Schema issues**: Match expected SPL argument schema structure

#### Step 5: Validate Fix
Test JSON parsing directly:
```bash
# Quick validation
python -m json.tool < /path/to/fixed.json

# Or with Node.js
node -e "console.log('Valid JSON:', !!JSON.parse(require('fs').readFileSync('/path/to/fixed.json', 'utf8')))"
```

#### Step 6: Re-run Test Pipeline
```bash
spl_execute dev gp/test/discover @@ gp/test/plan @@ gp/test/run @@ gp/test/report
```

## Integration with Test Pipeline

JSON validation is the second validation layer:
1. **Discovery** finds JSON files  
2. **Instantiation** verifies modules can load
3. **JSON validation** checks schema files are valid ← **This method**
4. **Basic test execution** runs functional tests using validated schemas

Failed JSON validation prevents schemas from being used in command parsing and help generation.

## Expected Results Structure

Successful validation creates results like:
```javascript
{
  type: 'json-validation',
  filePath: '/path/to/schema_arguments.json',
  status: 'PASS', 
  message: 'JSON validation successful',
  duration: 8,
  timestamp: '2025-01-09T...'
}
```

Failed validation creates:
```javascript
{
  type: 'json-validation',
  filePath: '/path/to/schema_arguments.json', 
  status: 'FAIL',
  message: 'relative/path: Unexpected token } in JSON at position 156',
  duration: 5,
  timestamp: '2025-01-09T...'
}
```

---

*Method-level documentation for JSON validation test troubleshooting*