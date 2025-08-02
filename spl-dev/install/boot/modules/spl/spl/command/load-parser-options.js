//  name        Loads the parser options file
//  URI         spl/command/load-parser-options
//  type        API Method
//  description Loads the parser options file
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js");
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_command_load_parser_options ( input ) {
    const splCommand = spl.wsRef ( input, "spl/command" ).headers.spl.command.parser;
    const parserUri = `spl/blob.${spl.fURI ( splCommand.repo, splCommand.dir, splCommand.file )}`;
    const parserOptionsURI = `spl/command.${spl.fURI ( splCommand.file )}`;
    const args = [ splCommand ];
    splCommand.reference = [ parserOptionsURI ];

    // reference must be entry within spl/command
    if(!spl.wsExists ( input, parserUri, "spl/blob/get", args, true )) return;
//    spl.wsSet ( input, parserOptionsURI,  spl.wsRef ( input, parserUri ) );
    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
