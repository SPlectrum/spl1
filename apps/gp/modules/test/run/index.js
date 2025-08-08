//  name        Test Work Package Execution
//  URI         gp/test/run
//  type        API Method
//  description Executes work packages created by plan method (instantiation, json-validation, test-execution)
//              Pipeline continuation: discover → plan → run → report
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const testLib = require('../test.js');
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Work Package Execution
exports.default = function gp_test_run(input) {
    const failfast = spl.action(input, 'failfast') === true;
    
    spl.history(input, `test/run: Starting work package execution`);
    spl.history(input, `test/run: Failfast=${failfast}`);
    
    try {
        // Get work packages from workspace
        const testApiRecord = spl.wsRef(input, "gp/test");
        if (!testApiRecord || !testApiRecord.value) {
            throw new Error("No test data available - run gp/test/discover and gp/test/plan first");
        }
        
        const currentRequestRecord = spl.wsRef(input, "gp/test/current-request");
        if (!currentRequestRecord || !currentRequestRecord.value) {
            throw new Error("No current request found - run gp/test/discover first");
        }
        
        const requestKey = currentRequestRecord.value;
        const requestRecord = testApiRecord.value[requestKey];
        
        if (!requestRecord || !requestRecord.value.plan) {
            throw new Error("No work packages found - run gp/test/plan first");
        }
        
        const workPackages = requestRecord.value.plan.workPackages || [];
        spl.history(input, `test/run: Executing ${workPackages.length} work packages`);
        
        // Create simple test context - centralized in one place
        const testContext = {
            appDataRoot: spl.context(input, "appDataRoot"),
            cwd: spl.context(input, "cwd"),
            executionHistory: []
        };
        
        const allResults = [];
        let executionStopped = false;
        
        // Execute each work package
        for (const workPackage of workPackages) {
            if (executionStopped) break;
            
            spl.history(input, `test/run: Executing ${workPackage.type} package`);
            
            let packageResults = [];
            
            try {
                if (workPackage.type === 'instantiation') {
                    packageResults = testLib.executeInstantiationPackage(testContext, workPackage);
                } else if (workPackage.type === 'json-validation') {
                    packageResults = testLib.executeJsonValidationPackage(testContext, workPackage);
                } else if (workPackage.type === 'basic-test-execution') {
                    packageResults = testLib.executeBasicTestPackage(testContext, workPackage);
                } else {
                    throw new Error(`Unknown work package type: ${workPackage.type}`);
                }
                
                allResults.push(...packageResults);
                
                // Check for failures if failfast is enabled
                if (failfast && packageResults.some(r => r.status === 'FAIL' || r.status === 'ERROR')) {
                    spl.history(input, `test/run: Stopping execution due to failfast mode`);
                    executionStopped = true;
                }
                
            } catch (error) {
                const errorResult = {
                    type: workPackage.type,
                    status: 'ERROR',
                    message: error.message,
                    duration: 0,
                    timestamp: new Date().toISOString()
                };
                
                allResults.push(errorResult);
                spl.history(input, `test/run: ERROR in ${workPackage.type}: ${error.message}`);
                
                if (failfast) {
                    spl.history(input, `test/run: Stopping execution due to error in failfast mode`);
                    executionStopped = true;
                }
            }
        }
        
        // Generate summary
        const summary = testLib.generateExecutionSummary(allResults);
        
        spl.history(input, `test/run: Executed ${allResults.length} tests - ${summary.passed} passed, ${summary.failed} failed, ${summary.errors} errors`);
        
        // Store results in workspace
        requestRecord.value.run = {
            results: allResults,
            summary: summary,
            metadata: {
                totalTests: allResults.length,
                executionStopped: executionStopped,
                timestamp: new Date().toISOString(),
                executionHistory: testContext.executionHistory
            }
        };
        
        // Update workflow to include run
        requestRecord.headers.workflow = Array.from(new Set([...requestRecord.headers.workflow, 'run']));
        
        // Save updated record
        spl.wsSet(input, "gp/test", testApiRecord);
        
        spl.history(input, `test/run: Work package execution completed`);
        
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