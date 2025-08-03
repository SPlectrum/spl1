//  name        Parse
//  URI         spl/app/parse
//  type        API Method
//  description This action runs a JS script
//              API internal command
///////////////////////////////////////////////////////////////////////////////
const spl = require("../../spl.js")
const app = require("../app.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_app_parse (input) { 

    // test retrieving lookups
    const appRoot = spl.action ( input, "appRoot");
    const moduleRoot = spl.context ( input, "modules" );
    const splApp = spl.wsRef ( input, "spl/app" );
    
    // AppRoot management - store in splApp for persistence across parse calls
    if (splApp.headers.spl.app.lineDefaultAppRoot === undefined) {
        splApp.headers.spl.app.lineDefaultAppRoot = undefined;
    }
    let lineDefaultAppRoot = splApp.headers.spl.app.lineDefaultAppRoot;
    let currentAppRoot = undefined;      // Command-level, reset after each command
    let currentLine = splApp.headers.spl.app.currentLine || -1;
    
    
    // load folder contents
    var TTL = 100;
    while ( TTL-- > 0 ) {

        // get next line, if line = -1 then no next and break - it is finished
        const current = app.getNext ( splApp ); if ( current.line < 0 ) break;
        
        // Command-level appRoot management
        if (current.line !== currentLine) {
            // Moving to new line
            currentLine = current.line;
        }
        
        // Set currentAppRoot to line default at start of each command
        currentAppRoot = lineDefaultAppRoot;
        
        var result = { _unknown: app.commandString ( splApp, current ) };
        var parsed = {};

        // next parse command / argument pairs until finished
        var getDetails = app.getDetails ( "" );
        if(!spl.wsExists ( input, getDetails.getURI, "spl/blob/get", getDetails.args, true )) return;
        var parseOptions = app.activateTypes( spl.wsRef ( input, getDetails.URI ).value );
        // first parse global arguments
        result = app.parse ( result._unknown, parseOptions );
        parsed [ "" ] = result;

        // update parsed (if not already done)
        var counter = 3, commandAction = "";
        var isFirstCommandPart = true;
        while ( counter-- > 0 && result._unknown ) 
        {
            result = app.parse(result._unknown);
            if (result.command !== undefined) {
                commandAction += (commandAction === "") ? result.command : "/" + result.command;
            }
            var getDetails = app.getDetails ( commandAction );
            
            // Detect app overlay and extract appRoot
            if (getDetails.args[0].repo && getDetails.args[0].repo.includes("apps/")) {
                const appPath = getDetails.args[0].repo; // e.g., "apps/test-spl-app/modules"
                const extractedAppRoot = appPath.replace("/modules", ""); // e.g., "apps/test-spl-app"
                currentAppRoot = extractedAppRoot;
                
                // Set line default (batch default) on first app encounter
                if (lineDefaultAppRoot === undefined) {
                    lineDefaultAppRoot = extractedAppRoot;
                    splApp.headers.spl.app.lineDefaultAppRoot = lineDefaultAppRoot;  // Persist in splApp
                }
            }
            
            if ( result._unknown === undefined ) result._unknown = [];
            if(!spl.wsExists ( input, getDetails.getURI, "spl/blob/get", getDetails.args, true )) return;
            parseOptions = app.activateTypes( spl.wsRef ( input, getDetails.URI ).value );
            result = app.parse ( result._unknown, parseOptions );
            
            // Add appRoot to parsed result if currentAppRoot is not undefined
            // (this applies to both app commands and module commands that inherit batch default)
            if (currentAppRoot !== undefined) {
                result.appRoot = currentAppRoot;
            }
            
            
            parsed [ commandAction ] = result;
            isFirstCommandPart = false;
            if ( !( result._unknown && counter > 0 ) ) break;   
        }

        // update parsing state
        app.setParsed ( splApp, current, parsed );
        app.setCurrent ( splApp, current );
        
        // Reset appRoot to undefined after command completion
        currentAppRoot = undefined;
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
