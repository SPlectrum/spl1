//  name        SPL Package Useful Functions
//  URI         spl/spl
//  type        Auxiliary Library
//  description Library of auxiliary methods at package level
//              It contains methods to invoke actions, set properties and
//              interacts with the workspace.
///////////////////////////////////////////////////////////////////////////////
const { randomUUID } = require('crypto');
///////////////////////////////////////////////////////////////////////////////

// Gets a configuration value associated with the action currently being executed
function spl_action ( input, key )
{
    // get the current action
    var action;
    if ( spl_context ( input, "action" ) === "spl/execute/next" ) action = spl_request ( input, "action");
    else action = spl_context ( input, "action" );
    return spl_config ( input, action, key );
}
exports.action = spl_action;

// Gets a configuration value for the specified action
function spl_config ( input, action, key )
{
    // split the current action ( request or execute )
    var parts = parts = action.split ( "/" ), result, entry;
    const apiRef = `${parts[0]}.${parts[1]}`;
    const apiRefUri = `${parts[0]}/${parts[1]}`;
    const methodRef = `${parts[0]}.${parts[1]}.${parts[2]}`;
    const methodRefUri = action;

    // first: check execution header for method config
    if ( key === undefined ) result = spl_rcRef ( input.headers, methodRef );
    else result = spl_rcRef ( input.headers, `${methodRef}.${key}` );
    if ( !( result === undefined ) ) return result;

    // second: check workspace method entry header for method config
    entry = spl_wsRef ( input, methodRefUri );
    if ( entry && entry.headers ) {
        result = spl_rcRef ( entry.headers, methodRef );
        if ( !( result === undefined || key === undefined ) ) result = result[key];
    }
    if ( !( result === undefined ) ) return result;

    // third: check workspace API entry header  for method config
    entry = spl_wsRef ( input, apiRefUri );
    if ( entry && entry.headers ) {
        result = spl_rcRef ( entry.headers, methodRef );
        if ( !( result === undefined || key === undefined ) ) result = result[key];
    }
    if ( !( result === undefined ) ) return result;

    // no API default for full method property set
    if ( key === undefined ) return result; // no default

    // fourth: check execution header for API config (default)
    result = spl_rcRef ( input.headers, `${apiRef}.${key}` );
    if ( !( result === undefined ) ) return result;
    
    // fifth: check workspace API entry header for API config (default)
    entry = spl_wsRef ( input, apiRefUri );
    if ( entry && entry.headers ) {
        result = spl_rcRef ( entry.headers, apiRef );
        if ( !( result === undefined ) ) result = result[key];
    }
    return result;
}
exports.config = spl_config;

// get execution context properties
function spl_context ( input, key ) { return ( ( key === undefined ) ? input.headers.spl.execute : input.headers.spl.execute[key] ); }
exports.context = spl_context;

// get request properties only ( spl/execute/request )
function spl_request ( input, key ) { return ( ( key === undefined ) ? input.headers.spl.request : input.headers.spl.request[key] ); }
exports.request = spl_request;

// set current action specific properties 
function spl_setAction ( input, key, value ) {
    var action;
    if ( spl_context ( input, "action" ) === "spl/execute/next" ) action = spl_request ( input, "action");
    else action = spl_context ( input, "action" );
    return spl_setConfig ( input, action, key, value );
}
exports.setAction = spl_setAction;

// set method / api specific properties 
function spl_setConfig ( input, action, key, value ) {
    action = action.replaceAll ( "/", "." );
    if ( key === null ) spl_rcSet ( input.headers, action, value );
    else  spl_rcSet ( input.headers, `${action}.${key}`, value );
}
exports.setConfig = spl_setConfig;

// set execution context properties
function spl_setContext ( input, key, value ) { 
    if ( key === null ) return spl_rcSet ( input, "headers.spl.execute", value ); 
    else return spl_rcSet ( input, `headers.spl.execute.${key}`, value ); 
}
exports.setContext = spl_setContext;

// set request properties only ( spl/execute/request )
function spl_setRequest ( input, key, value ) {
    if ( key === null ) return spl_rcSet ( input, "headers.spl.request", value );
    else spl_rcSet ( input, `headers.spl.request.${key}`, value );
}
exports.setRequest = spl_setRequest;

// Complete request
exports.completed = function ( input ) {
    var action;
    if ( spl_context ( input, "action" ) === "spl/execute/next" ) {
        action = spl_request ( input, "action" );
        spl_setRequest ( input, "status", "completed" );
    } else {
        action = spl_context ( input, "action" );
        spl_setContext ( input, "action", "spl/execute/set-next" );
    }
    spl_rcDelete ( input.headers, action.replaceAll ( "/", "." ) );
}

// construct a forward slash path with filename for platform internal use - dot converted to underscore
exports.fURI = function ( ... args ) { 
    args[args.length-1] = args[args.length-1].replaceAll ( ".", "_" );
    var result = []; for(var i=0; i<args.length; i++) if(args[i] != "") result.push(args[i]);;
    return result.join ( "/" );
}

// random UUID generation
function generateUUID() { return randomUUID(); }
exports.generateUUID = generateUUID;

// wsAction sets an action for the execution context
exports.gotoExecute = function ( input, action, args )
{
    var parts = action.split ( "/" );
    if ( args != undefined ) spl_rcSet ( input.headers, parts.join ( "." ), args );
    spl_setRequest ( input, `${parts[1]}_next`, action );
    spl_setRequest ( input, "status", parts[1] );
    spl_setRequest ( input, "repeat", false );
    spl_request ( input, "action" ); //.split ( "/" );
    spl_rcDelete ( input.headers, spl_request ( input, "action" ).replaceAll ( "/", "." ) );
}

