//  name        Write Command Record
//  URI         spl/command/write
//  type        API Method
//  description Writes a commasnd record to a dir - either requests or responses.
//              It creates a timestamp filename.
//              This method is used to log the initial and completed command.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../../spl.js");
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_command_write ( input ) {
    
    const spl_command = spl.wsGet ( input,"spl/command" );
    const repo = spl_command.headers.spl.command.repo;
    const dir = spl.URI( "commands", spl.action ( input, "destination" ) );
    input.headers.spl.data.write = [ { repo: repo, dir: dir } ];

    for(key in spl_command.parsed) spl_command.value[key] = input.value[key];
    spl.wsSet(input, `spl/data.${spl.URI(repo, dir)}`, spl_command)

    spl.gotoExecute ( input, "spl/data/write", { repo: repo, dir: dir } );
}
///////////////////////////////////////////////////////////////////////////////
