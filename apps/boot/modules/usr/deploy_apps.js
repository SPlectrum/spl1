//  name        deploy_apps
//  URI         usr/deploy_apps
//  type        API Method
//  description Auto-generated command from batch file deploy_apps.batch
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function usr_deploy_apps (input)
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
                        "file": "apps_boot.json"
                }
        },
        {
                "action": "spl/package/deploy",
                "spl/package/deploy": {
                        "repo": "apps",
                        "dir": ".",
                        "file": "apps_boot.json"
                }
        },
        {
                "action": "spl/package/load",
                "spl/package/load": {
                        "repo": "install",
                        "dir": "packages",
                        "file": "apps_test-suite.json"
                }
        },
        {
                "action": "spl/package/deploy",
                "spl/package/deploy": {
                        "repo": "apps",
                        "dir": ".",
                        "file": "apps_test-suite.json"
                }
        },
        {
                "action": "spl/package/load",
                "spl/package/load": {
                        "repo": "install",
                        "dir": "packages",
                        "file": "apps_test-tools-git.json"
                }
        },
        {
                "action": "spl/package/deploy",
                "spl/package/deploy": {
                        "repo": "apps",
                        "dir": ".",
                        "file": "apps_test-tools-git.json"
                }
        },
        {
                "action": "spl/package/load",
                "spl/package/load": {
                        "repo": "install",
                        "dir": "packages",
                        "file": "apps_test-tools-7zip.json"
                }
        },
        {
                "action": "spl/package/deploy",
                "spl/package/deploy": {
                        "repo": "apps",
                        "dir": ".",
                        "file": "apps_test-tools-7zip.json"
                }
        },
        {
                "action": "spl/package/load",
                "spl/package/load": {
                        "repo": "install",
                        "dir": "packages",
                        "file": "apps_test-boot.json"
                }
        },
        {
                "action": "spl/package/deploy",
                "spl/package/deploy": {
                        "repo": "apps",
                        "dir": ".",
                        "file": "apps_test-boot.json"
                }
        },
        {
                "action": "spl/package/load",
                "spl/package/load": {
                        "repo": "install",
                        "dir": "packages",
                        "file": "apps_watcher.json"
                }
        },
        {
                "action": "spl/package/deploy",
                "spl/package/deploy": {
                        "repo": "apps",
                        "dir": ".",
                        "file": "apps_watcher.json"
                }
        },
        {
                "action": "spl/package/load",
                "spl/package/load": {
                        "repo": "install",
                        "dir": "packages",
                        "file": "apps_model.json"
                }
        },
        {
                "action": "spl/package/deploy",
                "spl/package/deploy": {
                        "repo": "apps",
                        "dir": ".",
                        "file": "apps_model.json"
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