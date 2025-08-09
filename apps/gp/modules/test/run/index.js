//  name        Test Work Package Execution
//  URI         gp/test/run
//  type        API Method  
//  description Test runner pipeline: create-workspace → test-instantiation → test-json-validation → test-basic-test → remove-workspace
//              Executes instantiation, JSON validation, and basic-test execution with workspace isolation
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Comprehensive Test Pipeline
exports.default = function gp_test_run(input) {
    spl.history(input, "test/run: Starting comprehensive test pipeline");
    
    // Create SPL pipeline: create-workspace → test-instantiation → test-json-validation → test-basic-test → remove-workspace
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
                            action: "gp/test/test-json-validation"
                        },
                        {
                            action: "gp/test/test-basic-test"
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
    
    spl.history(input, "test/run: Test pipeline configured with 5 stages (workspace + instantiation + json-validation + basic-test)");
    spl.gotoExecute(input, "spl/execute/set-pipeline");
}

///////////////////////////////////////////////////////////////////////////////