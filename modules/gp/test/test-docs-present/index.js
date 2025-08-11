//  name        Documentation Presence Validation
//  URI         gp/test/test-docs-present  
//  type        API Method
//  description Validates that folders with .js files have exactly one README.md file
//              Enforces SPL coding standard requirement for method-level documentation
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const testLib = require("gp_test_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Documentation Presence Testing (Blanket Coverage: All)
exports.default = function gp_test_test_docs_present(input) {
    const testApiRecord = spl.wsRef(input, "gp/test");
    
    // Process all request records (blanket coverage: all)
    for (const requestKey in testApiRecord.value) {
        const requestRecord = testApiRecord.value[requestKey];
        const workPackages = requestRecord.value.plan?.workPackages || [];
        const keyResults = [];
        
        // Process all docs-present work packages in this request
        for (const workPackage of workPackages) {
            if (workPackage.type === 'docs-present') {
                // Group files by directory
                const folderMap = {};
                workPackage.filePaths.forEach(filePath => {
                    const dir = testLib.pathDirname(filePath);
                    if (!folderMap[dir]) {
                        folderMap[dir] = { jsFiles: [], mdFiles: [] };
                    }
                    
                    const fileName = testLib.pathBasename(filePath);
                    if (fileName.endsWith('.js')) {
                        folderMap[dir].jsFiles.push(fileName);
                    } else if (fileName.endsWith('.md')) {
                        folderMap[dir].mdFiles.push(fileName);
                    }
                });
                
                // Check each folder that contains .js files
                Object.entries(folderMap).forEach(([dir, files]) => {
                    const startTime = Date.now();
                    
                    if (files.jsFiles.length > 0) {
                        // Folder has .js files - must have exactly one README.md
                        const hasReadme = files.mdFiles.includes('README.md');
                        const extraMdFiles = files.mdFiles.filter(f => f !== 'README.md');
                        const relativePath = dir.replace(/^.*\/spl-dev\//, '');
                        
                        if (!hasReadme) {
                            keyResults.push({
                                type: 'docs-present',
                                folderPath: dir,
                                status: 'FAIL',
                                message: relativePath,
                                duration: Date.now() - startTime,
                                timestamp: new Date().toISOString()
                            });
                            
                        } else if (extraMdFiles.length > 0) {
                            keyResults.push({
                                type: 'docs-present', 
                                folderPath: dir,
                                status: 'FAIL',
                                message: `${relativePath} (extra .md files: ${extraMdFiles.join(', ')})`,
                                duration: Date.now() - startTime,
                                timestamp: new Date().toISOString()
                            });
                            
                        } else {
                            keyResults.push({
                                type: 'docs-present',
                                folderPath: dir, 
                                status: 'PASS',
                                message: `Documentation present (README.md for ${files.jsFiles.length} .js files)`,
                                duration: Date.now() - startTime,
                                timestamp: new Date().toISOString()
                            });
                        }
                    }
                });
            }
        }
        
        // Store results in the request record under 'results'
        if (keyResults.length > 0) {
            if (!requestRecord.value.results) {
                requestRecord.value.results = {};
            }
            requestRecord.value.results['docs-present'] = {
                summary: {
                    total: keyResults.length,
                    passed: keyResults.filter(r => r.status === 'PASS').length,
                    failed: keyResults.filter(r => r.status === 'FAIL' || r.status === 'ERROR').length
                },
                results: keyResults
            };
        }
        
        // Update workflow to include test-docs-present
        requestRecord.headers.workflow = Array.from(new Set([...requestRecord.headers.workflow, 'test-docs-present']));
    }
    
    // Save updated record
    spl.wsSet(input, "gp/test", testApiRecord);
    
    spl.history(input, `test-docs-present: Completed documentation presence validation`);
    spl.completed(input);
}