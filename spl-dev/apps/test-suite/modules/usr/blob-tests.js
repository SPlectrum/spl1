//  name        blob-tests
//  URI         usr/blob-tests
//  type        API Method
//  description Auto-generated command from batch file blob-tests.txt
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function usr_blob_tests (input)
{
    // Set the appRoot configuration
    const appRoot = spl.action ( input, "appRoot" );
    spl.setConfig ( input, "spl/app", "appRoot", appRoot );
    
    // Get arguments passed to this action
    const actionArgs = spl.action(input, "args") || [];
    
    // Get the pre-parsed pipeline
    let pipeline = [
        {
                "action": "spl/blob/get",
                "spl/blob/get": {
                        "repo": "apps/test-suite",
                        "dir": "data",
                        "file": "test.txt",
                        "encoding": "text"
                }
        },
        {
                "action": "spl/blob/put",
                "spl/blob/put": {
                        "repo": "apps/test-suite",
                        "dir": "data",
                        "file": "test1.txt",
                        "contents": [
                                "This",
                                "is",
                                "test",
                                "content",
                                "for",
                                "file",
                                "1"
                        ]
                }
        },
        {
                "action": "spl/blob/copy",
                "spl/blob/copy": {
                        "from": "apps/test-suite/data/test1.txt",
                        "to": "apps/test-suite/data/test1-copy.txt"
                }
        },
        {
                "action": "spl/blob/contents",
                "spl/blob/contents": {
                        "repo": "apps/test-suite",
                        "dir": "data"
                }
        },
        {
                "action": "spl/blob/get",
                "spl/blob/get": {
                        "repo": "apps/test-suite",
                        "dir": "data",
                        "file": "test1.txt",
                        "encoding": "text"
                }
        },
        {
                "action": "spl/blob/move",
                "spl/blob/move": {
                        "from": "apps/test-suite/data/test1-copy.txt",
                        "to": "apps/test-suite/data/test1-moved.txt"
                }
        },
        {
                "action": "spl/blob/contents",
                "spl/blob/contents": {
                        "repo": "apps/test-suite",
                        "dir": "data"
                }
        },
        {
                "action": "spl/blob/delete",
                "spl/blob/delete": {
                        "repo": "apps/test-suite",
                        "dir": "data",
                        "file": "test1-moved.txt"
                }
        },
        {
                "action": "spl/blob/contents",
                "spl/blob/contents": {
                        "repo": "apps/test-suite",
                        "dir": "data"
                }
        },
        {
                "action": "spl/blob/delete",
                "spl/blob/delete": {
                        "repo": "apps/test-suite",
                        "dir": "data",
                        "file": "test1.txt"
                }
        },
        {
                "action": "spl/blob/contents",
                "spl/blob/contents": {
                        "repo": "apps/test-suite",
                        "dir": "data"
                }
        },
        {
                "action": "spl/console/log",
                "spl/console/log": {
                        "message": [
                                "Blob",
                                "module",
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