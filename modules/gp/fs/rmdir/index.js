//  name        Rmdir
//  URI         gp/fs/rmdir
//  type        API Method  
//  description Removes directories within app data boundary
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const fs = require("gp_fs");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Universal Kafka Record Pattern
exports.default = function gp_fs_rmdir(input) {
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
        
        spl.history(input, `fs/rmdir: Removing directory ${params.path}`);
        
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
        spl.history(input, `fs/rmdir: Successfully removed directory ${params.path}${optionsStr}`);
        
    } catch (error) {
        // Handle errors - store in execution context
        let dirPath = 'unknown';
        try {
            const params = spl.action(input);
            dirPath = params?.path || 'unknown';
        } catch (e) {
            // If we can't get params, just use 'unknown'
        }
        
        spl.rcSet(input.headers, "spl.execute.error", {
            message: error.message,
            code: error.code || 'RMDIR_ERROR',
            path: dirPath,
            operation: 'fs/rmdir'
        });
        
        spl.history(input, `fs/rmdir: ERROR - ${error.message}`);
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////
