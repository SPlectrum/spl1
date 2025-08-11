//  name        Test Documentation Currency
//  URI         gp/test/test-docs-current
//  type        API Method
//  description Validates that README.md files are more recent than .js files in the same folder
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const testLib = require("gp_test_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Documentation Currency Testing
exports.default = function gp_test_test_docs_current(input) {
    const testApiRecord = spl.wsRef(input, "gp/test");
    
    // Process all request records
    for (const requestKey in testApiRecord.value) {
        const requestRecord = testApiRecord.value[requestKey];
        const workPackages = requestRecord.value.plan?.workPackages || [];
        const keyResults = [];
        
        // Process all docs-current work packages
        for (const workPackage of workPackages) {
            if (workPackage.type === 'docs-current') {
                const startTime = Date.now();
                
                // Group assets by directory
                const folderMap = {};
                workPackage.assets.forEach(asset => {
                    const dir = testLib.pathDirname(asset.fullPath);
                    if (!folderMap[dir]) {
                        folderMap[dir] = { jsFiles: [], mdFiles: [] };
                    }
                    
                    const fileName = testLib.pathBasename(asset.fullPath);
                    if (fileName.endsWith('.js')) {
                        folderMap[dir].jsFiles.push(asset);
                    } else if (fileName.endsWith('.md')) {
                        folderMap[dir].mdFiles.push(asset);
                    }
                });
                
                // Check documentation currency for each folder
                Object.entries(folderMap).forEach(([dir, files]) => {
                    if (files.jsFiles.length > 0) {
                        const readmeFile = files.mdFiles.find(f => testLib.pathBasename(f.fullPath) === 'README.md');
                        const relativePath = dir.replace(/^.*\/spl-dev\//, '');
                        
                        if (!readmeFile) {
                            // No README.md - this is a docs-present issue, not docs-current
                            keyResults.push({
                                type: 'docs-current',
                                folderPath: dir,
                                status: 'PASS',
                                message: `${relativePath} (no README.md to check)`,
                                duration: Date.now() - startTime,
                                timestamp: new Date().toISOString()
                            });
                        } else {
                            // Check if README.md is more recent than all .js files
                            const readmeTime = new Date(readmeFile.lastModified);
                            const outdatedJsFiles = files.jsFiles.filter(jsFile => {
                                const jsTime = new Date(jsFile.lastModified);
                                return jsTime > readmeTime;
                            });
                            
                            if (outdatedJsFiles.length > 0) {
                                // README.md is older than some .js files
                                const outdatedFileNames = outdatedJsFiles.map(f => testLib.pathBasename(f.fullPath)).join(', ');
                                keyResults.push({
                                    type: 'docs-current',
                                    folderPath: dir,
                                    status: 'FAIL',
                                    message: `${relativePath}`,
                                    duration: Date.now() - startTime,
                                    timestamp: new Date().toISOString(),
                                    details: {
                                        readmeLastModified: readmeFile.lastModified,
                                        outdatedJsFiles: outdatedFileNames
                                    }
                                });
                            } else {
                                // README.md is current
                                keyResults.push({
                                    type: 'docs-current',
                                    folderPath: dir,
                                    status: 'PASS',
                                    message: `${relativePath} (README.md is current)`,
                                    duration: Date.now() - startTime,
                                    timestamp: new Date().toISOString()
                                });
                            }
                        }
                    }
                });
            }
        }
        
        // Store results in the request record using test type name
        if (keyResults.length > 0) {
            if (!requestRecord.value.results) {
                requestRecord.value.results = {};
            }
            requestRecord.value.results['docs-current'] = {
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
    
    spl.history(input, `test-docs-current: Completed documentation currency validation`);
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////