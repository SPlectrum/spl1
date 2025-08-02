//  name        Reads one or more Data Records
//  URI         spl/data/read
//  type        API Method
//  description Reads one or more data records, by default the latest.
//              This means the latest for a specific (primary) key.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
const data = require("./data.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_data_read ( input ) {
    const cwd = spl.context ( input, "cwd" );
    var sources = spl.action ( input );
    if ( !Array.isArray(sources) ) sources = [ sources ];
    for ( var i=0; i<sources.length; i++ ) {
        sources[i] = data.setLocation ( sources[i] );
        var readPath = `${sources[i].repo}/${sources[i].dir}`;
        const output = data.readFileRecord ( data.path ( cwd, readPath ), sources[i].file );
        spl.rcSet ( output.contents, "headers.spl.data", { repo: sources[i].repo, dir: sources[i].dir, file: output.file } );
        spl.history ( input, `read ${readPath}/${output.file}` );
        if( !( sources[i].file === undefined ) ) readPath += `/${sources[i].file.replaceAll( ".", "_" ) }`;
        spl.wsSet ( input, `spl/data.${readPath}`, output.contents );
        if( sources[i].copy ) 
            for( var j=0; j < sources[i].copy.length; j++ ) 
                spl.wsSet ( input, sources[i].copy[j], structuredClone( output.contents ) );
        if( sources[i].reference ) 
            for( var j=0; j < sources[i].reference.length; j++ ) 
                spl.wsSet ( input, sources[i].reference[j], output.contents );
    }
    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
