//  name        Test archive integrity
//  URI         tools/7zip/test
//  type        API Method
//  description Test archive integrity and verify files using 7zip 't' command.
//              Validates archive structure without extracting files.
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
const zip = require("tools_7zip_lib")
///////////////////////////////////////////////////////////////////////////////
exports.default = function tools_7zip_test(input) {
    const archive = spl.action(input, 'archive');
    
    const appDataRoot = spl.context(input, 'appDataRoot');
    const cwd = spl.context(input, 'cwd');
    const archivePath = zip.getArchivePath(archive, cwd, appDataRoot);
    
    const args = ['t'];
    
    const commonSwitches = zip.buildCommonSwitches(input, spl);
    args.push(...commonSwitches);
    
    args.push(archivePath);
    
    const result = zip.execute7zip(input, spl, args, cwd);
    
    if (result.code === 0) {
        console.log(`✓ Archive integrity test passed: ${archive}`);
        spl.wsSet(input, 'tools/7zip.result', {
            success: true,
            archive: archivePath,
            testResult: 'passed',
            output: result.output
        });
    } else {
        console.log(`✗ Archive integrity test failed: ${archive}`);
        spl.wsSet(input, 'tools/7zip.result', {
            success: false,
            archive: archivePath,
            testResult: 'failed',
            error: result.error,
            code: result.code
        });
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////