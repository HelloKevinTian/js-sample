var a_json = require('./1.json');
var b_json = require('./2.json');
var c_json = require('./3.json');
var d_json = require('./4.json');
var e_json = require('./5.json');
var f_json = require('./6.json');
var fs = require("fs");

var prize_list = [];
var prize_list_huawei = [];
var prize_list_wandoujia = [];
var compare_string = "玩游戏拿大奖";
console.log(compare_string);
function add(list){
	var find = false;
	for(var i = 0; i < prize_list.length; ++i){
		if(list[0] == prize_list[i][0]){
			find = true;
			break;
		}
	}
	if(!find){
		prize_list.push(list);
		if(list[1] == "huaweiAppStore"){
			prize_list_huawei.push(list);
		}
	}
	if(!find){
		prize_list.push(list);
		if(list[1] == "wandoujia"){
			prize_list_wandoujia.push(list);
		}
	}
}
for(var v in a_json)
{
	if(compare_string == a_json[v].content){
		add([a_json[v].title,a_json[v].channel]);
	}
}

for(var v in b_json)
{
	if(compare_string == b_json[v].content){
		add([b_json[v].title,b_json[v].channel]);
	}
}

for(var v in c_json)
{
	if(compare_string == c_json[v].content){
		add([c_json[v].title,c_json[v].channel]);
	}
}

for(var v in d_json)
{
	if(compare_string == d_json[v].content){
		add([d_json[v].title,d_json[v].channel]);
	}
}

for(var v in e_json)
{
	if(compare_string == e_json[v].content){
		add([e_json[v].title,e_json[v].channel]);
	}
}

for(var v in f_json)
{
	if(compare_string == f_json[v].content){
		add([f_json[v].title,f_json[v].channel]);
	}
}

//	show
for(var j = 0; j < prize_list.length; ++j){
	console.log(prize_list[j]);
}
console.log(prize_list.length);

fs.writeFile('prize.txt', prize_list, 'ascii', function(err){
	if(err){
		console.log('failed');
	}else{
		console.log('ok');
	}
});

fs.writeFile('huaiwei_prize.txt', prize_list_huawei, 'ascii', function(err){
	if(err){
		console.log('failed');
	}else{
		console.log('ok');
	}
});

fs.writeFile('wandoujia.txt', prize_list_wandoujia, 'ascii', function(err){
	if(err){
		console.log('failed');
	}else{
		console.log('ok');
	}
});