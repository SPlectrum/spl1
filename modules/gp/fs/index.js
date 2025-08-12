//  name        gp/fs API Entry Point
//  URI         gp/fs
//  type        API Method
//  description API-level batch orchestrator for filesystem operations
//              Arguments are automatically set by SPL when method is invoked
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Step 4: Add basic batch processing logic
exports.default = function gp_fs_api(input) {
    const batchParam = spl.action(input, "batch");
    let message;
    
    if (batchParam) {
        // Parse batch JSON string to array
        const batchArray = JSON.parse(batchParam);
        
        // Generate dynamic pipeline from batch array
        const pipeline = batchArray.map((request, index) => {
            if (request.method === "API") {
                // API configuration step
                return {
                    action: "gp/fs",
                    "gp/fs": request.params,
                    batchIndex: index
                };
            } else {
                // Regular method step
                return {
                    action: `gp/fs/${request.method}`,
                    [`gp/fs/${request.method}`]: request.params,
                    batchIndex: index
                };
            }
        });
        
        // Set SPL pipeline for execution
        spl.wsSet(input, "spl/execute.set-pipeline", {
            headers: { spl: { execute: { pipeline } } },
            value: {}
        });
        
        message = `gp/fs: batch mode completed with ${pipeline.length} operations`;
        spl.gotoExecute(input, "spl/execute/set-pipeline");
        
    } else {
        message = `gp/fs: API config mode completed`;
        spl.completed(input);
    }
    
    spl.history(input, message);
}
///////////////////////////////////////////////////////////////////////////////