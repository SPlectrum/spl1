//  name        Git Status (Simplified)
//  URI         tools/git/status
//  type        API Method
//  description Simplified git status that just executes the command and shows output
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
const git = require("tools_git_lib")
///////////////////////////////////////////////////////////////////////////////
exports.default = function tools_git_status(input) {
    // Get repository path from --repo argument, now relative to app root
    const repo = spl.action(input, 'repo');
    const appDataRoot = spl.context(input, 'appDataRoot');
    const cwd = spl.context(input, 'cwd');
    const repoPath = git.getAppRelativeRepoPath(repo, cwd, appDataRoot);
    
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