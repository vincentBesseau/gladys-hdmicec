// if we are running inside sails.js, it means we are running inside Gladys
// This file is not supposed to run inside Gladys so stop now.

if ( typeof sails !== 'undefined' && sails ) {
    return '';
}

const televisionApi = require('./lib/hdmiCecCommand/index.js')
const config = require('./config/config.js');
var gladysMqttAdapter = require('gladys-mqtt-adapter')({
    MACHINE_ID: config.machineId,
    MQTT_URL: config.mqttUrl,
    MQTT_USERNAME: config.mqttUsername,
    MQTT_PASSWORD: config.mqttPassword,
    MODULE_SLUG: 'hdmicec' 
});
console.log(gladysMqttAdapter)

gladysMqttAdapter.on('message-notify', function(data) {
    switch (data._type) {
        case 'config':
            gladysMqttAdapter.device.create({
                device : {
                    name: res.name,
                    protocol: 'MQTT',
                    service: 'gladys-broadlink',
                    identifier: res.module
                },
                types : []
            })
        break;

        case 'executeCommand':
            switch (data._command) {
                case 'getSources' :
                    televisionApi.getSources();
                break;

                case 'isAlive' :
                    televisionApi.getState();
                break;

                case 'openSource' :
                    televisionApi.openSource(data._options);
                break;

                case 'switchState' :
                    televisionApi.switchState(data._options);
                break;
                
                default :
                    console.log('command '+data._command+' not exist !')
            }
        break;
    }
    
})

