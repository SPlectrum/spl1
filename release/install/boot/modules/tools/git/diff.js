//  name        Git Diff
//  URI         tools/git/diff
//  type        API Method
//  description Show changes between commits, commit and working tree, etc.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../../spl/spl.js")
const git = require("./git")
///////////////////////////////////////////////////////////////////////////////
exports.default = function tools_git_diff(input) {
    // Get repository path from --repo argument, now relative to app root
    const repo = spl.action(input, 'repo');
    const appRoot = spl.context(input, 'appRoot');
    const cwd = spl.context(input, 'cwd');
    const repoPath = git.getAppRelativeRepoPath(repo, appRoot, cwd);
    
    // Build git diff command arguments
    const args = ['diff'];
    
    // Add optional flags and parameters
    if (spl.action(input, 'staged')) {
        args.push('--staged');
    }
    
    if (spl.action(input, 'commit')) {
        args.push(spl.action(input, 'commit'));
    }
    
    if (spl.action(input, 'files')) {
        args.push('--', spl.action(input, 'files'));
    }
    
    // Execute git diff command
    const output = git.executeGit(args, repoPath);
    
    // Simple output to console
    console.log('Git Diff:');
    console.log('=========');
    if (output.trim()) {
        console.log(output);
    } else {
        console.log('No differences found.');
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////