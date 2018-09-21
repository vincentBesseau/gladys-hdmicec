const shell = require('shelljs');

module.exports = function getSources(options){
	var source = options.id;
	var stdout = shell.exec('echo "scan" | cec-client -s -d 1', {silent:true}).stdout;

	var blockDevices = stdout.split('\n\n')

	blockDevices.forEach(function(device) {
		var lignes = device.split('\n')
		for (var i = 0; i < lignes.length; i++) {

			if(lignes[i].includes('device')){
				if(lignes[i].includes(source)) {
					address = chunk(lignes[i+1].split(':')[1].trim().replace(/\./g,''),2).join(' ')
				}
			}
		}
	})

	if (address !== undefined && address !== null) {
		shell.exec('echo "txn 40 9D '+address+'" | cec-client -s', {silent:true})
	}
}

function chunk(str, n) {
	var ret = [];
	var i;
	var len;

	for(i = 0, len = str.length; i < len; i += n) {
	   ret.push(str.substr(i, n))
	}

	return ret
};