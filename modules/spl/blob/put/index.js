//  name        Put File 
//  URI         spl/blob/put
//  type        API Method
//  description Saves one or more blob files to the filesystem.
//              This method executes asynchronously.
//              Currenlty only implemented for utf8.
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
const blob = require("spl_blob")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_blob_put ( input ) {
    const cwd = spl.context ( input, "cwd" );
    var sources = spl.action ( input );
    if ( !Array.isArray(sources) ) sources = [ sources ];

    for ( var i=0; i<sources.length; i++ ) {
        sources[i] = blob.setLocation(sources[i]);
        if( sources[i].file === undefined ) blob.addDir ( input, spl, blob.path( cwd, sources[i].repo, sources[i].dir ) );
        else {
            if ( sources[i].contents ) 
                spl.wsSet( input, `spl/blob.${sources[i].repo}/${sources[i].dir}/${sources[i].file.replaceAll ( ".", "_" )}`, { headers: {}, value: sources[i].contents } );
            var contents = spl.wsGet( input, `spl/blob.${sources[i].repo}/${sources[i].dir}/${sources[i].file.replaceAll ( ".", "_" )}` ).value;
            if ( Array.isArray ( contents ) ) contents = contents.join ( " " );
            blob.putFile ( input, spl, blob.path( cwd, sources[i].repo, sources[i].dir, sources[i].file ), contents );
            spl.history ( input, `async - put file ${sources[i].repo}/${sources[i].dir}/${sources[i].file}` );
        }
    }
    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
