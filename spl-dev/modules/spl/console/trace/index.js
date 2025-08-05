//  name        Prints a trace a message
//  URI         spl/console/trace
//  type        API Method
//  description Print a trace message to the Console
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_console_trace (input) { 
    var message = spl.action ( input, "message" );
    if ( message.join ) message = message.join ( " " );
    console.trace ( message );
    spl.completed ( input );
} 
///////////////////////////////////////////////////////////////////////////////
