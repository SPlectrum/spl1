//  name        Delete files from archive
//  URI         tools/7zip/delete
//  type        API Method
//  description Remove files from existing archive using 7zip 'd' command.
//              Permanently removes specified files from archive.
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
const zip = require("tools_7zip_lib")
///////////////////////////////////////////////////////////////////////////////
exports.default = function tools_7zip_delete(input) {
    const archive = spl.action(input, 'archive');
    const files = spl.action(input, 'files');
    
    if (!files) {
        spl.throwError(input, 'Files to delete must be specified');
    }
    
    const appDataRoot = spl.context(input, 'appDataRoot');
    const cwd = spl.context(input, 'cwd');
    const archivePath = zip.getArchivePath(archive, cwd, appDataRoot);
    
    const args = ['d'];
    
    const commonSwitches = zip.buildCommonSwitches(input, spl);
    args.push(...commonSwitches);
    
    args.push(archivePath);
    args.push(files);
    
    const result = zip.execute7zip(input, spl, args, cwd);
    
    if (result.code === 0) {
        console.log(`✓ Successfully deleted files from archive: ${archive}`);
        spl.wsSet(input, 'tools/7zip.result', {
            success: true,
            archive: archivePath,
            deletedFiles: files,
            output: result.output
        });
    } else {
        console.log(`✗ Failed to delete files from archive: ${archive}`);
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