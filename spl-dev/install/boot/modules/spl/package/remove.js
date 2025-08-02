//  name        Remove a Package
//  URI         spl/package/remove
//  type        API Method
//  description Removes a package from an install.
//              A package in this context is assumend to be a hive,
//              a top dir where everything underneath belongs to the package.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl")
const package = require("./package")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_package_remove ( input ) {
    const cwd = spl.context ( input, "cwd" );
    const requestArgs = package.setLocation ( spl.action ( input ) );
    const repo = requestArgs.repo;
    const dir = requestArgs.dir;
    const basePath = package.path ( cwd, repo, dir );
    const packageRef = `spl/package.${spl.fURI ( requestArgs.file )}`;
    const dirs = spl.wsRef ( input, packageRef ).value;
    for ( key in dirs ) package.removeDir( input, spl, package.path ( basePath, key ) );
    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
