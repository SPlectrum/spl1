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
    try {
        const targetPath = spl.action(input, "path");
        
        spl.history(input, `config/set-session-working-dir: Setting session workspace to ${targetPath}`);
        
        // Validate required parameter
        if (!targetPath) {
            throw new Error("Missing required parameter: path");
        }
        
        // Resolve to absolute path
        const resolvedPath = path.isAbsolute(targetPath) 
            ? targetPath 
            : path.resolve(targetPath);
        
        // Create directory if it doesn't exist
        if (!fs.existsSync(resolvedPath)) {
            fs.mkdirSync(resolvedPath, { recursive: true });
            spl.history(input, `config/set-session-working-dir: Created directory ${resolvedPath}`);
        }
        
        // Verify it's actually a directory
        const stats = fs.statSync(resolvedPath);
        if (!stats.isDirectory()) {
            throw new Error(`Path exists but is not a directory: ${resolvedPath}`);
        }
        
        // Override appDataRoot in execution context for this session
        spl.rcSet(input.headers, "spl.execute.appDataRoot", resolvedPath);
        
        spl.history(input, `config/set-session-working-dir: Session working directory configured successfully`);
        spl.history(input, `config/set-session-working-dir: All data operations will use: ${resolvedPath}`);
        
    } catch (error) {
        spl.rcSet(input.headers, "spl.execute.error", {
            message: error.message,
            code: error.code || 'SET_SESSION_DIR_ERROR',
            operation: 'config/set-session-working-dir'
        });
        
        spl.history(input, `config/set-session-working-dir: ERROR - ${error.message}`);
    }
    
    spl.completed(input);
}

///////////////////////////////////////////////////////////////////////////////