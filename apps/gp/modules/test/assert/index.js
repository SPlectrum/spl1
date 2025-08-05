//  name        Test Assertion Engine
//  URI         gp/test/assert
//  type        API Method
//  description Workspace-aware assertion engine for test validation
//              Provides comprehensive assertion capabilities for SPL testing
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const test = require("../test.js");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Workspace-Aware Assertion Engine
exports.default = function gp_test_assert(input) {
    try {
        // Get app context and method parameters using individual extraction
        const cwd = spl.context(input, "cwd");
        const appRoot = spl.context(input, "appRoot") || "apps/gp";
        
        const assertion = spl.action(input, 'assertion');
        const type = spl.action(input, 'type') || 'workspace';
        const expected = spl.action(input, 'expected');
        const operator = spl.action(input, 'operator') || 'equals';
        const message = spl.action(input, 'message');
        const strict = spl.action(input, 'strict') === true;
        const debug = spl.action(input, 'debug') === true;
        
        spl.history(input, `test/assert: Starting assertion validation`);
        spl.history(input, `test/assert: Type=${type}, Operator=${operator}, Strict=${strict}`);
        
        // Set execution time in request context
        spl.rcSet(input.headers, "spl.request.executionTime", Date.now());
        
        if (!assertion && !expected) {
            throw new Error("Either 'assertion' expression or 'expected' value must be provided");
        }
        
        // Execute assertion based on type
        let result = {};
        
        switch (type) {
            case 'workspace':
                result = this.assertWorkspace(spl, input, { assertion, expected, operator, strict, debug });
                break;
                
            case 'history':
                result = this.assertHistory(spl, input, { assertion, expected, operator, strict, debug });
                break;
                
            case 'error':
                result = this.assertError(spl, input, { assertion, expected, operator, strict, debug });
                break;
                
            case 'context':
                result = this.assertContext(spl, input, { assertion, expected, operator, strict, debug });
                break;
                
            case 'file':
                result = this.assertFile(spl, input, appRoot, { assertion, expected, operator, strict, debug });
                break;
                
            case 'custom':
                result = this.assertCustom(spl, input, { assertion, expected, operator, strict, debug });
                break;
                
            default:
                throw new Error(`Unsupported assertion type: ${type}`);
        }
        
        // Add custom message if provided
        if (message) {
            result.customMessage = message;
            result.message = `${message}: ${result.message}`;
        }
        
        spl.history(input, `test/assert: ${result.success ? 'PASS' : 'FAIL'} - ${result.message}`);
        
        if (debug) {
            spl.history(input, `test/assert: DEBUG - Details: ${JSON.stringify(result.details || {})}`);
        }
        
        // Store results in workspace following API record pattern
        // STEP 1: Get the API record (gp/test)
        let apiRecord = spl.wsRef(input, "gp/test");
        if (!apiRecord) {
            apiRecord = {
                headers: { gp: { test: { api: "gp/test", timestamp: new Date().toISOString() } } },
                value: {}
            };
        }
        
        // STEP 2: Work within the API record - add assertion results
        const resultKey = spl.fURI("assert", type);
        apiRecord.value[resultKey] = test.createTestRecord(`assert-${type}`, {
            assertion: {
                type: type,
                expression: assertion,
                expected: expected,
                operator: operator,
                result: result
            },
            configuration: {
                strict, debug, message
            },
            timestamp: new Date().toISOString()
        });
        
        // Save the updated API record back to workspace
        spl.wsSet(input, "gp/test", apiRecord);
        
        // Set execution result
        if (!result.success) {
            spl.rcSet(input.headers, "spl.execute.error", {
                message: `Assertion failed: ${result.message}`,
                code: 'ASSERTION_FAILED',
                details: result
            });
        }
        
        spl.history(input, `test/assert: Assertion completed - ${result.success ? 'SUCCESS' : 'FAILED'}`);
        
    } catch (error) {
        spl.rcSet(input.headers, "spl.execute.error", {
            message: error.message,
            code: error.code || 'ASSERT_ERROR',
            operation: 'test/assert'
        });
        
        spl.history(input, `test/assert: ERROR - ${error.message}`);
    }
    
    spl.completed(input);
}

