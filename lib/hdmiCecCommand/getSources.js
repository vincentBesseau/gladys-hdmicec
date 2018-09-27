if ( typeof sails !== 'undefined' && sails ) {
	const queries = require('./queries.js')
	module.exports = function getSources(options){
		var id = options.deviceId !== undefined ? options.deviceId : options.device;
		var id = options.deviceId !== undefined ? options.deviceId : options.device;

		return gladys.utils.sqlUnique(queries.getIdentifier,[id])
		.then((row) => {
			var machineUuid = row.identifier
			var topic = 'gladys/machine/'+machineUuid+'/module/hdmicec/notify'
			var json = '{"_type":"executeCommand","_command":"getSource","_options":"'+topic+'"}'
			return gladys.modules.mqtt.emit(topic,json,true)
			.then((data)=>{
				sails.log.debug(data);
				return Promise.resolve(data)
			})
			.catch((err)=>{
				sails.log.debug(err);
				return Promise.reject()
			})
		})
	}
} else {
	const currentDirectory = __dirname;
	const shell = require('shelljs');

	module.exports = function getSources(){
		var stdout = shell.exec(currentDirectory+'/../../scripts/command/getSource.sh', {silent:true}).stdout;
		var sourcesFind = stdout.split('\n')
		var sources = []
		sourcesFind.forEach(function(sourceTemp) {
			source = sourceTemp.split(':')
			if(source[1] !== undefined) sources.push({label:source[1]})
		})
		return sources;
	}
}