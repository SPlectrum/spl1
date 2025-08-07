//  name        Test Execution with Isolation
//  URI         gp/test/execute
//  type        API Method
//  description Executes work packages with complete isolation using temporary workspace
//              Pipeline orchestrator: set-session-working-dir → run → clear-session-working-dir
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Isolated Test Execution Pipeline
exports.default = function gp_test_execute(input) {
    spl.history(input, `test/execute: Starting isolated test execution`);
    
    try {
        // Set base temporary workspace directory
        const baseTempWorkspace = `/tmp/spl-test`;
        
        spl.history(input, `test/execute: Using base temporary workspace: ${baseTempWorkspace}`);
        
        // Forward all parameters from original request to gp/test/run
        const runParams = {};
        const originalParams = spl.action(input);
        
        // Copy all parameters except help (which would conflict)
        for (const key in originalParams) {
            if (key !== 'help') {
                runParams[key] = originalParams[key];
            }
        }
        
        // Create internal pipeline: set-session → run → clear-session
        spl.wsSet(input, "spl/execute.set-pipeline", {
            headers: {
                spl: {
                    execute: {
                        pipeline: [
                            {
                                action: "gp/config/set-session-working-dir",
                                "gp/config/set-session-working-dir": {
                                    path: baseTempWorkspace
                                }
                            },
                            {
                                action: "gp/test/run",
                                "gp/test/run": runParams
                            },
                            {
                                action: "gp/config/clear-session-working-dir"
                            }
                        ]
                    }
                }
            },
            value: {}
        });
        
        spl.history(input, `test/execute: Pipeline configured with 3 stages`);
        spl.gotoExecute(input, "spl/execute/set-pipeline");
        
    } catch (error) {
        spl.rcSet(input.headers, "spl.execute.error", {
            message: error.message,
            code: error.code || 'EXECUTE_ERROR',
            operation: 'test/execute'
        });
        
        spl.history(input, `test/execute: ERROR - ${error.message}`);
        spl.completed(input);
    }
}
///////////////////////////////////////////////////////////////////////////////