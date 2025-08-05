//  name        gp/fs API Entry Point
//  URI         gp/fs
//  type        API Method
//  description API-level batch orchestrator for filesystem operations
//              Arguments are automatically set by SPL when method is invoked
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Step 4: Add basic batch processing logic
exports.default = function gp_fs_api(input) {
    const batchParam = spl.action(input, "batch");
    
    if (batchParam) {
        spl.history(input, `gp/fs: Batch mode activated`);
        
        // Parse batch JSON string to array
        let batchArray;
        try {
            batchArray = JSON.parse(batchParam);
            spl.history(input, `gp/fs: Parsed ${batchArray.length} batch operations`);
        } catch (error) {
            spl.history(input, `gp/fs: ERROR - Invalid batch JSON`);
            spl.completed(input);
            return;
        }
        
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
        
        spl.history(input, `gp/fs: Generated pipeline with ${pipeline.length} steps`);
        
        // Set SPL pipeline for execution
        spl.wsSet(input, "spl/execute.set-pipeline", {
            headers: { spl: { execute: { pipeline } } },
            value: {}
        });
        
        spl.gotoExecute(input, "spl/execute/set-pipeline");
        
    } else {
        spl.history(input, `gp/fs: API config mode`);
        spl.completed(input);
    }
}
///////////////////////////////////////////////////////////////////////////////