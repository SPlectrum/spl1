//  name        Update archive
//  URI         tools/7zip/update
//  type        API Method
//  description Update existing archive with new/changed files only using 7zip 'u' command.
//              Only adds files that are newer than existing archive entries.
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
const zip = require("tools_7zip_lib")
///////////////////////////////////////////////////////////////////////////////
exports.default = function tools_7zip_update(input) {
    const archive = spl.action(input, 'archive');
    const files = spl.action(input, 'files') || '*';
    const exclude = spl.action(input, 'exclude');
    const recurse = spl.action(input, 'recurse');
    
    const appDataRoot = spl.context(input, 'appDataRoot');
    const cwd = spl.context(input, 'cwd');
    const archivePath = zip.getArchivePath(archive, cwd, appDataRoot);
    
    const args = ['u'];
    
    if (exclude) {
        args.push(`-x!${exclude}`);
    }
    
    if (recurse) {
        args.push('-r');
    }
    
    const commonSwitches = zip.buildCommonSwitches(input, spl);
    args.push(...commonSwitches);
    
    args.push(archivePath);
    args.push(files);
    
    const result = zip.execute7zip(input, spl, args, cwd);
    
    if (result.code === 0) {
        console.log(`✓ Successfully updated archive: ${archive}`);
        spl.wsSet(input, 'tools/7zip.result', {
            success: true,
            archive: archivePath,
            files: files,
            output: result.output
        });
    } else {
        console.log(`✗ Failed to update archive: ${archive}`);
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