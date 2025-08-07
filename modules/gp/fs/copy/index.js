//  name        Copy File
//  URI         gp/fs/copy
//  type        API Method
//  description Copies files within app data boundary
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const fs = require("gp_fs");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Universal Kafka Record Pattern
exports.default = function gp_fs_copy(input) {
    try {
        // Get app context and method parameters  
        const appRoot = spl.context(input, "appRoot");
        const appRootData = spl.context(input, "appRootData");
        const fullAppDataPath = spl.getFullAppDataPath(input);
        
        // Extract parameters individually for better readability and default handling
        const from = spl.action(input, 'from');
        const to = spl.action(input, 'to');
        
        // Set execution time in request context
        spl.rcSet(input.headers, "spl.request.executionTime", Date.now());
        
        // Validate required parameters
        if (!from) {
            throw new Error("Missing required parameter: from");
        }
        if (!to) {
            throw new Error("Missing required parameter: to");
        }
        
        spl.history(input, `fs/copy: Copying ${from} to ${to}`);
        
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
        
    } catch (error) {
        // Handle errors - store in execution context
        let fromFile = 'unknown';
        let toFile = 'unknown';
        try {
            fromFile = spl.action(input, 'from') || 'unknown';
            toFile = spl.action(input, 'to') || 'unknown';
        } catch (e) {
            // If we can't get params, just use 'unknown'
        }
        
        spl.rcSet(input.headers, "spl.execute.error", {
            message: error.message,
            code: error.code || 'COPY_ERROR',
            from: fromFile,
            to: toFile,
            operation: 'fs/copy'
        });
        
        spl.history(input, `fs/copy: ERROR - ${error.message}`);
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////