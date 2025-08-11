# spl/app/wrap

Wraps script files (JavaScript, shell, Python) into reusable SPL actions with proper module structure and arguments.

## Purpose

Transforms script files into SPL action modules by creating wrapper code that enables scripts to be called as standard SPL commands with argument handling.

## Arguments

- `appRoot` - Root directory for the application
- `file` - Path to the script file to wrap

## Script Type Support

- **JavaScript (.js)** - Creates wrapper using `splApp.generateJSWrapper()`
- **Shell Scripts (.sh)** - Creates wrapper using `splApp.generateShellPythonWrapper()` with bash
- **Python Scripts (.py)** - Creates wrapper using `splApp.generateShellPythonWrapper()` with python3

## Wrapping Process

1. **Script Reading** - Reads script content from `scripts/` directory
2. **Type Detection** - Determines script type from file extension
3. **Wrapper Generation** - Creates appropriate wrapper code for script type
4. **Arguments File** - Generates corresponding arguments JSON schema
5. **Module Creation** - Stores both files in `modules/usr/` directory

## Generated Files

- `modules/usr/{actionName}.js` - Executable SPL action wrapper
- `modules/usr/{actionName}_arguments.json` - Command arguments schema

## Usage

```bash
spl_execute dev spl/app/wrap --appRoot="/app" --file="myscript.sh"
```

This creates `usr/myscript` action that can be called as a standard SPL command.

## API Type

API Method - Script to action wrapper generator