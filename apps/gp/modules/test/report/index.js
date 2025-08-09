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
    
    if (reportData.results) {
        // Flatten results from all test types into a single array
        const allResults = [];
        const summaryData = { total: 0, passed: 0, failed: 0 };
        
        for (const [testType, testData] of Object.entries(reportData.results)) {
            allResults.push(...testData.results);
            summaryData.total += testData.summary.total;
            summaryData.passed += testData.summary.passed;
            summaryData.failed += testData.summary.failed;
        }
        
        report.sections.run = {
            title: "⚡ EXECUTION PHASE",
            summary: summaryData,
            items: { results: allResults }
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
        if (reportData.results) {
            const allResults = [];
            let totalDuration = 0;
            
            // Calculate total duration and collect results for timing
            for (const [testType, testData] of Object.entries(reportData.results)) {
                allResults.push(...testData.results);
                totalDuration += testData.results.reduce((sum, r) => sum + (r.duration || 0), 0);
            }
            
            console.log(`RUN: ${totalDuration}ms total`);
            
            // Simple per-type output
            for (const [testType, testData] of Object.entries(reportData.results)) {
                const { passed, failed, total } = testData.summary;
                console.log(`  ${testType}: ${passed}/${total} passed${failed > 0 ? `, ${failed} failed` : ''}`);
                
                // Show failure details directly
                if (failed > 0) {
                    const failures = testData.results.filter(r => r.status === 'FAIL' || r.status === 'ERROR');
                    if (failures.length > 0) {
                        console.log(`    FAILED:`);
                        failures.forEach(failure => {
                            // Split multi-line messages to display each line properly
                            const lines = failure.message.split('\n').filter(line => line.trim() !== '');
                            lines.forEach((line) => {
                                console.log(`${line}`);
                            });
                            console.log(''); // Empty line between failed tests
                        });
                    }
                }
            }
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