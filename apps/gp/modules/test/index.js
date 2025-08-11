//  name        gp/test API Entry Point
//  URI         gp/test
//  type        API Method
//  description Universal Testing Framework for SPL Platform - API-level batch orchestrator
//              Provides quality gates and systematic API validation with pipeline support
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Universal Testing Framework with Batch Support
exports.default = function gp_test(input) {
    const batchParam = spl.action(input, "batch");
    
    if (batchParam) {
        // Parse batch JSON string to array
        const batchArray = JSON.parse(batchParam);
        
        // Generate dynamic pipeline from batch array
        const pipeline = batchArray.map((request, index) => {
            if (request.method === "API") {
                // API configuration step
                return {
                    action: "gp/test",
                    "gp/test": request.params,
                    batchIndex: index
                };
            } else {
                // Regular method step
                return {
                    action: `gp/test/${request.method}`,
                    [`gp/test/${request.method}`]: request.params,
                    batchIndex: index
                };
            }
        });
        
        // Set SPL pipeline for execution
        spl.wsSet(input, "spl/execute.set-pipeline", {
            headers: { spl: { execute: { pipeline } } },
            value: {}
        });
        
        spl.history(input, `gp/test: Batch mode activated - Generated test pipeline with ${pipeline.length} steps`);
        spl.gotoExecute(input, "spl/execute/set-pipeline");
        
    } else {
        // API config mode - arguments automatically set by method instantiation
        spl.completed(input);
    }
}
///////////////////////////////////////////////////////////////////////////////