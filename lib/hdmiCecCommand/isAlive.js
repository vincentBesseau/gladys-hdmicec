if ( typeof sails !== 'undefined' && sails ) {
    const queries = require('./queries.js')
    module.exports = function isAlive(options){
        var deviceId = options.deviceId !== undefined ? options.deviceId : options.device;
        return gladys.utils.sqlUnique(queries.getIdentifier,[deviceId])
        .then((row) => {
            var machineUuid = row.identifier
            return gladys.deviceType.getByIdentifier({
                deviceIdentifier:machineUuid,
                deviceService:'hdmicec',
                deviceTypeIdentifier:'Power'
            })
            .then(function(deviceType) {
                var json = {
                    _type:"executeCommand",
                    _command:"isAlive",
                    _options:deviceType.id
                }
                var topic = 'gladys/machine/'+machineUuid+'/module/hdmicec/notify'
                return gladys.modules.mqtt.emit(topic,json)
            })
        })
    }
} else {
    const currentDirectory = __dirname;
    const shell = require('shelljs');
    const parselog = require(currentDirectory+'/parselog');

    module.exports = function isAlive(option){
        var stdout = shell.exec(currentDirectory+'/../../scripts/command/isAlive.sh', {silent:true}).stdout;

        return parselog(stdout);
    }
}
