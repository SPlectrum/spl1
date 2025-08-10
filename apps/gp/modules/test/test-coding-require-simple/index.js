//  name        Simple Coding Require Test
//  URI         gp/test/test-coding-require-simple
//  type        API Method
//  description Simple test to debug the issue
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
///////////////////////////////////////////////////////////////////////////////

exports.default = function gp_test_test_coding_require_simple(input) {
    spl.history(input, `test-coding-require-simple: Starting simple test`);
    spl.completed(input);
}