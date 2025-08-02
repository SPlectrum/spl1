//  name        git-status-tests
//  URI         usr/git-status-tests
//  type        API Method
//  description Auto-generated command from batch file git-status-tests.txt
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function usr_git_status_tests (input)
{
    // Set the appRoot configuration
    const appRoot = spl.action ( input, "appRoot" );
    spl.setConfig ( input, "spl/app", "appRoot", appRoot );
    
    // Get arguments passed to this action
    const actionArgs = spl.action(input, "args") || [];
    
    // Get the pre-parsed pipeline
    let pipeline = [
        {
                "action": "tools/git/status",
                "tools/git/status": {
                        "repo": "."
                }
        },
        {
                "action": "tools/git/status",
                "tools/git/status": {
                        "repo": ".",
                        "porcelain": true
                }
        },
        {
                "action": "tools/git/status",
                "tools/git/status": {
                        "repo": ".",
                        "porcelain": true
                }
        },
        {
                "action": "tools/git/status",
                "tools/git/status": {
                        "repo": ".",
                        "short": true
                }
        },
        {
                "action": "tools/git/status",
                "tools/git/status": {
                        "repo": ".",
                        "short": true
                }
        },
        {
                "action": "tools/git/status",
                "tools/git/status": {
                        "repo": ".",
                        "porcelain": true,
                        "short": true
                }
        },
        {
                "action": "tools/git/status",
                "tools/git/status": {
                        "repo": ".",
                        "porcelain": true,
                        "short": true
                }
        },
        {
                "action": "tools/git/status",
                "tools/git/status": {
                        "repo": ".",
                        "porcelain": true
                }
        }
];
    const globalOptions = {
        "help": []
};
    
    // Apply argument replacements to the pipeline
    let pipelineStr = JSON.stringify(pipeline);
    if (pipelineStr.indexOf("\$@") > -1) pipelineStr = pipelineStr.replaceAll("\$@", actionArgs.toString());
    if (pipelineStr.indexOf("\$*") > -1) pipelineStr = pipelineStr.replaceAll("\$*", actionArgs.join(" "));
    for (let i = 0; i < actionArgs.length; i++) {
        pipelineStr = pipelineStr.replaceAll("\$" + (i+1).toString(), actionArgs[i]);
    }
    pipeline = JSON.parse(pipelineStr);
    
    // Set up the execution pipeline
    spl.wsSet(input, "spl/execute.set-pipeline", {
        headers: {
            spl: {
                execute: {
                    pipeline: pipeline
                }
            }
        },
        value: {}
    });
    
    // Apply global options if any
    if (globalOptions.consoleMode) {
        spl.setContext(input, "consoleMode", globalOptions.consoleMode);
    }
    
    spl.gotoExecute ( input, "spl/execute/set-pipeline" );
}
///////////////////////////////////////////////////////////////////////////////