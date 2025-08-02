//  name        Eval
//  URI         spl/app/eval
//  type        API Method
//  description Evaluates JavaScript content that was prepared by spl/app/prepare
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_app_eval (input)
{
    // Get the processed batch content from spl/app/prepare configuration
    const jsContent = spl.config(input, "spl/app/prepare", "batch");
    
    // Execute the JavaScript content
    eval(jsContent);
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////