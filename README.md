# spl1

The second iteration of the core engine of SPlectrum 

The initial checkin is the current state of spl0.  
This will be reworked while an implementation plan is put in place.

---

The modules implemented in this repository make up the minimum core functionality of the SPlectrum platform.  
The core functionality consists of the execution layer, the data layer and package management,
but also minimal implementations of the command pipeline and client management and probably other component not yet in scope.  

The emphasis is on minimal viable implementation. more advanced implementation will be installed as additional module packages.  
A SPlectum install will always begin with the install of this core package.

Each release comes with notes about the functionality that has been added or improved.  
The aim is to come to a MVP for application development by version 1.0  
It will already be possible to add applications to earlier versions, but tooling may still be lacking at that stage.

User notes are available in the readMe.md file of the spl directory (the root of the self-extracting package).

 - [Creating a Release](./docs/creating-a-release.md)
 - [spl package overview](./docs/spl-package-overview.md)
 - [spl data layer](./docs/spl-data-layer.md)
 - [Execute API Properties](./docs/execute-api-properties.md)
 - [App API Properties](./docs/app-api-properties.md)
 - [Package API Properties](./docs/package-api-properties.md)
 - [Main Areas of Work](./docs/main-areas-of-work.md)
 - [SPlectrum Philosophy](./docs/spl-node-philosophy.md)
 - [Command Flow](./docs/command-flow.md)
 - [Data Structures](./docs/data-structures.md)
 - [Schema and Repo Notes](./docs/schema-and-repo-notes.md)
