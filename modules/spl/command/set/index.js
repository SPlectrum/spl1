//  name        Sets the command
//  URI         spl/command/set
//  type        API Method
//  description Loads the command template with client settings
//              and sets the command.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../../spl.js");
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_command_set ( input ) {

    if(!spl.wsExists ( input, "spl/command", "spl/data/read", spl.action ( input, "template" ), true ) ) return;
    var source = spl.action ( input );
    var destination = spl.wsRef ( input, "spl/command" );
    spl.rcSet( destination, "headers.spl.command.repo", source.template.repo );
    spl.rcSet( destination, "headers.spl.command.parser.repo", source.template.repo );

    // needs proper entry in spl/command
    spl.wsSet( input, "spl/command.commandString", source.commandString );
    spl.wsSet( input, "spl/command.UUID", source.UUID );

    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
