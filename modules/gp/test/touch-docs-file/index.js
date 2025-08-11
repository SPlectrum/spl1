//  name        Touch Documentation File Worker
//  URI         gp/test/touch-docs-file
//  type        API Method
//  description Worker method: processes discovered assets and updates README.md timestamps
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const testLib = require("gp_test_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Documentation File Touch Worker
exports.default = function gp_test_touch_docs_file(input) {
    const recursive = spl.action(input, 'recursive') === true;
    const errors = [];
    const updatedFiles = [];
    let processingSummary = '';
    
    // Get discovered assets from workspace
    const testApiRecord = spl.wsRef(input, "gp/test");
    if (!testApiRecord || !testApiRecord.value) {
        processingSummary = 'ERROR - No discovery data found in workspace';
        // Note: Processing discovered assets${recursive ? ' (recursive)' : ' (module-level only)'} - ${processingSummary}
        spl.completed(input);
        return;
    }
    
    // Get the most recent discovery results
    const requestKeys = Object.keys(testApiRecord.value);
    const requestKey = requestKeys[requestKeys.length - 1];
    const requestRecord = testApiRecord.value[requestKey];
    
    if (!requestRecord.value.discovery || !requestRecord.value.discovery.assets) {
        processingSummary = 'ERROR - No assets found in discovery data';
        // Note: Processing discovered assets${recursive ? ' (recursive)' : ' (module-level only)'} - ${processingSummary}
        spl.completed(input);
        return;
    }
    
    const assets = requestRecord.value.discovery.assets;
    
    // Filter for README.md files based on recursive flag
    const readmeAssets = assets.filter(asset => {
        const fileName = testLib.pathBasename(asset.path);
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
        processingSummary = 'No README.md files found in discovered assets';
        // Note: Processing discovered assets${recursive ? ' (recursive)' : ' (module-level only)'} - ${processingSummary}
        spl.completed(input);
        return;
    }
    
    // Update timestamps for filtered README.md files
    const currentTime = new Date();
    
    for (const asset of readmeAssets) {
        // Update both access time and modification time to current time (SPL happy path)
        testLib.touchFile(asset.fullPath);
        updatedFiles.push(asset.path);
    }
    
    // Build comprehensive history message
    const historyParts = [
        `Processing discovered assets${recursive ? ' (recursive)' : ' (module-level only)'}`,
        `Found ${readmeAssets.length} README.md file${readmeAssets.length === 1 ? '' : 's'}`,
        `Updated ${updatedFiles.length} README.md file${updatedFiles.length === 1 ? '' : 's'}`
    ];
    
    if (updatedFiles.length > 0) {
        historyParts.push(`Updated files: ${updatedFiles.join(', ')}`);
    }
    
    if (errors.length > 0) {
        historyParts.push(`Errors: ${errors.join('; ')}`);
    }
    
    spl.history(input, `touch-docs-file: ${historyParts.join(' - ')}`);
    spl.completed(input);
}

///////////////////////////////////////////////////////////////////////////////