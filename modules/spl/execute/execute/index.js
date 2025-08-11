//  name        Execute a pipeline segment
//  URI         spl/execute/execute
//  type        API Method
//  description Manages the execution flow of a pipeline segment.
//              It starts with an initialise action and finishes with a complete action.
//              Output of bot actions is logged. 
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_execute_execute ( input ) {

    function executeRequest(input) {
        var session = spl.context ( input, "session" );
        if ( session !== "boot" && session !== "system" ) session = `sessions/${session}`;
        var execAction = ( spl.context( input, "action" ) === undefined ) ? "spl/execute/initialise" : spl.context ( input, "action" ) ;

        spl.history ( input, "" );
        //spl.moduleAction ( input, execAction );
        try { spl.moduleAction ( input, execAction ); }
        catch (e) { spl.throwError ( input, e.toString() ); }

        // Update TTL -- NEEDS A SEPARATE ERROR SECTION IN THE WORKSPACE
        spl.setContext ( input, "TTL", spl.context ( input, "TTL") - 1 );
        if ( spl.context ( input, "TTL") < 1 && !( "spl/error/catch spl/execute/complete" ).includes ( execAction ) ) spl.throwError ( input, "TTL has expired, execution aborted." );

        if ( execAction === "spl/execute/initialise" || execAction === "spl/execute/complete" ) {

            var dir = execAction.substring(execAction.lastIndexOf("/")+1);
            if ( spl.context ( input, "runtimeMode") != "silent" ) {
                if ( dir === "initialise" ) {

                    const filePath = spl.URI ( "runtime", session, "requests/initialise" );
                    const writeRecord = {
                        headers: { 
                            spl: { 
                                data: { write: [ { repo: spl.URI ( "runtime", session ), dir: "requests/initialise" } ], history: [] },
                                execute: structuredClone ( spl.context ( input ) ),
                                request: { action: "spl/data/write"}
                            } 
                        },
                        value: { "spl/data": { headers: {}, value: { [ filePath ]: structuredClone ( input ) } } }
                    }
                    spl.setContext ( writeRecord, "action", "spl/execute/next" );
                    spl.moduleAction( writeRecord, "spl/data/write" );
                    spl.setContext ( input, "fileName", spl.rcRef ( spl.wsRef ( writeRecord, `spl/data.${filePath}` ), "headers.spl.data.file" ) );
                }
                else {
                    const putFile = {};
                    putFile[ spl.fURI ( "runtime", session, "requests/complete", spl.context ( input, "fileName" ) ) ] = JSON.stringify ( input, null, 2 );
                    const putRecord = {
                        headers: { 
                            spl: { 
                                blob: { put: [ { repo: spl.URI ( "runtime", session ), dir: "requests/complete", file: spl.context ( input, "fileName" ) } ] },
                                execute: structuredClone ( spl.context ( input ) ),
                                request: { action: "spl/blob/put"}
                            } 
                        },
                        value: { "spl/blob": { headers: {}, value: putFile } }
                    }
                    spl.setContext ( putRecord, "consoleProgress", undefined );
                    spl.setContext ( putRecord, "action", "spl/execute/next" );
                    spl.moduleAction( putRecord, "spl/blob/put" );
                }
            }
        }

        if ( execAction != "spl/execute/complete" ) setImmediate( () => executeRequest ( input ) );
    }

    setImmediate( () => executeRequest ( input ) );
}
///////////////////////////////////////////////////////////////////////////////
