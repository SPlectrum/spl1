//  name        Set Working Directory
//  URI         gp/config/set-working-dir
//  type        API Method
//  description Sets permanent working directory via symlink or local directory
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const configLib = require('../config.js');
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Permanent Working Directory Configuration
exports.default = function gp_config_set_working_dir(input) {
    const appRoot = spl.context(input, "appRoot");
    const targetPath = spl.action(input, "path");
    
    const result = configLib.configureWorkingDirectory(appRoot, targetPath);
    
    spl.history(input, `config/set-working-dir: ${result.message}`);
    
    spl.completed(input);
};