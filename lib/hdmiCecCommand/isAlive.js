if ( typeof sails !== 'undefined' && sails ) {
    module.exports = function isAlive(option){
        return gladys.param.getValue('HDMICEC_MACHINE_UUID_'+option.deviceId)
        .then((machineUuid) => {
            var json = '{"_type":"executeCommand","_command":"isAlive"}'
            var topic = 'gladys/machine/'+machineUuid+'/module/hdmicec/notify'
            return gladys.modules.mqtt.emit(topic,json)
        })
    }
} else {
    const currentDirectory = __dirname;
    const shell = require('shelljs');
    const parselog = require(currentDirectory+'/parselog');

    module.exports = function isAlive(option){
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
        // gladys.utils.sql( query , [ 'Power', 'binary', 'hdmicec' ])
        // .then((rows) => {
        //     gladys.deviceState.create( { 'value' : state , 'devicetype' : rows[0].id })
        // })
        return {
            state: state
        }
    }
}
