//  name        Test Simple Test Execution
//  URI         gp/test/test-simple-test
//  type        API Method
//  description Executes basic test files with JSON selector validation
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const testLib = require('gp_test');
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Simple Test Execution (Blanket Coverage: All)
exports.default = function gp_test_test_simple_test(input) {
    const testApiRecord = spl.wsRef(input, "gp/test");
    
    // Process all request records (blanket coverage: all)
    for (const requestKey in testApiRecord.value) {
        const requestRecord = testApiRecord.value[requestKey];
        const workPackages = requestRecord.value.plan?.workPackages || [];
        const keyResults = [];
        
        // Process all basic-test-execution work packages in this request
        for (const workPackage of workPackages) {
            if (workPackage.type === 'basic-test-execution') {
                // Use auxiliary function for basic test execution
                const testContext = { 
                    executionHistory: [],
                    cwd: spl.context(input, "cwd"),
                    appDataRoot: spl.context(input, "appDataRoot")
                };
                const packageResults = testLib.executeBasicTestPackage(testContext, workPackage);
                keyResults.push(...packageResults);
            }
        }
        
        // Store results in the request record using test type name
        if (keyResults.length > 0) {
            if (!requestRecord.value.results) {
                requestRecord.value.results = {};
            }
            requestRecord.value.results['basic-test'] = {
                results: keyResults,
                summary: {
                    total: keyResults.length,
                    passed: keyResults.filter(r => r.status === 'PASS').length,
                    failed: keyResults.filter(r => r.status === 'FAIL').length
                },
                timestamp: new Date().toISOString()
            };
        }
    }
    
    // Save updated test API record
    spl.wsSet(input, "gp/test", testApiRecord);
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////