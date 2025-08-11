# spl/app/create

Creates an action from a batch of commands by building a processing pipeline that reads files, processes commands, and generates new command structures.

## Purpose

Transforms command batch files into executable actions through a multi-stage pipeline including file processing, preparation, parsing, pipeline creation, and code generation.

## Arguments

- `file` - Path to the batch file containing commands
- `args` - Arguments to pass to the batch file processing
- `appRoot` - Root directory for the application (from context)

## Pipeline Steps

1. **Process File** (`spl/app/process-file`) - Read and process the batch file
2. **Prepare** (`spl/app/prepare`) - Prepare content for processing
3. **Parse** (`spl/app/parse`) - Parse command structures
4. **Pipeline** (`spl/app/pipeline`) - Create pipeline configuration
5. **Generate** (`spl/app/generate`) - Generate the final action

## Usage

```bash
spl_execute dev spl/app/create --file="batch.txt" --args="param1,param2"
```

## API Type

API Method - Command batch to action converter