//  name        Git Simplified Functions
//  URI         tools/git
//  type        Auxiliary Library
//  description Simplified git functions with minimal overhead
///////////////////////////////////////////////////////////////////////////////
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
///////////////////////////////////////////////////////////////////////////////

// Simple git command execution
exports.executeGit = function (args, resolvedPath) {
    const gitCommand = `git ${args.join(' ')}`;
console.log("PATH:" + resolvedPath);    
console.log("COMMAND:" + gitCommand);    
    const output = execSync(gitCommand, {
        cwd: resolvedPath,
        encoding: 'utf8'
    });
    return output;
};

// Get repository path relative to app root
exports.getAppRelativeRepoPath = function (repo, cwd, appDataRoot) {
    const fullAppRoot = path.resolve(cwd, appDataRoot);
    return path.resolve(fullAppRoot, repo);
};
///////////////////////////////////////////////////////////////////////////////