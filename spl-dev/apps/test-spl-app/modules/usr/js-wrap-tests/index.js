//  name        js-wrap-tests
//  URI         usr/js-wrap-tests
//  type        API Method
//  description Auto-generated command from batch file js-wrap-tests.batch
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
///////////////////////////////////////////////////////////////////////////////
exports.default = function usr_js_wrap_tests (input)
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
                                "spl/app/wrap",
                                "with",
                                "JavaScript",
                                "scripts",
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
                                "Wrap",
                                "simple",
                                "JS",
                                "script\""
                        ]
                }
        },
        {
                "action": "spl/app/wrap",
                "spl/app/wrap": {
                        "file": "simple-test.js"
                }
        },
        {
                "action": "spl/console/log",
                "spl/console/log": {
                        "message": [
                                "\"Test",
                                "2:",
                                "Wrap",
                                "JS",
                                "script",
                                "with",
                                "arguments\""
                        ]
                }
        },
        {
                "action": "spl/app/wrap",
                "spl/app/wrap": {
                        "file": "args-test.js"
                }
        },
        {
                "action": "spl/console/log",
                "spl/console/log": {
                        "message": [
                                "\"Test",
                                "3:",
                                "Wrap",
                                "SPL",
                                "context",
                                "script\""
                        ]
                }
        },
        {
                "action": "spl/app/wrap",
                "spl/app/wrap": {
                        "file": "spl-context-test.js"
                }
        },
        {
                "action": "spl/console/log",
                "spl/console/log": {
                        "message": [
                                "\"===",
                                "spl/app/wrap",
                                "JS",
                                "tests",
                                "completed",
                                "===\""
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