var xlsx = require('node-xlsx');

var excel = xlsx.parse('login_bonus.xlsx'); // parses a file
console.log(excel.worksheets[1].data[3]);

var loginbonus = '{'
for(i = 0; i < excel.worksheets[1].data[0].length; ++i){
	loginbonus += '"'
	loginbonus += excel.worksheets[1].data[0][i].value;
	loginbonus += '"'
	loginbonus += ':""'
	if(i != excel.worksheets[1].data[0].length -1){
		loginbonus += ','
	}
}
loginbonus += '}'
loginbonus = JSON.parse(loginbonus);
console.log(loginbonus);

var loginbonus_list = "[";
for(i = 1; i < excel.worksheets[1].data.length; ++i){
	var j = 0;
	for(var v in loginbonus){
		//	reset first
		loginbonus[v] = '';
		if(excel.worksheets[1].data[i][j]){
			if(excel.worksheets[1].data[i][j].value){
				loginbonus[v] = excel.worksheets[1].data[i][j].value;
			}
			else{
				//	the value of 0 is useful
				if(0 == excel.worksheets[1].data[i][j].value){
					loginbonus[v] = excel.worksheets[1].data[i][j].value;
				}
			}
		}
		++j;
	}
	loginbonus_list += JSON.stringify(loginbonus);
	console.log(loginbonus);
	if(i != excel.worksheets[1].data.length -1){
		loginbonus_list += ",";
	}
}
loginbonus_list += "]";

require("fs").writeFile('login_bonus.json', loginbonus_list, 'utf8', function(err){
	if(err){
		console.log('failed');
	}else{
		console.log('ok');
	}
});
