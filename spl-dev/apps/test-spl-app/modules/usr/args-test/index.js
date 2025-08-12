//  name        args-test
//  URI         usr/args-test
//  type        API Method
//  description Auto-generated wrapper for args-test.js
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib")
///////////////////////////////////////////////////////////////////////////////
exports.default = function usr_args_test (input)
{
    const actionArgs = spl.action(input, "args") || [];
    let scriptContent = `console.log("Arguments test:");
console.log("Arg 1: \$1");
console.log("Arg 2: \$2");  
console.log("All args array: \$@");
console.log("All args string: \$*");`;
    
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