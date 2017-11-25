# gladys-hdmicec

## Installation

* Instal library cec-utils : 
```sudo aptitude install cec-utils```
* Add this module in Gladis and restart Gladys

## Usage 

Change this ```{slugName}``` by the slug name set before the installation

Check the status of the TV :
```
gladys.modules.{slugName}.commands.isAlive();
```
Turn on the TV :
```
gladys.modules.{slugName}.commands.turnOnTv();
```
Turn off the TV :
```
gladys.modules.{slugName}.commands.turnOffTv();
```
