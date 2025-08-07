//  name        Git Commit History
//  URI         tools/git/log
//  type        API Method
//  description Get commit history
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl")
const git = require("../git")
///////////////////////////////////////////////////////////////////////////////
exports.default = function tools_git_log(input) {
    // Get repository path from --repo argument, now relative to app root
    const repo = spl.action(input, 'repo');
    const appRootData = spl.context(input, 'appRootData');
    const cwd = spl.context(input, 'cwd');
    const repoPath = git.getAppRelativeRepoPath(repo, cwd, appRootData);
    
    // Build git log command arguments
    const args = ['log'];
    
    // Add optional flags and parameters
    if (spl.action(input, 'count')) {
        args.push(`-${spl.action(input, 'count')}`);
    }
    
    if (spl.action(input, 'oneline')) {
        args.push('--oneline');
    }
    
    if (spl.action(input, 'graph')) {
        args.push('--graph');
    }
    
    if (spl.action(input, 'since')) {
        args.push(`--since="${spl.action(input, 'since')}"`);
    }
    
    if (spl.action(input, 'until')) {
        args.push(`--until="${spl.action(input, 'until')}"`);
    }
    
    // Execute git log command
    const output = git.executeGit(args, repoPath);
    
    // Simple output to console
    console.log('Git Log:');
    console.log('========');
    console.log(output);
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////