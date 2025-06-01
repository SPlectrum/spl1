//  name        Queue an Action
//  URI         spl/data/queue
//  type        API Method
//  description Puts an Action request on the request queue
//              set in the execution header.
//              It writes it in Kafka record mode.
///////////////////////////////////////////////////////////////////////////////
const data = require("./data.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_data_queue ( input ) {
    const cwd = spl.context ( input, "cwd" );
    var session = spl.context ( input, "session" );
    if( session !== "boot" && session !== "system" ) session = `sessions/${session}`;
    const queueInput = JSON.stringify(spl.wsRef(input.value,`spl/data.${spl.URI("runtime", session, "requests/queue")}`));
    data.writeFileRecord ( data.path( cwd, "runtime", session, "requests/queue" ), queueInput );
    spl.history ( input, `queue ${spl.URI("runtime", session, "requests/queue")` );
    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
