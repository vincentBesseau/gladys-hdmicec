

module.exports = function install(gladysMqttAdapter, televisionApi, config){

    var Sources = televisionApi.getSources();
    gladysMqttAdapter.device.create({
        device : {
            name: `Télévision`,
            protocol: `MQTT`,
            service: `hdmicec`,
            identifier: config.machineId
        },
        types : [{
            name: 'TV',
            type: 'binary',
            identifier: 'Power',
            category: 'tv',
            sensor: false,
            min: 0,
            max: 1,
        },
        {
            name: 'Sources',
            type: 'String',
            identifier: Sources,
            sensor: true,
            min:0,
            max:1,
            display:false  
        }]
    })
};