//  name        Execute Command
//  URI         spl/command/execute API Method
//  type        API Method
//  description This is the entry point for commandline command execution.
//              It sets the execution pipeline.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_command_execute (input) { 

    spl.wsSet(input, "spl/execute.set-pipeline", {
        headers: {
            spl: {
                execute: {
                    pipeline: [
                        { action: "spl/command/set", "spl/command/set": spl.action ( input, "set" ) },
                        { action: "spl/command/write", "spl/command/write": { destination: "requests" } }, 
                        { action: "spl/command/load-parser-options" },
                        { action: "spl/command/parse" },
                        { action: "spl/command/write", "spl/command/write": { destination: "responses" } },
                    ]
                }
            }
        }, 
        value: {}
    });
    spl.gotoExecute ( input, "spl/execute/set-pipeline" );
}
///////////////////////////////////////////////////////////////////////////////
