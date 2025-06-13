[← Home](../README.md)

# Git API Wrapper - Methods Implementation Guide

This document outlines all the methods that should be implemented for the SPL Git API wrapper, based on the existing implementation pattern and design specifications.

## Overview

The SPL Git API provides a comprehensive wrapper around git commands, following the established SPL module pattern. Each method executes git commands through the auxiliary [`git.js`](../modules/tools/git/git.js) library and integrates seamlessly with the SPL platform's execution and error handling systems.

## Implementation Status
- ✅ `tools/git` - Context management  
- ✅ `tools/git/status` - Repository status
- 📋 All other methods - Planned but not implemented

## Implemented Methods

### `tools/git` ✅
Set repository context. Args: `path`, `create`, `help`

### `tools/git/status` ✅  
Get repository status. Args: `repo`, `porcelain`, `short`, `help`
Files: `status.js`, `status_arguments.json`

## Planned Methods 📋

### Basic Operations  
- `init` - Initialize repository (args: repo, bare, template)
- `clone` - Clone repository (args: url, directory, branch, depth)
- `add` - Stage files (args: files, all, force)
- `commit` - Commit changes (args: message, all, amend)
- `push` - Push to remote (args: remote, branch, force, tags)  
- `pull` - Pull from remote (args: remote, branch, rebase)

### Advanced Operations
- `branch` - Branch management (args: name, delete, list, remote)
- `checkout` - Switch branches (args: branch, create, files)
- `remote` - Remote management (args: add, url, remove, list)
- `log` - Commit history (args: count, oneline, graph, since, until)
- `diff` - Show changes (args: staged, files, commit)
- `reset` - Reset state (args: mode, commit, files)
- `stash` - Stash changes (args: save, pop, list, apply, drop)

## Implementation Pattern

Each method follows the established SPL pattern demonstrated in the existing [`status.js`](../modules/tools/git/status.js) implementation:

```javascript
exports.default = function tools_git_methodname(input) {
    // 1. Parameter extraction using spl.action()
    const repo = spl.action(input, 'repo');
    const param = spl.action(input, 'paramName');
    
    // 2. Repository path resolution
    const appRoot = spl.context(input, 'appRoot');
    const cwd = spl.context(input, 'cwd');
    const repoPath = git.getAppRelativeRepoPath(repo, appRoot, cwd);
    
    // 3. Command argument building
    const args = ['git-command'];
    if (param) {
        args.push('--param');
    }
    
    // 4. Git command execution
    const output = git.executeGit(input, spl, args, repoPath);
    
    // 5. Output processing and console logging
    console.log('Git Command Output:');
    console.log('==================');
    console.log(output);
    
    // 6. Completion
    spl.completed(input);
}
```

## File Structure Requirements

Each method requires two files in the [`modules/tools/git/`](../modules/tools/git/) directory:

1. **Implementation file**: `{method}.js`
   - Contains the method implementation following the pattern above
   - Exports a `default` function with the naming convention `tools_git_{method}`

2. **Arguments schema file**: `{method}_arguments.json`
   - Defines the command-line arguments and help information
   - Follows the JSON schema pattern established in [`status_arguments.json`](../modules/tools/git/status_arguments.json)

## Existing Infrastructure

The implementation leverages the existing auxiliary functions in [`git.js`](../modules/tools/git/git.js):

- **`executeGit(input, spl, args, repoPath)`**: Core git command execution
- **`getAppRelativeRepoPath(repo, appRoot, cwd)`**: Repository path resolution

## Usage Examples

```bash
# Initialize a new repository
./spl tools/git/init --repo my-project

# Clone a repository
./spl tools/git/clone --url https://github.com/user/repo.git --repo my-clone

# Basic workflow
./spl tools/git/add --files "." --repo my-project
./spl tools/git/commit --message "Initial commit" --repo my-project
./spl tools/git/push --repo my-project

# Check status and history
./spl tools/git/status --porcelain --repo my-project
./spl tools/git/log --count 10 --oneline --repo my-project
```

## Related Documentation

- [SPL Git API Design](spl-git-api-design.md) - Comprehensive design specification
- [How To Guide](how-to.md) - General SPL usage instructions
- [Main Areas of Work](main-areas-of-work.md) - Project overview

---

[← Home](../README.md)