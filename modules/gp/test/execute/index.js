//  name        Test Execution with Isolation
//  URI         gp/test/execute
//  type        API Method
//  description Executes work packages with complete isolation using unique workspace within appDataRoot
//              Pipeline orchestrator: set-session-working-dir → run → clear-session-working-dir
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Isolated Test Execution Pipeline
exports.default = function gp_test_execute(input) {
    // Extract and forward module parameter to gp/test/run
    const moduleFilter = spl.action(input, 'module');
    
    const runParams = {};
    if (moduleFilter) {
        runParams.module = moduleFilter;
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
    
    spl.history(input, "test/execute: Isolated test execution pipeline configured with 3 stages (set working dir to /tmp → run tests → clear working dir)");
    spl.gotoExecute(input, "spl/execute/set-pipeline");
}
///////////////////////////////////////////////////////////////////////////////