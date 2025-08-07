//  name        Find
//  URI         gp/fs/find
//  type        API Method  
//  description Finds files/directories with glob patterns and filters within app data boundary
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const fs = require("gp_fs");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Universal Kafka Record Pattern
exports.default = function gp_fs_find(input) {
    try {
        // Get app context and method parameters  
        const appRoot = spl.context(input, "appRoot");
        const appRootData = spl.context(input, "appRootData");
        const fullAppDataPath = spl.getFullAppDataPath(input);
        
        // Extract parameters individually for better readability and default handling
        const pattern = spl.action(input, 'pattern');
        const path = spl.action(input, 'path');
        const type = spl.action(input, 'type');
        const size = spl.action(input, 'size');
        const recursive = spl.action(input, 'recursive');
        const maxDepth = spl.action(input, 'maxDepth');
        const empty = spl.action(input, 'empty');
        
        // Set execution time in request context
        spl.rcSet(input.headers, "spl.request.executionTime", Date.now());
        
        spl.history(input, `fs/find: Searching for ${pattern || 'all files'} in ${path || '.'}`);
        
        // Build options for findSecure
        const options = {
            pattern,
            path,
            type,
            size,
            recursive,
            maxDepth,
            empty
        };
        
        // Find files/directories
        const results = fs.findSecure(fullAppDataPath, options);
        
        // Ensure results is an array
        if (!Array.isArray(results)) {
            throw new Error("findSecure did not return an array");
        }
        
        // Create standardized find record
        const findRecord = {
            headers: {
                gp: {
                    fs: {
                        operation: 'find',
                        pattern: pattern || '*',
                        path: path,
                        type: type || 'all',
                        recursive: recursive,
                        resultCount: results.length,
                        timestamp: new Date().toISOString()
                    }
                }
            },
            value: {
                success: true,
                query: {
                    pattern: pattern || '*',
                    path: path,
                    type: type || 'all',
                    size: size || null,
                    recursive: recursive,
                    maxDepth: maxDepth || null,
                    empty: empty
                },
                resultCount: results.length,
                results: results.map(result => ({
                    name: result.name || 'unknown',
                    path: result.path || 'unknown',
                    isFile: result.isFile || false,
                    isDirectory: result.isDirectory || false,
                    size: result.size || 0,
                    modified: result.modified ? result.modified.toISOString() : new Date().toISOString(),
                    created: result.created ? result.created.toISOString() : new Date().toISOString()
                }))
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
        
        // STEP 2: Work within the API record - add find operation result
        const findKey = spl.fURI("find", `${pattern || 'all'}_in_${path.replace(/[\\/]/g, '_')}`);
        apiRecord.value[findKey] = findRecord;
        
        // Save the updated API record back to workspace
        spl.wsSet(input, "gp/fs", apiRecord);
        
        const patternStr = pattern ? ` matching "${pattern}"` : '';
        spl.history(input, `fs/find: Found ${results.length} items${patternStr} in ${path}`);
        
    } catch (error) {
        // Handle errors - store in execution context
        let searchPath = 'unknown';
        let searchPattern = 'unknown';
        try {
            searchPath = spl.action(input, 'path') || '.';
            searchPattern = spl.action(input, 'pattern') || '*';
        } catch (e) {
            // If we can't get params, just use 'unknown'
        }
        
        spl.rcSet(input.headers, "spl.execute.error", {
            message: error.message,
            code: error.code || 'FIND_ERROR',
            path: searchPath,
            pattern: searchPattern,
            operation: 'fs/find'
        });
        
        spl.history(input, `fs/find: ERROR - ${error.message}`);
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////