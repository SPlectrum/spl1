//  name        Touch Documentation File Worker
//  URI         gp/test/touch-docs-file
//  type        API Method
//  description Worker method: processes discovered assets and updates README.md timestamps
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const fs = require('fs');
const path = require('path');
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Documentation File Touch Worker
exports.default = function gp_test_touch_docs_file(input) {
    const recursive = spl.action(input, 'recursive') === true;
    
    spl.history(input, `touch-docs-file: Processing discovered assets${recursive ? ' (recursive)' : ' (module-level only)'}`);
    
    // Get discovered assets from workspace
    const testApiRecord = spl.wsRef(input, "gp/test");
    if (!testApiRecord || !testApiRecord.value) {
        spl.history(input, "touch-docs-file: ERROR - No discovery data found in workspace");
        spl.completed(input);
        return;
    }
    
    // Get the most recent discovery results
    const requestKeys = Object.keys(testApiRecord.value);
    const requestKey = requestKeys[requestKeys.length - 1];
    const requestRecord = testApiRecord.value[requestKey];
    
    if (!requestRecord.value.discovery || !requestRecord.value.discovery.assets) {
        spl.history(input, "touch-docs-file: ERROR - No assets found in discovery data");
        spl.completed(input);
        return;
    }
    
    const assets = requestRecord.value.discovery.assets;
    const updatedFiles = [];
    
    // Filter for README.md files based on recursive flag
    const readmeAssets = assets.filter(asset => {
        const fileName = path.basename(asset.path);
        if (fileName !== 'README.md') {
            return false;
        }
        
        if (!recursive) {
            // Non-recursive: only include README.md files at module root level
            // Check if this is a module root by counting path segments after apps/gp/modules/
            const pathParts = asset.path.split('/');
            const moduleIndex = pathParts.findIndex(part => part === 'modules');
            if (moduleIndex !== -1) {
                // Should be exactly one level deeper than modules (modules/config/README.md, not modules/config/sub/README.md)
                const levelsAfterModules = pathParts.length - moduleIndex - 1;
                return levelsAfterModules === 2; // modules/config/README.md
            }
        }
        
        return true; // Recursive mode includes all README.md files
    });
    
    if (readmeAssets.length === 0) {
        spl.history(input, "touch-docs-file: No README.md files found in discovered assets");
        spl.completed(input);
        return;
    }
    
    // Update timestamps for filtered README.md files
    const currentTime = new Date();
    
    for (const asset of readmeAssets) {
        try {
            // Update both access time and modification time to current time
            fs.utimesSync(asset.fullPath, currentTime, currentTime);
            updatedFiles.push(asset.path);
            
        } catch (error) {
            spl.history(input, `touch-docs-file: ERROR updating ${asset.fullPath}: ${error.message}`);
        }
    }
    
    spl.history(input, `touch-docs-file: Updated ${updatedFiles.length} README.md files`);
    
    // Log each updated file for audit trail
    if (updatedFiles.length > 0) {
        updatedFiles.forEach(file => {
            spl.history(input, `touch-docs-file: Updated ${file}`);
        });
    }
    
    spl.completed(input);
}

///////////////////////////////////////////////////////////////////////////////