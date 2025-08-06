//  name        Test Reporting
//  URI         gp/test/report
//  type        API Method
//  description Standalone formatter - generates reports from any analysis/run data in workspace
//              Reusable reporting engine for all test results and analysis data
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const testLib = require("../test.js");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Standalone Test Reporting
exports.default = function gp_test_report(input) {
    const format = spl.action(input, 'format') || 'summary';
    const dataSource = spl.action(input, 'source') || 'auto';
    const includeDetails = spl.action(input, 'includeDetails') === true;
    const threshold = spl.action(input, 'threshold') || 80;
    
    spl.history(input, `test/report: Starting report generation`);
    spl.history(input, `test/report: Format=${format}, Source=${dataSource}, Details=${includeDetails}`);
    
    try {
        let reportData = null;
        let reportType = null;
        
        // Get the main gp/test record with pattern-based keys
        const testApiRecord = spl.wsRef(input, "gp/test");
        if (!testApiRecord || !testApiRecord.value) {
            throw new Error("No test data found in workspace - run discover, plan, or run methods first");
        }
        
        // Find the most recent request record (pattern-based key)
        const requestKeys = Object.keys(testApiRecord.value);
        if (requestKeys.length === 0) {
            throw new Error("No test request records found in workspace");
        }
        
        // Use the most recent request key (for now, could be made configurable)
        const requestKey = requestKeys[requestKeys.length - 1];
        const requestRecord = testApiRecord.value[requestKey];
        
        spl.history(input, `test/report: Using request record: ${requestKey}`);
        spl.history(input, `test/report: Workflow steps: ${requestRecord.headers.workflow.join(' → ')}`);
        
        // Prepare comprehensive report data
        reportData = {
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
        
        reportType = 'workflow';
        
        // Generate report using test.js functions
        let report = null;
        
        if (reportType === 'workflow') {
            report = testLib.generateWorkflowReport(reportData, { format, includeDetails, threshold });
        } else {
            throw new Error(`Unsupported report type: ${reportType}`);
        }
        
        spl.history(input, `test/report: Generated ${format} report for ${reportType} data`);
        
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
        
        // Output report to stdout using test.js function
        testLib.outputReport(report, { format, includeDetails });
        
        spl.history(input, `test/report: Report generation completed`);
        
    } catch (error) {
        spl.rcSet(input.headers, "spl.execute.error", {
            message: error.message,
            code: error.code || 'REPORT_ERROR',
            operation: 'test/report'
        });
        
        spl.history(input, `test/report: ERROR - ${error.message}`);
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////