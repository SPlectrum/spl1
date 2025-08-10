//  name        Coding Standards - History Logging Validation
//  URI         gp/test/test-coding-history
//  type        API Method
//  description Validates that index.js files include proper spl.history calls for progress logging
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const test = require("gp_test");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - History Logging Pattern Validation (Blanket Coverage: All)
exports.default = function gp_test_test_coding_history(input) {
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
                        
                        // Validate history logging patterns
                        const historyValidation = validateHistoryLogging(content);
                        
                        if (historyValidation.isValid) {
                            keyResults.push({
                                type: 'coding-history',
                                filePath: filePath,
                                status: 'PASS',
                                message: `History logging patterns valid`,
                                duration: Date.now() - startTime,
                                timestamp: new Date().toISOString()
                            });
                        } else {
                            keyResults.push({
                                type: 'coding-history',
                                filePath: filePath,
                                status: 'FAIL',
                                message: filePath.replace(spl.context(input, "cwd") + '/', ''),
                                duration: Date.now() - startTime,
                                timestamp: new Date().toISOString()
                            });
                        }
                        
                    } catch (error) {
                        keyResults.push({
                            type: 'coding-history',
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
            requestRecord.value.results['coding-history'] = {
                summary: {
                    total: keyResults.length,
                    passed: keyResults.filter(r => r.status === 'PASS').length,
                    failed: keyResults.filter(r => r.status === 'FAIL' || r.status === 'ERROR').length
                },
                results: keyResults
            };
        }
        
        // Update workflow to include test-coding-history
        requestRecord.headers.workflow = Array.from(new Set([...requestRecord.headers.workflow, 'test-coding-history']));
    }
    
    // Save updated record
    spl.wsSet(input, "gp/test", testApiRecord);
    
    spl.history(input, `test-coding-history: Completed history logging validation`);
    spl.completed(input);
}

// Validate history logging patterns in file content
function validateHistoryLogging(content) {
    const lines = content.split('\n');
    
    let hasExportsDefault = false;
    let splHistoryCount = 0;
    
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
    
    // Count spl.history calls with input parameter
    for (const line of lines) {
        const trimmed = line.trim();
        
        // Skip comments and empty lines
        if (trimmed.startsWith('//') || trimmed.length === 0) continue;
        
        // Check for spl.history call with input parameter and meaningful message
        if (trimmed.includes('spl.history(') && trimmed.includes('input') && !trimmed.includes('//')) {
            splHistoryCount++;
        }
    }
    
    if (splHistoryCount === 0) {
        return { isValid: false, reason: 'Missing spl.history(input, message) call for progress logging' };
    }
    
    if (splHistoryCount > 1) {
        return { isValid: false, reason: `Multiple spl.history calls found (${splHistoryCount}). Only one spl.history call allowed per method` };
    }
    
    return { isValid: true };
}