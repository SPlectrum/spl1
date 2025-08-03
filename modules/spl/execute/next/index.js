//  name        Executes the next action
//  URI         spl/execution/next
//  type        API Method
//  description Executes the next action request.
//              It also routes data and error tasks raised by the request action.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_execute_next ( input ) 
{
    spl.moduleAction(input, spl.request ( input, "action" ) );
    switch(spl.request ( input, "status" ) ) {
        case "data": 
            spl.setContext( input, "action", spl.request ( input, "data_next" ) ); 
            spl.setContext( input, "repeatRequest", spl.request ( input, "repeat" ) ); 
        break;
        case "blob": 
            spl.setContext( input, "action", spl.request ( input, "blob_next" ) ); 
            spl.setContext( input, "repeatRequest", spl.request ( input, "repeat" ) );
        break;
        case "error": spl.setContext( input, "action", "spl/error/catch" ); break;
        case "execute": spl.setContext( input, "action", spl.request ( input, "execute_next" ) ); break;
        case "completed": spl.setContext( input, "action", "spl/execute/set-next" ); break;
        default: spl.setContext( input, "action", "spl/execute/complete" );
    }
}
///////////////////////////////////////////////////////////////////////////////
