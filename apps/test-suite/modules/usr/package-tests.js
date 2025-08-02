//  name        package-tests
//  URI         usr/package-tests
//  type        API Method
//  description Auto-generated command from batch file package-tests.txt
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function usr_package_tests (input)
{
    // Set the appRoot configuration
    const appRoot = spl.action ( input, "appRoot" );
    spl.setConfig ( input, "spl/app", "appRoot", appRoot );
    
    // Get arguments passed to this action
    const actionArgs = spl.action(input, "args") || [];
    
    // Get the pre-parsed pipeline
    let pipeline = [
        {
                "action": "spl/console/log",
                "spl/console/log": {
                        "message": [
                                "Starting",
                                "Package",
                                "API",
                                "tests"
                        ]
                }
        },
        {
                "action": "spl/package/create",
                "spl/package/create": {
                        "repo": "apps",
                        "dir": "test2",
                        "file": "test2-package.json"
                }
        },
        {
                "action": "spl/package/save",
                "spl/package/save": {
                        "repo": "apps/test-suite",
                        "dir": "packages",
                        "file": "test2-package.json"
                }
        },
        {
                "action": "spl/package/create",
                "spl/package/create": {
                        "repo": "apps",
                        "dir": "test2",
                        "file": "test2-package2.json"
                }
        },
        {
                "action": "spl/package/save",
                "spl/package/save": {
                        "repo": "apps/test-suite",
                        "dir": "packages",
                        "file": "test2-package2.json"
                }
        },
        {
                "action": "spl/package/load",
                "spl/package/load": {
                        "repo": "apps/test-suite",
                        "dir": "packages",
                        "file": "test2-package.json"
                }
        },
        {
                "action": "spl/package/deploy",
                "spl/package/deploy": {
                        "repo": "apps/test-suite",
                        "dir": "data/test2-deployed",
                        "file": "test2-package.json"
                }
        },
        {
                "action": "spl/console/log",
                "spl/console/log": {
                        "message": [
                                "Package",
                                "API",
                                "tests",
                                "completed"
                        ]
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