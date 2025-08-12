//  name        js-wrapped-execution-tests
//  URI         usr/js-wrapped-execution-tests
//  type        API Method
//  description Auto-generated command from batch file js-wrapped-execution-tests.batch
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
///////////////////////////////////////////////////////////////////////////////
exports.default = function usr_js_wrapped_execution_tests (input)
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
                                "execution",
                                "of",
                                "wrapped",
                                "JS",
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
                                "Execute",
                                "wrapped",
                                "simple",
                                "script\""
                        ]
                }
        },
        {
                "action": "usr/simple-test",
                "usr/simple-test": {
                        "message": [
                                "\"Test",
                                "1:",
                                "Execute",
                                "wrapped",
                                "simple",
                                "script\""
                        ]
                }
        },
        {
                "action": "spl/console/log",
                "spl/console/log": {
                        "message": [
                                "\"Test",
                                "2:",
                                "Execute",
                                "wrapped",
                                "args",
                                "script",
                                "with",
                                "parameters\""
                        ]
                }
        },
        {
                "action": "usr/args-test",
                "usr/args-test": {
                        "args": [
                                "hello",
                                "world"
                        ]
                }
        },
        {
                "action": "spl/console/log",
                "spl/console/log": {
                        "message": [
                                "\"Test",
                                "3:",
                                "Execute",
                                "wrapped",
                                "SPL",
                                "context",
                                "script\""
                        ]
                }
        },
        {
                "action": "usr/spl-context-test",
                "usr/spl-context-test": {
                        "message": [
                                "\"Test",
                                "3:",
                                "Execute",
                                "wrapped",
                                "SPL",
                                "context",
                                "script\""
                        ]
                }
        },
        {
                "action": "spl/console/log",
                "spl/console/log": {
                        "message": [
                                "\"===",
                                "Wrapped",
                                "JS",
                                "execution",
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