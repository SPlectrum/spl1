//  name        Coding Standards - Export Validation
//  URI         gp/test/test-coding-export
//  type        API Method
//  description Validates that index.js files use only exports.default and no local functions
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const testLib = require("gp_test_lib");
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
            if (workPackage.type === 'coding-standards' || workPackage.type === 'coding-export') {
                for (const filePath of workPackage.filePaths) {
                    const startTime = Date.now();
                    
                    // Read file content and validate export patterns (SPL happy path - no error handling)
                    const content = testLib.readFileSync(filePath);
                    const lines = content.split('\n');
                    let hasExportsDefault = false;
                    let isValid = true;
                    let failMatch = '';
                    
                    for (let i = 0; i < lines.length; i++) {
                        const line = lines[i];
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
                            isValid = false;
                            failMatch = `Line ${i+1}: ${trimmed}`;
                            break;
                        }
                        
                        // Check for local function expressions
                        if (trimmed.includes('= function') && !trimmed.includes('exports.default')) {
                            isValid = false;
                            failMatch = `Line ${i+1}: ${trimmed}`;
                            break;
                        }
                        
                        // Check for other export patterns (only at start of line)
                        if (trimmed.startsWith('exports.') && !trimmed.includes('exports.default')) {
                            isValid = false;
                            failMatch = `Line ${i+1}: ${trimmed}`;
                            break;
                        }
                        
                        if (trimmed.startsWith('module.exports')) {
                            isValid = false;
                            failMatch = `Line ${i+1}: ${trimmed}`;
                            break;
                        }
                    }
                    
                    // Must have exports.default
                    if (isValid && !hasExportsDefault) {
                        isValid = false;
                        failMatch = 'No exports.default function found in file';
                    }
                    
                    if (isValid) {
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