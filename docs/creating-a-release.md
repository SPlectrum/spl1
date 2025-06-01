[Home](../README.md)
# Creating a Release

It is important to keep app packages on significant change and to keep the release folder updated.  
This is where the app packages are added to the git project (the spl folder is not tracked by git).

The release folder contains a boot app with the functionality to create the install folder within the spl folder.
Within the spl folder, the boot app executes the deploy and remove operation.  
The boot app is fully self-contained, it contains all functional code to run.

To create an install package that can be zipped up, run the following command from the root of the boot app:
```
./spl spl/app/exec -f release_to_install.txt
```
This will copy the files in the relase directory and the repository modules directory to the install folder within the spl folder. 

To create the selfextracting package from the git repository run the command below in the root:

(linux) 7z a -sfx spl.exe ./spl
(windows)"C:\Program Files\7-Zip\7z.exe" a -sfx spl.exe ./spl
