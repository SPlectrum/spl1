//  name        Prints an error message
//  URI         spl/console/error
//  type        API Method
//  description Prints an error message to the Console
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_console_error (input) { 
    var message = spl.action ( input, "message" );
    if(message.join) message = message.join(" ");
    console.error(message);
    spl.completed(input);
} 
///////////////////////////////////////////////////////////////////////////////
