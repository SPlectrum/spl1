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