// add to execution history
exports.history = function ( input, activity )
{
    const action = spl_request ( input, "action" ); 
    var message = [ action, spl_context ( input, "action" ), activity ];
    var history = spl_context ( input, "history" );
    if ( history === undefined ) history = spl_setContext ( input, "history", [] );
    history.push ( message );
    var consoleProgress = spl_context ( input, "consoleProgress" );
    if ( consoleProgress && consoleProgress != action )
    {
        consoleProgress = action;
        console.log ( ` > ${consoleProgress}` );
        spl_setContext ( input, "consoleProgress", consoleProgress );
    }
    if ( activity.substring ( 0, 5 ) == "ERROR" ) console.error ( message.join ( " - " ) );
    else if ( spl_context ( input, "consoleMode" ) != "silent" && activity.substring ( 0, 7 ) == "WARNING" ) console.error ( message.join ( " - " ) );
}

// easy functions to invoke actions
exports.moduleAction = function (input, module)
{
    var moduleRoot = spl_context ( input, "modules" );
    if ( moduleRoot === undefined ) moduleRoot = "modules";
    var moduleOverlay = spl_context ( input, "moduleOverlay" );
    if ( moduleOverlay )
        for ( var i = 0; i < moduleOverlay.length; i++ )
            if ( module.indexOf ( moduleOverlay[i].prefix ) == 0 )
                { moduleRoot = moduleOverlay[i].moduleRoot; i = moduleOverlay.length; }
    return require ( `${ spl_context ( input, "cwd" )}/${moduleRoot}/${module}`).default ( input );
}

// gets a deep clone of a keyvalue in input
function spl_rcDelete (reference, key)
{ 
    const keys = key.split(".");
    for( i = 0; i < keys.length - 1; i++)
    {
        if(reference[keys[i]]==undefined) return;
        reference = reference[keys[i]];
    }
    delete reference[keys[i]];
}
exports.rcDelete = spl_rcDelete;

// gets a deep clone of a keyvalue in input
function spl_rcGet (reference, key) { return structuredClone ( spl_rcRef ( reference, key ) ); }
exports.rcGet = spl_rcGet;

// gets a reference to a keyvalue in input
function spl_rcRef (reference, key)
{ 
    const keys = key.split(".");
    for( i = 0; i < keys.length; i++) { if ( reference[keys[i]] === undefined ) return undefined; reference = reference[keys[i]]; }
    return reference;
}
exports.rcRef = spl_rcRef;

// Sets a value of a keyvalue in input
function spl_rcSet (reference, key, value)
{ 
    const keys = key.split(".");
    for( i = 0; i < keys.length-1; i++) { if( reference[keys[i]] === undefined ) reference[keys[i]] = {}; reference = reference[keys[i]]; } 
    reference[keys[i]] = value;
    return reference[keys[i]]
}
exports.rcSet = spl_rcSet;

// Complete request
exports.throwError = function ( input, message )
{
    spl_setContext ( input, "action", "spl/error/catch" );
    spl_setConfig ( input, "spl/error/catch", "message", message );
}

// construct a forward slash path for platform internal use
exports.URI = function ( ...args ) { 
    var result = []; for ( var i = 0; i < args.length; i++ ) if ( args[i] != "" ) result.push ( args[i] );
    return result.join ( "/" );
}

// wsExists checks the presence of a property and loads it when not
exports.wsExists = function ( input, key, action, args, repeat ) {
    const parts = action.split ( "/" );
    if( spl_wsRef ( input, key ) === undefined ) {
        if( Array.isArray ( args ) ) spl_rcSet ( input.headers, parts.join ( "." ), args );
        else spl_rcSet ( input.headers, parts.join ( "." ), [args] );
        spl_setRequest ( input, `${parts[1]}_next`, action );
        spl_setRequest ( input, "status", parts[1] );
        spl_setRequest ( input, "repeat", repeat );
        return false;
    }
    return true;
}

// wsGet returns a deep clone of a keyvalue in input.value.
exports.wsGet = function ( input, key ) { 
    return structuredClone ( spl_rcRef ( input.value, key.replaceAll ( ".", ".value." ) ) ); 
}

// wsRef returns a reference to a keyvalue in input.value.
function spl_wsRef (input, key) 
{ 
    const parts = key.split ( "." );
    var value = spl_rcRef ( input.value, key.replaceAll ( ".", ".value." ) );
    if ( typeof value == "string" && !( "spl/blob spl/package").includes ( parts[0] ) ) value = spl_wsRef ( input, value );
    return value;
}
exports.wsRef = spl_wsRef;

// wsSet property sets a key in input.value but archives the existing keyvalue in an array.
exports.wsSet = function (input, key, value)
{ 
    const expandedKey = key.replaceAll ( ".", ".value." );
    const current = spl_rcRef ( input.value, expandedKey );
    if( !( current === undefined ) ) {
        var archive = spl_rcRef ( input.value, `${expandedKey}/archive` );
        if ( archive === undefined ) archive = spl_rcSet ( input.value, `${expandedKey}/archive`, [] );
        archive.push(current);
    }
    spl_rcSet ( input.value, expandedKey, value );
}
