if ( typeof sails !== 'undefined' && sails ) {
	const queries = require('./queries.js')
	module.exports = function switchState(options){
		var deviceId = options.deviceId !== undefined ? options.deviceId : options.device;

		var state = options.state;
		return gladys.utils.sqlUnique(queries.getIdentifier,[deviceId])
		.then((row) => {
			var machineUuid = row.identifier
			var json = '{"_type":"executeCommand","_command":"switchState", "_options":"'+state+'"}'
			var topic = 'gladys/machine/'+machineUuid+'/module/hdmicec/notify'
			return gladys.modules.mqtt.emit(topic,json)
		})
	}
} else {
	const turnOnTv = require('./turnOnTv');
	const turnOffTv = require('./turnOffTv');

	module.exports = function switchState(params){
		var state = (params.state == 'true') ? true : false;

		switch(!!state) {
			case true :
				turnOnTv(params.tempo)
				break;
			case false :
				turnOffTv(params.tempo)
				break;
			default:
				console.log('error durring switch !')
		}	
	}
}
