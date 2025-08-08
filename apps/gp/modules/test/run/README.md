# gp/test/run

## Purpose
Executes work packages created by plan method. Uses test.js functions.

## Usage
Called by execute pipeline. Gets testContext from SPL context:
```javascript
const testContext = {
    appDataRoot: spl.context(input, "appDataRoot"), 
    cwd: spl.context(input, "cwd"),
    executionHistory: []
};
```

## Work Package Types
- `instantiation` → `testLib.executeInstantiationPackage(testContext, workPackage)`
- `json-validation` → `testLib.executeJsonValidationPackage(testContext, workPackage)`  
- `basic-test-execution` → `testLib.executeBasicTestPackage(testContext, workPackage)`

## Results
Stores results in workspace under `gp/test/{requestKey}/run`