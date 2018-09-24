module.exports = {
    machineId: process.env.GLADYS_MACHINE_ID || '',
    mqttUrl: process.env.MQTT_URI || '',
    mqttUsername: process.env.MQTT_USERNAME || '',
    mqttPassword: process.env.MQTT_PASSWORD || ''
};
