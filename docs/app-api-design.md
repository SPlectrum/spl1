[Home](../README.md)
# App API Design

## How to do the parsing

Commands get entered on the commandline and passed onto a parsing actions.  
The first command that is parsed is from the app API.  
There is no reason why the commandline couldn't be parsed completely before proceeding with execution.  
In fact the input should be multi-line so it is ready to parse a batch of commands.

Because the parsed commands on a single line end up being a pipeline, they are executed using the same execution record.  
At times it may be necessary to tell the parser to stop parsing arguments for a command.  
This is where concatenation (、_ !、_) should be used as a stop parsing directive and not for a spawn operation.  
Newline should be used for a spawn operation, i.e. create a new execution record before proceeding.  


