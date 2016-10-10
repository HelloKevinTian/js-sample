var xlsx = require('node-xlsx');

var excel = xlsx.parse('question.xlsx'); // parses a file

console.log(excel.worksheets[0].name);
console.log(excel.worksheets[1].name);
console.log(excel.worksheets[1].data[0]);
console.log(excel.worksheets[1].data[1]);
/*
console.log(excel.worksheets[1].data[1][0].value);
console.log(excel.worksheets[1].data[1][1].value);
console.log(excel.worksheets[1].data[1][2].value);
console.log(excel.worksheets[1].data[2][0].value);
console.log(excel.worksheets[1].data[2][1].value);
console.log(excel.worksheets[1].data[2][2].value);
*/
console.log("keywords ready ok");

var effect_length = 0;
var keywords = "[";

//	keyword type
var keyword_time = "[";
for(i = 1; i < excel.worksheets[1].data.length; ++i){
	if(excel.worksheets[1].data[i][0]){
		++effect_length;
	}
}
for(i = 1; i < effect_length + 1; ++i){
	if(excel.worksheets[1].data[i][0]){
		keyword_time += '"'
		keyword_time += excel.worksheets[1].data[i][0].value;
		keyword_time += '"'
		if(i != effect_length){
			keyword_time += ','
		}
	}
}
keyword_time += "]";
effect_length = 0;
keywords += keyword_time;
keywords += ",";
//	keyword type
var keyword_type = "[";
for(i = 1; i < excel.worksheets[1].data.length; ++i){
	if(excel.worksheets[1].data[i][1]){
		++effect_length;
	}
}
for(i = 1; i < effect_length + 1; ++i){
	if(excel.worksheets[1].data[i][1]){
		keyword_type += '"'
		keyword_type += excel.worksheets[1].data[i][1].value;
		keyword_type += '"'
		if(i != effect_length){
			keyword_type += ','
		}
	}
}
keyword_type += "]";
effect_length = 0;
keywords += keyword_type;
keywords += ",";
//	keyword target
var keyword_target = "[";
for(i = 1; i < excel.worksheets[1].data.length; ++i){
	if(excel.worksheets[1].data[i][2]){
		++effect_length;
	}
}
for(i = 1; i < effect_length + 1; ++i){
	if(excel.worksheets[1].data[i][2]){
		keyword_target += '"'
		keyword_target += excel.worksheets[1].data[i][2].value;
		keyword_target += '"'
		if(i != effect_length){
			keyword_target += ','
		}
	}
}
keyword_target += "]";
effect_length = 0;
keywords += keyword_target;
keywords += ",";

//	keyword behavior
var keyword_behavior = "[";
for(i = 1; i < excel.worksheets[1].data.length; ++i){
	if(excel.worksheets[1].data[i][3]){
		++effect_length;
	}
}
for(i = 1; i < effect_length + 1; ++i){
	if(excel.worksheets[1].data[i][3]){
		keyword_behavior += '"'
		keyword_behavior += excel.worksheets[1].data[i][3].value;
		keyword_behavior += '"'
		if(i != effect_length){
			keyword_behavior += ','
		}
	}
}
keyword_behavior += "]";
effect_length = 0;
keywords += keyword_behavior;
keywords += "]";