// Workspace assertion validation
exports.default.assertWorkspace = function(spl, input, options) {
    const { assertion, expected, operator, strict, debug } = options;
    
    try {
        const workspace = spl.wsRef(input) || {};
        
        if (assertion) {
            // Expression-based assertion
            return this.evaluateWorkspaceExpression(workspace, assertion, { strict, debug });
        } else {
            // Value-based assertion
            return this.compareWorkspaceValue(workspace, expected, operator, { strict, debug });
        }
        
    } catch (error) {
        return {
            success: false,
            message: `Workspace assertion error: ${error.message}`,
            error: error.message
        };
    }
};

// History assertion validation
exports.default.assertHistory = function(spl, input, options) {
    const { assertion, expected, operator, strict, debug } = options;
    
    try {
        const history = input.value?.history || [];
        
        if (assertion) {
            // Expression-based assertion (e.g., "contains 'Successfully read'")
            return this.evaluateHistoryExpression(history, assertion, { strict, debug });
        } else {
            // Value-based assertion
            return this.compareHistoryValue(history, expected, operator, { strict, debug });
        }
        
    } catch (error) {
        return {
            success: false,
            message: `History assertion error: ${error.message}`,
            error: error.message
        };
    }
};

// Error assertion validation
exports.default.assertError = function(spl, input, options) {
    const { assertion, expected, operator, strict, debug } = options;
    
    try {
        const hasError = !!(input.headers?.spl?.execute?.error);
        const errorInfo = input.headers?.spl?.execute?.error || null;
        
        if (assertion) {
            // Expression-based assertion (e.g., "none", "any", "contains 'MODULE_NOT_FOUND'")
            return this.evaluateErrorExpression(hasError, errorInfo, assertion, { strict, debug });
        } else {
            // Value-based assertion
            return this.compareErrorValue(hasError, errorInfo, expected, operator, { strict, debug });
        }
        
    } catch (error) {
        return {
            success: false,
            message: `Error assertion error: ${error.message}`,
            error: error.message
        };
    }
};

// Context assertion validation
exports.default.assertContext = function(spl, input, options) {
    const { assertion, expected, operator, strict, debug } = options;
    
    try {
        const context = {
            appRoot: spl.context(input, "appRoot"),
            cwd: spl.context(input, "cwd"),
            currentLine: input.headers?.spl?.app?.currentLine,
            currentPart: input.headers?.spl?.app?.currentPart
        };
        
        if (assertion) {
            // Expression-based assertion
            return this.evaluateContextExpression(context, assertion, { strict, debug });
        } else {
            // Value-based assertion
            return this.compareContextValue(context, expected, operator, { strict, debug });
        }
        
    } catch (error) {
        return {
            success: false,
            message: `Context assertion error: ${error.message}`,
            error: error.message
        };
    }
};

// File system assertion validation
exports.default.assertFile = function(spl, input, appRoot, options) {
    const { assertion, expected, operator, strict, debug } = options;
    
    try {
        if (assertion) {
            // Expression-based assertion (e.g., "exists test.txt", "contains 'hello world'")
            return this.evaluateFileExpression(appRoot, assertion, { strict, debug });
        } else {
            // Value-based assertion requires a file path in expected
            return this.compareFileValue(appRoot, expected, operator, { strict, debug });
        }
        
    } catch (error) {
        return {
            success: false,
            message: `File assertion error: ${error.message}`,
            error: error.message
        };
    }
};

// Custom assertion validation
exports.default.assertCustom = function(spl, input, options) {
    const { assertion, expected, operator, strict, debug } = options;
    
    try {
        // Custom assertions allow JavaScript expressions
        // This is a simplified implementation - could be enhanced with a proper expression parser
        if (assertion) {
            // Evaluate as JavaScript expression (with safety constraints)
            return this.evaluateCustomExpression(spl, input, assertion, { strict, debug });
        } else {
            return {
                success: false,
                message: "Custom assertions require an expression"
            };
        }
        
    } catch (error) {
        return {
            success: false,
            message: `Custom assertion error: ${error.message}`,
            error: error.message
        };
    }
};

