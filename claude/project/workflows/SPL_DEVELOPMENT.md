# SPL Development Workflow

## Overview

This workflow defines the development process for SPL platform code within the spl1 transitional repository.

### Operational Principles
- **Optimize for accuracy, not speed** - Thorough verification over rapid execution
- **Complete verification** - Check all components systematically rather than sampling
- **Collaborative transparency** - Provide full views for shared understanding

## Development Architecture

### Repository Structure
- **`spl-dev/`** - Active development instance (prototype/sandbox)
  - `spl-dev/modules/` - Core SPL modules under development
  - `spl-dev/apps/` - Application modules under development
- **`modules/`** - Canonical core modules (production-ready)
- **`apps/`** - Canonical application modules (production-ready)

### Development Execution Environment
- **Command Router**: `/home/herma/splectrum/spl1/spl_execute`
- **Development Instance**: `dev` 
- **Execution Pattern**: `spl_execute dev [options] <command>`

## Development Process

### Phase 0: SPL Knowledge Verification
**CRITICAL REQUIREMENT**: Before ANY SPL development work begins:

1. **MANDATORY READ**: **[SPL_ESSENTIALS.md](../SPL_ESSENTIALS.md)** - Essential SPL execution model and patterns

2. **CONFIRMATION**: Claude MUST state: **"SPL ESSENTIALS CONFIRMED"** before proceeding

3. **REFERENCE**: Use SPL_ESSENTIALS.md as quick reference during development

**NO ADDITIONAL MANDATORY READING** - Other documentation is available for reference when needed.

### Phase 1: Development Work
1. **Development Context**: ALL development happens within app context
   - **New APIs**: Develop in `spl-dev/apps/{app}/modules/{api}/`
   - **Core module changes**: Still develop within relevant app context
   - **Why**: Lifts out only the code that matters, avoids coding amidst unrelated modules
   - **Benefits**: Focused scope, cleaner iteration, immediate app overlay testing

2. **Code Changes**: Make ALL code changes only within `spl-dev/` folders
   - **Preferred**: App modules: `spl-dev/apps/{app}/modules/`
   - **Legacy**: Core modules: `spl-dev/modules/` (only when app context not applicable)

3. **Testing**: Use dev router for all testing
   ```bash
   spl_execute dev [options] <command>
   spl_execute dev -d <command>  # Debug mode
   spl_execute dev -v <command>  # Verbose mode
   spl_execute dev -t <command>  # Test mode
   ```
4. **Validation**: Ensure functionality works correctly in development environment

### Phase 2: Canonical Sync
1. **Change Analysis**: 
   ```bash
   diff -r modules spl-dev/modules
   diff -r apps spl-dev/apps
   ```
2. **Change Validation**: Review all changes for:
   - Functional correctness
   - Security implications
   - Breaking changes
   - Code quality
3. **Canonical Update**: 
   ```bash
   # Full sync for modules (complete replacement)
   rsync -av --delete spl-dev/modules/ modules/
   
   # Full sync for each app present in spl-dev (add, update, delete within each app)
   # Preserves other canonical apps not in spl-dev
   for app in spl-dev/apps/*/; do
     app_name=$(basename "$app")
     rsync -av --delete "spl-dev/apps/$app_name/" "apps/$app_name/"
   done
   ```

### Phase 3: Verification
1. **Post-sync Testing**: Verify canonical modules work correctly
2. **App Overlay Testing**: Ensure app overlay pattern functions
3. **Integration Testing**: Test core + app interactions

## Critical Rules

### 🚫 Forbidden Actions
- **NEVER** modify files directly in `modules/` or `apps/`
- **NEVER** execute commands against canonical folders during development
- **NEVER** skip the validation step before canonical sync
- **NEVER** sync to canonical as part of development activities - sync is a separate, explicit step

### ✅ Required Actions
- **MANDATORY FIRST STEP** - Read SPL_ESSENTIALS.md before starting ANY development work
- **MANDATORY CONFIRMATION** - Explicitly state "SPL ESSENTIALS CONFIRMED" before development
- **ALWAYS** develop within `spl-dev/` folders
- **ALWAYS** use `spl_execute dev` for development testing
- **ALWAYS** validate changes before syncing to canonical
- **ALWAYS** test both development and canonical after sync
- **MANDATORY** work from project root directory (`/home/herma/splectrum/spl1/`)
- **MANDATORY** use absolute paths in all file operations - never relative paths

