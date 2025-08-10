//  name        Touch Documentation Files
//  URI         gp/test/touch-docs
//  type        API Method
//  description Pipeline orchestrator: discover → touch-docs-file to update README.md timestamps
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Documentation Touch Pipeline Orchestrator
exports.default = function gp_test_touch_docs(input) {
    const modulePattern = spl.action(input, 'module');
    const recursive = spl.action(input, 'recursive') === true;
    
    if (!modulePattern) {
        spl.history(input, "touch-docs: ERROR - --module parameter is required");
        spl.completed(input);
        return;
    }
    
    spl.history(input, `touch-docs: Starting documentation timestamp update for ${modulePattern}${recursive ? ' (recursive)' : ''}`);
    
    // Set up pipeline: discover → touch-docs-file
    spl.wsSet(input, "spl/execute.set-pipeline", {
        headers: {
            spl: {
                execute: {
                    pipeline: [
                        {
                            action: "gp/test/discover",
                            "gp/test/discover": { modules: modulePattern }
                        },
                        {
                            action: "gp/test/touch-docs-file",
                            "gp/test/touch-docs-file": { recursive: recursive }
                        }
                    ]
                }
            }
        },
        value: {}
    });
    
    spl.history(input, "touch-docs: Pipeline configured (discover → touch-docs-file)");
    spl.gotoExecute(input, "spl/execute/set-pipeline");
}

///////////////////////////////////////////////////////////////////////////////