//  name        Prints a warning message
//  URI         spl/console/warn
//  type        API Method
//  description Prints a warning message to the Console
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_console_warn (input) { 
    var message = spl.action ( input, "message" );
    if ( message.join ) message = message.join ( " " );
    console.warn ( message );
    spl.completed ( input );
} 
///////////////////////////////////////////////////////////////////////////////
