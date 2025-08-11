//  name        Touch Documentation Files
//  URI         gp/test/touch-docs
//  type        API Method
//  description Pipeline orchestrator: discover → touch-docs-file to update README.md timestamps
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Documentation Touch Pipeline Orchestrator
exports.default = function gp_test_touch_docs(input) {
    const modulePattern = spl.action(input, 'modules');
    const recursive = spl.action(input, 'recursive') === true;
    
    if (modulePattern) {
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
    }
    
    spl.history(input, modulePattern ? 
        `touch-docs: Documentation pipeline configured for ${modulePattern}${recursive ? ' (recursive)' : ''} (discover → touch-docs-file)` :
        "touch-docs: ERROR - --modules parameter is required"
    );
    
    if (modulePattern) {
        spl.gotoExecute(input, "spl/execute/set-pipeline");
    } else {
        spl.completed(input);
    }
}

///////////////////////////////////////////////////////////////////////////////