//  name        Reset
//  URI         spl/app/reset
//  type        API Method
//  description This action resets an app configuration to its default
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_app_reset (input) 
{ 
    console.log ( "spl/app/reset is not implemented yet." );
    spl.history(input, "app/reset: operation completed");
    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
