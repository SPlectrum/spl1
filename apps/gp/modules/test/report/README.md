# Test Reporting

Standalone formatter - generates reports from analysis/run data in workspace. Reusable reporting engine for all test results and analysis data.

## Overview

The `report` method provides flexible test result formatting and display. It can generate reports from any test execution data stored in the workspace, supporting both detailed and summary output modes.

## Usage

```bash
./spl_execute <app> test/report [options]
```

## Parameters

- `--summaryOnly` (`-s`): Show only summary results, hide detailed output

## Functionality

- Extracts test results from workspace execution data
- Generates formatted reports with pass/fail statistics
- Supports both detailed and summary output modes
- Processes multiple test types and provides unified reporting
- Calculates aggregate statistics across all test categories

## Report Formats

### Summary Mode (`-s`)
- Test type summary with pass/fail counts
- Failed test file listings
- Aggregate statistics
- Execution timing information

### Detailed Mode (default)
- Complete test execution details
- Individual test results with timing
- Error messages and validation details
- Workspace and discovery information

## Test Types Supported

The reporter handles all test result types:

- **Instantiation**: Module loading tests
- **JSON Validation**: Schema validation results
- **Basic Tests**: Functional test outcomes
- **Documentation**: Docs presence and currency
- **File Type**: Structure validation results  
- **Coding Standards**: Code quality checks

## Integration

Reporting is the final step in the test pipeline:

1. discover - Inventory assets
2. plan - Create work packages  
3. execute - Run tests
4. **report** - Format and display results

## Output

The method generates comprehensive reports showing:

- Test execution statistics by category
- Detailed failure information
- Discovery and planning summaries
- Execution timing and performance data
- Pipeline workflow information

## Example

```bash
# Generate detailed test report
./spl_execute dev test/report

# Generate summary report only
./spl_execute dev test/report --summaryOnly
```