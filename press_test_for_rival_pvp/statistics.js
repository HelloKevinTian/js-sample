var redis = require("redis")
var client = redis.createClient("6379","127.0.0.1",{"no_ready_check":false});
var h_robot_rival_vs = "h_robot_rival_vs";
var z_robot_rival_vs = "z_robot_rival_vs";

client.on("connect", load_data);
 
function load_data() {
	client.hlen(h_robot_rival_vs, function (err, reply) {	
		console.log("total " + reply);
		var random_val = Math.floor(Math.random()*reply);
		var time_begin = Date.now();
		var robot_id = "robot_" + random_val;
		console.log(random_val);
		client.hget(h_robot_rival_vs, robot_id, function (err, reply) {
			console.log(reply);
			var time_end = Date.now();
			console.log("elapsed time " + (time_end - time_begin));
		});
		console.log("end");
	});
};

