# Application Development Patterns

## Existing Apps
- `boot` - Release/deployment management 
- `model` - Template for new apps
- `test-suite` - Core platform testing
- `test-tools-git` - Git API testing
- `test-tools-7zip` - 7zip API testing (scaffolded)
- `test-boot` - Boot app functionality testing
- `watcher` - Development/monitoring

## Test App Patterns
- Naming: `test-{target}` (e.g., `test-boot`, `test-tools-git`)
- Test source locations rather than deployed locations
- Use auxiliary libraries (`modules/{domain}/{domain}.js`) for implementation logic
- Method files act as thin wrappers calling library functions
- Hybrid approach: Use Node.js modules when SPlectrum functionality incomplete

## Batch Files (.batch extension)
- Contain command sequences for automation
- Auto-converted to JavaScript usr/ methods via `spl/app/create -f {file}.batch`
- Essential for release management and testing workflows
- Boot app manages release/deployment for all apps via batch files
- Support parameter substitution: `$1`, `$2`, `$@`, `$*` for dynamic arguments
- Arguments passed via `-a` or `--args` flag to both `spl/app/exec` and generated usr/ commands
- **Testing Rule**: Always test batch files directly using `spl/app/exec -f {file}.batch` before generating usr/ commands - this isolates batch logic from generation issues

## Batch File with Arguments Development Workflow
1. **Create/Edit**: Modify `.batch` file with command sequence and parameter placeholders (`$1`, `$2`, etc.)
2. **Test Batch First**: Use `spl/app/exec -f {file}.batch -a arg1 arg2` to test batch file execution
3. **Debug Batch Issues**: If batch fails, fix the batch file logic before generation
4. **Generate Command**: Only after batch tests pass, convert to usr/ command with `spl/app/create -f {file}.batch`  
5. **Test Command**: Test generated usr/ command with `usr/{command} -a arg1 arg2`
6. **Parameter Patterns**: `$1`, `$2` (positional), `$@` (array), `$*` (space-separated string)

**Testing Principle**: Batch files are the source of truth - test them directly first to isolate logic issues from code generation problems.

## Boot App Development Workflow
1. **Modify**: Edit batch files or usr/ commands in `spl/apps/boot/`
2. **Test**: Use temporary spl-prefixed folders for testing (e.g., `spl-test-install`)
3. **Regenerate**: If batch files changed, use `spl/app/create -f {file}.batch` to update usr/ commands
4. **Publish**: Use `usr/boot_to_release` to publish changes to release folder
5. **Avoid**: Never test deployment in development `spl/` directory - use separate test folders

## App Creation Workflow (Complete all steps)
1. Copy structure from model app (`spl`, `spl.js`, `modules/`)
2. Create batch files for app functionality
3. Update boot app release system (add to `apps_to_release.batch`, etc.)
4. Generate usr/ methods from batch files
5. Test integration with `./spl_execute {app} --help`
6. Package to release folder via `usr/boot_to_release` and `usr/apps_to_release`

## API Development Workflow
1. Create API structure in `modules/{category}/{api-name}/`
2. Implement auxiliary library, index.js, methods, and argument schemas
3. Create corresponding test app (`test-{category}-{api-name}`)
4. Create test batch files and generate usr/ methods
5. Integrate with boot app release system

## App Context Configuration Patterns

### Critical spl.js Configuration Discovery

**Context vs Config Distinction**: SPL APIs distinguish between execution context and action configuration.

**Required Context Elements**:
```javascript
const context = {
    action: "spl/execute/initialise", 
    consoleProgress: "start",  
    consoleMode: "standard",
    runtimeMode: "silent", 
    cwd: splRoot, 
    session: session, 
    modules: `${appRoot}/modules`, 
    appRoot: appRoot,  // CRITICAL: Required for API path resolution
    TTL: 100 
};
```

**Context vs Config Pattern**:
- **Context**: `spl.context(input, 'appRoot')` - Retrieved via `spl.setContext()`
- **Config**: `spl.action(input, 'appRoot')` - Retrieved via `spl.setConfig()`
- **API Dependencies**: Tools APIs require `appRoot` in context, not just config

**App Architecture Comparison**:
- **Boot App**: Uses local modules (`./modules/spl/spl.js`), requires explicit context setup
- **Test Apps**: Use global modules (`../../../modules/spl/spl.js`), include moduleOverlay patterns

**Module Update Workflow for Apps**:
1. **Update Install**: `usr/release_to_install -a {install-dir}` - Copy modules to install folder
2. **Update App**: `usr/modules_to_boot` - Deploy modules from install to app
3. **Limitation**: `modules_to_boot` only copies `spl/` subdirectory, not top-level `tools/`
4. **Manual Override**: Direct copy required for tools: `cp -r install/modules/tools apps/{app}/modules/`

**Debug Flag Benefits**:
- Use `-d` flag to see complete execution context and workspace state
- Shows context values like `appRoot`, `cwd`, execution history
- Essential for diagnosing module resolution and path issues

**Batch Command Argument Pattern**:
- Batch commands generated from `.batch` files use `--args` or `-a` flag for parameters
- Arguments passed via `-a` flag get substituted into batch commands as `$1`, `$2`, etc.
- Example: `usr/release_to_install -a spl` passes `spl` as `$1` in batch file
- Without `-a` flag, arguments are treated as command paths, causing parse errors

## Multi-Language Script Support (spl/app/run and spl/app/wrap)

### Script Type Detection
- **JavaScript (.js)**: Uses existing eval pipeline with `spl/app/process-file` → `spl/app/eval`
- **Bash (.sh)**: Direct execution using `spawn('bash', [scriptPath, ...args])`
- **Python (.py)**: Direct execution using `spawn('python3', [scriptPath, ...args])`
- File extension determines execution method automatically

### Path Resolution for Scripts
- **Critical Pattern**: Use `spl.context(input, "cwd")` + `spl.config(input, "spl/app", "appRoot")` for path construction
- **Working Directory**: Scripts execute in `{cwd}/{appRoot}/scripts/` directory
- **Script Path**: Full path = `path.join(cwdRoot, appRoot, 'scripts', filePath)`

### Wrapped Script Context Issues
- **Problem**: `spl.action(input, "appRoot")` returns `undefined` in wrapped script context
- **Solution**: Use `spl.config(input, "spl/app", "appRoot")` in generated wrapper code
- **Root Cause**: Wrapped scripts don't inherit action context, but do inherit spl/app config

### Multi-Language Wrapper Generation
- **JavaScript**: Generates eval-based wrapper with argument substitution (`$1`, `$2`, `$@`, `$*`)
- **Bash/Python**: Generates spawn-based wrapper with direct argument passing
- **Template Pattern**: Different wrapper templates based on script file extension
- **Interpreter Selection**: `isShellScript ? 'bash' : 'python3'` for spawn command

### Testing Patterns for Multi-Language Support
- Create test scripts in all supported languages (`.js`, `.sh`, `.py`)
- Test both `spl/app/run` direct execution and `spl/app/wrap` + execution
- Verify argument passing works correctly for each script type
- Test working directory and path resolution for each language

### Development Workflow for Script Support
1. **Implement**: Add script type detection and execution logic
2. **Test Direct**: Test `spl/app/run -f script.{ext}` for each language
3. **Test Wrapped**: Test `spl/app/wrap -f script.{ext}` then `usr/script-name`
4. **Debug Paths**: Use debug flag `-d` to verify path resolution
5. **Package**: Use proper release process to update all deployment locations