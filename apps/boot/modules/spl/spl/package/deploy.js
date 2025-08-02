//  name        Deploy a Package
//  URI         spl/package/deploy
//  type        API Method
//  description Deploys a package to an existing install.
//              It is used to deliver data and module packages.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl")
const package = require("./package.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_package_deploy ( input ) {
    const cwd = spl.context ( input, "cwd" );
    const requestArgs = package.setLocation ( spl.action ( input ) );
    const repo = requestArgs.repo;
    const dir = requestArgs.dir;
    const packageRef = `spl/package.${spl.fURI ( requestArgs.file )}`;
    const packageContents = spl.wsRef ( input, packageRef ).value;
    for ( key in packageContents ) {
        var dirName = key.substring ( 0, key.lastIndexOf( "/" ) );
        var fileName = key.substring ( key.lastIndexOf ( "/" ) + 1 );
        package.addDir ( input, spl, package.path ( cwd, repo, dir, dirName ) );
        if ( fileName.length > 0 ) package.putFile ( input, spl, package.path ( cwd, repo, dir, key ), packageContents[key] );
    }
    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
