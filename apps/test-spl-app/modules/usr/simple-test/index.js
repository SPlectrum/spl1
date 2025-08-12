//  name        simple-test
//  URI         usr/simple-test
//  type        API Method
//  description Auto-generated wrapper for simple-test.js
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
///////////////////////////////////////////////////////////////////////////////
exports.default = function usr_simple_test (input)
{
    const actionArgs = spl.action(input, "args") || [];
    let scriptContent = `console.log("Simple JS test script executed successfully");`;
    
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