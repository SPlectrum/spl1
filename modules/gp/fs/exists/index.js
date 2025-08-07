//  name        Check File/Directory Existence
//  URI         gp/fs/exists
//  type        API Method
//  description Checks if file or directory exists within app data boundary
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const fs = require("gp_fs");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Universal Kafka Record Pattern
exports.default = function gp_fs_exists(input) {
    try {
        // Get app context and method parameters  
        const appRoot = spl.context(input, "appRoot");
        const appRootData = spl.context(input, "appRootData");
        const fullAppDataPath = spl.getFullAppDataPath(input);
        const params = spl.action(input);
        
        // Set execution time in request context
        spl.rcSet(input.headers, "spl.request.executionTime", Date.now());
        
        // Validate required parameters
        if (!params.path) {
            throw new Error("Missing required parameter: path");
        }
        
        spl.history(input, `fs/exists: Checking existence of ${params.path}`);
        
        // Check if path exists
        const exists = fs.existsSecure(fullAppDataPath, params.path);
        
        // Get additional info if it exists
        let pathInfo = null;
        if (exists) {
            try {
                pathInfo = fs.infoSecure(fullAppDataPath, params.path);
            } catch (error) {
                // If we can't get info, just note it exists
                pathInfo = { exists: true, error: error.message };
            }
        }
        
        // Create standardized existence record
        const existsRecord = {
            headers: {
                gp: {
                    fs: {
                        path: params.path,
                        operation: 'exists',
                        exists: exists,
                        type: pathInfo ? (pathInfo.isDirectory ? 'directory' : 'file') : null,
                        timestamp: new Date().toISOString()
                    }
                }
            },
            value: {
                exists: exists,
                info: pathInfo
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
        
        // STEP 2: Work within the API record - add/update existence check
        const pathKey = spl.fURI("exists", params.path);
        apiRecord.value[pathKey] = existsRecord;
        
        // Save the updated API record back to workspace
        spl.wsSet(input, "gp/fs", apiRecord);
        
        spl.history(input, `fs/exists: ${params.path} ${exists ? 'exists' : 'does not exist'}`);
        
    } catch (error) {
        // Handle errors - store in execution context
        let checkPath = 'unknown';
        try {
            const params = spl.action(input);
            checkPath = params?.path || 'unknown';
        } catch (e) {
            // If we can't get params, just use 'unknown'
        }
        
        spl.rcSet(input.headers, "spl.execute.error", {
            message: error.message,
            code: error.code || 'EXISTS_ERROR',
            path: checkPath,
            operation: 'fs/exists'
        });
        
        spl.history(input, `fs/exists: ERROR - ${error.message}`);
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////
