//  name        Write File Contents
//  URI         gp/fs/write
//  type        API Method
//  description Writes content to file within app data boundary
///////////////////////////////////////////////////////////////////////////////
const spl = require("spl");
const fs = require("gp_fs");
///////////////////////////////////////////////////////////////////////////////

// IMPLEMENTATION - Universal Kafka Record Pattern
exports.default = function gp_fs_write(input) {
    try {
        // Get app context and method parameters  
        const appRoot = spl.context(input, "appRoot");
        const appRootData = spl.context(input, "appRootData");
        const fullAppDataPath = spl.getFullAppDataPath(input);
        const params = spl.action(input);
        
        // Set execution time in request context
        spl.rcSet(input.headers, "spl.request.executionTime", Date.now());
        
        spl.history(input, `fs/write: Writing to file ${params.file}`);
        
        // Validate required parameters
        if (!params.file) {
            throw new Error("Missing required parameter: file");
        }
        
        if (params.content === undefined && !params.source) {
            throw new Error("Missing required parameter: content or source");
        }
        
        let content = params.content;
        // Handle multiple content array (from command-line-args multiple: true)
        if (Array.isArray(content)) {
            content = content.join(' ');
        }
        let encoding = params.encoding || 'utf8';
        
        // Handle source workspace reference
        if (params.source) {
            const sourceRecord = spl.wsRef(input, params.source);
            if (!sourceRecord) {
                throw new Error(`Source workspace key not found: ${params.source}`);
            }
            content = sourceRecord.value || sourceRecord;
            // Use source encoding if not explicitly specified
            if (!params.encoding && sourceRecord.headers?.gp?.fs?.valueEncoding) {
                encoding = sourceRecord.headers.gp.fs.valueEncoding;
            }
        }
        
        // Handle content encoding
        const isText = fs.isTextFile(params.file);
        const actualEncoding = isText ? encoding : 'binary';
        
        // Write file content
        if (encoding === 'base64' && !isText) {
            // Handle base64 encoded binary content
            const buffer = Buffer.from(content, 'base64');
            fs.writeFileSecure(fullAppDataPath, params.file, buffer);
        } else {
            fs.writeFileSecure(fullAppDataPath, params.file, content, actualEncoding);
        }
        
        // Create standardized file record with new content
        const fileRecord = fs.createFileRecord(fullAppDataPath, params.file, content);
        
        // Update encoding information based on what we actually did
        fileRecord.headers.gp.fs.encoding = actualEncoding;
        fileRecord.headers.gp.fs.valueEncoding = encoding;
        
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
        const fileKey = spl.fURI(appRootData, params.file);
        apiRecord.value[fileKey] = fileRecord;
        
        // Save the updated API record back to workspace
        spl.wsSet(input, "gp/fs", apiRecord);
        
        spl.history(input, `fs/write: Successfully wrote ${params.file} (${fileRecord.headers.gp.fs.size} bytes, ${fileRecord.headers.gp.fs.encoding})`);
        
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
            code: error.code || 'WRITE_ERROR',
            file: fileName,
            operation: 'fs/write'
        });
        
        spl.history(input, `fs/write: ERROR - ${error.message}`);
    }
    
    spl.completed(input);
}
///////////////////////////////////////////////////////////////////////////////