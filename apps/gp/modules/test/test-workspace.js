//  name        Test Workspace Auxiliary Functions
//  URI         gp/test/test-workspace
//  type        Auxiliary Library
//  description Provides workspace management functions for test isolation
///////////////////////////////////////////////////////////////////////////////
const fs = require('fs');
const path = require('path');
///////////////////////////////////////////////////////////////////////////////

// Create unique test workspace directory
exports.createUniqueWorkspace = function(spl, input, baseDir) {
    const timestamp = Date.now();
    const uuid = spl.generateUUID().substring(0, 8);
    const uniqueWorkspace = path.join(baseDir, `test-${timestamp}-${uuid}`);
    
    // Create the unique workspace directory
    fs.mkdirSync(uniqueWorkspace, { recursive: true });
    
    return uniqueWorkspace;
};

// Remove test workspace directory
exports.removeWorkspace = function(workspacePath) {
    if (fs.existsSync(workspacePath)) {
        // Safety check - only remove paths in /tmp/
        if (!workspacePath.startsWith('/tmp/')) {
            throw new Error(`Safety violation: Can only remove paths in /tmp/, got: ${workspacePath}`);
        }
        
        fs.rmSync(workspacePath, { recursive: true, force: true });
        return true;
    }
    return false;
};

// Check if workspace exists
exports.workspaceExists = function(workspacePath) {
    return fs.existsSync(workspacePath);
};

///////////////////////////////////////////////////////////////////////////////