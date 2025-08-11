# spl/app/help

Provides help functionality for the app API by displaying detailed information about commands, options, and usage patterns.

## Purpose

Generates and displays comprehensive help information by gathering command details, parsing options, and formatting help data for user consumption.

## Arguments

- `appRoot` - Root directory for the application
- `items` - Array of URIs to provide help for (sorted automatically)

## Help Generation Process

1. **URI Sorting** - Automatically sorts help URIs and ensures root help is first
2. **Detail Extraction** - Gets command details for each URI
3. **Data Collection** - Combines headers, options, and bottom sections
4. **Help Formatting** - Uses `splApp.generateHelp()` to format output

## Help Structure

- **Top Section** - General information and usage
- **Headers** - Command-specific headers for each URI  
- **Options** - Parameter lists and option details
- **Bottom Section** - Footer information and examples

## Usage

```bash
spl_execute dev spl/app/help --appRoot="/path/to/app" --items="['command1', 'command2']"
```

## Integration

Typically called automatically when help flags are detected in batch processing or can be invoked directly for command documentation.

## API Type

API Method - Help information generator