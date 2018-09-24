if ( typeof sails !== 'undefined' && sails ) {
	module.exports = function getSources(option){
		return gladys.param.getValue('HDMICEC_MACHINE_UUID_'+option.deviceId)
		.then((machineUuid) => {
			var json = '{"_type":"executeCommand","_command":"getSources"}'
			var topic = 'gladys/machine/'+machineUuid+'/module/hdmicec/notify'
			return gladys.modules.mqtt.emit(topic,json)
		})
	}
} else {
	const currentDirectory = __dirname;
	const shell = require('shelljs');

	module.exports = function getSources(option){
		var stdout = shell.exec(currentDirectory+'/../../scripts/command/getSource.sh', {silent:true}).stdout;
		var sourcesFind = stdout.split('\n')
		var sources = []
		sourcesFind.forEach(function(sourceTemp) {
			source = sourceTemp.split(':')
			sources.push({label:source[1]})
		})
		console.log(sources)
		return sources;
	}
}