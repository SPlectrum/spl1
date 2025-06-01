//  name        Process File
//  URI         spl/app/process-file
//  type        API Method
//  description Reads commands from a specified file and stores them for processing.
//              This method only reads the file, it does not process the commands.
///////////////////////////////////////////////////////////////////////////////
const spl = require("../spl.js")
///////////////////////////////////////////////////////////////////////////////
exports.default = function spl_app_process_file (input)
{ 
    // Get the file path from action configuration
    const filePath = spl.action ( input, "file" );
    const fileRepo = spl.action ( input, "repo" ) || spl.action ( input, "appRoot" );
    const fileDir = spl.action ( input, "dir" ) || "batches";
    
    // Check if we need to read the file first
    const fileUri = spl.URI ( fileRepo, fileDir, filePath );
    if ( !spl.wsExists ( input, `spl/blob.${spl.fURI(fileUri)}`, "spl/blob/get", {
        repo: fileRepo,
        dir: fileDir,
        file: filePath,
        encoding: "text"
    }, true ) ) return;
    
    // Get the file contents from workspace and store it as batch for processing
    const fileContents = spl.wsGet ( input, `spl/blob.${spl.fURI(fileUri)}` ).value;
    // Use spl.setConfig to pass the batch to spl/app/process
    spl.setConfig ( input, "spl/app/prepare", "batch", fileContents );
    spl.completed ( input );
}
///////////////////////////////////////////////////////////////////////////////