//  name        Coding Standards - Default Value Fallbacks Validation  
//  URI         gp/test/test-coding-defaults
//  type        API Method
//  description Validates no default value fallbacks on spl.action calls: prevents spl.action(input, "param") || "default" patterns
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const test = require("gp_test_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Default Value Fallbacks Validation (Blanket Coverage: All)
exports.default = function gp_test_test_coding_defaults(input) {
    // TEMPORARY VIOLATION FOR TESTING - This should be detected
    const testPattern = spl.action(input, 'testPattern') || '*';
    const testApiRecord = spl.wsRef(input, "gp/test");
    
    // Process all request records (blanket coverage: all)
    for (const requestKey in testApiRecord.value) {
        const requestRecord = testApiRecord.value[requestKey];
        const workPackages = requestRecord.value.plan?.workPackages || [];
        const keyResults = [];
        
        // Process all coding-standards work packages in this request
        for (const workPackage of workPackages) {
            if (workPackage.type === 'coding-standards' || workPackage.type === 'coding-defaults') {
                for (const filePath of workPackage.filePaths) {
                    const startTime = Date.now();
                    
                    // Read file content using auxiliary function
                    const content = test.readFileSync(filePath);
                    
                    // Validate default value patterns inline
                    const lines = content.split('\n');
                    let isValid = true;
                    let failMatch = '';
                    
                    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
                        const line = lines[lineIndex];
                        const trimmed = line.trim();
                        
                        // Skip comments and empty lines
                        if (trimmed.startsWith('//') || trimmed.length === 0) continue;
                        
                        // Check for spl.action calls with default value fallbacks
                        if (trimmed.includes('spl.action(') && !trimmed.includes('//')) {
                            // Check for spl.action calls with || fallbacks
                            const splActionMatch = trimmed.match(/spl\.action\s*\([^)]+\)\s*\|\|\s*(.+)/);
                            if (splActionMatch && trimmed.includes('input,')) {
                                const fallbackValue = splActionMatch[1].trim();
                                
                                // Allow legitimate patterns: || [] and || {}
                                if (fallbackValue === '[];' || fallbackValue === '[]' || 
                                    fallbackValue === '{};' || fallbackValue === '{}') {
                                    // These are allowed - arrays and objects are legitimate defaults
                                    continue;
                                }
                                
                                // All other fallback patterns are violations
                                isValid = false;
                                failMatch = `Line ${lineIndex+1}: ${trimmed}`;
                                break;
                            }
                        }
                    }
                    
                    if (isValid) {
                        keyResults.push({
                            type: 'coding-defaults',
                            filePath: filePath,
                            status: 'PASS',
                            message: `No unwanted default value fallbacks found`,
                            duration: Date.now() - startTime,
                            timestamp: new Date().toISOString()
                        });
                    } else {
                        keyResults.push({
                            type: 'coding-defaults',
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
            requestRecord.value.results['coding-defaults'] = {
                summary: {
                    total: keyResults.length,
                    passed: keyResults.filter(r => r.status === 'PASS').length,
                    failed: keyResults.filter(r => r.status === 'FAIL' || r.status === 'ERROR').length
                },
                results: keyResults
            };
        }
        
        // Update workflow to include test-coding-defaults
        requestRecord.headers.workflow = Array.from(new Set([...requestRecord.headers.workflow, 'test-coding-defaults']));
    }
    
    // Save updated record
    spl.wsSet(input, "gp/test", testApiRecord);
    
    spl.history(input, `test-coding-defaults: Completed default value fallback validation`);
    spl.completed(input);
}