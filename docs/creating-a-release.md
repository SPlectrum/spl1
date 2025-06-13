[← Home](../README.md)

# Creating a Release

It is important to keep app packages on significant change and to keep the release folder updated.  
This is where the app packages are added to the git project (the spl folder is not tracked by git).

The release folder contains a boot app with the functionality to create the install folder within the spl folder.
Within the spl folder, the boot app executes the deploy and remove operation.  
The boot app is fully self-contained, it contains all functional code to run.

To create an install package that can be zipped up, run the following command from the root of the boot app (release/install/boot):
```
./spl usr/release_to_install
```
This will copy the files in the relase directory and the repository modules directory to the install folder within the spl folder. 

To create the Linux installer package from the git repository run the command below in the root:

```bash
# Create Linux installer (future implementation)
./spl usr/create_linux_installer

# Current manual method using 7z for testing
7z a spl_package.tar.gz ./spl
```

**Note**: The release process is transitioning to Linux-first deployment. See [Linux Installer Design](linux-installer-design.md) for the planned installer implementation.

## Testing Release Installs

### Release Install Testing Process

To test a release install without affecting the main system:

1. **Create test environment**:
   ```bash
   mkdir spl2
   cp -r release/* spl2/
   ```

2. **Navigate to test boot directory**:
   ```bash
   cd spl2/install/boot
   ```

3. **Execute deployment sequence**:
   ```bash
   ./spl usr/deploy_install      # Deploy install packages
   ./spl usr/deploy_modules      # Deploy core modules  
   ./spl usr/deploy_{app-name}   # Deploy individual apps
   ```

### Deployment Sequence

The proper deployment order is:

| Step | Command | Purpose |
|------|---------|---------|
| 1 | `usr/deploy_install` | Deploys installation packages to target directories |
| 2 | `usr/deploy_modules` | Deploys core SPL modules and APIs |
| 3 | `usr/deploy_{app-name}` | Deploys individual applications |

**Available app deployments**:
- `usr/deploy_test-tools-git`
- `usr/deploy_test-tools-7zip` 
- `usr/deploy_watcher`
- `usr/deploy_model`

### Verification

Test deployed apps in their target locations:
```bash
cd spl2/apps/model
./spl spl/console/log hello world
```

Expected output:
```
> spl/console/log
hello world
spl/app/process completed succesfully ( ~400ms )
```

## Known Issues (To Fix Tomorrow)

⚠️ **Release folder cleanup needed**:
- Boot app contains legacy `.txt` files alongside `.batch` files
- `deploy_apps.batch` references non-existent `apps_git.json` (git is API, not app)
- Need to clean up stale references and standardize file extensions
