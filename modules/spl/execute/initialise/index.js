//  name        Executes the Initialise Action
//  URI         spl/execute/initialise
//  type        API Method
//  description Initialises the execution of a pipeline segemnt.
//              The output of this action is logged.
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_execute_initialise ( input ) {
    if ( spl.request ( input, "action" ) == "spl/execute/spawn" ) {
        spl.setContext ( input, "action", "spl/execute/set-next" );
    } else {
        spl.setContext ( input, "graph", { UUID: spl.generateUUID(), ancestors: [], children: [] })
        spl.setContext ( input, "pipeline", [ ]);
        spl.setContext ( input, "action", "spl/execute/next" );
    }
    spl.setContext ( input, "startTime", Date.now() );
    if( spl.context ( input, "TTL" ) === undefined ) spl.setContext ( input, "TTL", 100 );
    spl.setContext ( input, "status", "green" );
}
///////////////////////////////////////////////////////////////////////////////
