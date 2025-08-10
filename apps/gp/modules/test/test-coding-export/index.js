//  name        Coding Standards - Export Validation
//  URI         gp/test/test-coding-export
//  type        API Method
//  description Validates that index.js files use only exports.default and no local functions
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const test = require("gp_test");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Export Pattern Validation (Blanket Coverage: All)
exports.default = function gp_test_test_coding_export(input) {
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
                        
                        // Validate export patterns
                        const exportValidation = validateExportPatterns(content);
                        
                        if (exportValidation.isValid) {
                            keyResults.push({
                                type: 'coding-export',
                                filePath: filePath,
                                status: 'PASS',
                                message: `Export patterns valid`,
                                duration: Date.now() - startTime,
                                timestamp: new Date().toISOString()
                            });
                        } else {
                            keyResults.push({
                                type: 'coding-export',
                                filePath: filePath,
                                status: 'FAIL',
                                message: filePath.replace(spl.context(input, "cwd") + '/', ''),
                                duration: Date.now() - startTime,
                                timestamp: new Date().toISOString()
                            });
                        }
                        
                    } catch (error) {
                        keyResults.push({
                            type: 'coding-export',
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
            requestRecord.value.results['coding-export'] = {
                summary: {
                    total: keyResults.length,
                    passed: keyResults.filter(r => r.status === 'PASS').length,
                    failed: keyResults.filter(r => r.status === 'FAIL' || r.status === 'ERROR').length
                },
                results: keyResults
            };
        }
        
        // Update workflow to include test-coding-export
        requestRecord.headers.workflow = Array.from(new Set([...requestRecord.headers.workflow, 'test-coding-export']));
    }
    
    // Save updated record
    spl.wsSet(input, "gp/test", testApiRecord);
    
    spl.history(input, `test-coding-export: Completed export pattern validation`);
    spl.completed(input);
}

// Validate export patterns in file content
function validateExportPatterns(content) {
    const lines = content.split('\n');
    let hasExportsDefault = false;
    let hasLocalFunctions = false;
    
    for (const line of lines) {
        const trimmed = line.trim();
        
        // Skip comments and empty lines
        if (trimmed.startsWith('//') || trimmed.length === 0) continue;
        
        // Check for exports.default
        if (trimmed.includes('exports.default') && trimmed.includes('function')) {
            hasExportsDefault = true;
            continue;
        }
        
        // Check for local functions (function declarations)
        if (trimmed.startsWith('function ')) {
            hasLocalFunctions = true;
            break;
        }
        
        // Check for local function expressions
        if (trimmed.includes('= function') && !trimmed.includes('exports.default')) {
            hasLocalFunctions = true;
            break;
        }
        
        // Check for other export patterns
        if (trimmed.includes('exports.') && !trimmed.includes('exports.default')) {
            return { isValid: false, reason: 'Non-default exports found' };
        }
        
        if (trimmed.includes('module.exports')) {
            return { isValid: false, reason: 'module.exports pattern found' };
        }
    }
    
    // Must have exports.default
    if (!hasExportsDefault) {
        return { isValid: false, reason: 'Missing exports.default' };
    }
    
    // Must not have local functions
    if (hasLocalFunctions) {
        return { isValid: false, reason: 'Local functions found' };
    }
    
    return { isValid: true };
}