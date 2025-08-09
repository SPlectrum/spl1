//  name        Remove Test Workspace
//  URI         gp/test/remove-workspace
//  type        API Method
//  description Removes test workspace directory and captures assets
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const testLib = require('../test.js');
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Test Workspace Cleanup
exports.default = function gp_test_remove_workspace(input) {
    // Get workspace path from headers metadata
    const workspacePath = spl.rcRef(input.headers, "gp.test.workspace");
    if (!workspacePath) {
        spl.history(input, "remove-workspace: No workspace found to remove");
        spl.completed(input);
        return;
    }
    
    // Capture workspace assets for audit
    const workspaceAssets = testLib.captureWorkspaceAssets(workspacePath);
    
    // Remove workspace directory
    const removed = testLib.removeWorkspace(workspacePath);
    
    // Store assets and removal status in headers metadata
    spl.rcSet(input.headers, "gp.test.workspace-assets", {
        assets: workspaceAssets,
        removed: removed,
        workspacePath: workspacePath
    });
    
    spl.history(input, `remove-workspace: Cleaned up workspace ${workspacePath}, removed: ${removed}`);
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////