//  name        Prepare
//  URI         spl/app/prepare
//  type        API Method
//  description This action prepares the command line entry for parsing.
//              API internal command
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
const app = require("./app.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_app_prepare (input) { 

    // prepare the batch input for parsing
    // split into lines and where needed line parts
    var batchInput = structuredClone(spl.action ( input, "batch" ));
    const batchPrepared = {};
    if ( Array.isArray ( batchInput ) ) batchInput = batchInput.join(" ");
    batchInput = batchInput.replaceAll ( "\r", "" );
    batchInput = batchInput.split("\n");
    for ( var i = 0; i < batchInput.length; i++ ) 
    {
        var batchLine = {};
        if ( batchInput[i].indexOf ( "@@" ) > -1 ) 
        {
            batchInput[i] = batchInput[i].split ( "@@" );
            for( var j = 0; j < batchInput[i].length; j++) batchLine[`part_${j}`] = app.splitAndTrim ( batchInput[i][j] );
        }
        else batchLine = app.splitAndTrim ( batchInput[i] );
        batchPrepared[`line_${i}`] = batchLine;
    }

    // create the workspace spl/app entry
    const previous = spl.wsRef ( input, "spl/app" );
    const prepared = { 
        headers: { spl: { app: { currentLine: -1, currentPart: -1 } } }, 
        value: { batch: spl.action ( input, "batch" ), input: batchPrepared, parsed: {}, options: {} } };
    if ( previous != undefined ) prepared.value.options = previous.value.options;
    spl.wsSet ( input, "spl/app", prepared );
    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////
