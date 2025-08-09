//  name        Set Session Working Directory
//  URI         gp/config/set-session-working-dir
//  type        API Method  
//  description Sets session-specific working directory for data operations without affecting global state
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const fs = require("fs");
const path = require("path");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Session Data Directory Override
exports.default = function gp_config_set_session_working_dir(input) {
    const targetPath = spl.action(input, "path") || spl.action(input, "appDataRoot");
    const appRoot = spl.context(input, "appRoot");
    
    // Resolve to absolute path - relative paths are relative to appRoot/data
    let resolvedPath;
    if (path.isAbsolute(targetPath)) {
        resolvedPath = targetPath;
    } else {
        // For relative paths, resolve relative to appRoot/data
        const appDataRoot = `${appRoot}/data`;
        resolvedPath = path.resolve(appDataRoot, targetPath);
    }
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(resolvedPath)) {
        fs.mkdirSync(resolvedPath, { recursive: true });
    }
    
    // Verify it's actually a directory
    const stats = fs.statSync(resolvedPath);
    
    // Override appDataRoot in execution context for this session
    spl.setContext(input, "appDataRoot", resolvedPath);
    
    spl.history(input, `Set appDataRoot to ${resolvedPath}`);
    
    spl.completed(input);
}

///////////////////////////////////////////////////////////////////////////////