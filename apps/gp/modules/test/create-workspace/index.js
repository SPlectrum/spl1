//  name        Create Test Workspace
//  URI         gp/test/create-workspace
//  type        API Method
//  description Creates isolated workspace directory for test execution
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const testLib = require("gp_test_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Test Workspace Creation
exports.default = function gp_test_create_workspace(input) {
    const baseAppDataRoot = spl.context(input, "appDataRoot");
    const uniqueWorkspace = testLib.createUniqueWorkspace(baseAppDataRoot);
    
    // Store workspace path in workspace API record
    let apiRecord = spl.wsRef(input, "gp/test/workspace");
    if (!apiRecord) {
        apiRecord = {
            headers: { namespace: { api: { api: "gp/test/workspace", timestamp: new Date().toISOString() } } },
            value: {}
        };
    }
    apiRecord.value.path = uniqueWorkspace;
    spl.wsSet(input, "gp/test/workspace", apiRecord);
    spl.history(input, `create-workspace: Created workspace at ${uniqueWorkspace}`);
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////