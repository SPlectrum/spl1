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
    
    // Resolve to absolute path
    const resolvedPath = path.isAbsolute(targetPath) 
        ? targetPath 
        : path.resolve(targetPath);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(resolvedPath)) {
        fs.mkdirSync(resolvedPath, { recursive: true });
    }
    
    // Verify it's actually a directory
    const stats = fs.statSync(resolvedPath);
    
    // Override appDataRoot in execution context for this session
    spl.setContext(input, "appDataRoot", resolvedPath);
    
    spl.history(input, `config/set-session-working-dir: Set appDataRoot to ${resolvedPath}`);
    
    spl.completed(input);
}

///////////////////////////////////////////////////////////////////////////////