// Expression evaluation helpers
exports.default.evaluateWorkspaceExpression = function(workspace, expression, options = {}) {
    const workspaceStr = JSON.stringify(workspace);
    
    if (expression.includes('contains')) {
        const match = expression.match(/contains\s+["']([^"']+)["']/);
        if (match) {
            const searchTerm = match[1];
            const success = workspaceStr.includes(searchTerm);
            return {
                success: success,
                message: success ? `Workspace contains "${searchTerm}"` : `Workspace does not contain "${searchTerm}"`,
                details: { expression, searchTerm, workspaceKeys: Object.keys(workspace) }
            };
        }
    }
    
    if (expression.includes('empty')) {
        const success = Object.keys(workspace).length === 0;
        return {
            success: success,
            message: success ? "Workspace is empty" : "Workspace is not empty",
            details: { expression, keyCount: Object.keys(workspace).length }
        };
    }
    
    return {
        success: false,
        message: `Unsupported workspace expression: ${expression}`,
        details: { expression }
    };
};

exports.default.evaluateHistoryExpression = function(history, expression, options = {}) {
    const historyStr = JSON.stringify(history);
    
    if (expression.includes('contains')) {
        const match = expression.match(/contains\s+["']([^"']+)["']/);
        if (match) {
            const searchTerm = match[1];
            const success = historyStr.includes(searchTerm);
            return {
                success: success,
                message: success ? `History contains "${searchTerm}"` : `History does not contain "${searchTerm}"`,
                details: { expression, searchTerm, historyLength: history.length }
            };
        }
    }
    
    if (expression.includes('empty')) {
        const success = history.length === 0;
        return {
            success: success,
            message: success ? "History is empty" : "History is not empty",
            details: { expression, entryCount: history.length }
        };
    }
    
    return {
        success: false,
        message: `Unsupported history expression: ${expression}`,
        details: { expression }
    };
};

exports.default.evaluateErrorExpression = function(hasError, errorInfo, expression, options = {}) {
    if (expression === 'none' || expression === 'false') {
        return {
            success: !hasError,
            message: hasError ? 'Unexpected error occurred' : 'No errors as expected',
            details: { expression, hasError, errorInfo }
        };
    }
    
    if (expression === 'any' || expression === 'true') {
        return {
            success: hasError,
            message: hasError ? 'Error occurred as expected' : 'Expected error but none occurred',
            details: { expression, hasError, errorInfo }
        };
    }
    
    if (expression.includes('contains') && errorInfo) {
        const match = expression.match(/contains\s+["']([^"']+)["']/);
        if (match) {
            const searchTerm = match[1];
            const errorStr = JSON.stringify(errorInfo);
            const success = errorStr.includes(searchTerm);
            return {
                success: success,
                message: success ? `Error contains "${searchTerm}"` : `Error does not contain "${searchTerm}"`,
                details: { expression, searchTerm, errorInfo }
            };
        }
    }
    
    return {
        success: false,
        message: `Unsupported error expression: ${expression}`,
        details: { expression, hasError, errorInfo }
    };
};

// Value comparison helpers
exports.default.compareWorkspaceValue = function(workspace, expected, operator, options = {}) {
    // Simple comparison implementation
    const actual = workspace;
    return this.performComparison(actual, expected, operator, 'workspace', options);
};

exports.default.compareHistoryValue = function(history, expected, operator, options = {}) {
    const actual = history;
    return this.performComparison(actual, expected, operator, 'history', options);
};

exports.default.performComparison = function(actual, expected, operator, context, options = {}) {
    const { strict } = options;
    
    let success = false;
    let message = '';
    
    switch (operator) {
        case 'equals':
            success = strict ? actual === expected : actual == expected;
            message = success ? `${context} equals expected value` : `${context} does not equal expected value`;
            break;
            
        case 'not_equals':
            success = strict ? actual !== expected : actual != expected;
            message = success ? `${context} does not equal expected value` : `${context} equals expected value (unexpected)`;
            break;
            
        case 'contains':
            const actualStr = JSON.stringify(actual);
            const expectedStr = String(expected);
            success = actualStr.includes(expectedStr);
            message = success ? `${context} contains "${expectedStr}"` : `${context} does not contain "${expectedStr}"`;
            break;
            
        case 'length':
            const actualLength = Array.isArray(actual) ? actual.length : Object.keys(actual).length;
            success = actualLength === Number(expected);
            message = success ? `${context} length equals ${expected}` : `${context} length is ${actualLength}, expected ${expected}`;
            break;
            
        default:
            return {
                success: false,
                message: `Unsupported comparison operator: ${operator}`,
                details: { operator, actual, expected }
            };
    }
    
    return {
        success: success,
        message: message,
        details: { operator, actual, expected, strict }
    };
};
///////////////////////////////////////////////////////////////////////////////