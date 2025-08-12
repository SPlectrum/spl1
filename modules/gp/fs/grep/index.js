//  name        Grep
//  URI         gp/fs/grep
//  type        API Method  
//  description Searches file contents for patterns within app data boundary
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const fs = require("gp_fs_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Universal Kafka Record Pattern
exports.default = function gp_fs_grep(input) {
    // Get app context and method parameters  
    const appRoot = spl.context(input, "appRoot");
    const appDataRoot = spl.context(input, "appDataRoot");
    const fullAppDataPath = spl.getFullAppDataPath(input);
    
    // Extract parameters individually for better readability and default handling
    const pattern = spl.action(input, 'pattern');
    const path = spl.action(input, 'path') || '.';
    const caseSensitive = spl.action(input, 'caseSensitive') === true;
    const recursive = spl.action(input, 'recursive') !== false; // default true
    
    // Validate required parameters
    if (!pattern) {
        throw new Error("Missing required parameter: pattern");
    }
    
    // Build options for grepSecure
    const options = {
        path,
        caseSensitive,
        recursive
    };
    
    // Search file contents
    const results = fs.grepSecure(fullAppDataPath, pattern, options);
    
    // Calculate total matches across all files
    const totalMatches = results.reduce((sum, file) => sum + file.matchCount, 0);
    
    // Create standardized grep record
    const grepRecord = {
        headers: {
            gp: {
                fs: {
                    operation: 'grep',
                    pattern: pattern,
                    path: path,
                    caseSensitive: caseSensitive,
                    recursive: recursive,
                    fileCount: results.length,
                    matchCount: totalMatches,
                    timestamp: new Date().toISOString()
                }
            }
        },
        value: {
            success: true,
            query: {
                pattern: pattern,
                path: path,
                caseSensitive: caseSensitive,
                recursive: recursive
            },
            summary: {
                fileCount: results.length,
                totalMatches: totalMatches
            },
            results: results.map(file => ({
                file: file.file,
                matchCount: file.matchCount,
                lines: file.lines.map(line => ({
                    line: line.line,
                    content: line.content,
                    matchCount: line.matches.length,
                    matches: line.matches
                }))
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
    
    // STEP 2: Work within the API record - add grep operation result
    const grepKey = spl.fURI("grep", `${pattern.replace(/[^a-zA-Z0-9]/g, '_')}_in_${path.replace(/[\\/]/g, '_')}`);
    apiRecord.value[grepKey] = grepRecord;
    
    // Save the updated API record back to workspace
    spl.wsSet(input, "gp/fs", apiRecord);
    
    spl.history(input, `fs/grep: found ${totalMatches} matches in ${results.length} files for pattern "${pattern}"`);
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////