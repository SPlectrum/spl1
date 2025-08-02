//  name        Run
//  URI         spl/app/run
//  type        API Method
//  description This action runs a JS script
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_app_run (input)
{
    // Set the appRoot configuration
    const appRoot = spl.action(input, "appRoot");
    spl.setConfig(input, "spl/app", "appRoot", appRoot);
    
    // Get file parameters from action configuration
    const filePath = spl.action(input, "file");
    const fileArgs = spl.action(input, "args");
    
    // Create a simple pipeline: process-file -> eval
    spl.wsSet(input, "spl/execute.set-pipeline", {
        headers: {
            spl: {
                execute: {
                    pipeline: [
                        {
                            action: "spl/app/process-file",
                            "spl/app/process-file": {
                                file: filePath,
                                repo: appRoot,
                                dir: "scripts",
                                args: fileArgs
                            }
                        },
                        { action: "spl/app/eval" }
                    ]
                }
            }
        },
        value: {}
    });
    spl.gotoExecute(input, "spl/execute/set-pipeline");
}
///////////////////////////////////////////////////////////////////////////////
