//  name        Move one or more files or dirs
//  URI         spl/blob/move
//  type        API Method
//  description This method moves one or more files or dirs.
//              This method executes asynchrounously.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
const blob = require("./blob.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_blob_move ( input ) {
    const cwd = spl.context ( input, "cwd" );
    var sources = spl.action ( input );
    if ( !Array.isArray(sources) ) sources = [ sources ];

    for ( var i=0; i<sources.length; i++ ) {
        sources[i].from = blob.setLocation(sources[i].from)
        sources[i].to = blob.setLocation(sources[i].to)
        const fromPath = `${spl.URI(sources[i].from.repo, sources[i].from.dir)}/${((sources[i].from.file===undefined)?"":sources[i].from.file)}`;
        const toPath = `${spl.URI(sources[i].to.repo, sources[i].to.dir)}/${((sources[i].to.file===undefined)?"":sources[i].to.file)}`;
        blob.moveFile ( input, spl, blob.path(cwd, fromPath ), blob.path(cwd, toPath ) );
        spl.history ( input, ` async - move ${fromPath} to ${toPath}` );
    }
    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
