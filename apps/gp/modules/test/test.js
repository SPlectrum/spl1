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

// Test discovery - find test suite files in module directories
exports.discoverTests = function(appRoot, modulePath, options = {}) {
    const results = [];
    const basePath = path.join(appRoot, 'modules');
    
    try {
        const searchPath = modulePath ? path.join(basePath, modulePath) : basePath;
        const recursive = options.recursive !== false;
        
        const traverse = (currentPath, relativePath = '') => {
            if (!fs.existsSync(currentPath)) return;
            
            const entries = fs.readdirSync(currentPath, { withFileTypes: true });
            
            for (const entry of entries) {
                const fullPath = path.join(currentPath, entry.name);
                const relativeEntryPath = path.join(relativePath, entry.name);
                
                if (entry.isDirectory()) {
                    if (entry.name === 'tests') {
                        // Found a tests directory - scan for test suites
                        const testFiles = this.scanTestDirectory(fullPath);
                        for (const testFile of testFiles) {
                            results.push({
                                module: relativePath || path.basename(currentPath),
                                testFile: testFile.name,
                                fullPath: testFile.path,
                                suite: testFile.suite
                            });
                        }
                    } else if (recursive && !entry.name.startsWith('.')) {
                        // Recurse into subdirectories
                        traverse(fullPath, relativeEntryPath);
                    }
                }
            }
        };
        
        traverse(searchPath);
        return results;
        
    } catch (error) {
        throw new Error(`Test discovery failed: ${error.message}`);
    }
};

// Scan a tests directory for JSON test suite files
exports.scanTestDirectory = function(testsPath) {
    const testFiles = [];
    
    try {
        if (!fs.existsSync(testsPath)) return testFiles;
        
        const entries = fs.readdirSync(testsPath);
        
        for (const entry of entries) {
            if (entry.endsWith('.json')) {
                const filePath = path.join(testsPath, entry);
                try {
                    const content = fs.readFileSync(filePath, 'utf8');
                    const suite = JSON.parse(content);
                    
                    testFiles.push({
                        name: entry,
                        path: filePath,
                        suite: suite
                    });
                } catch (error) {
                    // Skip invalid JSON files
                    console.warn(`Skipping invalid test file ${entry}: ${error.message}`);
                }
            }
        }
        
        return testFiles;
        
    } catch (error) {
        throw new Error(`Failed to scan test directory ${testsPath}: ${error.message}`);
    }
};

// Execute a single test case
exports.executeTest = function(spl, input, testCase, options = {}) {
    const startTime = Date.now();
    const isolated = options.isolated !== false;
    
    try {
        spl.history(input, `test: Executing "${testCase.name}"`);
        
        // Create isolated workspace if requested
        let originalWorkspace = null;
        if (isolated) {
            originalWorkspace = this.captureWorkspace(input);
            this.resetWorkspace(input);
        }
        
        // Execute the test action
        const testInput = this.createTestInput(input, testCase);
        const result = this.runTestAction(spl, testInput, testCase);
        
        // Restore workspace if isolated
        if (isolated && originalWorkspace) {
            this.restoreWorkspace(input, originalWorkspace);
        }
        
        const duration = Date.now() - startTime;
        
        return {
            name: testCase.name,
            result: this.TestResult.PASS,
            duration: duration,
            message: `Test passed in ${duration}ms`,
            details: result
        };
        
    } catch (error) {
        const duration = Date.now() - startTime;
        
        return {
            name: testCase.name,
            result: this.TestResult.FAIL,
            duration: duration,
            message: error.message,
            error: error
        };
    }
};

// Create test input based on test case parameters
exports.createTestInput = function(originalInput, testCase) {
    // Create a copy of the input with test-specific parameters
    const testInput = JSON.parse(JSON.stringify(originalInput));
    
    // Override action parameters with test case params
    if (testCase.params) {
        if (!testInput.value) testInput.value = {};
        if (!testInput.value.parsed) testInput.value.parsed = {};
        if (!testInput.value.parsed.line_0) testInput.value.parsed.line_0 = {};
        
        // Set test parameters
        Object.assign(testInput.value.parsed.line_0, testCase.params);
    }
    
    return testInput;
};

// Run the actual test action
exports.runTestAction = function(spl, testInput, testCase) {
    // This would execute the SPL action specified in testCase.action
    // For now, return a basic result structure
    return {
        action: testCase.action,
        params: testCase.params,
        executed: true
    };
};

// Workspace management for test isolation
exports.captureWorkspace = function(input) {
    if (input.value && input.value.workspace) {
        return JSON.parse(JSON.stringify(input.value.workspace));
    }
    return {};
};

exports.resetWorkspace = function(input) {
    if (!input.value) input.value = {};
    input.value.workspace = {};
};

exports.restoreWorkspace = function(input, workspace) {
    if (!input.value) input.value = {};
    input.value.workspace = workspace;
};

