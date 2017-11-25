const currentDirectory = __dirname;
const shell = require(currentDirectory+'/../shelljs/shell');
const parselog = require(currentDirectory+'/parselog');

module.exports = function isAlive(){
	var stdout = shell.exec(currentDirectory+'/../../scripts/command/turnOffTv.sh', {silent:true}).stdout;
            
    parselog(stdout);
}