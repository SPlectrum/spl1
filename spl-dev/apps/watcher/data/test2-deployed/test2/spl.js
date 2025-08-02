const spl = require("../../../modules/spl/spl.js");
///////////////////////////////////////////////////////////////////////////////
// Set SPlectrum and client root directory, extract command string
var root = process.cwd().split("/");
if (root.length === 1 ) root = root[0].split(`\\`);
const splRoot = root.slice(0,root.length-2).join("/");
const session = root[root.length-1];
const appRoot = root.slice(root.length - 2).join("/")
const commandString = process.argv.slice(2);
///////////////////////////////////////////////////////////////////////////////
const context = {   action: "spl/execute/initialise", consoleProgress: "start",  consoleMode: "debug", // silent, standard, warning, verbose, debug 
                    runtimeMode: "silent", cwd: splRoot, session: session, modules: "../modules", moduleOverlay: [{ prefix: "usr", moduleRoot: `${appRoot}/modules` }], TTL: 100 };
const action = "spl/app/process";
const batch = commandString;
/*`spl/console/log hello world _!_ spl/console/error hello world 2
 -h    usr/noop 
 -s 10  spl/app/exec -f simple-batch
spl/app -h run -f testscript.js
spl -h app/reset`;*/
const config = { appRoot: appRoot, batch: batch };
///////////////////////////////////////////////////////////////////////////////
var command = { headers: {}, value: {} }
spl.setContext ( command, null, context );
spl.setRequest ( command, "action", action );
spl.setConfig ( command, action, null, config );
///////////////////////////////////////////////////////////////////////////////
spl.moduleAction( command, "spl/execute/execute" );
