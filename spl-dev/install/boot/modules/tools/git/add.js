//  name        Git Add Files
//  URI         tools/git/add
//  type        API Method
//  description Add files to staging area
///////////////////////////////////////////////////////////////////////////////
const spl = require("../../spl/spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function tools_git_add(input) {
    // Get repository path from --repo argument, now relative to app root
    const repo = spl.action(input, 'repo');
    const appRoot = spl.context(input, 'appRoot');
    const cwd = spl.context(input, 'cwd');
    const git = require("./git");
    const repoPath = git.getAppRelativeRepoPath(repo, appRoot, cwd);
    
    // Build git add command arguments
    const args = ['add'];
    
    // Add files parameter (default to '.' if not specified)
    const files = spl.action(input, 'files') || '.';
    
    // Add optional flags
    if (spl.action(input, 'all')) {
        args.push('-A');
    }
    
    if (spl.action(input, 'force')) {
        args.push('-f');
    }
    
    // Add files to the command
    args.push(files);
    
    // Execute git add command
    const output = git.executeGit(args, repoPath);
    
    // Simple output to console
    console.log('Git Add:');
    console.log('========');
    if (output.trim()) {
        console.log(output);
    } else {
        console.log(`Files added to staging area: ${files}`);
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////