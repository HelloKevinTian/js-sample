var xlsx = require('node-xlsx');

var excel = xlsx.parse('pay_message.xlsx'); // parses a file

var pay_message = '{'
for(i = 0; i < excel.worksheets[0].data[0].length; ++i){
	pay_message += '"'
	pay_message += excel.worksheets[0].data[0][i].value;
	pay_message += '"'
	pay_message += ':""'
	if(i != excel.worksheets[0].data[0].length -1){
		pay_message += ','
	}
}
pay_message += '}'
pay_message = JSON.parse(pay_message);
console.log(pay_message);

var pay_message_list = "[";
for(i = 1; i < excel.worksheets[0].data.length; ++i){
	var j = 0;
	for(var v in pay_message){
		if(excel.worksheets[0].data[i]){
			if(excel.worksheets[0].data[i][j]){
				pay_message[v] = excel.worksheets[0].data[i][j].value;
			}
		}
		++j;
	}
	pay_message_list += JSON.stringify(pay_message);
	if(i != excel.worksheets[0].data.length -1){
		pay_message_list += ",";
	}
}
pay_message_list += "]";

require("fs").writeFile('pay_message.json', pay_message_list, 'utf8', function(err){
	if(err){
		console.log('failed');
	}else{
		console.log('ok');
	}
});

