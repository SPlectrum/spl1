//  name        Add files to archive
//  URI         tools/7zip/add
//  type        API Method
//  description Create new archive or add files to existing archive using 7zip 'a' command.
//              Supports all archive formats, compression levels, passwords, and self-extracting archives.
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl")
const zip = require("tools_7zip")
///////////////////////////////////////////////////////////////////////////////
exports.default = function tools_7zip_add(input) {
    const archive = spl.action(input, 'archive');
    const files = spl.action(input, 'files') || '*';
    const type = spl.action(input, 'type');
    const compression = spl.action(input, 'compression');
    const sfx = spl.action(input, 'sfx');
    const exclude = spl.action(input, 'exclude');
    const recurse = spl.action(input, 'recurse');
    
    const appDataRoot = spl.context(input, 'appDataRoot');
    const cwd = spl.context(input, 'cwd');
    const archivePath = zip.getArchivePath(archive, cwd, appDataRoot);
    
    const args = ['a'];
    
    if (type) {
        args.push(`-t${type}`);
    }
    
    if (compression !== undefined) {
        args.push(`-mx=${compression}`);
    }
    
    if (sfx) {
        args.push('-sfx');
    }
    
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
        console.log(`✓ Successfully added files to archive: ${archive}`);
        spl.wsSet(input, 'tools/7zip.result', {
            success: true,
            archive: archivePath,
            files: files,
            output: result.output
        });
    } else {
        console.log(`✗ Failed to add files to archive: ${archive}`);
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