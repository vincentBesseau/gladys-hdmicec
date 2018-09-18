const currentDirectory = __dirname;
const shell = require('shelljs');

module.exports = function getSources(){
	var stdout = shell.exec(currentDirectory+'/../../scripts/command/getSource.sh', {silent:true}).stdout;
	var sourcesFind = stdout.split('\n')
	var sources = []
	sourcesFind.forEach(function(sourceTemp) {
		source = sourceTemp.split(':')
		sources.push(source[1])
	})
	
	return sources;
}