[← Home](../README.md)

# Schema and Repo Notes

## Where to put schemas - Repo structure

### Topics

The initial idea was to implement a separate metadata directory next to the repository data directory.  
However as far as schemas is concerned, metadata doesn't seem to come into play.  

The data repository seems to take the following shape:  
1. The initial dir(s) set the topic - I propose a two part setup of package and topic, similar to modules structure.  
2. Additional subdir set the PK. For many topics in initial configuration, the directory with records is the full PK name. 
3. By design, all the records within a topic have the same schema. A schema file is only required at the topic directory level.  
4. By desing, the topic directory contains only subdirectories. These can be seen as partitions (and are part of PK).

### Modules

The modules create the API for the pipeline actions and feature a two part setup: package and API.  
By design, APIs are a set of methods that operate on the same data structure.  
This means that a schema can be attached at the API level with additional info at method level about the specific properties in play.  


## Naming

From these two examples it may create schema URIs that indicate schema type and actual schema.  
data/spl/commands for command data structure? module/spl/command for command API?

## Format

Schemas that are stored with the topic or module should be in external format.  
And there should be a separate (data) structure containing all the schemas in play in internal format.  
Similar will be done for modules, also similar for packages ?  
It is necessary to make a distinction between the functional structures and the data structures.  
E.g. schemas as functional elements are in avsc files, but there should also be a schema topic with the schema data structure.

## Consequence

This has design consequences. Structural entities used by SPlectrum internally are used in functional form.  
But there is also a data structure representation of these entities so SPlectrum can be used to mould them in the desired functional form.  
The functional form of these entities can be stored in a functional directory structure like modules,  
or added to functional directory structures like schemas.
