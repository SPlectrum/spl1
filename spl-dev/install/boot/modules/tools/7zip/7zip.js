//  name        7zip Package Auxiliary Functions
//  URI         tools/7zip/7zip
//  type        Auxiliary Library
//  description Auxiliary functions for the 7zip API - provides core
//              functionality for executing 7zip commands and managing
//              archive operations within the SPL platform.
///////////////////////////////////////////////////////////////////////////////
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
///////////////////////////////////////////////////////////////////////////////

// Core 7zip command execution function
function execute7zip(input, spl, args, workingPath) {
    const executable = get7zipExecutable();
    const command = `${executable} ${args.join(' ')}`;
    
    console.log(`PATH: ${workingPath}`);
    console.log(`COMMAND: ${command}`);
    
    try {
        const output = execSync(command, {
            cwd: workingPath,
            encoding: 'utf8'
        });
        return { output, code: 0 };
    } catch (error) {
        const code = error.status || 1;
        processReturnCode(code, spl, input);
        return { output: error.stdout || '', error: error.stderr || '', code };
    }
}
exports.execute7zip = execute7zip;

// Archive path resolution function
function getArchivePath(archive, appRoot, cwd) {
    if (path.isAbsolute(archive)) {
        return archive;
    }
    
    const fullAppRoot = path.resolve(cwd, appRoot, 'data');
    return path.resolve(fullAppRoot, archive);
}
exports.getArchivePath = getArchivePath;

// Build common 7zip switches from action configuration
function buildCommonSwitches(input, spl) {
    const switches = [];
    
    const password = spl.action(input, 'password');
    if (password) {
        switches.push(`-p${password}`);
    }
    
    const yes = spl.action(input, 'yes') || spl.action(input, 'overwrite');
    if (yes) {
        switches.push('-y');
    }
    
    const working = spl.action(input, 'working');
    if (working) {
        switches.push(`-w${working}`);
    }
    
    return switches;
}
exports.buildCommonSwitches = buildCommonSwitches;

// Determine 7zip executable based on platform
function get7zipExecutable() {
    return process.platform === 'win32' ? '7z.exe' : '7z';
}
exports.get7zipExecutable = get7zipExecutable;

// Process 7zip return codes and integrate with SPL error handling
function processReturnCode(code, spl, input) {
    switch (code) {
        case 0:
            // Success
            break;
        case 1:
            console.warn('7zip warning: Operation completed with warnings');
            break;
        case 2:
            spl.throwError(input, '7zip fatal error: Operation failed');
            break;
        case 7:
            spl.throwError(input, '7zip command line error: Invalid command syntax');
            break;
        case 8:
            spl.throwError(input, '7zip memory error: Not enough memory to complete operation');
            break;
        case 255:
            spl.throwError(input, '7zip operation stopped by user');
            break;
        default:
            spl.throwError(input, `7zip command failed with return code: ${code}`);
    }
}
exports.processReturnCode = processReturnCode;
///////////////////////////////////////////////////////////////////////////////