//  name        Git Push Changes
//  URI         tools/git/push
//  type        API Method
//  description Push commits to remote repository
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl")
///////////////////////////////////////////////////////////////////////////////
exports.default = function tools_git_push(input) {
    // Get repository path from --repo argument, now relative to app root
    const repo = spl.action(input, 'repo');
    const appRootData = spl.context(input, 'appRootData');
    const cwd = spl.context(input, 'cwd');
    const git = require("../git");
    const repoPath = git.getAppRelativeRepoPath(repo, cwd, appRootData);
    
    // Build git push command arguments
    const args = ['push'];
    
    // Add force flag if specified
    if (spl.action(input, 'force')) {
        args.push('--force');
    }
    
    // Add tags flag if specified
    if (spl.action(input, 'tags')) {
        args.push('--tags');
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
    
    // Execute git push command
    const output = git.executeGit(args, repoPath);
    
    // Simple output to console
    console.log('Git Push:');
    console.log('=========');
    if (output.trim()) {
        console.log(output);
    } else {
        console.log('Push completed successfully.');
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////