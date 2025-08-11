//  name        Complete Execution
//  URI         spl/execute/complete
//  type        API Method
//  description The last action of an action pipeline.
//              Every continuous execution of a pipeline should finish with a complete action.
//              This should happen after new execution segments have been spawned (if there are any)
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_execute_complete ( input ) {
    spl.setContext ( input, "finishTime", Date.now() );
    spl.setContext( input, "duration", spl.context ( input, "finishTime" ) - spl.context( input, "startTime" ) );
    const status = spl.context ( input, "status" );
    console.log( "" );
    switch ( status ) {
        case "green": console.log(`${spl.context ( input, "history" )[0][0]} completed succesfully ( ${spl.context ( input, "duration" )} ms ).`); break;
        case "orange": console.log(`Command completed with warnings ( ${spl.context ( input, "duration" )} ms ).`); break;
        case "red": console.log(`Command completed with errors ( ${spl.context ( input, "duration" )} ms ).`); break;
    }
    console.log( "" );
//    console.dir ( input, { depth: 100 } );
    if ( spl.context ( input, "consoleMode" ) === "debug" ) console.log(JSON.stringify(input, null, 2));
    else if ( spl.context ( input, "consoleMode" ) === "verbose" ) console.log ( "Verbose output mode not implemented yet." );
}
///////////////////////////////////////////////////////////////////////////////
