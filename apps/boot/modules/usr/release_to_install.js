//  name        release_to_install
//  URI         usr/release_to_install
//  type        API Method
//  description Auto-generated command from batch file release_to_install.batch
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function usr_release_to_install (input)
{
    // Set the appRoot configuration
    const appRoot = spl.action ( input, "appRoot" );
    spl.setConfig ( input, "spl/app", "appRoot", appRoot );
    
    // Get arguments passed to this action
    const actionArgs = spl.action(input, "args") || [];
    
    // Get the pre-parsed pipeline
    let pipeline = [
        {
                "action": "spl/package/create",
                "spl/package/create": {
                        "repo": "../release",
                        "dir": ".",
                        "file": "release_files.json"
                }
        },
        {
                "action": "spl/package/deploy",
                "spl/package/deploy": {
                        "repo": "..",
                        "dir": "$1",
                        "file": "release_files.json"
                }
        },
        {
                "action": "spl/package/create",
                "spl/package/create": {
                        "repo": "..",
                        "dir": "modules",
                        "file": "modules_spl.json"
                }
        },
        {
                "action": "spl/package/deploy",
                "spl/package/deploy": {
                        "repo": "../$1/install",
                        "dir": ".",
                        "file": "modules_spl.json"
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