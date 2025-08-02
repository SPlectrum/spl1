//  name        Load a Package
//  URI         spl/package/load
//  type        API Method
//  description Loads a package from file.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
const package = require("./package")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_package_load ( input ) {
    const cwd = spl.context ( input, "cwd" );
    const source = package.setLocation ( spl.action ( input ) );
    const output = package.getFile ( input, spl, package.path ( cwd, source.repo, source.dir, source.file ) );
    spl.wsSet ( input, `spl/package.${spl.fURI ( source.file )}`, JSON.parse( output ) );
    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
