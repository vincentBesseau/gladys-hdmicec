

module.exports = function install(gladysMqttAdapter, televisionApi, config){
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
            category: 'Television',
            sensor: false,
            min: 0,
            max: 1,
        }]
    })
};