[← Home](../README.md)

# SPL Package API

## Quick Reference
Package lifecycle: `create` → `save`/`load` → `deploy` → `remove`

## Methods
| Method | Purpose | Key Arguments | Usage Example |
|--------|---------|---------------|---------------|
| **create** | Creates package from directory | `-r` repo, `-d` dir, `-f` file | `./spl spl/package/create -r apps -d myapp -f myapp.json` |
| **save** | Saves package to filesystem | `-r` repo, `-d` dir, `-f` file | `./spl spl/package/save -r packages -d . -f myapp.json` |
| **load** | Loads package from filesystem | `-r` repo, `-d` dir, `-f` file | `./spl spl/package/load -r packages -f myapp.json` |
| **deploy** | Deploys package to target | `-r` repo, `-d` dir, `-f` file | `./spl spl/package/deploy -r apps -d . -f myapp.json` |
| **remove** | Removes package from target | `-r` repo, `-d` dir, `-f` file | `./spl spl/package/remove -r apps -f myapp.json` |

## Package Structure
Packages are JSON files containing directory trees:
```json
{
  "headers": {"spl": {"package": {"name": "package-name"}}},
  "value": {
    "file.txt": "content",
    "dir/": {"nested-file.txt": "content"}
  }
}
```

## Common Workflow
```bash
# Create package from app directory
./spl spl/package/create -r apps -d myapp -f myapp.json

# Save to release directory  
./spl spl/package/save -r ../release/packages -d . -f myapp.json

# Load from release directory
./spl spl/package/load -r ../release/packages -f myapp.json

# Deploy to target location
./spl spl/package/deploy -r apps -d . -f myapp.json
```

## Path Specification Options
All methods support multiple path formats:
- **Individual**: `-r repo -d dir -f file`
- **Path parts**: `-p "repo dir file"` (create/load/remove) or `-p "dir file"` (save/deploy)
- **URI format**: `-u "path://repo/dir/file"`

---

[← Home](../README.md)