//  name        Diff
//  URI         gp/fs/diff
//  type        API Method  
//  description Compares files or directories for differences within app data boundary
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const fs = require("gp_fs_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Universal Kafka Record Pattern
exports.default = function gp_fs_diff(input) {
    // Get app context and method parameters  
    const appRoot = spl.context(input, "appRoot");
    const appDataRoot = spl.context(input, "appDataRoot");
    const fullAppDataPath = spl.getFullAppDataPath(input);
    
    // Extract parameters individually for better readability and default handling
    const from = spl.action(input, 'from');
    const to = spl.action(input, 'to');
    const content = spl.action(input, 'content') === true; // compare file contents
    
    // Validate required parameters
    if (!from) {
        throw new Error("Missing required parameter: from");
    }
    if (!to) {
        throw new Error("Missing required parameter: to");
    }
    
    // Compare files/directories
    const options = { content };
    const diffResult = fs.diffSecure(fullAppDataPath, from, to, options);
    
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
    spl.history(input, `fs/diff: comparison complete - ${resultMsg}`);
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////