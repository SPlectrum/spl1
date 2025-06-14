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
    
    // Read the script file
    const scriptUri = spl.URI(appRoot, "scripts", filePath);
    if (!spl.wsExists(input, `spl/blob.${spl.fURI(scriptUri)}`, "spl/blob/get", {
        repo: appRoot, dir: "scripts", file: filePath, encoding: "text"
    }, true)) return;
    
    const scriptContents = spl.wsGet(input, `spl/blob.${spl.fURI(scriptUri)}`).value;
    
    // Create wrapped action
    const wrappedActionJs = `//  name        ${actionName}
//  URI         usr/${actionName}
//  type        API Method
//  description Auto-generated wrapper for ${filePath}
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
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
    spl.wsSet(input, `spl/blob.${spl.fURI(appRoot, "modules/usr", `${actionName}.js`)}`, { headers: {}, value: wrappedActionJs });
    spl.wsSet(input, `spl/blob.${spl.fURI(appRoot, "modules/usr", `${actionName}_arguments.json`)}`, { headers: {}, value: wrappedArgumentsJson });

    console.log(`Successfully wrapped ${filePath} as usr/${actionName}`);
    console.log(`Created: modules/usr/${actionName}.js`);
    console.log(`Created: modules/usr/${actionName}_arguments.json`);

    spl.gotoExecute(input, "spl/blob/put", [
        { repo: appRoot, dir: "modules/usr", file: `${actionName}.js`, encoding: "text" },
        { repo: appRoot, dir: "modules/usr", file: `${actionName}_arguments.json`, encoding: "text" }
    ]);
}
///////////////////////////////////////////////////////////////////////////////
