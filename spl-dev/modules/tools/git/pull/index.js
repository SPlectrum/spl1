//  name        Git Pull Changes
//  URI         tools/git/pull
//  type        API Method
//  description Pull changes from remote repository
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl")
///////////////////////////////////////////////////////////////////////////////
exports.default = function tools_git_pull(input) {
    // Get repository path from --repo argument, now relative to app root
    const repo = spl.action(input, 'repo');
    const appDataRoot = spl.context(input, 'appDataRoot');
    const cwd = spl.context(input, 'cwd');
    const git = require("../git");
    const repoPath = git.getAppRelativeRepoPath(repo, cwd, appDataRoot);
    
    // Build git pull command arguments
    const args = ['pull'];
    
    // Add rebase flag if specified
    if (spl.action(input, 'rebase')) {
        args.push('--rebase');
    }
    
    // Add remote and branch if specified
    const remote = spl.action(input, 'remote');
    const branch = spl.action(input, 'branch');
    
    if (remote) {
        args.push(remote);
        if (branch) {
            args.push(branch);
        }
    }
    
    // Execute git pull command
    const output = git.executeGit(args, repoPath);
    
    // Simple output to console
    console.log('Git Pull:');
    console.log('=========');
    if (output.trim()) {
        console.log(output);
    } else {
        console.log('Pull completed successfully.');
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////