//  name        Help
//  URI         spl/app/help
//  type        API Method
//  description The help function of the app API
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl")
const app = require("spl_app")
const help = require("command-line-usage");
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_app_help (input) 
{ 
    const appRoot = spl.action ( input, "appRoot");
    const moduleRoot = "modules";
    const helpURIs = spl.action ( input );
    helpURIs.sort();
    if ( helpURIs[0] != "" ) helpURIs.unshift ( "" );
    console.log ( helpURIs );

    var currentArgs = app.getDetails ( helpURIs[0] );
    if(!spl.wsExists ( input, currentArgs.getURI, "spl/blob/get", currentArgs.args, true )) return;
    var helpData = [];
    var parseOptions = spl.wsRef ( input, currentArgs.URI );
    helpData = helpData.concat ( parseOptions.headers.top );
    const bottom = helpData.concat ( parseOptions.headers.bottom );

    for ( var i = 0; i < helpURIs.length; i++ )
    {
        currentArgs = app.getDetails ( helpURIs[i] );
        if(!spl.wsExists ( input, currentArgs.getURI, "spl/blob/get", currentArgs.args, true )) return;
        parseOptions = spl.wsRef ( input, currentArgs.URI );
        helpData = helpData.concat ( parseOptions.headers.header );
        helpData = helpData.concat ([ { header: "Options", optionList: parseOptions.value } ]);
/*        if ( i > 0 ) 
        {
            currentArgs = app.getContentsDetails ( appRoot, moduleRoot, helpURIs[i] );
            if(!spl.wsExists ( input, currentArgs.getURI, "spl/blob/contents", currentArgs.args, true )) return;
console.dir ( currentArgs, {depth:10} )
//            parseOptions = spl.wsRef ( input, currentArgs.URI );
        }*/
    }

    helpData = helpData.concat ( bottom );
    console.log(help(helpData))

    /*
    var getDetails = app.getDetails ( appRoot, moduleRoot, "" );
    if(!spl.wsExists ( input, getDetails.getURI, "spl/blob/get", getDetails.args, true )) return;
    var parseOptions = app.activateTypes( spl.wsRef ( input, getDetails.URI ).value );
    

    const helpRequests = spl.action( input );
    const splCommand = spl.wsRef ( input, "spl/command" );
    const parserOptionsURI = spl.fURI("spl/command", splCommand.headers.spl.command.parser.file);
    const parserOptions = spl.wsRef ( input, parserOptionsURI ).value;
    var helpData = [];
    helpData = helpData.concat ( parserOptions.top );
    for ( var i=0; i < helpRequests.length; i++ ) {
        var section = command.getHelpSection ( parserOptions, helpRequests[i] );
        helpData = helpData.concat ( section.header );
        if ( section.options ) helpData.push ( section.options );
        if ( section.subList ) helpData.push ( section.subList );
    }
    helpData = helpData.concat ( parserOptions.bottom );
    console.log(help(helpData))
*/
    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
