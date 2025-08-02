//  name        tools-7zip-help-tests
//  URI         usr/tools-7zip-help-tests
//  type        API Method
//  description Auto-generated command from batch file tools-7zip-help-tests.batch
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function usr_tools_7zip_help_tests (input)
{
    // Set the appRoot configuration
    const appRoot = spl.action ( input, "appRoot" );
    spl.setConfig ( input, "spl/app", "appRoot", appRoot );
    
    // Get arguments passed to this action
    const actionArgs = spl.action(input, "args") || [];
    
    // Get the pre-parsed pipeline
    let pipeline = [];
    const globalOptions = {
        "help": [
                "tools/7zip/add",
                "tools/7zip/add",
                "tools/7zip/extract",
                "tools/7zip/extract",
                "tools/7zip/extract-flat",
                "tools/7zip/extract-flat",
                "tools/7zip/list",
                "tools/7zip/list",
                "tools/7zip/test",
                "tools/7zip/test",
                "tools/7zip/update",
                "tools/7zip/update",
                "tools/7zip/delete",
                "tools/7zip/delete"
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