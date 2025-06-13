[← Home](../README.md)

# spl Data Layer

The data is stored as (immutable) Kafka records, and accessed throught the data layer spl/data.  
The initial implementation is a file directory structure, where the directories encode the topic and primary key
and the file are single kafka records.  
This will remain the default behaviour going forward.

The core implementation may add the use of AVRO container for directory with a high record count, although this may not be necessary.  
AVRO containers will most probably be used for backups.

Until such time that additional structures / storage technologies will be integrated, the data layer will remain spl/data API only.  
Additional structures / data repositories will result in a hierarchical API structure,  
however the aim is to have all APIs for the different interfaces identical - i.e. embed the specific functionality transparently.  
The specific setup of the data layer will be configuration controlled and inaccessible to the user (boot / system responsibility).

Although the initial structure design included metadata directories next to the data directories, it seems that this is unnecessary.  
A data directory, being a container for a single primary key instance record is also the appropriate location for AVRO containers
if there are any and AVRO schema if it is the root direcctory for the hive containing records with that schema.  

This would set constraints for the data structure designs that are compatible.  
For instance, take a commandline client as an examples.  
All the clients would reside under data/clients and have in the top client directory a record that contains the settings (can be referenced) of the client.  
The format is the same as the command  request / response format, requests and responses being subdirectory of the client directory.
This settings record could be used as template for a client request (as it contains/reference all settings).  
Separate from the clients directory there would be a client API structure with all the APIs parsing details in use on the platform.  
That structure would also feature the same schema from parent directory down.

