//  name        Read File Contents
//  URI         gp/fs/read
//  type        API Method
//  description Reads file contents within app data boundary
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const fs = require("gp_fs");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Universal Kafka Record Pattern
exports.default = function gp_fs_read(input) {
    try {
        // Get app context and method parameters  
        const cwd = spl.context(input, "cwd");
        const appRoot = spl.context(input, "appRoot") || "apps/gp";
        const fullAppPath = `${cwd}/${appRoot}`;
        const params = spl.action(input);
        
        // Set execution time in request context
        spl.rcSet(input.headers, "spl.request.executionTime", Date.now());
        
        spl.history(input, `fs/read: Reading file ${params.file}`);
        
        // Determine encoding
        const requestedEncoding = params.encoding || 'utf8';
        const isText = fs.isTextFile(params.file);
        const actualEncoding = isText ? requestedEncoding : 'binary';
        
        // Read file content
        let content;
        if (isText) {
            content = fs.readFileSecure(fullAppPath + "/data", params.file, actualEncoding);
        } else {
            // Binary files - read as buffer and encode as base64 for JSON safety
            const buffer = fs.readFileSecure(fullAppPath + "/data", params.file, null);
            content = buffer.toString('base64');
        }
        
        // Create standardized file record
        const fileRecord = fs.createFileRecord(fullAppPath + "/data", params.file, content);
        
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
        const fileKey = spl.fURI("data", params.file);
        apiRecord.value[fileKey] = fileRecord;
        
        // Save the updated API record back to workspace
        spl.wsSet(input, "gp/fs", apiRecord);
        
        spl.history(input, `fs/read: Successfully read ${params.file} (${fileRecord.headers.gp.fs.size} bytes, ${fileRecord.headers.gp.fs.encoding})`);
        
    } catch (error) {
        // Handle errors - store in execution context
        let fileName = 'unknown';
        try {
            const params = spl.action(input);
            fileName = params?.file || 'unknown';
        } catch (e) {
            // If we can't get params, just use 'unknown'
        }
        
        spl.rcSet(input.headers, "spl.execute.error", {
            message: error.message,
            code: error.code || 'READ_ERROR',
            file: fileName,
            operation: 'fs/read'
        });
        
        spl.history(input, `fs/read: ERROR - ${error.message}`);
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////