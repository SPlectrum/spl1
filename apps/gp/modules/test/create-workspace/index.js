//  name        Create Test Workspace
//  URI         gp/test/create-workspace
//  type        API Method
//  description Creates isolated workspace directory for test execution
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const testLib = require('../test.js');
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Test Workspace Creation
exports.default = function gp_test_create_workspace(input) {
    const baseAppDataRoot = spl.context(input, "appDataRoot");
    const uniqueWorkspace = testLib.createUniqueWorkspace(baseAppDataRoot);
    
    // Store workspace path in headers metadata
    spl.rcSet(input.headers, "gp.test.workspace", uniqueWorkspace);
    spl.history(input, `create-workspace: Created workspace at ${uniqueWorkspace}`);
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////