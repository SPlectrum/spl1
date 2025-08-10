//  name        Coding Standards - Error Handling Validation
//  URI         gp/test/test-coding-errors
//  type        API Method
//  description Validates that index.js files follow SPL error handling: no try/catch blocks, no manual error setting
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const test = require("gp_test");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Error Handling Pattern Validation (Blanket Coverage: All)
exports.default = function gp_test_test_coding_errors(input) {
    const testApiRecord = spl.wsRef(input, "gp/test");
    
    // Process all request records (blanket coverage: all)
    for (const requestKey in testApiRecord.value) {
        const requestRecord = testApiRecord.value[requestKey];
        const workPackages = requestRecord.value.plan?.workPackages || [];
        const keyResults = [];
        
        // Process all coding-standards work packages in this request
        for (const workPackage of workPackages) {
            if (workPackage.type === 'coding-standards') {
                for (const filePath of workPackage.filePaths) {
                    const startTime = Date.now();
                    
                    try {
                        // Read file content using auxiliary function
                        const content = test.readFileSync(filePath);
                        
                        // Validate error handling patterns
                        const errorValidation = validateErrorHandling(content);
                        
                        if (errorValidation.isValid) {
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
                                duration: Date.now() - startTime,
                                timestamp: new Date().toISOString()
                            });
                        }
                        
                    } catch (error) {
                        keyResults.push({
                            type: 'coding-errors',
                            filePath: filePath,
                            status: 'FAIL',
                            message: filePath.replace(spl.context(input, "cwd") + '/', ''),
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

// Validate error handling patterns in file content
function validateErrorHandling(content) {
    const lines = content.split('\n');
    
    for (const line of lines) {
        const trimmed = line.trim();
        
        // Skip comments and empty lines
        if (trimmed.startsWith('//') || trimmed.length === 0) continue;
        
        // Invalid: try/catch blocks
        if (trimmed.includes('try') && trimmed.includes('{')) {
            return { isValid: false, reason: 'try/catch blocks not allowed in SPL API methods' };
        }
        
        if (trimmed.includes('catch') && trimmed.includes('(')) {
            return { isValid: false, reason: 'try/catch blocks not allowed in SPL API methods' };
        }
        
        // Invalid: manual error setting with spl.rcSet
        if (trimmed.includes('spl.rcSet') && !trimmed.includes('//')) {
            return { isValid: false, reason: 'Manual error setting with spl.rcSet not allowed' };
        }
        
        // Invalid: throw statements (SPL handles errors automatically)
        if (trimmed.startsWith('throw ') || trimmed.includes(' throw ')) {
            return { isValid: false, reason: 'throw statements not allowed in SPL API methods' };
        }
        
        // Invalid: Error constructors
        if (trimmed.includes('new Error(') && !trimmed.includes('//')) {
            return { isValid: false, reason: 'Manual error construction not allowed in SPL API methods' };
        }
    }
    
    return { isValid: true };
}