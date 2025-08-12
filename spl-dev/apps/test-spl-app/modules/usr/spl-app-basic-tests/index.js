//  name        spl-app-basic-tests
//  URI         usr/spl-app-basic-tests
//  type        API Method
//  description Auto-generated command from batch file spl-app-basic-tests.batch
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
///////////////////////////////////////////////////////////////////////////////
exports.default = function usr_spl_app_basic_tests (input)
{
    // Set the appRoot configuration
    const appRoot = spl.context ( input, "appRoot" );
    spl.setConfig ( input, "spl/app", "appRoot", appRoot );
    
    // Get arguments passed to this action
    const actionArgs = spl.action(input, "args") || [];
    
    // Get the pre-parsed pipeline
    let pipeline = [
        {
                "action": "spl/console/log",
                "spl/console/log": {
                        "message": [
                                "\"Testing",
                                "basic",
                                "spl/app",
                                "functionality\""
                        ]
                }
        },
        {
                "action": "spl/app/exec",
                "spl/app/exec": {
                        "file": "simple.batch",
                        "args": [
                                "\"test-parameter\""
                        ]
                }
        },
        {
                "action": "spl/console/log",
                "spl/console/log": {
                        "message": [
                                "\"Basic",
                                "spl/app",
                                "tests",
                                "completed\""
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