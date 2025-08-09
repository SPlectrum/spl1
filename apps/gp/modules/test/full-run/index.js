//  name        Unified Test Pipeline
//  URI         gp/test/full-run
//  type        API Method
//  description Executes complete test pipeline: discover → plan → execute → report
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Simple Pipeline Orchestrator
exports.default = function gp_test_full_run(input) {
    spl.history(input, `test/full-run: Starting unified test pipeline`);
    
    // Get input parameters
    const modules = spl.action(input, 'modules');
    const type = spl.action(input, 'type');
    
    // Create pipeline: discover → plan → execute → report
    spl.wsSet(input, "spl/execute.set-pipeline", {
        headers: {
            spl: {
                execute: {
                    pipeline: [
                        {
                            action: "gp/test/discover",
                            "gp/test/discover": {
                                ...(modules && { modules })
                            }
                        },
                        {
                            action: "gp/test/plan",
                            "gp/test/plan": {
                                ...(type && { type })
                            }
                        },
                        {
                            action: "gp/test/execute",
                            "gp/test/execute": {}
                        },
                        {
                            action: "gp/test/report",
                            "gp/test/report": {}
                        }
                    ]
                }
            }
        },
        value: {}
    });
    
    spl.history(input, `test/full-run: Pipeline configured with 4 stages`);
    spl.gotoExecute(input, "spl/execute/set-pipeline");
}
///////////////////////////////////////////////////////////////////////////////