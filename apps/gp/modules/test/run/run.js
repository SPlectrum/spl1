//  name        Test Run Auxiliary Functions
//  URI         gp/test/run/run
//  type        Auxiliary Library
//  description Contains test execution and assertion functions used by the run method
//              Provides test execution, assertion, and result evaluation capabilities.
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

// Execute a single test case
exports.executeTest = function(spl, input, testCase, options = {}) {
    const startTime = Date.now();
    const isolated = options.isolated !== false;
    
    try {
        spl.history(input, `run: Executing test "${testCase.name}"`);
        
        // Create test input based on test case parameters
        const testInput = this.createTestInput(input, testCase);
        
        // Execute the test (placeholder for now)
        const result = this.runTestAction(spl, testInput, testCase);
        
        // Evaluate assertions if present
        const assertions = this.evaluateAssertions(spl, testInput, testCase);
        
        const duration = Date.now() - startTime;
        
        return {
            name: testCase.name,
            result: assertions.length > 0 && assertions.some(a => !a.result) ? this.TestResult.FAIL : this.TestResult.PASS,
            duration: duration,
            message: `Test completed in ${duration}ms`,
            assertions: assertions,
            details: result
        };
        
    } catch (error) {
        const duration = Date.now() - startTime;
        
        return {
            name: testCase.name,
            result: this.TestResult.ERROR,
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

// Run the actual test action (placeholder)
exports.runTestAction = function(spl, testInput, testCase) {
    // For now, just return basic execution info
    // Future: Actually execute the SPL action specified in testCase.action
    return {
        action: testCase.action,
        params: testCase.params,
        executed: true,
        timestamp: new Date().toISOString()
    };
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

// Generate test execution report
exports.generateExecutionReport = function(testResults, options = {}) {
    const total = testResults.length;
    const passed = testResults.filter(r => r.result === this.TestResult.PASS).length;
    const failed = testResults.filter(r => r.result === this.TestResult.FAIL).length;
    const skipped = testResults.filter(r => r.result === this.TestResult.SKIP).length;
    const errors = testResults.filter(r => r.result === this.TestResult.ERROR).length;
    
    const totalDuration = testResults.reduce((sum, r) => sum + (r.duration || 0), 0);
    
    return {
        summary: {
            total: total,
            passed: passed,
            failed: failed,
            skipped: skipped,
            errors: errors,
            successRate: total > 0 ? Math.round((passed / total) * 100) : 0,
            totalDuration: totalDuration,
            timestamp: new Date().toISOString()
        },
        results: testResults
    };
};

// Load test suite from file
exports.loadTestSuite = function(testFilePath) {
    try {
        if (!fs.existsSync(testFilePath)) {
            throw new Error(`Test suite not found: ${testFilePath}`);
        }
        
        const content = fs.readFileSync(testFilePath, 'utf8');
        const suite = JSON.parse(content);
        
        return {
            name: suite.name || path.basename(testFilePath, '.json'),
            tests: suite.tests || [],
            tags: suite.tags || [],
            setup: suite.setup || null,
            teardown: suite.teardown || null
        };
        
    } catch (error) {
        throw new Error(`Failed to load test suite ${testFilePath}: ${error.message}`);
    }
};
///////////////////////////////////////////////////////////////////////////////