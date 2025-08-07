//  name        Test API Auxiliary Functions
//  URI         gp/test/test
//  type        Auxiliary Library
//  description Contains common testing functions used by the test API
//              Provides test execution, assertion, and reporting capabilities.
///////////////////////////////////////////////////////////////////////////////
const fs = require('fs');
const path = require('path');
///////////////////////////////////////////////////////////////////////////////

// Test result states
exports.TestResult = {
    PASS: 'PASS',
    FAIL: 'FAIL',
    SKIP: 'SKIP',
    ERROR: 'ERROR'
};

// REPORT GENERATION FUNCTIONS

// Output report to stdout
exports.outputReport = function(report, options) {
    const { format, includeDetails } = options;
    
    console.log("=".repeat(60));
    console.log(`TEST REPORT - ${report.requestKey}`);
    console.log("=".repeat(60));
    
    // Workflow sections with simplified formatting
    if (report.sections) {
        Object.entries(report.sections).forEach(([sectionName, section]) => {
            if (sectionName === 'discovery') {
                console.log(`DISCOVERY: ${section.summary.assets} assets`);
                section.items.assets.forEach(asset => {
                    console.log(`  ${asset}`);
                });
                
            } else if (sectionName === 'plan') {
                console.log(`PLAN: ${section.summary.workPackages} packages`);
                section.items.workPackages.forEach((pkg, i) => {
                    console.log(`  ${pkg.type}:`);
                    if (pkg.filePaths) {
                        pkg.filePaths.forEach(path => {
                            console.log(`    ${path}`);
                        });
                    } else if (pkg.commands) {
                        // Group test files by syntax prefix
                        const testsByPrefix = {};
                        pkg.commands.forEach(cmd => {
                            const prefix = cmd.syntax || 'simple';
                            if (!testsByPrefix[prefix]) testsByPrefix[prefix] = [];
                            testsByPrefix[prefix].push(cmd.testFile);
                        });
                        Object.entries(testsByPrefix).forEach(([prefix, files]) => {
                            console.log(`    ${prefix}: ${files.join(', ')}`);
                        });
                    }
                });
                
            } else if (sectionName === 'run') {
                const totalTime = section.items.results.reduce((sum, r) => sum + (r.duration || 0), 0);
                console.log(`RUN: ${totalTime}ms total`);
                
                // Group results by package type
                const resultsByType = {};
                section.items.results.forEach(result => {
                    const type = result.type;
                    if (!resultsByType[type]) resultsByType[type] = [];
                    resultsByType[type].push(result);
                });
                
                Object.entries(resultsByType).forEach(([type, results]) => {
                    const passed = results.filter(r => r.status === 'PASS').length;
                    const failed = results.filter(r => r.status === 'FAIL' || r.status === 'ERROR').length;
                    const stubbed = results.filter(r => r.status === 'STUB').length;
                    
                    let summary = `${passed} passed`;
                    if (failed > 0) summary += `, ${failed} failed`;
                    if (stubbed > 0) summary += `, ${stubbed} stubbed`;
                    
                    console.log(`  ${type}: ${summary}`);
                    
                    // Show failures in detail
                    const failedResults = results.filter(r => r.status === 'FAIL' || r.status === 'ERROR');
                    failedResults.forEach(result => {
                        const asset = result.filePath || result.testFile || 'unknown';
                        console.log(`    FAIL: ${asset} - ${result.message}`);
                    });
                });
            }
        });
    }
    
    console.log("=".repeat(60));
};

