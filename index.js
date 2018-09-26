
module.exports = function(sails) {
	
	const exec = require('./lib/exec');
	const commands = require('./lib/hdmiCecCommand/index');

	gladys.on('ready', function(){
		var options = {
			service: 'hdmicec'
		}
		gladys.device.getByService({service: 'hdmicec'})
		.then(function(devices){
			devices.forEach(device => {
				sails.log.info('Update tv state !')
				commands.getState(device);
				setInterval(function () {
					sails.log.info('Update tv state !')
					commands.getState(device);
				}, 1800000)
			});
		})
	});
 
    return {
		exec: exec,
		television: commands
    };
};
