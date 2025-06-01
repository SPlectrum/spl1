//  name        package Auxiliary Functions
//  URI         package/package
//  type        Auxiliary Library
//  description Contains the common functions for the package API.
//              These are very similar to the filesystem data library.
///////////////////////////////////////////////////////////////////////////////
const path = require('path');
const fs = require('fs');
///////////////////////////////////////////////////////////////////////////////

// adds a full dir path 
exports.addDir = function ( input, spl, dirPath ) {
    spl.history ( input, `addDir ${dirPath}` );
    fs.mkdirSync(dirPath, { recursive: true });
}

// returns an array of files and dirs - synchronous
exports.dirContents = function ( dirPath ) {
    return fs.readdirSync(dirPath);    
}

// gets the contents of a file from the filesystem - synchronous
exports.getFile = function ( input, spl, filePath ) {
    spl.history ( input, `get ${filePath}` );
    return fs.readFileSync( filePath, 'utf8' );
}

// Checks if the dir item is a file or dir - synchronous
exports.isFile = function ( filePath ) { return fs.lstatSync ( filePath ).isFile(); }

// create a properly formatted file path
exports.path = function ( ...args ){
    return path.join(...args);
}

// put file asynchronously, in the background - asynchronous
exports.putFile = function ( input, spl, filePath, contents ) {
    fs.writeFile ( filePath, contents, ( err ) => {
        if ( err ) spl.history ( input, `ERROR - async - put file ${filePath} - ${err.toString()}` ); 
        else spl.history ( input, `async - COMPLETED put file ${filePath}` );
     });
}

// removes a full dir path with file contents
exports.removeDir = function ( input, spl, dirPath ) {
    spl.history ( input, `removeDir ${dirPath}` );
    fs.rmSync ( dirPath, { recursive: true, force: true } );
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
///////////////////////////////////////////////////////////////////////////////