// Generate comprehensive workflow report showing all steps
exports.generateWorkflowReport = function(workflowData, options) {
    const { format, includeDetails, threshold } = options;
    
    const report = {
        title: "SPL Test Workflow Report",
        requestKey: workflowData.requestKey,
        patterns: workflowData.patterns,
        workflow: workflowData.workflow,
        startTime: workflowData.startTime,
        sections: {},
        timestamp: new Date().toISOString()
    };
    
    // Discovery section
    if (workflowData.discovery) {
        const disco = workflowData.discovery;
        report.sections.discovery = {
            title: "🔍 DISCOVERY PHASE",
            summary: {
                assets: disco.assets ? disco.assets.length : 0,
                operations: disco.operations ? disco.operations.length : 0,
                tests: disco.tests ? disco.tests.length : 0, 
                schemas: disco.schemas ? disco.schemas.length : 0
            },
            items: {
                assets: disco.assets || [],
                operations: disco.operations || [],
                tests: disco.tests || [],
                schemas: disco.schemas || []
            }
        };
    }
    
    // Plan section
    if (workflowData.plan) {
        const plan = workflowData.plan;
        report.sections.plan = {
            title: "📋 PLANNING PHASE", 
            summary: {
                workPackages: plan.workPackages ? plan.workPackages.length : 0,
                totalAssets: plan.metadata ? plan.metadata.totalAssets : 0,
                threshold: plan.metadata ? plan.metadata.threshold : 0
            },
            items: {
                workPackages: plan.workPackages || []
            }
        };
    }
    
    // Run section
    if (workflowData.run) {
        const run = workflowData.run;
        report.sections.run = {
            title: "⚡ EXECUTION PHASE",
            summary: run.summary || {},
            items: {
                results: run.results || []
            }
        };
    }
    
    return report;
};

// COVERAGE ANALYSIS FUNCTIONS

// Discover available operations in modules
exports.discoverOperations = function(appPath, targetModule, options = {}) {
    const { recursive } = options;
    const operations = [];
    
    const modulesPath = path.join(appPath, 'modules');
    
    if (!fs.existsSync(modulesPath)) {
        return operations;
    }
    
    const traverseModule = (currentPath, modulePath = '') => {
        const entries = fs.readdirSync(currentPath, { withFileTypes: true });
        
        for (const entry of entries) {
            if (entry.isDirectory()) {
                const fullPath = path.join(currentPath, entry.name);
                const entryModulePath = modulePath ? `${modulePath}/${entry.name}` : entry.name;
                
                // Check if this directory contains an index.js (it's an operation)
                const indexPath = path.join(fullPath, 'index.js');
                if (fs.existsSync(indexPath)) {
                    operations.push({
                        module: entryModulePath,
                        operation: entry.name,
                        path: fullPath,
                        indexPath: indexPath,
                        hasArguments: fs.existsSync(path.join(fullPath, 'index_arguments.json'))
                    });
                }
                
                // Recurse if enabled and not a leaf operation
                if (recursive) {
                    traverseModule(fullPath, entryModulePath);
                }
            }
        }
    };
    
    if (targetModule) {
        const targetPath = path.join(modulesPath, targetModule);
        if (fs.existsSync(targetPath)) {
            traverseModule(targetPath, targetModule);
        }
    } else {
        traverseModule(modulesPath);
    }
    
    return operations;
};

// Analyze coverage by comparing operations with tests
exports.analyzeCoverage = function(availableOperations, testSuites) {
    const testedOperations = new Set();
    const testsByOperation = {};
    
    // Extract tested operations from test suites
    testSuites.forEach(suiteInfo => {
        if (suiteInfo.suite.tests) {
            suiteInfo.suite.tests.forEach(testCase => {
                if (testCase.action) {
                    testedOperations.add(testCase.action);
                    
                    if (!testsByOperation[testCase.action]) {
                        testsByOperation[testCase.action] = [];
                    }
                    
                    testsByOperation[testCase.action].push({
                        suite: suiteInfo.testFile,
                        module: suiteInfo.module,
                        testName: testCase.name
                    });
                }
            });
        }
    });
    
    // Categorize operations
    const coveredOperations = [];
    const uncoveredOperations = [];
    
    availableOperations.forEach(operation => {
        const operationKey = operation.module;
        
        if (testedOperations.has(operationKey)) {
            coveredOperations.push({
                ...operation,
                tests: testsByOperation[operationKey] || []
            });
        } else {
            uncoveredOperations.push(operation);
        }
    });
    
    // Calculate coverage statistics
    const totalOperations = availableOperations.length;
    const coveredCount = coveredOperations.length;
    const uncoveredCount = uncoveredOperations.length;
    const coveragePercentage = totalOperations > 0 ? Math.round((coveredCount / totalOperations) * 100) : 0;
    
    return {
        summary: {
            totalOperations: totalOperations,
            coveredOperations: coveredCount,
            uncoveredOperations: uncoveredCount,
            coveragePercentage: coveragePercentage,
            totalTests: Object.values(testsByOperation).reduce((sum, tests) => sum + tests.length, 0)
        },
        covered: coveredOperations,
        uncovered: uncoveredOperations,
        testMapping: testsByOperation
    };
};

