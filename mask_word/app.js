var xlsx = require('node-xlsx');
var excel = xlsx.parse('mask_word.xlsx'); // parses a file

var mask_word = [];

console.log(excel.worksheets[0].data.length);
console.log(excel.worksheets[0].data[0]);
console.log(excel.worksheets[0].data[1]);
console.log(excel.worksheets[0].data[2][0].value);
for(var i = 0; i < excel.worksheets[0].data.length; ++i)
{
	if(excel.worksheets[0].data[i]){
		if(excel.worksheets[0].data[i][0]){
			mask_word.push(excel.worksheets[0].data[i][0].value);
		}
	}
}
for(var i = 0; i < excel.worksheets[1].data.length; ++i)
{
	if(excel.worksheets[1].data[i]){
		if(excel.worksheets[0].data[i][1]){
			mask_word.push(excel.worksheets[1].data[i][0].value);
		}
	}
}
console.log(mask_word);
require("fs").writeFile('mask_word.json', JSON.stringify(mask_word), 'utf8', function(err){
	if(err){
		console.log('failed');
	}else{
		console.log('ok');
	}
});