// Assertion engine for test validation
exports.evaluateAssertions = function(spl, input, testCase) {
    const assertions = testCase.expect || {};
    const results = [];
    
    // Workspace assertions
    if (assertions.workspace) {
        const result = this.evaluateWorkspaceAssertion(spl, input, assertions.workspace);
        results.push({
            type: 'workspace',
            expression: assertions.workspace,
            result: result.success,
            message: result.message
        });
    }
    
    // History assertions
    if (assertions.history) {
        const result = this.evaluateHistoryAssertion(spl, input, assertions.history);
        results.push({
            type: 'history',
            expression: assertions.history,
            result: result.success,
            message: result.message
        });
    }
    
    // Error assertions
    if (assertions.error) {
        const result = this.evaluateErrorAssertion(spl, input, assertions.error);
        results.push({
            type: 'error',
            expression: assertions.error,
            result: result.success,
            message: result.message
        });
    }
    
    return results;
};

// Workspace assertion evaluation
exports.evaluateWorkspaceAssertion = function(spl, input, expression) {
    try {
        // Simple expression evaluation for workspace data
        // This is a basic implementation - could be enhanced with a proper expression parser
        if (expression.includes('contains')) {
            const searchTerm = expression.match(/"([^"]+)"/)?.[1];
            if (searchTerm) {
                const workspace = spl.wsRef(input) || {};
                const workspaceStr = JSON.stringify(workspace);
                const success = workspaceStr.includes(searchTerm);
                return {
                    success: success,
                    message: success ? `Workspace contains "${searchTerm}"` : `Workspace does not contain "${searchTerm}"`
                };
            }
        }
        
        return { success: false, message: `Unsupported workspace assertion: ${expression}` };
        
    } catch (error) {
        return { success: false, message: `Assertion error: ${error.message}` };
    }
};

// History assertion evaluation
exports.evaluateHistoryAssertion = function(spl, input, expression) {
    try {
        if (expression.includes('contains')) {
            const searchTerm = expression.match(/"([^"]+)"/)?.[1];
            if (searchTerm) {
                const history = input.value?.history || [];
                const historyStr = JSON.stringify(history);
                const success = historyStr.includes(searchTerm);
                return {
                    success: success,
                    message: success ? `History contains "${searchTerm}"` : `History does not contain "${searchTerm}"`
                };
            }
        }
        
        return { success: false, message: `Unsupported history assertion: ${expression}` };
        
    } catch (error) {
        return { success: false, message: `History assertion error: ${error.message}` };
    }
};

// Error assertion evaluation
exports.evaluateErrorAssertion = function(spl, input, expression) {
    try {
        const hasError = input.headers?.spl?.execute?.error || false;
        
        if (expression === 'none' || expression === false) {
            return {
                success: !hasError,
                message: hasError ? 'Unexpected error occurred' : 'No errors as expected'
            };
        }
        
        if (expression === 'any' || expression === true) {
            return {
                success: hasError,
                message: hasError ? 'Error occurred as expected' : 'Expected error but none occurred'
            };
        }
        
        return { success: false, message: `Unsupported error assertion: ${expression}` };
        
    } catch (error) {
        return { success: false, message: `Error assertion error: ${error.message}` };
    }
};

// Generate test reports
exports.generateReport = function(testResults, options = {}) {
    const total = testResults.length;
    const passed = testResults.filter(r => r.result === this.TestResult.PASS).length;
    const failed = testResults.filter(r => r.result === this.TestResult.FAIL).length;
    const skipped = testResults.filter(r => r.result === this.TestResult.SKIP).length;
    const errors = testResults.filter(r => r.result === this.TestResult.ERROR).length;
    
    const totalDuration = testResults.reduce((sum, r) => sum + (r.duration || 0), 0);
    
    const report = {
        summary: {
            total: total,
            passed: passed,
            failed: failed,
            skipped: skipped,
            errors: errors,
            successRate: total > 0 ? Math.round((passed / total) * 100) : 0,
            totalDuration: totalDuration
        },
        details: testResults
    };
    
    if (options.verbose) {
        report.verbose = {
            failedTests: testResults.filter(r => r.result === this.TestResult.FAIL),
            errorTests: testResults.filter(r => r.result === this.TestResult.ERROR)
        };
    }
    
    return report;
};

// Filter tests by tags
exports.filterTestsByTags = function(testSuites, tags) {
    if (!tags || tags.length === 0) return testSuites;
    
    const tagArray = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim());
    
    return testSuites.filter(suite => {
        if (!suite.suite.tags) return false;
        const suiteTags = Array.isArray(suite.suite.tags) ? suite.suite.tags : [suite.suite.tags];
        return tagArray.some(tag => suiteTags.includes(tag));
    });
};

// Create standardized test record structure
exports.createTestRecord = function(module, testResults, options = {}) {
    return {
        headers: {
            gp: {
                test: {
                    module: module,
                    timestamp: new Date().toISOString(),
                    framework: 'gp/test',
                    version: '1.0.0'
                }
            }
        },
        value: testResults
    };
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