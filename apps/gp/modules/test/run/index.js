//  name        Test Work Package Execution
//  URI         gp/test/run
//  type        API Method
//  description Executes work packages created by plan method (instantiation, json-validation, test-execution)
//              Pipeline continuation: discover → plan → run → report
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const fs = require('fs');
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Work Package Execution
exports.default = function gp_test_run(input) {
    const failfast = spl.action(input, 'failfast') === true;
    
    spl.history(input, `test/run: Starting work package execution`);
    spl.history(input, `test/run: Failfast=${failfast}`);
    
    try {
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
        
        // Execute each work package
        for (const workPackage of workPackages) {
            if (executionStopped) break;
            
            spl.history(input, `test/run: Executing ${workPackage.type} package`);
            
            let packageResults = [];
            
            try {
                switch (workPackage.type) {
                    case 'instantiation':
                        packageResults = executeInstantiationPackage(input, workPackage);
                        break;
                    case 'json-validation':
                        packageResults = executeJsonValidationPackage(input, workPackage);
                        break;
                    case 'test-execution':
                        packageResults = executeTestExecutionPackage(input, workPackage);
                        break;
                    default:
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
        
        // Generate summary
        const summary = generateExecutionSummary(allResults);
        
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
    }
    
    spl.completed(input);
}

// Execute instantiation work package - test that modules can be required
function executeInstantiationPackage(input, workPackage) {
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
}

// Execute JSON validation work package - test that JSON files are valid
function executeJsonValidationPackage(input, workPackage) {
    const results = [];
    
    spl.history(input, `test/run: Validating JSON for ${workPackage.filePaths.length} files`);
    
    for (const filePath of workPackage.filePaths) {
        const startTime = Date.now();
        
        try {
            // Read file content
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
}

// Execute test execution work package - stub for now
function executeTestExecutionPackage(input, workPackage) {
    const results = [];
    
    spl.history(input, `test/run: Stubbing test execution for ${workPackage.commands?.length || 0} commands`);
    
    // For now, just create stub results
    for (const command of workPackage.commands || []) {
        results.push({
            type: 'test-execution',
            testFile: command.testFile,
            targetModule: command.targetModule,
            syntax: command.syntax,
            status: 'STUB',
            message: 'Test execution stubbed - not yet implemented',
            duration: 0,
            timestamp: new Date().toISOString()
        });
        
        spl.history(input, `test/run: STUB ${command.testFile} (${command.syntax})`);
    }
    
    return results;
}

// Generate execution summary
function generateExecutionSummary(results) {
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
}

///////////////////////////////////////////////////////////////////////////////