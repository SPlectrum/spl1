//  name        Test Execution with Isolation
//  URI         gp/test/execute
//  type        API Method
//  description Executes work packages with complete isolation using unique workspace within appDataRoot
//              Pipeline orchestrator: set-session-working-dir → run → clear-session-working-dir
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const testLib = require('gp_test');
const path = require('path');
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Isolated Test Execution Pipeline
exports.default = function gp_test_execute(input) {
    spl.history(input, `test/execute: Starting isolated test execution`);
    
    try {
        // Get base appDataRoot from context
        const baseAppDataRoot = spl.context(input, "appDataRoot");
        if (!baseAppDataRoot) {
            throw new Error("No appDataRoot available in context");
        }
        
        // Get full path to base data directory
        const cwd = spl.context(input, "cwd");
        const baseDir = path.isAbsolute(baseAppDataRoot) ? baseAppDataRoot : path.join(cwd, baseAppDataRoot);
        
        // Create unique workspace within the base appDataRoot
        const uniqueWorkspace = testLib.createUniqueWorkspace(baseDir);
        
        spl.history(input, `test/execute: Created unique workspace: ${uniqueWorkspace}`);
        
        // Forward all parameters from original request to gp/test/run
        const runParams = {};
        const originalParams = spl.action(input);
        
        // Copy all parameters except help (which would conflict)
        for (const key in originalParams) {
            if (key !== 'help') {
                runParams[key] = originalParams[key];
            }
        }
        
        // Store unique workspace path for cleanup
        spl.wsSet(input, "gp/test/unique-workspace", { value: uniqueWorkspace });
        
        // Create internal pipeline: set-session → run → cleanup
        spl.wsSet(input, "spl/execute.set-pipeline", {
            headers: {
                spl: {
                    execute: {
                        pipeline: [
                            {
                                action: "gp/config/set-session-working-dir",
                                "gp/config/set-session-working-dir": {
                                    path: uniqueWorkspace
                                }
                            },
                            {
                                action: "gp/test/run",
                                "gp/test/run": runParams
                            },
                            {
                                action: "gp/test/cleanup-workspace"
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