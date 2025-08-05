//  name        FS API Auxiliary Functions
//  URI         gp/fs/fs
//  type        Auxiliary Library
//  description Contains common filesystem functions used by the fs API
//              All operations are constrained within app data boundaries.
///////////////////////////////////////////////////////////////////////////////
const path = require('path');
const fs = require('fs');
///////////////////////////////////////////////////////////////////////////////

// Validate that a file path is within the app boundary
exports.validatePath = function(appRoot, filePath) {
    const resolvedPath = path.resolve(appRoot, filePath);
    const resolvedAppRoot = path.resolve(appRoot);
    
    if (!resolvedPath.startsWith(resolvedAppRoot)) {
        throw new Error(`Path ${filePath} is outside app boundary ${appRoot}`);
    }
    
    return resolvedPath;
}

// Read file contents securely within app boundary
exports.readFileSecure = function(appRoot, filePath, encoding = 'utf8') {
    const safePath = this.validatePath(appRoot, filePath);
    return fs.readFileSync(safePath, encoding);
}

// Write file contents securely within app boundary
exports.writeFileSecure = function(appRoot, filePath, content, encoding = 'utf8') {
    const safePath = this.validatePath(appRoot, filePath);
    
    // Ensure directory exists
    const path = require('path');
    const dir = path.dirname(safePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    if (Buffer.isBuffer(content)) {
        // Handle buffer content (for binary files)
        return fs.writeFileSync(safePath, content);
    } else {
        return fs.writeFileSync(safePath, content, encoding);
    }
}

// Copy file securely within app boundary
exports.copyFileSecure = function(appRoot, fromPath, toPath) {
    const safeFromPath = this.validatePath(appRoot, fromPath);
    const safeToPath = this.validatePath(appRoot, toPath);
    return fs.copyFileSync(safeFromPath, safeToPath);
}

// Move/rename file securely within app boundary
exports.moveFileSecure = function(appRoot, fromPath, toPath) {
    const safeFromPath = this.validatePath(appRoot, fromPath);
    const safeToPath = this.validatePath(appRoot, toPath);
    return fs.renameSync(safeFromPath, safeToPath);
}

// Delete file securely within app boundary
exports.deleteFileSecure = function(appRoot, filePath) {
    const safePath = this.validatePath(appRoot, filePath);
    return fs.unlinkSync(safePath);
}

// Check if file/directory exists within app boundary
exports.existsSecure = function(appRoot, filePath) {
    try {
        const safePath = this.validatePath(appRoot, filePath);
        return fs.existsSync(safePath);
    } catch (error) {
        return false; // Path outside boundary = doesn't exist for us
    }
}

// Get file/directory info securely within app boundary
exports.infoSecure = function(appRoot, filePath) {
    const safePath = this.validatePath(appRoot, filePath);
    const stats = fs.statSync(safePath);
    
    return {
        isFile: stats.isFile(),
        isDirectory: stats.isDirectory(),
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime,
        accessed: stats.atime
    };
}

// Create directory securely within app boundary
exports.mkdirSecure = function(appRoot, dirPath, options = { recursive: true }) {
    const safePath = this.validatePath(appRoot, dirPath);
    return fs.mkdirSync(safePath, options);
}

// Remove directory securely within app boundary
exports.rmdirSecure = function(appRoot, dirPath, options = { recursive: false }) {
    const safePath = this.validatePath(appRoot, dirPath);
    return fs.rmSync(safePath, { recursive: options.recursive, force: options.force || false });
}

// List directory contents securely within app boundary
exports.listSecure = function(appRoot, dirPath, options = {}) {
    const safePath = this.validatePath(appRoot, dirPath);
    const entries = fs.readdirSync(safePath, { withFileTypes: true });
    
    return entries.map(entry => ({
        name: entry.name,
        isFile: entry.isFile(),
        isDirectory: entry.isDirectory(),
        path: path.join(dirPath, entry.name)
    }));
}

// Create standardized file record structure following gp/fs API schema
exports.createFileRecord = function(appRoot, filePath, content = null) {
    const safePath = this.validatePath(appRoot, filePath);
    const stats = fs.statSync(safePath);
    const fileMode = stats.mode;
    
    // Determine encoding based on content or file type
    const isText = this.isTextFile(filePath);
    const encoding = isText ? 'utf8' : 'binary';
    const valueEncoding = isText ? 'utf8' : (content ? 'base64' : 'utf8');
    
    // Build the standardized record
    const record = {
        headers: {
            gp: {
                fs: {
                    path: filePath,
                    type: stats.isDirectory() ? 'directory' : 'file',
                    encoding: encoding,
                    valueEncoding: valueEncoding,
                    size: stats.size,
                    created: stats.birthtime.toISOString(),
                    modified: stats.mtime.toISOString(),
                    accessed: stats.atime.toISOString(),
                    permissions: {
                        readable: !!(fileMode & parseInt('400', 8)),
                        writable: !!(fileMode & parseInt('200', 8)),
                        executable: !!(fileMode & parseInt('100', 8)),
                        mode: '0' + (fileMode & parseInt('777', 8)).toString(8)
                    }
                }
            }
        },
        value: content
    };
    
    return record;
}

// Helper function to determine if file is likely text-based
exports.isTextFile = function(filePath) {
    const textExtensions = ['.txt', '.md', '.js', '.json', '.html', '.css', '.xml', '.csv', '.log', '.yml', '.yaml'];
    const binaryExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.zip', '.exe', '.bin'];
    
    const ext = path.extname(filePath).toLowerCase();
    
    if (textExtensions.includes(ext)) return true;
    if (binaryExtensions.includes(ext)) return false;
    
    // Default to text for unknown extensions (safer for most development files)
    return true;
}