// Quick script to show workspace structure after test workflow
const fs = require('fs');

// Run the workflow first to populate workspace
const { exec } = require('child_process');

exec('/home/herma/splectrum/spl1/spl_execute dev -d gp/test --batch=\'[{"method":"discover","params":{"module":"gp/fs"}},{"method":"analyze","params":{"type":"coverage","threshold":70}},{"method":"report","params":{"format":"detailed"}}]\'', (error, stdout, stderr) => {
    if (error) {
        console.error('Error:', error);
        return;
    }
    
    try {
        const result = JSON.parse(stdout);
        
        console.log("=".repeat(80));
        console.log("WORKSPACE DATA STRUCTURE - TEST WORKFLOW CONTRIBUTIONS");
        console.log("=".repeat(80));
        
        console.log("\n📊 WORKFLOW EXECUTION TRACE:");
        console.log("-".repeat(50));
        const history = result.headers.spl.execute.history || [];
        const workflowSteps = history.filter(h => h[2].includes('test/'));
        workflowSteps.forEach((step, i) => {
            console.log(`${i + 1}. ${step[0]} → ${step[2]}`);
        });
        
        console.log("\n🔍 DISCOVERY DATA (gp/test/discover):");
        console.log("-".repeat(50));
        const discoverData = result.value['gp/test/discover'];
        if (discoverData) {
            const ops = discoverData.value.operations || [];
            console.log(`Operations found: ${ops.length}`);
            console.log(`Tests found: ${discoverData.value.tests.length}`);
            console.log(`Schemas found: ${discoverData.value.schemas.length}`);
            console.log("\nSample operations:");
            ops.slice(0, 3).forEach((op, i) => {
                console.log(`  ${i + 1}. ${op.module} (${op.type || 'unknown'}) - ${op.hasDefault ? '✓' : '✗'} default export`);
            });
        } else {
            console.log("No discovery data found");
        }
        
        console.log("\n🧪 ANALYSIS DATA (gp/test/analyze):");
        console.log("-".repeat(50));
        const analyzeData = result.value['gp/test/analyze'];
        if (analyzeData) {
            console.log(`Analysis type: ${analyzeData.value.analysisType}`);
            console.log(`Test specs generated: ${analyzeData.value.testSpecs.length}`);
            console.log(`Total operations analyzed: ${analyzeData.value.metadata.totalOperations}`);
            console.log("\nSample test specs:");
            analyzeData.value.testSpecs.slice(0, 3).forEach((spec, i) => {
                console.log(`  ${i + 1}. ${spec.name}`);
                console.log(`     Action: ${spec.action}`);
                console.log(`     Expects: ${spec.expect.error} errors`);
            });
        } else {
            console.log("No analysis data found");
        }
        
        console.log("\n📋 REPORT DATA (gp/test/report):");
        console.log("-".repeat(50));
        const reportData = result.value['gp/test/report'];
        if (reportData) {
            const report = reportData.value.report;
            console.log(`Report title: ${report.title}`);
            console.log(`Report type: ${reportData.value.metadata.source}`);
            console.log(`Format: ${reportData.value.metadata.format}`);
            console.log("\nSummary:");
            Object.entries(report.summary).forEach(([key, value]) => {
                console.log(`  ${key}: ${value}`);
            });
            
            if (report.recommendations) {
                console.log("\nRecommendations:");
                report.recommendations.forEach((rec, i) => {
                    console.log(`  ${i + 1}. ${rec}`);
                });
            }
        } else {
            console.log("No report data found");
        }
        
        console.log("\n🏗️ WORKSPACE STRUCTURE:");
        console.log("-".repeat(50));
        console.log("Root workspace keys:");
        Object.keys(result.value).forEach(key => {
            if (key.startsWith('gp/test/')) {
                const data = result.value[key];
                console.log(`  ${key}:`);
                console.log(`    Headers: ${JSON.stringify(Object.keys(data.headers || {}))}`);
                console.log(`    Value keys: ${JSON.stringify(Object.keys(data.value || {}))}`);
                console.log(`    Size: ~${JSON.stringify(data).length} chars`);
            }
        });
        
        console.log("\n💡 DATA FLOW:");
        console.log("-".repeat(50));
        console.log("1. discover → operations inventory → stored in workspace");
        console.log("2. analyze → reads discovery data → creates test specs → stored in workspace");  
        console.log("3. report → reads analysis data → generates formatted report → stored in workspace");
        console.log("\nEach step contributes structured data that subsequent steps can consume!");
        
        console.log("\n" + "=".repeat(80));
        
    } catch (parseError) {
        console.error('Parse error:', parseError);
        console.log('Raw output:', stdout);
    }
});