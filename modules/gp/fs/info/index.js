//  name        Info
//  URI         gp/fs/info
//  type        API Method  
//  description Gets file/directory information within app data boundary
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const fs = require("gp_fs");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Universal Kafka Record Pattern
exports.default = function gp_fs_info(input) {
    try {
        // Get app context and method parameters  
        const cwd = spl.context(input, "cwd");
        const appRoot = spl.context(input, "appRoot") || "apps/gp";
        const fullAppPath = `${cwd}/${appRoot}`;
        
        // Extract parameters individually for better readability and default handling
        const path = spl.action(input, 'path');
        
        // Set execution time in request context
        spl.rcSet(input.headers, "spl.request.executionTime", Date.now());
        
        // Validate required parameters
        if (!path) {
            throw new Error("Missing required parameter: path");
        }
        
        spl.history(input, `fs/info: Getting info for ${path}`);
        
        // Get file/directory information
        const pathInfo = fs.infoSecure(fullAppPath + "/data", path);
        
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
        
        spl.history(input, `fs/info: Retrieved info for ${path} (${pathInfo.isDirectory ? 'directory' : 'file'}, ${pathInfo.size} bytes)`);
        
    } catch (error) {
        // Handle errors - store in execution context
        let targetPath = 'unknown';
        try {
            targetPath = spl.action(input, 'path') || 'unknown';
        } catch (e) {
            // If we can't get params, just use 'unknown'
        }
        
        spl.rcSet(input.headers, "spl.execute.error", {
            message: error.message,
            code: error.code || 'INFO_ERROR',
            path: targetPath,
            operation: 'fs/info'
        });
        
        spl.history(input, `fs/info: ERROR - ${error.message}`);
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////
