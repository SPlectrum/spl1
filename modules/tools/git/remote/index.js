//  name        Git Remote Management
//  URI         tools/git/remote
//  type        API Method
//  description Manage remote repositories
///////////////////////////////////////////////////////////////////////////////
const spl = require("../../../spl/spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function tools_git_remote(input) {
    // Get repository path from --repo argument, now relative to app root
    const repo = spl.action(input, 'repo');
    const appRoot = spl.context(input, 'appRoot');
    const cwd = spl.context(input, 'cwd');
    const git = require("../git");
    const repoPath = git.getAppRelativeRepoPath(repo, appRoot, cwd);
    
    // Build git remote command arguments
    const args = ['remote'];
    
    // Handle different remote operations
    const addRemote = spl.action(input, 'add');
    const removeRemote = spl.action(input, 'remove');
    const listRemotes = spl.action(input, 'list');
    const verbose = spl.action(input, 'verbose');
    const url = spl.action(input, 'url');
    
    if (addRemote) {
        // Add remote
        if (!url) {
            console.log('Error: URL parameter is required when adding a remote');
            spl.completed(input);
            return;
        }
        args.push('add', addRemote, url);
    } else if (removeRemote) {
        // Remove remote
        args.push('remove', removeRemote);
    } else {
        // List remotes (default behavior)
        if (verbose) {
            args.push('-v');
        }
    }
    
    // Execute git remote command
    const output = git.executeGit(args, repoPath);
    
    // Simple output to console
    console.log('Git Remote:');
    console.log('===========');
    if (output.trim()) {
        console.log(output);
    } else {
        if (addRemote) {
            console.log(`Remote '${addRemote}' added successfully.`);
        } else if (removeRemote) {
            console.log(`Remote '${removeRemote}' removed successfully.`);
        } else {
            console.log('No remotes configured.');
        }
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////