//  name        File Type Validation
//  URI         gp/test/test-file-type
//  type        API Method
//  description Validates folder structure: regular folders contain only README.md, index.js, 
//              and [parent-folder-name].js files; .test folders contain only .json files 
//              prefixed with valid test types
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const testLib = require("gp_test_lib");
///////////////////////////////////////////////////////////////////////////////

// Valid test type prefixes for .test folder validation
const VALID_TEST_TYPES = ['basic-test', 'instantiation', 'json-validation', 'docs-present', 'docs-current', 'file-type'];

// IMPLEMENTATION - File Type Validation Testing (Blanket Coverage: All)
exports.default = function gp_test_test_file_type(input) {
    const testApiRecord = spl.wsRef(input, "gp/test");
    
    // Process all request records (blanket coverage: all)
    for (const requestKey in testApiRecord.value) {
        const requestRecord = testApiRecord.value[requestKey];
        const workPackages = requestRecord.value.plan?.workPackages || [];
        const keyResults = [];
        
        // Process all file-type work packages in this request
        for (const workPackage of workPackages) {
            if (workPackage.type === 'file-type') {
                // Group files by directory and track all directories
                const folderMap = {};
                const allDirectories = new Set();
                
                workPackage.assets.forEach(asset => {
                    const filePath = asset.path;
                    const fullPath = asset.fullPath;
                    const dir = testLib.pathDirname(fullPath);
                    const fileName = testLib.pathBasename(fullPath);
                    
                    // Track all directories from the path
                    const pathParts = filePath.split('/');
                    for (let i = 0; i < pathParts.length - 1; i++) {
                        const dirPath = pathParts.slice(0, i + 1).join('/');
                        allDirectories.add(dirPath);
                    }
                    
                    if (!folderMap[dir]) {
                        const isTestFolder = filePath.includes('/.test/');
                        // For test folders, get parent path (remove /.test part)
                        let relativePath;
                        if (isTestFolder) {
                            relativePath = filePath.substring(0, filePath.indexOf('/.test'));
                        } else {
                            relativePath = filePath.substring(0, filePath.lastIndexOf('/'));
                        }
                        
                        folderMap[dir] = { 
                            files: [], 
                            isTestFolder: isTestFolder,
                            relativePath: relativePath
                        };
                    }
                    
                    folderMap[dir].files.push(fileName);
                });
                
                // Validate folder structure - only .test allowed as dot-prefixed subfolder
                allDirectories.forEach(dirPath => {
                    const pathParts = dirPath.split('/');
                    for (let i = 0; i < pathParts.length; i++) {
                        const part = pathParts[i];
                        if (part.startsWith('.') && part !== '.test') {
                            keyResults.push({
                                type: 'file-type',
                                folderPath: dirPath,
                                status: 'FAIL',
                                message: dirPath,
                                duration: 0,
                                timestamp: new Date().toISOString()
                            });
                        }
                    }
                });
                
                // Validate each folder
                Object.entries(folderMap).forEach(([dir, folderInfo]) => {
                    const startTime = Date.now();
                    const { files, isTestFolder, relativePath } = folderInfo;
                    
                    if (isTestFolder) {
                        // .test folder validation: only .json files with valid test type prefixes
                        const results = [];
                        
                        for (const file of files) {
                            if (!file.endsWith('.json')) {
                                results.push({
                                    type: 'file-type',
                                    folderPath: relativePath,
                                    status: 'FAIL',
                                    message: `${relativePath}/.test/${file}`,
                                    duration: Date.now() - startTime,
                                    timestamp: new Date().toISOString()
                                });
                                continue;
                            }
                            
                            // Check for valid test type prefix
                            const hasValidPrefix = VALID_TEST_TYPES.some(testType => 
                                file.startsWith(`${testType}__`)
                            );
                            
                            if (!hasValidPrefix) {
                                results.push({
                                    type: 'file-type',
                                    folderPath: relativePath,
                                    status: 'FAIL',
                                    message: `${relativePath}/.test/${file}`,
                                    duration: Date.now() - startTime,
                                    timestamp: new Date().toISOString()
                                });
                            }
                        }
                        
                        // If all files are valid, return single pass result
                        if (results.length === 0) {
                            results.push({
                                type: 'file-type',
                                folderPath: relativePath,
                                status: 'PASS',
                                message: `Test folder structure valid (${files.length} test files)`,
                                duration: Date.now() - startTime,
                                timestamp: new Date().toISOString()
                            });
                        }
                        
                        keyResults.push(...results);
                    } else {
                        // Regular folder validation: only README.md, index.js, and [parent-folder-name].js
                        const allowedFiles = ['README.md', 'index.js', 'index_arguments.json'];
                        
                        // Extract parent folder name for additional allowed file
                        const parentFolderName = testLib.pathBasename(dir);
                        const parentJsFile = `${parentFolderName}.js`;
                        allowedFiles.push(parentJsFile);
                        
                        // Filter out dot-prefixed files (hidden files/folders)
                        const regularFiles = files.filter(file => !file.startsWith('.'));
                        
                        // Check for invalid files - create individual results for each
                        const invalidFiles = regularFiles.filter(file => !allowedFiles.includes(file));
                        const results = [];
                        
                        for (const file of invalidFiles) {
                            results.push({
                                type: 'file-type',
                                folderPath: relativePath,
                                status: 'FAIL',
                                message: `${relativePath}/${file}`,
                                duration: Date.now() - startTime,
                                timestamp: new Date().toISOString()
                            });
                        }
                        
                        // If all files are valid, return single pass result
                        if (results.length === 0) {
                            results.push({
                                type: 'file-type',
                                folderPath: relativePath,
                                status: 'PASS',
                                message: `Folder structure valid (${regularFiles.length} files)`,
                                duration: Date.now() - startTime,
                                timestamp: new Date().toISOString()
                            });
                        }
                        
                        keyResults.push(...results);
                    }
                });
            }
        }
        
        // Store results in the request record under 'results'
        if (keyResults.length > 0) {
            if (!requestRecord.value.results) {
                requestRecord.value.results = {};
            }
            requestRecord.value.results['file-type'] = {
                summary: {
                    total: keyResults.length,
                    passed: keyResults.filter(r => r.status === 'PASS').length,
                    failed: keyResults.filter(r => r.status === 'FAIL' || r.status === 'ERROR').length
                },
                results: keyResults
            };
        }
        
        // Update workflow to include test-file-type
        requestRecord.headers.workflow = Array.from(new Set([...requestRecord.headers.workflow, 'test-file-type']));
    }
    
    // Save updated record
    spl.wsSet(input, "gp/test", testApiRecord);
    
    spl.history(input, `test-file-type: Completed file type validation`);
    spl.completed(input);
}
