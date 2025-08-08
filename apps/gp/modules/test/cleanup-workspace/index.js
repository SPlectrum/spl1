//  name        Test Workspace Cleanup  
//  URI         gp/test/cleanup-workspace
//  type        API Method
//  description Captures workspace assets for audit and safely removes unique test workspace
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const testLib = require('gp_test');
const fs = require('fs');
const path = require('path');
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Workspace Asset Capture and Cleanup
exports.default = function gp_test_cleanup_workspace(input) {
    spl.history(input, `test/cleanup-workspace: Starting workspace cleanup`);
    
    try {
        // Get unique workspace path from stored location
        const uniqueWorkspaceRecord = spl.wsRef(input, "gp/test/unique-workspace");
        if (!uniqueWorkspaceRecord || !uniqueWorkspaceRecord.value) {
            throw new Error("No unique workspace path found - cleanup cannot proceed");
        }
        
        const uniqueWorkspacePath = uniqueWorkspaceRecord.value;
        spl.history(input, `test/cleanup-workspace: Processing workspace: ${uniqueWorkspacePath}`);
        
        // Capture all assets in the workspace before cleanup
        const workspaceAssets = captureWorkspaceAssets(uniqueWorkspacePath);
        spl.history(input, `test/cleanup-workspace: Captured ${workspaceAssets.files.length} files, ${workspaceAssets.directories.length} directories`);
        
        // Store workspace assets in test results for audit
        const testApiRecord = spl.wsRef(input, "gp/test");
        if (testApiRecord && testApiRecord.value) {
            const currentRequestRecord = spl.wsRef(input, "gp/test/current-request");
            if (currentRequestRecord && currentRequestRecord.value) {
                const requestKey = currentRequestRecord.value;
                const requestRecord = testApiRecord.value[requestKey];
                
                if (requestRecord && requestRecord.value.run) {
                    // Add workspace assets to run metadata
                    requestRecord.value.run.metadata.workspaceAssets = workspaceAssets;
                    requestRecord.value.run.metadata.workspacePath = uniqueWorkspacePath;
                    
                    // Save updated record
                    spl.wsSet(input, "gp/test", testApiRecord);
                    
                    spl.history(input, `test/cleanup-workspace: Workspace assets stored in test results`);
                }
            }
        }
        
        // Safely remove the unique workspace directory
        const removed = testLib.removeWorkspace(uniqueWorkspacePath);
        if (removed) {
            spl.history(input, `test/cleanup-workspace: Successfully removed workspace directory`);
        } else {
            spl.history(input, `test/cleanup-workspace: Workspace directory was already cleaned up`);
        }
        
        // Restore default appDataRoot setting
        const appRoot = spl.context(input, "appRoot");
        if (appRoot) {
            const defaultAppRootData = `${appRoot}/data`;
            spl.rcSet(input.headers, "spl.execute.appDataRoot", defaultAppRootData);
            spl.history(input, `test/cleanup-workspace: Restored default appDataRoot: ${defaultAppRootData}`);
        }
        
        spl.history(input, `test/cleanup-workspace: Workspace cleanup completed successfully`);
        
    } catch (error) {
        spl.rcSet(input.headers, "spl.execute.error", {
            message: error.message,
            code: error.code || 'CLEANUP_WORKSPACE_ERROR',
            operation: 'test/cleanup-workspace'
        });
        
        spl.history(input, `test/cleanup-workspace: ERROR - ${error.message}`);
    }
    
    spl.completed(input);
}

// Capture all assets (files and directories) in workspace for audit
function captureWorkspaceAssets(workspacePath) {
    const assets = {
        files: [],
        directories: [],
        totalSize: 0,
        captureTime: new Date().toISOString()
    };
    
    if (!fs.existsSync(workspacePath)) {
        return assets;
    }
    
    try {
        // Recursively scan workspace directory
        scanDirectory(workspacePath, workspacePath, assets);
        
        return assets;
        
    } catch (error) {
        assets.error = error.message;
        return assets;
    }
}

// Recursively scan directory and capture file/folder information
function scanDirectory(dirPath, basePath, assets) {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const item of items) {
        const fullPath = path.join(dirPath, item.name);
        const relativePath = path.relative(basePath, fullPath);
        
        if (item.isFile()) {
            const stats = fs.statSync(fullPath);
            const fileAsset = {
                path: relativePath,
                size: stats.size,
                modified: stats.mtime.toISOString(),
                permissions: stats.mode.toString(8)
            };
            
            // For small files, include content sample for debugging
            if (stats.size > 0 && stats.size <= 1000) {
                try {
                    const content = fs.readFileSync(fullPath, 'utf8');
                    fileAsset.contentSample = content.substring(0, 200);
                    if (content.length > 200) fileAsset.contentSample += '...';
                } catch (error) {
                    fileAsset.contentSampleError = error.message;
                }
            }
            
            assets.files.push(fileAsset);
            assets.totalSize += stats.size;
            
        } else if (item.isDirectory()) {
            assets.directories.push({
                path: relativePath,
                modified: fs.statSync(fullPath).mtime.toISOString()
            });
            
            // Recurse into subdirectory
            scanDirectory(fullPath, basePath, assets);
        }
    }
}

///////////////////////////////////////////////////////////////////////////////