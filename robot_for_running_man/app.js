var redis = require("redis")
var client = redis.createClient("6379","127.0.0.1",{"no_ready_check":true});
client.on("connect", load_data);
 
var xlsx = require('node-xlsx');
var excel = xlsx.parse('rank_robot_for_running_man.xlsx'); // parses a file

console.log(excel.worksheets[1].data[1][0]);
console.log(excel.worksheets[1].data[1][1].value);
console.log(excel.worksheets[1].data[1][2].value);
console.log(excel.worksheets[1].data.length);

//  current is the x week
var getWeek = function (date) {
    var onejan = new Date(date.getFullYear(), 0, 1);
    //	delay_day ,such as 3,that means wednesday is the first day of new week
    var delay_day = 3;
    return Math.ceil((((date - onejan) / 86400000) + onejan.getDay() + 1 + delay_day) / 7);
};
var championship_id = getWeek(new Date());
var rank_info = {
    channel:"000023",
    version:"2.0.0",
    phone_number:"18510384228",
    championship_id:championship_id
};

var robot_index = 1000000;
function load_data() {
	for(var i = 1; i < excel.worksheets[1].data.length; ++i){
		var robot_number = excel.worksheets[1].data[i][1].value;
		var robot_scores = excel.worksheets[1].data[i][2].value;
		for(var j = 0; j < robot_number; ++j){
			var robot_id = "robot_" + robot_index
			client.zadd("z_rank_running_man:" + championship_id, robot_scores,robot_id, function (err, reply) {
				console.log(reply);
			});
			client.hset("h_rank_running_man:" + championship_id, robot_id,JSON.stringify(rank_info), function (err, reply) {
				console.log(reply);
			});
			++robot_index;
		}
	}
};
