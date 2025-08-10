//  name        No Operation
//  URI         spl/void/noop
//  type        API Method
//  description This command does not execute any action.
//              It is included to facilitate testing.
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_void_noop(input) { 
    const appRoot = spl.context(input, "appRoot");
    console.log("This command does nothing.");
    console.log(`AppRoot context: ${appRoot}`);
    spl.history(input, "noop: Void operation completed - no data returned");
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////
