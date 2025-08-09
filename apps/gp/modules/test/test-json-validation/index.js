//  name        Test JSON Validation
//  URI         gp/test/test-json-validation
//  type        API Method
//  description Tests argument schema files for valid JSON structure
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const testLib = require('gp_test');
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - JSON Validation Testing (Blanket Coverage: All)
exports.default = function gp_test_test_json_validation(input) {
    const testApiRecord = spl.wsRef(input, "gp/test");
    
    // Process all request records (blanket coverage: all)
    for (const requestKey in testApiRecord.value) {
        const requestRecord = testApiRecord.value[requestKey];
        const workPackages = requestRecord.value.plan?.workPackages || [];
        const keyResults = [];
        
        // Process all json-validation work packages in this request
        for (const workPackage of workPackages) {
            if (workPackage.type === 'json-validation') {
                // Use auxiliary function for JSON validation
                const testContext = { executionHistory: [] };
                const packageResults = testLib.executeJsonValidationPackage(testContext, workPackage);
                keyResults.push(...packageResults);
            }
        }
        
        // Store results in the request record using test type name
        if (keyResults.length > 0) {
            if (!requestRecord.value.results) {
                requestRecord.value.results = {};
            }
            requestRecord.value.results['json-validation'] = {
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