var xlsx = require('node-xlsx');

var excel = xlsx.parse('match.xlsx'); // parses a file

console.log(excel.worksheets[1].name);
console.log(excel.worksheets[1].data[13]);
console.log(excel.worksheets[1].data[14]);

console.log("ready");

var sheep = 0;
var match = "[";
//	nature
nature = "[";
nature += "[";
for(i = 7; i < 10; ++i)
{
	if(i == 8){
		continue;
	}
	nature += "[";
	for(j = 0; j < 8; ++j){
		if(excel.worksheets[sheep].data[i][j]){
			nature += excel.worksheets[0].data[i][j].value;
			if(j != 7){
				nature += ",";
			}
		}
	}
	nature += "],[";
	for(j = 9; j < 15 ; ++j){
		if(excel.worksheets[sheep].data[i][j]){
			nature += excel.worksheets[0].data[i][j].value;
			if(j != 14){
				nature += ",";
			}
		}
	}
	nature += "],[";
	nature += excel.worksheets[sheep].data[i][16].value;
	nature += "]]";
	if(i != 9){
		nature += ",[";
	}
}
nature += "]";
match += nature;

//	marriage
sheep = 1;
marriage = ",[";
marriage += "[";
for(i = 4; i < 25; ++i)
{
	if(i == 13 || i == 14)
	{
		continue;
	}
	marriage += "[";
	for(j = 1; j < 10; ++j){
		if(excel.worksheets[sheep].data[i][j]){
			marriage += excel.worksheets[sheep].data[i][j].value;
			if(j != 9){
				marriage += ",";
			}
		}
	}
	marriage += "],[";
	for(j = 12; j < 21 ; ++j){
		if(excel.worksheets[sheep].data[i][j]){
			marriage += excel.worksheets[sheep].data[i][j].value;
			if(j != 20){
				marriage += ",";
			}
		}
	}
	marriage += "]]";
	if(i != 24){
		marriage += ",[";
	}
}
marriage += "]";
match += marriage;

//	love
sheep = 2;
love = ",[";
love += "[";
for(i = 6; i < 27; ++i)
{
	if(i == 15 || i == 16 | i == 17)
	{
		continue;
	}
	love += "[";
	for(j = 1; j < 10; ++j){
		if(excel.worksheets[sheep].data[i][j]){
			love += excel.worksheets[sheep].data[i][j].value;
			if(j != 9){
				love += ",";
			}
		}
	}
	love += "],[";
	for(j = 13; j < 22 ; ++j){
		if(excel.worksheets[sheep].data[i][j]){
			love += excel.worksheets[sheep].data[i][j].value;
			if(j != 21){
				love += ",";
			}
		}
	}
	love += "]]";
	if(i != 26){
		love += ",[";
	}
}
love += "]";
match += love;

//	friendship
sheep = 3;
friendship = ",[";
friendship += "[";
for(i = 4; i < 13; ++i)
{
	friendship += "[";
	for(j = 1; j < 10; ++j){
		if(excel.worksheets[sheep].data[i][j]){
			friendship += excel.worksheets[sheep].data[i][j].value;
			if(j != 9){
				friendship += ",";
			}
		}
	}
	friendship += "],[";
	for(j = 13; j < 22 ; ++j){
		if(excel.worksheets[sheep].data[i][j]){
			friendship += excel.worksheets[sheep].data[i][j].value;
			if(j != 21){
				friendship += ",";
			}
		}
	}
	friendship += "]]";
	if(i != 12){
		friendship += ",[";
	}
}
friendship += "]";
match += friendship;

//	wealth
sheep = 4;
wealth = ",[";
wealth += "[";
for(i = 4; i < 13; ++i)
{
	wealth += "[";
	for(j = 1; j < 10; ++j){
		if(excel.worksheets[sheep].data[i][j]){
			wealth += excel.worksheets[sheep].data[i][j].value;
			if(j != 9){
				wealth += ",";
			}
		}
	}
	wealth += "],[";
	for(j = 13; j < 22 ; ++j){
		if(excel.worksheets[sheep].data[i][j]){
			wealth += excel.worksheets[sheep].data[i][j].value;
			if(j != 21){
				wealth += ",";
			}
		}
	}
	wealth += "]]";
	if(i != 12){
		wealth += ",[";
	}
}
wealth += "]";
match += wealth;

//	luck
sheep = 5;
luck = ",[";
luck += "[";
for(i = 4; i < 13; ++i)
{
	luck += "[";
	for(j = 1; j < 10; ++j){
		if(excel.worksheets[sheep].data[i][j]){
			luck += excel.worksheets[sheep].data[i][j].value;
			if(j != 9){
				luck += ",";
			}
		}
	}
	luck += "],[";
	for(j = 13; j < 22 ; ++j){
		if(excel.worksheets[sheep].data[i][j]){
			luck += excel.worksheets[sheep].data[i][j].value;
			if(j != 21){
				luck += ",";
			}
		}
	}
	luck += "]]";
	if(i != 12){
		luck += ",[";
	}
}
luck += "]";
match += luck;

match += "]";
console.log(match);
require("fs").writeFile('match.json', match, 'utf8', function(err){
	if(err){
		console.log('failed');
	}else{
		console.log('ok');
	}
});




