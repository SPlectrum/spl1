//  name        Coding Standards - Arguments Validation  
//  URI         gp/test/test-coding-args
//  type        API Method
//  description Validates that spl.action calls include parameter names: spl.action(input, "param") not spl.action(input)
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const test = require("gp_test_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Arguments Pattern Validation (Blanket Coverage: All)
exports.default = function gp_test_test_coding_args(input) {
    const testApiRecord = spl.wsRef(input, "gp/test");
    
    // Process all request records (blanket coverage: all)
    for (const requestKey in testApiRecord.value) {
        const requestRecord = testApiRecord.value[requestKey];
        const workPackages = requestRecord.value.plan?.workPackages || [];
        const keyResults = [];
        
        // Process all coding-standards work packages in this request
        for (const workPackage of workPackages) {
            if (workPackage.type === 'coding-standards' || workPackage.type === 'coding-args') {
                for (const filePath of workPackage.filePaths) {
                    const startTime = Date.now();
                    
                    // Read file content using auxiliary function
                    const content = test.readFileSync(filePath);
                    
                    // Validate argument patterns inline
                    const lines = content.split('\n');
                    let isValid = true;
                    let failMatch = '';
                    
                    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
                        const line = lines[lineIndex];
                        const trimmed = line.trim();
                        
                        // Skip comments and empty lines
                        if (trimmed.startsWith('//') || trimmed.length === 0) continue;
                        
                        // Check for spl.action calls without proper parameter specification
                        if (trimmed.includes('spl.action(') && !trimmed.includes('//')) {
                            // Invalid: spl.action(input) without second parameter
                            if (trimmed.match(/spl\.action\s*\(\s*input\s*\)/)) {
                                isValid = false;
                                failMatch = `Line ${lineIndex+1}: ${trimmed}`;
                                break;
                            }
                            
                            // Invalid: spl.action(input,) with empty second parameter
                            if (trimmed.match(/spl\.action\s*\(\s*input\s*,\s*\)/)) {
                                isValid = false;
                                failMatch = `Line ${lineIndex+1}: ${trimmed}`;
                                break;
                            }
                        }
                    }
                    
                    if (isValid) {
                        keyResults.push({
                            type: 'coding-args',
                            filePath: filePath,
                            status: 'PASS',
                            message: `Argument patterns valid`,
                            duration: Date.now() - startTime,
                            timestamp: new Date().toISOString()
                        });
                    } else {
                        keyResults.push({
                            type: 'coding-args',
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
            requestRecord.value.results['coding-args'] = {
                summary: {
                    total: keyResults.length,
                    passed: keyResults.filter(r => r.status === 'PASS').length,
                    failed: keyResults.filter(r => r.status === 'FAIL' || r.status === 'ERROR').length
                },
                results: keyResults
            };
        }
        
        // Update workflow to include test-coding-args
        requestRecord.headers.workflow = Array.from(new Set([...requestRecord.headers.workflow, 'test-coding-args']));
    }
    
    // Save updated record
    spl.wsSet(input, "gp/test", testApiRecord);
    
    spl.history(input, `test-coding-args: Completed argument pattern validation`);
    spl.completed(input);
}

