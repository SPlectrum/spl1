//  name        Test API Auxiliary Functions
//  URI         gp/test/test
//  type        Auxiliary Library
//  description Clean, focused testing functions without unnecessary dependencies
///////////////////////////////////////////////////////////////////////////////
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { randomUUID } = require('crypto');
///////////////////////////////////////////////////////////////////////////////

// FILE SYSTEM UTILITIES

// Read file synchronously 
exports.readFileSync = function(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

// Convert full file path to relative module path for error reporting
exports.getRelativeModulePath = function(filePath, cwd) {
    return filePath.replace(cwd + '/', '').replace('/index.js', '');
}

// Path operations for discover functionality
exports.pathJoin = function(...pathSegments) {
    return path.join(...pathSegments);
}

exports.pathExists = function(filePath) {
    return fs.existsSync(filePath);
}

exports.readDirectoryRecursive = function(dirPath) {
    if (!fs.existsSync(dirPath)) {
        return [];
    }
    return fs.readdirSync(dirPath, { recursive: true });
}

exports.getFileStats = function(filePath) {
    return fs.statSync(filePath);
}

exports.isFile = function(filePath) {
    return fs.statSync(filePath).isFile();
}

// Path utilities for test methods
exports.pathBasename = function(filePath) {
    return path.basename(filePath);
}

exports.pathDirname = function(filePath) {
    return path.dirname(filePath);
}

exports.pathExtname = function(filePath) {
    return path.extname(filePath);
}

exports.pathResolve = function(...pathSegments) {
    return path.resolve(...pathSegments);
}

// Touch file - update timestamp
exports.touchFile = function(filePath) {
    const now = new Date();
    fs.utimesSync(filePath, now, now);
}

// Dynamic module require for testing (clear cache first)
exports.requireModule = function(filePath) {
    delete require.cache[require.resolve(filePath)];
    return require(filePath);
}

// Expected pattern messages for validation (avoid literal require patterns in test files)
exports.getExpectedRequirePattern = function(allowedApiRequire) {
    return `require("spl_lib") OR require("${allowedApiRequire}_lib")`;
}

// Check if line contains require pattern (avoid literal require patterns in validation files)
exports.containsRequirePattern = function(trimmedLine) {
    return /require\s*\(\s*['"]/. test(trimmedLine);
}


// DISCOVERY FUNCTIONS

// Simple file selector - returns file paths relative to install root
exports.discoverAssets = function(input, modulePattern, testPattern) {
    const assets = [];
    const spl = require("spl_lib");
    const cwd = spl.context(input, "cwd");
    
    // Determine if app or module from first part
    const parts = modulePattern.split('/');
    const firstPart = parts[0];
    
    let searchFolder;
    // Check if firstPart is an app name by checking if apps/[firstPart] directory exists
    const potentialAppPath = exports.pathJoin(cwd, 'apps', firstPart);
    if (exports.pathExists(potentialAppPath)) {
        // App
        searchFolder = exports.pathJoin(cwd, 'apps', firstPart, 'modules', parts.slice(1).join('/'));
    } else {
        // Module (including spl/, tools/, etc.)
        searchFolder = exports.pathJoin(cwd, 'modules', modulePattern);
    }
    
    // Select all files that match the selector
    if (exports.pathExists(searchFolder)) {
        const files = exports.readDirectoryRecursive(searchFolder);
        files.forEach(file => {
            const filePath = exports.pathJoin(searchFolder, file);
            if (exports.isFile(filePath)) {
                const stats = exports.getFileStats(filePath);
                let relativePath;
                if (exports.pathExists(potentialAppPath)) {
                    relativePath = `apps/${firstPart}/modules/${parts.slice(1).join('/')}/${file}`;
                } else {
                    relativePath = `modules/${modulePattern}/${file}`;
                }
                
                // Store file metadata for docs-current testing
                assets.push({
                    path: relativePath,
                    fullPath: filePath,
                    lastModified: stats.mtime.toISOString(),
                    size: stats.size
                });
            }
        });
    }
    
    return assets;
}

// Generate unique request key based on input patterns (primary key)
exports.generateRequestKey = function(modulePattern, testPattern, schemaPattern) {
    const patterns = [
        modulePattern || '*',
        testPattern || '*', 
        schemaPattern || 'none'
    ];
    
    return `|${patterns.join('||')}|`;
}

// PLANNING FUNCTIONS

// Create work packages from URI assets
exports.createWorkPackages = function(input, assets, options) {
    const { planType } = options;
    const spl = require("spl_lib");
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
                targetModule: exports.extractTargetModule(assetPath),
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
exports.extractTargetModule = function(assetPath) {
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

// WORK PACKAGE EXECUTION FUNCTIONS


// Execute JSON validation work package - test that JSON files are valid
exports.executeJsonValidationPackage = function(testContext, workPackage) {
    const results = [];
    testContext.executionHistory.push(`Validating JSON for ${workPackage.filePaths.length} files`);
    
    for (const filePath of workPackage.filePaths) {
        const startTime = Date.now();
        
        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const jsonData = JSON.parse(fileContent);
            
            if (jsonData === undefined || jsonData === null) {
                throw new Error('JSON parsed to null or undefined');
            }
            
            results.push({
                type: 'json-validation',
                filePath: filePath,
                status: 'PASS',
                message: 'JSON validation successful',
                duration: Date.now() - startTime,
                timestamp: new Date().toISOString()
            });
            
            testContext.executionHistory.push(`✓ ${filePath}`);
            
        } catch (error) {
            const relativePath = filePath.replace(/^.*\/spl-dev\//, '');
            results.push({
                type: 'json-validation',
                filePath: filePath,
                status: 'FAIL',
                message: `${relativePath}: ${error.message}`,
                duration: Date.now() - startTime,
                timestamp: new Date().toISOString()
            });
            
            testContext.executionHistory.push(`✗ ${relativePath} - ${error.message}`);
        }
    }
    
    return results;
};

// Execute basic test execution work package 
exports.executeBasicTestPackage = function(testContext, workPackage) {
    const results = [];
    testContext.executionHistory.push(`Executing basic tests for ${workPackage.commands?.length || 0} commands`);
    
    if (!workPackage.commands || workPackage.commands.length === 0) {
        return results;
    }
    
    for (const command of workPackage.commands) {
        const startTime = Date.now();
        const testDefinition = JSON.parse(fs.readFileSync(command.testFile, 'utf8'));
        
        // Use full filename as title for debugging clarity
        const testTitle = path.basename(command.testFile);
        
        testContext.executionHistory.push(`Running test: ${testTitle}`);
        
        const testStart = Date.now();
        
        let stdout = '';
        try {
            // Use command directly from test definition
            const testCommand = testDefinition.command;
            const splExecutePath = path.join(testContext.cwd, '..', 'spl_execute');
            const splCommand = `${splExecutePath} dev ${testCommand}`;
            stdout = execSync(splCommand, { 
                encoding: 'utf8', 
                timeout: 10000, 
                cwd: testContext.cwd 
            });
            
            // Extract JSON from SPL command output (text first, then JSON after final newline)
            const jsonStart = stdout.lastIndexOf('\n{');
            if (jsonStart === -1) {
                throw new Error('No JSON found in command output');
            }
            const jsonOutput = stdout.substring(jsonStart + 1); // Skip the newline
            
            // Parse JSON response and validate using selectors
            const response = JSON.parse(jsonOutput);
            const validationResult = validateJsonSelectors(response, testDefinition.selectors, testDefinition.expect);
            
            // Store extracted JSON and selector values in test context for debugging
            const extractedValues = {};
            for (const [key, selector] of Object.entries(testDefinition.selectors)) {
                const result = jsonPath(response, selector);
                extractedValues[key] = result.length === 1 ? result[0] : result;
            }
            
            // Create detailed test results structure
            const selectorResults = {};
            for (const [key, value] of Object.entries(extractedValues)) {
                selectorResults[key] = value;
            }
            
            const expectResults = {};
            for (const expectation of testDefinition.expect) {
                const actualValue = extractedValues[expectation.key];
                
                // Expand template variables in expected values
                let expectedValue = expectation.expectation;
                if (typeof expectedValue === 'string' && expectedValue.includes('{')) {
                    // Replace {appRoot} with actual appRoot value
                    expectedValue = expectedValue.replace(/\{appRoot\}/g, extractedValues.appRoot || 'apps/gp');
                }
                
                let passed = false;
                
                // Determine if this specific expectation passed
                switch (expectation.operation) {
                    case 'equals':
                        passed = actualValue === expectedValue;
                        break;
                    case 'contains':
                        if (Array.isArray(actualValue)) {
                            passed = actualValue.some(item => 
                                typeof item === 'string' && item.includes(expectedValue));
                        } else if (typeof actualValue === 'string') {
                            passed = actualValue.includes(expectedValue);
                        }
                        break;
                }
                
                expectResults[expectation.key] = {
                    actual: actualValue,
                    operation: expectation.operation,
                    expected: expectedValue,  // Store the expanded value
                    expectedTemplate: expectation.expectation,  // Keep original template for reference
                    passed: passed
                };
            }
            
            testContext.lastTestDetails = {
                testFile: command.testFile,
                testTitle: testTitle,
                executedCommand: testCommand,
                responseStatus: response.headers?.spl?.execute?.status,
                responseSize: jsonOutput.length,
                selectorResults: selectorResults,
                expectResults: expectResults,
                validationResult: validationResult
            };
            
            let message;
            if (validationResult.passed) {
                message = 'Test passed';
            } else {
                // Check if there's an error message from errorMessage selector
                const errorMessage = extractedValues.errorMessage;
                if (errorMessage && typeof errorMessage === 'string' && errorMessage.trim() !== '') {
                    // Strip "Error: " prefix if present to avoid duplication
                    const cleanError = errorMessage.replace(/^Error:\s*/, '');
                    // If there's an execution error, just show that (skip expectation details)
                    message = `${testTitle}\n${testCommand}\n${cleanError}\n`;
                } else {
                    // No execution error, show expectation failure
                    message = `${testTitle}\n${testCommand}\n${validationResult.error}\n`;
                }
            }
            
            results.push({
                type: 'basic-test',
                testFile: command.testFile,
                testName: testTitle,
                status: validationResult.passed ? 'PASS' : 'FAIL',
                message: message,
                executedCommand: testCommand,
                duration: Date.now() - testStart,
                timestamp: new Date().toISOString(),
                // Include detailed results for both PASS and FAIL
                responseStatus: response.headers?.spl?.execute?.status,
                responseSize: jsonOutput.length,
                selectorResults: selectorResults,
                expectResults: expectResults,
                validationResult: validationResult
            });
            
            testContext.executionHistory.push(`${validationResult.passed ? 'PASS' : 'FAIL'} - ${testTitle}`);
            
        } catch (error) {
            const testCommand = testDefinition.command;
            
            // Store debug info even on error
            const fs = require('fs');
            const debugInfo = {
                error: error.message,
                stdout: stdout.substring(0, 1000) + (stdout.length > 1000 ? '...' : ''),
                jsonStart: stdout.lastIndexOf('\n{'),
                extractedJson: stdout.lastIndexOf('\n{') !== -1 ? 
                    stdout.substring(stdout.lastIndexOf('\n{') + 1, stdout.lastIndexOf('\n{') + 300) + '...' : 'NO JSON FOUND',
                testFile: command.testFile,
                testTitle: testTitle
            };
            fs.writeFileSync(`/tmp/debug-${testTitle.replace(/[^a-z0-9]/gi, '-')}.json`, JSON.stringify(debugInfo, null, 2));
            
            // Multi-line format: test name, command, error, empty line
            const message = `${testTitle}\n${testCommand}\n${error.message}\n`;
            
            results.push({
                type: 'basic-test',
                testFile: command.testFile,
                testName: testTitle,
                status: 'ERROR',
                message: message,
                executedCommand: testCommand,
                duration: Date.now() - startTime,
                timestamp: new Date().toISOString()
            });
            
            testContext.executionHistory.push(`ERROR - ${testTitle}: ${error.message}`);
        }
    }
    
    return results;
};

// UTILITY FUNCTIONS

// Build SPL command from test case with session isolation
function buildTestCommand(testCase, appDataRoot) {
    let baseCommand = testCase.action;
    
    if (testCase.params) {
        const args = Object.entries(testCase.params)
            .map(([key, value]) => `--${key}="${value}"`)
            .join(' ');
        baseCommand = `${baseCommand} ${args}`;
    }
    
    // Add session setup for isolation
    const sessionSetup = `gp/config/set-session-working-dir --path=${appDataRoot}`;
    return `${sessionSetup} @@ ${baseCommand}`;
}

// Extract expected text from expectation pattern
function extractExpectedText(expectedPattern) {
    const match = expectedPattern.match(/"([^"]+)"/);
    return match ? match[1] : '';
}


// Validate JSON response using selectors and expectations
function validateJsonSelectors(response, selectors, expectations) {
    try {
        const extractedValues = {};
        
        // Extract values using JSONPath selectors
        for (const [key, selector] of Object.entries(selectors)) {
            const result = jsonPath(response, selector);
            extractedValues[key] = result.length === 1 ? result[0] : result;
        }
        
        // Validate each expectation
        for (const expectation of expectations) {
            const actualValue = extractedValues[expectation.key];
            
            // Expand template variables in expected values
            let expectedValue = expectation.expectation;
            if (typeof expectedValue === 'string' && expectedValue.includes('{')) {
                // Replace {appRoot} with actual appRoot value
                expectedValue = expectedValue.replace(/\{appRoot\}/g, extractedValues.appRoot || 'apps/gp');
            }
            
            switch (expectation.operation) {
                case 'equals':
                    if (actualValue !== expectedValue) {
                        return {
                            passed: false,
                            error: `Expected ${expectation.key} to equal "${expectedValue}", but got "${actualValue}"`
                        };
                    }
                    break;
                    
                case 'contains':
                    if (Array.isArray(actualValue)) {
                        if (!actualValue.some(item => item.includes(expectedValue))) {
                            return {
                                passed: false,
                                error: `Expected ${expectation.key} array to contain "${expectedValue}", but none matched`
                            };
                        }
                    } else if (typeof actualValue === 'string') {
                        if (!actualValue.includes(expectedValue)) {
                            return {
                                passed: false,
                                error: `Expected ${expectation.key} to contain "${expectedValue}", but got "${actualValue}"`
                            };
                        }
                    } else {
                        return {
                            passed: false,
                            error: `Cannot perform contains operation on ${expectation.key} of type ${typeof actualValue}`
                        };
                    }
                    break;
                    
                default:
                    return {
                        passed: false,
                        error: `Unsupported operation: ${expectation.operation}`
                    };
            }
        }
        
        return { passed: true };
        
    } catch (error) {
        return {
            passed: false,
            error: `Selector validation error: ${error.message}`
        };
    }
}

// Enhanced JSONPath implementation with filtering support
function jsonPath(obj, path) {
    if (path === '$') return [obj];
    
    const parts = path.replace('$', '').split('.').filter(Boolean);
    let current = [obj];
    
    for (const part of parts) {
        const next = [];
        
        for (const item of current) {
            if (part.includes('[?')) {
                // Handle filtering: [?(condition)]
                const filterMatch = part.match(/([^[]*)\[\?\(([^)]+)\)\](.*)$/);
                if (filterMatch) {
                    const [, arrayKey, condition, remainder] = filterMatch;
                    const targetArray = arrayKey ? item[arrayKey] : item;
                    
                    if (Array.isArray(targetArray)) {
                        const filtered = targetArray.filter(elem => evaluateFilterCondition(elem, condition));
                        
                        // If there's a remainder (like [2] to get third element), apply it
                        if (remainder) {
                            if (remainder.startsWith('[') && remainder.endsWith(']')) {
                                const indexMatch = remainder.match(/\[(\d+)\]/);
                                if (indexMatch) {
                                    const index = parseInt(indexMatch[1]);
                                    for (const filteredElem of filtered) {
                                        if (Array.isArray(filteredElem) && filteredElem[index] !== undefined) {
                                            next.push(filteredElem[index]);
                                        }
                                    }
                                }
                            }
                        } else {
                            next.push(...filtered);
                        }
                    }
                }
            } else if (part.includes('[*]')) {
                const arrayKey = part.replace('[*]', '');
                if (arrayKey && item[arrayKey] && Array.isArray(item[arrayKey])) {
                    next.push(...item[arrayKey]);
                } else if (!arrayKey && Array.isArray(item)) {
                    next.push(...item);
                }
            } else if (part.includes('[') && part.includes(']')) {
                const match = part.match(/([^[]+)\[(\d+)\]/);
                if (match) {
                    const [, arrayKey, index] = match;
                    if (item[arrayKey] && Array.isArray(item[arrayKey])) {
                        const element = item[arrayKey][parseInt(index)];
                        if (element !== undefined) next.push(element);
                    }
                }
            } else {
                if (item && item[part] !== undefined) {
                    next.push(item[part]);
                }
            }
        }
        
        current = next;
    }
    
    return current;
}

// Evaluate filter conditions for JSONPath filtering
function evaluateFilterCondition(element, condition) {
    // Handle conditions like: @[0]=='method-name' && @[1]=='action' && @[2]!=''
    
    // Split by && for multiple conditions
    const conditions = condition.split('&&').map(c => c.trim());
    
    for (const cond of conditions) {
        if (!evaluateSingleCondition(element, cond)) {
            return false;
        }
    }
    
    return true;
}

// Evaluate single condition
function evaluateSingleCondition(element, condition) {
    // Handle @[index] == 'value' or @[index] != 'value'
    const equalMatch = condition.match(/@\[(\d+)\]==['"]([^'"]+)['"]/);
    if (equalMatch) {
        const [, index, value] = equalMatch;
        return Array.isArray(element) && element[parseInt(index)] === value;
    }
    
    const notEqualMatch = condition.match(/@\[(\d+)\]!=['"]([^'"]*)['"]/);
    if (notEqualMatch) {
        const [, index, value] = notEqualMatch;
        const actualValue = Array.isArray(element) ? element[parseInt(index)] : undefined;
        return actualValue !== value;
    }
    
    // Handle @[index]!='' (not empty string)
    const notEmptyMatch = condition.match(/@\[(\d+)\]!=['"]['"]$/);
    if (notEmptyMatch) {
        const [, index] = notEmptyMatch;
        const actualValue = Array.isArray(element) ? element[parseInt(index)] : undefined;
        return actualValue !== '' && actualValue !== undefined;
    }
    
    return false;
}

// Generate execution summary
exports.generateExecutionSummary = function(results) {
    const summary = { total: results.length, passed: 0, failed: 0, errors: 0 };
    
    for (const result of results) {
        switch (result.status) {
            case 'PASS': summary.passed++; break;
            case 'FAIL': summary.failed++; break;
            case 'ERROR': summary.errors++; break;
        }
    }
    
    return summary;
};

// WORKSPACE MANAGEMENT FUNCTIONS

// Create unique test workspace directory
exports.createUniqueWorkspace = function(baseDir) {
    const timestamp = Date.now();
    const uuid = randomUUID().substring(0, 8);
    const uniqueWorkspace = path.join(baseDir, `test-${timestamp}-${uuid}`);
    
    // Create the unique workspace directory
    fs.mkdirSync(uniqueWorkspace, { recursive: true });
    
    return uniqueWorkspace;
};

// Remove test workspace directory
exports.removeWorkspace = function(workspacePath) {
    if (fs.existsSync(workspacePath)) {
        // Safety check - only remove test workspace paths (must contain 'test-' pattern)
        if (!path.basename(workspacePath).startsWith('test-')) {
            throw new Error(`Safety violation: Can only remove test workspace directories (test-*), got: ${workspacePath}`);
        }
        
        fs.rmSync(workspacePath, { recursive: true, force: true });
        return true;
    }
    return false;
};

// WORKSPACE ASSET CAPTURE AND CLEANUP FUNCTIONS

// Capture all assets (files and directories) in workspace for audit
exports.captureWorkspaceAssets = function(workspacePath) {
    const assets = {
        files: [],
        directories: [],
        totalSize: 0,
        captureTime: new Date().toISOString()
    };
    
    if (!fs.existsSync(workspacePath)) {
        return assets;
    }
    
    // Recursively scan workspace directory
    scanDirectory(workspacePath, workspacePath, assets);
    return assets;
};

// Recursively scan directory and capture file/folder information
function scanDirectory(dirPath, basePath, assets) {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const item of items) {
        const fullPath = path.join(dirPath, item.name);
        const relativePath = path.relative(basePath, fullPath);
        
        if (item.isFile()) {
            const stats = fs.statSync(fullPath);
            const fileAsset = {
                path: relativePath,
                size: stats.size,
                modified: stats.mtime.toISOString(),
                permissions: stats.mode.toString(8)
            };
            
            // For small files, include content sample for debugging
            if (stats.size > 0 && stats.size <= 1000) {
                const content = fs.readFileSync(fullPath, 'utf8');
                fileAsset.contentSample = content.substring(0, 200);
                if (content.length > 200) fileAsset.contentSample += '...';
            }
            
            assets.files.push(fileAsset);
            assets.totalSize += stats.size;
            
        } else if (item.isDirectory()) {
            assets.directories.push({
                path: relativePath,
                modified: fs.statSync(fullPath).mtime.toISOString()
            });
            
            // Recurse into subdirectory
            scanDirectory(fullPath, basePath, assets);
        }
    }
}

///////////////////////////////////////////////////////////////////////////////