[← Home](../README.md)

# Test App Development Reference

## Current Implementation: test-boot

**Structure**:
```
spl/apps/test-boot/
├── modules/
│   ├── spl.js                          # Full copy of core spl.js
│   ├── usr/
│   │   ├── usr.js                      # Auxiliary library (Node.js fs operations)
│   │   ├── verify-boot-file-patterns.js    # Test method (thin wrapper)
│   │   └── verify-boot-file-patterns_arguments.json
└── spl, spl.js, arguments.json         # Standard app files
```

**Usage**:
```bash
cd spl/apps/test-boot
./spl usr/verify-boot-file-patterns     # ✓ PASS: Boot app file patterns correct
```

## Patterns Discovered

**Auxiliary Library** (`usr.js`):
- Contains Node.js implementation (fs, path modules)
- Functions take `(input, spl, ...params)` signature
- Use `spl.history()` for execution tracking
- Return structured results or null for errors

**Test Method** (thin wrapper):
- `const usr = require("./usr.js")`
- Call library functions for implementation
- Use direct `console.log()`, `console.error()` for output
- Store results with `spl.wsSet()` for workspace access

**Path Resolution**:
- `spl.context(input, "cwd")` = install root
- Target paths: `path.join(cwd, 'apps/boot/batches')`
- Test source locations, not deployed locations

## Key Rules

- **Console**: Direct calls (`console.log()`) not moduleAction
- **Paths**: Relative to install root via `spl.context(input, "cwd")`
- **Structure**: Auxiliary library + thin wrapper pattern
- **Naming**: `test-{target}` apps, `usr.js` libraries
- **Implementation**: Node.js modules when SPlectrum functionality incomplete