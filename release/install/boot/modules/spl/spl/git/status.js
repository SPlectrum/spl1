//  name        Git Status (Simplified)
//  URI         spl/git/status
//  type        API Method
//  description Simplified git status that just executes the command and shows output
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
const git = require("./git")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_git_status(input) {
    // Get repository path from --repo argument, now relative to app root
    const repoPath = git.getAppRelativeRepoPath(input, spl);
    
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
    const output = git.executeGit(input, spl, args, repoPath);
    
    // Simple output to console
    console.log('Git Status:');
    console.log('===========');
    console.log(output);
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////