//  name        Test Execution with Isolation
//  URI         gp/test/execute
//  type        API Method
//  description Executes work packages with complete isolation using unique workspace within appDataRoot
//              Pipeline orchestrator: set-session-working-dir → run → clear-session-working-dir
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Isolated Test Execution Pipeline
exports.default = function gp_test_execute(input) {
    spl.history(input, `test/execute: Starting isolated test execution`);
    
    // Set appDataRoot to /tmp for test isolation
    spl.history(input, `test/execute: Setting appDataRoot to /tmp for test isolation`);
    
    // Forward all parameters from original request to gp/test/run
    const runParams = {};
    const originalParams = spl.action(input);
    
    // Copy all parameters except help (which would conflict)
    for (const key in originalParams) {
        if (key !== 'help') {
            runParams[key] = originalParams[key];
        }
    }
    
    // Create internal pipeline: set appDataRoot → run → clear session
    spl.wsSet(input, "spl/execute.set-pipeline", {
        headers: {
            spl: {
                execute: {
                    pipeline: [
                        {
                            action: "gp/config/set-session-working-dir",
                            "gp/config/set-session-working-dir": {
                                path: "/tmp"
                            }
                        },
                        {
                            action: "gp/test/run",
                            "gp/test/run": runParams,
                            appDataRoot: "/tmp"
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
}
///////////////////////////////////////////////////////////////////////////////