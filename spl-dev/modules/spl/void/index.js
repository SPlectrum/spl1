//  name        Void API
//  URI         spl/void
//  type        API Module
//  description This API contains methods with no input from or output into
//              the data that is passed through.
//              The can have side effects however.
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
///////////////////////////////////////////////////////////////////////////////

exports.default = function spl_void(input) {
    spl.history(input, "void: API container for operations that return no data");
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////
