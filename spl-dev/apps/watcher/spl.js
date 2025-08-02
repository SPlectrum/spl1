const spl = require("../../modules/spl/spl.js");
///////////////////////////////////////////////////////////////////////////////
// Set SPlectrum and client root directory, extract command string
var root = process.cwd().split("/");
if (root.length === 1 ) root = root[0].split(`\\`);
const splRoot = root.slice(0,root.length-2).join("/");
const session = root[root.length-1];
const appRoot = root.slice(root.length - 2).join("/")
const commandString = process.argv.slice(2);
///////////////////////////////////////////////////////////////////////////////
const context = {   action: "spl/execute/initialise", consoleProgress: "start",  consoleMode: "standard", // silent, standard, warning, verbose, debug
                    runtimeMode: "silent", cwd: splRoot, session: session, modules: "modules", moduleOverlay: [{ prefix: "usr", moduleRoot: `${appRoot}/modules` }], appRoot: appRoot, TTL: 100 };
const action = "spl/app/process";
const batch = commandString;
const config = { appRoot: appRoot, batch: batch };
///////////////////////////////////////////////////////////////////////////////
var command = { headers: {}, value: {} }
spl.setContext ( command, null, context );
spl.setRequest ( command, "action", action );
spl.setConfig ( command, action, null, config );
///////////////////////////////////////////////////////////////////////////////
spl.moduleAction( command, "spl/execute/execute" );
