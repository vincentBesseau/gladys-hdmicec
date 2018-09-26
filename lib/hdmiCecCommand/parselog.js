const queries = require('./queries');

module.exports = function parselog(stdout) {
    var state=false
    var arr = stdout.split('\n');
    arr.forEach(function(element) {
        if (element.includes('[DEBUG]')) {

        }else if (element.includes('[INFO]')) {
            
        } else {
            console.log(element);
        }

        if(element.includes('est alumée')) {
            state=true
        }
    })

    return state
};
