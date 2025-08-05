//  name        Test Coverage Analysis
//  URI         gp/test/coverage
//  type        API Method
//  description Coverage analysis and reporting for API operations
//              Analyzes tested vs untested operations and provides quality gate reporting
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const test = require("../test.js");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Coverage Analysis and Reporting
exports.default = function gp_test_coverage(input) {
    try {
        // Get app context and method parameters using individual extraction
        const cwd = spl.context(input, "cwd");
        const appRoot = spl.context(input, "appRoot") || "apps/gp";
        const fullAppPath = `${cwd}/${appRoot}`;
        
        const targetModule = spl.action(input, 'module');
        const recursive = spl.action(input, 'recursive') !== false;
        const format = spl.action(input, 'format') || 'summary';
        const threshold = spl.action(input, 'threshold') || 80;
        const detailed = spl.action(input, 'detailed') === true;
        const includeUntested = spl.action(input, 'includeUntested') === true;
        const report = spl.action(input, 'report') === true;
        
        spl.history(input, `test/coverage: Starting coverage analysis`);
        spl.history(input, `test/coverage: Module=${targetModule || 'all'}, Threshold=${threshold}%, Format=${format}`);
        
        // Set execution time in request context
        spl.rcSet(input.headers, "spl.request.executionTime", Date.now());
        
        // Discover available operations in the target module(s)
        const availableOperations = test.discoverOperations(fullAppPath, targetModule, { recursive });
        spl.history(input, `test/coverage: Found ${availableOperations.length} available operations`);
        
        // Discover test suites
        const testSuites = test.discoverTests(fullAppPath, targetModule, { recursive });
        spl.history(input, `test/coverage: Found ${testSuites.length} test suites`);
        
        // Analyze coverage
        const coverageAnalysis = test.analyzeCoverage(availableOperations, testSuites);
        spl.history(input, `test/coverage: Analysis complete - ${coverageAnalysis.summary.coveragePercentage}% coverage`);
        
        // Generate coverage report
        const coverageReport = test.generateCoverageReport(coverageAnalysis, {
            format, threshold, detailed, includeUntested
        });
        
        // Check if coverage meets threshold
        const meetsThreshold = coverageAnalysis.summary.coveragePercentage >= threshold;
        spl.history(input, `test/coverage: Threshold check - ${meetsThreshold ? 'PASS' : 'FAIL'} (${coverageAnalysis.summary.coveragePercentage}% >= ${threshold}%)`);
        
        // Store results in workspace following API record pattern
        // STEP 1: Get the API record (gp/test)
        let apiRecord = spl.wsRef(input, "gp/test");
        if (!apiRecord) {
            apiRecord = {
                headers: { gp: { test: { api: "gp/test", timestamp: new Date().toISOString() } } },
                value: {}
            };
        }
        
        // STEP 2: Work within the API record - add coverage results
        const resultKey = spl.fURI("coverage", targetModule || "all");
        apiRecord.value[resultKey] = test.createTestRecord(`coverage-${targetModule || "all"}`, {
            analysis: coverageAnalysis,
            report: coverageReport,
            configuration: {
                targetModule, recursive, format, threshold, detailed, includeUntested
            },
            qualityGate: {
                meetsThreshold: meetsThreshold,
                threshold: threshold,
                actualCoverage: coverageAnalysis.summary.coveragePercentage
            }
        });
        
        // Save the updated API record back to workspace
        spl.wsSet(input, "gp/test", apiRecord);
        
        // Set execution result based on threshold
        if (!meetsThreshold) {
            spl.rcSet(input.headers, "spl.execute.error", {
                message: `Coverage ${coverageAnalysis.summary.coveragePercentage}% below threshold ${threshold}%`,
                code: 'COVERAGE_THRESHOLD_NOT_MET',
                details: coverageAnalysis.summary
            });
            spl.history(input, `test/coverage: Quality gate FAILED - coverage below threshold`);
        } else {
            spl.history(input, `test/coverage: Quality gate PASSED - coverage meets threshold`);
        }
        
        spl.history(input, `test/coverage: Coverage analysis completed successfully`);
        
    } catch (error) {
        spl.rcSet(input.headers, "spl.execute.error", {
            message: error.message,
            code: error.code || 'COVERAGE_ERROR',
            operation: 'test/coverage'
        });
        
        spl.history(input, `test/coverage: ERROR - ${error.message}`);
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////