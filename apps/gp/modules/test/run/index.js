//  name        Test Runner
//  URI         gp/test/run
//  type        API Method
//  description Execute test suites with full SPL integration
//              Provides systematic testing with workspace isolation and debug output
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const test = require("../test.js");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Universal Test Runner with SPL Integration
exports.default = function gp_test_run(input) {
    try {
        // Get app context and method parameters using individual extraction
        const cwd = spl.context(input, "cwd");
        const appRoot = spl.context(input, "appRoot") || "apps/gp";
        const fullAppPath = `${cwd}/${appRoot}`;
        
        const targetModule = spl.action(input, 'module');
        const recursive = spl.action(input, 'recursive') !== false;
        const tags = spl.action(input, 'tags');
        const step = spl.action(input, 'step') === true;
        const debug = spl.action(input, 'debug') === true;
        const discover = spl.action(input, 'discover') === true;
        const app = spl.action(input, 'app') || 'gp';
        const filter = spl.action(input, 'filter');
        const timeout = spl.action(input, 'timeout') || 30000;
        const failfast = spl.action(input, 'failfast') === true;
        const isolated = spl.action(input, 'isolated') !== false;
        
        spl.history(input, `test/run: Starting test execution`);
        spl.history(input, `test/run: Module=${targetModule || 'all'}, Recursive=${recursive}, Tags=${tags || 'none'}`);
        
        // Set execution time in request context
        spl.rcSet(input.headers, "spl.request.executionTime", Date.now());
        
        // Discover tests based on parameters
        let testSuites = [];
        
        if (discover) {
            spl.history(input, `test/run: Auto-discovering tests in app="${app}"`);
            testSuites = test.discoverTests(fullAppPath, null, { recursive: true });
        } else if (targetModule) {
            spl.history(input, `test/run: Discovering tests for module="${targetModule}"`);
            testSuites = test.discoverTests(fullAppPath, targetModule, { recursive });
        } else {
            spl.history(input, `test/run: No specific target - discovering all tests`);
            testSuites = test.discoverTests(fullAppPath, null, { recursive });
        }
        
        spl.history(input, `test/run: Found ${testSuites.length} test suites`);
        
        // Filter by tags if specified
        if (tags) {
            const originalCount = testSuites.length;
            testSuites = test.filterTestsByTags(testSuites, tags);
            spl.history(input, `test/run: Filtered by tags "${tags}": ${originalCount} → ${testSuites.length} suites`);
        }
        
        // Filter by name pattern if specified
        if (filter) {
            const originalCount = testSuites.length;
            const filterRegex = new RegExp(filter, 'i');
            testSuites = testSuites.filter(suite => 
                filterRegex.test(suite.testFile) || 
                filterRegex.test(suite.suite.name || '')
            );
            spl.history(input, `test/run: Filtered by pattern "${filter}": ${originalCount} → ${testSuites.length} suites`);
        }
        
        if (testSuites.length === 0) {
            spl.history(input, `test/run: No test suites found matching criteria`);
            spl.completed(input);
            return;
        }
        
        // Execute test suites
        const allResults = [];
        let totalTests = 0;
        let passedTests = 0;
        let failedTests = 0;
        
        for (const suiteInfo of testSuites) {
            spl.history(input, `test/run: Executing suite "${suiteInfo.testFile}" for module "${suiteInfo.module}"`);
            
            const suite = suiteInfo.suite;
            const suiteResults = [];
            
            if (!suite.tests || !Array.isArray(suite.tests)) {
                spl.history(input, `test/run: WARNING - Invalid test suite format in ${suiteInfo.testFile}`);
                continue;
            }
            
            // Execute individual tests in the suite
            for (const testCase of suite.tests) {
                totalTests++;
                
                if (step) {
                    spl.history(input, `test/run: STEP MODE - Press Enter to execute "${testCase.name}"`);
                    // In real implementation, this would wait for user input
                }
                
                spl.history(input, `test/run: → Running test "${testCase.name}"`);
                
                try {
                    const testResult = test.executeTest(spl, input, testCase, { 
                        isolated, 
                        timeout, 
                        debug 
                    });
                    
                    suiteResults.push(testResult);
                    
                    if (testResult.result === test.TestResult.PASS) {
                        passedTests++;
                        spl.history(input, `test/run: ✓ PASS - ${testCase.name} (${testResult.duration}ms)`);
                    } else {
                        failedTests++;
                        spl.history(input, `test/run: ✗ FAIL - ${testCase.name}: ${testResult.message}`);
                        
                        if (failfast) {
                            spl.history(input, `test/run: FAIL-FAST mode - stopping execution`);
                            break;
                        }
                    }
                    
                } catch (error) {
                    failedTests++;
                    const testResult = {
                        name: testCase.name,
                        result: test.TestResult.ERROR,
                        duration: 0,
                        message: `Test execution error: ${error.message}`,
                        error: error
                    };
                    
                    suiteResults.push(testResult);
                    spl.history(input, `test/run: ✗ ERROR - ${testCase.name}: ${error.message}`);
                    
                    if (failfast) {
                        spl.history(input, `test/run: FAIL-FAST mode - stopping execution`);
                        break;
                    }
                }
            }
            
            // Add suite results to overall results
            allResults.push({
                module: suiteInfo.module,
                suite: suiteInfo.testFile,
                results: suiteResults
            });
            
            if (failfast && failedTests > 0) break;
        }
        
        // Generate comprehensive test report
        const flatResults = allResults.flatMap(suite => suite.results);
        const report = test.generateReport(flatResults, { verbose: debug });
        
        spl.history(input, `test/run: SUMMARY - Total: ${totalTests}, Passed: ${passedTests}, Failed: ${failedTests}`);
        spl.history(input, `test/run: Success Rate: ${report.summary.successRate}%, Duration: ${report.summary.totalDuration}ms`);
        
        // Store results in workspace following API record pattern
        // STEP 1: Get the API record (gp/test)
        let apiRecord = spl.wsRef(input, "gp/test");
        if (!apiRecord) {
            apiRecord = {
                headers: { gp: { test: { api: "gp/test", timestamp: new Date().toISOString() } } },
                value: {}
            };
        }
        
        // STEP 2: Work within the API record - add test results
        const resultKey = spl.fURI("run", targetModule || "all");
        apiRecord.value[resultKey] = test.createTestRecord(targetModule || "all", {
            report: report,
            suites: allResults,
            configuration: {
                recursive, tags, filter, isolated, failfast,
                timeout, step, debug, discover
            }
        });
        
        // Save the updated API record back to workspace
        spl.wsSet(input, "gp/test", apiRecord);
        
        // Set overall execution result
        if (failedTests === 0) {
            spl.history(input, `test/run: All tests passed successfully`);
        } else {
            spl.rcSet(input.headers, "spl.execute.error", {
                message: `${failedTests} test(s) failed`,
                code: 'TEST_FAILURES',
                details: report.summary
            });
            spl.history(input, `test/run: ${failedTests} test(s) failed - check results for details`);
        }
        
    } catch (error) {
        spl.rcSet(input.headers, "spl.execute.error", {
            message: error.message,
            code: error.code || 'TEST_RUN_ERROR',
            operation: 'test/run'
        });
        
        spl.history(input, `test/run: ERROR - ${error.message}`);
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////