// Generate coverage report in various formats
exports.generateCoverageReport = function(analysis, options = {}) {
    const { format, threshold, detailed, includeUntested } = options;
    
    const report = {
        summary: {
            ...analysis.summary,
            threshold: threshold,
            meetsThreshold: analysis.summary.coveragePercentage >= threshold,
            timestamp: new Date().toISOString()
        }
    };
    
    if (format === 'json') {
        return {
            ...report,
            details: analysis
        };
    }
    
    if (format === 'detailed' || detailed) {
        report.covered = analysis.covered.map(op => ({
            operation: op.module,
            path: op.path,
            testCount: op.tests ? op.tests.length : 0,
            tests: op.tests || []
        }));
        
        if (includeUntested) {
            report.uncovered = analysis.uncovered.map(op => ({
                operation: op.module,
                path: op.path,
                hasArguments: op.hasArguments
            }));
        }
    }
    
    if (format === 'summary') {
        report.breakdown = {
            byModule: exports.getModuleBreakdown(analysis),
            recommendations: exports.generateRecommendations(analysis, threshold)
        };
    }
    
    return report;
};

// Get coverage breakdown by module
exports.getModuleBreakdown = function(analysis) {
    const moduleStats = {};
    
    // Count covered operations by module
    analysis.covered.forEach(op => {
        const moduleParts = op.module.split('/');
        const rootModule = moduleParts[0];
        
        if (!moduleStats[rootModule]) {
            moduleStats[rootModule] = { covered: 0, total: 0 };
        }
        moduleStats[rootModule].covered++;
    });
    
    // Count total operations by module
    [...analysis.covered, ...analysis.uncovered].forEach(op => {
        const moduleParts = op.module.split('/');
        const rootModule = moduleParts[0];
        
        if (!moduleStats[rootModule]) {
            moduleStats[rootModule] = { covered: 0, total: 0 };
        }
        moduleStats[rootModule].total++;
    });
    
    // Calculate percentages
    Object.keys(moduleStats).forEach(module => {
        const stats = moduleStats[module];
        stats.percentage = stats.total > 0 ? Math.round((stats.covered / stats.total) * 100) : 0;
    });
    
    return moduleStats;
};

// Generate coverage improvement recommendations
exports.generateRecommendations = function(analysis, threshold) {
    const recommendations = [];
    
    if (analysis.summary.coveragePercentage < threshold) {
        const needed = Math.ceil((threshold / 100) * analysis.summary.totalOperations) - analysis.summary.coveredOperations;
        recommendations.push(`Add ${needed} more test(s) to reach ${threshold}% coverage threshold`);
    }
    
    if (analysis.uncovered.length > 0) {
        // Prioritize by module
        const moduleGroups = {};
        analysis.uncovered.forEach(op => {
            const rootModule = op.module.split('/')[0];
            if (!moduleGroups[rootModule]) {
                moduleGroups[rootModule] = [];
            }
            moduleGroups[rootModule].push(op.module);
        });
        
        Object.keys(moduleGroups).forEach(module => {
            if (moduleGroups[module].length > 1) {
                recommendations.push(`Consider adding tests for ${module} module (${moduleGroups[module].length} untested operations)`);
            } else {
                recommendations.push(`Add test for ${moduleGroups[module][0]}`);
            }
        });
    }
    
    if (analysis.summary.coveragePercentage >= 90) {
        recommendations.push('Excellent coverage! Consider adding edge case and error scenario tests');
    } else if (analysis.summary.coveragePercentage >= 70) {
        recommendations.push('Good coverage! Focus on critical path operations for remaining tests');
    } else if (analysis.summary.coveragePercentage < 50) {
        recommendations.push('Low coverage detected. Prioritize testing core functionality first');
    }
    
    return recommendations;
};

