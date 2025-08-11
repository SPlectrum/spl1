//  name        Git Branch Management
//  URI         tools/git/branch
//  type        API Method
//  description Create, delete, or list branches
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
const git = require("tools_git_lib");
///////////////////////////////////////////////////////////////////////////////
exports.default = function tools_git_branch(input) {
    // Get repository path from --repo argument, now relative to app root
    const repo = spl.action(input, 'repo');
    const appDataRoot = spl.context(input, 'appDataRoot');
    const cwd = spl.context(input, 'cwd');
    const repoPath = git.getAppRelativeRepoPath(repo, cwd, appDataRoot);
    
    // Build git branch command arguments
    const args = ['branch'];
    
    // Handle different branch operations
    const branchName = spl.action(input, 'name');
    const deleteBranch = spl.action(input, 'delete');
    const listBranches = spl.action(input, 'list');
    const includeRemote = spl.action(input, 'remote');
    
    if (deleteBranch) {
        // Delete branch
        args.push('-d', deleteBranch);
    } else if (branchName) {
        // Create new branch
        args.push(branchName);
    } else {
        // List branches (default behavior)
        if (includeRemote) {
            args.push('-a');
        }
    }
    
    // Execute git branch command
    const output = git.executeGit(args, repoPath);
    
    // Simple output to console
    console.log('Git Branch:');
    console.log('===========');
    if (output.trim()) {
        console.log(output);
    } else {
        if (branchName) {
            console.log(`Branch '${branchName}' created successfully.`);
        } else if (deleteBranch) {
            console.log(`Branch '${deleteBranch}' deleted successfully.`);
        }
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////