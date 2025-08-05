//  name        No Operation
//  URI         spl/usr/noop
//  type        API Method
//  description This command does not execute any action.
//              It is included to facilitate testing.
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_usr_noop (input) { 
    const appRoot = spl.context(input, "appRoot");
    console.log ( "This command does nothing." );
    console.log ( `AppRoot context: ${appRoot}` );
    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
