[Home](../README.md)
# Data Structures

## Header spl Data Structure

The *spl* data structures are associated with the platform runtime.  
They refer to the context state of runtime items.  
Running in compressed mode means that they are copied onto records brought in the system.  

spl.command contains the header properties of the command being executed.
```
"spl": {
    "command": {
        "UUID": "...",
        "cwd": "...",
        "procId": "...",
        "session": "boot", // also system, client, etc.
        "commandString": "..."
    }
}
```

spl.data contains data properties used by the data layer when the underlying repository is filesystem based.
The directory is referenced relative to the root of the SPlectrum instance.
```
"spl": {
    "data": {
        "action": "spl/data/read",
        "repo": "data", // also "runtime/data", "runtime/boot/data", "runtime/boot/requests ...
        "dir": "clients/client_123",
        "file": "1234.json"
    }
}
```

spl.execute contains the headers properties used by the execution context.
This data structure when added to a data record, turns the data record into an execution context record.
```
"spl":{
    "execute":{
        "action":"spl/execute/next",
        "status":"executing",
        "session":"client",
        "cwd":"D:\\SPlectrum\\spl\\spl",
        "pipeline": []
    }
}
```

spl.request contains the headers properties of the request record.  
A number of properties mirror those of the execution context.  
This data structure when added to a data record, turns the data record into an (internal) request record.
```
"spl":{
    "request":{
        "action":"spl/data/read",
        "status":"new",
        "session":"client",
        "cwd":"D:\\SPlectrum\\spl\\spl",
        "pipeline": []
    }
}
```
