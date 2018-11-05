

module.exports = function install(gladysMqttAdapter, televisionApi, config){
    gladysMqttAdapter.device.create({
        device : {
            name: `Television`,
            protocol: `MQTT`,
            service: `hdmicec`,
            identifier: config.machineId
        },
        types : [{
            name: 'TV',
            type: 'binary',
            identifier: 'Power',
            category: 'television',
            sensor: false,
            min: 0,
            max: 1,
        }]
    })
};