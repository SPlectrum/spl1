//  name        app API Auxiliary Functions
//  URI         spl/app/app
//  type        Auxiliary Library
//  description Auxiliary functions for the app API.
///////////////////////////////////////////////////////////////////////////////
const parser = require('command-line-args');
const spl = require("spl_lib")
///////////////////////////////////////////////////////////////////////////////

exports.commandString = function ( splApp, current ) 
{
    if ( current.part == -1 ) return splApp.value.input[`line_${current.line}`];
    else  return splApp.value.input[`line_${current.line}`][`part_${current.part}`];
}

exports.parsed = function ( splApp, current ) 
{
    if ( current.part == -1 ) return structuredClone ( splApp.value.parsed[`line_${current.line}`] );
    else  return structuredClone ( splApp.value.parsed[`line_${current.line}`][`part_${current.part}`] );
}

exports.getDetails = function ( URI ) 
{
    const spl = require("spl_lib");
    const fs = require('fs');
    var getRoot = "", getDir = "";
    
    // Parse URI for app overlay (same try/catch logic as moduleAction)
    const parts = URI.split('/');
    if (parts.length >= 2) {
        const app = parts[0];
        const moduleFile = parts.slice(1).join('/');
        const cwd = process.cwd(); // Get current working directory
        
        // Try app version first
        const appArgPath = `${cwd}/apps/${app}/modules/${moduleFile}/index_arguments.json`;
        try {
            fs.accessSync(appArgPath, fs.constants.F_OK);
            // App arguments file exists, use app path
            getRoot = `apps/${app}/modules`;
            getDir = "";
        } catch (e) {
            // Fall back to global modules
            getRoot = "";
            getDir = "modules";
        }
    } else if (parts.length === 1 && URI.length > 0) {
        // Single-part URI - try app overlay first
        const app = parts[0];
        const cwd = process.cwd();
        
        // Try app version first
        const appArgPath = `${cwd}/apps/${app}/modules/index_arguments.json`;
        try {
            fs.accessSync(appArgPath, fs.constants.F_OK);
            // App arguments file exists, use app path
            getRoot = `apps/${app}/modules`;
            getDir = "";
        } catch (e) {
            // Fall back to global modules
            getRoot = "";
            getDir = "modules";
        }
    } else {
        // Empty URI - use global modules
        getRoot = "";
        getDir = "modules";
    }
    
    // For app overlays, fileURI should exclude app name since it's in getRoot
    let fileURI;
    if (URI === "") {
        fileURI = "index_arguments.json";
    } else if (getRoot.includes("apps/")) {
        // App overlay: use module path without app name (parts[1:])
        const modulePath = parts.slice(1).join('/');
        fileURI = `${modulePath}/index_arguments.json`;
    } else {
        // Global modules: use full URI
        fileURI = `${URI}/index_arguments.json`;
    }
    const getURI = `spl/blob.${spl.fURI ( getRoot, getDir.replace("../",""), fileURI )}`;
    const wsURI = `spl/app.options.${spl.fURI ( fileURI )}`;
    const args = [ { repo: getRoot, dir: getDir, file: fileURI, reference: [ wsURI ] } ];
    return { URI: wsURI, getURI: getURI, args: args }
}


exports.getNext = function ( splApp ) 
{
    var line = splApp.headers.spl.app.currentLine;
    var part = splApp.headers.spl.app.currentPart;
    part++;
    if ( splApp.value.input[`line_${line}`] && splApp.value.input[`line_${line}`][`part_${part}`] ) return { line: line, part: part };
    line++; part = 0;
    if ( splApp.value.input[`line_${line}`] ) {
        if ( splApp.value.input[`line_${line}`][`part_${part}`] === undefined ) part = -1;
        return { line: line, part: part };
    }
    return { line: -1, part: -1 }
}

exports.reset = function ( splApp ) 
{
    splApp.headers.spl.app.currentLine = -1;
    splApp.headers.spl.app.currentPart = -1;
}

exports.setCurrent = function ( splApp, current ) 
{
    splApp.headers.spl.app.currentLine = current.line;
    splApp.headers.spl.app.currentPart = current.part;
}

exports.setParsed = function ( splApp, current, result ) 
{
    if ( current.part == -1 ) splApp.value.parsed[`line_${current.line}`] = result;
    else
    {
        if ( splApp.value.parsed[`line_${current.line}`] === undefined ) splApp.value.parsed[`line_${current.line}`] = {};
        splApp.value.parsed[`line_${current.line}`][`part_${current.part}`] = result;
    }
}

