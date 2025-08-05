//  name        Diff
//  URI         gp/fs/diff
//  type        API Method  
//  description Compares files or directories for differences within app data boundary
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const fs = require("gp_fs");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Universal Kafka Record Pattern
exports.default = function gp_fs_diff(input) {
    try {
        // Get app context and method parameters  
        const cwd = spl.context(input, "cwd");
        const appRoot = spl.context(input, "appRoot") || "apps/gp";
        const fullAppPath = `${cwd}/${appRoot}`;
        
        // Extract parameters individually for better readability and default handling
        const from = spl.action(input, 'from');
        const to = spl.action(input, 'to');
        const content = spl.action(input, 'content') === true; // compare file contents
        
        // Set execution time in request context
        spl.rcSet(input.headers, "spl.request.executionTime", Date.now());
        
        // Validate required parameters
        if (!from) {
            throw new Error("Missing required parameter: from");
        }
        if (!to) {
            throw new Error("Missing required parameter: to");
        }
        
        spl.history(input, `fs/diff: Comparing ${from} with ${to}`);
        
        // Compare files/directories
        const options = { content };
        const diffResult = fs.diffSecure(fullAppPath + "/data", from, to, options);
        
        // Create standardized diff record
        const diffRecord = {
            headers: {
                gp: {
                    fs: {
                        operation: 'diff',
                        from: from,
                        to: to,
                        contentCompare: content,
                        differenceCount: diffResult.differences.length,
                        timestamp: new Date().toISOString()
                    }
                }
            },
            value: {
                success: true,
                comparison: {
                    from: diffResult.from,
                    to: diffResult.to,
                    contentCompare: content,
                    identical: diffResult.differences.length === 0
                },
                differenceCount: diffResult.differences.length,
                differences: diffResult.differences
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
        
        // STEP 2: Work within the API record - add diff operation result
        const diffKey = spl.fURI("diff", `${from.replace(/[\\/]/g, '_')}_vs_${to.replace(/[\\/]/g, '_')}`);
        apiRecord.value[diffKey] = diffRecord;
        
        // Save the updated API record back to workspace
        spl.wsSet(input, "gp/fs", apiRecord);
        
        const resultMsg = diffResult.differences.length === 0 ? 
            'files are identical' : 
            `found ${diffResult.differences.length} differences`;
        spl.history(input, `fs/diff: Comparison complete - ${resultMsg}`);
        
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
            code: error.code || 'DIFF_ERROR',
            from: fromFile,
            to: toFile,
            operation: 'fs/diff'
        });
        
        spl.history(input, `fs/diff: ERROR - ${error.message}`);
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////