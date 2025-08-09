//  name        Config Module Auxiliary Functions
//  description Support functions for gp/config API methods
///////////////////////////////////////////////////////////////////////////////
const fs = require('fs');
const path = require('path');
///////////////////////////////////////////////////////////////////////////////

// Configure working directory via symlink or local directory
exports.configureWorkingDirectory = function(appRoot, targetPath) {
    const dataPath = path.join(appRoot, 'data');
    
    // Remove existing data directory/symlink
    if (fs.existsSync(dataPath)) {
        const stats = fs.lstatSync(dataPath);
        if (stats.isSymbolicLink()) {
            fs.unlinkSync(dataPath);
        } else if (stats.isDirectory()) {
            if (targetPath !== 'local') {
                fs.rmSync(dataPath, { recursive: true, force: true });
            }
        }
    }
    
    if (targetPath === 'local') {
        // Create normal directory for development
        if (!fs.existsSync(dataPath)) {
            fs.mkdirSync(dataPath, { recursive: true });
        }
        return { success: true, message: "Configured local data directory" };
    } else {
        // Create symlink
        const resolvedTarget = path.isAbsolute(targetPath) 
            ? targetPath 
            : path.resolve(path.dirname(dataPath), targetPath);
        
        fs.symlinkSync(targetPath, dataPath);
        return { success: true, message: `Created data symlink to ${targetPath}` };
    }
};

///////////////////////////////////////////////////////////////////////////////