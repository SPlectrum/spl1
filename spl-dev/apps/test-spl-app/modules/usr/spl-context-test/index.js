//  name        spl-context-test
//  URI         usr/spl-context-test
//  type        API Method
//  description Auto-generated wrapper for spl-context-test.js
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl")
///////////////////////////////////////////////////////////////////////////////
exports.default = function usr_spl_context_test (input)
{
    const actionArgs = spl.action(input, "args") || [];
    let scriptContent = `// Test SPL integration in JS scripts
const spl = require("spl");
console.log("Testing SPL context access from JS script");
console.log("AppRoot from script:", spl.context(input, "appRoot"));`;
    
    // Apply argument replacements
    if (scriptContent.indexOf("\$@") > -1) scriptContent = scriptContent.replaceAll("\$@", actionArgs.toString());
    if (scriptContent.indexOf("\$*") > -1) scriptContent = scriptContent.replaceAll("\$*", actionArgs.join(" "));
    for (let i = 0; i < actionArgs.length; i++) {
        scriptContent = scriptContent.replaceAll("\$" + (i+1).toString(), actionArgs[i]);
    }
    
    eval(scriptContent);
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////