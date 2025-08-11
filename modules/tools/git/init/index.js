//  name        Git Initialize Repository
//  URI         tools/git/init
//  type        API Method
//  description Initialize a new git repository
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
const git = require("tools_git_lib");
///////////////////////////////////////////////////////////////////////////////
exports.default = function tools_git_init(input) {
    
    // Get repository path from --repo argument, now relative to app root
    const repo = spl.action(input, 'repo');
    const appDataRoot = spl.context(input, 'appDataRoot');
    const cwd = spl.context(input, 'cwd');
    const repoPath = git.getAppRelativeRepoPath(repo, cwd, appDataRoot);
    
    // Ensure directory exists (delegate to auxiliary library)
    git.ensureDirectory(repoPath);
    
    // Build git init command arguments
    const args = ['init'];
    
    // Add optional flags
    if (spl.action(input, 'bare')) {
        args.push('--bare');
    }
    
    if (spl.action(input, 'template')) {
        const template = spl.action(input, 'template');
        args.push('--template', template);
    }
    
    // Execute git init command
    const output = git.executeGit(args, repoPath);
    
    // Output result to console
    console.log('Git Repository Initialized:');
    console.log('===========================');
    console.log(output);
    console.log(`Repository path: ${repoPath}`);
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////