---
type: task
github_id: null
title: "Migrate commands to consistent index-based folder structure"
short_summary: "Restructure command files to use consistent index_arguments.json pattern"
state: open
milestone: v0.8.0
labels: [task]
priority: medium
estimated_effort: TBD
github_updated_at: null
local_updated_at: "2025-08-02T20:11:46.035Z"
---

# Migrate commands to consistent index-based folder structure

## Objective
Migrate SPL command structure from mixed file/folder pattern to consistent index-based folder structure that supports co-location of supporting resources (AVRO schemas, templates, documentation).

## Current State
Commands currently use inconsistent naming patterns:
- Level 1/2: `app_arguments.json` (folder-level arguments) 
- Level 3: `run.js`, `run_arguments.json` (method files)
- This creates asymmetry between folder-based levels and file-based methods
- Supporting resources (schemas, templates) have no clear home

## Required Work
- Migrate all command methods to folder-based structure
- Implement consistent `index_arguments.json` pattern at all levels
- Update symlinks and path resolution logic
- Preserve existing functionality during transition
- Systems affected: spl/app, spl/blob, spl/command, spl/execute, tools/git, tools/7zip

## Work Plan
1. **Create new folder structure for each method**
   - `method.js` → `method/index.js`
   - `method_arguments.json` → `method/index_arguments.json`
2. **Update app_arguments.json to index_arguments.json**
3. **Update path resolution logic** to look for index_arguments.json
4. **Update existing symlinks** in test-spl-app and other apps
5. **Test all command execution** to ensure no regression
6. **Create schemas/ and templates/ subfolders** for future AVRO integration

## Acceptance Criteria
- [ ] All commands use consistent folder structure (method/index.js, method/index_arguments.json)
- [ ] App overlay pattern continues to work with new structure
- [ ] Existing test suite passes without modification
- [ ] Symlinks updated and functional
- [ ] Path resolution logic handles new structure
- [ ] Documentation updated to reflect new patterns

## Benefits
- **Consistent Pattern**: `index_arguments.json` at every level eliminates confusion
- **Resource Co-location**: Methods can include schemas/, templates/, docs/ subfolders
- **Future AVRO Integration**: Input/output schemas can live alongside method implementations
- **Container-like Boundaries**: Each method becomes self-contained with all resources
- **Tooling Simplification**: Any folder with `index_arguments.json` is a callable unit

## Example Target Structure
```
app/
├── index.js
├── index_arguments.json        # (was app_arguments.json)
├── run/
│   ├── index.js               # (was run.js)
│   ├── index_arguments.json   # (was run_arguments.json)
│   ├── schemas/
│   │   ├── input.avsc
│   │   └── output.avsc
│   └── templates/
│       └── default-script.js
└── exec/
    ├── index.js
    ├── index_arguments.json
    └── schemas/
        └── batch-input.avsc
```

## GitHub Discussion Summary
Key insights from GitHub comments (curated manually)

## Progress Log
- Date: Status update