//  name        Coding Standards - Require Pattern Validation
//  URI         gp/test/test-coding-require
//  type        API Method
//  description Validates that index.js files use correct require patterns
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const testLib = require("gp_test_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Require Pattern Validation (Blanket Coverage: All)
exports.default = function gp_test_test_coding_require(input) {
    const testApiRecord = spl.wsRef(input, "gp/test");
    
    // Process all request records (blanket coverage: all)
    for (const requestKey in testApiRecord.value) {
        const requestRecord = testApiRecord.value[requestKey];
        const workPackages = requestRecord.value.plan?.workPackages || [];
        const keyResults = [];
        
        // Process coding-standards and coding-require work packages in this request
        for (const workPackage of workPackages) {
            if (workPackage.type === 'coding-standards' || workPackage.type === 'coding-require') {
                for (const filePath of workPackage.filePaths) {
                    const startTime = Date.now();
                    
                    // Validate patterns (SPL happy path - no error handling)
                        // Read file content using auxiliary function
                        const content = testLib.readFileSync(filePath);
                        const fileSize = content.length;
                        
                        // Validate require patterns - inlined validation logic
                        const lines = content.split('\n');
                        
                        // Extract API name from file path (resolve real path to handle symlinks)
                        const realFilePath = testLib.resolveRealPath(filePath);
                        const pathParts = realFilePath.split('/');
                        const appIndex = pathParts.findIndex(part => part === 'apps') + 1;
                        const modulesIndex = pathParts.findIndex(part => part === 'modules');
                        let allowedApiRequire = null;
                        
                        if (appIndex > 0 && modulesIndex >= 0 && modulesIndex < pathParts.length - 1) {
                            // App pattern: apps/[app name]/modules/[api]/[method] -> [app]_[api]
                            const appName = pathParts[appIndex]; // e.g., "gp"
                            const apiName = pathParts[modulesIndex + 1]; // e.g., "config"
                            allowedApiRequire = `${appName}_${apiName}`; // e.g., "gp_config"
                        } else if (modulesIndex >= 0 && modulesIndex < pathParts.length - 2) {
                            // Package pattern: modules/[package]/[api]/[method] -> [package]_[api]
                            const packageName = pathParts[modulesIndex + 1]; // e.g., "tools"
                            const apiName = pathParts[modulesIndex + 2]; // e.g., "git"
                            allowedApiRequire = `${packageName}_${apiName}`; // e.g., "tools_git"
                        }
                        
                        // Track section boundaries
                        let headerEnded = false;
                        let exportFound = false;
                        let exportLine = null;
                        let requireValidation = { isValid: true };
                        
                        for (let i = 0; i < lines.length && requireValidation.isValid; i++) {
                            const line = lines[i];
                            const trimmed = line.trim();
                            
                            // Skip empty lines
                            if (trimmed.length === 0) continue;
                            
                            // Track header end (after ///////////////////////////////////////////////////////////////////////////////  )
                            if (trimmed === '///////////////////////////////////////////////////////////////////////////////') {
                                headerEnded = true;
                                continue;
                            }
                            
                            // Track export declaration (actual export, not comments mentioning it)
                            if (trimmed.includes('exports.default') && !trimmed.startsWith('//')) {
                                exportFound = true;
                                exportLine = trimmed; // Capture the actual export line
                            }
                            
                            // Skip comments
                            if (trimmed.startsWith('//')) continue;
                            
                            // Check for require statements
                            if (testLib.containsRequirePattern(trimmed) && !trimmed.includes('//')) {
                                // Require must be after header
                                if (!headerEnded) {
                                    requireValidation = { isValid: false, reason: 'Require statement found before header end', violatingRequire: trimmed };
                                    break;
                                }
                                
                                // Require must be before export
                                if (exportFound) {
                                    requireValidation = { isValid: false, reason: 'Require statement found after exports.default declaration', violatingRequire: trimmed, exportLine: exportLine };
                                    break;
                                }
                                
                                // Valid: spl_lib require
                                if (trimmed.match(/require\s*\(\s*["|']spl_lib["|']\s*\)/)) {
                                    continue;
                                }
                                
                                // Valid: current API library require (e.g., gp_config_lib for gp/config modules)
                                if (allowedApiRequire && 
                                    trimmed.match(new RegExp(`require\\s*\\(\\s*["|']${allowedApiRequire}_lib["|']\\s*\\)`))) {
                                    continue;
                                }
                                
                                // Invalid: any other require pattern
                                const requireMatch = trimmed.match(/require\s*\(\s*["|']([^"']+)["|']\s*\)/);
                                const moduleName = requireMatch ? requireMatch[1] : 'unknown';
                                const fullRequireStatement = requireMatch ? requireMatch[0] : trimmed;
                                requireValidation = { 
                                    isValid: false, 
                                    reason: `Invalid require pattern found: ${fullRequireStatement}`, 
                                    violatingRequire: fullRequireStatement,
                                    moduleName: moduleName,
                                    allowedApiRequire: allowedApiRequire
                                };
                                break;
                            }
                        }
                        
                        if (requireValidation.isValid) {
                            keyResults.push({
                                type: 'coding-require',
                                filePath: filePath,
                                status: 'PASS',
                                message: `Require patterns valid`,
                                duration: Date.now() - startTime,
                                timestamp: new Date().toISOString()
                            });
                        } else {
                            keyResults.push({
                                type: 'coding-require',
                                filePath: filePath,
                                status: 'FAIL',
                                message: `${filePath.replace(spl.context(input, "cwd") + '/', '')}: ${requireValidation.reason}`,
                                duration: Date.now() - startTime,
                                timestamp: new Date().toISOString(),
                                validationReason: requireValidation.reason,
                                violatingRequire: requireValidation.violatingRequire || 'Unknown',
                                fileSize: fileSize,
                                allowedApiRequire: requireValidation.allowedApiRequire || 'Unknown',
                                exportLine: requireValidation.exportLine || 'Unknown'
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
            requestRecord.value.results['coding-require'] = {
                summary: {
                    total: keyResults.length,
                    passed: keyResults.filter(r => r.status === 'PASS').length,
                    failed: keyResults.filter(r => r.status === 'FAIL' || r.status === 'ERROR').length
                },
                results: keyResults,
                testDetails: keyResults.filter(r => r.status === 'FAIL').map(r => ({
                    filePath: r.filePath,
                    fileSize: r.fileSize,
                    validationRule: 'require-patterns',
                    found: r.violatingRequire,
                    expected: testLib.getExpectedRequirePattern(r.allowedApiRequire),
                    validationReason: r.validationReason,
                    passed: false
                }))
            };
        }
        
        // Update workflow to include test-coding-require
        requestRecord.headers.workflow = Array.from(new Set([...requestRecord.headers.workflow, 'test-coding-require']));
    }
    
    // Save updated record
    spl.wsSet(input, "gp/test", testApiRecord);
    
    spl.history(input, `test-coding-require: Completed require pattern validation`);
    spl.completed(input);
}

