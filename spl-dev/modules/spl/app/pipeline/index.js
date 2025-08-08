//  name        Pipeline
//  URI         spl/app/pipeline
//  type        API Method
//  description Creates pipelines from the parsed commands
//              API internal command
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl")
const app = require("spl_app")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_app_pipeline (input)
{ 
    // current implementation executes the batch within the same execution record - no spawning
    const splApp = spl.wsRef ( input, "spl/app" );
    app.reset ( splApp );
    var TTL = 100
    splApp.pipeline = [];
    splApp.global = { help: [] };
    while ( TTL-- > 0 ) 
    {
        // get next line, if line = -1 then no next and break - it is finished
        const current = app.getNext ( splApp ); if ( current.line < 0 ) break;
        const parsed = app.parsed ( splApp, current );
        for ( var key in parsed )
        {
            // first process global arguments
            // current implementation sets the global argument for the whole batch
            var steps;
            if ( key === "" ) 
            {
                if ( !(parsed[key].test === undefined ) ) splApp.global.parseOnly = true;
                if ( parsed[key].steps > 0 ) steps = parsed[key].steps;
                if ( parsed[key].help ) splApp.global.help.push ( key );
                if ( parsed[key].debug ) splApp.global.consoleMode = "debug";
                else if ( parsed[key].verbose ) splApp.global.consoleMode = "verbose";
            }
            else
            {
                if ( parsed[key]._unknown != undefined ) delete parsed[key]._unknown;
                // help request is added to spl/app/help action
                if ( parsed[key].help ) splApp.global.help.push ( key );
                else 
                {
                    const request = { action: key };
                    var args; for ( var k in parsed[key] ) { args = parsed[key]; break; };
                    // if steps were set, add to the first request in the pipeline
                    if ( steps ) { if ( args === undefined ) args = {}; args.TTL = steps; steps = undefined; }
                    if ( args != undefined ) request[key] = args;
                    
                    // Add appRoot to request if it exists in parsed details
                    if ( parsed[key].appRoot !== undefined ) {
                        request.appRoot = parsed[key].appRoot;
                        // Initialize appDataRoot with default value: {appRoot}/data
                        request.appDataRoot = parsed[key].appRoot + "/data";
                    }
                    
                    splApp.pipeline.push ( request );
                }
            }
        }
        app.setCurrent ( splApp, current );
    }
    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
