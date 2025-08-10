//  name        Coding Standards - Completion Validation
//  URI         gp/test/test-coding-complete
//  type        API Method
//  description Validates that index.js files properly call spl.completed(input) at the end
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const test = require("gp_test");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Completion Pattern Validation (Blanket Coverage: All)
exports.default = function gp_test_test_coding_complete(input) {
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
                        
                        // Validate completion patterns
                        const completeValidation = validateCompletionPattern(content);
                        
                        if (completeValidation.isValid) {
                            keyResults.push({
                                type: 'coding-complete',
                                filePath: filePath,
                                status: 'PASS',
                                message: `Completion patterns valid`,
                                duration: Date.now() - startTime,
                                timestamp: new Date().toISOString()
                            });
                        } else {
                            keyResults.push({
                                type: 'coding-complete',
                                filePath: filePath,
                                status: 'FAIL',
                                message: filePath.replace(spl.context(input, "cwd") + '/', ''),
                                duration: Date.now() - startTime,
                                timestamp: new Date().toISOString()
                            });
                        }
                        
                    } catch (error) {
                        keyResults.push({
                            type: 'coding-complete',
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
            requestRecord.value.results['coding-complete'] = {
                summary: {
                    total: keyResults.length,
                    passed: keyResults.filter(r => r.status === 'PASS').length,
                    failed: keyResults.filter(r => r.status === 'FAIL' || r.status === 'ERROR').length
                },
                results: keyResults
            };
        }
        
        // Update workflow to include test-coding-complete
        requestRecord.headers.workflow = Array.from(new Set([...requestRecord.headers.workflow, 'test-coding-complete']));
    }
    
    // Save updated record
    spl.wsSet(input, "gp/test", testApiRecord);
    
    spl.history(input, `test-coding-complete: Completed completion pattern validation`);
    spl.completed(input);
}

// Validate completion patterns in file content
function validateCompletionPattern(content) {
    const lines = content.split('\n');
    
    let hasSplCompleted = false;
    let hasExportsDefault = false;
    
    // Check for exports.default function to ensure this is an API method
    for (const line of lines) {
        const trimmed = line.trim();
        
        if (trimmed.includes('exports.default') && trimmed.includes('function')) {
            hasExportsDefault = true;
            break;
        }
    }
    
    // Only validate API methods (files with exports.default function)
    if (!hasExportsDefault) {
        return { isValid: true }; // Skip validation for non-API files
    }
    
    // Look for spl.completed(input) call
    for (const line of lines) {
        const trimmed = line.trim();
        
        // Skip comments and empty lines
        if (trimmed.startsWith('//') || trimmed.length === 0) continue;
        
        // Check for spl.completed call with input parameter
        if (trimmed.includes('spl.completed(') && trimmed.includes('input') && !trimmed.includes('//')) {
            hasSplCompleted = true;
            break;
        }
    }
    
    if (!hasSplCompleted) {
        return { isValid: false, reason: 'Missing spl.completed(input) call' };
    }
    
    return { isValid: true };
}