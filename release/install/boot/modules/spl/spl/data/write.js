//  name        Write one or more Data Records
//  URI         spl/data/write
//  type        API Method
//  description Writes a new data record to a dir.
//              It creates a timestamp filename.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
const data = require("./data.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_data_write ( input ) {
    const cwd = input.headers.spl.execute.cwd;
    var sources = input.headers.spl.data.write;
    if ( !Array.isArray(sources) ) sources = [ sources ];

    for ( var i=0; i<sources.length; i++ ) {
        sources[i] = data.setLocation ( sources[i] );
        const dirPath = spl.URI(sources[i].repo, sources[i].dir);
        if ( sources[i].contents ) spl.wsSet( input, `spl/data.${dirPath}`, sources[i].contents );
        const fileName = data.writeFileRecord ( data.path ( cwd, dirPath ), spl.wsGet( input, `spl/data.${dirPath}` ) );
        spl.rcSet( spl.wsRef ( input, `spl/data.${dirPath}` ), "headers.spl.data.file", fileName );
        spl.history ( input, `write ${dirPath}/${fileName}`);
    }
    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
