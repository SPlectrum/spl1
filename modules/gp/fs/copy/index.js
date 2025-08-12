//  name        Copy File
//  URI         gp/fs/copy
//  type        API Method
//  description Copies files within app data boundary
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const fs = require("gp_fs_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Universal Kafka Record Pattern
exports.default = function gp_fs_copy(input) {
    // Get app context and method parameters  
    const appRoot = spl.context(input, "appRoot");
    const appDataRoot = spl.context(input, "appDataRoot");
    const fullAppDataPath = spl.getFullAppDataPath(input);
    
    // Extract parameters individually for better readability and default handling
    const from = spl.action(input, 'from');
    const to = spl.action(input, 'to');
    
    
    // Validate required parameters
    if (!from) {
        throw new Error("Missing required parameter: from");
    }
    if (!to) {
        throw new Error("Missing required parameter: to");
    }
    
    // Copy the file
    fs.copyFileSecure(fullAppDataPath, from, to);
    
    // Create standardized copy record
    const copyRecord = {
        headers: {
            gp: {
                fs: {
                    operation: 'copy',
                    from: from,
                    to: to,
                    timestamp: new Date().toISOString()
                }
            }
        },
        value: {
            success: true,
            from: from,
            to: to
        }
    };
    
    // STEP 1: Get the API record (gp/fs)
    let apiRecord = spl.wsRef(input, "gp/fs");
    if (!apiRecord) {
        // Create new API record with proper structure
        apiRecord = {
            headers: { gp: { fs: { api: "gp/fs", timestamp: new Date().toISOString() } } },
            value: {}
        };
    }
    
    // STEP 2: Work within the API record - add copy operation result
    const copyKey = spl.fURI("copy", `${from}_to_${to.replace(/[\/\\]/g, '_')}`);
    apiRecord.value[copyKey] = copyRecord;
    
    // Save the updated API record back to workspace
    spl.wsSet(input, "gp/fs", apiRecord);
    
    spl.history(input, `fs/copy: Successfully copied ${from} to ${to}`);
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////