//  name        Save a Package
//  URI         spl/package/save
//  type        API Method
//  description Saves a package to file.
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
const package = require("spl_package")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_package_save ( input ) {
    const cwd = spl.context ( input, "cwd" );
    const requestArgs = package.setLocation ( spl.action ( input ) );
    const repo = requestArgs.repo;
    const dir = requestArgs.dir;
    const dirPath = package.path ( cwd, repo, dir );
    const packageRef = `spl/package.${spl.fURI ( requestArgs.file )}`;
    package.addDir ( input, spl, dirPath );
    package.putFile ( input, spl, package.path ( dirPath, requestArgs.file ), JSON.stringify( spl.wsRef ( input, packageRef ), null, 2 ) );
    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
