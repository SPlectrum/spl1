//  name        Command Auxiliary Functions
//  URI         spl/command/command
//  type        Auxiliary Library
//  description Contains the commandline parser.
///////////////////////////////////////////////////////////////////////////////
const parser = require('command-line-args');
///////////////////////////////////////////////////////////////////////////////

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

// parse commandline section
exports.parse = function (args, definitions) {
    if(definitions === undefined) definitions = [{ name: 'command', defaultOption: true }];
    return parser(definitions, { stopAtFirstUnknown: true, argv: args });
}
///////////////////////////////////////////////////////////////////////////////

