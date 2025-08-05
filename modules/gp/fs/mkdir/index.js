//  name        Mkdir
//  URI         gp/fs/mkdir
//  type        API Method  
//  description Creates directories within app data boundary
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const fs = require("gp_fs");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Universal Kafka Record Pattern
exports.default = function gp_fs_mkdir(input) {
    try {
        // Get app context and method parameters  
        const cwd = spl.context(input, "cwd");
        const appRoot = spl.context(input, "appRoot") || "apps/gp";
        const fullAppPath = `${cwd}/${appRoot}`;
        const params = spl.action(input);
        
        // Set execution time in request context
        spl.rcSet(input.headers, "spl.request.executionTime", Date.now());
        
        // Validate required parameters
        if (!params.path) {
            throw new Error("Missing required parameter: path");
        }
        
        spl.history(input, `fs/mkdir: Creating directory ${params.path}`);
        
        // Create directory with options
        const options = {
            recursive: params.recursive !== false // default to true unless explicitly false
        };
        fs.mkdirSecure(fullAppPath + "/data", params.path, options);
        
        // Create standardized mkdir record
        const mkdirRecord = {
            headers: {
                gp: {
                    fs: {
                        operation: 'mkdir',
                        path: params.path,
                        recursive: options.recursive,
                        timestamp: new Date().toISOString()
                    }
                }
            },
            value: {
                success: true,
                created: params.path,
                recursive: options.recursive
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
        
        // STEP 2: Work within the API record - add mkdir operation result
        const mkdirKey = spl.fURI("mkdir", params.path);
        apiRecord.value[mkdirKey] = mkdirRecord;
        
        // Save the updated API record back to workspace
        spl.wsSet(input, "gp/fs", apiRecord);
        
        spl.history(input, `fs/mkdir: Successfully created directory ${params.path}${options.recursive ? ' (recursive)' : ''}`);
        
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
            code: error.code || 'MKDIR_ERROR',
            path: dirPath,
            operation: 'fs/mkdir'
        });
        
        spl.history(input, `fs/mkdir: ERROR - ${error.message}`);
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////
