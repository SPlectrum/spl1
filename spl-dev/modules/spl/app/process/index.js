//  name        Process
//  URI         spl/app/process
//  type        API Method
//  description This is the entry action to prepare, parse and execute the command line string.
//              API internal command
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_app_process (input)
{ 
    spl.setConfig ( input, "spl/app", "appRoot", spl.action ( input, "appRoot" ) );
    spl.wsSet(input, "spl/execute.set-pipeline", {
        headers: {
            spl: {
                execute: {
                    pipeline: [
                        { action: "spl/app/prepare", "spl/app/prepare": { batch: spl.action ( input, "batch" ) } },
                        { action: "spl/app/parse" },
                        { action: "spl/app/pipeline" },
                        { action: "spl/app/finalise" }
                    ]
                }
            }
        }, 
        value: {}
    });
    spl.history(input, "app/process: operation completed");
    spl.gotoExecute ( input, "spl/execute/set-pipeline" );
}
///////////////////////////////////////////////////////////////////////////////
