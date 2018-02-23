const currentDirectory = __dirname;
const shell = require('shelljs');
const parselog = require(currentDirectory+'/parselog');

module.exports = function isAlive(){
	var stdout = shell.exec(currentDirectory+'/../../scripts/command/isAlive.sh', {silent:true}).stdout;
    
    var state = parselog(stdout);

    var query = `
        SELECT dt.id FROM devicetype dt
	    LEFT JOIN device d 
	    	ON dt.device = d.id
	    where dt.identifier = ? 
	    AND dt.type = ?
	    AND d.service = ?
      `
    gladys.utils.sql( query , [ 'Télévision', 'binary', 'hdmicec' ])
    .then((rows) => {
        gladys.deviceState.create( { 'value' : state , 'devicetype' : rows[0].id })
    })
}