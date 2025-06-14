//  name        Run
//  URI         spl/app/run
//  type        API Method
//  description This action runs a JS script
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
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
        // For shell scripts, execute directly using child_process
        const { spawn } = require('child_process');
        const path = require('path');
        
        const cwdRoot = spl.context(input, "cwd");
        const scriptPath = path.join(cwdRoot, appRoot, 'scripts', filePath);
        const scriptDir = path.join(cwdRoot, appRoot, 'scripts');
        const args = fileArgs || [];
        
        
        const child = spawn('bash', [scriptPath, ...args], {
            stdio: 'inherit',
            cwd: scriptDir
        });
        
        child.on('close', (code) => {
            if (code !== 0) {
                console.error(`Script exited with code ${code}`);
                process.exit(code);
            }
            spl.completed(input);
        });
        
        child.on('error', (err) => {
            console.error(`Failed to execute script: ${err.message}`);
            process.exit(1);
        });
    } else if (isPythonScript) {
        // For Python scripts, execute using python3
        const { spawn } = require('child_process');
        const path = require('path');
        
        const cwdRoot = spl.context(input, "cwd");
        const scriptPath = path.join(cwdRoot, appRoot, 'scripts', filePath);
        const scriptDir = path.join(cwdRoot, appRoot, 'scripts');
        const args = fileArgs || [];
        
        const child = spawn('python3', [scriptPath, ...args], {
            stdio: 'inherit',
            cwd: scriptDir
        });
        
        child.on('close', (code) => {
            if (code !== 0) {
                console.error(`Script exited with code ${code}`);
                process.exit(code);
            }
            spl.completed(input);
        });
        
        child.on('error', (err) => {
            console.error(`Failed to execute script: ${err.message}`);
            process.exit(1);
        });
    } else {
        // For JS scripts, use the existing pipeline: process-file -> eval
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