require("fs").writeFile('keywords.json', keywords, 'utf8', function(err){
	if(err){
		console.log('failed');
	}else{
		console.log('ok');
	}
});
///////////////////////////////////////////////////////////////////////////////
/*
console.log(excel.worksheets[0].name);
console.log(excel.worksheets[0].data[4][0].value);
console.log("question ready ok");
function trim_all(str) {  return str.replace(/\s+/g, "");}
function trim(str) {  return str.replace(/(^\s+)|(\s+$)/g, "");}
var questions = '{'
//	question mine_solid_info
effect_length = 0;
var mine_solid_info = '"mine_solid_info":[';
for(i = 1; i < excel.worksheets[0].data.length; ++i){
	if(excel.worksheets[0].data[i][0]){
		++effect_length;
	}
}

for(i = 4; i < effect_length + 1; ++i){
	if(excel.worksheets[0].data[i][0]){
		var all_element = excel.worksheets[0].data[i][0].value;
		var array_element = all_element.split('？');
		//mine_solid_info += '[';
		for(j = 0; j < array_element.length -1; ++j){
			mine_solid_info += '"'
			mine_solid_info += trim(array_element[j]);
			mine_solid_info += '"'
			if(j != array_element.length - 2){
				mine_solid_info += ','
			}
		}
		//mine_solid_info += ']';
		if(i != effect_length){
			mine_solid_info += ','
		}
		
	}
}
mine_solid_info += ']';
questions += mine_solid_info;
questions += ','
//	question mine_dynamic_info
effect_length = 0;
var mine_dynamic_info = '"mine_dynamic_info":[';
for(i = 1; i < excel.worksheets[0].data.length; ++i){
	if(excel.worksheets[0].data[i][2]){
		++effect_length;
	}
}

for(i = 4; i < effect_length + 1; ++i){
	if(excel.worksheets[0].data[i][2]){
		var all_element = excel.worksheets[0].data[i][2].value;
		var array_element = all_element.split('？');
		//mine_dynamic_info += '[';
		for(j = 0; j < array_element.length -1; ++j){
			mine_dynamic_info += '"'
			mine_dynamic_info += trim(array_element[j]);
			mine_dynamic_info += '"'
			if(j != array_element.length - 2){
				mine_dynamic_info += ','
			}
		}
		//mine_dynamic_info += ']';
		if(i != effect_length){
			mine_dynamic_info += ','
		}
		
	}
}
mine_dynamic_info += ']';
questions += mine_dynamic_info;
questions += ','
//	question target_soild_info
effect_length = 0;
var target_soild_info = '"target_soild_info":[';
for(i = 1; i < excel.worksheets[0].data.length; ++i){
	if(excel.worksheets[0].data[i][4]){
		++effect_length;
	}
}

for(i = 4; i < effect_length + 1; ++i){
	if(excel.worksheets[0].data[i][4]){
		var all_element = excel.worksheets[0].data[i][4].value;
		var array_element = all_element.split('？');
		//target_soild_info += '[';
		for(j = 0; j < array_element.length -1; ++j){
			target_soild_info += '"'
			target_soild_info += trim(array_element[j]);
			target_soild_info += '"'
			if(j != array_element.length - 2){
				target_soild_info += ','
			}
		}
		//target_soild_info += ']';
		if(i != effect_length){
			target_soild_info += ','
		}
		
	}
}
target_soild_info += ']';
questions += target_soild_info;
questions += ','
//	question target_dynmaic_info
effect_length = 0;
var target_dynmaic_info = '"target_dynmaic_info":[';
for(i = 1; i < excel.worksheets[0].data.length; ++i){
	if(excel.worksheets[0].data[i][5]){
		++effect_length;
	}
}

for(i = 4; i < effect_length + 1; ++i){
	if(excel.worksheets[0].data[i][5]){
		var all_element = excel.worksheets[0].data[i][5].value;
		var array_element = all_element.split('？');
		//target_dynmaic_info += '[';
		for(j = 0; j < array_element.length -1; ++j){
			target_dynmaic_info += '"'
			target_dynmaic_info += trim(array_element[j]);
			target_dynmaic_info += '"'
			if(j != array_element.length - 2){
				target_dynmaic_info += ','
			}
		}
		//target_dynmaic_info += ']';
		if(i != effect_length){
			target_dynmaic_info += ','
		}
		
	}
}
target_dynmaic_info += ']';
questions += target_dynmaic_info;

questions += '}'

require("fs").writeFile('question.json', questions, 'utf8', function(err){
	if(err){
		console.log('failed');
	}else{
		console.log('ok');
	}
});
*/
