//  name        No Operation
//  URI         spl/usr/noop
//  type        API Method
//  description This command does not execute any action.
//              It is included to facilitate testing.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_usr_noop (input) { 
    console.log ( "This command does nothing." );
    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
