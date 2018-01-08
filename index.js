
module.exports = function(sails) {
	
	const shell = require('shelljs');
	const setup = require('./lib/setup');
	const exec = require('./lib/exec');
	const commands = require('./lib/hdmiCecCommand/index');

	gladys.on('ready', function(){
		setup();
	});
 
    return {
		shell: shell,
		install: setup,
		exec: exec,
		commands: commands
    };
};