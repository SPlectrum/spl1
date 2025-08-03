//  name        Git Initialize Repository
//  URI         tools/git/init
//  type        API Method
//  description Initialize a new git repository
///////////////////////////////////////////////////////////////////////////////
const spl = require("../../../spl/spl.js")
const fs = require('fs');
const path = require('path');
///////////////////////////////////////////////////////////////////////////////
exports.default = function tools_git_init(input) {
    const git = require("../git");
    
    // Get repository path from --repo argument, now relative to app root
    const repo = spl.action(input, 'repo');
    const appRoot = spl.context(input, 'appRoot');
    const cwd = spl.context(input, 'cwd');
    const repoPath = git.getAppRelativeRepoPath(repo, appRoot, cwd);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(repoPath)) {
        fs.mkdirSync(repoPath, { recursive: true });
        console.log(`Created directory: ${repoPath}`);
    }
    
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