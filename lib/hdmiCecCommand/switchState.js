if ( typeof sails !== 'undefined' && sails ) {
	module.exports = function switchState(options){
		var state = options.state;
		return gladys.param.getValue('HDMICEC_MACHINE_UUID_'+options.deviceId)
		.then((machineUuid) => {
			var json = '{"_type":"executeCommand","_command":"switchState", "_options":"'+state+'"}'
			var topic = 'gladys/machine/'+machineUuid+'/module/hdmicec/notify'
			return gladys.modules.mqtt.emit(topic,json)
		})
	}
} else {
	const turnOnTv = require('./turnOnTv');
	const turnOffTv = require('./turnOffTv');

	module.exports = function switchState(params){
		var state = (params == 'true') ? true : false;

		switch(!!state) {
			case true :
				turnOnTv()
				break;
			case false :
				turnOffTv()
				break;
			default:
				console.log('error durring switch !')
		}	
	}
}
