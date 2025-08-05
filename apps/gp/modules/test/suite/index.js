//  name        Test Suite Manager
//  URI         gp/test/suite
//  type        API Method
//  description Manage test suite definitions and discovery
//              Provides suite validation, organization, and metadata management
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const test = require("../test.js");
const fs = require('fs');
const path = require('path');
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Test Suite Management and Discovery
exports.default = function gp_test_suite(input) {
    try {
        // Get app context and method parameters using individual extraction
        const cwd = spl.context(input, "cwd");
        const appRoot = spl.context(input, "appRoot") || "apps/gp";
        const fullAppPath = `${cwd}/${appRoot}`;
        
        const operation = spl.action(input, 'operation') || 'list';
        const targetModule = spl.action(input, 'module');
        const recursive = spl.action(input, 'recursive') !== false;
        const tags = spl.action(input, 'tags');
        const validate = spl.action(input, 'validate') === true;
        const detailed = spl.action(input, 'detailed') === true;
        const filter = spl.action(input, 'filter');
        const format = spl.action(input, 'format') || 'summary';
        
        spl.history(input, `test/suite: Starting suite ${operation} operation`);
        spl.history(input, `test/suite: Module=${targetModule || 'all'}, Recursive=${recursive}, Validate=${validate}`);
        
        // Set execution time in request context
        spl.rcSet(input.headers, "spl.request.executionTime", Date.now());
        
        // Discover test suites based on parameters
        let testSuites = [];
        
        if (targetModule) {
            spl.history(input, `test/suite: Discovering suites for module="${targetModule}"`);
            testSuites = test.discoverTests(fullAppPath, targetModule, { recursive });
        } else {
            spl.history(input, `test/suite: Discovering all available suites`);
            testSuites = test.discoverTests(fullAppPath, null, { recursive: true });
        }
        
        spl.history(input, `test/suite: Found ${testSuites.length} test suites`);
        
        // Filter by tags if specified
        if (tags) {
            const originalCount = testSuites.length;
            testSuites = test.filterTestsByTags(testSuites, tags);
            spl.history(input, `test/suite: Filtered by tags "${tags}": ${originalCount} → ${testSuites.length} suites`);
        }
        
        // Filter by name pattern if specified
        if (filter) {
            const originalCount = testSuites.length;
            const filterRegex = new RegExp(filter, 'i');
            testSuites = testSuites.filter(suite => 
                filterRegex.test(suite.testFile) || 
                filterRegex.test(suite.suite.name || '') ||
                filterRegex.test(suite.module)
            );
            spl.history(input, `test/suite: Filtered by pattern "${filter}": ${originalCount} → ${testSuites.length} suites`);
        }
        
        // Process suites based on operation
        let result = {};
        
        switch (operation) {
            case 'list':
                result = this.listSuites(testSuites, { detailed, format });
                spl.history(input, `test/suite: Listed ${testSuites.length} suites`);
                break;
                
            case 'validate':
                result = this.validateSuites(testSuites);
                spl.history(input, `test/suite: Validated ${testSuites.length} suites`);
                break;
                
            case 'info':
                result = this.getSuiteInfo(testSuites, { detailed });
                spl.history(input, `test/suite: Generated info for ${testSuites.length} suites`);
                break;
                
            case 'summary':
                result = this.getSuiteSummary(testSuites);
                spl.history(input, `test/suite: Generated summary for ${testSuites.length} suites`);
                break;
                
            default:
                throw new Error(`Unsupported suite operation: ${operation}`);
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
        
        // STEP 2: Work within the API record - add suite results
        const resultKey = spl.fURI("suite", operation);
        apiRecord.value[resultKey] = test.createTestRecord(`suite-${operation}`, {
            operation: operation,
            result: result,
            configuration: {
                targetModule, recursive, tags, validate, detailed, filter, format
            },
            metadata: {
                totalSuites: testSuites.length,
                timestamp: new Date().toISOString()
            }
        });
        
        // Save the updated API record back to workspace
        spl.wsSet(input, "gp/test", apiRecord);
        
        spl.history(input, `test/suite: Operation "${operation}" completed successfully`);
        
    } catch (error) {
        spl.rcSet(input.headers, "spl.execute.error", {
            message: error.message,
            code: error.code || 'SUITE_ERROR',
            operation: 'test/suite'
        });
        
        spl.history(input, `test/suite: ERROR - ${error.message}`);
    }
    
    spl.completed(input);
}

// List available test suites
exports.default.listSuites = function(testSuites, options = {}) {
    const { detailed, format } = options;
    
    if (format === 'json') {
        return testSuites;
    }
    
    const suiteList = testSuites.map(suite => {
        const basic = {
            module: suite.module,
            testFile: suite.testFile,
            name: suite.suite.name || 'Unnamed Suite',
            testCount: suite.suite.tests ? suite.suite.tests.length : 0
        };
        
        if (detailed) {
            return {
                ...basic,
                description: suite.suite.description,
                tags: suite.suite.tags || [],
                path: suite.fullPath,
                tests: suite.suite.tests ? suite.suite.tests.map(t => ({
                    name: t.name,
                    action: t.action
                })) : []
            };
        }
        
        return basic;
    });
    
    return {
        summary: {
            totalSuites: testSuites.length,
            totalTests: testSuites.reduce((sum, s) => sum + (s.suite.tests ? s.suite.tests.length : 0), 0),
            modules: [...new Set(testSuites.map(s => s.module))]
        },
        suites: suiteList
    };
};

// Validate test suite formats
exports.default.validateSuites = function(testSuites) {
    const validationResults = [];
    
    for (const suiteInfo of testSuites) {
        const validation = {
            module: suiteInfo.module,
            testFile: suiteInfo.testFile,
            valid: true,
            errors: [],
            warnings: []
        };
        
        const suite = suiteInfo.suite;
        
        // Required fields validation
        if (!suite.name) {
            validation.warnings.push('Suite name is missing');
        }
        
        if (!suite.tests || !Array.isArray(suite.tests)) {
            validation.valid = false;
            validation.errors.push('Tests array is required');
        } else {
            // Validate individual tests
            suite.tests.forEach((test, index) => {
                if (!test.name) {
                    validation.errors.push(`Test ${index + 1}: name is required`);
                    validation.valid = false;
                }
                
                if (!test.action) {
                    validation.errors.push(`Test ${index + 1}: action is required`);
                    validation.valid = false;
                }
                
                if (test.expect && typeof test.expect !== 'object') {
                    validation.warnings.push(`Test ${index + 1}: expect should be an object`);
                }
            });
        }
        
        // Optional field validation
        if (suite.tags && !Array.isArray(suite.tags)) {
            validation.warnings.push('Tags should be an array');
        }
        
        validationResults.push(validation);
    }
    
    const summary = {
        total: validationResults.length,
        valid: validationResults.filter(v => v.valid).length,
        invalid: validationResults.filter(v => !v.valid).length,
        withWarnings: validationResults.filter(v => v.warnings.length > 0).length
    };
    
    return {
        summary,
        results: validationResults
    };
};

// Get detailed suite information
exports.default.getSuiteInfo = function(testSuites, options = {}) {
    const { detailed } = options;
    
    return testSuites.map(suiteInfo => {
        const info = {
            module: suiteInfo.module,
            testFile: suiteInfo.testFile,
            fullPath: suiteInfo.fullPath,
            suite: {
                name: suiteInfo.suite.name || 'Unnamed Suite',
                description: suiteInfo.suite.description,
                tags: suiteInfo.suite.tags || [],
                testCount: suiteInfo.suite.tests ? suiteInfo.suite.tests.length : 0
            }
        };
        
        if (detailed && suiteInfo.suite.tests) {
            info.tests = suiteInfo.suite.tests.map(test => ({
                name: test.name,
                action: test.action,
                hasParams: !!test.params,
                hasExpectations: !!test.expect,
                description: test.description
            }));
        }
        
        return info;
    });
};

// Generate suite summary statistics
exports.default.getSuiteSummary = function(testSuites) {
    const modules = {};
    const tagCounts = {};
    let totalTests = 0;
    
    testSuites.forEach(suiteInfo => {
        // Module statistics
        if (!modules[suiteInfo.module]) {
            modules[suiteInfo.module] = {
                suiteCount: 0,
                testCount: 0,
                suites: []
            };
        }
        
        modules[suiteInfo.module].suiteCount++;
        modules[suiteInfo.module].suites.push(suiteInfo.testFile);
        
        const testCount = suiteInfo.suite.tests ? suiteInfo.suite.tests.length : 0;
        modules[suiteInfo.module].testCount += testCount;
        totalTests += testCount;
        
        // Tag statistics
        if (suiteInfo.suite.tags) {
            const tags = Array.isArray(suiteInfo.suite.tags) ? suiteInfo.suite.tags : [suiteInfo.suite.tags];
            tags.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        }
    });
    
    return {
        overview: {
            totalSuites: testSuites.length,
            totalTests: totalTests,
            moduleCount: Object.keys(modules).length,
            tagCount: Object.keys(tagCounts).length
        },
        modules: modules,
        tags: tagCounts,
        distribution: {
            averageTestsPerSuite: testSuites.length > 0 ? Math.round(totalTests / testSuites.length) : 0,
            averageSuitesPerModule: Object.keys(modules).length > 0 ? Math.round(testSuites.length / Object.keys(modules).length) : 0
        }
    };
};
///////////////////////////////////////////////////////////////////////////////