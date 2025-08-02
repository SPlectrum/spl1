//  name        Create
//  URI         spl/app/create
//  type        API Method
//  description This action creates an action from a batch of commands.
//              Creates a pipeline that first reads the file, then processes the commands, and creates a new command.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_app_create (input)
{
    // Set the appRoot configuration
    const appRoot = spl.action ( input, "appRoot" );
    spl.setConfig ( input, "spl/app", "appRoot", appRoot );
    
    // Get file parameters from action configuration
    const filePath = spl.action ( input, "file" );

    // get the file args
    const fileArgs = spl.action ( input, "args" );
    
    // Get the action name from the filename without extension
    const actionName = filePath.replace(/\.[^/.]+$/, "");
    
    // Create a pipeline that first reads the file, then processes the commands, and creates the command
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
                                args: fileArgs,
                                skipArgs: true
                            }
                        },
                        { action: "spl/app/prepare" },
                        { action: "spl/app/parse" },
                        { action: "spl/app/pipeline" },
                        {
                            action: "spl/app/generate",
                            "spl/app/generate": {
                                actionName: actionName,
                                filePath: filePath,
                                appRoot: appRoot
                            }
                        }
                    ]
                }
            }
        },
        value: {}
    });
    spl.gotoExecute ( input, "spl/execute/set-pipeline" );
}
///////////////////////////////////////////////////////////////////////////////
