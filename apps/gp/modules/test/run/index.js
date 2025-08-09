//  name        Test Work Package Execution
//  URI         gp/test/run
//  type        API Method  
//  description Test runner pipeline: create-workspace → test-instantiation → remove-workspace
//              Executes instantiation tests with workspace isolation
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Simple Workspace Pipeline
exports.default = function gp_test_run(input) {
    spl.history(input, "test/run: Starting simple workspace pipeline");
    
    // Create SPL pipeline: create-workspace → test-instantiation → remove-workspace
    spl.wsSet(input, "spl/execute.set-pipeline", {
        headers: {
            spl: {
                execute: {
                    pipeline: [
                        {
                            action: "gp/test/create-workspace"
                        },
                        {
                            action: "gp/test/test-instantiation"
                        },
                        {
                            action: "gp/test/remove-workspace"
                        }
                    ]
                }
            }
        },
        value: {}
    });
    
    spl.history(input, "test/run: Test pipeline configured with 3 stages (workspace + instantiation)");
    spl.gotoExecute(input, "spl/execute/set-pipeline");
}

///////////////////////////////////////////////////////////////////////////////