//  name        Test Work Package Execution
//  URI         gp/test/run
//  type        API Method
//  description Executes work packages created by plan method (instantiation, json-validation, test-execution)
//              Pipeline continuation: discover → plan → run → report
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const testLib = require('../test.js');
const workspace = require('../test-workspace.js');
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Work Package Execution
exports.default = function gp_test_run(input) {
    const failfast = spl.action(input, 'failfast') === true;
    let uniqueWorkspace = null;
    
    spl.history(input, `test/run: Starting work package execution`);
    spl.history(input, `test/run: Failfast=${failfast}`);
    
    try {
        // Create unique test workspace if we're in a temp data directory
        const appRootData = spl.context(input, "appRootData");
        
        if (appRootData && appRootData.startsWith('/tmp/spl-test')) {
            // Use SPL's standard path resolution
            const basePath = spl.getFullAppDataPath(input);
            
            uniqueWorkspace = workspace.createUniqueWorkspace(spl, input, basePath);
            spl.history(input, `test/run: Created unique workspace: ${uniqueWorkspace}`);
            
            // Update appRootData to point to our unique workspace (keep as absolute if it was absolute)
            const newAppRootData = appRootData.startsWith('/') ? uniqueWorkspace : uniqueWorkspace.replace(`${spl.context(input, "cwd")}/`, '');
            spl.rcSet(input.headers, "spl.execute.appRootData", newAppRootData);
        }
        // Get work packages from pattern-based workspace
        const testApiRecord = spl.wsRef(input, "gp/test");
        if (!testApiRecord || !testApiRecord.value) {
            throw new Error("No test data available - run gp/test/discover and gp/test/plan first");
        }
        
        // Find the current request record  
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
        
        const allResults = [];
        let executionStopped = false;
        
        // Execute each work package using functions from test.js
        for (const workPackage of workPackages) {
            if (executionStopped) break;
            
            spl.history(input, `test/run: Executing ${workPackage.type} package`);
            
            let packageResults = [];
            
            try {
                // Map work package type to execution function
                const packageExecutors = {
                    'instantiation': testLib.executeInstantiationPackage,
                    'json-validation': testLib.executeJsonValidationPackage,
                    'basic-test-execution': testLib.executeBasicTestPackage
                };
                
                const executor = packageExecutors[workPackage.type];
                if (executor) {
                    packageResults = executor(spl, input, workPackage);
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
                
                if (failfast) {
                    spl.history(input, `test/run: Stopping execution due to error in failfast mode`);
                    executionStopped = true;
                }
            }
        }
        
        // Generate summary using function from test.js
        const summary = testLib.generateExecutionSummary(allResults);
        
        spl.history(input, `test/run: Executed ${allResults.length} tests - ${summary.passed} passed, ${summary.failed} failed, ${summary.errors} errors`);
        
        // Store run results in the same request record
        requestRecord.value.run = {
            results: allResults,
            summary: summary,
            metadata: {
                totalTests: allResults.length,
                executionStopped: executionStopped,
                timestamp: new Date().toISOString()
            }
        };
        
        // Update workflow to include run
        requestRecord.headers.workflow = Array.from(new Set([...requestRecord.headers.workflow, 'run']));
        
        // Save updated record
        spl.wsSet(input, "gp/test", testApiRecord);
        
        // Set error if any tests failed
        if (summary.failed > 0 || summary.errors > 0) {
            spl.rcSet(input.headers, "spl.execute.error", {
                message: `Test execution failed: ${summary.failed} failed, ${summary.errors} errors`,
                code: 'TEST_EXECUTION_FAILED',
                details: summary
            });
        }
        
        spl.history(input, `test/run: Work package execution completed`);
        
    } catch (error) {
        spl.rcSet(input.headers, "spl.execute.error", {
            message: error.message,
            code: error.code || 'TEST_RUN_ERROR',
            operation: 'test/run'
        });
        
        spl.history(input, `test/run: ERROR - ${error.message}`);
    } finally {
        // Clean up unique workspace if it was created
        if (uniqueWorkspace) {
            try {
                const removed = workspace.removeWorkspace(uniqueWorkspace);
                if (removed) {
                    spl.history(input, `test/run: Cleaned up workspace: ${uniqueWorkspace}`);
                } else {
                    spl.history(input, `test/run: Workspace already cleaned up: ${uniqueWorkspace}`);
                }
            } catch (cleanupError) {
                spl.history(input, `test/run: WARNING - Cleanup failed: ${cleanupError.message}`);
            }
        }
    }
    
    spl.completed(input);
}

///////////////////////////////////////////////////////////////////////////////