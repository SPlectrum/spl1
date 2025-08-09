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
            results.push({
                type: 'json-validation',
                filePath: filePath,
                status: 'FAIL',
                message: `JSON validation failed: ${error.message}`,
                duration: Date.now() - startTime,
                timestamp: new Date().toISOString()
            });
            
            testContext.executionHistory.push(`✗ ${filePath} - ${error.message}`);
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
        const testResults = [];
        
        testContext.executionHistory.push(`Running test suite: ${testDefinition.name}`);
        
        // Execute each test in the suite
        for (const test of testDefinition.tests) {
            const testStart = Date.now();
            
            try {
                // Build and execute SPL command
                const fullCommand = buildTestCommand(test, testContext.appDataRoot);
                const splCommand = `/home/herma/splectrum/spl1/spl_execute dev -d ${fullCommand}`;
                const stdout = execSync(splCommand, { 
                    encoding: 'utf8', 
                    timeout: 10000, 
                    cwd: testContext.cwd 
                });
                
                // Simple validation based on expected outcomes
                const hasError = stdout.includes('ERROR') || stdout.includes('failed');
                const hasExpectedText = test.expect?.history ? 
                    stdout.includes(extractExpectedText(test.expect.history)) : true;
                
                const status = (!hasError && hasExpectedText) ? 'PASS' : 'FAIL';
                
                testResults.push({
                    testName: test.name,
                    action: test.action,
                    status: status,
                    executedCommand: splCommand,
                    duration: Date.now() - testStart,
                    timestamp: new Date().toISOString()
                });
                
                testContext.executionHistory.push(`${status} - ${test.name}`);
                
            } catch (error) {
                testResults.push({
                    testName: test.name,
                    action: test.action,
                    status: 'ERROR',
                    message: error.message,
                    duration: Date.now() - testStart,
                    timestamp: new Date().toISOString()
                });
                
                testContext.executionHistory.push(`ERROR - ${test.name}: ${error.message}`);
            }
        }
        
        results.push({
            type: 'test-execution',
            testFile: command.testFile,
            testName: testDefinition.name,
            status: testResults.every(r => r.status === 'PASS') ? 'PASS' : 'FAIL',
            message: `${testResults.filter(r => r.status === 'PASS').length}/${testResults.length} tests passed`,
            testResults: testResults,
            duration: Date.now() - startTime,
            timestamp: new Date().toISOString()
        });
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