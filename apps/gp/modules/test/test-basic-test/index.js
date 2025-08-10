//  name        Test Basic Test Execution
//  URI         gp/test/test-basic-test
//  type        API Method
//  description Executes basic test files with JSON selector validation
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const testLib = require('gp_test');
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Basic Test Execution (Blanket Coverage: All)
exports.default = function gp_test_test_basic_test(input) {
    const testApiRecord = spl.wsRef(input, "gp/test");
    
    // Process all request records (blanket coverage: all)
    for (const requestKey in testApiRecord.value) {
        const requestRecord = testApiRecord.value[requestKey];
        const workPackages = requestRecord.value.plan?.workPackages || [];
        const keyResults = [];
        
        // Initialize test context outside the loop to persist debug info
        const testContext = { 
            executionHistory: [],
            cwd: spl.context(input, "cwd"),
            appDataRoot: spl.context(input, "appDataRoot"),
            lastExtractedJson: null
        };

        // Process all basic-test work packages in this request
        for (const workPackage of workPackages) {
            if (workPackage.type === 'basic-test') {
                // Use auxiliary function for basic test execution
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
                timestamp: new Date().toISOString(),
                testDetails: testContext.lastTestDetails // Include detailed test information
            };
        }
    }
    
    // Save updated test API record
    spl.wsSet(input, "gp/test", testApiRecord);
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////