//  name        Git Status (Simplified)
//  URI         spl/git/status
//  type        API Method
//  description Simplified git status that just executes the command and shows output
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
const git = require("./git")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_git_status(input) {
    const repoPath = git.getRepoPath(input, spl);
    
    // Validate repository exists
    if (!git.validateRepository(input, spl, repoPath)) {
        return;
    }
    
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