//  name        Test Discovery
//  URI         gp/test/discover  
//  type        API Method
//  description Pure discovery - list operations, tests, schemas, and metadata
//              Foundation method for all test operations
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const fs = require('fs');
const path = require('path');
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Pure Discovery Method
exports.default = function gp_test_discover(input) {
    const modulePattern = spl.action(input, 'modules') || '*';
    const testPattern = spl.action(input, 'tests') || '*';
    const schemaPattern = spl.action(input, 'schemas') || 'none';
    
    spl.history(input, `test/discover: Starting discovery`);
    spl.history(input, `test/discover: Modules=${modulePattern}, Tests=${testPattern}, Schemas=${schemaPattern}`);
    
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
    const assets = discoverAssets(input, modulePattern, testPattern);
    
    spl.history(input, `test/discover: Found ${assets.length} assets`);
    
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
    const requestKey = generateRequestKey(modulePattern, testPattern, schemaPattern);
    
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
    
    spl.history(input, `test/discover: Discovery completed successfully`);
    
    spl.completed(input);
}

// Simple file selector - returns file paths relative to install root
function discoverAssets(input, modulePattern, testPattern) {
    const assets = [];
    const cwd = spl.context(input, "cwd");
    
    // Determine if app or module from first part
    const parts = modulePattern.split('/');
    const firstPart = parts[0];
    
    let searchFolder;
    if (firstPart === 'spl' || firstPart === 'modules') {
        // Module
        searchFolder = path.join(cwd, 'modules', parts.slice(1).join('/'));
    } else {
        // App
        searchFolder = path.join(cwd, 'apps', firstPart, 'modules', parts.slice(1).join('/'));
    }
    
    // Select all files that match the selector
    if (fs.existsSync(searchFolder)) {
        const files = fs.readdirSync(searchFolder, { recursive: true });
        files.forEach(file => {
            const filePath = path.join(searchFolder, file);
            if (fs.statSync(filePath).isFile()) {
                if (firstPart === 'spl' || firstPart === 'modules') {
                    assets.push(`modules/${parts.slice(1).join('/')}/${file}`);
                } else {
                    assets.push(`apps/${firstPart}/modules/${parts.slice(1).join('/')}/${file}`);
                }
            }
        });
    }
    
    return assets;
}










// Generate unique request key based on input patterns (primary key)
function generateRequestKey(modulePattern, testPattern, schemaPattern) {
    const patterns = [
        modulePattern || '*',
        testPattern || '*', 
        schemaPattern || 'none'
    ];
    
    return `|${patterns.join('||')}|`;
}
///////////////////////////////////////////////////////////////////////////////