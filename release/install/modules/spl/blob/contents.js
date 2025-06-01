//  name        Gets the contents of a folder
//  URI         spl/blob/contents
//  type        API Method
//  description Gets the contents of a folder.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
const blob = require("./blob.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_blob_contents ( input ) {
    const cwd = spl.context ( input, "cwd" );
    var sources = spl.action ( input );
    if ( !Array.isArray(sources) ) sources = [ sources ];
    for ( var i=0; i<sources.length; i++ ) {
        sources[i] = blob.setLocation(sources[i]);
        const contents = blob.dirContents( blob.path( cwd, sources[i].repo, sources[i].dir ) );
        spl.wsSet ( input, `spl/blob.${spl.URI ( sources[i].repo, sources[i].dir.replace("../","") )}`, contents );
        if( sources[i].reference ) 
            for(var j=0; j<sources[i].reference.length; j++) 
                spl.wsSet( input, sources[i].reference[j], `spl/blob.${spl.URI ( sources[i].repo, sources[i].dir.replace("../","") )}` );
        spl.history ( input, `contents ${spl.fURI ( sources[i].repo, sources[i].dir )}`);
    }
    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
