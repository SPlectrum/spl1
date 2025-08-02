//  name        Sets the command
//  URI         spl/command/help
//  type        API Method
//  description Generates commandline help.
//              Uses the parser.json file to store details.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js");
const command = require("./command");
const help = require("command-line-usage");
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_command_help ( input ) {
    const helpRequests = spl.action( input );
    const splCommand = spl.wsRef ( input, "spl/command" );
    const parserOptionsURI = spl.fURI("spl/command", splCommand.headers.spl.command.parser.file);
    const parserOptions = spl.wsRef ( input, parserOptionsURI ).value;
    var helpData = [];
    helpData = helpData.concat ( parserOptions.top );
    for ( var i=0; i < helpRequests.length; i++ ) {
        var section = command.getHelpSection ( parserOptions, helpRequests[i] );
        helpData = helpData.concat ( section.header );
        if ( section.options ) helpData.push ( section.options );
        if ( section.subList ) helpData.push ( section.subList );
    }
    helpData = helpData.concat ( parserOptions.bottom );
    console.log(help(helpData))
    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
