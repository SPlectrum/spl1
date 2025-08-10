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
    const planType = spl.action(input, 'type');
    
    // Get discovery assets from pattern-based workspace
    const testApiRecord = spl.wsRef(input, "gp/test");
    
    // Process all request records (blanket coverage: all)
    let totalAssets = 0;
    let totalPackages = 0;
    
    for (const requestKey in testApiRecord.value) {
        const requestRecord = testApiRecord.value[requestKey];
        const assets = requestRecord.value.discovery?.assets || [];
        totalAssets += assets.length;
        
        // Create work packages from assets
        const workPackages = createWorkPackages(input, assets, { planType });
        totalPackages += workPackages.length;
        
        // Store work packages in the request record
        requestRecord.value.plan = {
            workPackages: workPackages,
            metadata: {
                totalAssets: assets.length,
                timestamp: new Date().toISOString()
            }
        };
        
        // Update workflow to include plan
        requestRecord.headers.workflow = Array.from(new Set([...requestRecord.headers.workflow, 'plan']));
    }
    
    // Save updated record
    spl.wsSet(input, "gp/test", testApiRecord);
    
    spl.history(input, `test/plan: Created ${totalPackages} work packages (${planType}) from ${totalAssets} assets`);
    
    spl.completed(input);
}

// Create work packages from URI assets
function createWorkPackages(input, assets, options) {
    const { planType } = options;
    const cwd = spl.context(input, "cwd");
    
    // Parse test types - could be "all", single type, or comma-delimited list
    const requestedTypes = planType === 'all' 
        ? ['instantiation', 'json-validation', 'basic-test', 'docs-present', 'docs-current', 'file-type', 'coding-require', 'coding-export', 'coding-args', 'coding-header', 'coding-errors', 'coding-complete', 'coding-naming', 'coding-history']
        : planType.split(',').map(t => t.trim());
    
    const workPackages = [];
    
    // Separate assets by type
    const jsFiles = [];
    const indexJsFiles = [];
    const jsonFiles = [];
    const testFiles = [];
    const allFiles = [];
    
    for (const asset of assets) {
        // Assets are now objects with {path, lastModified}
        const assetPath = asset.path;
        const fullPath = asset.fullPath;
        
        if (assetPath.includes('/index.js')) {
            jsFiles.push(fullPath);
            indexJsFiles.push(fullPath);
        } else if (assetPath.endsWith('.js')) {
            jsFiles.push(fullPath); // All JS files for instantiation
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
        
        // Collect all .js and .md files for docs-present and docs-current testing
        if (assetPath.endsWith('.js') || assetPath.endsWith('.md')) {
            allFiles.push(asset); // Store full asset object with metadata for docs-current
        }
    }
    
    // Work Package 1: Instantiation tests (100% success required)
    if (jsFiles.length > 0 && requestedTypes.includes('instantiation')) {
        workPackages.push({
            type: "instantiation",
            filePaths: jsFiles,
            expect: { successRate: 100 }
        });
    }
    
    // Work Package 2: JSON validation tests (100% success required)
    if (jsonFiles.length > 0 && requestedTypes.includes('json-validation')) {
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
        
        // Create separate work package for each test type - only if requested
        Object.entries(testsByType).forEach(([testType, commands]) => {
            const packageType = testType;
            if (requestedTypes.includes('basic-test') || requestedTypes.includes(packageType)) {
                workPackages.push({
                    type: packageType,
                    commands: commands,
                    expect: { successRate: 100 }
                });
            }
        });
    }
    
    // Work Package 4: Documentation presence tests (100% success required)
    if (allFiles.length > 0 && requestedTypes.includes('docs-present')) {
        workPackages.push({
            type: "docs-present",
            filePaths: allFiles.map(asset => asset.fullPath), // Extract just paths for docs-present
            expect: { successRate: 100 }
        });
    }
    
    // Work Package 5: Documentation currency tests (100% success required)
    if (allFiles.length > 0 && requestedTypes.includes('docs-current')) {
        workPackages.push({
            type: "docs-current",
            assets: allFiles, // Pass full assets with metadata for docs-current
            expect: { successRate: 100 }
        });
    }
    
    // Work Package 6: File type validation tests (100% success required)
    if (assets.length > 0 && requestedTypes.includes('file-type')) {
        workPackages.push({
            type: "file-type",
            assets: assets, // Pass all assets for file structure validation
            expect: { successRate: 100 }
        });
    }
    
    // Work Package 7: coding-standards
    const codingStandardsTypes = ['coding-require', 'coding-export', 'coding-args', 'coding-header', 'coding-errors', 'coding-complete', 'coding-naming', 'coding-history'];
    const hasCodingStandardsRequest = codingStandardsTypes.some(type => requestedTypes.includes(type));
    
    if (indexJsFiles.length > 0 && hasCodingStandardsRequest) {
        workPackages.push({
            type: "coding-standards",
            filePaths: indexJsFiles,
            expect: { successRate: 100 }
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