
module.exports = function(sails) {
	
	const exec = require('./lib/exec');
	const commands = require('./lib/hdmiCecCommand/index');

	gladys.on('ready', function(){
		gladys.device.getByService({service: 'hdmicec'})
		.then(function(devices){
			devices.forEach(device => {
				sails.log.info('Update tv state !')
				commands.getState({deviceId: device.id});
				setInterval(function () {
					sails.log.info('Update tv state !')
					commands.getState({deviceId: device.id});
				}, 1800000)
			});
		})
	});
 
    return {
		exec: exec,
		television: commands
    };
};
