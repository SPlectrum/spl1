[← Home](../README.md)

# Creating New Applications

## Quick Setup
```bash
# 1. Create structure (matches model app)
mkdir -p spl/apps/{app-name}/{batches,data,modules/usr,scripts}

# 2. Copy from model app
cp spl/apps/model/{spl,spl.js} spl/apps/{app-name}/
cp spl/apps/model/modules/* spl/apps/{app-name}/modules/
chmod +x spl/apps/{app-name}/spl

# 3. Create batch files, update boot app, generate usr/ methods
```

## Existing Apps Reference
| App | Purpose | Batch Examples |
|-----|---------|----------------|
| **boot** | Release/deployment | `apps_to_release.batch`, `deploy_apps.batch` |
| **model** | Template for new apps | (empty batches/ directory) |
| **test-suite** | Core platform testing | `console-tests.batch`, `package-tests.batch` |
| **test-tools-git** | Git API testing | `tools-git-status-tests.batch` |
| **test-tools-7zip** | 7zip API testing | (scaffolded, empty batches/) |
| **watcher** | Development/monitoring | (reuses test-suite batches) |

## Actual Directory Structure
```
spl/apps/{app-name}/
├── spl, spl.js                     # Copy from model
├── batches/                        # .batch files
├── data/                           # App data (no prescribed structure)
├── modules/spl.js                  # Copy from model  
├── modules/arguments.json          # Copy from model, customize
├── modules/usr_arguments.json      # Copy from model
├── modules/usr/                    # Generated from batch files
└── scripts/                        # JavaScript files
```

## Boot App Integration Required
1. Add app to `spl/apps/boot/batches/apps_to_release.batch`
2. Add app to `spl/apps/boot/batches/deploy_apps.batch`  
3. Create `spl/apps/boot/batches/{app-name}_to_release.batch`
4. Create `spl/apps/boot/batches/deploy_{app-name}.batch`
5. Generate usr/ methods: `./spl spl/app/create -f {batch-file}.batch`

## Test Integration
```bash
./spl_execute {app-name} --help
./spl_execute boot usr/{app-name}_to_release
./spl_execute boot usr/deploy_{app-name}
```

---

[← Home](../README.md)