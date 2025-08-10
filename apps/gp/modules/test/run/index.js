//  name        Test Work Package Execution
//  URI         gp/test/run
//  type        API Method  
//  description Test runner pipeline: create-workspace → test-instantiation → test-json-validation → test-basic-test → test-docs-present → test-docs-current → test-file-type → test-coding-require → test-coding-export → test-coding-args → test-coding-header → test-coding-errors → test-coding-complete → test-coding-naming → test-coding-history → remove-workspace  
//              Executes instantiation, JSON validation, basic-test execution, documentation presence, documentation currency, file type validation, and coding standards testing with workspace isolation
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Comprehensive Test Pipeline
exports.default = function gp_test_run(input) {
    spl.history(input, "test/run: Starting comprehensive test pipeline");
    
    // Create SPL pipeline: create-workspace → test-instantiation → test-json-validation → test-basic-test → test-docs-present → test-docs-current → test-file-type → remove-workspace
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
                            action: "gp/test/test-docs-present"
                        },
                        {
                            action: "gp/test/test-docs-current"
                        },
                        {
                            action: "gp/test/test-file-type"
                        },
                        {
                            action: "gp/test/test-coding-require"
                        },
                        {
                            action: "gp/test/test-coding-export"
                        },
                        {
                            action: "gp/test/test-coding-args"
                        },
                        {
                            action: "gp/test/test-coding-header"
                        },
                        {
                            action: "gp/test/test-coding-errors"
                        },
                        {
                            action: "gp/test/test-coding-complete"
                        },
                        {
                            action: "gp/test/test-coding-naming"
                        },
                        {
                            action: "gp/test/test-coding-history"
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
    
    spl.history(input, "test/run: Test pipeline configured with 10 stages (workspace + instantiation + json-validation + basic-test + docs-present + docs-current + file-type + coding-require + coding-export)");
    spl.gotoExecute(input, "spl/execute/set-pipeline");
}

///////////////////////////////////////////////////////////////////////////////