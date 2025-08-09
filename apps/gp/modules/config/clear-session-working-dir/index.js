//  name        Clear Session Working Directory
//  URI         gp/config/clear-session-working-dir
//  type        API Method  
//  description Clears session-specific working directory setting and restores default appDataRoot
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Session Setting Restoration Only
exports.default = function gp_config_clear_session_working_dir(input) {
    // Get current contexts
    const appRoot = spl.context(input, "appRoot");
    
    // Restore default appDataRoot setting (appRoot + "/data")
    const defaultAppRootData = `${appRoot}/data`;
    spl.setContext(input, "appDataRoot", defaultAppRootData);
    
    spl.history(input, `Restored appDataRoot to ${defaultAppRootData}`);
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////