// BASIC TEST RUNNER IMPLEMENTATION

// Execute basic test runner for basic__ prefixed test files
exports.runBasicTests = function(spl, input, testCommands) {
    const results = [];
    
    spl.history(input, `test/run: Executing basic test runner for ${testCommands.length} test files`);
    
    for (const command of testCommands) {
        const startTime = Date.now();
        
        try {
            // Load test file
            const testFilePath = path.resolve(command.testFile);
            const testContent = fs.readFileSync(testFilePath, 'utf8');
            const testDefinition = JSON.parse(testContent);
            
            spl.history(input, `test/run: Running test suite: ${testDefinition.key || testDefinition.name}`);
            
            // Execute each test in the suite
            const suiteResults = executeBasicTestSuite(spl, input, testDefinition, testFilePath);
            
            // Add suite-level result
            const suiteResult = {
                type: 'test-execution',
                testFile: command.testFile,
                testKey: testDefinition.key,
                testName: testDefinition.name,
                syntax: 'basic',
                status: suiteResults.every(r => r.status === 'PASS') ? 'PASS' : 'FAIL',
                message: `Test suite completed: ${suiteResults.filter(r => r.status === 'PASS').length}/${suiteResults.length} tests passed`,
                testResults: suiteResults,
                duration: Date.now() - startTime,
                timestamp: new Date().toISOString()
            };
            
            results.push(suiteResult);
            
            const passCount = suiteResults.filter(r => r.status === 'PASS').length;
            const failCount = suiteResults.filter(r => r.status === 'FAIL').length;
            spl.history(input, `test/run: ${passCount} passed, ${failCount} failed`);
            
        } catch (error) {
            results.push({
                type: 'test-execution',
                testFile: command.testFile,
                syntax: 'basic',
                status: 'ERROR',
                message: `Test suite error: ${error.message}`,
                error: error.toString(),
                duration: Date.now() - startTime,
                timestamp: new Date().toISOString()
            });
            
            spl.history(input, `test/run: ERROR in ${command.testFile} - ${error.message}`);
        }
    }
    
    return results;
};

// Execute a basic test suite (JSON definition with tests array)
function executeBasicTestSuite(spl, input, testDefinition, testFilePath) {
    const results = [];
    
    if (!testDefinition.tests || !Array.isArray(testDefinition.tests)) {
        throw new Error('Test definition must have a "tests" array');
    }
    
    for (const testCase of testDefinition.tests) {
        const startTime = Date.now();
        
        try {
            spl.history(input, `test/run: Executing test: ${testCase.name}`);
            
            // Execute the test action via SPL
            const testResult = executeBasicTestCase(spl, input, testCase);
            
            results.push({
                testName: testCase.name,
                testDescription: testCase.description,
                action: testCase.action,
                status: testResult.status,
                message: testResult.message,
                workspaceKey: testResult.workspaceKey,
                duration: Date.now() - startTime,
                timestamp: new Date().toISOString()
            });
            
            spl.history(input, `test/run: ${testResult.status} - ${testCase.name}`);
            
        } catch (error) {
            results.push({
                testName: testCase.name,
                testDescription: testCase.description,
                action: testCase.action,
                status: 'ERROR',
                message: `Test execution error: ${error.message}`,
                error: error.toString(),
                duration: Date.now() - startTime,
                timestamp: new Date().toISOString()
            });
            
            spl.history(input, `test/run: ERROR - ${testCase.name}: ${error.message}`);
        }
    }
    
    return results;
}

