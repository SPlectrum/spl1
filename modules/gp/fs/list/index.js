//  name        List Directory Contents
//  URI         gp/fs/list
//  type        API Method
//  description Lists files and directories within app data boundary
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const fs = require("gp_fs_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Universal Kafka Record Pattern
exports.default = function gp_fs_list(input) {
    // Get app context and method parameters  
    const appRoot = spl.context(input, "appRoot");
    const appDataRoot = spl.context(input, "appDataRoot");
    const fullAppDataPath = spl.getFullAppDataPath(input);
    const params = spl.action(input);
    
    const targetPath = params.path || '.';
    
    // List directory contents
    const entries = fs.listSecure(fullAppDataPath, targetPath, {
        includeStats: params.stats
    });
    
    // Create standardized directory record
    const listRecord = {
        headers: {
            gp: {
                fs: {
                    path: targetPath,
                    type: 'directory',
                    operation: 'list',
                    count: entries.length,
                    timestamp: new Date().toISOString()
                }
            }
        },
        value: entries
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
    
    // STEP 2: Work within the API record - add/update directory listing
    const dirKey = spl.fURI("list", targetPath === '.' ? 'root' : targetPath);
    apiRecord.value[dirKey] = listRecord;
    
    // Save the updated API record back to workspace
    spl.wsSet(input, "gp/fs", apiRecord);
    
    spl.history(input, `fs/list: found ${entries.length} entries in ${targetPath}`);
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////
