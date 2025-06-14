//  name        Git Simplified Functions
//  URI         git/git
//  type        Auxiliary Library
//  description Simplified git functions with minimal overhead
///////////////////////////////////////////////////////////////////////////////
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
///////////////////////////////////////////////////////////////////////////////

// Simple git command execution
exports.executeGit = function (input, spl, args, repoPath) {
    const resolvedPath = repoPath || spl.action(input, 'path') || spl.context(input, 'cwd');
    const gitCommand = `git ${args.join(' ')}`;
    
    spl.history(input, `executing: ${gitCommand} in ${resolvedPath}`);
    
    try {
        const output = execSync(gitCommand, {
            cwd: resolvedPath,
            encoding: 'utf8'
        });
        
        spl.history(input, `git command completed successfully`);
        return output;
    } catch (error) {
        const errorMessage = error.stderr || error.message || 'Unknown git error';
        spl.history(input, `ERROR - git command failed: ${gitCommand} - ${errorMessage}`);
        spl.throwError(input, `Git command failed: ${errorMessage}`);
    }
};

// Get repository path relative to app root
exports.getAppRelativeRepoPath = function (input, spl) {
    const path = require('path');
    const repoArg = spl.action(input, 'repo');
    const appRoot = spl.context(input, 'appRoot');
    const projectRoot = spl.context(input, 'cwd');
    
    // Concatenate appRoot with repo argument
    const fullAppRoot = path.resolve(projectRoot, appRoot);
    return path.resolve(fullAppRoot, repoArg);
};

// Get repository path with simple fallback
exports.getRepoPath = function (input, spl) {
    return spl.action(input, 'path') || spl.context(input, 'cwd');
};

// Simple repository validation
exports.validateRepository = function (input, spl, repoPath) {
    if (!fs.existsSync(repoPath)) {
        spl.throwError(input, `Path does not exist: ${repoPath}`);
        return false;
    }
    
    const gitDir = path.join(repoPath, '.git');
    if (!fs.existsSync(gitDir)) {
        spl.throwError(input, `Not a git repository: ${repoPath}`);
        return false;
    }
    
    return true;
};
///////////////////////////////////////////////////////////////////////////////