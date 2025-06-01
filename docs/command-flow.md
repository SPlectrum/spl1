[Home](../README.md)
# Command Flow, Clients and Server

1. A command is generated at commandline
2. The command is parsed into a data record.
3. The command is wrapped into an execution context and submitted to the queue directory.
4. All commands start with spl/execute/initialise
5. The command is executed until complete. (what does complete mean when more than one branch?)
6. All commands finish with spl/execute/complete (multiples, is there are multiple branches)

A report on initiated and completed requests should be processed from spl/execute/initialise and spl/execute/complete.

A client is treated as an app on the platform.  
There is a client data area within the data/clients directory.  
A console gets identified by its process ID  
on Windows: title mycmd
tasklist /v /fo csv | findstr /i "mycmd"
on Linux: pidof command