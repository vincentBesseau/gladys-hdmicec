const currentDirectory = __dirname;
const shell = require('shelljs');
const parselog = require(currentDirectory+'/hdmiCecCommand/parselog');

module.exports = function exec(params){
    gladys.param.getValue('HDMI_INTERVAL_TEMPO')
    .then((intervalUser) => {
        return intervalUser;
    })
    .catch(() => {
        return 1;
    })
    .then((interval) => {
        switch(params.state.value){
          case 0:
                var stdout = shell.exec(currentDirectory+'/../scripts/command/turnOffTv.sh '+interval, {silent:true}).stdout;

                parselog(stdout);
          break;

          case 1:
                var stdout = shell.exec(currentDirectory+'/../scripts/command/turnOnTv.sh '+interval, {silent:true}).stdout;

                parselog(stdout);

          break;

          default:
                if(value != 0 || value != 1){
                    console.log("Erreur de données !");
                }
          break;
        }
    })
};
