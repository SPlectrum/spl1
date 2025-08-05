//  name        Git Clone Repository
//  URI         tools/git/clone
//  type        API Method
//  description Clone a remote repository
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl")
///////////////////////////////////////////////////////////////////////////////
exports.default = function tools_git_clone(input) {
    // Get repository path from --repo argument, now relative to app root
    const repo = spl.action(input, 'repo');
    const appRoot = spl.context(input, 'appRoot');
    const cwd = spl.context(input, 'cwd');
    const git = require("../git");
    const repoPath = git.getAppRelativeRepoPath(repo, appRoot, cwd);
    
    // Build git clone command arguments
    const args = ['clone'];
    
    // Get required URL parameter
    const url = spl.action(input, 'url');
    if (!url) {
        console.log('Error: URL parameter is required for git clone');
        spl.completed(input);
        return;
    }
    
    // Add optional parameters
    const branch = spl.action(input, 'branch');
    if (branch) {
        args.push('-b', branch);
    }
    
    const depth = spl.action(input, 'depth');
    if (depth) {
        args.push('--depth', depth.toString());
    }
    
    // Add URL
    args.push(url);
    
    // Add target directory if specified
    const directory = spl.action(input, 'directory');
    if (directory) {
        args.push(directory);
    }
    
    // Execute git clone command
    const output = git.executeGit(args, repoPath);
    
    // Simple output to console
    console.log('Git Clone:');
    console.log('==========');
    if (output.trim()) {
        console.log(output);
    } else {
        console.log(`Repository cloned successfully from: ${url}`);
        if (directory) {
            console.log(`Target directory: ${directory}`);
        }
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////