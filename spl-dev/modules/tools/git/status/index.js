//  name        Git Status (Simplified)
//  URI         tools/git/status
//  type        API Method
//  description Simplified git status that just executes the command and shows output
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl")
const git = require("../git")
///////////////////////////////////////////////////////////////////////////////
exports.default = function tools_git_status(input) {
    // Get repository path from --repo argument, now relative to app root
    const repo = spl.action(input, 'repo');
    const appRoot = spl.context(input, 'appRoot');
    const cwd = spl.context(input, 'cwd');
    const repoPath = git.getAppRelativeRepoPath(repo, appRoot, cwd);
    
    // Build git status command arguments
    const args = ['status'];
    
    // Add optional flags
    if (spl.action(input, 'porcelain')) {
        args.push('--porcelain');
    }
    
    if (spl.action(input, 'short')) {
        args.push('--short');
    }
    
    // Execute git status command
    const output = git.executeGit(args, repoPath);
    
    // Simple output to console
    console.log('Git Status:');
    console.log('===========');
    console.log(output);
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////