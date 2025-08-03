//  name        Git Checkout
//  URI         tools/git/checkout
//  type        API Method
//  description Switch branches or restore files
///////////////////////////////////////////////////////////////////////////////
const spl = require("../../../spl/spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function tools_git_checkout(input) {
    // Get repository path from --repo argument, now relative to app root
    const repo = spl.action(input, 'repo');
    const appRoot = spl.context(input, 'appRoot');
    const cwd = spl.context(input, 'cwd');
    const git = require("../git");
    const repoPath = git.getAppRelativeRepoPath(repo, appRoot, cwd);
    
    // Build git checkout command arguments
    const args = ['checkout'];
    
    // Handle different checkout operations
    const branch = spl.action(input, 'branch');
    const createBranch = spl.action(input, 'create');
    const files = spl.action(input, 'files');
    
    if (createBranch && branch) {
        // Create and checkout new branch
        args.push('-b', branch);
    } else if (branch) {
        // Checkout existing branch
        args.push(branch);
    } else if (files) {
        // Checkout specific files
        args.push(files);
    }
    
    // Execute git checkout command
    const output = git.executeGit(args, repoPath);
    
    // Simple output to console
    console.log('Git Checkout:');
    console.log('=============');
    if (output.trim()) {
        console.log(output);
    } else {
        if (createBranch && branch) {
            console.log(`Created and switched to new branch '${branch}'.`);
        } else if (branch) {
            console.log(`Switched to branch '${branch}'.`);
        } else if (files) {
            console.log(`Checked out files: ${files}`);
        } else {
            console.log('Checkout completed successfully.');
        }
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////