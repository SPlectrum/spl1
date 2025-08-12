//  name        Coding Standards - History Logging Validation
//  URI         gp/test/test-coding-history
//  type        API Method
//  description Validates that index.js files include proper spl.history calls for progress logging
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const test = require("gp_test_lib");
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
            if (workPackage.type === 'coding-standards' || workPackage.type === 'coding-history') {
                for (const filePath of workPackage.filePaths) {
                    const startTime = Date.now();
                    
                    // Read file content and validate history patterns (SPL happy path - no error handling)
                    const content = test.readFileSync(filePath);
                        
                        // Validate history logging patterns inline
                        const lines = content.split('\n');
                        let hasExportsDefault = false;
                        let splHistoryCount = 0;
                        let isValid = true;
                        let failMatch = '';
                        
                        // Check for exports.default function to ensure this is an API method
                        for (const line of lines) {
                            const trimmed = line.trim();
                            if (trimmed.includes('exports.default') && trimmed.includes('function')) {
                                hasExportsDefault = true;
                                break;
                            }
                        }
                        
                        // Only validate API methods (files with exports.default function)
                        if (hasExportsDefault) {
                            // Count spl.history calls with input parameter
                            for (const line of lines) {
                                const trimmed = line.trim();
                                
                                // Skip comments and empty lines
                                if (trimmed.startsWith('//') || trimmed.length === 0) continue;
                                
                                // Check for spl.history call with input parameter and meaningful message (only at start of line)
                                if (trimmed.startsWith('spl.history(') && trimmed.includes('input') && !trimmed.includes('//')) {
                                    splHistoryCount++;
                                }
                            }
                            
                            if (splHistoryCount === 0) {
                                isValid = false;
                                failMatch = 'Missing spl.history(input, message) call for progress logging';
                            } else if (splHistoryCount > 1) {
                                isValid = false;
                                failMatch = `Multiple spl.history calls found (${splHistoryCount}). Only one spl.history call allowed per method`;
                            }
                        }
                        
                        if (isValid) {
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