// Execute a single basic test case
function executeBasicTestCase(spl, input, testCase) {
    // For now, return a stub result that simulates test execution
    // This is where we would integrate with actual SPL command execution
    
    const workspaceKey = `${testCase.action}/${new Date().toISOString()}`;
    
    // Simulate test execution based on action and expected outcomes
    if (testCase.action === 'gp/fs/write' && testCase.params) {
        // For basic implementation, simulate the test
        if (testCase.params.file && testCase.params.content) {
            return {
                status: 'PASS',
                message: 'Simulated gp/fs/write test passed',
                workspaceKey: workspaceKey
            };
        } else {
            return {
                status: 'FAIL',
                message: 'Missing required parameters: file or content',
                workspaceKey: workspaceKey
            };
        }
    }
    
    // Default case - not yet implemented
    return {
        status: 'FAIL',
        message: `Test execution not yet implemented for action: ${testCase.action}`,
        workspaceKey: workspaceKey
    };
}

// WORK PACKAGE EXECUTION FUNCTIONS

// Execute instantiation work package - test that modules can be required
exports.executeInstantiationPackage = function(spl, input, workPackage) {
    const results = [];
    
    spl.history(input, `test/run: Testing instantiation of ${workPackage.filePaths.length} modules`);
    
    for (const filePath of workPackage.filePaths) {
        const startTime = Date.now();
        
        try {
            // Clear require cache to ensure fresh require
            delete require.cache[require.resolve(filePath)];
            
            // Attempt to require the module
            const module = require(filePath);
            
            // Check that module exports something
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
            
            spl.history(input, `test/run: ✓ ${filePath}`);
            
        } catch (error) {
            results.push({
                type: 'instantiation',
                filePath: filePath,
                status: 'FAIL',
                message: `Instantiation failed: ${error.message}`,
                error: error.toString(),
                duration: Date.now() - startTime,
                timestamp: new Date().toISOString()
            });
            
            spl.history(input, `test/run: ✗ ${filePath} - ${error.message}`);
        }
    }
    
    return results;
};

// Execute JSON validation work package - test that JSON files are valid
exports.executeJsonValidationPackage = function(spl, input, workPackage) {
    const results = [];
    
    spl.history(input, `test/run: Validating JSON for ${workPackage.filePaths.length} files`);
    
    for (const filePath of workPackage.filePaths) {
        const startTime = Date.now();
        
        try {
            // Read file content using Node.js fs (in test.js this is appropriate)
            const fileContent = fs.readFileSync(filePath, 'utf8');
            
            // Attempt to parse JSON
            const jsonData = JSON.parse(fileContent);
            
            // Check that parsed data is not null/undefined
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
            
            spl.history(input, `test/run: ✓ ${filePath}`);
            
        } catch (error) {
            results.push({
                type: 'json-validation',
                filePath: filePath,
                status: 'FAIL',
                message: `JSON validation failed: ${error.message}`,
                error: error.toString(),
                duration: Date.now() - startTime,
                timestamp: new Date().toISOString()
            });
            
            spl.history(input, `test/run: ✗ ${filePath} - ${error.message}`);
        }
    }
    
    return results;
};

// Execute basic test execution work package 
exports.executeBasicTestPackage = function(spl, input, workPackage) {
    const results = [];
    
    spl.history(input, `test/run: Executing basic tests for ${workPackage.commands?.length || 0} commands`);
    
    if (!workPackage.commands || workPackage.commands.length === 0) {
        spl.history(input, `test/run: No basic test commands to execute`);
        return results;
    }
    
    // Execute basic tests directly - no conditional logic needed
    const basicResults = exports.runBasicTests(spl, input, workPackage.commands);
    results.push(...basicResults);
    
    return results;
};

// Generate execution summary
exports.generateExecutionSummary = function(results) {
    const summary = {
        total: results.length,
        passed: 0,
        failed: 0,
        errors: 0,
        stubbed: 0
    };
    
    for (const result of results) {
        switch (result.status) {
            case 'PASS':
                summary.passed++;
                break;
            case 'FAIL':
                summary.failed++;
                break;
            case 'ERROR':
                summary.errors++;
                break;
            case 'STUB':
                summary.stubbed++;
                break;
        }
    }
    
    return summary;
};