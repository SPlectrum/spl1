//  name        Catch error and process
//  URI         spl/error/catch
//  type        API Method
//  description Implements error catching
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_error_catch ( input ) {
    const message = spl.action ( input, "message" );
    spl.setContext ( input, "status", "red" );
    spl.history ( input, `ERROR - ${message}` );
    spl.setContext ( input, "action", "spl/execute/complete" );
}
///////////////////////////////////////////////////////////////////////////////
