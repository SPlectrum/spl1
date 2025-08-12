//  name        List archive contents
//  URI         tools/7zip/list
//  type        API Method
//  description Display archive contents and information using 7zip 'l' command.
//              Shows files, sizes, dates, and archive structure.
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
const zip = require("tools_7zip_lib")
///////////////////////////////////////////////////////////////////////////////
exports.default = function tools_7zip_list(input) {
    const archive = spl.action(input, 'archive');
    const technical = spl.action(input, 'technical');
    
    const appDataRoot = spl.context(input, 'appDataRoot');
    const cwd = spl.context(input, 'cwd');
    const archivePath = zip.getArchivePath(archive, cwd, appDataRoot);
    
    const args = ['l'];
    
    if (technical) {
        args.push('-slt');
    }
    
    const commonSwitches = zip.buildCommonSwitches(input, spl);
    args.push(...commonSwitches);
    
    args.push(archivePath);
    
    const result = zip.execute7zip(input, spl, args, cwd);
    
    if (result.code === 0) {
        console.log(`✓ Archive contents listed: ${archive}`);
        console.log(result.output);
        spl.wsSet(input, 'tools/7zip.result', {
            success: true,
            archive: archivePath,
            contents: result.output,
            technical: technical || false
        });
    } else {
        console.log(`✗ Failed to list archive contents: ${archive}`);
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