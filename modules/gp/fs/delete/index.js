//  name        Delete
//  URI         gp/fs/delete
//  type        API Method  
//  description Deletes files within app data boundary
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const fs = require("gp_fs_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Universal Kafka Record Pattern
exports.default = function gp_fs_delete(input) {
    // Get app context and method parameters  
    const appRoot = spl.context(input, "appRoot");
    const appDataRoot = spl.context(input, "appDataRoot");
    const fullAppDataPath = spl.getFullAppDataPath(input);
    const params = spl.action(input);
    
    // Validate required parameters
    if (!params.file) {
        throw new Error("Missing required parameter: file");
    }
    
    // Delete the file
    fs.deleteFileSecure(fullAppDataPath, params.file);
    
    // Create standardized delete record
    const deleteRecord = {
        headers: {
            gp: {
                fs: {
                    operation: 'delete',
                    file: params.file,
                    timestamp: new Date().toISOString()
                }
            }
        },
        value: {
            success: true,
            deleted: params.file
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
    
    // STEP 2: Work within the API record - add delete operation result
    const deleteKey = spl.fURI("delete", params.file);
    apiRecord.value[deleteKey] = deleteRecord;
    
    // Save the updated API record back to workspace
    spl.wsSet(input, "gp/fs", apiRecord);
    
    spl.history(input, `fs/delete: successfully deleted ${params.file}`);
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////
