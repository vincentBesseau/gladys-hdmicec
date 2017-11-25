const currentDirectory = __dirname;
const shell = require(currentDirectory+'/shelljs/shell');
const parselog = require(currentDirectory+'/hdmiCecCommand/parselog');

module.exports = function exec(params){
    switch(params.state.value){
      case 0:
            var stdout = shell.exec(currentDirectory+'/../scripts/command/turnOffTv.sh', {silent:true}).stdout;
                        
            parselog(stdout);
      break;

      case 1:
            var stdout = shell.exec(currentDirectory+'/../scripts/command/turnOnTv.sh', {silent:true}).stdout;
                        
            parselog(stdout);
            
      break;
            
      default:
            if(value != 0 || value != 1){
                console.log("Erreur de données !");
            }
      break;
    }
};