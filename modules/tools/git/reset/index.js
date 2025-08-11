//  name        Git Reset
//  URI         tools/git/reset
//  type        API Method
//  description Reset current HEAD to the specified state
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
const git = require("tools_git_lib");
///////////////////////////////////////////////////////////////////////////////
exports.default = function tools_git_reset(input) {
    // Get repository path from --repo argument, now relative to app root
    const repo = spl.action(input, 'repo');
    const appDataRoot = spl.context(input, 'appDataRoot');
    const cwd = spl.context(input, 'cwd');
    const repoPath = git.getAppRelativeRepoPath(repo, cwd, appDataRoot);
    
    // Build git reset command arguments
    const args = ['reset'];
    
    // Add reset mode if specified
    const mode = spl.action(input, 'mode');
    if (mode) {
        args.push(`--${mode}`);
    }
    
    // Add target commit if specified
    const commit = spl.action(input, 'commit');
    if (commit) {
        args.push(commit);
    }
    
    // Add specific files if specified
    const files = spl.action(input, 'files');
    if (files) {
        args.push(files);
    }
    
    // Execute git reset command
    const output = git.executeGit(args, repoPath);
    
    // Simple output to console
    console.log('Git Reset:');
    console.log('==========');
    if (output.trim()) {
        console.log(output);
    } else {
        let message = 'Reset completed successfully.';
        if (mode) {
            message += ` Mode: ${mode}`;
        }
        if (commit) {
            message += ` Target: ${commit}`;
        }
        if (files) {
            message += ` Files: ${files}`;
        }
        console.log(message);
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////