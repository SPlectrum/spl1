//  name        Read File Contents
//  URI         gp/fs/read
//  type        API Method
//  description Reads file contents within app data boundary
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl_lib");
const fs = require("gp_fs_lib");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Universal Kafka Record Pattern
exports.default = function gp_fs_read(input) {
    // Get app context and method parameters  
    const appRoot = spl.context(input, "appRoot");
    const appDataRoot = spl.context(input, "appDataRoot");
    const fullAppDataPath = spl.getFullAppDataPath(input);
    const params = spl.action(input);
    
    // Determine encoding
    const requestedEncoding = params.encoding || 'utf8';
    const isText = fs.isTextFile(params.file);
    const actualEncoding = isText ? requestedEncoding : 'binary';
    
    // Read file content
    let content;
    if (isText) {
        content = fs.readFileSecure(fullAppDataPath, params.file, actualEncoding);
    } else {
        // Binary files - read as buffer and encode as base64 for JSON safety
        const buffer = fs.readFileSecure(fullAppDataPath, params.file, null);
        content = buffer.toString('base64');
    }
    
    // Create standardized file record
    const fileRecord = fs.createFileRecord(fullAppDataPath, params.file, content);
    
    // Update encoding information based on what we actually did
    fileRecord.headers.gp.fs.encoding = actualEncoding;
    fileRecord.headers.gp.fs.valueEncoding = isText ? actualEncoding : 'base64';
    
    // STEP 1: Get the API record (gp/fs)
    let apiRecord = spl.wsRef(input, "gp/fs");
    if (!apiRecord) {
        // Create new API record with proper structure
        apiRecord = {
            headers: { gp: { fs: { api: "gp/fs", timestamp: new Date().toISOString() } } },
            value: {}
        };
    }
    
    // STEP 2: Work within the API record - add/update file
    const fileKey = spl.fURI(appDataRoot, params.file);
    apiRecord.value[fileKey] = fileRecord;
    
    // Save the updated API record back to workspace
    spl.wsSet(input, "gp/fs", apiRecord);
    
    spl.history(input, `fs/read: successfully read ${params.file} (${fileRecord.headers.gp.fs.size} bytes, ${fileRecord.headers.gp.fs.encoding})`);
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////