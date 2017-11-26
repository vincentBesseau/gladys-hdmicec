const currentDirectory = __dirname;
const shell = require('shelljs');
const parselog = require(currentDirectory+'/parselog');

module.exports = function isAlive(){
	var stdout = shell.exec(currentDirectory+'/../../scripts/command/isAlive.sh', {silent:true}).stdout;
    
    parselog(stdout);
}