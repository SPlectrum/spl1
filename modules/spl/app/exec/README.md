# spl/app/exec

Reads commands from a file and executes them through a processing pipeline that handles file reading, command preparation, parsing, pipeline creation, and finalization.

## Purpose

Executes command batch files through a complete processing pipeline, providing end-to-end execution from file input to command completion.

## Arguments

- `appRoot` - Root directory for the application
- `file` - Path to the file containing commands to execute
- `args` - Arguments to pass to the file processing

## Pipeline Steps

1. **Process File** (`spl/app/process-file`) - Read and process the command file
2. **Prepare** (`spl/app/prepare`) - Prepare commands for execution
3. **Parse** (`spl/app/parse`) - Parse command structures  
4. **Pipeline** (`spl/app/pipeline`) - Create execution pipeline
5. **Finalise** (`spl/app/finalise`) - Complete the execution process

## Usage

```bash
spl_execute dev spl/app/exec --appRoot="/path/to/app" --file="commands.txt" --args="param1,param2"
```

## Difference from Create

While `spl/app/create` generates new actions, `exec` focuses on executing existing command batches through the complete processing pipeline.

## API Type

API Method - File-based command executor