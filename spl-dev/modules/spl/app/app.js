//  name        app API Auxiliary Functions
//  URI         spl/app/app
//  type        Auxiliary Library
//  description Auxiliary functions for the app API.
///////////////////////////////////////////////////////////////////////////////
const parser = require('command-line-args');
const spl = require("../spl.js")
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
    const spl = require("../spl.js");
    const fs = require('fs');
    var prefix = "";
    var getRoot = "", getDir = "";
    
    // Parse URI for app overlay (same try/catch logic as moduleAction)
    const parts = URI.split('/');
    if (parts.length >= 2) {
        const app = parts[0];
        const moduleFile = parts.slice(1).join('/');
        const cwd = process.cwd(); // Get current working directory
        
        // Try app version first
        const appArgPath = `${cwd}/apps/${app}/modules/${moduleFile}_arguments.json`;
        try {
            fs.accessSync(appArgPath, fs.constants.F_OK);
            // App arguments file exists, use app path
            getRoot = `apps/${app}/modules`;
            getDir = "";
            prefix = `${moduleFile}_`;
        } catch (e) {
            // Fall back to global modules
            getRoot = "";
            getDir = "modules";
            prefix = `${URI}_`;
        }
    } else if (parts.length === 1 && URI.length > 0) {
        // Single-part URI - try app overlay first
        const app = parts[0];
        const cwd = process.cwd();
        
        // Try app version first
        const appArgPath = `${cwd}/apps/${app}/modules/${app}_arguments.json`;
        try {
            fs.accessSync(appArgPath, fs.constants.F_OK);
            // App arguments file exists, use app path
            getRoot = `apps/${app}/modules`;
            getDir = "";
            prefix = `${app}_`;
        } catch (e) {
            // Fall back to global modules
            getRoot = "";
            getDir = "modules";
            prefix = `${URI}_`;
        }
    } else {
        // Empty URI - use global modules
        getRoot = "";
        getDir = "modules";
        if ( URI.length > 0 ) prefix = `${URI}_`;
    }
    
    const fileURI = `${(URI==="")?"":prefix}arguments.json`;
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

// parse commandline section
exports.parse = function (args, definitions) {
    if(definitions === undefined) definitions = [{ name: 'command', defaultOption: true }];
    return parser(definitions, { stopAtFirstUnknown: true, argv: args });
}
///////////////////////////////////////////////////////////////////////////////

