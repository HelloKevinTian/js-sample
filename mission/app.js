var xlsx = require('node-xlsx');

var excel = xlsx.parse('mission.xlsx'); // parses a file

var mission = '{'
for(i = 0; i < excel.worksheets[0].data[0].length; ++i){
	mission += '"'
	mission += excel.worksheets[0].data[0][i].value;
	mission += '"'
	mission += ':""'
	if(i != excel.worksheets[0].data[0].length -1){
		mission += ','
	}
}
mission += '}'
mission = JSON.parse(mission);
console.log(mission);

var mission_list = "[";
for(i = 1; i < excel.worksheets[0].data.length; ++i){
	var j = 0;
	for(var v in mission){
		if(excel.worksheets[0].data[i][j]){
			mission[v] = excel.worksheets[0].data[i][j].value;
		}
		++j;
	}
	mission_list += JSON.stringify(mission);
	if(i != excel.worksheets[0].data.length -1){
		mission_list += ",";
	}
}
mission_list += "]";

require("fs").writeFile('mission.json', mission_list, 'utf8', function(err){
	if(err){
		console.log('failed');
	}else{
		console.log('ok');
	}
});
