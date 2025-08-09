//  name        Test Reporting
//  URI         gp/test/report
//  type        API Method
//  description Standalone formatter - generates reports from any analysis/run data in workspace
//              Reusable reporting engine for all test results and analysis data
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Standalone Test Reporting
exports.default = function gp_test_report(input) {
    const format = spl.action(input, 'format') || 'summary';
    const dataSource = spl.action(input, 'source') || 'auto';
    const includeDetails = spl.action(input, 'includeDetails') === true;
    const threshold = spl.action(input, 'threshold') || 80;
    
    // Get the main gp/test record with pattern-based keys
    const testApiRecord = spl.wsRef(input, "gp/test");
    
    // Find the most recent request record (pattern-based key)
    const requestKeys = Object.keys(testApiRecord.value);
    
    // Use the most recent request key (for now, could be made configurable)
    const requestKey = requestKeys[requestKeys.length - 1];
    const requestRecord = testApiRecord.value[requestKey];
    
    // Prepare comprehensive report data
    const reportData = {
        requestKey: requestKey,
        patterns: {
            modules: requestRecord.headers.modulePattern,
            tests: requestRecord.headers.testPattern,
            schemas: requestRecord.headers.schemaPattern
        },
        workflow: requestRecord.headers.workflow,
        startTime: requestRecord.headers.startTime,
        ...requestRecord.value
    };
    
    const reportType = 'workflow';
    
    // Generate report inline (moved from auxiliary function)
    const report = {
        title: "SPL Test Workflow Report",
        requestKey: reportData.requestKey,
        patterns: reportData.patterns,
        workflow: reportData.workflow,
        sections: {},
        timestamp: new Date().toISOString()
    };
    
    // Add sections based on available workflow data
    if (reportData.discovery) {
        report.sections.discovery = {
            title: "🔍 DISCOVERY PHASE",
            summary: { assets: reportData.discovery.assets?.length || 0 },
            items: { assets: reportData.discovery.assets || [] }
        };
    }
    
    if (reportData.plan) {
        report.sections.plan = {
            title: "📋 PLANNING PHASE",
            summary: { workPackages: reportData.plan.workPackages?.length || 0 },
            items: { workPackages: reportData.plan.workPackages || [] }
        };
    }
    
    if (reportData.run) {
        report.sections.run = {
            title: "⚡ EXECUTION PHASE",
            summary: reportData.run.summary || {},
            items: { results: reportData.run.results || [] }
        };
    }
    
    // Store report in workspace
    const reportRecord = {
        headers: { gp: { test: { report: { timestamp: new Date().toISOString(), format, type: reportType } } } },
        value: {
            report: report,
            metadata: {
                format: format,
                source: reportType,
                includeDetails: includeDetails,
                generatedAt: new Date().toISOString()
            }
        }
    };
    
    spl.wsSet(input, "gp/test/report", reportRecord);
    
    // Output report to stdout inline (moved from auxiliary function)
    console.log("=".repeat(60));
    console.log(`TEST REPORT - ${report.requestKey}`);
    console.log("=".repeat(60));
    
    if (report.sections) {
        // Execution section (most important - show first)
        if (report.sections.run) {
            const run = report.sections.run;
            const totalTime = run.items.results.reduce((sum, r) => sum + (r.duration || 0), 0);
            console.log(`RUN: ${totalTime}ms total`);
            
            const resultsByType = {};
            run.items.results.forEach(result => {
                if (!resultsByType[result.type]) resultsByType[result.type] = [];
                resultsByType[result.type].push(result);
            });
            
            Object.entries(resultsByType).forEach(([type, results]) => {
                const passed = results.filter(r => r.status === 'PASS').length;
                const failed = results.filter(r => r.status === 'FAIL' || r.status === 'ERROR').length;
                console.log(`  ${type}: ${passed} passed${failed > 0 ? `, ${failed} failed` : ''}`);
            });
        }
        
        // Planning section  
        if (report.sections.plan) {
            const plan = report.sections.plan;
            console.log(`PLAN: ${plan.summary.workPackages} packages`);
            plan.items.workPackages.forEach(pkg => {
                console.log(`  ${pkg.type}:`);
                if (pkg.filePaths) {
                    pkg.filePaths.forEach(filePath => console.log(`    ${filePath}`));
                } else if (pkg.commands) {
                    pkg.commands.forEach(cmd => console.log(`    basic: ${cmd.testFile}`));
                }
            });
        }
        
        // Discovery section (most detailed - show last)
        if (report.sections.discovery) {
            const disco = report.sections.discovery;
            console.log(`DISCOVERY: ${disco.summary.assets} assets`);
            disco.items.assets.forEach(asset => console.log(`  ${asset}`));
        }
    }
    
    console.log("=".repeat(60));
    
    spl.history(input, `test/report: Generated ${format} report for ${requestRecord.headers.workflow.join(' → ')} workflow`);
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////