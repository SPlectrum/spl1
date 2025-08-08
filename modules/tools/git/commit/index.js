//  name        Git Commit Changes
//  URI         tools/git/commit
//  type        API Method
//  description Commit staged changes
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl")
///////////////////////////////////////////////////////////////////////////////
exports.default = function tools_git_commit(input) {
    // Get repository path from --repo argument, now relative to app root
    const repo = spl.action(input, 'repo');
    const appDataRoot = spl.context(input, 'appDataRoot');
    const cwd = spl.context(input, 'cwd');
    const git = require("../git");
    const repoPath = git.getAppRelativeRepoPath(repo, cwd, appDataRoot);
    
    // Build git commit command arguments
    const args = ['commit'];
    
    // Add commit message
    const message = spl.action(input, 'message');
    if (message) {
        args.push('-m', message);
    }
    
    // Add optional flags
    if (spl.action(input, 'all')) {
        args.push('-a');
    }
    
    if (spl.action(input, 'amend')) {
        args.push('--amend');
    }
    
    // Execute git commit command
    const output = git.executeGit(args, repoPath);
    
    // Simple output to console
    console.log('Git Commit:');
    console.log('===========');
    if (output.trim()) {
        console.log(output);
    } else {
        console.log('Commit completed successfully.');
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////