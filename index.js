
module.exports = function(sails) {
	
	const shell = require('shelljs');
	const setup = require('./lib/setup');
	const exec = require('./lib/exec');
	const commands = require('./lib/hdmiCecCommand/index');

	gladys.on('ready', function(){
		sails.log.info('Update tv state !')
		commands.getState();
		setInterval(function () {
			sails.log.info('Update tv state !')
			commands.getState();
		}, 1800000)
	});
 
    return {
		shell: shell,
		install: setup,
		exec: exec,
		television: commands
    };
};
