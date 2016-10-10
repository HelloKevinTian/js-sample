var util = require('./util');
var numbers = [];
for(var i = 0; i < 100000;++i){
	numbers.push(Math.floor(util.genRandom(400,250,100)));
}
require("fs").writeFile('numbers.json', JSON.stringify(numbers), 'utf8', function(err){
	if(err){
		console.log('failed');
	}else{
		console.log('ok');
	}
});