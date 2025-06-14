# Script Testing Framework Pattern

## Comprehensive Testing Strategy

When implementing script execution functionality, establish baseline tests before extending features.

## Test Structure
```
scripts/
  simple-test.js           # Basic execution
  args-test.js            # Argument substitution ($1, $2, $@, $*)
  spl-context-test.js     # SPL integration testing

batches/
  js-run-tests.batch      # Test spl/app/run functionality
  js-wrap-tests.batch     # Test spl/app/wrap functionality  
  js-wrapped-execution-tests.batch  # Test generated usr/ commands
  js-help-tests.batch     # Test help functionality
```

## Testing Workflow
1. Create test scripts covering edge cases
2. Create batch files to automate testing
3. Generate usr/ commands from batch files
4. Validate all functionality before extending

## Benefits
Prevents regressions when adding multi-language support and provides clear validation of functionality.

## Incremental Testing Workflow

**Phase-Based Testing Discovery**: The 7zip API implementation revealed an effective incremental testing pattern that should be standardized across all API development.

**Testing Phases**:
1. **Batch File Testing**: Test command sequences as batch files before generating permanent usr/ methods
2. **Command Line Validation**: Verify argument parsing and alias constraints (single character requirement)
3. **Integration Testing**: Test real operations with actual tools and file system interactions
4. **State Management**: Clean up test artifacts to ensure repeatable test runs
5. **Packaging Verification**: Confirm changes are properly packaged to release folder

**Key Learning**: Use `spl/app/exec -f {file}.batch` for rapid iteration before committing to permanent usr/ method generation.

## Common Testing Pitfalls

**Named Arguments Requirement**: 
- **Issue**: `./spl_execute spl test-spl-app spl/app/run simple-test.py hello world` fails with "no such file or directory" error for `simple-test.py_arguments.json`
- **Root Cause**: SPL parser treats positional arguments as action names, looking for corresponding argument definition files
- **Solution**: Always use named parameters: `./spl_execute spl test-spl-app spl/app/run -f simple-test.py -a hello world`
- **Pattern**: `-f` for files, `-a` for arguments, `-d` for debug flag
- **Learning**: This is a recurring issue - document and prevent with proper command examples

## Argument Schema Validation

**Alias Constraint Discovery**: All command line argument aliases must be single characters, causing validation failures with longer aliases like "sfx" or "slt".

**Validation Requirements**:
- Aliases must be exactly one character
- Parameter names should be descriptive (e.g., "sfx" vs. "selfExtracting")
- Test both short (-h) and long (--help) help flags
- Verify alias uniqueness within method scope