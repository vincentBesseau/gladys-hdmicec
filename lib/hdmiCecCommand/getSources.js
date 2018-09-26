if ( typeof sails !== 'undefined' && sails ) {

	module.exports = function getSources(options){
		var device = {
			id: options.deviceId
		}

		return gladys.deviceType.getByDevice(device)
		.then(function(deviceTypes){
			var sources = [];
			deviceTypes.forEach(function(deviceType) {
				if(deviceType.name === "Sources") {
					arraySources = deviceType.identifier.split('|');
				}
			})
			
			arraySources.forEach(function(source) {
				if(sources !== undefined && sources.length > 0)	sources.push({label:source})
			})
			sources = sources !== undefined && sources.length > 0 ? sources : undefined;
			return Promise.resolve(sources)
		})
	}
} else {
	const currentDirectory = __dirname;
	const shell = require('shelljs');

	module.exports = function getSources(option){
		var stdout = shell.exec(currentDirectory+'/../../scripts/command/getSource.sh', {silent:true}).stdout;
		var sourcesFind = stdout.split('\n')
		var sources = ''
		sourcesFind.forEach(function(sourceTemp) {
			source = sourceTemp.split(':')
			sources+=source[1]+'|'
		})
		return sources;
	}
}