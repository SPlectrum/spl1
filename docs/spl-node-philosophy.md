[Home](../README.md)
# SPlectrum Philosophy

## SPL Node Philosophy

This project is at the proof of concept phase, which means that there remains a lot of fluidity in the design and implementation flow.  
However, it already has chosen a lot of paradigms, a more complete wish list of which can be found in the SRS documentation repository.  

The Platform aims to be self-documenting but in the early stages documentation will be added separately to the repository.

----

It is the aim to use the SPlectrum node wherever we can. That is during module development, testing, etc. up to production.  

It is important that there is a simple way to make it work for module develpment,  
where a node should be run within (embedded) without the need to use submodules and the like  
and without the need to move the code.

I think this can be achieved by using within every module repository (each will have their own repo) the same *spl* directory.  
The idea is as follows:
 - each repository has a *spl* subdirectory
 - the module code sits in the *modules* directory as if it were installed.
 - testing asses sit in the *test* directory
 - both these directories are tracked - the only ones
 - a (minimal required) SPlection release is unpacked in the directory
 - it is installed
 - now the module can be developed against the tests, i.e. its specfications.

 The simple tests of the module would be the equivalend of unit tests.  
 However, integration test can be included by upgrading the minimal release install.  
 More work needs to be done on the tests, simple and structured, and the tooling to manage these test suites.

---

To be a data streaming application platform that is fit for p2p application development (pear), integrates tightly with AI for automation.

It would like to tackle application development in the blockchain scene.