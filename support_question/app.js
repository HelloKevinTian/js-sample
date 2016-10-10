var xlsx = require('node-xlsx');

var excel = xlsx.parse('question.xlsx'); // parses a file

var questions = [];
console.log(excel.worksheets[2].name);
console.log(excel.worksheets[2].data[0]);
console.log(excel.worksheets[2].data[1]);
for(var i = 0; i < excel.worksheets[2].data.length; ++i){
	console.log(excel.worksheets[2].data[i][0].value);
	questions.push(excel.worksheets[2].data[i][0].value);
}

require("fs").writeFile('questions.json', JSON.stringify(questions), 'utf8', function(err){
	if(err){
		console.log('failed');
	}else{
		console.log('ok');
	}
});

