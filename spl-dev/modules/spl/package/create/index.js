//  name        Create a Package
//  URI         spl/package/create
//  type        API Method
//  description Creates a new package from an existing data or module install
//              It creates a package of parts of an existing install.
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
const package = require("./package")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_package_create ( input ) {
    const cwd = spl.context ( input, "cwd" );
    const requestArgs = package.setLocation ( spl.action ( input ) );
    const repo = requestArgs.repo;
    const packageRef = `spl/package.${spl.fURI ( requestArgs.file )}`;
    spl.wsSet ( input, packageRef, { headers: { spl: { package: { name: requestArgs.file } } }, value: {} } );
    const packageContents = spl.wsRef ( input, packageRef ).value;
    function iterateDir ( dirPath ) {
        var contents = package.dirContents ( package.path ( cwd, repo, dirPath ) );
        if ( contents.length === 0 ) packageContents[`${dirPath}/`] = {};
        else {
            for ( var i = 0; i < contents.length; i++ ) {
                var currentPath = `${dirPath}/${contents[i]}`;
                if ( package.isFile ( package.path ( cwd, repo, currentPath ) ) ) packageContents[currentPath] = package.getFile( input, spl, package.path ( cwd, repo, currentPath ) );
                else iterateDir ( currentPath );
            }   
        }
    }
    iterateDir( requestArgs.dir ? `/${requestArgs.dir}` : "" );
    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
