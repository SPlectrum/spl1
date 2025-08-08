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

// Execute instantiation work package - test that modules can be required
exports.executeInstantiationPackage = function(testContext, workPackage) {
    const results = [];
    testContext.executionHistory.push(`Testing instantiation of ${workPackage.filePaths.length} modules`);
    
    for (const filePath of workPackage.filePaths) {
        const startTime = Date.now();
        
        try {
            // Clear require cache and attempt to require the module
            delete require.cache[require.resolve(filePath)];
            const module = require(filePath);
            
            if (module === undefined || module === null) {
                throw new Error('Module exports undefined or null');
            }
            
            results.push({
                type: 'instantiation',
                filePath: filePath,
                status: 'PASS',
                message: 'Module instantiated successfully',
                duration: Date.now() - startTime,
                timestamp: new Date().toISOString()
            });
            
            testContext.executionHistory.push(`✓ ${filePath}`);
            
        } catch (error) {
            results.push({
                type: 'instantiation',
                filePath: filePath,
                status: 'FAIL',
                message: `Instantiation failed: ${error.message}`,
                duration: Date.now() - startTime,
                timestamp: new Date().toISOString()
            });
            
            testContext.executionHistory.push(`✗ ${filePath} - ${error.message}`);
        }
    }
    
    return results;
};

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

// REPORT GENERATION

// Output report to stdout
exports.outputReport = function(report) {
    console.log("=".repeat(60));
    console.log(`TEST REPORT - ${report.requestKey}`);
    console.log("=".repeat(60));
    
    if (report.sections) {
        // Discovery section
        if (report.sections.discovery) {
            const disco = report.sections.discovery;
            console.log(`DISCOVERY: ${disco.summary.assets} assets`);
            disco.items.assets.forEach(asset => console.log(`  ${asset}`));
        }
        
        // Planning section  
        if (report.sections.plan) {
            const plan = report.sections.plan;
            console.log(`PLAN: ${plan.summary.workPackages} packages`);
            plan.items.workPackages.forEach(pkg => {
                console.log(`  ${pkg.type}:`);
                if (pkg.filePaths) {
                    pkg.filePaths.forEach(filePath => console.log(`    ${filePath}`));
                } else if (pkg.commands) {
                    pkg.commands.forEach(cmd => console.log(`    basic: ${cmd.testFile}`));
                }
            });
        }
        
        // Execution section
        if (report.sections.run) {
            const run = report.sections.run;
            const totalTime = run.items.results.reduce((sum, r) => sum + (r.duration || 0), 0);
            console.log(`RUN: ${totalTime}ms total`);
            
            const resultsByType = {};
            run.items.results.forEach(result => {
                if (!resultsByType[result.type]) resultsByType[result.type] = [];
                resultsByType[result.type].push(result);
            });
            
            Object.entries(resultsByType).forEach(([type, results]) => {
                const passed = results.filter(r => r.status === 'PASS').length;
                const failed = results.filter(r => r.status === 'FAIL' || r.status === 'ERROR').length;
                console.log(`  ${type}: ${passed} passed${failed > 0 ? `, ${failed} failed` : ''}`);
            });
        }
    }
    
    console.log("=".repeat(60));
};

// Generate comprehensive workflow report
exports.generateWorkflowReport = function(workflowData, options = {}) {
    const report = {
        title: "SPL Test Workflow Report",
        requestKey: workflowData.requestKey,
        patterns: workflowData.patterns,
        workflow: workflowData.workflow,
        sections: {},
        timestamp: new Date().toISOString()
    };
    
    // Add sections based on available workflow data
    if (workflowData.discovery) {
        report.sections.discovery = {
            title: "🔍 DISCOVERY PHASE",
            summary: { assets: workflowData.discovery.assets?.length || 0 },
            items: { assets: workflowData.discovery.assets || [] }
        };
    }
    
    if (workflowData.plan) {
        report.sections.plan = {
            title: "📋 PLANNING PHASE",
            summary: { workPackages: workflowData.plan.workPackages?.length || 0 },
            items: { workPackages: workflowData.plan.workPackages || [] }
        };
    }
    
    if (workflowData.run) {
        report.sections.run = {
            title: "⚡ EXECUTION PHASE",
            summary: workflowData.run.summary || {},
            items: { results: workflowData.run.results || [] }
        };
    }
    
    return report;
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

///////////////////////////////////////////////////////////////////////////////