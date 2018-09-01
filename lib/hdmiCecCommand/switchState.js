const turnOnTv = require('./turnOnTv');
const turnOffTv = require('./turnOffTv');

module.exports = function switchState(params){
	switch(!!params.state) {
		case true :
			turnOnTv()
			break;
		case false :
			turnOffTv()
			break;
		default:
			console.log('error durring switch !')
	}	
}