const spl = require("../../../modules/spl/spl.js");
///////////////////////////////////////////////////////////////////////////////
// Set SPlectrum and client root directory, extract command string
var root = process.cwd().split("/");
if (root.length === 1 ) root = root[0].split(`\\`);
const splRoot = root.slice(0,root.length-2).join("/");
const session = root[root.length-1];
const clientRoot = root.slice(root.length - 2).join("/")
const commandString = process.argv.slice(2);
///////////////////////////////////////////////////////////////////////////////
const context = { 
    action: "spl/execute/initialise", 
    consoleProgress: "start",
    consoleMode: "standard", // silent, warning, verbose, debug 
    runtimeMode: "silent",
    cwd: splRoot, 
    session: session, 
    modules: "../modules", 
    TTL: 170 };
const action = "spl/command/execute";
const config = {
    set: {
        commandString: commandString,
        template: { repo: clientRoot, dir: "commands", file: "command.json", copy: [ "spl/command" ] }
    }
};
///////////////////////////////////////////////////////////////////////////////
var command = { headers: {}, value: {} }
spl.setContext ( command, null, context );
spl.setRequest ( command, "action", action );
spl.setConfig ( command, "spl/command/execute", null, config );
///////////////////////////////////////////////////////////////////////////////
spl.moduleAction( command, "spl/execute/execute" );

