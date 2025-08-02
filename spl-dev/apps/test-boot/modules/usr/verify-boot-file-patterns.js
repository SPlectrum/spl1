//  name        Verify Boot App File Patterns
//  URI         usr/verify-boot-file-patterns
//  type        Test Method
//  description Verifies that boot app source contains only .batch files, no .txt files
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
const usr = require("./usr.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function usr_verify_boot_file_patterns(input) {
    spl.history(input, `Starting boot app file pattern verification`);
    
    // Get boot app batches path
    const targetPath = usr.getBootPath(input, spl);
    
    // Verify directory exists
    if (!usr.directoryExists(input, spl, targetPath)) {
        spl.throwError(input, `Boot app batches directory not found: ${targetPath}`);
        return;
    }
    
    // Verify file patterns
    const testResults = usr.verifyFilePatterns(input, spl, targetPath);
    
    if (testResults === null) {
        spl.throwError(input, `Failed to analyze file patterns in ${targetPath}`);
        return;
    }
    
    // Report results using direct console calls
    if (testResults.passed) {
        console.log(`✓ Boot app file patterns correct`);
    } else {
        console.error(`✗ Boot app contains ${testResults.txtFiles} .txt files: ${testResults.txtFileList.join(', ')}`);
    }
    
    // Store test results in workspace
    spl.wsSet(input, 'test/boot-file-patterns/results', { 
        headers: { spl: { test: { status: testResults.passed ? 'passed' : 'failed' } } },
        value: testResults 
    });
    
    spl.history(input, `Boot app file pattern verification completed: ${testResults.passed ? 'PASSED' : 'FAILED'}`);
    spl.completed(input);
}