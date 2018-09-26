if ( typeof sails !== 'undefined' && sails ) {
	const queries = require('./queries.js')
	module.exports = function getSources(option){
		return gladys.utils.sqlUnique(queries.getIdentifier,[option.deviceId])
		.then((row) => {
			// var machineUuid = row.identifier
			// var json = '{"_type":"executeCommand","_command":"getSources","_topicFrom":"gladys/machine/'+machineUuid+'/module/hdmicec/notify"}'
			// var topic = 'gladys/machine/'+machineUuid+'/module/hdmicec/notify'
			// return gladys.modules.mqtt.emit(topic,json)
			// .then((d)=>{console.log(d)})
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