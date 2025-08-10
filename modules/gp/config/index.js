//  name        Config Module
//  URI         gp/config
//  type        API Method
//  description Configuration management API
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
///////////////////////////////////////////////////////////////////////////////

exports.default = function gp_config(input) {
    spl.history(input, "config: Main config API called");
    spl.completed(input);
};