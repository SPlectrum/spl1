//  name        Git API (Simplified)
//  URI         spl/git
//  type        API Module
//  description Simplified Git API that just validates the repository path
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
const git = require("./git")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_git(input) {
    const repoPath = git.getRepoPath(input, spl);
    
    // Just validate the repository exists
    if (git.validateRepository(input, spl, repoPath)) {
        spl.history(input, `Git API initialized with repository: ${repoPath}`);
        console.log(`Git repository validated: ${repoPath}`);
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////