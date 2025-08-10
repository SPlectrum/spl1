//  name        Remove Test Workspace
//  URI         gp/test/remove-workspace
//  type        API Method
//  description Removes test workspace directory and captures assets
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const testLib = require("gp_test_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Test Workspace Cleanup
exports.default = function gp_test_remove_workspace(input) {
    // Get workspace path from workspace API record
    const workspaceRecord = spl.wsRef(input, "gp/test/workspace");
    const workspacePath = workspaceRecord ? workspaceRecord.value.path : null;
    let removed = false;
    let workspaceAssets = { files: [], directories: [], totalSize: 0 };
    
    if (workspacePath) {
        // Capture workspace assets for audit
        workspaceAssets = testLib.captureWorkspaceAssets(workspacePath);
        
        // Remove workspace directory
        removed = testLib.removeWorkspace(workspacePath);
        
        // Store assets and removal status in workspace API record
        let assetsRecord = spl.wsRef(input, "gp/test/workspace-assets");
        if (!assetsRecord) {
            assetsRecord = {
                headers: { namespace: { api: { api: "gp/test/workspace-assets", timestamp: new Date().toISOString() } } },
                value: {}
            };
        }
        assetsRecord.value = {
            assets: workspaceAssets,
            removed: removed,
            workspacePath: workspacePath
        };
        spl.wsSet(input, "gp/test/workspace-assets", assetsRecord);
    }
    
    spl.history(input, workspacePath ? 
        `remove-workspace: Cleaned up workspace ${workspacePath}, removed: ${removed}` :
        "remove-workspace: No workspace found to remove"
    );
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////