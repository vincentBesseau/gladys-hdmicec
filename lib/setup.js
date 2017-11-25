const Promise = require('bluebird');
const currentDirectory = __dirname;
const shell = require(currentDirectory+'/shelljs/shell');
var arr = currentDirectory.split('/');

module.exports = function setup(){

    shell.chmod('+X', currentDirectory+'/../scripts/hdmiCecGladysInstall.sh');
    
    shell.exec(currentDirectory+'/../scripts/hdmiCecGladysInstall.sh');

    var out = shell.exec(currentDirectory+'/../scripts/command/isAlive.sh', {silent:true}).stdout;

    if(out.includes('La télévision est alumée')) {
        var etatTv = 1;
    } else if (out.includes('La télévision est arrêtée')) {
        var etatTv = 0;
    } else {
        sails.log.debug('Please verify the connexion between Raspberry and TV [HDMI]');
        var etatTv = 0;
    }

    var newDevice = {
        device: {
            name: `Télévision`,
            protocol: arr[6],
            service: arr[6],
            identifier: `Télévision`
        },
        types: [{
            name: 'TV',
            type: 'binary',
            identifier: 'Télévision',
            tag: 'Télévision',
            sensor: false,
            min: 0,
            max: 1,
            value: etatTv
        }]
    };

    return gladys.device.create(newDevice);
};