const currentDirectory = __dirname;
const shell = require('shelljs');
const parselog = require(currentDirectory+'/parselog');

module.exports = function isAlive(tempo){
	var stdout = shell.exec(currentDirectory+'/../../scripts/command/turnOffTv.sh '+tempo, {silent:true}).stdout;
            
    parselog(stdout);
}