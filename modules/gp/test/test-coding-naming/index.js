//  name        Coding Standards - Naming Convention Validation
//  URI         gp/test/test-coding-naming
//  type        API Method
//  description Validates that index.js files follow SPL naming conventions for function names and URI paths
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const test = require("gp_test_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Naming Convention Validation (Blanket Coverage: All)
exports.default = function gp_test_test_coding_naming(input) {
    const testApiRecord = spl.wsRef(input, "gp/test");
    
    // Process all request records (blanket coverage: all)
    for (const requestKey in testApiRecord.value) {
        const requestRecord = testApiRecord.value[requestKey];
        const workPackages = requestRecord.value.plan?.workPackages || [];
        const keyResults = [];
        
        // Process all coding-standards work packages in this request
        for (const workPackage of workPackages) {
            if (workPackage.type === 'coding-standards' || workPackage.type === 'coding-naming') {
                for (const filePath of workPackage.filePaths) {
                    const startTime = Date.now();
                    
                    // Read file content and validate naming patterns (SPL happy path - no error handling)
                    const content = test.readFileSync(filePath);
                    
                    // Validate naming conventions
                    const lines = content.split('\n');
                    
                    // Extract expected function name from file path (resolve real path to handle symlinks)
                        // e.g., apps/gp/modules/config/set-working-dir/index.js -> gp_config_set_working_dir
                        const realFilePath = test.resolveRealPath(filePath);
                        const pathParts = realFilePath.split('/');
                        const appIndex = pathParts.findIndex(part => part === 'apps') + 1;
                        const modulesIndex = pathParts.findIndex(part => part === 'modules');
                        
                        let namingValidation = { isValid: true };
                        
                        if (appIndex !== 0 && modulesIndex !== -1) {
                            const appName = pathParts[appIndex]; // e.g., "gp"
                            
                            // For app paths, skip 'modules' - reconstruct method call path
                            // apps/gp/modules/config/clear-session-working-dir/index.js -> gp/config/clear-session-working-dir
                            const pathSegments = pathParts.slice(modulesIndex + 1, -1); // everything after modules, before index.js
                            const expectedFunctionName = `${appName}_${pathSegments.join('_').replace(/-/g, '_')}`;
                            
                            // Extract URI from header and function name from exports
                            let headerURI = '';
                            let actualFunctionName = '';
                            
                            for (const line of lines) {
                                const trimmed = line.trim();
                                
                                // Extract URI from header
                                if (trimmed.startsWith('//  URI         ')) {
                                    headerURI = trimmed.replace('//  URI         ', '').trim();
                                }
                                
                                // Extract function name from exports.default
                                if (trimmed.includes('exports.default = function')) {
                                    const match = trimmed.match(/exports\.default\s*=\s*function\s+([a-zA-Z_][a-zA-Z0-9_]*)/);
                                    if (match) {
                                        actualFunctionName = match[1];
                                    }
                                }
                            }
                            
                            // Validate URI matches expected pattern - should match method call structure
                            const expectedURI = pathSegments.join('/').replace(/_/g, '-');
                            const expectedFullURI = `${appName}/${expectedURI}`;
                            
                            if (headerURI && headerURI !== expectedFullURI) {
                                namingValidation = { isValid: false, reason: `URI "${headerURI}" doesn't match expected "${expectedFullURI}"` };
                            }
                            
                            // Validate function name matches expected pattern
                            if (namingValidation.isValid && actualFunctionName && actualFunctionName !== expectedFunctionName) {
                                namingValidation = { isValid: false, reason: `Function name "${actualFunctionName}" doesn't match expected "${expectedFunctionName}"` };
                            }
                        }
                        
                        if (namingValidation.isValid) {
                            keyResults.push({
                                type: 'coding-naming',
                                filePath: filePath,
                                status: 'PASS',
                                message: `Naming conventions valid`,
                                duration: Date.now() - startTime,
                                timestamp: new Date().toISOString()
                            });
                        } else {
                            keyResults.push({
                                type: 'coding-naming',
                                filePath: filePath,
                                status: 'FAIL',
                                message: `${filePath.replace(spl.context(input, "cwd") + '/', '')}: ${namingValidation.reason}`,
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
            requestRecord.value.results['coding-naming'] = {
                summary: {
                    total: keyResults.length,
                    passed: keyResults.filter(r => r.status === 'PASS').length,
                    failed: keyResults.filter(r => r.status === 'FAIL' || r.status === 'ERROR').length
                },
                results: keyResults
            };
        }
        
        // Update workflow to include test-coding-naming
        requestRecord.headers.workflow = Array.from(new Set([...requestRecord.headers.workflow, 'test-coding-naming']));
    }
    
    // Save updated record
    spl.wsSet(input, "gp/test", testApiRecord);
    
    spl.history(input, `test-coding-naming: Completed naming convention validation`);
    spl.completed(input);
}

