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

exports.getDetails = function ( appRoot, moduleRoot, URI ) 
{
    var prefix = "";
    var getRoot = "", getDir = moduleRoot;
    if ( URI.indexOf ( "spl" ) != 0 && URI.indexOf ( "tools" ) != 0 ) { getRoot = appRoot; getDir = "modules"; }
    
    if ( URI.length > 0 ) prefix = `${URI}_`;
    const fileURI = `${(URI==="")?"":prefix}arguments.json`;
    const getURI = `spl/blob.${spl.fURI ( getRoot, getDir.replace("../",""), fileURI )}`;
    const wsURI = `spl/app.options.${spl.fURI ( fileURI )}`;
    const args = [ { repo: getRoot, dir: getDir, file: fileURI, reference: [ wsURI ] } ];
    return { URI: wsURI, getURI: getURI, args: args }
}

exports.getContentsDetails = function ( appRoot, moduleRoot, URI ) 
{
//    var prefix = "";
    var getRoot = "", getDir = moduleRoot;
    if ( URI.indexOf ( "spl" ) != 0 ) { getRoot = appRoot; getDir = "modules"; }
//    if ( URI.length > 0 ) prefix = `${URI;
//    const fileURI = `${(URI==="")?"":prefix}arguments.json`;
    const getURI = `spl/blob.${spl.URI ( getRoot, getDir.replace("../",""), URI )}`;
    const wsURI = `spl/app.options.${spl.URI ( URI )}`;
    const args = [ { repo: getRoot, dir: spl.URI( getDir, URI ), reference: [ wsURI ] } ];
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

/*
// getCommandOptions 
exports.getHelpSection = function ( parseOptions, command ) {
    var parts = command.split("/");
    if ( parts[0] === "" ) {
        var packages = [];
        for( key in parseOptions.packages ) packages.push ( { name: parseOptions.packages[key].header[0].header, summary: parseOptions.packages[key].header[1].content } );
        var packageList =   {
            header: 'Package List',
            content: packages
        }
        return { 
            header: parseOptions.header, 
            options: { optionList: activateTypes ( structuredClone ( parseOptions.options ) ) },
            subList: packageList
        };
    } else if ( parts.length == 1 ) {
        var section = parseOptions.packages[parts[0]]
        var apis = [];
        for( key in section.apis ) apis.push ( { name: section.apis[key].header[0].header, summary: section.apis[key].header[1].content } );
        var apiList =   {
            header: 'API List',
            content: apis
        }
        return {
            header: section.header, 
            options: { optionList: activateTypes ( structuredClone ( section.options ) ) },
            subList: apiList
        };
    } else if ( parts.length == 2 ) {
        var section = parseOptions.packages[parts[0]].apis[parts[1]]
        var methods = [];
        for( key in section.methods ) methods.push ( { name: section.methods[key].header[0].header, summary: section.methods[key].header[1].content } );
        var methodList =   {
            header: 'Method List',
            content: methods
        }
        return {
            header: section.header, 
            options: { optionList: activateTypes ( structuredClone ( section.options ) ) },
            subList: methodList
        }
    } else if ( parts.length == 3 ) {
        var section = parseOptions.packages[parts[0]].apis[parts[1]].methods[parts[2]]
        return {
            header: section.header, 
            options: { optionList: activateTypes ( structuredClone ( section.options ) ) }
        }
    }
}

// getCommandOptions 
exports.getOptions = function ( parseOptions, command ) {
    var parts = command.split("/");
    if ( parts[0] === "" ) return activateTypes ( structuredClone ( parseOptions.options ) );
    else if ( parts.length == 1 )  return activateTypes ( structuredClone ( parseOptions.packages[parts[0]].options ) );
    else if ( parts.length == 2 )  return activateTypes ( structuredClone ( parseOptions.packages[parts[0]].apis[parts[1]].options ) );
    else if ( parts.length == 3 )  return activateTypes ( structuredClone ( parseOptions.packages[parts[0]].apis[parts[1]].methods[parts[2]].options ) );

}

// exists 
exports.exists = function ( parseOptions, command ) {
    var parts = command.split("/");
    if ( parts[0] === "" ) return {};
    else if ( parts.length == 1 )  return parseOptions.packages[parts[0]];
    else if ( parts.length == 2 )  return parseOptions.packages[parts[0]].apis[parts[1]];
    else if ( parts.length == 3 )  return parseOptions.packages[parts[0]].apis[parts[1]].methods[parts[2]];
}
*/
// parse commandline section
exports.parse = function (args, definitions) {
    if(definitions === undefined) definitions = [{ name: 'command', defaultOption: true }];
    return parser(definitions, { stopAtFirstUnknown: true, argv: args });
}
///////////////////////////////////////////////////////////////////////////////

