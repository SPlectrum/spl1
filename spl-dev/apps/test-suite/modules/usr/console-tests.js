//  name        console-tests
//  URI         usr/console-tests
//  type        API Method
//  description Auto-generated command from batch file console-tests.txt
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function usr_console_tests (input)
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
                                "Testing",
                                "console",
                                "log",
                                "functionality"
                        ]
                }
        },
        {
                "action": "spl/console/log",
                "spl/console/log": {
                        "message": [
                                "This",
                                "is",
                                "a",
                                "standard",
                                "log",
                                "message"
                        ]
                }
        },
        {
                "action": "spl/console/log",
                "spl/console/log": {
                        "message": [
                                "Testing",
                                "with",
                                "special",
                                "characters:",
                                "!@#$%^&*()"
                        ]
                }
        },
        {
                "action": "spl/console/warn",
                "spl/console/warn": {
                        "message": [
                                "This",
                                "is",
                                "a",
                                "warning",
                                "message"
                        ]
                }
        },
        {
                "action": "spl/console/warn",
                "spl/console/warn": {
                        "message": [
                                "Testing",
                                "warning",
                                "with",
                                "multiple",
                                "words",
                                "and",
                                "numbers",
                                "123"
                        ]
                }
        },
        {
                "action": "spl/console/error",
                "spl/console/error": {
                        "message": [
                                "This",
                                "is",
                                "an",
                                "error",
                                "message"
                        ]
                }
        },
        {
                "action": "spl/console/error",
                "spl/console/error": {
                        "message": [
                                "Testing",
                                "error",
                                "handling",
                                "capabilities"
                        ]
                }
        },
        {
                "action": "spl/console/trace",
                "spl/console/trace": {
                        "message": [
                                "This",
                                "is",
                                "a",
                                "trace",
                                "message"
                        ]
                }
        },
        {
                "action": "spl/console/trace",
                "spl/console/trace": {
                        "message": [
                                "Testing",
                                "trace",
                                "functionality",
                                "for",
                                "debugging"
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