//  name        deploy_install
//  URI         usr/deploy_install
//  type        API Method
//  description Auto-generated command from batch file deploy_install.txt
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function usr_deploy_install (input)
{
    // Set the appRoot configuration
    const appRoot = spl.action ( input, "appRoot" );
    spl.setConfig ( input, "spl/app", "appRoot", appRoot );
    
    // Get arguments passed to this action
    const actionArgs = spl.action(input, "args") || [];
    
    // Get the pre-parsed pipeline
    let pipeline = [
        {
                "action": "spl/package/load",
                "spl/package/load": {
                        "repo": "install",
                        "dir": "packages",
                        "file": "dirs_toplevel.json"
                }
        },
        {
                "action": "spl/package/deploy",
                "spl/package/deploy": {
                        "repo": ".",
                        "dir": ".",
                        "file": "dirs_toplevel.json"
                }
        },
        {
                "action": "spl/package/load",
                "spl/package/load": {
                        "repo": "install",
                        "dir": "packages",
                        "file": "dirs_session.json"
                }
        },
        {
                "action": "spl/package/deploy",
                "spl/package/deploy": {
                        "repo": "runtime/sessions",
                        "dir": "client",
                        "file": "dirs_session.json"
                }
        },
        {
                "action": "spl/package/load",
                "spl/package/load": {
                        "repo": "install",
                        "dir": "packages",
                        "file": "dirs_session.json"
                }
        },
        {
                "action": "spl/package/deploy",
                "spl/package/deploy": {
                        "repo": "runtime/sessions",
                        "dir": "test",
                        "file": "dirs_session.json"
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