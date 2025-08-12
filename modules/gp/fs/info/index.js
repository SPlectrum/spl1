//  name        Info
//  URI         gp/fs/info
//  type        API Method  
//  description Gets file/directory information within app data boundary
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const fs = require("gp_fs_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Universal Kafka Record Pattern
exports.default = function gp_fs_info(input) {
    // Get app context and method parameters  
    const appRoot = spl.context(input, "appRoot");
    const appDataRoot = spl.context(input, "appDataRoot");
    const fullAppDataPath = spl.getFullAppDataPath(input);
    
    // Extract parameters individually for better readability and default handling
    const path = spl.action(input, 'path');
    
    // Validate required parameters
    if (!path) {
        throw new Error("Missing required parameter: path");
    }
    
    // Get file/directory information
    const pathInfo = fs.infoSecure(fullAppDataPath, path);
    
    // Create standardized info record
    const infoRecord = {
        headers: {
            gp: {
                fs: {
                    path: path,
                    operation: 'info',
                    type: pathInfo.isDirectory ? 'directory' : 'file',
                    timestamp: new Date().toISOString()
                }
            }
        },
        value: {
            path: path,
            isFile: pathInfo.isFile,
            isDirectory: pathInfo.isDirectory,
            size: pathInfo.size,
            created: pathInfo.created,
            modified: pathInfo.modified,
            accessed: pathInfo.accessed
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
    
    // STEP 2: Work within the API record - add info result
    const infoKey = spl.fURI("info", path);
    apiRecord.value[infoKey] = infoRecord;
    
    // Save the updated API record back to workspace
    spl.wsSet(input, "gp/fs", apiRecord);
    
    spl.history(input, `fs/info: retrieved info for ${path} (${pathInfo.isDirectory ? 'directory' : 'file'}, ${pathInfo.size} bytes)`);
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////
