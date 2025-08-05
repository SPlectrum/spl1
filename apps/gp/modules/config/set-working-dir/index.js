const fs = require('fs');
const path = require('path');
const spl = require("../../spl.js");

module.exports.default = function(input) {
    const appRoot = spl.context(input, "appRoot");
    const dataPath = path.join(appRoot, 'data');
    const targetPath = spl.action(input, "path");
    
    if (!targetPath) {
        console.error('Path parameter required');
        return;
    }
    
    try {
        // Remove existing data directory/symlink
        if (fs.existsSync(dataPath)) {
            const stats = fs.lstatSync(dataPath);
            if (stats.isSymbolicLink()) {
                fs.unlinkSync(dataPath);
                console.log('Removed existing data symlink');
            } else if (stats.isDirectory()) {
                if (targetPath !== 'local') {
                    console.log('Converting data directory to symlink...');
                    fs.rmSync(dataPath, { recursive: true, force: true });
                }
            }
        }
        
        if (targetPath === 'local') {
            // Create normal directory for development
            if (!fs.existsSync(dataPath)) {
                fs.mkdirSync(dataPath, { recursive: true });
                console.log('Created a local data directory');
            } else {
                console.log('Using existing data directory for local development');
            }
        } else {
            // Create symlink
            const resolvedTarget = path.isAbsolute(targetPath) 
                ? targetPath 
                : path.resolve(path.dirname(dataPath), targetPath);
            
            // Validate target exists
            if (!fs.existsSync(resolvedTarget)) {
                console.error(`Target directory does not exist: ${resolvedTarget}`);
                return;
            }
            
            fs.symlinkSync(targetPath, dataPath);
            console.log(`Created data symlink: data -> ${targetPath}`);
            console.log(`Points to: ${resolvedTarget}`);
        }
        
        console.log(`Working directory configured successfully`);
        
    } catch (error) {
        console.error(`Failed to configure working directory: ${error.message}`);
    }
    
    spl.completed(input);
};