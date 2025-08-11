//  name        Set
//  URI         spl/app/set
//  type        API Method
//  description This action sets app configurations
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_app_set (input) 
{ 
    console.log ( "spl/app/set is not implemented yet." );
    spl.history(input, "app/set: operation completed");
    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
