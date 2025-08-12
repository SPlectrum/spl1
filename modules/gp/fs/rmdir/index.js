//  name        Rmdir
//  URI         gp/fs/rmdir
//  type        API Method  
//  description Removes directories within app data boundary
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const fs = require("gp_fs_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Universal Kafka Record Pattern
exports.default = function gp_fs_rmdir(input) {
    // Get app context and method parameters  
    const appRoot = spl.context(input, "appRoot");
    const appDataRoot = spl.context(input, "appDataRoot");
    const fullAppDataPath = spl.getFullAppDataPath(input);
    const params = spl.action(input);
    
    // Validate required parameters
    if (!params.path) {
        throw new Error("Missing required parameter: path");
    }
    
    // Remove directory with options
    const options = {
        recursive: params.recursive === true, // default to false for safety
        force: params.force === true // default to false for safety
    };
    fs.rmdirSecure(fullAppDataPath, params.path, options);
    
    // Create standardized rmdir record
    const rmdirRecord = {
        headers: {
            gp: {
                fs: {
                    operation: 'rmdir',
                    path: params.path,
                    recursive: options.recursive,
                    force: options.force,
                    timestamp: new Date().toISOString()
                }
            }
        },
        value: {
            success: true,
            removed: params.path,
            recursive: options.recursive,
            force: options.force
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
    
    // STEP 2: Work within the API record - add rmdir operation result
    const rmdirKey = spl.fURI("rmdir", params.path);
    apiRecord.value[rmdirKey] = rmdirRecord;
    
    // Save the updated API record back to workspace
    spl.wsSet(input, "gp/fs", apiRecord);
    
    const optionsStr = options.recursive ? ' (recursive)' : '';
    spl.history(input, `fs/rmdir: successfully removed directory ${params.path}${optionsStr}`);
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////
