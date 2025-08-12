//  name        Coding Standards - Error Handling Validation
//  URI         gp/test/test-coding-errors
//  type        API Method
//  description Validates that index.js files follow SPL error handling: no try/catch blocks, no manual error setting
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const test = require("gp_test_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Error Handling Pattern Validation (Blanket Coverage: All)
exports.default = function gp_test_test_coding_errors(input) {
    const testApiRecord = spl.wsRef(input, "gp/test");
    
    // Process all request records (blanket coverage: all)
    for (const requestKey in testApiRecord.value) {
        const requestRecord = testApiRecord.value[requestKey];
        const workPackages = requestRecord.value.plan?.workPackages || [];
        const keyResults = [];
        
        // Process coding-standards and coding-errors work packages in this request
        for (const workPackage of workPackages) {
            if (workPackage.type === 'coding-standards' || workPackage.type === 'coding-errors') {
                for (const filePath of workPackage.filePaths) {
                    const startTime = Date.now();
                    
                    // Read file content and validate error handling patterns (SPL happy path - no error handling)
                    const content = test.readFileSync(filePath);
                    const lines = content.split('\n');
                    let isValid = true;
                    let failMatch = '';
                    
                    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
                        const line = lines[lineIndex];
                        const trimmed = line.trim();
                        
                        // Skip comments and empty lines
                        if (trimmed.startsWith('//') || trimmed.length === 0) continue;
                        
                        // Invalid: try/catch blocks (only at start of line)
                        if (trimmed.startsWith('try {') || (trimmed.startsWith('try') && trimmed.includes('{'))) {
                            isValid = false;
                            failMatch = `Line ${lineIndex+1}: ${trimmed}`;
                            break;
                        }
                        
                        if (trimmed.startsWith('} catch') || trimmed.startsWith('catch')) {
                            isValid = false;
                            failMatch = `Line ${lineIndex+1}: ${trimmed}`;
                            break;
                        }
                        
                        // Invalid: manual error setting with spl.rcSet (actual usage, not validation)
                        if (trimmed.includes('spl.rcSet(') && !trimmed.includes('//')) {
                            isValid = false;
                            failMatch = `Line ${lineIndex+1}: ${trimmed}`;
                            break;
                        }
                        
                        // Invalid: throw statements (actual throws at start of line)
                        if (trimmed.startsWith('throw ')) {
                            isValid = false;
                            failMatch = `Line ${lineIndex+1}: ${trimmed}`;
                            break;
                        }
                        
                        // Invalid: Error constructors (actual usage)
                        if (trimmed.includes('new Error(') && !trimmed.includes('//')) {
                            isValid = false;
                            failMatch = `Line ${lineIndex+1}: ${trimmed}`;
                            break;
                        }
                    }
                    
                    if (isValid) {
                        keyResults.push({
                            type: 'coding-errors',
                            filePath: filePath,
                            status: 'PASS',
                            message: `Error handling patterns valid`,
                            duration: Date.now() - startTime,
                            timestamp: new Date().toISOString()
                        });
                    } else {
                        keyResults.push({
                            type: 'coding-errors',
                            filePath: filePath,
                            status: 'FAIL',
                            message: filePath.replace(spl.context(input, "cwd") + '/', ''),
                            failMatch: failMatch,
                            duration: Date.now() - startTime,
                            timestamp: new Date().toISOString()
                        });
                    }
                }
            }
        }
        
        // Store results in the request record under 'results'
        if (keyResults.length > 0) {
            if (!requestRecord.value.results) {
                requestRecord.value.results = {};
            }
            requestRecord.value.results['coding-errors'] = {
                summary: {
                    total: keyResults.length,
                    passed: keyResults.filter(r => r.status === 'PASS').length,
                    failed: keyResults.filter(r => r.status === 'FAIL' || r.status === 'ERROR').length
                },
                results: keyResults
            };
        }
        
        // Update workflow to include test-coding-errors
        requestRecord.headers.workflow = Array.from(new Set([...requestRecord.headers.workflow, 'test-coding-errors']));
    }
    
    // Save updated record
    spl.wsSet(input, "gp/test", testApiRecord);
    
    spl.history(input, `test-coding-errors: Completed error handling validation`);
    spl.completed(input);
}

