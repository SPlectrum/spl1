//  name        Git Stash
//  URI         tools/git/stash
//  type        API Method
//  description Stash changes in a dirty working directory
///////////////////////////////////////////////////////////////////////////////
const spl = require("../../spl/spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function tools_git_stash(input) {
    // Get repository path from --repo argument, now relative to app root
    const repo = spl.action(input, 'repo');
    const appRoot = spl.context(input, 'appRoot');
    const cwd = spl.context(input, 'cwd');
    const git = require("./git");
    const repoPath = git.getAppRelativeRepoPath(repo, appRoot, cwd);
    
    // Build git stash command arguments
    const args = ['stash'];
    
    // Handle different stash operations
    const save = spl.action(input, 'save');
    const pop = spl.action(input, 'pop');
    const list = spl.action(input, 'list');
    const apply = spl.action(input, 'apply');
    const drop = spl.action(input, 'drop');
    
    if (save) {
        // Save stash with message
        args.push('save', save);
    } else if (pop) {
        // Pop latest stash
        args.push('pop');
    } else if (list) {
        // List all stashes
        args.push('list');
    } else if (apply) {
        // Apply specific stash
        args.push('apply', apply);
    } else if (drop) {
        // Drop specific stash
        args.push('drop', drop);
    } else {
        // Default stash behavior (save without message)
        args.push('save');
    }
    
    // Execute git stash command
    const output = git.executeGit(args, repoPath);
    
    // Simple output to console
    console.log('Git Stash:');
    console.log('==========');
    if (output.trim()) {
        console.log(output);
    } else {
        if (save) {
            console.log(`Stash saved with message: "${save}"`);
        } else if (pop) {
            console.log('Latest stash popped successfully.');
        } else if (apply) {
            console.log(`Stash "${apply}" applied successfully.`);
        } else if (drop) {
            console.log(`Stash "${drop}" dropped successfully.`);
        } else if (list) {
            console.log('No stashes found.');
        } else {
            console.log('Changes stashed successfully.');
        }
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////