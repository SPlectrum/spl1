//  name        List Directory Contents
//  URI         gp/fs/list
//  type        API Method
//  description Lists files and directories within app data boundary
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const fs = require("gp_fs");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Universal Kafka Record Pattern
exports.default = function gp_fs_list(input) {
    try {
        // Get app context and method parameters  
        const appRoot = spl.context(input, "appRoot");
        const appRootData = spl.context(input, "appRootData");
        const fullAppDataPath = spl.getFullAppDataPath(input);
        const params = spl.action(input);
        
        // Set execution time in request context
        spl.rcSet(input.headers, "spl.request.executionTime", Date.now());
        
        const targetPath = params.path || '.';
        spl.history(input, `fs/list: Listing directory ${targetPath}`);
        
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
        
        spl.history(input, `fs/list: Found ${entries.length} entries in ${targetPath}`);
        
    } catch (error) {
        // Handle errors - store in execution context
        let dirPath = 'unknown';
        try {
            const params = spl.action(input);
            dirPath = params?.path || '.';
        } catch (e) {
            // If we can't get params, just use 'unknown'
        }
        
        spl.rcSet(input.headers, "spl.execute.error", {
            message: error.message,
            code: error.code || 'LIST_ERROR',
            path: dirPath,
            operation: 'fs/list'
        });
        
        spl.history(input, `fs/list: ERROR - ${error.message}`);
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////