## App Overlay Development

### Testing App Overlays
1. **Create app structure**: `spl-dev/apps/{app-name}/modules/`
2. **Develop app modules**: App-specific functionality
3. **Test overlay precedence**: 
   ```bash
   spl_execute dev {app-name}/{module-path}  # Should use app version
   spl_execute dev spl/{module-path}         # Should use core version
   ```

### App Development Pattern
- App modules override core modules for same command paths
- App modules should extend, not replace, core functionality when possible
- Use descriptive app names that clearly indicate purpose

## Quality Gates

### Before Canonical Sync
- [ ] All development tests pass
- [ ] No breaking changes to existing functionality
- [ ] App overlay pattern works correctly
- [ ] Help system functions properly
- [ ] Debug output is clean and informative

### After Canonical Sync
- [ ] Canonical modules function identically to development
- [ ] App overlay precedence works
- [ ] No regressions in existing functionality
- [ ] Integration tests pass

## Debugging and Diagnostics

### Development Debugging
```bash
spl_execute dev -d <command>  # Full debug output with execution trace
```

### Change Tracking
```bash
# See what changed
diff -r modules spl-dev/modules | head -20

# See specific file changes
diff modules/spl/app/app.js spl-dev/modules/spl/app/app.js
```

## Reference Documentation

### Available Reference Guides (As Needed)
- **[docs/guides/spl-coding-standards.md](../../docs/guides/spl-coding-standards.md)** - Detailed coding standards reference
- **[docs/guides/spl-api-development-gotchas.md](../../docs/guides/spl-api-development-gotchas.md)** - Comprehensive gotchas and solutions
- **[docs/guides/implementing-new-api.md](../../docs/guides/implementing-new-api.md)** - Complete API implementation guide
- **[docs/guides/app-development.md](../../docs/guides/app-development.md)** - Detailed app development patterns
- **[docs/guides/gp-test-api-guide.md](../../docs/guides/gp-test-api-guide.md)** - Testing framework comprehensive guide

### SPL Development Checklist

**STEP 1: ESSENTIAL KNOWLEDGE VERIFICATION**
- [ ] **CONFIRMED READ: SPL_ESSENTIALS.md** - Core SPL execution model and patterns
- [ ] **VERIFICATION STATEMENT PROVIDED** - "SPL ESSENTIALS CONFIRMED" stated explicitly

**STEP 2: DEVELOPMENT IMPLEMENTATION**
- [ ] Correct require path calculations (6 levels from app modules)
- [ ] SPL `.default` export pattern followed
- [ ] No try/catch blocks in API methods
- [ ] Auxiliary functions used for complex logic
- [ ] Testing via complete pipeline (discover @@ plan @@ run @@ report)
- [ ] Debug mode used for validation (-d flag)

## Claude AI Development Integration

### Streamlined Knowledge Verification
**CRITICAL**: Any request for SPL development work MUST begin with:

1. **READ SPL_ESSENTIALS.md**: Core execution model and patterns (5-minute read)

2. **CONFIRM UNDERSTANDING**: State **"SPL ESSENTIALS CONFIRMED"** before proceeding

3. **REFERENCE AS NEEDED**: Access detailed guides only when specific questions arise

**ENFORCEMENT PATTERN**:
```
User: "Please implement a new SPL API for X"
Claude: "I'll implement the SPL API. Let me first read SPL_ESSENTIALS.md..."
[Reads essential SPL knowledge]
Claude: "SPL ESSENTIALS CONFIRMED - proceeding with development using SPL patterns"
[Begins development work]
```

### Integration with Claude Workflows

This workflow integrates with:
- **SESSION_START**: Initialize development environment
- **SESSION_END**: Ensure changes are committed
- **COMMIT**: Include canonical sync in commit workflow when appropriate

---

*SPL Development Workflow - Prototype to Production Pipeline with Mandatory Documentation Enforcement*