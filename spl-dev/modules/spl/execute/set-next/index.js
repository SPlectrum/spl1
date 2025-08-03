//  name        Set Next Request
//  URI         spl/execute/set-next
//  type        API Method
//  description Sets the next request action to execute from the execution pipeline.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../../spl.js");
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_execute_set_next ( input ) {
    if(spl.context ( input, "repeatRequest" ) ) {
        spl.setContext ( input, "repeatRequest", false );
        spl.setContext ( input, "action","spl/execute/next" );
    }
    else if ( spl.context ( input, "pipeline" ).length > 0 ) {
        spl.setRequest ( input, null, structuredClone ( spl.context ( input, "pipeline" ).shift() ) );
        const requestAction = spl.request ( input, "action" );
        const requestArgs = spl.request ( input, requestAction );
        if ( requestArgs ) spl.rcSet( input.headers, requestAction.replaceAll("/","."), requestArgs );
        if( spl.request ( input, "TTL" ) > 0 ) spl.setContext( input, "TTL", spl.request ( input, "TTL" ) );
        
        // Push appRoot from request to context if present
        if( spl.request ( input, "appRoot" ) !== undefined ) {
            spl.setContext( input, "appRoot", spl.request ( input, "appRoot" ) );
        }
        
        spl.setContext ( input, "action", "spl/execute/next" );
    } 
    else spl.setContext ( input, "action", "spl/execute/complete" );
}
///////////////////////////////////////////////////////////////////////////////
