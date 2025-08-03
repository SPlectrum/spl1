//  name        Wrap
//  URI         spl/app/wrap
//  type        API Method
//  description This action wraps a JS script into an action
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_app_wrap (input)
{
    const appRoot = spl.action(input, "appRoot");
    const filePath = spl.action(input, "file");
    const actionName = filePath.replace(/\.[^/.]+$/, "");
    const isShellScript = filePath.endsWith('.sh');
    const isPythonScript = filePath.endsWith('.py');
    
    // Read the script file
    const scriptUri = spl.URI(appRoot, "scripts", filePath);
    if (!spl.wsExists(input, `spl/blob.${spl.fURI(scriptUri)}`, "spl/blob/get", {
        repo: appRoot, dir: "scripts", file: filePath, encoding: "text"
    }, true)) return;
    
    const scriptContents = spl.wsGet(input, `spl/blob.${spl.fURI(scriptUri)}`).value;
    
    let wrappedActionJs;
    
    if (isShellScript || isPythonScript) {
        // For shell and Python scripts, create a wrapper that executes them directly
        const interpreter = isShellScript ? 'bash' : 'python3';
        
        wrappedActionJs = `//  name        ${actionName}
//  URI         usr/${actionName}
//  type        API Method
//  description Auto-generated wrapper for ${filePath}
///////////////////////////////////////////////////////////////////////////////
const spl = require("../../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function usr_${actionName.replace(/[^a-zA-Z0-9]/g, '_')} (input)
{
    const { spawn } = require('child_process');
    const path = require('path');
    
    const actionArgs = spl.action(input, "args") || [];
    const cwdRoot = spl.context(input, "cwd");
    const appRoot = spl.config(input, "spl/app", "appRoot");
    const scriptPath = path.join(cwdRoot, appRoot, 'scripts', '${filePath}');
    const scriptDir = path.join(cwdRoot, appRoot, 'scripts');
    
    const child = spawn('${interpreter}', [scriptPath, ...actionArgs], {
        stdio: 'inherit',
        cwd: scriptDir
    });
    
    child.on('close', (code) => {
        if (code !== 0) {
            console.error(\`Script exited with code \${code}\`);
            process.exit(code);
        }
        spl.completed(input);
    });
    
    child.on('error', (err) => {
        console.error(\`Failed to execute script: \${err.message}\`);
        process.exit(1);
    });
}
///////////////////////////////////////////////////////////////////////////////`;
    } else {
        // For JS scripts, use the existing eval approach
        wrappedActionJs = `//  name        ${actionName}
//  URI         usr/${actionName}
//  type        API Method
//  description Auto-generated wrapper for ${filePath}
///////////////////////////////////////////////////////////////////////////////
const spl = require("../../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function usr_${actionName.replace(/[^a-zA-Z0-9]/g, '_')} (input)
{
    const actionArgs = spl.action(input, "args") || [];
    let scriptContent = \`${scriptContents.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;
    
    // Apply argument replacements
    if (scriptContent.indexOf("\\$@") > -1) scriptContent = scriptContent.replaceAll("\\$@", actionArgs.toString());
    if (scriptContent.indexOf("\\$*") > -1) scriptContent = scriptContent.replaceAll("\\$*", actionArgs.join(" "));
    for (let i = 0; i < actionArgs.length; i++) {
        scriptContent = scriptContent.replaceAll("\\$" + (i+1).toString(), actionArgs[i]);
    }
    
    eval(scriptContent);
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////`;
    }

    // Create arguments file
    const wrappedArgumentsJson = `{
    "headers": { "header": [
        { "header": "usr/${actionName}" },
        { "content": "Auto-generated wrapper for ${filePath}." },
        { "content": "{bold syntax}: {italic ./spl <appOpts> usr/${actionName} <opts>}" }
    ]},
    "value": [
        { "name": "help", "alias": "h", "type": "Boolean", "description": "show help information", "typeLabel": "flag" },
        { "name": "args", "alias": "a", "multiple": true, "description": "Arguments to pass to the wrapped script." }
    ]
}`;

    // Store and write files
    spl.wsSet(input, `spl/blob.${spl.fURI(appRoot, "modules/usr", `${actionName}/index.js`)}`, { headers: {}, value: wrappedActionJs });
    spl.wsSet(input, `spl/blob.${spl.fURI(appRoot, "modules/usr", `${actionName}/index_arguments.json`)}`, { headers: {}, value: wrappedArgumentsJson });

    console.log(`Successfully wrapped ${filePath} as usr/${actionName}`);
    console.log(`Created: modules/usr/${actionName}/index.js`);
    console.log(`Created: modules/usr/${actionName}/index_arguments.json`);

    spl.gotoExecute(input, "spl/blob/put", [
        { repo: appRoot, dir: "modules/usr", file: `${actionName}/index.js`, encoding: "text" },
        { repo: appRoot, dir: "modules/usr", file: `${actionName}/index_arguments.json`, encoding: "text" }
    ]);
}
///////////////////////////////////////////////////////////////////////////////
