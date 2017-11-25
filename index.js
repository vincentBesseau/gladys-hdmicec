
module.exports = function(sails) {
	
	const shell = require('./lib/shelljs/shell');
	const setup = require('./lib/setup');
	const exec = require('./lib/exec');
	const commands = require('./lib/hdmiCecCommand/index');

	gladys.on('ready', function(){
		setup();
	});
 
    return {
		shell: shell,
		setup: setup,
		exec: exec,
		commands: commands
    };
};