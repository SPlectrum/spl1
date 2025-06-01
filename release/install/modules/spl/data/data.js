//  name        Data Auxiliary Functions
//  URI         spl/data/data
//  type        Auxiliary Library
//  description Contains common data functions used by the data API
//              There is a mixture of synchronous and asynchronous methods.
//              The initial implementation of the data layer is filesystem only.
///////////////////////////////////////////////////////////////////////////////
const path = require('path');
const fs = require('fs');
///////////////////////////////////////////////////////////////////////////////

// create a properly formatted file path
exports.path = function ( ...args ){
    return path.join(...args);
}

// reads a file record from the filesystem, if no name is supplied then the most recent record is read
exports.readFileRecord = function (filePath, file) {
    if (file === undefined) {
        file = fs.readdirSync(filePath).filter(el => require('path').extname(el) === '.json').sort().reverse()[0];
    }
    var contents = fs.readFileSync(`${filePath}/${file}`, 'utf8');
    return { file: file, contents: JSON.parse(contents) };
}

// create a properly formatted file path
exports.setLocation = function ( location )
{
    if( Array.isArray(location) ) {
        const newLocation = {};
        newLocation.repo = location[0];
        newLocation.dir = location[1];
        newLocation.file = location[2];
        location = newLocation; 
    } else if ( typeof location === "string" ) {
        var uri = location.split("/");
        location = {};
        location.file = (uri[uri.length-1].indexOf(".")>0) ? uri.pop() : undefined;
        if ( ("apps data packages").includes(uri[0])) { location.repo = uri.slice(0,2).join("/"); location.dir = uri.slice(2).join("/"); }
        else if ( uri[2] === "data" ) { location.repo = uri.slice(0,3).join("/"); location.dir = uri.slice(3).join("/"); }
        else if ( uri[3] === "data" ) { location.repo = uri.slice(0,4).join("/"); location.dir = uri.slice(4).join("/"); }
        else { location.repo = uri.join("/"); location.dir = ""; }
    } else if( Array.isArray(location.path) ) {
        location.repo = location.path[0];
        location.dir = location.path[1];
        location.file = location.path[2]; 
    } else if ( typeof location.uri === "string" ) {
        var uri = location.uri.split("/");
        location.file = (uri[uri.length-1].indexOf(".")>0) ? uri.pop() : undefined;
        if ( ("apps data packages").includes(uri[0])) { location.repo = uri.slice(0,2).join("/"); location.dir = uri.slice(2).join("/"); }
        else if ( uri[2] === "data" ) { location.repo = uri.slice(0,3).join("/"); location.dir = uri.slice(3).join("/"); }
        else if ( uri[3] === "data" ) { location.repo = uri.slice(0,4).join("/"); location.dir = uri.slice(4).join("/"); }
        else { location.repo = uri.join("/"); location.dir = ""; }
    }
    return location;
}

// writes a file record to the filesystem, the name is a suffixed timestamp
exports.writeFileRecord = function (filePath, contents) {
    var suffix = 0;
    var fileRecordPath;
    filePath += `/${Date.now().toString()}`;

    fs.writeFileSync(`${filePath}.tmp`, JSON.stringify(contents,null,2));
    while(fs.existsSync(`${filePath}${suffix.toString()}.json`)) suffix += 1;
    fileRecordPath = `${filePath}${suffix.toString()}.json`;
    fs.renameSync(`${filePath}.tmp`,fileRecordPath);

    return path.basename(fileRecordPath);
}
