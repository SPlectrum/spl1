//  name        Extract files with full paths
//  URI         tools/7zip/extract
//  type        API Method
//  description Extract files from archive preserving directory structure using 7zip 'x' command.
//              Maintains full path information during extraction.
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
const zip = require("tools_7zip")
///////////////////////////////////////////////////////////////////////////////
exports.default = function tools_7zip_extract(input) {
    const archive = spl.action(input, 'archive');
    const output = spl.action(input, 'output');
    const files = spl.action(input, 'files');
    
    if (!output) {
        spl.throwError(input, 'Output directory is required for extraction');
    }
    
    const appDataRoot = spl.context(input, 'appDataRoot');
    const cwd = spl.context(input, 'cwd');
    const archivePath = zip.getArchivePath(archive, cwd, appDataRoot);
    
    const args = ['x'];
    args.push(`-o${output}`);
    
    const commonSwitches = zip.buildCommonSwitches(input, spl);
    args.push(...commonSwitches);
    
    args.push(archivePath);
    
    if (files) {
        args.push(files);
    }
    
    const result = zip.execute7zip(input, spl, args, cwd);
    
    if (result.code === 0) {
        console.log(`✓ Successfully extracted archive: ${archive}`);
        spl.wsSet(input, 'tools/7zip.result', {
            success: true,
            archive: archivePath,
            output: output,
            extractedFiles: result.output
        });
    } else {
        console.log(`✗ Failed to extract archive: ${archive}`);
        spl.wsSet(input, 'tools/7zip.result', {
            success: false,
            archive: archivePath,
            error: result.error,
            code: result.code
        });
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////