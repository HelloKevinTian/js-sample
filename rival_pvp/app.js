var xlsx = require('node-xlsx');

var excel = xlsx.parse('rival_vs.xlsx'); // parses a file

var rival_seoul = '{'
for(i = 0; i < excel.worksheets[0].data[0].length; ++i){
	rival_seoul += '"'
	rival_seoul += excel.worksheets[0].data[0][i].value;
	rival_seoul += '"'
	rival_seoul += ':""'
	if(i != excel.worksheets[0].data[0].length -1){
		rival_seoul += ','
	}
}
rival_seoul += '}'
rival_seoul = JSON.parse(rival_seoul);
console.log(rival_seoul);

var rival_seoul_list = "[";
for(i = 1; i < excel.worksheets[0].data.length; ++i){
	var j = 0;
	for(var v in rival_seoul){
		if(excel.worksheets[0].data[i][j]){
			rival_seoul[v] = excel.worksheets[0].data[i][j].value;
		}
		++j;
	}
	rival_seoul_list += JSON.stringify(rival_seoul);
	if(i != excel.worksheets[0].data.length -1){
		rival_seoul_list += ",";
	}
}
rival_seoul_list += "]";

require("fs").writeFile('rival_vs.json', rival_seoul_list, 'utf8', function(err){
	if(err){
		console.log('failed');
	}else{
		console.log('ok');
	}
});

