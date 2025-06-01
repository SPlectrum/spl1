//  name        Delete File or Dir
//  URI         spl/blob/delete
//  type        API Method
//  description This method deletes one or more files or dirs
//              This method executes asynchrounously.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
const blob = require("./blob.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_blob_delete ( input ) {
    const cwd = spl.context ( input, "cwd" );
    var sources = spl.action ( input );
    if ( !Array.isArray(sources) ) sources = [ sources ];

    for ( var i=0; i<sources.length; i++ ) {
        sources[i] = blob.setLocation(sources[i]);
        if( sources[i].file === undefined ) blob.deleteFile ( blob.path( cwd, sources[i].repo, sources[i].dir ) );
        else blob.deleteFile ( input, spl, blob.path( cwd, sources[i].repo, sources[i].dir, sources[i].file ) );
        spl.history ( input, `delete ${spl.URI(sources[i].repo, sources[i].dir)}/${((sources[i].file===undefined)?"":sources[i].file)}` );
    }
    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
