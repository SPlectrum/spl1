//  name        Exec
//  URI         spl/app/exec
//  type        API Method
//  description This action reads commands from a file and executes them.
//              Creates a pipeline that first reads the file, then processes the commands.
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_app_exec (input)
{
    // Set the appRoot configuration
    const appRoot = spl.action ( input, "appRoot" );
    spl.setConfig ( input, "spl/app", "appRoot", appRoot );
    
    // Get file parameters from action configuration
    const filePath = spl.action ( input, "file" );

    // get the file args
    const fileArgs = spl.action ( input, "args" );
    
    // Create a pipeline that first reads the file, then processes the commands
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
                                dir: "batches",
                                args: fileArgs
                            }
                        },
                        { action: "spl/app/prepare" },
                        { action: "spl/app/parse" },
                        { action: "spl/app/pipeline" },
                        { action: "spl/app/finalise" }
                    ]
                }
            }
        },
        value: {}
    });
    spl.history(input, "app/exec: operation completed");
    spl.gotoExecute ( input, "spl/execute/set-pipeline" );
}
///////////////////////////////////////////////////////////////////////////////
