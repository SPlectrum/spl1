//  name        Wrap
//  URI         spl/app/wrap
//  type        API Method
//  description This action wraps a JS script into an action
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
const splApp = require("spl_app_lib");
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
        wrappedActionJs = splApp.generateShellPythonWrapper(actionName, filePath, interpreter);
    } else {
        // For JS scripts, use the existing eval approach
        wrappedActionJs = splApp.generateJSWrapper(actionName, filePath, scriptContents);
    }

    // Create arguments file
    const wrappedArgumentsJson = splApp.generateArgumentsJson(actionName, filePath);

    // Store and write files
    spl.wsSet(input, `spl/blob.${spl.fURI(appRoot, "modules/usr", `${actionName}.js`)}`, { headers: {}, value: wrappedActionJs });
    spl.wsSet(input, `spl/blob.${spl.fURI(appRoot, "modules/usr", `${actionName}_arguments.json`)}`, { headers: {}, value: wrappedArgumentsJson });

    spl.history(input, `app/wrap: wrapped ${filePath} as usr/${actionName}`);
    console.log(`Successfully wrapped ${filePath} as usr/${actionName}`);
    console.log(`Created: modules/usr/${actionName}.js`);
    console.log(`Created: modules/usr/${actionName}_arguments.json`);

    spl.gotoExecute(input, "spl/blob/put", [
        { repo: appRoot, dir: "modules/usr", file: `${actionName}.js`, encoding: "text" },
        { repo: appRoot, dir: "modules/usr", file: `${actionName}_arguments.json`, encoding: "text" }
    ]);
}
///////////////////////////////////////////////////////////////////////////////
