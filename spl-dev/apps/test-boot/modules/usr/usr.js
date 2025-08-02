//  name        Test Boot Auxiliary Functions
//  URI         usr/usr
//  type        Auxiliary Library
//  description Library of auxiliary methods for boot app testing
///////////////////////////////////////////////////////////////////////////////
const fs = require('fs');
const path = require('path');
///////////////////////////////////////////////////////////////////////////////

// Verify file patterns in a directory
exports.verifyFilePatterns = function (input, spl, targetPath) {
    spl.history(input, `Checking file patterns in ${targetPath}`);
    
    try {
        const files = fs.readdirSync(targetPath);
        
        let testResults = {
            totalFiles: files.length,
            batchFiles: 0,
            txtFiles: 0,
            otherFiles: 0,
            txtFileList: [],
            passed: true
        };
        
        // Analyze file patterns
        files.forEach(file => {
            if (file.endsWith('.batch')) {
                testResults.batchFiles++;
            } else if (file.endsWith('.txt')) {
                testResults.txtFiles++;
                testResults.txtFileList.push(file);
                testResults.passed = false;
            } else {
                testResults.otherFiles++;
            }
        });
        
        return testResults;
        
    } catch (error) {
        spl.history(input, `ERROR - failed to read directory ${targetPath}: ${error.message}`);
        return null;
    }
}

// Check if directory exists
exports.directoryExists = function (input, spl, dirPath) {
    try {
        const stats = fs.statSync(dirPath);
        return stats.isDirectory();
    } catch (error) {
        spl.history(input, `Directory check failed for ${dirPath}: ${error.message}`);
        return false;
    }
}

// Get absolute path relative to SPlectrum install root
exports.getBootPath = function (input, spl) {
    const cwd = spl.context(input, "cwd");
    return path.join(cwd, 'apps/boot/batches');
}