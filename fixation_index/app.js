var xlsx = require('node-xlsx');

var excel = xlsx.parse('fixation_index .xlsx'); // parses a file

console.log(excel.worksheets[0].name);
console.log(excel.worksheets[0].data[1]);
console.log(excel.worksheets[0].data[1][0].value);
console.log(excel.worksheets[0].data[2][0].value);
console.log(excel.worksheets[0].data[3][0].value);
console.log(excel.worksheets[0].data[3][1].value);
console.log(excel.worksheets[0].data[3][2].value);
console.log("ready");

var fixation_index = '{';
//	for innate blessings
var innate_blessings = '"innate_blessings":['
var start_read_rows = 2;
var cur_read_rows = 8;
for(i = start_read_rows; i < cur_read_rows; ++i){
	innate_blessings += '{';
	innate_blessings += '"range":"';
	innate_blessings += excel.worksheets[0].data[i][0].value;
	innate_blessings += '",';
	
	innate_blessings += '"level":"';
	innate_blessings += excel.worksheets[0].data[i][1].value;
	innate_blessings += '",';
	
	innate_blessings += '"describe":"';
	innate_blessings += excel.worksheets[0].data[i][2].value;
	innate_blessings += '"}';
	if(i != cur_read_rows - 1){
		innate_blessings += ',';
	}
}
innate_blessings += ']';
innate_blessings += ',';
fixation_index += innate_blessings;

//	for base emergy
var base_emergy = '"base_emergy":['
start_read_rows = 11;
cur_read_rows = 17;
for(i = start_read_rows; i < cur_read_rows; ++i){
	base_emergy += '{';
	base_emergy += '"range":"';
	base_emergy += excel.worksheets[0].data[i][0].value;
	base_emergy += '",';
	
	base_emergy += '"level":"';
	base_emergy += excel.worksheets[0].data[i][1].value;
	base_emergy += '",';
	
	base_emergy += '"describe":"';
	base_emergy += excel.worksheets[0].data[i][2].value;
	base_emergy += '"}';
	if(i != cur_read_rows - 1){
		base_emergy += ',';
	}
}
base_emergy += ']';
base_emergy += ',';
fixation_index += base_emergy;


//	for base luck
var base_luck = '"base_luck":['
start_read_rows = 21;
cur_read_rows = 27;
for(i = start_read_rows; i < cur_read_rows; ++i){
	base_luck += '{';
	base_luck += '"range":"';
	base_luck += excel.worksheets[0].data[i][0].value;
	base_luck += '",';
	
	base_luck += '"level":"';
	base_luck += excel.worksheets[0].data[i][1].value;
	base_luck += '",';
	
	base_luck += '"describe":"';
	base_luck += excel.worksheets[0].data[i][2].value;
	base_luck += '"}';
	if(i != cur_read_rows - 1){
		base_luck += ',';
	}
}
base_luck += ']';
//base_luck += ',';
fixation_index += base_luck;
fixation_index += '}';
require("fs").writeFile('fixation_index.json', fixation_index, 'utf8', function(err){
	if(err){
		console.log('failed');
	}else{
		console.log('ok');
	}
});