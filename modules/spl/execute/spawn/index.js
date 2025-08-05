//  name        spawn
//  URI         spl/execute/spawn
//  type        API Method
//  description Spawns a child request with a new pipeline.
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl")
///////////////////////////////////////////////////////////////////////////////
exports.default = async function spl_execute_spawn ( input )
{
    const childUUID = spl.generateUUID();
    const graph = spl.context ( input, "graph" );
    graph.children.push ( childUUID );
    spawnInput = { headers: { spl: { execute: {}, request: { action: "spl/execute/spawn" } } }, value: {} }
    const execute = {
        action: "spl/execute/initialise", 
        history: [], 
        consoleProgress: "start",
        consoleMode: "standard", // silent, warning, verbose, debug 
        runtimeMode: spl.context ( input, "runtimeMode" ),
        cwd: spl.context ( input, "cwd" ), 
        session: spl.context ( input, "session" ),  
        modules: "modules",
        pipeline:  structuredClone ( spl.context ( spl.wsRef ( input, "spl/execute.set-pipeline" ), "pipeline" ) ),
        graph: { UUID: childUUID, ancestors: structuredClone( graph.ancestors ), children: [] }
    }; 
    execute.graph.ancestors.unshift ( graph.UUID );
    spl.setContext ( spawnInput, null, execute );
    setImmediate ( () => spl.moduleAction ( spawnInput, "spl/execute/execute" ) );
    spl.setContext ( input, "action", "spl/execute/set-next" );
}
///////////////////////////////////////////////////////////////////////////////
