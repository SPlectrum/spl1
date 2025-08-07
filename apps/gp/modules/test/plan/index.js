//  name        Test Planning
//  URI         gp/test/plan
//  type        API Method
//  description Pure planning - examines discovery assets and creates execution plan (work packages)
//              Determines what tests to run and packages them for run method execution
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Pure Test Planning
exports.default = function gp_test_plan(input) {
    const planType = spl.action(input, 'type') || 'coverage';
    const targetModule = spl.action(input, 'module');
    const threshold = spl.action(input, 'threshold') || 80;
    
    spl.history(input, `test/plan: Starting planning`);
    spl.history(input, `test/plan: Type=${planType}, Module=${targetModule || 'all'}, Threshold=${threshold}%`);
    
    try {
        // Get discovery assets from pattern-based workspace
        const testApiRecord = spl.wsRef(input, "gp/test");
        if (!testApiRecord || !testApiRecord.value) {
            throw new Error("No discovery data available - run gp/test/discover first");
        }
        
        // Find the current request record  
        const currentRequestRecord = spl.wsRef(input, "gp/test/current-request");
        if (!currentRequestRecord || !currentRequestRecord.value) {
            throw new Error("No current request found - run gp/test/discover first");
        }
        
        const requestKey = currentRequestRecord.value;
        const requestRecord = testApiRecord.value[requestKey];
        
        if (!requestRecord || !requestRecord.value.discovery) {
            throw new Error("No discovery data found for current request");
        }
        
        const assets = requestRecord.value.discovery.assets || [];
        spl.history(input, `test/plan: Planning ${assets.length} assets`);
        
        // Create work packages from assets
        const workPackages = createWorkPackages(input, assets, { planType, threshold, targetModule });
        
        spl.history(input, `test/plan: Created ${workPackages.length} work packages`);
        
        // Store work packages in the same request record
        requestRecord.value.plan = {
            workPackages: workPackages,
            metadata: {
                totalAssets: assets.length,
                threshold: threshold,
                targetModule: targetModule,
                timestamp: new Date().toISOString()
            }
        };
        
        // Update workflow to include plan
        requestRecord.headers.workflow = Array.from(new Set([...requestRecord.headers.workflow, 'plan']));
        
        // Save updated record
        spl.wsSet(input, "gp/test", testApiRecord);
        
        spl.history(input, `test/plan: Planning completed`);
        
    } catch (error) {
        spl.rcSet(input.headers, "spl.execute.error", {
            message: error.message,
            code: error.code || 'PLANNING_ERROR',
            operation: 'test/plan'
        });
        
        spl.history(input, `test/plan: ERROR - ${error.message}`);
    }
    
    spl.completed(input);
}

// Create work packages from URI assets
function createWorkPackages(input, assets, options) {
    const { planType, threshold, targetModule } = options;
    const cwd = spl.context(input, "cwd");
    
    spl.history(input, `test/plan: Creating ${planType} work packages from ${assets.length} assets`);
    
    const workPackages = [];
    
    // Separate assets by type
    const jsFiles = [];
    const jsonFiles = [];
    const testFiles = [];
    
    for (const assetPath of assets) {
        const fullPath = `${cwd}/${assetPath}`;
        
        if (assetPath.includes('/index.js')) {
            jsFiles.push(fullPath);
        } else if (assetPath.includes('/index_arguments.json')) {
            jsonFiles.push(fullPath);
        } else if (assetPath.includes('/.test/') && assetPath.endsWith('.json')) {
            // Extract test type from filename (basic__, advanced__, etc.)
            const filename = assetPath.split('/').pop();
            const testType = filename.split('__')[0];
            testFiles.push({ 
                uri: assetPath, 
                path: fullPath, 
                testFile: fullPath,
                targetModule: extractTargetModule(assetPath),
                syntax: testType
            });
        }
    }
    
    // Work Package 1: Instantiation tests (100% success required)
    if (jsFiles.length > 0) {
        workPackages.push({
            type: "instantiation",
            filePaths: jsFiles,
            expect: { successRate: 100 }
        });
    }
    
    // Work Package 2: JSON validation tests (100% success required)
    if (jsonFiles.length > 0) {
        workPackages.push({
            type: "json-validation", 
            filePaths: jsonFiles,
            expect: { successRate: 100 }
        });
    }
    
    // Work Package 3+: Test file execution (separate package per test type)
    if (testFiles.length > 0) {
        // Group test files by test type (basic, advanced, etc.)
        const testsByType = {};
        testFiles.forEach(testFile => {
            const testType = testFile.syntax;
            if (!testsByType[testType]) {
                testsByType[testType] = [];
            }
            testsByType[testType].push({
                testFile: testFile.testFile,
                targetModule: testFile.targetModule,
                syntax: testFile.syntax
            });
        });
        
        // Create separate work package for each test type
        Object.entries(testsByType).forEach(([testType, commands]) => {
            workPackages.push({
                type: `${testType}-test-execution`,
                commands: commands,
                expect: { successRate: 100 }
            });
        });
    }
    
    return workPackages;
}

// Extract target module from test file path
function extractTargetModule(assetPath) {
    // Extract from path like: apps/gp/modules/fs/write/.test/basic__gp_fs_write__first-tests.json
    const pathParts = assetPath.split('/');
    const moduleIndex = pathParts.indexOf('modules') + 1;
    
    if (moduleIndex > 0 && moduleIndex < pathParts.length) {
        // Find all parts until .test directory
        const testIndex = pathParts.findIndex(part => part === '.test');
        if (testIndex > moduleIndex) {
            return pathParts.slice(1, testIndex).join('/'); // gp/fs/write
        }
    }
    
    return 'unknown';
}

///////////////////////////////////////////////////////////////////////////////