// if we are running inside sails.js, it means we are running inside Gladys
// This file is not supposed to run inside Gladys so stop now.

if ( typeof sails !== 'undefined' && sails ) {
    return '';
}

const Store = require('data-store');
const televisionApi = require('./lib/hdmiCecCommand/index.js');
const config = require('./config/config.js');
const install = require('./lib/install.js');
var gladysMqttAdapter = require('gladys-mqtt-adapter')({
    MACHINE_ID: config.machineId,
    MQTT_URL: config.mqttUrl,
    MQTT_USERNAME: config.mqttUsername,
    MQTT_PASSWORD: config.mqttPassword,
    MODULE_SLUG: 'hdmicec' 
});

const store = new Store({ path: './config/install.json' });

if( store.data.install === undefined ) {
    install(gladysMqttAdapter,televisionApi, config);
    store.set('install', 'true')
}

gladysMqttAdapter.on('message-notify', function(data) {
    if(data._type !== undefined){
        console.log('_type',data._type)
        console.log('_command',data._command)
        console.log('_options',data._options)
        switch (data._type) {
            case 'executeCommand':
                switch (data._command) {
                    case 'getSource' :
                        var sources = televisionApi.getSources();
                        gladysMqttAdapter.command.command(data._options,sources)
                    break;

                    case 'isAlive' :
                        var response = televisionApi.getState();
                        gladysMqttAdapter.deviceState.create({
                            value : response.state,
                            devicetype : data._options
                        })
                    break;

                    case 'openSource' :
                        televisionApi.openSource(data._options);
                    break;

                    case 'switchState' :
                        televisionApi.switchState({
                            state: data._options,
                            tempo: config.hdmiIntervalTempo
                        });
                    break;
                    
                    default :
                        console.log('command '+data._command+' not exist !')
                }
            break;
        }
    }   
})

