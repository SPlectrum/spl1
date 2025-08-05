//  name        gp/test API Entry Point
//  URI         gp/test
//  type        API Method
//  description Universal Testing Framework for SPL Platform - API-level batch orchestrator
//              Provides quality gates and systematic API validation with pipeline support
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Universal Testing Framework with Batch Support
exports.default = function gp_test_api(input) {
    const batchParam = spl.action(input, "batch");
    
    if (batchParam) {
        spl.history(input, `gp/test: Batch mode activated`);
        
        // Parse batch JSON string to array
        let batchArray;
        try {
            batchArray = JSON.parse(batchParam);
            spl.history(input, `gp/test: Parsed ${batchArray.length} batch test operations`);
        } catch (error) {
            spl.history(input, `gp/test: ERROR - Invalid batch JSON`);
            spl.completed(input);
            return;
        }
        
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
        
        spl.history(input, `gp/test: Generated test pipeline with ${pipeline.length} steps`);
        
        // Set SPL pipeline for execution
        spl.wsSet(input, "spl/execute.set-pipeline", {
            headers: { spl: { execute: { pipeline } } },
            value: {}
        });
        
        spl.gotoExecute(input, "spl/execute/set-pipeline");
        
    } else {
        // Single operation mode
        const testModule = spl.action(input, "module");
        const mode = spl.action(input, "mode") || "run";
        
        spl.history(input, `gp/test: Universal Testing Framework activated`);
        spl.history(input, `gp/test: Mode=${mode}, Module=${testModule || 'all'}`);
        
        // Route to appropriate test operation based on mode
        switch (mode) {
            case "run":
                spl.gotoExecute(input, "gp/test/run");
                break;
            case "suite":
                spl.gotoExecute(input, "gp/test/suite");
                break;
            case "assert":
                spl.gotoExecute(input, "gp/test/assert");
                break;
            case "coverage":
                spl.gotoExecute(input, "gp/test/coverage");
                break;
            default:
                spl.history(input, `gp/test: Running default test execution`);
                spl.gotoExecute(input, "gp/test/run");
        }
    }
}
///////////////////////////////////////////////////////////////////////////////