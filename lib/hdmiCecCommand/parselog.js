const queries = require('./queries');

module.exports = function parselog(stdout) {
    var state=false
    var arr = stdout.split('\n');
    arr.forEach(function(element) {
        if (element.includes('[DEBUG]')) {
        	// gladys.utils.sql(queries.getDebugMode, [])
		    // .then((rows) => {
		    // 	rows.forEach(function(debug) {
		    // 		if (debug.value == 'yes') {
			// 			sails.log.debug(element);
		    //         }
		    // 	})
			// });
        }else if (element.includes('[INFO]')) {
            console.log(element);
        } else {
            console.log({language: 'fr', text: element});
        }

        if(element.includes('est alumée')) {
            state=true
        }
    })

    return state
};
