//  name        js-run-tests
//  URI         usr/js-run-tests
//  type        API Method
//  description Auto-generated command from batch file js-run-tests.batch
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
///////////////////////////////////////////////////////////////////////////////
exports.default = function usr_js_run_tests (input)
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
                                "spl/app/run",
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
                                "Simple",
                                "JS",
                                "script",
                                "execution\""
                        ]
                }
        },
        {
                "action": "spl/app/run",
                "spl/app/run": {
                        "file": "simple-test.js"
                }
        },
        {
                "action": "spl/console/log",
                "spl/console/log": {
                        "message": [
                                "\"Test",
                                "2:",
                                "JS",
                                "script",
                                "with",
                                "arguments\""
                        ]
                }
        },
        {
                "action": "spl/app/run",
                "spl/app/run": {
                        "file": "args-test.js",
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
                                "SPL",
                                "context",
                                "access",
                                "in",
                                "JS",
                                "script\""
                        ]
                }
        },
        {
                "action": "spl/app/run",
                "spl/app/run": {
                        "file": "spl-context-test.js"
                }
        },
        {
                "action": "spl/console/log",
                "spl/console/log": {
                        "message": [
                                "\"===",
                                "spl/app/run",
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