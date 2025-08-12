//  name        js-help-tests
//  URI         usr/js-help-tests
//  type        API Method
//  description Auto-generated command from batch file js-help-tests.batch
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
///////////////////////////////////////////////////////////////////////////////
exports.default = function usr_js_help_tests (input)
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
                                "\"===",
                                "Testing",
                                "help",
                                "functionality",
                                "for",
                                "JS",
                                "script",
                                "commands",
                                "===\""
                        ]
                }
        },
        {
                "action": "spl/console/log",
                "spl/console/log": {
                        "message": [
                                "\"Test",
                                "1:",
                                "spl/app/run",
                                "help\""
                        ]
                }
        },
        {
                "action": "spl/console/log",
                "spl/console/log": {
                        "message": [
                                "\"Test",
                                "2:",
                                "spl/app/wrap",
                                "help\""
                        ]
                }
        },
        {
                "action": "spl/console/log",
                "spl/console/log": {
                        "message": [
                                "\"===",
                                "JS",
                                "script",
                                "help",
                                "tests",
                                "completed",
                                "===\""
                        ]
                }
        }
];
    const globalOptions = {
        "help": [
                "spl/app/run",
                "spl/app/wrap"
        ]
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