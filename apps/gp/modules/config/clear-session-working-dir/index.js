//  name        Clear Session Working Directory
//  URI         gp/config/clear-session-working-dir
//  type        API Method  
//  description Clears session-specific working directory setting and restores default appDataRoot
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Session Setting Restoration Only
exports.default = function gp_config_clear_session_working_dir(input) {
    try {
        spl.history(input, `config/clear-session-working-dir: Starting appDataRoot restoration`);
        
        // Get current contexts
        const appRoot = spl.context(input, "appRoot");
        if (!appRoot) {
            throw new Error("Cannot restore default: appRoot context not available");
        }
        
        // Restore default appDataRoot setting (appRoot + "/data")
        const defaultAppRootData = `${appRoot}/data`;
        spl.rcSet(input.headers, "spl.execute.appDataRoot", defaultAppRootData);
        
        spl.history(input, `config/clear-session-working-dir: Restored default appDataRoot: ${defaultAppRootData}`);
        spl.history(input, `config/clear-session-working-dir: Session restoration completed successfully`);
        
    } catch (error) {
        spl.rcSet(input.headers, "spl.execute.error", {
            message: error.message,
            code: error.code || 'CLEAR_SESSION_DIR_ERROR',
            operation: 'config/clear-session-working-dir'
        });
        
        spl.history(input, `config/clear-session-working-dir: ERROR - ${error.message}`);
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////