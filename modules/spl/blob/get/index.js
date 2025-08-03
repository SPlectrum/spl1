//  name        Gets the contents of a file
//  URI         spl/blob/get
//  type        API Method
//  description Gets the contenst of one or more files.
//              Currently only implemented for urf8
///////////////////////////////////////////////////////////////////////////////
const spl = require("../../spl.js")
const blob = require("../blob.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_blob_get ( input ) {
    const cwd = spl.context ( input, "cwd" );
    var sources = spl.action ( input );
    if ( !Array.isArray(sources) ) sources = [ sources ];
    for ( var i=0; i<sources.length; i++ ) {
        sources[i] = blob.setLocation(sources[i]);
        const output = blob.getFile( blob.path( cwd, sources[i].repo, sources[i].dir, sources[i].file ) );
        
        // Determine encoding - default to 'json' for backward compatibility
        const encoding = sources[i].encoding || 'json';
        
        let parsedOutput;
        if ( encoding === 'text' ) {
            // Store as plain text
            parsedOutput = { headers: {}, value: output };
        } else {
            // Default behavior - parse as JSON
            parsedOutput = JSON.parse ( output );
        }
        
        spl.wsSet ( input, `spl/blob.${spl.fURI ( sources[i].repo, sources[i].dir, sources[i].file ).replace("../","")}`, parsedOutput );
        if( sources[i].copy )
            for(var j=0; j<sources[i].copy.length; j++)
                spl.wsSet( input, sources[i].copy[j], structuredClone(output) );
        if( sources[i].reference )
            for(var j=0; j<sources[i].reference.length; j++)
                spl.wsSet( input, sources[i].reference[j], `spl/blob.${spl.fURI ( sources[i].repo, sources[i].dir, sources[i].file ).replace("../","")}` );
        spl.history ( input, `get ${spl.fURI ( sources[i].repo, sources[i].dir, sources[i].file )}`);
    }
    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
