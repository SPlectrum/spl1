//  name        Run
//  URI         spl/app/run
//  type        API Method
//  description This action runs a JS script
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
const splApp = require("spl_app_lib");
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_app_run (input)
{
    // Set the appRoot configuration
    const appRoot = spl.action(input, "appRoot");
    spl.setConfig(input, "spl/app", "appRoot", appRoot);
    
    // Get file parameters from action configuration
    const filePath = spl.action(input, "file");
    const fileArgs = spl.action(input, "args");
    
    
    // Determine script type based on file extension
    const isShellScript = filePath.endsWith('.sh');
    const isPythonScript = filePath.endsWith('.py');
    
    if (isShellScript) {
        // For shell scripts, execute using auxiliary function
        const cwdRoot = spl.context(input, "cwd");
        const paths = splApp.getScriptPaths(cwdRoot, appRoot, filePath);
        const args = fileArgs || [];
        splApp.executeShellScript(paths.scriptPath, paths.scriptDir, args, spl, input);
    } else if (isPythonScript) {
        // For Python scripts, execute using auxiliary function
        const cwdRoot = spl.context(input, "cwd");
        const paths = splApp.getScriptPaths(cwdRoot, appRoot, filePath);
        const args = fileArgs || [];
        splApp.executePythonScript(paths.scriptPath, paths.scriptDir, args, spl, input);
    } else {
        // For JS scripts, use the existing pipeline: process-file -> eval
        spl.history(input, `app/run: executing JS script ${filePath}`);
        spl.wsSet(input, "spl/execute.set-pipeline", {
            headers: {
                spl: {
                    execute: {
                        pipeline: [
                            {
                                action: "spl/app/process-file",
                                "spl/app/process-file": {
                                    file: filePath,
                                    repo: appRoot,
                                    dir: "scripts",
                                    args: fileArgs
                                }
                            },
                            { action: "spl/app/eval" }
                        ]
                    }
                }
            },
            value: {}
        });
        spl.gotoExecute(input, "spl/execute/set-pipeline");
    }
}
///////////////////////////////////////////////////////////////////////////////
