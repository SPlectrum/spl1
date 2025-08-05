//  name        Pipeline
//  URI         spl/app/finalise
//  type        API Method
//  description Prepares execution of batch based on global settings
//              API internal command
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl")
const app = require("spl_app")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_app_finalise (input)
{ 
    // current implementation executes the batch within the same execution record - no spawning
    const splApp = spl.wsRef ( input, "spl/app" );
    if ( splApp.global.consoleMode ) spl.setContext( input, "consoleMode", splApp.global.consoleMode );

    // if help required, add to the pipeline
    if ( splApp.global.help.length > 0 ) splApp.pipeline.push ( { action: "spl/app/help", "spl/app/help": splApp.global.help } );

    // create sp/execute/set-pipeline
    if ( splApp.pipeline.length > 0 ) spl.wsSet(input, "spl/execute.set-pipeline", { headers: { spl: { execute: { pipeline: splApp.pipeline } } }, value: {} });

        // complete request if it is parseOnly
    if ( splApp.global.parseOnly ) spl.completed ( input );
    else spl.gotoExecute ( input, "spl/execute/set-pipeline" );
}
///////////////////////////////////////////////////////////////////////////////
