//  name        Config Module Auxiliary Functions
//  description Support functions for gp/config API methods
///////////////////////////////////////////////////////////////////////////////
const fs = require('fs');
const path = require('path');
///////////////////////////////////////////////////////////////////////////////

// Configure working directory via symlink or local directory
exports.configureWorkingDirectory = function(appRoot, targetPath) {
    const dataPath = path.join(appRoot, 'data');
    
    // Ensure parent directory exists
    const parentDir = path.dirname(dataPath);
    if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
    }
    
    // Remove existing data directory/symlink completely (including broken symlinks)
    try {
        const stats = fs.lstatSync(dataPath);
        if (stats.isSymbolicLink()) {
            fs.unlinkSync(dataPath);
        } else if (stats.isDirectory()) {
            fs.rmSync(dataPath, { recursive: true, force: true });
        } else {
            // Handle any other file type
            fs.unlinkSync(dataPath);
        }
    } catch (error) {
        // If lstatSync fails, the path doesn't exist, which is fine
        if (error.code !== 'ENOENT') {
            throw error;
        }
    }
    
    if (targetPath === 'local') {
        // Create normal directory for development
        fs.mkdirSync(dataPath, { recursive: true });
        return { success: true, message: "Configured local data directory" };
    } else {
        // Ensure target directory exists for symlink
        if (!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath, { recursive: true });
        }
        
        // Create symlink
        fs.symlinkSync(targetPath, dataPath);
        return { success: true, message: `Created data symlink to ${targetPath}` };
    }
};

///////////////////////////////////////////////////////////////////////////////