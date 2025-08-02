//  name        Parse
//  URI         spl/app/parse
//  type        API Method
//  description This action runs a JS script
//              API internal command
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
const app = require("./app.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_app_parse (input) { 

    // test retrieving lookups
    const appRoot = spl.action ( input, "appRoot");
    const moduleRoot = spl.context ( input, "modules" );
    const splApp = spl.wsRef ( input, "spl/app" );
    // load folder contents
    var TTL = 100;
    while ( TTL-- > 0 ) {

        // get next line, if line = -1 then no next and break - it is finished
        const current = app.getNext ( splApp ); if ( current.line < 0 ) break;
        var result = { _unknown: app.commandString ( splApp, current ) };
        var parsed = {};

        // next parse command / argument pairs until finished
        var getDetails = app.getDetails ( appRoot, moduleRoot, "" );
        if(!spl.wsExists ( input, getDetails.getURI, "spl/blob/get", getDetails.args, true )) return;
        var parseOptions = app.activateTypes( spl.wsRef ( input, getDetails.URI ).value );
        // first parse global arguments
        result = app.parse ( result._unknown, parseOptions );
        parsed [ "" ] = result;

        // update parsed (if not already done)
        var counter = 3, commandAction = "";
        while ( counter-- > 0 && result._unknown ) 
        {
            result = app.parse(result._unknown);
            if (result.command !== undefined) {
                commandAction += (commandAction === "") ? result.command : "/" + result.command;
            }
            var getDetails = app.getDetails ( appRoot, moduleRoot, commandAction );
            if ( result._unknown === undefined ) result._unknown = [];
            if(!spl.wsExists ( input, getDetails.getURI, "spl/blob/get", getDetails.args, true )) return;
            parseOptions = app.activateTypes( spl.wsRef ( input, getDetails.URI ).value );
            result = app.parse ( result._unknown, parseOptions );
            parsed [ commandAction ] = result;
            if ( !( result._unknown && counter > 0 ) ) break;   
        }

        // update parsing state
        app.setParsed ( splApp, current, parsed );
        app.setCurrent ( splApp, current );
    }

    if( TTL < 1 ) return spl.throwError ( input, "Parser ran out of steps when parsing.")
    spl.completed ( input );
/*  required when validating batch prior to execution, not in this implementation
    // get folder contents of actions, batches and scripts folders
    const appRoot = spl.action ( input, "appRoot" );
    const actions = { repo: appRoot, dir: "actions", reference: [ "spl/app.actions" ] };
    const batches = { repo: appRoot, dir: "batches", reference: [ "spl/app.batches" ] };
    const scripts = { repo: appRoot, dir: "scripts", reference: [ "spl/app.scripts" ] };
    const args = [ actions, batches, scripts ];
    spl.gotoExecute ( input, "spl/blob/contents", args );
*/
}
///////////////////////////////////////////////////////////////////////////////
