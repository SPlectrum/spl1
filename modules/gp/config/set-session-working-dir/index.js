//  name        Set Session Working Directory
//  URI         gp/config/set-session-working-dir
//  type        API Method  
//  description Sets session-specific working directory for data operations without affecting global state
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Session Data Directory Override
exports.default = function gp_config_set_session_working_dir(input) {
    const targetPath = spl.action(input, "path") || spl.action(input, "appDataRoot");
    const appRoot = spl.context(input, "appRoot");
    
    // Simple path resolution without filesystem operations
    let resolvedPath;
    if (targetPath.startsWith('/')) {
        resolvedPath = targetPath;
    } else {
        // For relative paths, resolve relative to appRoot/data
        const appDataRoot = `${appRoot}/data`;
        resolvedPath = `${appDataRoot}/${targetPath}`;
    }
    
    // Override appDataRoot in execution context for this session
    spl.setContext(input, "appDataRoot", resolvedPath);
    
    spl.history(input, `Set appDataRoot to ${resolvedPath}`);
    
    spl.completed(input);
}

///////////////////////////////////////////////////////////////////////////////