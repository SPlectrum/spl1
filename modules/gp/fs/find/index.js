//  name        Find
//  URI         gp/fs/find
//  type        API Method  
//  description Finds files/directories with glob patterns and filters within app data boundary
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const fs = require("gp_fs_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Universal Kafka Record Pattern
exports.default = function gp_fs_find(input) {
    // Get app context and method parameters  
    const appRoot = spl.context(input, "appRoot");
    const appDataRoot = spl.context(input, "appDataRoot");
    const fullAppDataPath = spl.getFullAppDataPath(input);
    
    // Extract parameters individually for better readability and default handling
    const pattern = spl.action(input, 'pattern');
    const path = spl.action(input, 'path');
    const type = spl.action(input, 'type');
    const size = spl.action(input, 'size');
    const recursive = spl.action(input, 'recursive');
    const maxDepth = spl.action(input, 'maxDepth');
    const empty = spl.action(input, 'empty');
    
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
    spl.history(input, `fs/find: found ${results.length} items${patternStr} in ${path}`);
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////