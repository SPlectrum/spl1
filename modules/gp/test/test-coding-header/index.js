//  name        Coding Standards - Header Validation
//  URI         gp/test/test-coding-header
//  type        API Method
//  description Validates that index.js files have proper SPL header format with required fields
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const test = require("gp_test_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Header Format Validation (Blanket Coverage: All)
exports.default = function gp_test_test_coding_header(input) {
    const testApiRecord = spl.wsRef(input, "gp/test");
    
    // Process all request records (blanket coverage: all)
    for (const requestKey in testApiRecord.value) {
        const requestRecord = testApiRecord.value[requestKey];
        const workPackages = requestRecord.value.plan?.workPackages || [];
        const keyResults = [];
        
        // Process all coding-standards work packages in this request
        for (const workPackage of workPackages) {
            if (workPackage.type === 'coding-standards' || workPackage.type === 'coding-header') {
                for (const filePath of workPackage.filePaths) {
                    const startTime = Date.now();
                    
                    // Read file content and validate header format (SPL happy path - no error handling)
                    const content = test.readFileSync(filePath);
                        
                        // Validate header format - inlined logic
                        const lines = content.split('\n');
                        
                        let isValid = true;
                        let failMatch = null;
                        
                        // Must have at least 5 lines for basic header
                        if (lines.length < 5) {
                            isValid = false;
                            failMatch = 'File too short for proper header';
                        } else {
                            // Check required header fields in first few lines
                            let hasName = false;
                            let hasURI = false;
                            let hasType = false;
                            let hasDescription = false;
                            let hasSeparator = false;
                            
                            for (let i = 0; i < Math.min(10, lines.length); i++) {
                                const line = lines[i].trim();
                                
                                // Check for required fields
                                if (line.startsWith('//  name        ')) {
                                    hasName = true;
                                } else if (line.startsWith('//  URI         ')) {
                                    hasURI = true;
                                } else if (line.startsWith('//  type        ')) {
                                    hasType = true;
                                } else if (line.startsWith('//  description ')) {
                                    hasDescription = true;
                                } else if (line === '///////////////////////////////////////////////////////////////////////////////') {
                                    hasSeparator = true;
                                    break; // Header section ended
                                }
                            }
                            
                            // All required fields must be present
                            if (!hasName) {
                                isValid = false;
                                failMatch = 'Missing //  name field in header';
                            } else if (!hasURI) {
                                isValid = false;
                                failMatch = 'Missing //  URI field in header';
                            } else if (!hasType) {
                                isValid = false;
                                failMatch = 'Missing //  type field in header';
                            } else if (!hasDescription) {
                                isValid = false;
                                failMatch = 'Missing //  description field in header';
                            } else if (!hasSeparator) {
                                isValid = false;
                                failMatch = 'Missing header separator line (///////////////////////////////////////////////////////////////////////////////)';
                            }
                        }
                        
                        if (isValid) {
                            keyResults.push({
                                type: 'coding-header',
                                filePath: filePath,
                                status: 'PASS',
                                message: `Header format valid`,
                                duration: Date.now() - startTime,
                                timestamp: new Date().toISOString()
                            });
                        } else {
                            keyResults.push({
                                type: 'coding-header',
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
            requestRecord.value.results['coding-header'] = {
                summary: {
                    total: keyResults.length,
                    passed: keyResults.filter(r => r.status === 'PASS').length,
                    failed: keyResults.filter(r => r.status === 'FAIL' || r.status === 'ERROR').length
                },
                results: keyResults
            };
        }
        
        // Update workflow to include test-coding-header
        requestRecord.headers.workflow = Array.from(new Set([...requestRecord.headers.workflow, 'test-coding-header']));
    }
    
    // Save updated record
    spl.wsSet(input, "gp/test", testApiRecord);
    
    spl.history(input, `test-coding-header: Completed header format validation`);
    spl.completed(input);
}

