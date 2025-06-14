# spl1 - Purpose

spl1 is a transitional repository, just like spl0.

There are three concerns to be addressed while developing within this repository:  

1. Restructure repository in 'single-concern' folders (top level): apps, apis, release, ...  
Each of these units will get its own git repo, docs, Claude.md file etc  
The top level repository is the orchestrator.  
The initial repository structure will start hierarchical, but that may change later.

2. Whenever dev work gets done, an external install is used - i.e. an install appropriate for the activity.  
The end product of that activity is then pushed into the appropriate repository.  
This is managed through the use of commands created from command batches and scripts.

3. The core API will be enhanced and/or refactored - pure APIs are very important.  
Migration to bare at this stage is very desirable.  
AVRO integration is also top of the list.  
Most importantly, implement TDD full cycle so Claude can start to work on its own.

This is probably already more that enough for this phase.