exports.splitAndTrim = function ( input )
{
    var output = [];
    input = input.split(" ");
    for ( var i = 0; i < input.length; i++ ) if ( input[i].trim() != "") output.push(input[i]);
    return output
}

// activates the option types
function activateTypes (options) {
    for(var i=0; i<options.length; i++)
        if (options[i].type) {
            switch(options[i].type) {
                case "BigInt": options[i].type = BigInt; break;
                case "Boolean": options[i].type = Boolean; break;
                case "Number": options[i].type = Number; break;
                case "String": options[i].type = String; break;
            }
        }
    return options;
}
exports.activateTypes = activateTypes;

exports.getChildOptions = function ( input, parent )
{

}

// Generate wrapper template for shell/python scripts
exports.generateShellPythonWrapper = function (actionName, filePath, interpreter) {
    return `//  name        ${actionName}
//  URI         usr/${actionName}
//  type        API Method
//  description Auto-generated wrapper for ${filePath}
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const { spawn } = require('child_process');
const path = require('path');
///////////////////////////////////////////////////////////////////////////////
exports.default = function usr_${actionName.replace(/[^a-zA-Z0-9]/g, '_')} (input)
{
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
}

// Generate wrapper template for JS scripts  
exports.generateJSWrapper = function (actionName, filePath, scriptContents) {
    return `//  name        ${actionName}
//  URI         usr/${actionName}
//  type        API Method
//  description Auto-generated wrapper for ${filePath}
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
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

// Generate arguments JSON template
exports.generateArgumentsJson = function (actionName, filePath) {
    return `{
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
}

// Execute shell script
exports.executeShellScript = function (scriptPath, scriptDir, args, spl, input) {
    const { spawn } = require('child_process');
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
}

// Execute Python script
exports.executePythonScript = function (scriptPath, scriptDir, args, spl, input) {
    const { spawn } = require('child_process');
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
}

// Get script paths
exports.getScriptPaths = function (cwdRoot, appRoot, filePath) {
    const path = require('path');
    return {
        scriptPath: path.join(cwdRoot, appRoot, 'scripts', filePath),
        scriptDir: path.join(cwdRoot, appRoot, 'scripts')
    };
}

// Generate command line help
exports.generateHelp = function (sections) {
    const help = require("command-line-usage");
    return help(sections);
}

// Generate batch command wrapper
exports.generateBatchCommand = function (actionName, filePath, pipelineJson, globalJson) {
    return `//  name        ${actionName}
//  URI         usr/${actionName}
//  type        API Method
//  description Auto-generated command from batch file ${filePath}
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
///////////////////////////////////////////////////////////////////////////////
exports.default = function usr_${actionName.replace(/[^a-zA-Z0-9]/g, '_')} (input)
{
    // Set the appRoot configuration
    const appRoot = spl.context ( input, "appRoot" );
    spl.setConfig ( input, "spl/app", "appRoot", appRoot );
    
    // Get arguments passed to this action
    const actionArgs = spl.action(input, "args") || [];
    
    // Get the pre-parsed pipeline
    let pipeline = ${pipelineJson};
    const globalOptions = ${globalJson};
    
    // Apply argument replacements to the pipeline
    let pipelineStr = JSON.stringify(pipeline);
    if (pipelineStr.indexOf("\\\\$@") > -1) pipelineStr = pipelineStr.replaceAll("\\\\$@", actionArgs.toString());
    if (pipelineStr.indexOf("\\\\$*") > -1) pipelineStr = pipelineStr.replaceAll("\\\\$*", actionArgs.join(" "));
    for (let i = 0; i < actionArgs.length; i++) {
        pipelineStr = pipelineStr.replaceAll("\\\\$" + (i+1).toString(), actionArgs[i]);
    }
    pipeline = JSON.parse(pipelineStr);
    
    // Set up the execution pipeline
    spl.wsSet(input, "spl/execute.set-pipeline", {
        headers: {
            spl: {
                execute: {
                    pipeline: pipeline
                }
            }
        },
        value: {}
    });
    
    // Apply global options if any
    if (globalOptions.consoleMode) {
        spl.setContext(input, "consoleMode", globalOptions.consoleMode);
    }
    
    spl.gotoExecute ( input, "spl/execute/set-pipeline" );
}
///////////////////////////////////////////////////////////////////////////////`;
}

// parse commandline section
exports.parse = function (args, definitions) {
    if(definitions === undefined) definitions = [{ name: 'command', defaultOption: true }];
    return parser(definitions, { stopAtFirstUnknown: true, argv: args });
}
///////////////////////////////////////////////////////////////////////////////

