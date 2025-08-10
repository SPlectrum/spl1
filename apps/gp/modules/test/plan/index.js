//  name        Test Planning
//  URI         gp/test/plan
//  type        API Method
//  description Pure planning - examines discovery assets and creates execution plan (work packages)
//              Determines what tests to run and packages them for run method execution
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const testLib = require("gp_test_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Pure Test Planning
exports.default = function gp_test_plan(input) {
    const planType = spl.action(input, 'type');
    
    // Get discovery assets from pattern-based workspace
    const testApiRecord = spl.wsRef(input, "gp/test");
    
    // Process all request records (blanket coverage: all)
    let totalAssets = 0;
    let totalPackages = 0;
    
    for (const requestKey in testApiRecord.value) {
        const requestRecord = testApiRecord.value[requestKey];
        const assets = requestRecord.value.discovery?.assets || [];
        totalAssets += assets.length;
        
        // Create work packages from assets
        const workPackages = testLib.createWorkPackages(input, assets, { planType });
        totalPackages += workPackages.length;
        
        // Store work packages in the request record
        requestRecord.value.plan = {
            workPackages: workPackages,
            metadata: {
                totalAssets: assets.length,
                timestamp: new Date().toISOString()
            }
        };
        
        // Update workflow to include plan
        requestRecord.headers.workflow = Array.from(new Set([...requestRecord.headers.workflow, 'plan']));
    }
    
    // Save updated record
    spl.wsSet(input, "gp/test", testApiRecord);
    
    spl.history(input, `test/plan: Created ${totalPackages} work packages (${planType}) from ${totalAssets} assets`);
    
    spl.completed(input);
}



///////////////////////////////////////////////////////////////////////////////