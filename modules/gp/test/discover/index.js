//  name        Test Discovery
//  URI         gp/test/discover  
//  type        API Method
//  description Pure discovery - list operations, tests, schemas, and metadata
//              Foundation method for all test operations
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const testLib = require("gp_test_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Pure Discovery Method
exports.default = function gp_test_discover(input) {
    const modulePattern = spl.action(input, 'modules') || '*';
    const testPattern = spl.action(input, 'tests') || '*';
    const schemaPattern = spl.action(input, 'schemas') || 'none';
    
    const cwd = spl.context(input, "cwd");
    const discoveries = {
        operations: [],
        tests: [],
        schemas: [],
        metadata: {
            modulePattern: modulePattern,
            testPattern: testPattern,
            schemaPattern: schemaPattern,
            timestamp: new Date().toISOString(),
            discoveryRoot: cwd
        }
    };
    
    // Discover assets using URI-based approach
    const assets = testLib.discoverAssets(input, modulePattern, testPattern);
    
    // Store simple asset list
    const discoveryResult = {
        assets: assets,
        metadata: {
            modulePattern: modulePattern,
            testPattern: testPattern,
            schemaPattern: schemaPattern,
            timestamp: new Date().toISOString(),
            discoveryRoot: cwd
        }
    };
    
    // Generate unique request key based on input patterns
    const requestKey = testLib.generateRequestKey(modulePattern, testPattern, schemaPattern);
    
    // Get or create main gp/test record
    let testApiRecord = spl.wsRef(input, "gp/test");
    if (!testApiRecord) {
        testApiRecord = {
            headers: { gp: { test: { api: "gp/test", timestamp: new Date().toISOString() } } },
            value: {}
        };
    }
    
    // Create or update request record
    if (!testApiRecord.value[requestKey]) {
        testApiRecord.value[requestKey] = {
            headers: { 
                requestKey: requestKey,
                workflow: ['discover'],
                startTime: new Date().toISOString(),
                modulePattern: modulePattern,
                testPattern: testPattern,
                schemaPattern: schemaPattern
            },
            value: {}
        };
    }
    
    // Store discovery data in the request record
    testApiRecord.value[requestKey].value.discovery = discoveryResult;
    testApiRecord.value[requestKey].headers.workflow = 
        Array.from(new Set([...testApiRecord.value[requestKey].headers.workflow, 'discover']));
    
    // Save updated test API record
    spl.wsSet(input, "gp/test", testApiRecord);
    
    spl.history(input, `test/discover: Discovered ${assets.length} assets with patterns - modules=${modulePattern}, tests=${testPattern}, schemas=${schemaPattern} in ${cwd}`);
    
    spl.completed(input);
}











///////////////////////////////////////////////////////////////////////////////